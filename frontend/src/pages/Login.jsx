// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"

// import {Button} from "@/components/ui/button"
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function Login(){

//   const navigateTo = useNavigate();


//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); 

//   const togglePasswordVisibility = () => {
//       setShowPassword(!showPassword);
//   }

//   const handleSubmit = async (e) => {
//       e.preventDefault();

//       try {
//           const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
//               username,
//               password
//           });

//           console.log("User Logged In successfully ", response.data);
//           navigateTo('/');

//       } catch (error) {
//           console.log("error logging up", error);
//       }

//   };

//   return (
//   <div className="flex justify-center items-center min-h-screen">
//       <Card>
//           <CardHeader className="space-y-1">
//               <CardTitle className="text-center text-2xl">Login Page</CardTitle>
//               <CardDescription>
//                   Enter your details to Login into your account
//               </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//               <CardContent className="grid gap-4">
//                   <div className="relative">
//                       <div className="absolute inset-0 flex items-center">
//                       {/* <span className="w-full border-t" /> */}
//                       </div>
//                       <div className="relative flex justify-center text-xs uppercase">
//                       {/* <span className="bg-background px-2 text-muted-foreground">
//                           Or continue with
//                       </span> */}
//                       </div>
//                   </div>
//                   <div className="grid gap-2">
//                       <Label htmlFor="username">Username</Label>
//                       <Input 
//                           id="username" 
//                           type="username" 
//                           placeholder="xyz"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                       />
//                   </div>
//                   <div className="grid gap-2 relative">
//                       <Label htmlFor="password">Password</Label>
//                       <Input 
//                           id="password" 
//                           type={showPassword ? "text" : "password"} 
//                           placeholder="*****"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                       />
//                       <Button
//                           type='button'
//                           onClick={togglePasswordVisibility}
//                           className="absolute right-0 top-5 text-sm"
//                       >
//                           {showPassword ? "Hide" : "Show"}
//                       </Button>
//                   </div>
//               </CardContent>
//               <CardFooter>
//                   <Button type="submit" className="w-full">Login</Button>
//               </CardFooter>
//           </form>

//       </Card>
//   </div>
//   )

// }

// export default Login;


// src/pages/Login.js
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and register
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
      // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
      // Handle form submit for Login/Signup
    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const endpoint = isLoginMode ? 'http://localhost:5000/api/v1/auth/login' : 'http://localhost:5000/api/v1/auth/register';

                const data = isLoginMode ? { email, password } : { fullName, email, password };
                // Send request with credentials for cookie-based auth
                const response = await axios.post(endpoint, data, { withCredentials: true });

                if (response.data.success) {
                  setIsAuthenticated(true); // Set auth state to true on successful login or register
                  navigate('/'); // Redirect to the homepage
                }
            } catch (error) {
                console.error(isLoginMode ? 'Login failed:' : 'Registration failed:', error);
            }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{isLoginMode ? 'Login' : 'Register'}</h2>
        
                {/* {error && <p className="text-red-600 mb-4">{error}</p>} */}
        
                <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <div className="mb-4">
                    <label className="block text-sm font-medium">Full Name</label>
                    <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required={!isLoginMode}
                    />
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
        
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
        
                <Button type="submit" className="w-full bg-blue-600 text-white">
                    {isLoginMode ? 'Login' : 'Register'}
                </Button>
                </form>
        
                <p className="text-sm mt-4">
                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                <span
                    onClick={() => {
                        setIsLoginMode(!isLoginMode);
                    }}
                    className="text-blue-600 cursor-pointer ml-1"
                >
                    {!isLoginMode ? 'Login' : 'Register'}
                </span>
                </p>
            </div>
        </div>
    );
};

export default Login;

