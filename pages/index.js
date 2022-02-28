import ContextProvider from "../context/context";
import AuthContextProvider from "../context/authContext";
import FirebaseContextProvider from "../context/firebaseContext";
import Head from "next/head";
import Body from "../components/Body";

function index() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <ContextProvider>
          <Head>
            <title>Colornonym</title>
          </Head>

          <div className="flex flex-col justify-start items-center bg-primary min-h-screen ">
            <Body />
          </div>
        </ContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default index;
