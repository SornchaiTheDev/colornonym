// import { useState } from "react";
import axios from "axios";

export default async function useLocation() {
  return axios
    .get("https://ipapi.co/country/")
    .then((res) => res.data)
    .then((res) => res);
  //   try {
  //     const country = await axios.get("https://ipapi.co/country/").data;
  //     return country;
  //   } catch (e) {
  //     return e;
  //   }
}
