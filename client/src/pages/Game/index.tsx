import { GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import { useGame } from "@/hooks/useGame";

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
    <GameContainer>
      <GameCard
        clues={destination.clues}
        currentClue={currentClue}
        currentScore={currentScore}
        totalScore={totalScore}
        onSubmit={handleAnswer}
        onRevealNextClue={handleRevealNextClue}
      />
    </GameContainer>
  );
};

export default Game;
