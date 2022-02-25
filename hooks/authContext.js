import { useState, useEffect, createContext } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
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
      cookies.set("user", signIn.user.uid, { path: "/" });
      getUser();
    } catch (e) {
      return e;
    }
  };
  const setCountry = async (userId) => {
    const location = await axios.get(
      "https://us-central1-colornonym.cloudfunctions.net/getUserLocation"
    );
    const firestore = getFirestore(app);
    const userDoc = doc(firestore, "users", userId);
    setUser((prev) => ({ ...prev, country: location.data }));
    updateDoc(userDoc, { country: location.data });
    cookies.set("country", location.data.code, { path: "/" });
  };

  const changeUsername = (username) => {
    console.log(username);
    const userId = cookies.get("user");
    const firestore = getFirestore(app);
    const userDoc = doc(firestore, "users", userId);
    updateDoc(userDoc, { name: username }).then(() => {
      setUser((prev) => ({ ...prev, name: username }));
    });
  };

  useEffect(() => {
    if (cookies.get("user") === undefined) return authentication();
    const userDoc = doc(firestore, "users", userId);
    getDoc(userDoc).then((user) => {
      setUser(user.data());
    });
  }, []);

  return (
    <AuthCtx.Provider value={{ user, changeUsername }}>
      {children}
    </AuthCtx.Provider>
  );
}

export default authContext;
