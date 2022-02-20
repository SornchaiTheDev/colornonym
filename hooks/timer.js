import { useState, useEffect } from "react";

export default function useTimer() {
  const [initialTime, setInitialTime] = useState(null);
  const [timer, setTimer] = useState(10);
  const [isStart, setIsStart] = useState(false);

  // Countdown Function
  useEffect(() => {
    const count = setInterval(() => {
      if (isStart) {
        const seconds = Math.round(
          (initialTime - new Date(Date.now()).getTime()) / 1000
        );
        if (seconds <= 0) setIsStart(false);
        setTimer(seconds);
      }
    }, 1000);
    return () => clearInterval(count);
  }, [timer, isStart]);

  const startTimer = () => {
    if (isStart) return;
    setIsStart(true);
    setInitialTime(new Date(Date.now() + 10000).getTime());
  };

  const resetTimer = () => {
    setTimer(10);
    setInitialTime(new Date(Date.now() + 10000).getTime());
  };

  return [timer, startTimer, resetTimer];
}