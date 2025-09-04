import { useEffect, useState } from "react";

// Type for user data
type User = {
  id: number;
  email: string;
  fullName: string;
};

export default function UserList() {
  // State for users and error message
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  // Fetch users from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError("Could not fetch users.");
        }
      })
      .catch(() => setError("Could not fetch users."));
  }, []);

  // Render user list or error
  if (error) return <p className="bg-red-500 text-white p-4 rounded-xl">{error}</p>;
  return (
    <div className="container">
      <h2 className="font-bold mb-4">All users</h2>
      <p>The list of users lets you get in tounch with your friends. </p>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 rounded bg-amber-100 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 hover:scale-101 hover:bg-amber-200 duration-200 border">
            <span className="font-semibold">{user.fullName}</span> – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}