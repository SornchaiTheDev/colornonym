/**
 *
 * Game Mode :
 * Easy : 1-20
 *  - Add more column till 6 column and 6 row (6x6)
 * Normal :21-40
 *  - Reset to 3 column and 3 row (3x3) then blink every 4 seconds
 * Hard :41-60
 *  - Reset to 2 column and 2 row (2x2) then blink every 3 seconds
 * Insane : 61-80
 *  - Reset to 1 column and 1 row (1x1) then blink every 2 seconds
 * God : 81-100
 * - Reset to 1 column and 1 row (1x1) then blink every 1 seconds
 * - Then loop to Easy mode
 *
 *
 *
 */

import { useEffect, useState } from "react";
function useGame() {
  const [score, setScore] = useState(0);
  const addScore = () => {
    setScore(score + 1);
  };
  return { score, addScore };
}

export default useGame;
