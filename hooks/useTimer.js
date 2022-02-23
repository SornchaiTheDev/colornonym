import { useState, useEffect } from "react";

export default function useTimer() {
  const [initialTime, setInitialTime] = useState(null);
  const [timer, setTimer] = useState(10);
  const [maxTimer, setMaxTimer] = useState(10);
  const [minusTime, setMinusTime] = useState(3);
  const [isStart, setIsStart] = useState(false);

  // Countdown Function
  useEffect(() => {
    const count = setInterval(() => {
      if (isStart) {
        const seconds = Math.round(
          (initialTime - new Date(Date.now()).getTime()) / 1000
        );
        setTimer(seconds);
        if (seconds <= 0) setIsStart(false);
      }
    }, 1000);
    return () => clearInterval(count);
  }, [timer, isStart, initialTime]);

  const startTimer = () => {
    setIsStart(true);
    setInitialTime(new Date(Date.now() + maxTimer * 1000).getTime());
  };

  const minusTimer = () => {
    setTimer((prev) => prev - minusTime);
    setInitialTime((prev) => new Date(prev - minusTime * 1000).getTime());
  };

  const resetTimer = () => {
    setTimer(maxTimer);
    setMaxTimer(timer);
    setInitialTime(new Date(Date.now() + maxTimer * 1000).getTime());
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
