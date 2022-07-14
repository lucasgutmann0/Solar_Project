import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import { AnimatePresence, motion } from "framer-motion";

import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import DataTableClients from "../Components/MainWidgets/DataTableClients";
import ClientCreationModal from "../Components/Modals/ClientCreateModal";
import SideBarAnimated from "../Components/MainWidgets/SideBarAnimated";

export default function Clients() {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div className="flex flex-row h-screen w-screen">
      <div>
        <SideBarAnimated />
      </div>
      <div className="pl-4 ml-1 my-4 mr-4 rounded-lg bg-gradient-to-tl w-full">
        <div className="flex flex-row space-x-4 ">
          <h3 className="font-semibold text-2xl">Gestión de Clientes</h3>
          <motion.button
            className="px-3 py-0 flex flex-row justify-center items-center text-center font-bold bg-blue-500 text-white rounded-xl"
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (modalOpen ? close() : open())}
          >
            Añadir Cliente <IoAdd size={20} className="ml-2" />
          </motion.button>
        </div>

        <div className="flex flex-row">
          <div className="w-full py-5">
            <DataTableClients />
          </div>
          <div className="w-4/12">
            <Map />
          </div>
        </div>
      </div>
      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        exitBeforeEnter={true}
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {modalOpen && <ClientCreationModal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
      
    </div>
  );
}
