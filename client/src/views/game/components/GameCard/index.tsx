import { useState, useEffect, use } from "react";
import { Button, Error, ShimmerLoader, Spinner } from "@/components/atoms";
import { Eye, ArrowLeft } from "react-feather";
import Confetti from "react-confetti";
import { FloatingElements } from "@/components/molecules";
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
  ScoresContainer,
  GameContent,
  CluesHeader,
  ConfirmSection,
  StatsGroup,
  SpinnerContainer,
  BackButton,
  StatPill,
  StatLabel,
  StatValue,
} from "./index.styled";
import { useGame, useTimer } from "@/hooks";
import { Game } from "@/types";
import { ResultModal } from "@/components/molecules";

interface GameCardProps {
  game: Game;
  onCreateNewGame: () => void;
  onBack: () => void;
}

const MAX_TIME_MS_PER_QUESTION = 15000;

const GameCard = ({ game, onCreateNewGame, onBack }: GameCardProps) => {
  const {
    destinationsRequestStates,
    fetchNextClueRequestStates,
    submitAnswerRequestStates,
    scoreDeduction,
    currentDestination,
    currentClues,
    currentClueIdx,
    totalClues,
    scoreToObtain,
    totalScore,
    isSelectedAnswerCorrect,
    hasSubmittedAnswer,
    submissionResult,
    submitAnswer,
    revealNextClue,
    moveToNextDestination,
  } = useGame({ game });

  const {
    state: timerState,
    handler: timerHandler,
    remainingSeconds,
  } = useTimer(MAX_TIME_MS_PER_QUESTION);

  const [isDecreasing, setIsDecreasing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const handleRevealClick = () => {
    setIsDecreasing(true);
    revealNextClue();
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    console.log("remainingSeconds", remainingSeconds);
    let allocatedPoints = 10;

    if (remainingSeconds > 5 && remainingSeconds <= 10) {
      allocatedPoints = 5;
    } else if (remainingSeconds > 0 && remainingSeconds <= 5) {
      allocatedPoints = 2;
    } else if (remainingSeconds <= 0) {
      allocatedPoints = 0;
    }
    timerHandler.end();
    submitAnswer({
      answer: selectedOption || "EMPTY",
      allocatedPoints,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowModal(false);
    setShowConfetti(false);
    moveToNextDestination();
    timerHandler.start();
    scrollToTop();
  };

  useEffect(() => {
    if (isDecreasing) {
      const timer = setTimeout(() => setIsDecreasing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDecreasing]);

  useEffect(() => {
    // For the first question
    timerHandler.start();
  }, []);

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

  useEffect(() => {
    if (remainingSeconds <= 0) {
      handleConfirm();
    }
  }, [remainingSeconds]);

  let nodeToRender;

  if (destinationsRequestStates.isPending) {
    nodeToRender = (
      <SpinnerContainer>
        <Spinner size={64} color="currentColor" />
      </SpinnerContainer>
    );
  } else if (destinationsRequestStates.isFulfilled) {
    let revealBtnNode;

    if (currentClueIdx === totalClues - 1) {
      revealBtnNode = null;
    } else {
      // if (fetchNextClueRequestStates.isPending) {
      //   revealBtnNode = (
      //     <RevealButton onClick={handleRevealClick}>
      //       <Spinner size={12} color="currentColor" />
      //     </RevealButton>
      //   );
      // } else {
      //   revealBtnNode = (
      //     <RevealButton onClick={handleRevealClick}>
      //       <Eye size={16} />
      //       Reveal Next Clue (-{scoreDeduction} pts)
      //     </RevealButton>
      //   );
      // }
    }
    nodeToRender = (
      <>
        <ScoresContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton onClick={onBack}>
              <ArrowLeft size={18} />
              Exit Game
            </BackButton>
            <p style={{ marginLeft: "8px" }}>
              {timerState.isEnded ? 0 : remainingSeconds}s
            </p>
          </div>
          <StatsGroup>
            <StatPill $type="correct">
              <StatLabel>Correct</StatLabel>
              <StatValue>{stats.correct}</StatValue>
            </StatPill>
            <StatPill $type="wrong">
              <StatLabel>Wrong</StatLabel>
              <StatValue>{stats.wrong}</StatValue>
            </StatPill>
            <StatPill $type="total">
              <StatLabel>Score</StatLabel>
              <StatValue>{totalScore}</StatValue>
            </StatPill>
          </StatsGroup>
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
              {revealBtnNode}
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
                <Button
                  onClick={handleConfirm}
                  fullWidth
                  loading={submitAnswerRequestStates.isPending}
                >
                  Confirm Answer
                </Button>
              </ConfirmSection>
            )}
          </AnswerSection>
        </GameContent>
      </>
    );
  } else if (destinationsRequestStates.isRejected) {
    const errorMessage =
      destinationsRequestStates.error?.message || "Error loading game";
    nodeToRender = <Error message={errorMessage} />;
  }

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

      <Card>{nodeToRender}</Card>

      <ResultModal
        isOpen={showModal}
        onClose={() => {}}
        description={
          isSelectedAnswerCorrect
            ? "Great job! You've found the right destination."
            : "That's not the right destination."
        }
        onPlayAgain={onCreateNewGame}
        onNext={handleNext}
        submissionResult={submissionResult}
      />
    </>
  );
};

export default GameCard;
