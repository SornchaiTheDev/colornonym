import { useState, useEffect, createContext } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase.config.js";
import Cookies from "universal-cookie";
import useLocation from "./useLocation.js";
import axios from "axios";

export const AuthCtx = createContext(null);
const cookies = new Cookies();
function authContext({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const authentication = async () => {
    console.log("signIn called");
    try {
      const getUser = await signInAnonymously(auth);
      cookies.set("user", getUser.user.uid, { path: "/" });
    } catch (e) {
      return e;
    }
  };

  const getUser = () => {
    const userId = cookies.get("user");
    const firestore = getFirestore(app);
    const userDoc = doc(firestore, "users", userId);
    const country = cookies.get("country");
    getDoc(userDoc).then((user) => {
      setUser(user.data());
    });
    if (country === undefined) {
      axios
        .get(
          "https://us-central1-colornonym.cloudfunctions.net/getUserLocation"
        )
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));

      console.log(country);
      //   updateDoc(userDoc, { country: "TH" });
      //   cookies.set("country", "TH", { path: "/" });
    }
  };

  const changeUsername = (username) => {
    const userId = cookies.get("user");
    const firestore = getFirestore(app);
    const userDoc = doc(firestore, "users", userId);
    setUser((prev) => ({ ...prev, name: username }));
    updateDoc(userDoc, { name: username });
  };

  useEffect(() => {
    if (cookies.get("user") === undefined) authentication();
    if (cookies.get("user") !== undefined) getUser();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, changeUsername }}>
      {children}
    </AuthCtx.Provider>
  );
}

export default authContext;
