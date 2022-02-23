import React, { createContext, useEffect, useState } from "react";
import useTimer from "./useTimer";
import useColor from "./useColor";
import { blink } from "./utils";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const [score, setScore] = useState(0);
  const [column, setColumn] = useState(2);
  const [mode, setMode] = useState("EASY");
  const {
    setMaxTimer,
    timer,
    startTimer,
    resetTimer,
    minusTimer,
    setMinusTime,
    maxTimer,
    isStart,
  } = useTimer({ mode, setMode, column });
  const { colors, correctIndex, randomColor } = useColor({ score });

  const user = { name: "โชกุนนน", score: 10 };

  const correct = () => {
    setScore((prev) => prev + 1);
    resetTimer();
  };
  const wrong = () => {
    if (timer > 0) return minusTimer();
    setMode("GAME_OVER");
  };

  useEffect(() => {
    if (score > 0 && score % 5 == 0 && column <= 4)
      setColumn((prev) => prev + 1);
    if (score >= 5 && score <= 10) setMode("NORMAL");
    if (score >= 10 && score <= 15) setMode("HARD");
    if (score >= 16 && score <= 21) setMode("INSANE");
  }, [score]);

  useEffect(() => {
    // if (score >= 5 && score <= 40) setMode("NORMAL");
    // if (score > 40 && score <= 60) setMode("HARD");
    // if (score > 60 && score <= 80) setMode("INSANE");
    // if (score > 80 && score <= 100) setMode("GOD");
    let blink;
    switch (mode) {
      case "EASY":
        randomColor(column);
        setMaxTimer(10);
        setMinusTime(2);
        break;
      case "NORMAL":
        randomColor(column);
        setMaxTimer(5);
        setMinusTime(3);
        break;
      case "HARD":
        randomColor(column);
        setMaxTimer(10);
        setMinusTime(4);
        blink = setInterval(() => randomColor(column), 2 * 1000);
        break;
      case "INSANE":
        randomColor(column);
        setMaxTimer(2);
        setMinusTime(1);
        break;
      case "RESET":
        setScore(0);
        setColumn(2);
        resetTimer();
        setMode("EASY");
        break;
    }
    return () => clearInterval(blink);
  }, [score, mode, column]);

  const contextValue = {
    user,
    isStart,
    timer,
    startTimer,
    resetTimer,
    maxTimer,
    colors,
    correctIndex,
    randomColor,
    score,
    minusTimer,
    column,
    correct,
    wrong,
    mode,
    setMode,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
