// src/pages/Login.js
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "@/main";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and register
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submit for Login/Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLoginMode
        ? "http://localhost:5000/api/v1/auth/login"
        : "http://localhost:5000/api/v1/auth/register";

      const data = isLoginMode
        ? { email, password }
        : { fullName, email, password };
      // Send request with credentials for cookie-based auth
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Set auth state to true on successful login or register
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      console.error(
        isLoginMode ? "Login failed:" : "Registration failed:",
        error
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg bg-white">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-r from-purple-500 to-orange-400 p-10 text-white flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Welcome to PrepPortal</h2>
          <h3 className="text-xl font-semibold mt-4">
            Your go-to platform for placement & academic preparation
          </h3>
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <Card className="w-full">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                {isLoginMode ? "Login" : "Register"}
              </h2>
              <p className="text-gray-500 text-sm">
                Welcome <span>{isLoginMode ? "back!" : " "}</span> Please{" "}
                <span>{isLoginMode ? "Login" : "Register"}</span> to your
                account.
              </p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                {!isLoginMode && (
                  <div className="mb-4">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full mb-4 p-2 border border-gray-300 rounded"
                      required={!isLoginMode}
                    />
                  </div>
                )}
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {isLoginMode ? (
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="mr-2" />
                      <Label htmlFor="remember">Remember Me</Label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-purple-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                ) : (
                  <div></div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700">
                  {isLoginMode ? "Login" : "Register"}
                </Button>
                <p className="text-sm text-center mt-4">
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    onClick={() => {
                      setIsLoginMode(!isLoginMode);
                    }}
                    className="text-purple-600 cursor-pointer ml-1">
                    {!isLoginMode ? "Login" : "Register"}
                  </span>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
