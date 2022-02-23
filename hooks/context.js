import React, { createContext, useEffect, useState } from "react";
import useTimer from "./useTimer";
import useColor from "./useColor";
import useGame from "./useGame";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const { timer, startTimer, resetTimer, minusTimer, maxTimer, isStart } =
    useTimer();
  const { colors, correctIndex, randomColor } = useColor();
  const { score, addScore, mode, correct, wrong } = useGame({
    resetTimer,
    randomColor,
    minusTimer,
  });
  const user = { name: "โชกุนนน", score: 10 };
  const [column, setColumn] = useState(2);
  useEffect(() => {
    setColumn(Math.floor(score / 5) + 2);
    switch (mode) {
      case "NORMAL":
        startTimer(5);
        break;
      case "HARD":
        startTimer(3);
        break;
      case "INSANE":
        startTimer(2);
        break;
      case "GOD":
        startTimer(1);
    }
  }, [score]);

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
  useEffect(() => {
    // console.log(timer);
    if (timer <= 0) alert("Game Over!");
  }, [timer]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
