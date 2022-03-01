import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import useTimer from "../hooks/useTimer";
import useColor from "../hooks/useColor";
import axios from "axios";
import { AuthCtx } from "./authContext";
import { FirebaseCtx } from "./firebaseContext";
import Script from "next/script";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const [score, setScore] = useState(0);
  const [column, setColumn] = useState(2);
  const [mode, setMode] = useState("EASY");
  const [recaptcha, setRecaptcha] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const { log } = useContext(FirebaseCtx);
  const inlineBadge = useRef(null);

  const {
    setMaxTimer,
    timer,
    startTimer,
    resetTimer,
    minusTimer,
    setMinusTime,
    maxTimer,
    isStart,
  } = useTimer({ mode, setMode, column });
  const { colors, correctIndex, randomColor, blink, stopBlink } = useColor({
    score,
  });
  const { user, updateScoreState } = useContext(AuthCtx);

  const correct = () => {
    setScore((prev) => prev + 1);
    resetTimer();
  };
  const wrong = () => {
    if (timer > 0) return minusTimer();
    setMode("GAME_OVER");
  };

  const updateUserScore = async () => {
    if (user.highScore < score) {
      setIsNewHighScore(true);
      updateScoreState(score);
      const token = await grecaptcha.execute(recaptcha, {
        action: "updateScore",
      });
      axios({
        method: "post",
        url: "https://us-central1-colornonym.cloudfunctions.net/setUserScore",
        data: new URLSearchParams({
          uid: user.uid,
          highScore: score,
          token,
        }),
      });
      log("update_high_score");
    }
  };

  const onRecaptchaLoadCallback = () => {
    grecaptcha.ready(async () => {
      const clientId = grecaptcha.render("inline-badge", {
        sitekey: "6LcCxaMeAAAAAPxlhc2WS3GI_nPZt9kU6IhxGylR",
        badge: "inline",
        size: "invisible",
      });
      setRecaptcha(clientId);
    });
  };

  useEffect(() => {
    if (score > 0 && score % 5 == 0 && column <= 4)
      setColumn((prev) => prev + 1);
    if (score >= 5 && score <= 40) setMode("NORMAL");
    if (score > 40 && score <= 60) setMode("HARD");
    if (score > 60 && score <= 80) setMode("INSANE");
  }, [score]);

  useEffect(() => {
    switch (mode) {
      case "EASY":
        randomColor(column);
        setMaxTimer(10);
        setMinusTime(2);
        break;
      case "NORMAL":
        randomColor(column);
        setMaxTimer(5);
        setMinusTime(3);
        break;
      case "HARD":
        stopBlink();
        randomColor(column);
        setMaxTimer(10);
        setMinusTime(4);
        blink(2, column);
        break;
      case "INSANE":
        stopBlink();
        randomColor(column);
        setMaxTimer(5);
        setMinusTime(5);
        blink(2, column);
        break;
      case "GAME_OVER":
        stopBlink();
        updateUserScore();
        break;
      case "RESET":
        setScore(0);
        setColumn(2);
        resetTimer();
        setMode("EASY");
        setIsNewHighScore(false);
        break;
    }
  }, [score, mode, column]);

  const contextValue = {
    isStart,
    timer,
    startTimer,
    resetTimer,
    maxTimer,
    colors,
    correctIndex,
    randomColor,
    score,
    minusTimer,
    column,
    correct,
    wrong,
    mode,
    setMode,
    isNewHighScore,
    inlineBadge,
  };

  return (
    <>
      <Context.Provider value={contextValue}>{children}</Context.Provider>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        onLoad={onRecaptchaLoadCallback}
      />
    </>
  );
}

export default ContextProvider;

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
