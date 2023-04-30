import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Usuarios, Areas, Reservas } from "..";
import { Pruebas } from "../pages/Pruebas";

export const AnimatedRoutes = () => {
    const location = useLocation();
    return (
      <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/*" element={ <Usuarios/> } />
            <Route path="/areas" element={ <Areas/> } />
            <Route path="/reservas" element={ <Reservas/> } />
          </Routes>
      </AnimatePresence>
    )
}

