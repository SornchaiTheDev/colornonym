import React from "react";
import Image from "next/image";
import { useWindowSize } from "react-use";

function Ads() {
  const { width } = useWindowSize();
  return (
    <div className="w-full relative h-16 bg-white text-center flex justify-center items-center">
      <Image layout="fill" src="https://via.placeholder.com/400x50" />
    </div>
  );
}

export default Ads;
