import { useState, useEffect } from "react";

/**
 *
 * create a timer using date - now
 * check if user click button
 */

export default function useTimer() {
  const [initialTime, setInitialTime] = useState(null);
  const [time, setTime] = useState(10);
  const [isStart, setIsStart] = useState(false);

  // Countdown Function
  useEffect(() => {
    const count = setInterval(() => {
      if (isStart) {
        const seconds = Math.round(
          (initialTime - new Date(Date.now()).getTime()) / 1000
        );
        if (seconds <= 0) setIsStart(false);
        setTime(seconds);
      }
    }, 1000);
    return () => clearInterval(count);
  }, [time, isStart]);

  const startTimer = () => {
    setIsStart(true);
    setInitialTime(new Date(Date.now() + 10000).getTime());
  };

  return [time, startTimer];
}
