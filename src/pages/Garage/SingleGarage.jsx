import { useQuery } from "@tanstack/react-query";
import { getSingleGarage } from "../../Apis/garage";
import { useParams } from "react-router-dom";
import { decryptID } from "../../utils/encryptAndDecryptID";
import CustomLoading from "../../components/CustomLoading";
import { useEffect } from "react";
import TextLabelComponent from "../../components/label/TextLabelComponent";
import GarageViewServiceCard from "../Home/components/GarageViewServiceCard";
import TextTitleComponent from "../../components/label/TextTitleComponent";
import { motion } from "framer-motion";
import {
  MdEmail,
  MdMarkEmailRead,
  MdOutlineMarkEmailRead,
  MdOutlineMarkunread,
  MdPhoneInTalk,
} from "react-icons/md";
import { TiLocationOutline } from "react-icons/ti";
import { HiOutlineMailOpen } from "react-icons/hi";
import ContactCard from "./components/ContactCard";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function SingleGarage() {
  const { encID } = useParams();
  const id = decryptID(encID);
  const { isLoading, data } = useQuery({
    queryKey: ["singleGarage", id],
    queryFn: (params) => getSingleGarage(params.queryKey[1]),
  });

  if (isLoading) {
    return <CustomLoading />;
  } else {
    return (
      <div>
        <div className={`relative`}>
          {/* COVER  */}
          <div className={`w-full h-[400px] overflow-hidden`}>
            <img
              src={
                data?.garage?.background_image ||
                "https://garagewire.co.uk/wp-content/uploads/2017/09/bigstock-auto-service-repair-maintena-1505041221-760x500.jpg"
              }
              className={`object-cover w-full h-full`}
              alt={data?.garage?.name}
            />
          </div>

          {/* PROFILE  */}
          <div
            className={`absolute -bottom-36 w-full left-1/2 -translate-x-1/2  gap-y-2 flex flex-col items-center `}
          >
            {/* PROFILE PIC  */}
            <div
              className={`w-[120px] md:w-[180px] h-[120px] md:h-[180px] rounded-full border-4 md:border-8 border-base-300 shadow-lg overflow-hidden`}
            >
              <img
                src={
                  data?.garage?.logo ||
                  "https://i.postimg.cc/d13x1Cd6/ksnip-20240730-175628.png"
                }
                className={`object-cover w-full h-full`}
                alt={data?.garage?.name}
              />
            </div>
            {/* NAME  */}
            <h1 className={`text-center text-3xl font-bold`}>
              {data?.garage?.name}
              {/* Test Garage Limited */}
            </h1>
            {/* ADDRESS  */}
            <div className={`flex gap-x-1 justify-center items-center`}>
              <TiLocationOutline className={`text-primary`} size={24} />
              <address className={`text-center`}>
                {data?.garage?.address_line_1}
                {/* Narisha Bazar, Dohar, Dhaka - 1332 */}
              </address>
            </div>
          </div>
        </div>

        {/* DESCRIPTION  */}
        {data?.garage?.about ? (
          <div className={`p-5  mt-40 `}>
            <div className={`flex justify-center items-center mb-5`}>
              <TextTitleComponent text={"About Garage"} />
            </div>
            <p>{data?.garage?.about}</p>
          </div>
        ) : (
          ""
        )}

        {/* CONTACT  */}
        <div className={`p-5  mt-40 `}>
          <div className={`flex justify-center items-center mb-5`}>
            <TextTitleComponent text={"Contact"} />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5`}>
            {/* EMAIL  */}
            <ContactCard
              Icon={HiOutlineMailOpen}
              title={"Email Address"}
              value={data?.garage?.email}
            />

            {/* PHONE  */}
            <ContactCard
              Icon={MdPhoneInTalk}
              title={"Phone Number"}
              value={data?.garage?.phone || data?.garage?.owner?.phone}
            />

            {/* ADDRESS  */}
            <ContactCard
              Icon={TiLocationOutline}
              title={"Garage Address"}
              value={data?.garage?.address_line_1}
            />
          </div>
        </div>

        {/* SERVICE  */}
        <div className={`p-5`}>
          <div className={`flex justify-center items-center`}>
            <TextTitleComponent text={"Services"} />
          </div>

          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-5`}
          >
            {data?.garage?.garage_services?.map((service, index) => (
              <GarageViewServiceCard key={index} service={service} />
            ))}
          </motion.div>
        </div>

        {/* MAP  */}
        <div className={`p-5`}>
          <div className={`flex justify-center items-center mb-5`}>
            <TextTitleComponent text={"Location"} />
          </div>
          <div className={`w-full h-[400px]`}>
            <iframe
              style={{
                outline: "none",
              }}
              title="Garage location"
              src={`https://maps.google.com/maps?q=${data?.garage?.lat},${data?.garage?.long}&hl=es&z=14&output=embed`}
              width="100%"
              height="100%"
              frameBorder={0}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    );
  }
}
