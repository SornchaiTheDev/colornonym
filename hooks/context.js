import React, { createContext, useEffect, useState } from "react";
import useTimer from "./useTimer";
import useColor from "./useColor";
import useGame from "./useGame";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const [columnScore, setColumnScore] = useState(0);
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
  } = useTimer({ mode, setMode });
  const { colors, correctIndex, randomColor } = useColor({ columnScore });
  const { score, addScore, correct, wrong, setScore } = useGame({
    timer,
    startTimer,
    resetTimer,
    randomColor,
    minusTimer,
    maxTimer,
    setMode,
  });
  const user = { name: "โชกุนนน", score: 10 };

  useEffect(() => {
    if (score >= 20 && score <= 40) setMode("NORMAL");
    if (score > 40 && score <= 60) setMode("HARD");
    if (score > 60 && score <= 80) setMode("INSANE");
    if (score > 80 && score <= 100) setMode("GOD");
  }, [score]);

  useEffect(() => {
    setColumnScore(score);
    setColumn(
      Math.floor(columnScore / 5) + 2 <= 5 ? Math.floor(columnScore / 5) + 2 : 5
    );
    switch (mode) {
      case "EASY":
        setMaxTimer(10);
        setMinusTime(2);
        break;
      case "NORMAL":
        setMaxTimer(5);
        setMinusTime(3);
        break;
      case "HARD":
        setMaxTimer(3);
        setMinusTime(3);
        break;
      case "INSANE":
        setMaxTimer(2);
        break;
      case "GOD":
        setMaxTimer(1);
        break;
      case "RESET":
        setScore(0);
        setMode("EASY");
        randomColor();
        resetTimer();

        break;
    }
  }, [score, mode]);

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
    addScore,
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
