import React, { useState, useEffect, useContext } from "react";
import { Context } from "../hooks/context";
import { AuthCtx } from "../hooks/authContext";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";
function EndGame({ isNewHighScore }) {
  const { width, height } = useWindowSize();
  const { setMode, score } = useContext(Context);
  const { user } = useContext(AuthCtx);
  const [users, setUsers] = useState([
    { name: "user01", score: 5 },
    { name: "user03", score: 4 },
    { name: "User#0000", score: 6 },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsers([users[0], users[2], users[1]]);
      setTimeout(() => {
        setUsers([users[2], users[0], users[1]]);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  const varaint = {
    init: {
      opacity: 0,
    },
    high_score: {
      translateY: 0,
      opacity: 1,
    },
    hide: {
      translateY: -100,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isNewHighScore && (
        <motion.div
          variants={varaint}
          animate="high_score"
          initial="init"
          exit="hide"
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="absolute flex flex-col  justify-center items-center  w-full min-h-screen bg-[rgba(0,0,0,0.5)] z-40"
        >
          {width !== Infinity && (
            <Confetti width={width} height={height} recycle={false} />
          )}
          <div className="space-y-4 w-10/12 ">
            <div className="bg-white rounded-lg lg:w-2/6 flex flex-col items-center p-4 space-y-4">
              <h1 className="text-2xl font-bold">New High Score !</h1>
              <div className="flex justify-center items-center">
                <h1 className=" text-4xl font-bold text-primary">{score}</h1>
                <ion-icon
                  name="caret-up-outline"
                  style={{ color: "green" }}
                  size="large"
                ></ion-icon>
              </div>
            </div>
            <div className="flex flex-col">
              {users.map(({ name, score }, index) => (
                <motion.div
                  key={name}
                  layout
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-4 mb-2"
                >
                  <div className="flex items-center space-x-2">
                    <h1>{index + 1}</h1>
                    <div className="flex flex-col">
                      <h1>{name}</h1>
                      <div className="flex space-x-1">
                        <h1 className="">th</h1>
                        <h3 className="font-normal">Thailand</h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <h1 className="font-bold">{score}</h1>
                    <motion.div animate={{ opacity: [0.5, 1] }}></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              className="text-white font-bold bg-[#E4572E] w-full rounded-lg py-4"
              onClick={() => {
                setMode("RESET");
              }}
            >
              Play Again
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EndGame;
