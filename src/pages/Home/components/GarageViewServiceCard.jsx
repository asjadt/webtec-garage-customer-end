import { motion } from "framer-motion";
const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
export default function GarageViewServiceCard({ service, dataAuto }) {
  return (
    <motion.div
      data-auto={`container-${dataAuto}`}
      variants={gridItemVariants}
      exit={{ opacity: 0, y: 50 }}
      transition={{ stagger: 0.5 }}
      className={`px-5 py-3 rounded-lg shadow-lg flex flex-col gap-1 cursor-pointer border`}
    >
      <span
        data-auto={`service-${dataAuto}`}
        className={`text-primary text-sm`}
      >
        {service?.name}
      </span>
      <span
        data-auto={`status-${dataAuto}`}
        className={`text-gray-400 text-xs font-nunito`}
      >
        {service?.is_active ? "Available" : "Unavailable"}
      </span>
    </motion.div>
  );
}
