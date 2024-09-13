import { useQuery } from "@tanstack/react-query";
import { Map, Marker } from "@vis.gl/react-google-maps";
import moment from "moment";
import React from "react";
import { TiLocationOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { getSingleFuelServices } from "../../../Apis/fuelStation";
import CustomLoading from "../../../components/CustomLoading";
import TextTitleComponent from "../../../components/label/TextTitleComponent";
import { decryptID } from "../../../utils/encryptAndDecryptID";

const FuelStationDetails = () => {
  const { encID } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["singleFuelStation", encID],
    queryFn: (params) => getSingleFuelServices(decryptID(encID)),
  });

  if (isPending) {
    return <CustomLoading />;
  }

  return (
    <div data-auto={`container-fuelStationDetails`} className={`space-y-10`}>
      <div
        data-auto={`container-header-fuelStationDetails`}
        className={`mx-6 mt-6 space-y-10`}
      >
        <div
          data-auto={`container-name-and-address-fuelStationDetails`}
          className={`space-y-5`}
        >
          <h1
            data-auto={`header-name-fuelStationDetails`}
            className={`text-3xl font-black`}
          >
            {data?.name}
          </h1>
          {/* ADDRESS */}
          <div data-auto={`container-address-fuelStationDetails`}>
            <address
              data-auto={`address-garageCard-fuelStationDetails`}
              className={`text-sm flex items-center gap-1`}
            >
              <TiLocationOutline
                data-auto={`icon-location-fuelStationDetails`}
                className={`text-primary`}
                size={16}
              />
              {data?.address_line_1}
            </address>
          </div>
        </div>

        <div
          data-auto={`container-services-and-times-fuelStationDetails`}
          className={`grid grid-cols-1 md:grid-cols-2 gap-5`}
        >
          {/* SERVICES */}
          {!!data?.options?.length > 0 && (
            <div
              data-auto={`container-services-fuelStationDetails`}
              className={`space-y-5`}
            >
              <TextTitleComponent
                dataAuto={`header-fuelServices-fuelStationDetails`}
                text={"Fuel Services"}
              />
              <div
                data-auto={`grid-services-fuelStationDetails`}
                className={`grid grid-cols-2 sm:grid-cols-2 gap-5`}
              >
                {data?.options?.map((option, i) => (
                  <div
                    data-auto={`service-${i}-fuelStationDetails`}
                    key={i}
                    className={`flex items-start justify-start gap-2 shadow-lg p-2 border pt-[0.7rem] rounded-md`}
                  >
                    <div
                      data-auto={`icon-service-${i}-fuelStationDetails`}
                      className={`font-bold text-lg text-primary w-10 h-10 flex justify-center items-center rounded-md bg-primary-content`}
                    >
                      <i className={option.option.icon} />
                    </div>
                    <div>
                      <h3
                        data-auto={`name-service-${i}-fuelStationDetails`}
                        className={`font-medium text-primary text-sm sm:text-base`}
                      >
                        {option?.option?.name}
                      </h3>
                      <p
                        data-auto={`status-service-${i}-fuelStationDetails`}
                        className={`text-[12px] sm:text-[14px] text-gray-400 font-nunito`}
                      >
                        {option?.option?.is_active
                          ? "Available"
                          : "Unavailable"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* OPENING TIME */}
          <div data-auto={`container-openingTime-fuelStationDetails`}>
            <div
              data-auto={`header-openingTime-fuelStationDetails`}
              className={`flex justify-center items-center mb-5`}
            >
              <TextTitleComponent
                dataAuto={`header-openingTime-fuelStationDetails`}
                text={"Opening time"}
              />
            </div>
            <div
              data-auto={`table-openingTime-fuelStationDetails`}
              className={`text-sm max-w-screen-xl mx-auto`}
            >
              <div
                data-auto={`header-timeTable-fuelStationDetails`}
                className={`bg-primary text-base-300 w-full py-3 rounded-md px-5 flex font-semibold`}
              >
                <span
                  data-auto={`header-day-fuelStationDetails`}
                  className={`w-[40%] block`}
                >
                  Day
                </span>
                <span
                  data-auto={`header-startTime-fuelStationDetails`}
                  className={`w-[40%] block`}
                >
                  Start at
                </span>
                <span
                  data-auto={`header-endTime-fuelStationDetails`}
                  className={`w-[20%] block`}
                >
                  Until
                </span>
              </div>

              {data?.fuel_station_times?.map((item, index) => (
                <div
                  data-auto={`row-time-${index}-fuelStationDetails`}
                  key={index}
                  className={`w-full py-3 px-5 flex border-b rounded-md my-1 ${
                    item?.is_closed
                      ? "bg-red-100 text-red-500 font-bold"
                      : "bg-base-100"
                  }`}
                >
                  {!item?.is_closed ? (
                    <>
                      <span
                        data-auto={`day-time-${index}-fuelStationDetails`}
                        className={`w-[40%] block`}
                      >
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Monday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wednesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span
                        data-auto={`start-time-${index}-fuelStationDetails`}
                        className={`w-[40%] block`}
                      >
                        {moment(item?.opening_time, "HH:mm").format("hh:mmA")}
                      </span>
                      <span
                        data-auto={`end-time-${index}-fuelStationDetails`}
                        className={`w-[20%] block`}
                      >
                        {moment(item?.closing_time, "HH:mm").format("hh:mmA")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        data-auto={`day-closed-${index}-fuelStationDetails`}
                        className={`w-[60%] block`}
                      >
                        {item?.day === 0
                          ? "Sunday"
                          : item?.day === 1
                          ? "Monday"
                          : item?.day === 2
                          ? "Tuesday"
                          : item?.day === 3
                          ? "Wednesday"
                          : item?.day === 4
                          ? "Thursday"
                          : item?.day === 5
                          ? "Friday"
                          : item?.day === 6
                          ? "Saturday"
                          : ""}
                      </span>
                      <span
                        data-auto={`closed-status-${index}-fuelStationDetails`}
                        className={`w-[40%] block`}
                      >
                        Close
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* MAP */}
      <div data-auto={`container-map-fuelStationDetails`} className={`p-5`}>
        <div
          data-auto={`header-map-fuelStationDetails`}
          className={`flex justify-center items-center mb-5`}
        >
          <TextTitleComponent
            dataAuto={`header-map-fuelStationDetails`}
            text={"Location"}
          />
        </div>
        <Map
          data-auto={`map-fuelStationDetails`}
          defaultCenter={{
            lat: parseFloat(data?.lat),
            lng: parseFloat(data?.long),
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
            data-auto={`marker-map-fuelStationDetails`}
            position={{
              lat: parseFloat(data?.lat),
              lng: parseFloat(data?.long),
            }}
          />
        </Map>
      </div>
    </div>
  );
};

export default FuelStationDetails;
