import { useState } from "react";
import { Button } from "@/components/atoms";
import { FloatingElements } from "@/components/molecules";
import {
  StartGameContainer,
  Title,
  Instructions,
  InstructionItem,
  BackgroundWrapper,
  ContentWrapper,
  ErrorMessage,
} from "./index.styled";

interface StartGameProps {
  onStart: () => void;
  isLoading: boolean;
  error?: string;
}

const StartGame = ({ onStart, isLoading, error }: StartGameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onStart();
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <BackgroundWrapper>
      <FloatingElements />
      <ContentWrapper>
        <StartGameContainer>
          <Title>Ready to Begin?</Title>
          <Instructions>
            <InstructionItem>
              🎯 Find hidden destinations using clues
            </InstructionItem>
            <InstructionItem>
              🤔 Each clue reveals more information
            </InstructionItem>
            <InstructionItem>
              ⭐ Score points by finding destinations quickly
            </InstructionItem>
            <InstructionItem>
              🌟 Compete with others on the leaderboard
            </InstructionItem>
          </Instructions>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            onClick={handleClick}
            className={isAnimating ? "animate" : ""}
            disabled={isLoading || isAnimating}
            size="large"
            fullWidth
          >
            {isLoading ? "Starting Game..." : "Start Adventure"}
          </Button>
        </StartGameContainer>
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

export default StartGame;
