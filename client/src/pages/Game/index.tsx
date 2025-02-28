import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import { DESTINATIONS } from "@/constants";

const Game = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [currentDestination, setCurrentDestination] = useState(0);
  const [currentClue, setCurrentClue] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleAnswer = (answer: string) => {
    const destination = DESTINATIONS[currentDestination];
    if (answer.toLowerCase() === destination.name.toLowerCase()) {
      setScore(score + 1);
      if (currentDestination < DESTINATIONS.length - 1) {
        setCurrentDestination(currentDestination + 1);
        setCurrentClue(0);
      }
    }
  };

  const handleRevealNextClue = () => {
    const destination = DESTINATIONS[currentDestination];
    if (currentClue < destination.clues.length - 1) {
      setCurrentClue(currentClue + 1);
    }
  };

  if (!username) return null;

  const destination = DESTINATIONS[currentDestination];

  return (
    <GameContainer>
      <GameCard
        clues={destination.clues}
        currentClue={currentClue}
        onSubmit={handleAnswer}
        onRevealNextClue={handleRevealNextClue}
      />
    </GameContainer>
  );
};

export default Game;
