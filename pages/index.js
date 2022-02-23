import ContextProvider from "../hooks/context";
import ColorParts from "../components/ColorParts";
import Timer from "../components/Timer";
import Inspired from "../components/Inspired";
import Head from "next/head";
import LeaderBoard from "../components/LeaderBoard";

function index() {
  return (
    <ContextProvider>
      <Head>
        <title>Colornonym</title>
      </Head>
      <div className="flex flex-col justify-start items-center bg-primary min-h-screen ">
        <div className="w-3/4 md:w-1/2 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mt-4">Coloronym</h1>
          <h4 className="text-white mt-2 mb-4 font-bold">
            by{" "}
            <a
              className="text-bold text-[#E4572E] underline decoration-dotted"
              href="https://www.instagram.com/_cho_kun_"
              rel="noopener noreferrer"
              target="_blank"
            >
              @_cho_kun_
            </a>
          </h4>
          <Timer />
          <ColorParts />
          <Inspired />
          <LeaderBoard />
        </div>
      </div>
    </ContextProvider>
  );
}

export default index;
