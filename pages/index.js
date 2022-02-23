import ContextProvider from "../hooks/context";
import Head from "next/head";
import Body from "../components/Body";

function index() {
  return (
    <ContextProvider>
      <Head>
        <title>Colornonym</title>
      </Head>
      <div className="flex flex-col justify-start items-center bg-primary min-h-screen ">
        <Body />
      </div>
    </ContextProvider>
  );
}

export default index;
