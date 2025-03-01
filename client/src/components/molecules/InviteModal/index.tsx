import { Copy, X } from "react-feather";
import { IconButton } from "@/components/atoms";
import { useState, useEffect } from "react";
import {
  Overlay,
  Container,
  Title,
  Description,
  InputWrapper,
  Input,
  AnimationWrapper,
  AvatarImage,
  ImageLoader,
} from "./index.styled";

const AVATAR_STYLES = ["adventurer", "avataaars", "bottts", "fun-emoji"];

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsImageLoaded(false);
      const randomStyle =
        AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
      const seed = Math.random().toString(36).substring(7);
      setAvatarUrl(
        `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}`
      );
    }
  }, [isOpen]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (!isOpen) return null;

  const getInviteUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/play/invite`;
  };

  const handleCopyInvite = async () => {
    await navigator.clipboard.writeText(getInviteUrl());
    // TODO: Show toast notification
  };

  const handleClose = () => {
    onClose();
    setIsImageLoaded(false);
  };

  return (
    <Overlay onClick={handleClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: "16px", top: "16px" }}
        >
          <X size={24} />
        </IconButton>
        <Title>Challenge a Friend</Title>
        <Description>
          Share this link with a friend to challenge them!
        </Description>
        <AnimationWrapper>
          {!isImageLoaded && <ImageLoader />}
          <AvatarImage
            src={avatarUrl}
            alt="Random avatar"
            onLoad={handleImageLoad}
            $isLoaded={isImageLoaded}
          />
        </AnimationWrapper>
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
