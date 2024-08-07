import { useQuery } from "@tanstack/react-query";
import { getSingleGarage } from "../../Apis/garage";
import { useParams } from "react-router-dom";
import { decryptID } from "../../utils/encryptAndDecryptID";
import CustomLoading from "../../components/CustomLoading";
import { useEffect, useState } from "react";
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
import GoBackButton from "../../components/GoBackButton";
import { getFullImageLink } from "../../utils/getFullImageLink";
import CustomTab from "../../components/CustomTab";
import {
  singleGaragePageTabs,
  singleGaragePageTabsWithoutPackage,
} from "../../constant/singleGaragePageTabs";
import GarageBooking from "./GarageBooking";
import GarageBookingWIthPackage from "./GarageBookingWIthPackage";
import CreateBookingForm from "./components/BookingForms/CreateBookingForm";
import CreateBookingWithPackageForm from "./components/BookingForms/CreateBookingWithPackageForm";
import { Map, Marker } from "@vis.gl/react-google-maps";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function SingleGarage() {
  const { encID, tabName } = useParams();
  const id = decryptID(encID);
  const tabs = ["booking", "details", "packages"];

  const [activeTab, setActiveTab] = useState("details");

  const { isLoading, data } = useQuery({
    queryKey: ["singleGarage", id],
    queryFn: (params) => getSingleGarage(params.queryKey[1]),
  });

  console.log(data?.garage?.garage_times);

  useEffect(() => {
    if (tabs?.includes(tabName)) {
      setActiveTab(tabName);
    } else {
      setActiveTab("details");
    }
  }, [tabName]);

  if (isLoading) {
    return <CustomLoading />;
  } else {
    return (
      <div>
        <div className={`relative mb-44`}>
          <div className={`absolute top-4 right-4`}>
            <GoBackButton />
          </div>
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
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
            </motion.div>
            {/* NAME  */}
            <div className={`overflow-hidden `}>
              <motion.h1
                initial={{ translateY: 50 }}
                animate={{ translateY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`text-center text-3xl font-bold`}
              >
                {data?.garage?.name}
              </motion.h1>
            </div>
            {/* ADDRESS  */}
            <div className={`overflow-hidden `}>
              <motion.div
                initial={{ translateY: 50 }}
                animate={{ translateY: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className={`flex gap-x-1 justify-center items-center`}
              >
                <TiLocationOutline className={`text-primary`} size={24} />
                <address className={`text-center`}>
                  {data?.garage?.address_line_1}
                </address>
              </motion.div>
            </div>
          </div>
        </div>

        {/* TABS  */}
        <div className={`w-full flex justify-center items-center`}>
          <CustomTab
            gridCol={`${
              data?.garage?.garage_packages?.length > 0
                ? "grid-cols-3"
                : "grid-cols-2"
            }`}
            tabs={
              data?.garage?.garage_packages?.length > 0
                ? singleGaragePageTabs
                : singleGaragePageTabsWithoutPackage
            }
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* MAIN SECTION  */}
        <div className={`min-h-[300px]`}>
          {/* BOOKING  */}
          {activeTab === "booking" && <CreateBookingForm garageData={data} />}

          {/* GARAGE DETAILS  */}
          {activeTab === "details" && (
            <>
              {/* DESCRIPTION  */}
              {data?.garage?.about ? (
                <div className={`p-5 `}>
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent text={"About Garage"} />
                  </div>
                  <p>{data?.garage?.about}</p>
                </div>
              ) : (
                ""
              )}

              {/* ADDITIONAL INFORMATION  */}
              {data?.garage?.additional_information ? (
                <div className={`p-5 `}>
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent text={"Additional Information"} />
                  </div>
                  <p>{data?.garage?.additional_information}</p>
                </div>
              ) : (
                ""
              )}

              {/* CONTACT  */}
              <div className={`p-5`}>
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

              {/* OPENING TIME  */}
              {/* <div className={`p-5`}>
                <div className={`flex justify-center items-center mb-5`}>
                  <TextTitleComponent text={"Opening time"} />
                </div>
              </div> */}

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
                  {data?.garage?.services?.map((service, index) => (
                    <GarageViewServiceCard key={index} service={service} />
                  ))}
                </motion.div>
              </div>

              {/* GALLERY IMAGE   */}
              {data?.garage?.garage_galleries?.length > 0 ? (
                <div className={`p-5`}>
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent text={"Gallery"} />
                  </div>
                  <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
                  >
                    {data?.garage?.garage_galleries?.map((image, index) => (
                      <motion.div
                        key={index}
                        variants={gridItemVariants}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ stagger: 0.5 }}
                        className={`group w-full h-[300px] rounded-lg overflow-hidden`}
                      >
                        <img
                          src={getFullImageLink(image?.image)}
                          className={`group-hover:scale-125 duration-200 object-cover w-full h-full`}
                          alt={data?.garage?.name}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                ""
              )}

              {/* MAP  */}
              <div className={`p-5`}>
                <div className={`flex justify-center items-center mb-5`}>
                  <TextTitleComponent text={"Location"} />
                </div>
                <div className={`relative`}>
                  <div
                    className={`w-full flex justify-center items-center absolute top-48`}
                  >
                    <Map
                      defaultCenter={{
                        lat: parseFloat(data?.garage?.lat),
                        lng: parseFloat(data?.garage?.long),
                      }}
                      defaultZoom={8}
                      gestureHandling={"greedy"}
                      disableDefaultUI={true}
                      disableDoubleClickZoom={true}
                      scaleControl={true}
                      className="w-full h-[calc(100vh-322px)] absolute outline-none border-none active:border-none"
                      defaultTilt={10}
                    >
                      <Marker
                        position={{
                          lat: parseFloat(data?.garage?.lat),
                          lng: parseFloat(data?.garage?.long),
                        }}
                      />
                    </Map>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PACKAGE  */}
          {activeTab === "packages" && (
            <CreateBookingWithPackageForm garageData={data} />
          )}
        </div>
      </div>
    );
  }
}
