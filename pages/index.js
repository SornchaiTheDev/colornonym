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
            <title>Colornonym : Find the right one!</title>
            <meta name="keywords" content="colornonym , color-blind" />
            <meta name="author" content="SornchaiTheDev" />
            <meta name="user-scalable" content="no" />
            <meta
              name="description"
              content="Let's find the color that different from the others"
            />
            <meta name="color-scheme" content="dark light" />
            <meta name="og:title" content="Let's Find the right color!" />
            <meta
              name="og:description"
              content="Let's find the color that different from the others"
            />
            <meta
              name="og:image"
              content="https://colornonym.sornchai.me/static/images/logo.png"
            />
            <meta name="og:url" content="https://colornonym.vercel.app" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@sornchaithedev" />
            <meta name="twitter:creator" content="@sornchaithedev" />
            <meta name="twitter:title" content="Let's Find the right color!" />
            <meta
              name="twitter:description"
              content="Let's find the color that different from the others"
            />
            <meta
              name="twitter:image"
              content="https://colornonym.sornchai.me/static/images/logo.png"
            />
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
