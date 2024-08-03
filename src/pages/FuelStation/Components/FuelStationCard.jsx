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
      onClick={() => navigate(`/view-garage/${encryptID(id)}/details`)}
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

        {/* ADDRESS  */}
        <div>
          <address
            className={`text-sm flex items-center gap-1`}
            data-auto={`address${id}-garageCard`}
          >
            <CiLocationOn />
            {address_line_1}
          </address>
        </div>
        {/* OPEN OR CLOSED */}
        <p>
          {currentTime?.isBetween(openingMoment, closingMoment) ? (
            <span className={`text-success`}>Open</span>
          ) : (
            <span className={`text-primary`}>Closed</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
