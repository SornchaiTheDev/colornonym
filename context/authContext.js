import { useState, useEffect, createContext, useContext } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { FirebaseCtx } from "./firebaseContext.js";
import { app } from "../firebase.config.js";
import Cookies from "universal-cookie";
import axios from "axios";
import Script from "next/script";

export const AuthCtx = createContext(null);
const cookies = new Cookies();

function authContext({ children }) {
  const [user, setUser] = useState({});
  const userId = cookies.get("user");
  const { log } = useContext(FirebaseCtx);

  // init firebase instance
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const authentication = async () => {
    try {
      const signIn = await signInAnonymously(auth);
      setUser((prev) => ({ ...prev, uid: signIn.user.uid }));
      setCountry(signIn.user.uid);
      cookies.set("user", signIn.user.uid, { path: "/" });
    } catch (e) {
      return e;
    }
  };
  const setCountry = async (userId) => {
    const location = await axios.get(
      "https://us-central1-colornonym.cloudfunctions.net/getUserLocation"
    );
    const userDoc = doc(firestore, "users", userId);
    const countingDoc = doc(firestore, "counting", "people");
    const amount = await getDoc(countingDoc);
    setDoc(userDoc, {
      name: `User#${amount.data().user.toString().padStart(4, "0")}`,
      score: 0,
      highScore: 0,
      country: location.data,
    });
    setUser((prev) => ({
      ...prev,
      name: `User#${amount.data().user.toString().padStart(4, "0")}`,
      score: 0,
      highScore: 0,
      country: location.data,
    }));
    cookies.set("country", location.data.code, { path: "/" });
    log("create_user_successed");
  };

  const changeUsername = (username) => {
    setUser((prev) => ({ ...prev, name: username }));
    const userDoc = doc(firestore, "users", userId);
    updateDoc(userDoc, { name: username });
    log("update_user_name");
  };
  const updateScoreState = (score) => {
    setUser((prev) => ({ ...prev, highScore: score }));
  };

  const getUser = (userId) => {
    const userDoc = doc(firestore, "users", userId);
    onSnapshot(userDoc, (user) => {
      setUser((prev) => ({ ...prev, ...user.data(), uid: user.id }));
    });
  };

  useEffect(() => {
    if (cookies.get("user") === undefined) return authentication();
    getUser(userId);
  }, []);

  const onRecaptchaLoadCallback = () => {
    console.log("called");
    grecaptcha.ready(async () => {
      // const clientId = grecaptcha.render("inline-badge", {
      //   sitekey: "6LcCxaMeAAAAAPxlhc2WS3GI_nPZt9kU6IhxGylR",
      //   badge: "inline",
      //   size: "invisible",
      // });
      const token = await grecaptcha.execute(clientId, {
        action: "updateScore",
      });
      console.log(token);
      // axios({
      //   method: "post",
      //   url: "https://us-central1-colornonym.cloudfunctions.net/setUserScore",
      //   data: new URLSearchParams({
      //     uid: user.uid,
      //     highScore: score,
      //     token,
      //   }),
      // });
    });
  };

  return (
    <>
      <AuthCtx.Provider value={{ user, changeUsername, updateScoreState }}>
        {children}
      </AuthCtx.Provider>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LcCxaMeAAAAAPxlhc2WS3GI_nPZt9kU6IhxGylR" />
    </>
  );
}

export default authContext;
