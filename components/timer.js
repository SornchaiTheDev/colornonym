import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/context";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer() {
  const { score, timer, maxTimer } = useContext(Context);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-24 h-24">
        <CircularProgressbar
          maxValue={maxTimer}
          value={timer}
          text={score.toString()}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "2rem",
            trailColor: "transparent",
            pathColor: "white",
            textColor: "#FFC914",
          })}
        />
      </div>
    </div>
  );
}

export default Timer;
