import { WifiIcon } from "lucide-react";
import { FaRegClock, FaStar } from "react-icons/fa";
import { GiTvRemote } from "react-icons/gi";
import { MdSettingsRemote } from "react-icons/md";
import { motion, stagger } from "framer-motion";
import { listCardVariant } from "../../../varients/GarageList";
import { useNavigate } from "react-router-dom";
import { encryptID } from "../../../utils/encryptAndDecryptID";
import moment from "moment";
import { useState } from "react";

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function GarageCard({ garage }) {
  const {
    id,
    background_image,
    logo,
    name,
    address_line_1,
    average_rating,
    total_rating_count,
    wifi_available,
    is_mobile_garage,
    garage_times,
    is_package_available,
  } = garage;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={gridItemVariants}
      exit={{ opacity: 0, y: 50 }}
      transition={{ stagger: 0.5 }}
      data-auto={`container${id}-garageCard`}
      className={`md:flex relative items-center overflow-hidden md:space-x-2 space-y-3 md:space-y-0 border w-full rounded-md p-3 bg-base-300 shadow-lg`}
    >
      <div
        className={`w-full md:w-[250px] h-[150px] md:h-full bg-black object-cover rounded-md relative`}
      >
        {/* COVER IMAGE */}
        <img
          data-auto={`coverImage${id}-garageCard`}
          className={`w-full md:w-[250px] h-[150px] md:h-full object-cover rounded-md`}
          src={
            background_image
              ? background_image
              : "https://garagewire.co.uk/wp-content/uploads/2017/09/bigstock-auto-service-repair-maintena-1505041221-760x500.jpg"
          }
          alt="Garage Cover Pic"
        />

        {/* LOGO IMAGE */}
        <img
          data-auto={`logo${id}-garageCard`}
          className={`absolute rounded-[5px] shadow-md bottom-4 left-4 md:bottom-4 md:right-4 w-12 h-auto`}
          src={
            logo
              ? logo
              : "https://i.postimg.cc/d13x1Cd6/ksnip-20240730-175628.png"
          }
          alt="Garage Logo"
        />
      </div>

      {/* MAIN SECTION */}
      <div
        data-auto={`mainSection${id}-garageCard`}
        className={`flex-grow space-y-1  md:px-5 text-sm lg:text-base`}
      >
        {/* NAME  */}
        <h1
          onClick={() => {
            navigate(`/view-garage/${encryptID(id)}/details`);
          }}
          data-auto={`name${id}-garageCard`}
          className="text-xl inline hover:text-primary duration-150 cursor-pointer md:text-xl font-bold text-[#242E30]"
        >
          {name}
        </h1>
        {/* RATING  */}
        <div
          data-auto={`ratings${id}-garageCard`}
          className={`flex items-center text-sm`}
        >
          <FaStar className={`text-[#FF8000] mr-1`} />
          <p data-auto={`fullRating${id}-garageCard`}>
            <span data-auto={`avgRating${id}-garageCard`} className="font-bold">
              {average_rating}
            </span>
            /5 ({total_rating_count})
          </p>
        </div>
        {/* TIMING AND ADDRESS  */}
        <div
          data-auto={`timings${id}-garageCard`}
          className={`flex text-sm items-center text-[#017436] font-bold`}
        >
          <FaRegClock className={`mr-1`} />
          <p data-auto={`startEnd${id}-garageCard`}>
            {/* {timing?.start_at} - {timing?.end_at} */}
            {moment(garage_times[0]?.opening_time, "HH:mm").format(
              "hh:mm A"
            )} -{" "}
            {moment(garage_times[0]?.closing_time, "HH:mm").format("hh:mm A")}
          </p>
        </div>
        {/* ADDRESS  */}
        <div>
          <address className={`text-sm`} data-auto={`address${id}-garageCard`}>
            {address_line_1}
          </address>
        </div>
        {/* OTHER FACILITY  */}
        <div className={`flex gap-x-1 md:gap-x-3 items-center justify-start`}>
          {wifi_available ? (
            <span
              data-auto={`wifi${id}-garageCard`}
              className={`px-3 flex  gap-x-1 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-green-700`}
            >
              <WifiIcon size={14} /> Wifi
            </span>
          ) : (
            ""
          )}
          {is_mobile_garage ? (
            <span
              data-auto={`remote${id}-garageCard`}
              className={`px-3 flex gap-x-21 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-green-700`}
            >
              <MdSettingsRemote size={14} /> Remote
            </span>
          ) : (
            ""
          )}
        </div>

        {/* ACTION  */}
        <div className={`relative`}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-[5px] pt-2 right-0`}
          >
            <button
              onClick={() => navigate(`/view-garage/${encryptID(id)}/details`)}
              className={`btn btn-primary btn-xs md:btn-sm w-full`}
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/booking/${encryptID(id)}/booking`)}
              className={`btn btn-primary btn-xs md:btn-sm w-full`}
            >
              Book Now
            </button>
            {!!is_package_available && (
              <button
                onClick={() =>
                  navigate(`/booking-with-package/${encryptID(id)}/packages`)
                }
                className={`btn btn-primary btn-xs md:btn-sm w-full`}
              >
                View Offers
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
