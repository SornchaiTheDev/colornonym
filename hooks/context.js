import React, { createContext, useEffect, useState } from "react";
import useTimer from "./useTimer";
import useColor from "./useColor";
import useGame from "./useGame";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const [columnScore, setColumnScore] = useState(0);
  const [column, setColumn] = useState(2);
  const {
    setMaxTimer,
    timer,
    startTimer,
    resetTimer,
    minusTimer,
    setMinusTime,
    maxTimer,
    isStart,
  } = useTimer();
  const { colors, correctIndex, randomColor } = useColor({ columnScore });
  const { score, addScore, mode, correct, wrong } = useGame({
    resetTimer,
    randomColor,
    minusTimer,
    maxTimer,
  });
  const user = { name: "โชกุนนน", score: 10 };

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
    }
  }, [score]);

  useEffect(() => {
    console.log(timer);
    console.log(mode);
  }, [timer]);

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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
