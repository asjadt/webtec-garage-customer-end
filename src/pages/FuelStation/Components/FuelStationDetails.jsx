import React from "react";
import TextTitleComponent from "../../../components/label/TextTitleComponent";
import { useData } from "../../../context/DataContext";
import {
  getSingleFuelServices,
  searchKeywordFuelStation,
} from "../../../Apis/fuelStation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { decryptID } from "../../../utils/encryptAndDecryptID";
import { TiLocationOutline } from "react-icons/ti";
import CustomLoading from "../../../components/CustomLoading";

const FuelStationDetails = () => {
  const { encID } = useParams();
  console.log({ encID });
  const { isPending, data } = useQuery({
    queryKey: ["singleFuelStation", encID],
    queryFn: (params) => getSingleFuelServices(decryptID(encID)),
  });

  console.log({ data });
  if (isPending) {
    return <CustomLoading />;
  }
  return (
    <div className={`space-y-10 `}>
      <div className={`mx-6 mt-6 space-y-10`}>
        <div className={`space-y-5`}>
          <h1 className={`text-3xl font-black`}>{data?.name}</h1>
          {/* ADDRESS  */}
          <div>
            <address
              className={`text-sm flex items-center gap-1`}
              data-auto={`address-garageCard`}
            >
              <TiLocationOutline className={`text-primary`} size={16} />

              {data?.address_line_1}
            </address>
          </div>
        </div>

        {!!data?.options?.length > 0 && (
          <div className={`space-y-5`}>
            <TextTitleComponent text={"Fuel Services"} />
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5`}
            >
              {data?.options?.map((option, i) => (
                <div key={i} className={`flex items-start justify-start gap-2`}>
                  <div
                    className={`font-bold text-lg text-primary w-10 h-10 flex justify-center items-center rounded-md bg-primary-content`}
                  >
                    <i className={option.option.icon} />
                  </div>
                  {/* <option.option.icon /> */}
                  <div>
                    <h3
                      className={`font-medium text-primary text-sm sm:text-base `}
                    >
                      {option?.option?.name}
                    </h3>
                    <p
                      className={`text-[12px] sm:text-[14px] text-gray-400 font-nunito`}
                    >
                      {option?.option?.is_active ? "Available" : "Unavailable"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
            src={`https://maps.google.com/maps?q=${data?.lat},${data?.long}&hl=es&z=14&output=embed`}
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
};

export default FuelStationDetails;
