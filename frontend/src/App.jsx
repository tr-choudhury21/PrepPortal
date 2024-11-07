import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Navbar from './_components/Navbar'
import HomePage from './pages/Home'
import Login from './pages/Login'
import Branch from './pages/Branch'
import Footer from './_components/Footer'
import { useContext, useEffect, useState } from 'react'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import BranchDocuments from './_components/Document'
import { Context } from './main'
import axios from 'axios'


const App = () => {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  useEffect(()=>{

    const fetchUser = async () =>{
      try {
        const response = await axios.get("http://localhost:5000/api/v1/auth/userdetails",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);


  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/branches" element={<Branch />} />
          <Route path="/upload" element={<Upload  setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/branch/:branchShort" element={<BranchDocuments />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
};

export default App
