import { useContext } from "react";
import Headings from "../../../components/Headings/Headings";
import TextLabelComponent from "../../../components/label/TextLabelComponent";
import { useData } from "../../../context/DataContext";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContextV2";
import { SlArrowDown } from "react-icons/sl";

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
  const { authPopupOptions, setAuthPopupOptions } = useContext(AuthContext);

  const images = [
    "/assets/Services/aircon.png",
    "/assets/Services/alloywheel.png",
    "/assets/Services/bodyshop.png",
    "/assets/Services/brake.png",
    "/assets/Services/gear.png",
    "/assets/Services/dent.png",
    "/assets/Services/diagnosis.png",
    "/assets/Services/battery.png",
  ];
  return (
    <div className={`w-full max-w-screen-xl`}>
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
        <div className={`flex flex-col gap-10`}>
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}
          >
            {services?.slice(0, 8)?.map((service, index) => (
              <motion.div
                key={index}
                variants={gridItemVariants}
                exit={{ opacity: 0, y: 50 }}
                transition={{ stagger: 0.5 }}
                className={`w-full bg-red-50 h-[250px] rounded-xl shadow-lg overflow-hidden`}
              >
                <div
                  className={`w-full h-[200px] flex justify-center items-center`}
                >
                  <img
                    className={`w-[150px] sm:w-[100px] h-[150px] sm:h-[100px] object-cover`}
                    src={images[index]}
                    alt=""
                  />
                </div>
                <h3 className={`text-center py-2 font-medium`}>
                  {service?.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <div className={`w-full flex justify-center items-center mb-5`}>
            <button
              onClick={() =>
                setAuthPopupOptions({
                  ...authPopupOptions,
                  open: true,
                  type: "services",
                  title: "All Available Services",
                })
              }
              className={`btn btn-primary btn-outline w-[300px] flex items-center`}
            >
              <SlArrowDown className={`animate-pulse`} /> <span>See More</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
