import React, { useContext } from "react";
import { Context } from "../hooks/context";

function ColorBtn({ color, isCorrect }) {
  const { startTimer, resetTimer } = useContext(Context);
  const validateColor = () => {
    startTimer();
    if (isCorrect) {
      resetTimer();
    } else {
      startTimer();
    }
  };
  return (
    <div
      className={`w-24 h-24 rounded-full`}
      onClick={validateColor}
      style={{
        background: color,
      }}
    ></div>
  );
}

export default ColorBtn;
