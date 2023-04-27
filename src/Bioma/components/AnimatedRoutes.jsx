import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Usuarios, Areas } from "..";

export const AnimatedRoutes = () => {
    const location = useLocation();
    return (
      <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/*" element={ <Usuarios/> } />
            <Route path="/areas" element={ <Areas/> } />
          </Routes>
      </AnimatePresence>
    )
}

