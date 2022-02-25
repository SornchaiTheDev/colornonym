import React, { useState, useContext, useEffect } from "react";
import { AuthCtx } from "../hooks/authContext";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Ads from "./Ads";
import useLeaderboard from "../hooks/useLeaderboard";
import Cookies from "universal-cookie";

function Player({ name, score, place, country, fullCountry }) {
  return (
    <div className="w-11/12 flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-4 mb-2">
      <div className="flex items-center space-x-2">
        <h1>{place}</h1>
        <div className="flex flex-col">
          <h1>{name}</h1>
          <div className="flex space-x-1">
            <h1 className="">{getUnicodeFlagIcon(country)}</h1>
            <h3 className="font-normal">{fullCountry}</h3>
          </div>
        </div>
      </div>
      <h1 className="font-bold">{score}</h1>
    </div>
  );
}
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
          <div className="w-8 h-8 bg-gray-300  rounded-full"></div>
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
        <h1>1</h1>
        <div className="flex flex-col">
          <Username />
          <div className="flex space-x-1">
            <h1 className="">{getUnicodeFlagIcon(user.country.code)}</h1>
            <h3 className="font-normal">{user.country.name}</h3>
          </div>
        </div>
      </div>
      <h1 className="font-bold">{user.score}</h1>
    </div>
  );
}

function LeaderBoard() {
  const [isShow, setIsShow] = useState(false);
  const { users } = useLeaderboard();
  return (
    <div className="fixed bottom-0 w-full  md:w-7/12 lg:w-6/12 xl:w-4/12 bg-white rounded-t-2xl pt-4">
      <button
        className="w-full px-10 flex justify-between items-center space-x-2"
        onClick={() => setIsShow(!isShow)}
      >
        <h1 className="text-center font-bold text-2xl text-grey-500">
          Leaderboard
        </h1>
        <ion-icon
          name={isShow ? "chevron-down-outline" : "chevron-up-outline"}
          style={{ fontSize: "1.5rem" }}
        />
      </button>
      <hr className="my-2" />
      <div
        id="leaderboard"
        className={`${
          isShow ? "flex" : "hidden "
        } flex-col items-center h-64 overflow-y-scroll`}
      >
        {users.map(({ name, score, country, fullCountry }, index) => (
          <Player
            name={name}
            place={index}
            score={score}
            country={country}
            fullCountry={fullCountry}
          />
        ))}
      </div>
      <Me
        isShow={isShow}
        // name={user !== null && user.name.length > 0 ? user.name : "Loading..."}
        // place={1}
        // score={0}
        // country="TH"
        // fullCountry="Thailand"
      />
      <Ads />
    </div>
  );
}

export default LeaderBoard;
