import { motion } from "framer-motion";
import Swal from "sweetalert2";
import BackDrop from "./BackDrop";
import { IoAdd, IoPerson, IoLocation, IoLocate, IoPersonAdd, IoDocument } from "react-icons/io5";
import { BsLightningChargeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ClientCreationModal = ({ handleClose, text }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [contract, setContract] = useState("");

  const NewClient = {
    name,
    contract,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch("http://0.0.0.0:8000/client/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(NewClient),
      }).then(async function (response) {
        if (response.status == 201) {
          const data = await response.json();
          console.log(data);
          Swal.fire({
            title: "Exito!",
            text: "Se registro Nuevo Cliente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          handleClose()
          navigate("../dashboard/clientes", { replace: true });
        } else {
          console.log("Faltan datos en el formato!");
          Swal.fire({
            title: "Error!",
            text: "Ya existe un Cliente con este Nombre",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal_client bg-gradient-to-tr from-teal-600 to-teal-300 items-center justify-center flex"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form className="p-10 w-full space-y-5" onSubmit={handleSubmit}>
          <h1 className="font-bold text-center text-2xl">
            Registro de Cliente
          </h1>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row">
              <div className="regist_img">
                <IoPersonAdd size="25" />
              </div>
              <input
                className="regist_input"
                type="text"
                name="direccion"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del Cliente"
              ></input>
            </div>
            <div className="flex flex-row">
              <div className="regist_img">
                <IoDocument size="25" />
              </div>
              <input
                className="regist_input"
                type="number"
                name="installed_power"
                value={contract}
                required
                onChange={(e) => setContract(e.target.value)}
                placeholder="Id del Contrato"
              ></input>
            </div>
          </div>
          <div className="flex flex-row items-end justify-end space-x-4">
            <motion.button
              className="px-4 py-2 font-bold bg-red-600 text-white rounded-xl"
              whileHover={{ scale: 1.1, backgroundColor: "#b91c1c" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
            >
              Cerrar
            </motion.button>
            <motion.button
              className="px-4 py-2 font-bold bg-blue-500 text-white rounded-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Añadir Cliente
            </motion.button>
          </div>
        </form>
      </motion.div>
    </BackDrop>
  );
};

export default ClientCreationModal;
