// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/npp_logo.png';
import axios from 'axios'
import { Button } from '@/components/ui/button';

const Navbar = ({isAuthenticated, setIsAuthenticated }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          // Send a logout request to the backend
            await axios.get('http://localhost:5000/api/v1/auth/logout', {
                withCredentials: true
            });
        
            // Clear the token from localStorage
        
            // Update authentication state
            setIsAuthenticated(false);
        
            // Redirect to home page after logout
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            {/* <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">NITA PrepPortal</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/branches" className="hover:text-blue-600">Branches</Link>
                    <Link to="/upload" className="hover:text-blue-600">Upload Resources</Link>
                    <Button className="bg-blue-600 text-white">Login/Signup</Button>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">                          
                        <Link to='/' className="ml-2 font-bold text-xl">
                            <img className="h-16 w-24" src={Logo} alt="Logo"/>
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">
                        Home
                        </Link>
                        <Link to="/branches" className="text-gray-600 hover:text-blue-600">
                        Branches
                        </Link>
                        <Link to="/upload" className="text-gray-600 hover:text-blue-600">
                        Upload Resources
                        </Link>
                    </div>

                    {/* Login/Signup Button */}
                    <div className="flex items-center">
                        {
                            isAuthenticated? (
                                <Button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">Logout</Button>
                            ) : (
                                <Link to='/login'>
                                    <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">
                                        Login/Signup
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
