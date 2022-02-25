import { useState, useEffect, createContext } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase.config.js";
import Cookies from "universal-cookie";
import axios from "axios";

export const AuthCtx = createContext(null);
const cookies = new Cookies();

function authContext({ children }) {
  const [user, setUser] = useState(null);
  const userId = cookies.get("user");
  // init firestore

  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const authentication = async () => {
    try {
      const signIn = await signInAnonymously(auth);
      setCountry(signIn.user.uid);
      getUser(signIn.user.uid);
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
    setDoc(userDoc, { country: location.data }, { merge: true });
    cookies.set("country", location.data.code, { path: "/" });
  };

  const changeUsername = (username) => {
    setUser((prev) => ({ ...prev, name: username }));
    const userDoc = doc(firestore, "users", userId);
    updateDoc(userDoc, { name: username });
  };

  const getUser = (userId) => {
    const userDoc = doc(firestore, "users", userId);
    getDoc(userDoc).then((user) => {
      setUser((prev) => ({ ...prev, ...user.data(), uid: user.id }));
    });
  };

  useEffect(() => {
    if (cookies.get("user") === undefined) return authentication();
    getUser(userId);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, changeUsername }}>
      {children}
    </AuthCtx.Provider>
  );
}

export default authContext;
