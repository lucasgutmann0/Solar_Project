import { AnimatePresence, motion } from "framer-motion";

import React from "react";

const BackDrop = ({ children, onClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-0 left-0 h-screen w-screen modal_bg flex items-center justify-center"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackDrop;
