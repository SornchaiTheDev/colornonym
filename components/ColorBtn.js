import React, { useContext, useState, useRef, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Context } from "../context/context";
import { motion } from "framer-motion";

function SVGColorBtn({ color }) {
  return (
    <>
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <title>ColorBtn</title>
        <g id="Layer_1">
          <title>Layer 1</title>
          <circle id="svg_1" cx="50" cy="50" r="50" fill={color} />
        </g>
      </svg>
    </>
  );
}

function ColorBtn({ color, isCorrect }) {
  // Get Context Value
  const { startTimer, timer, isStart, correct, wrong, mode, setMode } =
    useContext(Context);

  // Convert Svg to base64
  const svgBtn = encodeURIComponent(
    window.btoa(
      renderToStaticMarkup(<SVGColorBtn color={color} timer={timer} />)
    )
  );

  // Validate if user press the right color
  const validateColor = () => {
    if (mode === "GAME_OVER" && isCorrect) return setMode("RESET");
    if (!isStart) startTimer();
    if (isCorrect) return correct();
    wrong();
  };

  return (
    <motion.div whileTap={{ scale: 0.5 }} onTap={validateColor}>
      <img
        className={`place-self-stretch w-full p-1 rounded-full ${
          mode === "GAME_OVER" && isCorrect && "bg-white"
        }`}
        src={`data:image/svg+xml;base64,${svgBtn}`}
      />
    </motion.div>
  );
}

export default ColorBtn;
