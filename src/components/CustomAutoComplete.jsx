import { StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef } from "react";

const CustomAutoComplete = ({
  id,
  placeholder,
  className,
  name,
  value,
  style,
  setFormData,
  formData,
  defaultValue,
  dataTestId = "",
  setPlaceAutoComplete,
  isMeasureDistance = false,
  onChange,
  disable,
  visibleBorder = false,
  dataAuto,
  size = "",
}) => {
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef?.current?.getPlaces();

    const { lat, lng } = place?.geometry?.location;
    if (isMeasureDistance) {
      setPlaceAutoComplete(place);
      // Extract latitude and longitude values
      setFormData((prev) => ({
        ...prev,
        address_line_1: place?.formatted_address
          ? place?.formatted_address
          : "",
        address: place?.formatted_address ? place?.formatted_address : "",
        city: `${
          place?.address_components?.find((i) => i?.types?.includes("locality"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("locality")
              )?.long_name
            : ""
        }`,
        country_code: `${
          place.address_components.find((i) => i?.types.includes("country"))
            ?.short_name
            ? place.address_components.find((i) => i?.types.includes("country"))
                ?.short_name
            : ""
        }`,
        country: `${
          place?.address_components?.find((i) => i?.types?.includes("country"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("country")
              )?.long_name
            : ""
        }`,
        postcode: `${
          place?.address_components?.find((i) =>
            i?.types?.includes("postal_code")
          )?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("postal_code")
              )?.long_name
            : ""
        }`,
        lat: `${lat()}`,
        long: `${lng()}`,
        start_lat: `${lat()}`,
        start_long: `${lng()}`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        address: place?.formatted_address ? place?.formatted_address : "",
        address_line_1: place?.formatted_address
          ? place?.formatted_address
          : "",
        city: `${
          place?.address_components?.find((i) => i?.types.includes("locality"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types.includes("locality")
              )?.long_name
            : ""
        }`,
        country_code: `${
          place.address_components.find((i) => i?.types.includes("country"))
            ?.short_name
            ? place.address_components.find((i) => i?.types.includes("country"))
                ?.short_name
            : ""
        }`,
        country: `${
          place?.address_components?.find((i) => i?.types?.includes("country"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("country")
              )?.long_name
            : ""
        }`,
        postcode: `${
          place?.address_components?.find((i) =>
            i?.types?.includes("postal_code")
          )?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("postal_code")
              )?.long_name
            : ""
        }`,
        lat: `${lat()}`,
        long: `${lng()}`,
        start_lat: `${lat()}`,
        start_long: `${lng()}`,
      }));
    }
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <input
        data-auto={dataAuto}
        disabled={disable}
        id={id}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        value={value}
        data-testId={dataTestId}
        style={style}
        onChange={onChange}
        className={`${className} ${size} ${
          disable &&
          `px-1 ${
            visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
        } focus:outline-primary bg-base-300 `}
        defaultValue={defaultValue}
      />
    </StandaloneSearchBox>
  );
};

export default CustomAutoComplete;
