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
import { CiLocationOn } from "react-icons/ci";
import { TiLocationOutline } from "react-icons/ti";

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function FuelStationCard({ fuel }) {
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
    opening_time,
    closing_time,
  } = fuel;
  // Get current time
  const currentTime = moment();

  // Parse opening and closing times with today's date
  const openingMoment = moment(opening_time, "HH:mm:ss");
  const closingMoment = moment(closing_time, "HH:mm:ss");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={gridItemVariants}
      exit={{ opacity: 0, y: 50 }}
      transition={{ stagger: 0.5 }}
      data-auto={`container${id}-fuelStationCard`}
      className={`md:flex relative items-center overflow-hidden md:space-x-2 space-y-3 md:space-y-0 border w-full rounded-md p-3 bg-base-300 shadow-lg`}
    >
      {/* MAIN SECTION */}
      <div
        data-auto={`mainSection${id}-fuelStationCard`}
        className={`flex flex-col justify-between h-full gap-2 w-full`}
      >
        <div className={`space-y-2`}>
          {/* NAME */}
          <h1
            onClick={() => {
              navigate(`/view-fuel-station-details/${encryptID(id)}`);
            }}
            data-auto={`name${id}-fuelStationCard`}
            className="text-xl inline hover:text-primary duration-150 cursor-pointer md:text-xl font-bold text-[#242E30]"
          >
            {name}
          </h1>
          {/* TIMING */}
          <div
            data-auto={`timings${id}-fuelStationCard`}
            className={`flex text-sm items-center text-[#017436] font-bold`}
          >
            <FaRegClock className={`mx-1`} />
            <p data-auto={`startEnd${id}-fuelStationCard`}>
              {moment(opening_time, "HH:mm").format("hh:mm A")} -{" "}
              {moment(closing_time, "HH:mm").format("hh:mm A")}
            </p>
          </div>

          {/* ADDRESS */}
          <div>
            <address
              className={`text-sm flex items-start justify-start gap-1`}
              data-auto={`address${id}-fuelStationCard`}
            >
              <TiLocationOutline className={`text-primary`} size={20} />
              {address_line_1}
            </address>
          </div>

          {/* OPEN OR CLOSED */}
          <p className={`ml-1`}>
            {currentTime?.isBetween(openingMoment, closingMoment) ? (
              <span
                data-auto={`statusOpen${id}-fuelStationCard`}
                className={`px-3 flex w-fit gap-x-1 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-green-700`}
              >
                Open
              </span>
            ) : (
              <span
                data-auto={`statusClosed${id}-fuelStationCard`}
                className={`px-3 flex w-fit gap-x-1 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-primary`}
              >
                Closed
              </span>
            )}
          </p>
        </div>

        {/* ACTION */}
        <button
          data-auto={`viewDetailsButton${id}-fuelStationCard`}
          onClick={() =>
            navigate(`/view-fuel-station-details/${encryptID(id)}`)
          }
          className={`btn btn-primary btn-sm w-full md:w-32`}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
