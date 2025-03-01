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
} from "./index.styled";

interface StartGameProps {
  onStart: () => void;
  isLoading: boolean;
  error?: string;
}

const StartGame = ({ onStart, isLoading }: StartGameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onStart();
    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
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
        <Button
          onClick={handleClick}
          className={isAnimating ? "animate" : ""}
          disabled={isAnimating}
          loading={isLoading}
          loadingText="Starting Game..."
          size="large"
          fullWidth
        >
          Start Adventure
        </Button>
      </StartGameContainer>
    </ContentWrapper>
  );
};

export default StartGame;
