import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const token = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              token ? <Navigate to={<Home />} /> : <Navigate to={<Login />} />
            }
          />
          <Route
            path="/profile"
            element={
              token ? (
                <Navigate to={<Profile />} />
              ) : (
                <Navigate to={<Login />} />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}
