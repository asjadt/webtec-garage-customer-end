import { useQuery } from "@tanstack/react-query";
import { getSingleGarage } from "../../Apis/garage";
import { useNavigate, useParams } from "react-router-dom";
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
import moment from "moment";
import { getAllAutoApplyCoupon } from "../../Apis/homepageapi";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function SingleGarage() {
  const navigate = useNavigate();
  const { encID, tabName } = useParams();
  const id = decryptID(encID);
  const tabs = ["booking", "details", "packages"];

  const [activeTab, setActiveTab] = useState("details");

  const { isLoading, data } = useQuery({
    queryKey: ["singleGarage", id],
    queryFn: (params) => getSingleGarage(params.queryKey[1]),
  });

  const { isLoading: isLoadingCoupon, data: coupons } = useQuery({
    queryKey: ["singleGarageCoupon", id],
    queryFn: (params) => getAllAutoApplyCoupon(params.queryKey[1]),
  });

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
      <div data-auto={`container-singleGarage`}>
        {/* HEADING  */}
        <div className={`relative mb-44`}>
          <div
            data-auto={`goBack-singleGarage`}
            className={`absolute top-4 right-4`}
          >
            <GoBackButton />
          </div>
          {/* COVER  */}
          <div
            data-auto={`cover-singleGarage`}
            className={`w-full h-[400px] overflow-hidden`}
          >
            <img
              data-auto={`coverImage-singleGarage`}
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
            data-auto={`profile-container-singleGarage`}
            className={`absolute -bottom-36 w-full left-1/2 -translate-x-1/2  gap-y-2 flex flex-col items-center `}
          >
            {/* PROFILE PIC  */}
            <motion.div
              data-auto={`profile-singleGarage`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className={`w-[120px] bg-base-300 md:w-[180px] h-[120px] md:h-[180px] rounded-full border-4 md:border-8 border-base-300 shadow-lg overflow-hidden`}
            >
              <img
                data-auto={`profileImage-singleGarage`}
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
                data-auto={`name-singleGarage`}
                initial={{ translateY: 50 }}
                animate={{ translateY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`text-center text-3xl font-bold`}
              >
                {data?.garage?.name}
              </motion.h1>
            </div>
            {/* ADDRESS  */}
            <div
              data-auto={`address-container-singleGarage`}
              className={`overflow-hidden `}
            >
              <motion.div
                initial={{ translateY: 50 }}
                animate={{ translateY: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className={`flex gap-x-1 justify-center items-center`}
              >
                <TiLocationOutline className={`text-primary`} size={24} />
                <address
                  data-auto={`address-singleGarage`}
                  className={`text-center`}
                >
                  {data?.garage?.address_line_1}
                </address>
              </motion.div>
            </div>
          </div>
        </div>

        {/* TABS  */}
        <div
          data-auto={`tabs-container-singleGarage`}
          className={`w-full flex justify-center items-center`}
        >
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
            dataAuto={"singleGarage"}
          />
        </div>

        {/* MAIN SECTION  */}
        <div
          data-auto={`main-container-singleGarage`}
          className={`min-h-[300px]`}
        >
          {/* BOOKING  */}
          {activeTab === "booking" && (
            <CreateBookingForm
              garageData={data}
              isLoadingCoupon={isLoadingCoupon}
              coupons={coupons}
              dataAuto={"singleGarage"}
            />
          )}

          {/* GARAGE DETAILS  */}
          {activeTab === "details" && (
            <>
              {/* DESCRIPTION  */}
              {data?.garage?.about ? (
                <div className={`p-5 `}>
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent
                      text={"About Garage"}
                      dataAuto={"singleGarage-about"}
                    />
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
                    <TextTitleComponent
                      text={"Additional Information"}
                      dataAuto={"singleGarage-additional"}
                    />
                  </div>
                  <p>{data?.garage?.additional_information}</p>
                </div>
              ) : (
                ""
              )}

              <div className={`grid grid-cols-1 md:grid-cols-3`}>
                {/* CONTACT  */}
                <div
                  data-auto={`contact-container-singleGarage`}
                  className={`p-5`}
                >
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent
                      text={"Contact"}
                      dataAuto={"singleGarage-contact"}
                    />
                  </div>
                  <div className={`grid grid-cols-1  gap-5`}>
                    {/* EMAIL  */}
                    <ContactCard
                      Icon={HiOutlineMailOpen}
                      title={"Email Address"}
                      value={data?.garage?.email}
                      dataAuto={"singleGarage-email"}
                    />

                    {/* PHONE  */}
                    <ContactCard
                      Icon={MdPhoneInTalk}
                      title={"Phone Number"}
                      value={data?.garage?.phone || data?.garage?.owner?.phone}
                      dataAuto={"singleGarage-phone"}
                    />

                    {/* ADDRESS  */}
                    <ContactCard
                      Icon={TiLocationOutline}
                      title={"Garage Address"}
                      value={data?.garage?.address_line_1}
                      dataAuto={"singleGarage-address"}
                    />
                  </div>
                </div>

                {/* OPENING TIME  */}
                <div
                  data-auto={`opening-time-container-singleGarage`}
                  className={`p-5 md:col-span-2`}
                >
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent
                      text={"Opening time"}
                      dataAuto={"singleGarage-opening"}
                    />
                  </div>
                  <div
                    data-auto={"timing-container-singleGarage"}
                    className={`text-sm max-w-screen-xl mx-auto`}
                  >
                    <div
                      className={`bg-primary text-base-300 rounded-md w-full py-3 px-5 flex font-semibold`}
                    >
                      <span className={`w-[40%] block`}>Day</span>
                      <span className={`w-[40%] block`}>Start at</span>
                      <span className={`w-[20%] block`}>Until</span>
                    </div>

                    {data?.garage?.garage_times?.map((item, index) => (
                      <div
                        key={index}
                        className={` w-full py-3 px-5 flex border-b rounded-md my-1 ${
                          item?.is_closed
                            ? "bg-red-100 text-red-500 font-bold"
                            : "bg-base-100"
                        }`}
                      >
                        {!item?.is_closed ? (
                          <>
                            <span className={`w-[40%] block`}>
                              {item?.day === 0
                                ? "Sunday"
                                : item?.day === 1
                                ? "Moneday"
                                : item?.day === 2
                                ? "Tuesday"
                                : item?.day === 3
                                ? "Wuesday"
                                : item?.day === 4
                                ? "Thursday"
                                : item?.day === 5
                                ? "Friday"
                                : item?.day === 6
                                ? "Saturday"
                                : ""}
                            </span>
                            <span className={`w-[40%] block`}>
                              {moment(item?.opening_time, "HH:mm").format(
                                "hh:mmA"
                              )}
                            </span>
                            <span className={`w-[20%] block`}>
                              {moment(item?.closing_time, "HH:mm").format(
                                "hh:mmA"
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={`w-[60%] block `}>
                              {item?.day === 0
                                ? "Sunday"
                                : item?.day === 1
                                ? "Moneday"
                                : item?.day === 2
                                ? "Tuesday"
                                : item?.day === 3
                                ? "Wuesday"
                                : item?.day === 4
                                ? "Thursday"
                                : item?.day === 5
                                ? "Friday"
                                : item?.day === 6
                                ? "Saturday"
                                : ""}
                            </span>
                            <span className={`w-[40%] block`}>Close</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SERVICE  */}
              <div className={`p-5`}>
                <div className={`flex justify-center items-center`}>
                  <TextTitleComponent
                    text={"Services"}
                    dataAuto={"singleGarage-service"}
                  />
                </div>

                <motion.div
                  data-auto={`service-container-singleGarage`}
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className={`grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-5`}
                >
                  {data?.garage?.services?.map((service, index) => (
                    <GarageViewServiceCard
                      key={index}
                      service={service}
                      dataAuto={`singleGarage-serviceCard${index + 1}`}
                    />
                  ))}
                </motion.div>
              </div>

              {/* GALLERY IMAGE   */}
              {data?.garage?.garage_galleries?.length > 0 ? (
                <div className={`p-5`}>
                  <div className={`flex justify-center items-center mb-5`}>
                    <TextTitleComponent
                      text={"Gallery"}
                      dataAuto={"singleGarage-gallery"}
                    />
                  </div>
                  <motion.div
                    data-auto={`gallery-container-singleGarage`}
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5`}
                  >
                    {data?.garage?.garage_galleries?.map((image, index) => (
                      <motion.div
                        data-auto={`gallery-image-container${
                          index + 1
                        }-singleGarage`}
                        key={index}
                        variants={gridItemVariants}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ stagger: 0.5 }}
                        className={`group w-full h-[300px] rounded-lg overflow-hidden`}
                      >
                        <img
                          data-auto={`gallery-image${index + 1}-singleGarage`}
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
              <div data-auto={`map-container-singleGarage`} className={`p-5`}>
                <div className={`flex justify-center items-center mb-5`}>
                  <TextTitleComponent
                    text={"Location"}
                    dataAuto={"singleGarage-location"}
                  />
                </div>
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
                  className="w-[calc(100vw-40px)] h-[400px] outline-none border-none active:border-none"
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
            </>
          )}

          {/* PACKAGE  */}
          {activeTab === "packages" && (
            <CreateBookingWithPackageForm
              garageData={data}
              isLoadingCoupon={isLoadingCoupon}
              coupons={coupons}
            />
          )}
        </div>
      </div>
    );
  }
}
