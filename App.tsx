import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import { User } from "./types";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
};

export default App;
