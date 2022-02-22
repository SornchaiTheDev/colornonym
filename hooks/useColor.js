import React, { useEffect, useState, useContext } from "react";
import { Context } from "./context";

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function useColor() {
  const [colors, setColors] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    randomColor(2);
  }, []);

  const randomColor = (score) => {
    const column = Math.floor((score + 1) / 5) + 2;

    let colorsArray = new Array(column ** 2).fill("");
    const random = Math.floor(Math.random() * 360);
    colorsArray.forEach((_, index) => {
      colorsArray[index] = hslToHex(random, 100, 50);
    });
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    colorsArray[randomIndex] = hslToHex(random, 100, 40);
    setCorrectIndex(randomIndex);
    setColors(colorsArray);
  };

  return { colors, correctIndex, randomColor };
}

export default useColor;
