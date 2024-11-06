import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Navbar from './_components/Navbar'
import HomePage from './pages/Home'
import Login from './pages/Login'
import Branch from './pages/Branch'
import Footer from './_components/Footer'
import { useEffect, useState } from 'react'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import BranchDocuments from './_components/Document'


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{

    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <Router>
      <div>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
