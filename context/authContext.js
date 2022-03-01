import { useState, useEffect, createContext, useContext } from "react";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";
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

    const randomId = new Date(Math.random() * new Date())
      .getTime()
      .toString(23)
      .slice(0, 4);
    setDoc(userDoc, {
      name: `User#${randomId}`,
      score: 0,
      highScore: 0,
      country: location.data,
    });
    setUser((prev) => ({
      ...prev,
      name: `User#${randomId}`,
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

  //   const onRecaptchaLoadCallback = () => {
  //     console.log("called");

  //   };

  return (
    <AuthCtx.Provider value={{ user, changeUsername, updateScoreState }}>
      {children}
    </AuthCtx.Provider>
  );
}

export default authContext;
