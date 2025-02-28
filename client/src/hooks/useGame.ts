import { useState, useEffect } from "react";
import { DESTINATIONS } from "@/constants";
import { useRouter } from "next/router";
import { useApp } from "@/context/AppContext";
interface UseGameReturn {
  currentDestination: number;
  currentClue: number;
  totalScore: number;
  currentScore: number;
  destination: (typeof DESTINATIONS)[0];
  handleAnswer: (answer: string) => void;
  handleRevealNextClue: () => void;
}

const MAX_SCORE_PER_QUESTION = 100;
const SCORE_DEDUCTION = 25;

export const useGame = (): UseGameReturn => {
  const router = useRouter();
  const { username } = useApp();
  const [currentDestination, setCurrentDestination] = useState(0);
  const [currentClue, setCurrentClue] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(MAX_SCORE_PER_QUESTION);

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  const handleAnswer = (answer: string) => {
    const destination = DESTINATIONS[currentDestination];
    if (answer.toLowerCase() === destination.name.toLowerCase()) {
      setTotalScore(totalScore + currentScore);
      if (currentDestination < DESTINATIONS.length - 1) {
        setCurrentDestination(currentDestination + 1);
        setCurrentClue(0);
        setCurrentScore(MAX_SCORE_PER_QUESTION);
      }
    }
  };

  const handleRevealNextClue = () => {
    const destination = DESTINATIONS[currentDestination];
    if (currentClue < destination.clues.length - 1) {
      setCurrentClue(currentClue + 1);
      setCurrentScore(Math.max(0, currentScore - SCORE_DEDUCTION));
    }
  };

  return {
    currentDestination,
    currentClue,
    totalScore,
    currentScore,
    destination: DESTINATIONS[currentDestination],
    handleAnswer,
    handleRevealNextClue,
  };
};
