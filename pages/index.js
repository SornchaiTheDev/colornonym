import ContextProvider from "../hooks/context";
import ColorParts from "../components/ColorParts";
import Timer from "../components/Timer";
import Inspired from "../components/Inspired";
import Ads from "../components/Ads";
import Head from "next/head";
import LeaderBoard from "../components/LeaderBoard";

function index() {
  return (
    <ContextProvider>
      <Head>
        <title>ItsTheSameOne</title>
      </Head>
      <div className="flex flex-col justify-start pt-20 items-center bg-primary min-h-screen ">
        <div className="w-3/4 md:w-1/2 flex flex-col items-center">
          <Timer />
          <ColorParts />
          <Inspired />
          <LeaderBoard />
          <Ads />
        </div>
      </div>
    </ContextProvider>
  );
}

export default index;
