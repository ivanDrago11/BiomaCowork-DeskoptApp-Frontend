import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Usuarios, Areas, Reservas} from "..";
import { LectorQR } from "../pages/LectorQR";
import Login from "../pages/Login";
import { Pruebas } from "../pages/Pruebas";

export const AnimatedRoutes = () => {
    const location = useLocation();
    return (
      <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/users" element={ <Usuarios/> } />
            <Route path="/areas" element={ <Areas/> } />
            <Route path="/reservas" element={ <Reservas/> } />
            <Route path="/lectorQR" element={ <LectorQR/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/*" element={ <Login/> }/>
          </Routes>
      </AnimatePresence>
    )
}

