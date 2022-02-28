import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/context";
import { AuthCtx } from "../context/authContext";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { app } from "../firebase.config";
import PlayerHighScore from "./Leaderboard/PlayerHighScore";
function EndGame({ isNewHighScore }) {
  const { width, height } = useWindowSize();
  const { setMode, score } = useContext(Context);
  const { user } = useContext(AuthCtx);
  const [users, setUsers] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

  const fetchUsers = () => {
    const firestore = getFirestore(app);
    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("highScore", "<=", score),
      orderBy("highScore", "desc"),
      limit(1)
    );
    getDocs(q).then((users) => {
      const docs = [];
      users.forEach((doc) => {
        if (doc.data().name !== user.name) docs.push(doc.data());
      });

      setUsers([
        ...docs,
        { name: user.name, highScore: score, country: user.country },
      ]);
      setIsFetch(true);
    });
  };

  useEffect(() => {
    if (isNewHighScore) fetchUsers();
  }, [isNewHighScore]);

  useEffect(() => {
    if (isFetch) setUsers([...users.reverse()]);
  }, [isFetch]);

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
          <div className="space-y-4 w-10/12  md:w-1/4">
            <div className="bg-white rounded-lg  flex flex-col items-center p-4 space-y-4">
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

            {users.length > 0
              ? users.map(({ name, country, highScore }, index) => (
                  <motion.div layout key={name}>
                    <PlayerHighScore
                      place={index + 1}
                      name={name}
                      country={country.code}
                      fullCountry={country.name}
                      score={highScore}
                      isUser={name === user.name}
                    />
                  </motion.div>
                ))
              : new Array(2).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-6 mb-2"
                  >
                    <div className="flex items-center space-x-2 animate-pulse">
                      <div className="w-8 h-8 bg-gray-300  rounded-full"></div>
                      <div className="flex flex-col space-y-2">
                        <div className="w-full h-4 bg-gray-300 rounded-full"></div>
                        <div className="flex space-x-1">
                          <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
                          <div className="w-28 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
                  </div>
                ))}

            <button
              className="text-white font-bold bg-[#E4572E] w-full rounded-lg py-4"
              onClick={() => {
                setMode("RESET");
                setIsFetch(false);
                setUsers([]);
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
