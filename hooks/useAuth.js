import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase.config.js";

export default function useAuth() {
  const auth = getAuth(app);
  let user = null;
  const signIn = async () => {
    try {
      user = await signInAnonymously(auth);
    } catch (e) {
      return e;
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (!user) signIn();
    if (user) console.log(user);
  });

  return { user: "sadads" };
}
