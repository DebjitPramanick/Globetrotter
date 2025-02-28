import { FormEvent, useState } from "react";
import { Button } from "@/components/atoms";
import {
  Card,
  CluesSection,
  AnswerSection,
  CluesContainer,
  ClueBox,
  ClueText,
  AnswerForm,
  Input,
  RevealButton,
} from "./index.styled";

interface GameCardProps {
  clues: string[];
  currentClue: number;
  onSubmit: (answer: string) => void;
  onRevealNextClue: () => void;
}

const GameCard = ({
  clues,
  currentClue,
  onSubmit,
  onRevealNextClue,
}: GameCardProps) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer("");
    }
  };

  return (
    <Card>
      <CluesSection>
        <CluesContainer>
          {clues.map((clue, index) => (
            <ClueBox key={index} isRevealed={index <= currentClue}>
              {index <= currentClue && <ClueText>{clue}</ClueText>}
            </ClueBox>
          ))}
        </CluesContainer>
        <RevealButton
          onClick={onRevealNextClue}
          disabled={currentClue === clues.length - 1}
        >
          Reveal Next Clue
        </RevealButton>
      </CluesSection>

      <AnswerSection>
        <AnswerForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your guess..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <Button type="submit" disabled={!answer.trim()} fullWidth>
            Submit Answer
          </Button>
        </AnswerForm>
      </AnswerSection>
    </Card>
  );
};

export default GameCard;
