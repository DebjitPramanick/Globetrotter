import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContainer, Title, Username } from "./index.styled";
import GameCard from "./components/GameCard";
import Progress from "./components/Progress";

// Mock data - Replace with your actual data
const mockClues = [
  {
    id: 1,
    clue: "This ancient wonder sits atop a limestone plateau and has the face of a mythical creature.",
    answer: "sphinx",
    facts: [
      "Built over 4,500 years ago",
      "Missing nose mystery",
      "Symbol of ancient Egypt",
    ],
  },
  // Add more clues
];

const Game = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [currentClue, setCurrentClue] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleAnswer = (answer: string) => {
    if (answer.toLowerCase() === mockClues[currentClue].answer.toLowerCase()) {
      setScore(score + 1);
      // Show success message and facts
    } else {
      // Show hint or try again message
    }
  };

  if (!username) return null;

  return (
    <GameContainer>
      <Title>
        Welcome, <Username>{username}</Username>!
      </Title>
      <Progress
        current={currentClue + 1}
        total={mockClues.length}
        score={score}
      />
      <GameCard
        clueNumber={currentClue + 1}
        clueText={mockClues[currentClue].clue}
        onSubmit={handleAnswer}
      />
    </GameContainer>
  );
};

export default Game;
