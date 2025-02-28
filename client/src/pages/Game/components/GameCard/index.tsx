import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/atoms";
import { Eye } from "react-feather";
import {
  Card,
  CluesSection,
  CluesHeader,
  AnswerSection,
  CluesContainer,
  ClueBox,
  ClueText,
  AnswerForm,
  Input,
  RevealButton,
  ScoreDisplay,
  ScoreNumber,
  TotalScore,
  ScoresContainer,
  GameContent,
} from "./index.styled";

interface GameCardProps {
  clues: string[];
  currentClue: number;
  currentScore: number;
  totalScore: number;
  onSubmit: (answer: string) => void;
  onRevealNextClue: () => void;
}

const GameCard = ({
  clues,
  currentClue,
  currentScore,
  totalScore,
  onSubmit,
  onRevealNextClue,
}: GameCardProps) => {
  const [answer, setAnswer] = useState("");
  const [isDecreasing, setIsDecreasing] = useState(false);

  useEffect(() => {
    if (isDecreasing) {
      const timer = setTimeout(() => setIsDecreasing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDecreasing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer("");
    }
  };

  const handleRevealClick = () => {
    setIsDecreasing(true);
    onRevealNextClue();
  };

  return (
    <Card>
      <ScoresContainer>
        <TotalScore>Total Score: {totalScore}</TotalScore>
        <ScoreDisplay>
          <ScoreNumber isDecreasing={isDecreasing}>{currentScore}</ScoreNumber>
          pts
        </ScoreDisplay>
      </ScoresContainer>

      <GameContent>
        <CluesSection>
          <CluesHeader>
            <RevealButton
              onClick={handleRevealClick}
              disabled={currentClue === clues.length - 1}
            >
              <Eye size={16} />
              Reveal Next Clue (-25 pts)
            </RevealButton>
          </CluesHeader>
          <CluesContainer>
            {clues.map((clue, index) => (
              <ClueBox key={index} isRevealed={index <= currentClue}>
                {index <= currentClue && <ClueText>{clue}</ClueText>}
              </ClueBox>
            ))}
          </CluesContainer>
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
      </GameContent>
    </Card>
  );
};

export default GameCard;
