import { useState, useEffect } from "react";
import { Button } from "@/components/atoms";
import { Eye } from "react-feather";
import Confetti from "react-confetti";
import Modal from "@/components/molecules/Modal";
import {
  Card,
  CluesSection,
  AnswerSection,
  CluesContainer,
  ClueBox,
  ClueText,
  OptionsContainer,
  OptionButton,
  RevealButton,
  ScoreDisplay,
  ScoreNumber,
  TotalScore,
  ScoresContainer,
  GameContent,
  CluesHeader,
  ConfirmSection,
  StatsGroup,
  StatBox,
  StatNumber,
  StatText,
} from "./index.styled";
import { useGame } from "@/hooks";
import { Game } from "@/types";

interface GameCardProps {
  game: Game;
  onCreateNewGame: () => void;
}

const GameCard = ({ game, onCreateNewGame }: GameCardProps) => {
  const {
    destinationsRequestStates,
    fetchNextClueRequestStates,
    submitAnswerRequestStates,
    currentDestination,
    currentClues,
    currentClueIdx,
    totalClues,
    scoreToObtain,
    totalScore,
    isSelectedAnswerCorrect,
    hasSubmittedAnswer,
    submitAnswer,
    revealNextClue,
    moveToNextDestination,
  } = useGame({ game });

  const [isDecreasing, setIsDecreasing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    if (isDecreasing) {
      const timer = setTimeout(() => setIsDecreasing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDecreasing]);

  const handleRevealClick = () => {
    setIsDecreasing(true);
    revealNextClue();
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    submitAnswer(selectedOption!);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowModal(false);
    setShowConfetti(false);
    moveToNextDestination();
  };

  useEffect(() => {
    if (hasSubmittedAnswer) {
      setShowModal(true);
      setStats((prev) => ({
        // TODO: Should come from backend and be stored in Game schema
        correct: prev.correct + (isSelectedAnswerCorrect ? 1 : 0),
        wrong: prev.wrong + (isSelectedAnswerCorrect ? 0 : 1),
      }));
      if (isSelectedAnswerCorrect) {
        setShowConfetti(true);
      }
    }
  }, [hasSubmittedAnswer]);

  let nodeToRender;

  if (destinationsRequestStates.isPending) {
    return <p>Loading...</p>;
  } else if (destinationsRequestStates.isFulfilled) {
    nodeToRender = (
      <Card>
        <ScoresContainer>
          <StatsGroup>
            <StatBox>
              <StatNumber $type="correct">{stats.correct}</StatNumber>
              <StatText>Correct</StatText>
            </StatBox>
            <StatBox>
              <StatNumber $type="wrong">{stats.wrong}</StatNumber>
              <StatText>Wrong</StatText>
            </StatBox>
          </StatsGroup>
          <TotalScore>
            <span>Total Score:</span> {totalScore} <span>pts</span>
          </TotalScore>
        </ScoresContainer>

        <GameContent>
          <CluesSection>
            <CluesHeader>
              <ScoreDisplay>
                <ScoreNumber isDecreasing={isDecreasing}>
                  {scoreToObtain}
                </ScoreNumber>
                pts
              </ScoreDisplay>
              <RevealButton
                onClick={handleRevealClick}
                disabled={currentClueIdx === totalClues - 1}
              >
                <Eye size={16} />
                Reveal Next Clue (-25 pts)
              </RevealButton>
            </CluesHeader>
            <CluesContainer>
              {currentClues.map((clue, index) => (
                <ClueBox key={index} isRevealed={index <= currentClueIdx}>
                  {index <= currentClueIdx && <ClueText>{clue}</ClueText>}
                </ClueBox>
              ))}
            </CluesContainer>
          </CluesSection>

          <AnswerSection>
            <OptionsContainer>
              {currentDestination.options.map((option) => (
                <OptionButton
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  isSelected={option === selectedOption}
                  fullWidth
                >
                  {option}
                </OptionButton>
              ))}
            </OptionsContainer>
            {selectedOption && (
              <ConfirmSection>
                <Button onClick={handleConfirm} fullWidth>
                  Confirm Answer
                </Button>
              </ConfirmSection>
            )}
          </AnswerSection>
        </GameContent>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={isSelectedAnswerCorrect ? "Correct!" : "Wrong Answer"}
          description={
            isSelectedAnswerCorrect
              ? "Great job! You've found the right destination."
              : "That's not the right destination. Try again!"
          }
          onPlayAgain={onCreateNewGame}
          onNext={handleNext}
          isCorrect={isSelectedAnswerCorrect}
          stats={stats}
        />
      </Card>
    );
  } else if (destinationsRequestStates.isRejected) {
    return <p>Error loading game</p>;
  }

  console.log(currentDestination);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.1}
          style={{ zIndex: 3 }}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      {nodeToRender}
    </>
  );
};

export default GameCard;
