import ContextProvider from "../context/context";
import AuthContextProvider from "../context/authContext";
import FirebaseContextProvider from "../context/firebaseContext";
import Head from "next/head";
import Body from "../components/Body";
import Script from "next/script";

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
          <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
        </ContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default index;
