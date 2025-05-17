import React, { useState } from "react";
import { User } from "../types";

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const filteredUsers = users.filter((user) =>
    [user.name.toLowerCase(), user.email.toLowerCase()].some((val) =>
      val.includes(filter.toLowerCase())
    )
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aKey = a[sortKey].toLowerCase();
    const bKey = b[sortKey].toLowerCase();
    return sortOrder === "asc" ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const currentUsers = sortedUsers.slice(startIdx, startIdx + usersPerPage);

  const toggleSort = (key: "name" | "email") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name or email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border cursor-pointer" onClick={() => toggleSort("name")}>
              Name {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border cursor-pointer" onClick={() => toggleSort("email")}>
              Email {sortKey === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="p-2 border">City</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="text-center hover:bg-gray-100">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
