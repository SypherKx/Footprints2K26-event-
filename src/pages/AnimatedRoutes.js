import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from "./Home";
import Events from "./Events";
import Gallery from "./Gallery";
import Register from "./Register";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;