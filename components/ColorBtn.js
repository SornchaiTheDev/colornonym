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
          <circle id="svg_1" cx="25" cy="25" r="25" fill={color} />
        </g>
      </svg>
    </>
  );
}

function ColorBtn({ color, isCorrect }) {
  // Get Context Value
  const {
    startTimer,
    resetTimer,
    randomColor,
    addScore,
    minusTimer,
    timer,
    column,
    score,
  } = useContext(Context);

  // Convert Svg to base64
  const svgBtn = encodeURIComponent(
    window.btoa(renderToStaticMarkup(<SVGColorBtn color={color} />))
  );

  // Validate if user press the right color
  const validateColor = () => {
    console.log(column);
    if (timer <= 0) return;
    startTimer();
    if (isCorrect) {
      resetTimer();
      addScore();
      randomColor(score);
    } else {
      startTimer();
      minusTimer(3);
    }
  };

  return (
    <img
      // className="place-self-stretch"
      style={{ width: "100%" /*height: "100%"*/ }}
      onClick={validateColor}
      src={`data:image/svg+xml;base64,${svgBtn}`}
    />
  );
}

export default ColorBtn;
