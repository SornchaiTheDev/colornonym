import React, { useEffect, useState } from "react";
import ColorParts from "./ColorParts";
import Timer from "./timer";
import Inspired from "./Inspired";
import LeaderBoard from "./LeaderBoard";
import { Context } from "../context/context";
import { useContext } from "react";
import EndGame from "./EndGame";

function Body() {
  const { column, isNewHighScore, inLineBadge } = useContext(Context);

  return (
    <div
      className={`${
        column < 4 ? "w-3/4" : "w-10/12"
      } md:w-1/2 flex flex-col items-center`}
    >
      <h1 className="text-4xl font-bold text-white mt-4 mb-10">Colornonym</h1>
      {/* <h4 className="text-white mt-2 mb-4 font-bold">
        by{" "}
        <a
          className="text-bold text-[#E4572E] underline decoration-dotted"
          href="https://www.instagram.com/_cho_kun_"
          rel="noopener noreferrer"
          target="_blank"
        >
          @_cho_kun_
        </a>
      </h4> */}

      <Timer />
      <ColorParts />
      <Inspired />
      <div id="inline-badge" ref={inLineBadge} className="mt-6"></div>
      <LeaderBoard />

      <EndGame isNewHighScore={isNewHighScore} />
    </div>
  );
}

export default Body;
