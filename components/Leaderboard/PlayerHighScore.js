import getUnicodeFlagIcon from "country-flag-icons/unicode";

function PlayerHighScore({ name, score, place, country, fullCountry, isUser }) {
  return (
    <div className="w-full flex justify-between items-center bg-white rounded-lg shadow-md px-6 py-4 mb-2">
      <div className="flex items-center space-x-2">
        <h1>{place}</h1>
        <div className="flex flex-col">
          <h1>{name}</h1>
          <div className="flex space-x-1">
            <h1 className="">{getUnicodeFlagIcon(country)}</h1>
            <h3 className="font-normal">{fullCountry}</h3>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <h1 className="font-bold">{score}</h1>
        <ion-icon
          name={isUser ? "caret-up-outline" : "caret-down-outline"}
          style={{ color: isUser ? "green" : "red" }}
        ></ion-icon>
      </div>
    </div>
  );
}
export default PlayerHighScore;
