import { useEffect } from "react";
import { X } from "react-feather";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  CloseButton,
  ModalTitle,
  ModalDescription,
  ButtonGroup,
  ActionButton,
  StatsContainer,
  StatItem,
  StatLabel,
  StatValue,
} from "./index.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onPlayAgain: () => void;
  onNext: () => void;
  isCorrect: boolean;
  stats: {
    correct: number;
    wrong: number;
  };
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  onPlayAgain,
  onNext,
  isCorrect,
  stats,
}: ModalProps) => {
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

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $isCorrect={isCorrect}
      >
        {/* <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton> */}
        <ModalContent>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
          <StatsContainer>
            <StatItem>
              <StatValue $type="correct">{stats.correct}</StatValue>
              <StatLabel>Correct</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue $type="wrong">{stats.wrong}</StatValue>
              <StatLabel>Wrong</StatLabel>
            </StatItem>
          </StatsContainer>
          <ButtonGroup>
            <ActionButton onClick={onPlayAgain}>Play Again</ActionButton>
            <ActionButton onClick={onNext}>Next</ActionButton>
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
