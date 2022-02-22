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
        setTimer(seconds);
        if (seconds <= 0) setIsStart(false);
      }
    }, 1000);
    console.log("called");
    return () => clearInterval(count);
  }, [timer, isStart, initialTime]);

  const startTimer = () => {
    if (isStart) return;
    setIsStart(true);
    setInitialTime(new Date(Date.now() + 10000).getTime());
  };
  const minusTimer = (time) => {
    setTimer((prev) => prev - time);
    setInitialTime((prev) => new Date(prev - time * 1000).getTime());
  };

  const resetTimer = () => {
    setTimer(10);
    setInitialTime(new Date(Date.now() + 10000).getTime());
  };

  return { timer, startTimer, resetTimer, minusTimer };
}
