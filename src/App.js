import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Main';
import First from './components/First';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Mypost from './components/Mypost';
import {ProtectedRoute, getCookie} from "./components/protectedRoute";

const App = () => {

  const isAuthenticated = localStorage.getItem("auth");

  return (
    <div className="w-full">
    <BrowserRouter>
      <Navbar />
      <Routes>

      <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
            <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <First />}
          />

      {/* <Route path="/" element={<First />} /> */}
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/edit" element={<Edit />} /> */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} /> */}
      {/* <Route path='/home' element={<Home/>} />
      <Route path='/mypost' element={<Mypost/>} /> */}

      <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mypost" element={<Mypost />} />
          </Route>

      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App