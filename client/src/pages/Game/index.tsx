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
import { Destination } from "@/types";

const Game = () => {
  const { username } = useApp();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startGameRequestStates, startGameRequestStatesHandler] =
    useRequestState();

  const handleGameStart = async () => {
    const payload = { username };
    try {
      startGameRequestStatesHandler.pending();
      const response = await gameApi.startGame({ payload });
      startGameRequestStatesHandler.fulfilled(response.data);
      setIsGameStarted(true);
    } catch (error) {
      startGameRequestStatesHandler.rejected(new RequestError(error));
    }
  };

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
          <GameCard game={startGameRequestStates.data} />
        )}
      </GameContainer>
    </AppLayout>
  );
};

export default Game;
