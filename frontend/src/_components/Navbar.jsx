// // src/components/Navbar.js

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/npp_logo.png";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Context } from "@/main";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/auth/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="ml-2 font-bold text-xl">
              <img className="h-16 w-24" src={Logo} alt="Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600">
              Home
            </Link>
            <Link
              to="/branches"
              className="text-gray-600 hover:text-purple-600">
              Branches
            </Link>
            <Link to="/upload" className="text-gray-600 hover:text-purple-600">
              Upload Resources
            </Link>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800">
                    {user.fullName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="block w-full text-left">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-800">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
