import { createContext, useEffect, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

import React from "react";
import { app } from "../firebase.config";

const FirebaseCtx = createContext(null);
function Firebase({ children }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const firebase_analytics = getAnalytics(app);
    setAnalytics(firebase_analytics);
    logEvent(firebase_analytics, "page_view");
  }, []);
  const log = (event) => {
    console.log("hello");
    // logEvent(analytics, event);
  };
  return (
    <FirebaseCtx.Provider value={{ log }}>{children}</FirebaseCtx.Provider>
  );
}

export default Firebase;
