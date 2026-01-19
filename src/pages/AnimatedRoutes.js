import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { ENABLE_AUTH } from "../config/featureFlags";
import Home from "./Home";
import Events from "./Events";
import Gallery from "./Gallery";
import Register from "./Register";
import Sponsors from "./Sponsors";

// Conditionally import auth-related components
let ProtectedComponent = null;
let SignIn = null;
let SignUp = null;
let UpdateProfile = null;
let UserProfile = null;
let Admin = null;

if (ENABLE_AUTH) {
  ProtectedComponent = require("../components/ProtectedRoute").default;
  SignIn = require("./SignIn").default;
  SignUp = require("./SignUp").default;
  UpdateProfile = require("./UpdateProfile").default;
  UserProfile = require("./UserProfile").default;
  Admin = require("./Admin").default;
}

function AnimatedRoutes({ authUser, updateAuthUserAttr, handleLogout, checkingStatus }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home user={authUser.user} />} />
        <Route path="/events" element={<Events user={authUser.user} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sponsors" element={<Sponsors />} />

        {/* Auth routes - only rendered when ENABLE_AUTH is true */}
        {ENABLE_AUTH && (
          <>
            <Route path="/update-profile"
              element={<ProtectedComponent
                authUser={authUser}
                checkingStatus={checkingStatus}
                isAdmin={false}
                children={<UpdateProfile updateProfile={updateAuthUserAttr} user={authUser} />}
              />}
            />
            <Route path="/signin" element={<SignIn user={authUser} logoutUser={handleLogout} updateAuthUserAttr={updateAuthUserAttr} />} />
            <Route path="/signup" element={<SignUp user={authUser} logoutUser={handleLogout} updateAuthUserAttr={updateAuthUserAttr} />} />
            <Route path="/user" element={
              <ProtectedComponent authUser={authUser} checkingStatus={checkingStatus} isAdmin={false} children={
                <UserProfile user={authUser} logoutUser={handleLogout} />
              } />
            } />
            <Route path="/admin" element={
              <ProtectedComponent authUser={authUser} checkingStatus={checkingStatus} isAdmin={true} children={
                <Admin user={authUser} />
              } />
            } />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;