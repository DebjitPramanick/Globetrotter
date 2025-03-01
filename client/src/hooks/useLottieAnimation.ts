import { useState, useEffect } from "react";

export const useLottieAnimation = (
  url: string,
  shouldFetch: boolean = true
) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      if (!shouldFetch) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch animation");
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error loading animation:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
  }, [url, shouldFetch]);

  return { animationData, isLoading, error };
};
