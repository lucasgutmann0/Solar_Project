import { motion } from "framer-motion";
import Swal from "sweetalert2";
import BackDrop from "./BackDrop";
import { IoAdd, IoPerson, IoLocation, IoLocate } from "react-icons/io5";
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
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
};

const ProjectCreationModal = ({ handleClose, text }) => {
  const navigate = useNavigate();

  const [client, setClient] = useState([]);

  const [fk_clients, setFkClients] = useState("");
  const [installed_power, setInstalledPower] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const NewProject = {
    fk_clients,
    installed_power,
    address,
    latitude,
    longitude,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch("http://0.0.0.0:8000/project/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(NewProject),
      }).then(async function (response) {
        if (response.status == 201) {
          const data = await response.json();
          console.log(data);
          Swal.fire({
            title: "Exito!",
            text: "Se ha creado el nuevo Proyecto",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("../perfil", { replace: true });
        } else {
          console.log("Faltan datos en el formato!");
          Swal.fire({
            title: "Error!",
            text: "No se pudo crear el proyecto",
            footer: "Porfavor, completa los campos",
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

  const fetchUrl = "http://0.0.0.0:8000/client/list/";

  const loadData = async () => {
    const data = await fetch(fetchUrl);
    const clientList = await data.json();
    setClient(clientList);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal_project bg-gradient-to-tr from-blue-600 to-blue-300 w-7/12 items-center justify-center flex"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form className="p-10 w-full space-y-5" onSubmit={handleSubmit}>
          <h1 className="font-bold text-center text-2xl">
            Creacion de Proyecto
          </h1>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row">
              <div className="regist_img">
                <IoPerson size="25" />
              </div>
              <select
                className="regist_input"
                type="text"
                name="client"
                value={fk_clients}
                onChange={(e) => setFkClients(e.target.value)}
                required
              >
                <option>seleccionar cliente</option>
                {client.map((clientget) => (
                  <option key={clientget.id} value={clientget.id}>
                    {" "}
                    {clientget.name}{" "}
                  </option>
                ))}
              </select>
              <div>
                <motion.button
                  className="w-16 h-full flex flex-row justify-center items-center text-center font-bold bg-blue-500 text-white rounded-xl"
                  whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={
                    () => console.log("Hola") /*(modalOpen ? close() : open())*/
                  }
                >
                  <IoAdd size={20} />
                </motion.button>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="regist_img">
                <BsLightningChargeFill size="25" />
              </div>
              <input
                className="regist_input"
                type="number"
                name="installed_power"
                value={installed_power}
                required
                onChange={(e) => setInstalledPower(e.target.value)}
                placeholder="Potencia Instalada"
              ></input>
            </div>

            <div className="flex flex-row">
              <div className="regist_img">
                <IoLocation size="25" />
              </div>
              <input
                className="regist_input"
                type="text"
                name="direccion"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
              ></input>
            </div>

            <div className="flex flex-row justify-center w-full space-x-8">
              <div className="flex flex-row w-full">
                <div className="regist_img">
                  <IoLocate size="25" />
                </div>
                <input
                  className="regist_input"
                  type="number"
                  step="0.01"
                  name="latitude"
                  value={latitude}
                  required
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Longitud"
                ></input>
              </div>

              <div className="flex flex-row w-full">
                <div className="regist_img">
                  <IoLocate size="25" />
                </div>
                <input
                  className="regist_input"
                  type="number"
                  step="0.01"
                  name="latitude"
                  value={longitude}
                  required
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Latitude"
                ></input>
              </div>
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
              Crear Proyecto
            </motion.button>
          </div>
        </form>
      </motion.div>
    </BackDrop>
  );
};

export default ProjectCreationModal;
