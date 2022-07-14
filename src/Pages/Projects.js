import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import { motion } from "framer-motion";
import ProjectCreationModal from "../Components/Modals/ProjectCreationModal";

import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import DataTableProjects from "../Components/MainWidgets/DataTableProjects";
import SideBarAnimated from "../Components/MainWidgets/SideBarAnimated";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div className="flex flex-row h-screen w-12/12">
      <div className="">
        <SideBarAnimated />
      </div>
      <div className="ml-1 my-4 mr-4 rounded-lg bg-gradient-to-tl" style={{width: "97%"}}>
        <div className="flex flex-row space-x-4 ">
          <h3 className="font-semibold text-2xl">Gestión de Proyectos</h3>
          <motion.button
            className="px-3 py-0 flex flex-row justify-center items-center text-center font-bold bg-blue-500 text-white rounded-xl"
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (modalOpen ? close() : open())}
          >
            Añadir Proyecto <IoAdd size={20} className="ml-2" />
          </motion.button>
        </div>

        <div className="flex flex-col xl:flex-row">
          <div className="w-full py-5">
            <DataTableProjects />
          </div>
          <div className="w-full xl:w-4/12">
            <Map />
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProjectCreationModal modalOpen={modalOpen} handleClose={close} />
      )}
    </div>
  );
}
