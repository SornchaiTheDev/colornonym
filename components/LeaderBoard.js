import React, { useState, useContext, useRef } from "react";
import { AuthCtx } from "../context/authContext";
import Ads from "./Ads";
import useLeaderboard from "../hooks/useLeaderboard";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Player from "../components/Leaderboard/Player";
import { motion } from "framer-motion";

function Me({ isShow }) {
  const { user } = useContext(AuthCtx);

  const Username = () => {
    const [username, setUsername] = useState(user.name);
    const [isClick, setIsClick] = useState(false);
    const { changeUsername } = useContext(AuthCtx);
    const onBlur = () => {
      setIsClick(false);
      changeUsername(username);
    };

    const onSubmit = (e) => {
      e.preventDefault();
      changeUsername(username);
    };

    if (isClick)
      return (
        <form onSubmit={onSubmit}>
          <input
            className="font-medium outline-none"
            value={username}
            autoFocus
            onBlur={onBlur}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
      );
    return (
      <h1 className="font-medium" onClick={() => setIsClick(true)}>
        {username} (Tap to change)
      </h1>
    );
  };

  if (user.name === undefined)
    return (
      <div
        className={`${
          isShow ? "flex" : "hidden"
        } justify-between items-center bg-white px-6 py-4 rounded-t-2xl animate-pulse`}
        style={{ boxShadow: "0px -2px 5px  rgba(0, 0, 0, 0.1)" }}
      >
        <div className="w-full flex items-center space-x-4">
          {/* <div className="w-8 h-8 bg-gray-300  rounded-full"></div> */}
          <div className="w-full flex flex-col">
            <div className="w-3/6 h-4 bg-gray-300 rounded-full"></div>
            <div className="flex space-x-1 mt-2">
              <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
              <div className="w-28 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
      </div>
    );
  return (
    <div
      className={`${
        isShow ? "flex" : "hidden"
      } justify-between items-center bg-white px-6 py-4 rounded-t-2xl`}
      style={{ boxShadow: "0px -2px 5px  rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center space-x-4">
        {/* <h1>1</h1> */}
        <div className="flex flex-col">
          <Username />
          <div className="flex space-x-1">
            <h1 className="">{getUnicodeFlagIcon(user.country.code)}</h1>
            <h3 className="font-normal">{user.country.name}</h3>
          </div>
        </div>
      </div>
      <h1 className="font-bold">{user.highScore}</h1>
    </div>
  );
}

function LeaderBoard() {
  const [isShow, setIsShow] = useState(false);
  const leaderboardRef = useRef(null);

  const { users, onScroll, isEnd } = useLeaderboard(leaderboardRef.current);

  return (
    <div className="fixed bottom-0 w-full  md:w-7/12 lg:w-6/12 xl:w-4/12 bg-white rounded-t-2xl pt-4">
      <button
        className="w-full px-10 flex justify-between items-center space-x-2"
        onClick={() => setIsShow(!isShow)}
      >
        <h1 className="text-center font-bold text-2xl ">Leaderboard</h1>
        <ion-icon
          name={isShow ? "chevron-down-outline" : "chevron-up-outline"}
          style={{ fontSize: "1.5rem" }}
        />
      </button>
      <hr className="my-2" />
      <div
        onScroll={onScroll}
        ref={leaderboardRef}
        className={`${
          isShow ? "flex" : "hidden "
        } flex-col items-center h-64 overflow-y-scroll`}
      >
        {users.length > 0
          ? users.map(({ name, highScore, country }, index) => (
              <motion.div layout className="w-11/12" key={name}>
                <Player
                  name={name}
                  place={index + 1}
                  score={highScore}
                  country={country.code}
                  fullCountry={country.name}
                />
              </motion.div>
            ))
          : new Array(10).fill(0).map((_, index) => (
              <div
                key={index}
                className="w-11/12 flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-6 mb-2  animate-pulse"
              >
                <div className="flex items-center space-x-2">
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
        {!isEnd && users.length > 5 && <h2 className="mt-2">Loading...</h2>}
      </div>
      <Me isShow={isShow} />
      <Ads />
    </div>
  );
}

export default LeaderBoard;
