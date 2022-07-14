import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//assets
import UserImage from "../../assets/svg/profile_picture/man.svg";
import logo from "../../assets/svg/icons/emcali_logo.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const dropDownMenu = useRef();
  const username_dropDown = useRef();
  const mainBtn = useRef();
  const loginBtn = useRef();
  const id = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");
  const email = window.localStorage.getItem("email");

  const url_logout = `http://0.0.0.0:8000/logout/`;

  useEffect(() => {
    if (username) {
      username_dropDown.current.classList.toggle("hidden");
      mainBtn.current.classList.toggle("hidden");
      mainBtn.current.classList.toggle("flex");
      loginBtn.current.classList.toggle("hidden");
    }
  });

  const dropDown = () => {
    if (username) {
      dropDownMenu.current.classList.toggle("hidden");
    }
  };

  const credentialss = () => {
    window.localStorage.getItem("credentials");
  };

  const logout = () => {
    try {
      fetch(url_logout, {
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
          dropDown();
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

  return (
    <div className="relative top-0 w-full z-50">
      <nav className="">
        <div className="bg-gradient-to-b px-2 sm:px-4 py-2.5  from-gray-200 to-white border-gray-200 shadow z-20 w-full h-full flex flex-wrap justify-between items-center">
          <a href="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            {/* <span className="self-center text-xl font-semibold ">
              SOLARIS
            </span> */}
          </a>
          <div className="flex items-center md:order-2">
            <button
              onClick={() => {
                navigate("../login", { replace: true });
              }}
              ref={loginBtn}
              className="mainButton"
            >
              INICIAR SESIÓN
            </button>
            <button
              ref={mainBtn}
              className="hidden flex-row px-3 py-2 h-full text-sm justify-center bg-blue-500 hover:scale-105 transition text-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              type="button"
              onClick={dropDown}
            >
              <div className="flex flex-row">
                <h3 className="pt-1.5 pr-2 pl-2 hidden" ref={username_dropDown}>
                  {username}
                </h3>
                <img
                  className="w-8 h-8 rounded-full"
                  src={UserImage}
                  alt="photo"
                />
              </div>
            </button>

            {/* dropdown Menu */}
            {/* <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button> */}
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
        <div className="relative">
          <div
            ref={dropDownMenu}
            className="absolute w-60 top-0 right-0 hidden transition bg-white rounded-b divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown"
          >
            <div className="py-3 px-4 text-right">
              <span className="block text-sm text-gray-900">{username}</span>
              <span className="block hiddentext-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-1 text-right" aria-labelledby="dropdown">
              <li>
                <a href="/perfil">
                  <button className="dropdown_item">Perfil</button>
                </a>
              </li>
              <li>
                <a href="/dashboard/home">
                  <button className="dropdown_item">Dashboard</button>
                </a>
              </li>
              <li>
                <button href="/" className="dropdown_item" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
