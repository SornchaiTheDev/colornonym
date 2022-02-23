import { useState, useEffect } from "react";

export default function useTimer({ mode, setMode }) {
  const [initialTime, setInitialTime] = useState(null);
  const [timer, setTimer] = useState(10);
  const [maxTimer, setMaxTimer] = useState(10);
  const [minusTime, setMinusTime] = useState(3);
  const [isStart, setIsStart] = useState(false);

  // Countdown Function
  useEffect(() => {
    const count = setInterval(() => {
      if (isStart) {
        const seconds = Math.round((initialTime - Date.now()) / 1000);
        setTimer(seconds);
        if (seconds <= 0) {
          setIsStart(false);
          setMode("GAME_OVER");
        }
      }
    }, 1000);

    return () => clearInterval(count);
  }, [timer, isStart, initialTime]);

  useEffect(() => {
    resetTimer();
  }, [maxTimer]);

  const startTimer = () => {
    setIsStart(true);
    setInitialTime(Date.now() + maxTimer * 1000);
  };

  const minusTimer = () => {
    setTimer((prev) => prev - minusTime);
    setInitialTime((prev) => prev - minusTime * 1000);
  };

  const resetTimer = () => {
    setTimer(maxTimer);
    setInitialTime(Date.now() + maxTimer * 1000);
  };

  return {
    timer,
    setMaxTimer,
    startTimer,
    resetTimer,
    minusTimer,
    maxTimer,
    isStart,
    setMinusTime,
  };
}
