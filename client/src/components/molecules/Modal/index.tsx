import { useEffect } from "react";
import { CheckCircle, Frown } from "react-feather";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalDescription,
  ButtonGroup,
  ActionButton,
  FeedbackContainer,
  StatsMessage,
  FunFactContainer,
} from "./index.styled";
import { SubmissionResult } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onPlayAgain: () => void;
  onNext: () => void;
  submissionResult: SubmissionResult;
}

const Modal = ({
  isOpen,
  onClose,
  description,
  onPlayAgain,
  onNext,
  submissionResult,
}: ModalProps) => {
  const { isCorrect, correctAnswers, wrongAnswers, funFact } =
    submissionResult || {};

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getStatsMessage = () => {
    const total = correctAnswers + wrongAnswers;
    const percentage = Math.round((correctAnswers / total) * 100) || 0;

    if (percentage >= 80) {
      return (
        <>
          <span className="highlight">{percentage}% Accuracy!</span>{" "}
          <span className="text">You're on fire! 🔥</span>
        </>
      );
    } else if (percentage >= 50) {
      return (
        <>
          <span className="highlight">{percentage}% Accuracy</span>{" "}
          <span className="text">Keep it up! 💪</span>
        </>
      );
    } else {
      return (
        <>
          <span className="highlight">{percentage}% Accuracy</span>{" "}
          <span className="text">Practice makes perfect! 🎯</span>
        </>
      );
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $isCorrect={isCorrect}
      >
        <ModalContent>
          <FeedbackContainer $isCorrect={isCorrect}>
            {isCorrect ? (
              <>
                <CheckCircle />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <Frown />
                <span>Wrong Answer</span>
              </>
            )}
          </FeedbackContainer>
          <StatsMessage $isCorrect={isCorrect}>
            {getStatsMessage()}
          </StatsMessage>
          <FunFactContainer>
            <div className="label">Fun Fact</div>
            <div className="fact">{funFact}</div>
          </FunFactContainer>
          <ButtonGroup>
            <ActionButton onClick={onPlayAgain}>Play Again</ActionButton>
            {submissionResult.isGameCompleted ? null : (
              <ActionButton onClick={onNext}>Next</ActionButton>
            )}
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
