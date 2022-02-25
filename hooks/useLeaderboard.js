import { useState } from "react";

function useLeaderboard() {
  const [users, setUsers] = useState([]);

  return { users };
}

export default useLeaderboard;
