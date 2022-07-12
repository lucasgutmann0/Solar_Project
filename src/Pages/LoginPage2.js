import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginForm from "../Components/MainWidgets/LoginForm";
import NavBar from "../Components/MainWidgets/NavBar";

export default class LoginPage2 extends React.Component {
  state = {
    form: {},
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = this.state.form;
    const url = "http://0.0.0.0:8000/login/";

    try {
      console.log(credentials);

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
        .then(async function (response) {
          if (response.status == 200) {
            return response.json();
          } else if (response.status == 400) {
            console.log("Credenciales Erroneas!");
            Swal.fire({
              title: "Credenciales Erroneas",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((responseJson) => {
          // Do something with the response
          const data_usuario = responseJson;
          console.log(data_usuario);
          window.localStorage.setItem(
            "credentials",
            JSON.stringify(credentials)
          );
          window.localStorage.setItem("email", data_usuario.user["email"]);
          window.localStorage.setItem("id", data_usuario.user["id"]);
          window.localStorage.setItem("token", data_usuario.token);
          window.localStorage.setItem(
            "username",
            data_usuario.user["username"]
          );
          window.localStorage.setItem("name", data_usuario.user["name"]);
          window.localStorage.setItem(
            "last_name",
            data_usuario.user["last_name"]
          );

          Swal.fire({
            title: "Exito!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate('/dashboard')
        })
        .catch((error) => {
          // si hay un problema con la base de datos entonces:
          console.log(error); // imprimir por consola el error
          // mostrar un mensaje en la pantalla en el fallo
          Swal.fire({
            title: "Hubo un fallo, intenta nuevamente",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { navigate } = this.props;
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <LoginForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          formStatus={this.state.form}
        />
      </div>
    );
  }
}

function Navigate(props) {
  return useNavigate(props.location, { replace: true })
}

export { Navigate };
