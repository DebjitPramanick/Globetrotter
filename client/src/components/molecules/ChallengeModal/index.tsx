import { X } from "react-feather";
import { IconButton } from "@/components/atoms";
import {
  Overlay,
  Container,
  Title,
  Message,
  ScoreWrapper,
  Score,
  ScoreLabel,
  AnimatedTrophy,
} from "./index.styled";

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviterName: string;
  inviterScore: number;
}

const ChallengeModal = ({
  isOpen,
  onClose,
  inviterName,
  inviterScore,
}: ChallengeModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: "16px", top: "16px" }}
        >
          <X size={24} onClick={onClose} />
        </IconButton>
        <AnimatedTrophy>🏆</AnimatedTrophy>
        <Title>Challenge Accepted!</Title>
        <Message>
          <span style={{ color: "#fff" }}>@{inviterName}</span> has challenged
          you to beat their high score in Globetrotter
        </Message>
        <ScoreWrapper>
          <Score>{inviterScore}</Score>
          <ScoreLabel>points to beat</ScoreLabel>
        </ScoreWrapper>
      </Container>
    </Overlay>
  );
};

export default ChallengeModal;
