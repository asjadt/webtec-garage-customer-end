import { motion } from "framer-motion";
const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
export default function GarageViewServiceCard({ service }) {
  return (
    <motion.div
      variants={gridItemVariants}
      exit={{ opacity: 0, y: 50 }}
      transition={{ stagger: 0.5 }}
      className={`px-5 py-3 rounded-lg shadow-lg flex flex-col gap-1 cursor-pointer border`}
    >
      <span className={`text-primary text-sm`}>{service?.service?.name}</span>
      <span className={`text-gray-400 text-xs font-nunito`}>
        {service?.is_active ? "Available" : "Unavailable"}
      </span>
    </motion.div>
  );
}
