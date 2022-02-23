import React, { useState } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Ads from "./Ads";

function Player({ name, score, place, country, fullCountry }) {
  return (
    <div className="w-3/4 flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-4 mb-2">
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
function Me({ name, score, place, country, fullCountry }) {
  const Username = () => {
    const [username, setUsername] = useState(name);
    const [isClick, setIsClick] = useState(false);
    if (isClick)
      return (
        <input
          className="font-medium outline-none"
          value={username}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
      );
    return (
      <h1 className="font-medium" onClick={() => setIsClick(true)}>
        {name} (Tap to change)
      </h1>
    );
  };
  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 border-t-2 mt-4">
      <div className="flex items-center space-x-4">
        <h1>{place}</h1>
        <div className="flex flex-col">
          <Username />
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

function LeaderBoard() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="fixed bottom-0 w-full md:w-1/2 bg-white rounded-t-2xl pt-4">
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
        className={`${
          isShow ? "flex" : "hidden "
        } flex-col items-center h-64 overflow-y-scroll`}
      >
        <Player
          name="โชกุนนน"
          place={1}
          score={10}
          country="TH"
          fullCountry="Thailand"
        />

        <Player
          name="John Doe"
          place={2}
          score={5}
          country="US"
          fullCountry="United States"
        />
        <Player
          name="John Doe"
          place={2}
          score={5}
          country="US"
          fullCountry="United States"
        />
        <Player
          name="John Doe"
          place={2}
          score={5}
          country="US"
          fullCountry="United States"
        />
        <Me
          name="User0123"
          place={1}
          score={10}
          country="TH"
          fullCountry="Thailand"
        />
      </div>
      <Ads />
    </div>
  );
}

export default LeaderBoard;
