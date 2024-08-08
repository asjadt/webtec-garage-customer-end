import React from "react";
import { useData } from "../../../context/DataContext";
import { motion } from "framer-motion";

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const Services = () => {
  const { services, loading } = useData();
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-1 py-5`}>
      {services?.map((service, index) => (
        <motion.div
          variants={gridItemVariants}
          exit={{ opacity: 0, y: 50 }}
          transition={{ stagger: 0.5 }}
          className={`px-5 py-3 rounded-lg shadow-lg flex flex-col gap-1 cursor-pointer border`}
        >
          <span className={`text-primary text-sm`}>{service?.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default Services;
