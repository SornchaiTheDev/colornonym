import ColorParts from "../components/ColorParts";
import Timer from "../components/timer";

function index() {
  return (
    <div className="flex flex-col justify-start items-center pt-20  bg-primary h-screen px-12">
      <Timer />
      <ColorParts />
    </div>
  );
}

export default index;
