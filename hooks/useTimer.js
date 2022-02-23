import { useState, useEffect } from "react";

export default function useTimer() {
  const [initialTime, setInitialTime] = useState(null);
  const [timer, setTimer] = useState(10);
  const [maxTimer, setMaxTimer] = useState(10);
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

  const startTimer = (seconds = 10) => {
    setIsStart(true);
    setTimer(seconds);
    setMaxTimer(seconds);
    setInitialTime(new Date(Date.now() + seconds * 1000).getTime());
  };
  
  const minusTimer = (time) => {
    setTimer((prev) => prev - time);
    setInitialTime((prev) => new Date(prev - time * 1000).getTime());
  };

  const resetTimer = (seconds = 10) => {
    setTimer(seconds);
    setMaxTimer(seconds);
    setInitialTime(new Date(Date.now() + seconds * 1000).getTime());
  };

  return { timer, startTimer, resetTimer, minusTimer, maxTimer, isStart };
}
