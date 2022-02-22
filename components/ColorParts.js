import { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/context";
import ColorBtn from "./ColorBtn";

function ColorParts() {
  const { colors, correctIndex, column } = useContext(Context);

  return (
    <div
      className={`w-full md:w-1/2 grid items-center justify-center gap-4 mt-10 `}
      style={{
        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
        gridAutoFlow: true,
      }}
    >
      {colors.map((color, index) => (
        <ColorBtn key={index} color={color} isCorrect={index == correctIndex} />
      ))}
    </div>
  );
}

export default ColorParts;
