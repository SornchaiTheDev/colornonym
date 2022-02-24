import { useEffect, useState } from "react";

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

  // use when Blink init
  const [blinkColumn, setBlinkColumn] = useState(2);
  const [isBlink, setIsBlink] = useState(false);
  const [blinkSec, setBlinkSec] = useState(1);

  const randomColor = (column) => {
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

  useEffect(() => {
    let interval;
    if (isBlink) {
      interval = setInterval(() => {
        console.log("call");
        randomColor(blinkColumn);
      }, blinkSec * 1000);
    }
    return () => clearInterval(interval);
  }, [isBlink, blinkColumn]);

  const blink = (seconds, column) => {
    setIsBlink(true);
    setBlinkSec(seconds);
    setBlinkColumn(column);
  };

  const stopBlink = () => {
    setIsBlink(false);
  };

  return { colors, correctIndex, randomColor, blink, stopBlink };
}

export default useColor;
