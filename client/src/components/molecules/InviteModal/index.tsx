import { Copy, X } from "react-feather";
import { Error, IconButton, Spinner } from "@/components/atoms";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { statsApi } from "@/api";
import { useRequestState } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
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
import { RequestError } from "@/types/error";

const AVATAR_STYLES = ["adventurer", "avataaars", "bottts", "fun-emoji"];

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { user } = useApp();
  const [statsRequestStates, statsRequestStatesHandler] = useRequestState();

  useEffect(() => {
    if (isOpen && user._id) {
      fetchUserStats();
    }
  }, [isOpen, user._id]);

  const fetchUserStats = async () => {
    try {
      statsRequestStatesHandler.pending();
      const response = await statsApi.getUserStats({ userId: user._id });
      statsRequestStatesHandler.fulfilled(response.data);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      statsRequestStatesHandler.rejected(new RequestError(errorMessage));
    }
  };

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
    const bestScore = statsRequestStates.data?.bestScore || 0;
    const username = user.username || "Anonymous";
    return `${baseUrl}/play/invite?from=${encodeURIComponent(
      username
    )}&score=${bestScore}`;
  };

  const handleCopyInvite = async () => {
    await navigator.clipboard.writeText(getInviteUrl());
    // TODO: Show toast notification
  };

  const handleClose = () => {
    onClose();
    setIsImageLoaded(false);
  };
  let nodeToRender = null;

  if (statsRequestStates.isPending) {
    nodeToRender = <Spinner />;
  } else if (statsRequestStates.isFulfilled) {
    nodeToRender = (
      <>
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
      </>
    );
  } else if (statsRequestStates.isRejected) {
    const errorMessage =
      statsRequestStates.error?.message || "Something went wrong";
    nodeToRender = <Error message={errorMessage} />;
  }

  return (
    <Overlay onClick={handleClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", right: "16px", top: "16px" }}
        >
          <X size={24} />
        </IconButton>
        {nodeToRender}
      </Container>
    </Overlay>
  );
};

export default InviteModal;
