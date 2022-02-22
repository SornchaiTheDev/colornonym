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
      <div className="flex flex-col justify-start pt-20 items-center bg-primary min-h-screen pb-20">
        <Timer />
        <ColorParts />
        <Inspired />
        <LeaderBoard />
        <Ads />
      </div>
    </ContextProvider>
  );
}

export default index;
