import { useContext } from "react";
import { Context } from "../hooks/context";
import ColorBtn from "./ColorBtn";

function ColorParts() {
  const { colors, correctIndex } = useContext(Context);
  return (
    <div className="grid grid-cols-3 gap-6 mt-20">
      {colors.map((color, index) => (
        <ColorBtn key={index} color={color} isCorrect={index == correctIndex} />
      ))}
    </div>
  );
}

export default ColorParts;
