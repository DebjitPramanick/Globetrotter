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
}

const StartGame = ({ onStart }: StartGameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 800);
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
          <Button
            onClick={handleClick}
            className={isAnimating ? "animate" : ""}
            disabled={isAnimating}
            size="large"
            fullWidth
          >
            Start Adventure
          </Button>
        </StartGameContainer>
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

export default StartGame;
