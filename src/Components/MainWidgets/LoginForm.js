import React, { Component } from "react";
//svg images
import profile_picture from "../../assets/svg/profile_picture/man.svg";

//svg icons
import user_icon from "../../assets/svg/icons/user_2.svg";
import eye_open from "../../assets/svg/icons/eye_open.svg";
import eye_closed from "../../assets/svg/icons/eye_closed.svg";
import password_img from "../../assets/svg/icons/password.svg";

export default class LoginForm extends Component {
  state = {};

  render() {
    // import from LoginPage2 - handlers...
    const { onChange, formStatus, onSubmit } = this.props;

    const showPassword = () => {
      let password_field = document.getElementById("password_field");
      let shwBtnImg = document.getElementById("show_password_button_img");

      if (shwBtnImg.classList.contains("dont_show") == true) {
        shwBtnImg.classList.remove("dont_show");
        shwBtnImg.classList.add("show");
        shwBtnImg.src = eye_closed;
        password_field.type = "text";
      } else {
        shwBtnImg.classList.remove("show");
        shwBtnImg.classList.add("dont_show");
        shwBtnImg.src = eye_open;
        password_field.type = "password";
      }
    };

    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-col text-center items-center justify-center space-y-5 h-screen">
          <div className="items-center flex flex-col space-y-5">
            <img src={profile_picture} className="w-40" />
            <h2 className="font-bold text-4xl">BIENVENIDO</h2>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center"
          >
            <div className="space-y-5">
              <div className="flex flex-row w-full">
                <div className="regist_img">
                  <img src={user_icon} />
                </div>
                <input
                  className="regist_input"
                  type="text"
                  name="username"
                  value={formStatus.username || ""}
                  required
                  onChange={onChange}
                  placeholder="username"
                ></input>
              </div>
              <div className="flex flex-row w-full">
                <div className="regist_img">
                  <img src={password_img} />
                </div>
                <input
                  id="password_field"
                  name="password"
                  className="login_input_password"
                  type="password"
                  value={formStatus.password || ""}
                  required
                  onChange={onChange}
                  placeholder="password"
                ></input>
                <button
                  type="button"
                  id="show_password_button"
                  onClick={showPassword}
                  className="bg-gray-200 px-5 rounded-r-full"
                >
                  <img
                    id="show_password_button_img"
                    className="dont_show"
                    src={eye_open}
                    style={{ width: "34px", height: "24px" }}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full">
              <a
                href="#"
                className="text-gray-700 hover:text-amber-500  transition-all  ease-in-out mb-3"
              >
                <p className="text-right">¿Olvidaste tu contraseña?</p>
              </a>

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
}
