import { useState } from "react";
import { GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import StartGame from "./components/StartGame";
import { useGame } from "@/hooks";
import AppLayout from "@/layouts/AppLayout";

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const game = useGame();

  if (!game) return null;

  const {
    destination,
    currentClue,
    currentScore,
    totalScore,
    handleAnswer,
    handleRevealNextClue,
  } = game;

  return (
    <AppLayout>
      <GameContainer>
        {!isGameStarted ? (
          <StartGame onStart={() => setIsGameStarted(true)} />
        ) : (
          <GameCard
            destination={destination}
            clues={destination.clues}
            options={destination.options}
            currentClue={currentClue}
            currentScore={currentScore}
            totalScore={totalScore}
            onSubmit={handleAnswer}
            onRevealNextClue={handleRevealNextClue}
          />
        )}
      </GameContainer>
    </AppLayout>
  );
};

export default Game;
