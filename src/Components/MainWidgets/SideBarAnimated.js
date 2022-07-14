import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
const routes = [
  {
    path: "/dashboard/home",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/clientes",
    name: "Gestionar Clientes",
    icon: <FaUser />,
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
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  }
];

const SideBarAnimated = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
          className="sidebar bg-gradient-to-l from-blue-800 to-blue-900"
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
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-gray-600 focus:text-gray-800"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Busqueda"
                />
              )}
            </AnimatePresence>
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
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBarAnimated;
