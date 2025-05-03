import React from "react";
import { motion } from "framer-motion";
import "./generating.css";

const GeneratingModal = ({ title }) => {
  return (
    <div className="generating-modal-backdrop">
      <motion.div
        className="generating-modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="loader-circle" />
        <p className="generating-text">{title} is being generated...</p>
      </motion.div>
    </div>
  );
};

export default GeneratingModal;
