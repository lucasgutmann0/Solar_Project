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
    <div className="flex flex-row pr-10 lg:pr-0 h-screen">
      {/* SideBar */}
      <div className="">
        <SideBarAnimated />
      </div>

      {/* Top of the Page */}
      <div
        className="mx-4 my-4 rounded-lg bg-gradient-to-tl"
        style={{ width: "94%", height: "92%" }}
      >
        <div className="flex flex-row space-x-4 pb-4">
          <h3 className="font-semibold text-2xl">Gestión de Proyectos</h3>
          <motion.button
            className="px-3 flex flex-row justify-center items-center text-center font-bold bg-blue-500 text-white rounded-xl"
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (modalOpen ? close() : open())}
          >
            Añadir Proyecto <IoAdd size={20} className="ml-2" />
          </motion.button>
        </div>

        {/* Content */}

        <div className="flex flex-col xl:flex-col justify-between h-full">
          <section className="flex flex-row justify-between h-2/5 space-x-5 mb-2">
            <div className="bg-blue-500 w-1/3 dropshadow-lg h-full rounded-md py-4 px-7">
              <h3>Información</h3>
            </div>
            <div className="bg-blue-500 w-1/3 dropshadow-lg h-full rounded-md py-4 px-7">
              <h3>Información</h3>
            </div>
            <div className="bg-blue-500 w-1/3 dropshadow-lg h-full rounded-md py-4 px-7">
              <h3>Información</h3>
            </div>
          </section>
          <section className="h-3/5">
            <DataTableProjects />
          </section>
        </div>
      </div>

      {modalOpen && (
        <ProjectCreationModal modalOpen={modalOpen} handleClose={close} />
      )}
    </div>
  );
}
