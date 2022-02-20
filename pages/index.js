import { useEffect } from "react";
import ColorParts from "../components/ColorParts";
import Timer from "../components/timer";
import ContextProvider from "../hooks/context";
import useColor from "../hooks/colorgenerate";
function index() {
  const [color, diffColor] = useColor();
  useEffect(() => {
    console.log(diffColor);
  }, []);
  return (
    <ContextProvider>
      <div className="flex flex-col justify-start items-center pt-20  bg-primary h-screen px-12">
        <Timer />
        <ColorParts />
      </div>
    </ContextProvider>
  );
}

export default index;
