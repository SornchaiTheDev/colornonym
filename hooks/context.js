import React, { createContext, useEffect, useState } from "react";
import useTimer from "./useTimer";
import useColor from "./useColor";
import useGame from "./useGame";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const { timer, startTimer, resetTimer, minusTimer } = useTimer();
  const { colors, correctIndex, randomColor } = useColor();
  const { score, addScore } = useGame();
  const [column, setColumn] = useState(2);
  useEffect(() => {
    setColumn(Math.floor(score / 5) + 2);
  }, [score]);

  const contextValue = {
    timer,
    startTimer,
    resetTimer,
    colors,
    correctIndex,
    randomColor,
    score,
    addScore,
    minusTimer,
    column,
  };
  useEffect(() => {
    // console.log(timer);
    if (timer <= 0) alert("Game Over!");
  }, [timer]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
