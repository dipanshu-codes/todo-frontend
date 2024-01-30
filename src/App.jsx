import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 lg:px-20 ">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Landing />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}
