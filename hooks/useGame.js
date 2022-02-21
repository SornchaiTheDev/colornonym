import { useState } from "react";
function useGame() {
  const [score, setScore] = useState(0);
  const addScore = () => {
    setScore(score + 1);
  };
  return { score, addScore };
}

export default useGame;
