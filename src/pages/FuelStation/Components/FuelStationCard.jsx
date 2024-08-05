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
  console.log({ fuel });
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
      data-auto={`container${id}-garageCard`}
      className={`md:flex relative items-center overflow-hidden md:space-x-2 space-y-3 md:space-y-0 border w-full rounded-md p-3 bg-base-300 shadow-lg`}
    >
      {/* LOGO IMAGE */}
      <img
        data-auto={`logo${id}-garageCard`}
        className={`absolute rounded-[5px] shadow-md top-4 right-4 md:top-4 md:right-4 w-12 h-auto`}
        src={
          logo
            ? logo
            : "https://i.postimg.cc/d13x1Cd6/ksnip-20240730-175628.png"
        }
        alt="Garage Logo"
      />
      {/* <div
        className={`w-full md:w-[250px] h-[150px] md:h-full bg-black object-cover rounded-md relative`}
      > */}
      {/* COVER IMAGE */}
      {/* <img
          data-auto={`coverImage${id}-garageCard`}
          className={`w-full md:w-[250px] h-[150px] md:h-full object-cover rounded-md`}
          src={
            background_image
              ? background_image
              : "https://garagewire.co.uk/wp-content/uploads/2017/09/bigstock-auto-service-repair-maintena-1505041221-760x500.jpg"
          }
          alt="Garage Cover Pic"
        /> */}

      {/* </div> */}

      {/* MAIN SECTION */}
      <div
        data-auto={`mainSection${id}-garageCard`}
        className={`flex-grow space-y-5  md:px-5 text-sm lg:text-base`}
      >
        <div className={`space-y-2`}>
          {/* NAME  */}
          <h1
            onClick={() => {
              navigate(`/view-fuel-station-details/${encryptID(id)}`);
            }}
            data-auto={`name${id}-garageCard`}
            className="text-xl inline hover:text-primary duration-150 cursor-pointer md:text-xl font-bold text-[#242E30]"
          >
            {name}
          </h1>
          {/* TIMING */}
          <div
            data-auto={`timings${id}-garageCard`}
            className={`flex text-sm items-center text-[#017436] font-bold`}
          >
            <FaRegClock className={`mr-1`} />
            <p data-auto={`startEnd${id}-garageCard`}>
              {/* {timing?.start_at} - {timing?.end_at} */}
              {moment(opening_time, "HH:mm").format("hh:mm A")} -{" "}
              {moment(closing_time, "HH:mm").format("hh:mm A")}
            </p>
          </div>
          {/* ADDRESS  */}
          <div>
            <address
              className={`text-sm flex items-center gap-1`}
              data-auto={`address${id}-garageCard`}
            >
              <TiLocationOutline className={`text-primary`} size={16} />

              {address_line_1}
            </address>
          </div>
          {/* OPEN OR CLOSED */}
          <p>
            {currentTime?.isBetween(openingMoment, closingMoment) ? (
              <span
                className={`px-3 flex w-fit gap-x-1 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-green-700`}
              >
                Open
              </span>
            ) : (
              <span
                className={`px-3 flex w-fit gap-x-1 items-center justify-start py-[0.1rem] text-base-300 text-xs md:text-sm rounded-full bg-primary`}
              >
                Closed
              </span>
            )}
          </p>
        </div>
        {/* button */}
        <button
          onClick={() =>
            navigate(`/view-fuel-station-details/${encryptID(id)}`)
          }
          className={`btn btn-primary btn-sm w-full md:w-auto`}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
