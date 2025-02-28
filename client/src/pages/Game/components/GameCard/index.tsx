import { FormEvent, useState } from "react";
import { Button } from "@/components/atoms";
import { Card, ClueNumber, ClueText, AnswerForm, Input } from "./index.styled";

interface GameCardProps {
  clueNumber: number;
  clueText: string;
  onSubmit: (answer: string) => void;
}

const GameCard = ({ clueNumber, clueText, onSubmit }: GameCardProps) => {
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
      <ClueNumber>Clue #{clueNumber}</ClueNumber>
      <ClueText>{clueText}</ClueText>
      <AnswerForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your guess..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <Button type="submit" disabled={!answer.trim()}>
          Submit
        </Button>
      </AnswerForm>
    </Card>
  );
};

export default GameCard;
