import ContextProvider from "../hooks/context";
import ColorParts from "../components/ColorParts";
import Timer from "../components/timer";

function index() {
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
