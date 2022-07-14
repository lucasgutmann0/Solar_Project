import React, { useRef } from "react";
import logo from "../../assets/svg/icons/emcali_logo.svg";
import {
  IoPerson,
  IoLogOut,
  IoPeopleCircle,
  IoBusiness,
  IoGrid,
  IoPulse,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SideBar() {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("token");

  const logout = () => {
    try {
      fetch(`http://0.0.0.0:8000/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: id }),
      }).then(async function (response) {
        if (response.status == 200) {
          console.log(response.status);
          Swal.fire({
            title: "Te has deslogueado con exito",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          window.localStorage.clear();
          navigate("../", { replace: true });
        } else {
          Swal.fire({
            title: "Error!",
            footer: "Fallo en el servidor",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    } catch (error) {
      console.error();
    }
  };

  const SideBarIcon = ({ icon, text }) => {
    return (
      <div className="sidebar-icon group">
        <i>{icon}</i>
        <span className="sidebar-description group-hover:scale-100">
          {text}
        </span>
      </div>
    );
  };

  const OtherSideBarIcon = ({ icon, text }) => {
    return (
      <div className="group sidebar-other-icon flex flex-row">
        <i>{icon}</i>
        <span className="sidebar-description group-hover:scale-100">
          {text}
        </span>
        {/* <h3 className="items-center flex pl-2">hola</h3> */}
      </div>
    );
  };

  return (
    <div className="fixed h-screen flex flex-col items-left justify-center z-50">
      <div className="absolute shadow-lg left-3 h-95 py-5 px-5 rounded-xl m-0 flex flex-col items-center justify-between bg-gradient-to-b from-amber-500 to-amber-600 text-white">
        <div>
          <Link to="/">
            <img src={logo} className="h-10 mt-2 mb-2 mx-auto w-10" />
          </Link>
        </div>
        <div className="flex flex-col space-y-5">
          <Link to="/dashboard">
            <SideBarIcon icon={<IoGrid size="20" />} text="Dashboard" />
          </Link>
          <Link to="/dashboard/clientes">
            <SideBarIcon
              icon={<IoPeopleCircle size="20" />}
              text="Gestionar Clientes"
            />
          </Link>
          <Link to="/dashboard/proyectos">
            <SideBarIcon
              icon={<IoBusiness size="20" />}
              text="Gestionar Proyectos"
            />
          </Link>

          <Link to="/dashboard/inversores">
            <SideBarIcon
              icon={<IoPulse size="20" />}
              text="Gestionar Inversores"
            />
          </Link>
        </div>

        <div>
          <Link to="/perfil">
            <OtherSideBarIcon icon={<IoPerson size="20" />} text="Acceder al perfil"/>
          </Link>
          <button onClick={logout}>
            <OtherSideBarIcon icon={<IoLogOut size="20" />} text="Cerrar la sesión"/>
          </button>
        </div>
      </div>
    </div>
  );
}
