import { useState } from "react";
import { BackgroundWrapper, GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import StartGame from "./components/StartGame";
import AppLayout from "@/layouts/AppLayout";
import { gameApi } from "@/api";
import { RequestError } from "@/types/error";
import { useRequestState } from "@/hooks";
import { useApp } from "@/context/AppContext";
import { showErrorToast } from "@/utils/notifications";
import { FloatingElements } from "@/components/molecules";
import { extractErrorMessage } from "@/utils/error";

const GAME_CARD_DIMENSIONS = {
  width: "600px",
  height: "400px",
};

const Game = () => {
  const { user, createAnonymousUser } = useApp();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startGameRequestStates, startGameRequestStatesHandler] =
    useRequestState();

  const handleGameStart = async () => {
    let userId = user._id;
    if (!userId) {
      const anonymousUser = await createAnonymousUser();
      userId = anonymousUser?._id || "";
    }
    const payload = { userId };
    try {
      startGameRequestStatesHandler.pending();
      const response = await gameApi.startGame({
        payload,
      });
      startGameRequestStatesHandler.fulfilled(response.data);
      setIsGameStarted(true);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      startGameRequestStatesHandler.rejected(new RequestError(errorMessage));
      showErrorToast(errorMessage);
    }
  };

  const handleBack = () => {
    setIsGameStarted(false);
  };

  let nodeToRender;

  if (startGameRequestStates.isFulfilled) {
    nodeToRender = (
      <GameCard
        game={startGameRequestStates.data}
        onCreateNewGame={handleGameStart}
        onBack={handleBack}
      />
    );
  }

  return (
    <AppLayout>
      <BackgroundWrapper>
        <FloatingElements />
        <GameContainer>
          {!isGameStarted ? (
            <StartGame
              onStart={handleGameStart}
              isLoading={startGameRequestStates.isPending}
            />
          ) : (
            nodeToRender
          )}
        </GameContainer>
      </BackgroundWrapper>
    </AppLayout>
  );
};

export default Game;
