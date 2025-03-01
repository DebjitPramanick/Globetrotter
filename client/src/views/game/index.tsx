import { useState, useEffect } from "react";
import { BackgroundWrapper, GameContainer } from "./index.styled";
import GameCard from "./components/GameCard";
import StartGame from "./components/StartGame";
import AppLayout from "@/layouts/AppLayout";
import { gameApi } from "@/api";
import { RequestError } from "@/types/error";
import { useRequestState } from "@/hooks";
import { useApp } from "@/context/AppContext";
import { showErrorToast, showInfoToast } from "@/utils/notifications";
import { FloatingElements } from "@/components/molecules";
import { extractErrorMessage } from "@/utils/error";
import { useRouter } from "next/router";
import ChallengeModal from "@/components/molecules/ChallengeModal";

const SLOW_RESPONSE_THRESHOLD = 2000; // 2 seconds

const GamePageView = () => {
  const router = useRouter();
  const { challenge, from, score } = router.query;
  const { user, createAnonymousUser } = useApp();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startGameRequestStates, startGameRequestStatesHandler] =
    useRequestState();
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  useEffect(() => {
    if (challenge === "true" && from && score) {
      setShowChallengeModal(true);
    }
  }, [challenge, from, score]);

  const handleGameStart = async () => {
    let userId = user._id;
    if (!userId) {
      const anonymousUser = await createAnonymousUser();
      userId = anonymousUser?._id || "";
    }
    const payload = { userId };

    // Start timer for response time check
    const startTime = Date.now();
    let timeoutId: NodeJS.Timeout | null = null;

    try {
      startGameRequestStatesHandler.pending();

      // Set timeout to check for slow response
      timeoutId = setTimeout(() => {
        showInfoToast(
          "Please wait a moment, our server might be waking up from sleep mode..."
        );
      }, SLOW_RESPONSE_THRESHOLD);

      const response = await gameApi.startGame({
        payload,
      });

      if (timeoutId) clearTimeout(timeoutId);
      startGameRequestStatesHandler.fulfilled(response.data);
      setIsGameStarted(true);

      // Check if response was slow but successful
      const responseTime = Date.now() - startTime;
      if (responseTime > SLOW_RESPONSE_THRESHOLD) {
        showInfoToast("Thanks for your patience! The game is ready now.");
      }
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
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
      <ChallengeModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        inviterName={from as string}
        inviterScore={Number(score)}
      />
    </AppLayout>
  );
};

export default GamePageView;
