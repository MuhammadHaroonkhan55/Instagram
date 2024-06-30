import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/ProtectedRoute";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";
import Profile from "./pages/Profile";
const App = () => {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={
              <IsUserLoggedIn user={user} loggedInPath={"/"}>
                <Login />
              </IsUserLoggedIn>
            }
          />
          <Route
            path="/signup"
            element={
              <IsUserLoggedIn user={user} loggedInPath={"/"}>
                <Signup />
              </IsUserLoggedIn>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/p/:username" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
