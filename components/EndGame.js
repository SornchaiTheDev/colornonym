import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function EndGame() {
  const { width, height } = useWindowSize();

  return (
    <>
      <div className="absolute flex flex-col  justify-center items-center  w-full min-h-screen bg-[rgba(0,0,0,0.5)] z-40">
        {width !== Infinity && (
          <Confetti width={width} height={height} recycle={false} />
        )}
        <div className="space-y-4 w-10/12">
          <div className="bg-white rounded-lg lg:w-2/6 flex flex-col items-center p-4 space-y-4">
            <h1 className="text-2xl font-bold">New High Score !</h1>
            <img
              className="w-2/6"
              src="https://media.istockphoto.com/vectors/trophy-icon-on-transparent-background-vector-id1282548092?k=20&m=1282548092&s=170667a&w=0&h=mvMPM80d7Z7X8adTDs01jjYpLcuvaRFMVQ5jgimgeUo="
            />
            <h1 className="text-6xl font-bold text-timer">24</h1>
          </div>
          <div className="bg-white rounded-lg lg:w-2/6 items-center p-4 space-y-4">
            <h1 className="text-2xl font-bold text-center">You beated</h1>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <h1>User#0001</h1>
                <div className="flex items-center">
                  <h1>22</h1>
                  <ion-icon
                    name="caret-down-outline"
                    style={{ color: "red" }}
                  ></ion-icon>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1>User#0002</h1>
                <div className="flex items-center">
                  <h1>17</h1>
                  <ion-icon
                    name="caret-down-outline"
                    style={{ color: "red" }}
                  ></ion-icon>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h1>User#0003</h1>
                <div className="flex items-center">
                  <h1>6</h1>
                  <ion-icon
                    name="caret-down-outline"
                    style={{ color: "red" }}
                  ></ion-icon>
                </div>
              </div>
            </div>
          </div>
          <button className="text-white font-bold bg-[#E4572E] w-full rounded-lg py-4">
            Play Again
          </button>
        </div>
      </div>
    </>
  );
}

export default EndGame;
