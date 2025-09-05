import LoginStatusMarker from "~/components/LoginStatusMarker";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";

type User = {
  id: string | number;
  fullName: string;
  email: string;
};

export default function Users() {
  const { isLoggedIn } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:4000/users")
        .then((res) => res.json())
        .then((data) =>
          Array.isArray(data) ? setUsers(data) : setError("Could not fetch users")
        )
        .catch(() => setError("Could not fetch users"));
    }
  }, [isLoggedIn]);

  return (
    <div>
      <title>The Users</title>

      {/* Hero-delen */}
      <section className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-white py-8 mb-8 rounded-b-2xl">
        <div className="container mx-auto flex flex-col items-center justify-center text-center gap-2">
          <h1 className="text-3xl font-extrabold text-amber-700 drop-shadow">
            All Users
          </h1>
          <p className="text-base text-slate-700 max-w-lg mx-auto">
            See who else is part of Proper Posts!
          </p>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: "none" }}
        >
          <path
            fill="#fff"
            d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      {/* Login required message */}
      {!isLoggedIn && (
        <div className="max-w-xl mx-auto my-8">
          <div className="flex items-center gap-3 bg-amber-100 border-l-4 border-amber-400 rounded-xl px-6 py-4 shadow-sm">
            <svg
              className="w-7 h-7 text-amber-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <span className="text-amber-800 font-semibold text-lg">
              You must be logged in to view users.
            </span>
          </div>
        </div>
      )}

      {/* Brukarliste for innlogga brukarar */}
      {isLoggedIn && (
        <div className="max-w-2xl mx-auto py-8">
          {error && (
            <p className="text-red-500 font-semibold mb-4">{error}</p>
          )}
          <div className="flex flex-col gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white/80 border border-amber-200 rounded-2xl shadow-md p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:border-amber-400"
              >
                <h3 className="text-xl font-bold text-amber-700 mb-2">{user.fullName}</h3>
                <div className="flex items-center gap-2 text-sm text-amber-700 font-medium">
                  <span className="bg-amber-100 px-2 py-1 rounded">{user.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    <LoginStatusMarker />
    </div>
  );
}