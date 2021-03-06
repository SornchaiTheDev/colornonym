import { createContext, useEffect, useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import React from "react";
import { app } from "../firebase.config";

export const FirebaseCtx = createContext(null);
function Firebase({ children }) {
  useEffect(() => {
    const firebase_analytics = getAnalytics(app);
    logEvent(firebase_analytics, "page_view");
  }, []);
  const log = (event) => {
    const firebase_analytics = getAnalytics(app);
    logEvent(firebase_analytics, event);
  };
  return (
    <FirebaseCtx.Provider value={{ log }}>{children}</FirebaseCtx.Provider>
  );
}

export default Firebase;
