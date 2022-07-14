import React, { Component } from "react";
//IMPORT REACT-ROUTER-DOM
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//VISTAS - COMPONENTES
import MainPage from "../../Pages/MainPage";
import LoginPage from "../../Pages/LoginPage";
import Dashboard from "../../Pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import OtherProtectedRoutes from "./OtherProtectedRoutes";
import Profile from "../../Pages/Profile";
import Projects from "../../Pages/Projects";
import Inversors from "../../Pages/Inversors";
import Clients from "../../Pages/Clients";

//CLASE NAVIGATION FOR MAKE ROUTES
export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* RUTAS EXCLUIDAS SI EL USUARIO NO ESTA AUTENTICADO */}
          <Route element={<PrivateRoutes />}>
            <Route exact path="/dashboard/home" element={<Dashboard />} />
            <Route exact path="/perfil" element={<Profile />} />
            <Route exact path="/dashboard/clientes" element={<Clients />} />
            <Route exact path="/dashboard/proyectos" element={<Projects />} />
            <Route exact path="/dashboard/inversores" element={<Inversors />} />
          </Route>
          {/* RUTAS EXCLUIDAS SI EL USUARIO SI ESTA AUTENTICADO */}
          <Route element={<OtherProtectedRoutes />}>
            <Route exact path="/login" element={<LoginPage />} />
          </Route>

          <Route exact path="/" element={<MainPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
}

