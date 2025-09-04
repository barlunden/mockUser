import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import logo from "../../public/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Login from "./loginForm";
import Register from "./register";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";

interface NavbarProps {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}

export default function Navbar({ sheetOpen, setSheetOpen }: NavbarProps) {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Log out handler
  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/"); // Send brukaren til Home
    }
  };

  return (
    <nav className="navbar bg-slate-50">
      <div className="flex flex-col max-md:gap-5 md:flex-row items-center justify-between">
        <div className="grid grid-cols-1 justify-items-center">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
          </NavLink>
          <h4 className="font-bold">PROPER POSTS</h4>
        </div>
        <div className="flex flex-row gap-3 sm:gap-5 md:gap-8 text-xl font-semibold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-entry">Add Entry</NavLink>
          <NavLink to="/entries">Entries</NavLink>
          {isLoggedIn && <NavLink to="/users">Users</NavLink>}
        </div>
        <div className="flex flex-row gap-5">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <Button onClick={() => setSheetOpen(true)}>Account</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Account</SheetTitle>
                <SheetDescription>
                  <Tabs defaultValue="account">
                    <TabsList>
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <Login />
                    </TabsContent>
                    <TabsContent value="register">
                      <Register onSuccess={() => setSheetOpen(false)} />
                    </TabsContent>
                  </Tabs>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Button onClick={handleLogout} disabled={!isLoggedIn}>
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
