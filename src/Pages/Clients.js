import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import { AnimatePresence, motion } from "framer-motion";

import SideBar from "../Components/MainWidgets/SideBar";
import Map from "../Components/MainWidgets/Map";
import CustomDataTableClients from "../Components/MainWidgets/CustomDataTableClients";
import ClientCreationModal from "../Components/Modals/ClientCreateModal";
import SideBarAnimated from "../Components/MainWidgets/SideBarAnimated";
import ClientTable from "../Components/MainWidgets/DataTable/ClientTable";

export default function Clients() {
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
          <h3 className="font-semibold text-2xl">Gestión de Clientes</h3>
          <motion.button
            className="px-3 flex flex-row justify-center items-center text-center font-bold bg-blue-500 text-white rounded-xl"
            whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (modalOpen ? close() : open())}
          >
            Añadir Cliente <IoAdd size={20} className="ml-2" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="h-full">
          <div className="flex flex-col xl:flex-col justify-between h-full">
            <section className="flex flex-row justify-between h-2/6 space-x-5 mb-2">
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
            <div className="h-2/3">
              <ClientTable />
            </div>
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
        {modalOpen && (
          <ClientCreationModal modalOpen={modalOpen} handleClose={close} />
        )}
      </AnimatePresence>
    </div>
  );
}
