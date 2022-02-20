import React from "react";
import useTimer from "../hooks/timer";

function Timer() {
  const [time, startTimer] = useTimer();

  return (
    <div className="flex justify-center items-center flex-col space-y-2">
      <h1 className="text-timer text-6xl">{time}</h1>
      <span className="w-24 h-2 bg-white "></span>
    </div>
  );
}

export default Timer;
