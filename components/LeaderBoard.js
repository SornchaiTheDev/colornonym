import React from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

function Player({ name, score, place, country, fullCountry }) {
  return (
    <div className="w-full flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-4 mb-2">
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

function LeaderBoard() {
  return (
    <div className="w-3/4 md:w-9/12 mt-10">
      <h1 className="text-center font-bold text-2xl text-white">Leaderboard</h1>
      <div className="flex flex-col items-center mt-10">
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
      </div>
    </div>
  );
}

export default LeaderBoard;
