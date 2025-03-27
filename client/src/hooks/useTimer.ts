import { useMemo, useRef } from "react";
import { useImmer } from "use-immer";

const INCREASE_TIME_INTERVAL = 1000;

export const useTimer = (maxTimeInMs: number) => {
  const intervalRef = useRef<null | any>(null);

  const [timerState, setTimerState] = useImmer({
    currentTimeMs: maxTimeInMs,
    maxTimeMs: maxTimeInMs,
    isIdle: true,
    isRunning: true,
    isEnded: true,
  });

  const remainingSeconds = useMemo(() => {
    const totalSeconds = timerState.currentTimeMs / 1000;
    return totalSeconds % 60;
  }, [timerState.currentTimeMs]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handler = {
    idle: () => {
      setTimerState((draft) => {
        draft.isIdle = true;
        draft.isRunning = false;
        draft.isEnded = false;
      });
      clearTimer();
    },
    start: () => {
      setTimerState((draft) => {
        draft.isIdle = true;
        draft.isRunning = false;
        draft.isEnded = false;
      });
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setTimerState((draft) => {
            if (draft.currentTimeMs <= 0) {
              clearTimer();
              draft.isRunning = false;
              draft.isEnded = true;
              draft.isIdle = false;
            } else {
              draft.currentTimeMs -= 1000;
            }
          });
        }, INCREASE_TIME_INTERVAL);
      }
    },
    end: () => {
      setTimerState((draft) => {
        draft.isIdle = false;
        draft.isRunning = false;
        draft.isEnded = true;
        draft.currentTimeMs = maxTimeInMs;
      });
      clearTimer();
    },
  };

  return {
    state: timerState,
    handler,
    remainingSeconds,
  };
};
