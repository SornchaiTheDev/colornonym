import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import ColorBtn from "./ColorBtn";
import { motion, useAnimation } from "framer-motion";

function ColorParts() {
  const { colors, correctIndex, column, score } = useContext(Context);
  const control = useAnimation();

  useEffect(() => {
    control.start({ scale: [0.7, 1] });
  }, [score]);

  return (
    <div
      className={`w-full sm:w-5/6 md:w-10/12 lg:w-8/12 xl:w-1/2 grid items-center justify-center gap-0 mt-6 `}
      style={{
        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
        gridAutoFlow: true,
      }}
    >
      {colors.map(({ color, key }, index) => (
        <motion.div
          animate={control}
          transition={{ duration: 0.5 }}
          key={index}
        >
          <ColorBtn color={color} isCorrect={index == correctIndex} />
        </motion.div>
      ))}
    </div>
  );
}

export default ColorParts;
