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
    setTimeout(() => setIsAnimating(false), 800);
  };

  const instructions = [
    "🎯 Find hidden destinations using clues",
    "🤔 Each clue reveals more information",
    "⭐ Score points by finding destinations quickly",
    "🌟 Check your stats and try to perform better",
  ];

  return (
    <ContentWrapper>
      <StartGameContainer>
        <Title>Ready to Begin?</Title>
        <Instructions>
          {instructions.map((instruction, index) => (
            <InstructionItem key={index} $delay={0.2 + index * 0.1}>
              {instruction}
            </InstructionItem>
          ))}
        </Instructions>
        <Button
          onClick={handleClick}
          className={isAnimating ? "animate" : ""}
          disabled={isAnimating}
          loading={isLoading}
          loadingText="Starting Game..."
          size="medium"
          fullWidth
        >
          Start Adventure
        </Button>
      </StartGameContainer>
    </ContentWrapper>
  );
};

export default StartGame;
