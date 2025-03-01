import { Copy, X } from "react-feather";
import { IconButton } from "@/components/atoms";
import {
  Overlay,
  Container,
  Title,
  Description,
  InputWrapper,
  Input,
} from "./index.styled";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  if (!isOpen) return null;

  const getInviteUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/play/invite`;
  };

  const handleCopyInvite = async () => {
    await navigator.clipboard.writeText(getInviteUrl());
    // TODO: Show toast notification
  };

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: "16px", top: "16px" }}
        >
          <X size={24} />
        </IconButton>
        <Title>Challenge a Friend</Title>
        <Description>
          Share this link with a friend to challenge them!
        </Description>
        <InputWrapper>
          <Input
            value={getInviteUrl()}
            readOnly
            onClick={(e) => e.currentTarget.select()}
          />
          <IconButton
            onClick={handleCopyInvite}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Copy size={16} />
          </IconButton>
        </InputWrapper>
      </Container>
    </Overlay>
  );
};

export default InviteModal;
