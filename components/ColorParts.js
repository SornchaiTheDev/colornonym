import { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/context";
import ColorBtn from "./ColorBtn";

function ColorParts() {
  const { colors, correctIndex, column } = useContext(Context);

  return (
    <div
      className={`w-full sm:w-5/6 md:w-10/12 lg:w-8/12 xl:w-1/2 grid items-center justify-center gap-0 mt-6 `}
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
