import { useState, useEffect, use, useMemo } from "react";
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
  ProgressBar,
  ProgressBarFill,
} from "./index.styled";
import { useGame, useTimer } from "@/hooks";
import { Game } from "@/types";
import { ResultModal } from "@/components/molecules";
import { useTheme } from "styled-components";

interface GameCardProps {
  game: Game;
  onCreateNewGame: () => void;
  onBack: () => void;
}

const MAX_TIME_MS_PER_QUESTION = 45000;

const GameCard = ({ game, onCreateNewGame, onBack }: GameCardProps) => {
  const theme = useTheme();
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
    // setIsDecreasing(true);
    revealNextClue();
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const allocatedPoints = useMemo(() => {
    if (timerState.isEnded) {
      return 0;
    }

    const remainingSecondsInPercentage =
      ((remainingSeconds * 1000) / MAX_TIME_MS_PER_QUESTION) * 100;

    let allocatedPoints = 0;

    if (remainingSecondsInPercentage >= 60) {
      allocatedPoints = scoreToObtain;
    } else if (remainingSecondsInPercentage >= 30) {
      allocatedPoints = scoreToObtain / 2;
    } else if (remainingSecondsInPercentage > 0) {
      allocatedPoints = scoreToObtain / 4;
    } else {
      allocatedPoints = 0;
    }
    return Math.floor(allocatedPoints);
  }, [remainingSeconds, timerState.isEnded]);

  const handleConfirm = () => {
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

  useEffect(() => {
    setIsDecreasing(true);
  }, [allocatedPoints]);

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
      if (fetchNextClueRequestStates.isPending) {
        revealBtnNode = (
          <RevealButton onClick={handleRevealClick}>
            <Spinner size={12} color="currentColor" />
          </RevealButton>
        );
      } else {
        revealBtnNode = (
          <RevealButton onClick={handleRevealClick}>
            <Eye size={16} />
            Reveal Next Clue
          </RevealButton>
        );
      }
    }

    nodeToRender = (
      <>
        <ScoresContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <BackButton onClick={onBack}>
              <ArrowLeft size={18} />
              Exit Game
            </BackButton>
          </div>
          <StatsGroup>
            <StatPill style={{ marginLeft: "8px" }} $type="timer">
              <StatLabel>Time Remaining</StatLabel>
              <StatValue>
                {timerState.isEnded ? 0 : remainingSeconds}s
              </StatValue>
            </StatPill>
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
                  {allocatedPoints}
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

  const progressBarFillWidth = useMemo(() => {
    if (timerState.isEnded) {
      return 0;
    }
    return ((remainingSeconds * 1000) / MAX_TIME_MS_PER_QUESTION) * 100;
  }, [remainingSeconds, timerState.isEnded]);

  const progressBarFillColor = useMemo(() => {
    if (progressBarFillWidth >= 60) {
      return theme.colors.success;
    } else if (progressBarFillWidth >= 30) {
      return theme.colors.accent;
    } else {
      return theme.colors.error;
    }
  }, [progressBarFillWidth]);

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

      <Card>
        <ProgressBar>
          <ProgressBarFill
            style={{
              width: `${progressBarFillWidth}%`,
              backgroundColor: progressBarFillColor,
            }}
          />
        </ProgressBar>
        {nodeToRender}
      </Card>

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
