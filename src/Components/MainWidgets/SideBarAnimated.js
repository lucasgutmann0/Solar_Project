import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  IoPerson,
  IoLogOut,
  IoPeopleCircle,
  IoBusiness,
  IoGrid,
  IoPulse,
  IoPersonAdd,
  IoPersonRemove,
} from "react-icons/io5";
import SidebarMenu from "./SideBarMenu";

const otherRoutes = [
  {
    path: "/perfil",
    name: "Perfil Usuario",
    icon: <IoPerson />,
  },
  // {
  //   path: "/",
  //   name: "Cerrar Sesión",
  //   icon: <IoPerson />,
  // },
];

const routes = [
  {
    path: "/dashboard/home",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/clientes",
    name: "Gestionar Clientes",
    icon: <IoPersonAdd />,
    // subRoutes: [
    //     {
    //         path: "/dashboard/clientes/añadir",
    //         name: "Añadir Clientes",
    //         icon: <IoPersonAdd />
    //     },
    //     {
    //         path: "/dashboard/clientes/delete",
    //         name: "Eliminar Cliente",
    //         icon: <IoPersonRemove />
    //     },
    //     {
    //         path: "/dashboard/clientes/modify",
    //         name: "Añadir Clientes",
    //         icon: <IoPersonAdd />
    //     }
    // ]
  },
  {
    path: "/dashboard/proyectos",
    name: "Gestionar Proyectos",
    icon: <IoBusiness />,
  },
  {
    path: "/dashboard/inversores",
    name: "Gestionar Inversores",
    icon: <IoPulse />,
  },
  // {
  //   path: "/file-manager",
  //   name: "File Manager",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
];

const SideBarAnimated = ({ children }) => {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("id");
  const token = window.localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.3,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar bg-gradient-to-t from-blue-500 to-blue-600 py-2 drop-shadow-xl"
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo flex flex-row items-center "
                >
                  Solaris
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>

          <section className="other_routes">
            {otherRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <motion.div>
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link_profile"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </motion.div>
              );
            })}
            <motion.div>
              <motion.button
                className="link_profile w-full items-center"
                activeClassName="active"
                onClick={logout}
              >
                <IoLogOut className="icon"/>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Cerrar sesión
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBarAnimated;
