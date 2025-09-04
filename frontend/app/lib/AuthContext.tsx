import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (val: boolean) => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set initial status
    setIsLoggedIn(!!localStorage.getItem("token"));

    // Listen for changes in localStorage (e.g. login/logout in other tabs)
    const onStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}