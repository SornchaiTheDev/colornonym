import React, { useContext, useState, useRef, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Context } from "../hooks/context";

function SVGColorBtn({ color }) {
  return (
    <>
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <title>ColorBtn</title>
        <g id="Layer_1">
          <title>Layer 1</title>
          <circle id="svg_1" cx="25" cy="25" r="21" fill={color} />
        </g>
      </svg>
    </>
  );
}

function ColorBtn({ color, isCorrect }) {
  // Get Context Value
  const { startTimer, timer, isStart, correct, wrong } = useContext(Context);

  // Convert Svg to base64
  const svgBtn = encodeURIComponent(
    window.btoa(
      renderToStaticMarkup(<SVGColorBtn color={color} timer={timer} />)
    )
  );
  const [solution, setSolution] = useState(false);

  useEffect(() => {
    if (timer <= 0) setSolution(true);
  }, [timer]);

  // Validate if user press the right color
  const validateColor = () => {
    if (timer <= 0) return;
    if (!isStart) startTimer(10);
    if (isCorrect) {
      correct();
    } else {
      wrong();
    }
  };

  return (
    <img
      className={`place-self-stretch w-full rounded-full ${
        solution && isCorrect && "bg-white"
      }`}
      onClick={validateColor}
      src={`data:image/svg+xml;base64,${svgBtn}`}
    />
  );
}

export default ColorBtn;
