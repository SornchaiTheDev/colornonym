import React, { useContext } from "react";
import { Context } from "../hooks/context";

function Timer() {
  const { timer } = useContext(Context);

  return (
    <div className="flex justify-center items-center flex-col space-y-2">
      <h1 className="text-timer text-6xl">{timer}</h1>
      <span className="w-24 h-2 bg-white "></span>
    </div>
  );
}

export default Timer;
