import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/MainWidgets/NavBar";
import Swal from "sweetalert2";


import LoginPage2 from "./LoginPage2";

//svg images
import profile_picture from "../assets/svg/profile_picture/man.svg";

//svg icons
import user_icon from "../assets/svg/icons/user_2.svg";
import eye_open from "../assets/svg/icons/eye_open.svg";
import eye_closed from "../assets/svg/icons/eye_closed.svg";
import password_img from "../assets/svg/icons/password.svg";
import logo from "../assets/svg/icons/emcali_logo.svg";
import { IoKey, IoPerson, IoSearchCircle } from "react-icons/io5";


export default function LoginPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPasswords] = useState("");
  const url = "http://0.0.0.0:8000/login/";
  const url_get_data = `http://0.0.0.0:8000/user/${localStorage.getItem('id')}/`;
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      try {
        fetch(url_get_data, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
           },
          // body: localStorage.getItem("credentials"),
        }).then(async function (response) {
          if (response.status == 200) {
            const token = await response.json();
            console.log(token);
            debugger
            Swal.fire({
              title: "Ya estas logueado!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("../dashboard/home", { replace: true });
          } else {
            window.localStorage.removeItem("credentials");
            // console.log("Hubo un problema con las credenciales!");
            Swal.fire({
              title: "Error!",
              footer: "Hubo un Problema, PorFavor Logueate",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [localStorage.getItem("token")]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      console.log(credentials);
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then(async function (response) {
        if (response.status == 200) {
          const data_usuario = await response.json();
          console.log(data_usuario);
          window.localStorage.setItem("email", data_usuario.user["email"]);
          window.localStorage.setItem("id", data_usuario.user["id"]);
          window.localStorage.setItem("token", data_usuario.token);
          window.localStorage.setItem(
            "username",
            data_usuario.user["username"]
          );

          Swal.fire({
            title: "Exito!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("../dashboard/home", { replace: true });
        } else {
          window.localStorage.removeItem("credentials");
          console.log("Credenciales Erroneas!");
          Swal.fire({
            title: "Error!",
            footer: "Credenciales Erroneas",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Hubo un error!",
        icon: "error",
        confirmButtonText: "Intentar",
      });
      console.error(error);
    }
  };

  // arrow function
  const showPassword = () => {
    let password = document.getElementById("login_password");
    let shwBtnImg = document.getElementById("show_password_button_img");

    if (shwBtnImg.classList.contains("dont_show") == true) {
      shwBtnImg.classList.remove("dont_show");
      shwBtnImg.classList.add("show");
      shwBtnImg.src = eye_closed;
      password.type = "text";
    } else {
      shwBtnImg.classList.remove("show");
      shwBtnImg.classList.add("dont_show");
      shwBtnImg.src = eye_open;
      password.type = "password";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      

      {/* FORM */}
      <div className="flex flex-col text-center bg-gradient-to-br from-amber-600 to-amber-500 items-center justify-center space-y-5 h-screen">
        <img src={logo} className="w-40" />
        <h2 className="font-bold text-xl ">Inicia sesión para continuar</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="space-y-5 mb-3">
            <div className="flex flex-row w-full">
            <div className="bg-amber-500 items-center rounded-l-xl justify-center flex w-12 h-14 py-2" id="password_icon">
                <IoPerson size="25" className="text-white"/>
              </div>
              <input
                className="login_input field_input"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de Usuario"
              ></input>
            </div>
            <div className="flex flex-row w-full">
              <div className="bg-amber-500 items-center rounded-l-xl justify-center flex w-12 h-14 py-2" id="password_icon">
                <IoKey size="30" className="text-white"/>
              </div>
              <input
                id="login_password"
                className="login_input_password"
                type="password"
                value={password}
                required
                onChange={(e) => setPasswords(e.target.value)}
                placeholder="Contraseña"
              ></input>
              <button
                type="button"
                id="show_password_button"
                onClick={showPassword}
                className="bg-gray-200 rounded-r-xl w-14"
              >
                <img
                  id="show_password_button_img"
                  className="dont_show"
                  src={eye_open}
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full">
            {/* <a
              href="#"
              className="text-gray-700 hover:text-amber-500  transition-all  ease-in-out mb-3"
            >
              <p className="text-right">¿Olvidaste tu contraseña?</p>
            </a> */}

            <button
              // type="button"
              className="bg-gradient-to-r from-amber-400 to-amber-600 shadow-md hover:shadow-xl font-bold rounded-3xl w-36 py-2 ease-in-out duration-300 transition hover:scale-105 self-center"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
