import { useEffect, useState } from "react";
import {
  collection,
  query,
  getFirestore,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  startAfter,
} from "firebase/firestore";
import { app } from "../firebase.config";

function useLeaderboard(leaderboard) {
  const [users, setUsers] = useState([]);
  const [lastVisible, setLastVisible] = useState(undefined);

  const firestore = getFirestore(app);
  const collectionRef = collection(firestore, "users");

  // get first set of users
  const firstQuery = () => {
    const q = query(collectionRef, orderBy("score"), limit(5));
    getDocs(q).then((docs) => {
      setLastVisible(docs.docs[docs.docs.length - 1]);
      docs.forEach((doc) => setUsers((prev) => [...prev, doc.data()]));
    });
  };
  // init this function only once
  useEffect(() => {
    firstQuery();
  }, []);

  // fetch user from firestore using pagination
  const fetchUser = async (lastVisible) => {
    const q = query(
      collectionRef,
      orderBy("score"),
      startAfter(lastVisible),
      limit(5)
    );
    const fetch = await getDocs(q);
    const last = fetch.docs[fetch.docs.length - 1];
    setLastVisible(last);
    fetch.forEach((doc) => setUsers((prev) => [...prev, doc.data()]));
  };

  const onScroll = () => {
    if (
      leaderboard.scrollHeight - leaderboard.offsetHeight ===
        leaderboard.scrollTop &&
      lastVisible !== undefined
    ) {
      fetchUser(lastVisible);
    }
  };

  return { users, onScroll, isEnd: lastVisible === undefined };
}

export default useLeaderboard;
