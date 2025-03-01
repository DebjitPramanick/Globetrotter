import { GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import { useGame } from "@/hooks/useGame";
import AppLayout from "@/layouts/AppLayout";

const Game = () => {
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
      </GameContainer>
    </AppLayout>
  );
};

export default Game;
