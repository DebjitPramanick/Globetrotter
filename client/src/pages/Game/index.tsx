import { useState, useEffect } from "react";
import { GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import StartGame from "./components/StartGame";
import AppLayout from "@/layouts/AppLayout";
import { gameApi } from "@/api";
import { destinationApi } from "@/api";
import { RequestError } from "@/types/error";
import { useRequestState } from "@/hooks";
import { useApp } from "@/context/AppContext";

const Game = () => {
  const { user } = useApp();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startGameRequestStates, startGameRequestStatesHandler] =
    useRequestState();

  const handleGameStart = async () => {
    const payload = { userId: user._id };
    try {
      startGameRequestStatesHandler.pending();
      const response = await gameApi.startGame({
        payload,
      });
      startGameRequestStatesHandler.fulfilled(response.data);
      setIsGameStarted(true);
    } catch (error) {
      startGameRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  if (startGameRequestStates.isPending) {
    return <p>Loading...</p>;
  }

  return (
    <AppLayout>
      <GameContainer>
        {!isGameStarted ? (
          <StartGame
            onStart={handleGameStart}
            isLoading={startGameRequestStates.isPending}
            error={startGameRequestStates.error?.message}
          />
        ) : (
          <GameCard
            game={startGameRequestStates.data}
            onCreateNewGame={handleGameStart}
          />
        )}
      </GameContainer>
    </AppLayout>
  );
};

export default Game;
