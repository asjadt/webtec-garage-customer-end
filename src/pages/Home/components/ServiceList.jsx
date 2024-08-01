import Headings from "../../../components/Headings/Headings";
import TextLabelComponent from "../../../components/label/TextLabelComponent";
import { useData } from "../../../context/DataContext";
import { motion } from "framer-motion";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceList() {
  const { services, loading } = useData();
  return (
    <div className={`py-2 px-5 sm:py-5 md:px-20 lg:px-32 mt-72`}>
      <div className={`flex justify-center items-center mb-5`}>
        <TextLabelComponent text={"Services"} />
      </div>
      <Headings level={1} className={`text-3xl text-center mb-10`}>
        Our Latest Services
      </Headings>
      {/* GRID  */}
      {loading ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}
        >
          {["w-[80%]", "w-[40%]", "w-[70%]", "w-[50%]"]?.map((width, index) => (
            <div
              key={index}
              className={`w-full h-[250px] bg-base-300 rounded-xl shadow-lg overflow-hidden`}
            >
              <div className={`w-full h-[200px] bg-slate-200 animate-pulse`} />
              <div className={`flex justify-center items-center`}>
                <div
                  className={`text-center my-2 font-medium ${width} h-3 rounded-full bg-slate-200 animate-pulse`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}
        >
          {services?.map((service, index) => (
            <motion.div
              key={index}
              variants={gridItemVariants}
              exit={{ opacity: 0, y: 50 }}
              transition={{ stagger: 0.5 }}
              className={`w-full h-[250px] rounded-xl shadow-lg overflow-hidden`}
            >
              <img
                className={`w-full h-[200px] object-cover`}
                src="https://media.istockphoto.com/id/1347150429/photo/professional-mechanic-working-on-the-engine-of-the-car-in-the-garage.jpg?s=612x612&w=0&k=20&c=5zlDGgLNNaWsp_jq_L1AsGT85wrzpdl3kVH-75S-zTU="
                alt=""
              />
              <h3 className={`text-center py-2 font-medium`}>
                {service?.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}