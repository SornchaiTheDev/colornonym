import ContextProvider from "../hooks/context";
import ColorParts from "../components/ColorParts";
import Timer from "../components/Timer";
import Inspired from "../components/Inspired";
import Ads from "../components/Ads";
import Head from "next/head";

function index() {
  return (
    <ContextProvider>
      <Head>
        <title>ItsTheSameOne</title>
      </Head>
      <div className="flex flex-col justify-start pt-20 items-center bg-primary h-screen">
        <div className="">
          <Timer />
          <ColorParts />
          <Inspired />
        </div>
        <Ads />
      </div>
    </ContextProvider>
  );
}

export default index;
