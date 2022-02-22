import { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/context";
import ColorBtn from "./ColorBtn";

function ColorParts() {
  const { colors, correctIndex, score } = useContext(Context);
  const [column, setColumn] = useState(2);
  useEffect(() => {
    setColumn(Math.floor(score / 5) + 2);
  }, [score]);

  return (
    <>
      <h1 className="text-white">{column}</h1>
      <div
        className={`grid grid-cols-3 items-center justify-center gap-4 mt-10`}
        style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
      >
        {colors.map((color, index) => (
          <ColorBtn
            key={index}
            color={color}
            isCorrect={index == correctIndex}
          />
        ))}
      </div>
    </>
  );
}

export default ColorParts;
