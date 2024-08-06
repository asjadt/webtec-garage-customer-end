import { useEffect, useState } from "react";
import { useData } from "../../../../../../context/DataContext";
import { isArraysAreEqual } from "../../../../../../utils/isArraysAreEqual";
import CustomLoading from "../../../../../../components/CustomLoading";
import Swal from "sweetalert2";

export default function Step4({
  formData,
  setFormData,
  handlePrevious,
  handleNext,
}) {
  const { loading, services, subServices } = useData();

  console.log({ subServices });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  // HANDLE SELECT ALL
  const handleSelectAll = (event) => {
    if (event?.target?.checked) {
      setSelectedServices(services?.map((res) => res.id));
      setSelectedSubServices(subServices?.map((res) => res.id));
    } else {
      setSelectedServices([]);
      setSelectedSubServices([]);
    }
    setIsCheckboxChecked(event?.target?.checked);
  };

  // HANDLE SERVICE SELECT
  const onSelectService = (id, e) => {
    if (e.target.checked) {
      setSelectedServices([...selectedServices, id]);
      setSelectedSubServices([
        ...new Set([
          ...selectedSubServices,
          ...subServices
            ?.filter((res) => res?.service_id === id)
            ?.map((res) => res?.id),
        ]),
      ]);
    } else {
      setSelectedServices(selectedServices?.filter((res) => res !== id));
      setSelectedSubServices(
        selectedSubServices.filter((subServiceId) => {
          return !subServices.some(
            (res) => res?.service_id === id && res?.id === subServiceId
          );
        })
      );
      setIsCheckboxChecked(false);
    }
  };
  // HANDLE SUB SERVICE SELECT
  const onSelectSubService = (id) => {
    if (!formData?.subServicesIds.includes(id)) {
      setSelectedSubServices([...selectedSubServices, id]);
    } else {
      setSelectedSubServices(selectedSubServices?.filter((res) => res !== id));
      setIsCheckboxChecked(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      subServicesIds: selectedSubServices,
      serviceIds: selectedServices,
      service: [
        {
          ...formData?.service[0],
          services: services?.map((ss) => {
            if (selectedServices?.some((ss_id) => ss_id === ss?.id)) {
              return {
                id: ss?.id,
                checked: true,
                sub_services: subServices
                  ?.filter((sub) => ss?.id === sub?.service_id)
                  ?.map((oData) => {
                    if (
                      selectedSubServices?.some(
                        (subs_id) => subs_id === oData?.id
                      )
                    ) {
                      return {
                        id: oData?.id,
                        checked: true,
                      };
                    } else {
                      return {
                        id: oData?.id,
                        checked: false,
                      };
                    }
                  }),
              };
            } else {
              return {
                id: ss?.id,
                checked: false,
                sub_services: subServices
                  ?.filter((sub) => ss?.id === sub?.service_id)
                  ?.map((oData) => {
                    if (
                      selectedSubServices?.some(
                        (subs_id) => subs_id === oData?.id
                      )
                    ) {
                      return {
                        id: oData?.id,
                        checked: true,
                      };
                    } else {
                      return {
                        id: oData?.id,
                        checked: false,
                      };
                    }
                  }),
              };
            }
          }),
        },
      ],
    });

    setIsCheckboxChecked(
      isArraysAreEqual(
        selectedServices,
        services?.map((res) => res.id)
      ) &&
        isArraysAreEqual(
          selectedSubServices,
          services?.flatMap((res) =>
            subServices
              ?.filter((sub) => sub?.service_id === res?.id)
              ?.map((sub) => sub?.id)
          )
        )
    );
  }, [services, subServices, selectedSubServices, selectedServices]);

  const [isValidationErrorMessage, setIsValidationErrorMessage] = useState("");

  const validateForm = () => {
    if (
      formData?.service[0]?.services?.filter((ss) => ss?.checked)?.length === 0
    ) {
      setIsValidationErrorMessage("Please select at least one make");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one make",
      });
      return false;
    } else {
      setIsValidationErrorMessage("");
      return true;
    }
  };

  return (
    <div className={``}>
      {/* SELECT ALL subServices */}
      {!loading && (
        <div className={`w-full flex justify-center items-center mb-5`}>
          <div
            className={`w-full md:w-40 border flex items-center gap-2 px-2 py-2 border-primary shadow-md rounded-md`}
          >
            <label
              htmlFor="select_all_make"
              className={` flex items-center gap-x-2 cursor-pointer`}
            >
              <input
                id="select_all_services"
                onChange={handleSelectAll}
                type="checkbox"
                className={`checkbox checkbox-primary checkbox-sm`}
                checked={isCheckboxChecked}
              />
              <h1>Select All</h1>
            </label>
          </div>
        </div>
      )}

      {/* LIST OF SERVICES  */}
      {!loading ? (
        <div className={`grid grid-cols-1 gap-y-2 gap-x-5`}>
          {/* LIST OF SERVICES  */}
          {services?.map((res, i) => (
            <div key={i} className="flex flex-col">
              {/* TITLE  */}
              <div
                className={`w-full border flex items-center gap-2 px-2 py-2 border-primary shadow-md rounded-md`}
              >
                <input
                  id={`${res.name}-check-box`}
                  onChange={(e) => onSelectService(res.id, e)}
                  checked={selectedServices.includes(res.id)}
                  type="checkbox"
                  className={`checkbox checkbox-primary cursor-pointer checkbox-xs`}
                />
                <span>
                  {res.name
                    ? res.name.charAt(0).toUpperCase() + res.name.slice(1)
                    : ""}
                </span>
              </div>

              {/* CONTENT  */}
              <div
                className={`${
                  selectedServices.includes(res.id) ? "h-auto" : "h-0"
                } overflow-hidden`}
              >
                {subServices
                  ?.filter((ss) => res?.id === ss?.service_id)
                  ?.map((sub, j) => (
                    <div key={j}>
                      <div
                        className={`w-full border flex items-center gap-2 py-2 pr-2 pl-5`}
                      >
                        <input
                          id={`${sub.name}-check-box`}
                          onChange={(e) => onSelectSubService(sub.id)}
                          checked={selectedSubServices.includes(sub.id)}
                          type="checkbox"
                          className={`checkbox checkbox-primary cursor-pointer checkbox-xs`}
                        />
                        <span>
                          {sub.name
                            ? sub.name.charAt(0).toUpperCase() +
                              sub.name.slice(1)
                            : ""}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CustomLoading h="h-[300px]" />
      )}

      <div
        className={`flex flex-col-reverse md:flex-row gap-y-2 mt-5 w-full items-center justify-between`}
      >
        {/* PREVIOUS BUTTON  */}
        <button
          onClick={handlePrevious}
          className={`btn btn-primary btn-outline w-full md:w-52`}
        >
          Previous
        </button>

        {/* NEXT BUTTON  */}
        <button
          onClick={() => {
            if (validateForm()) {
              handleNext();
            }
          }}
          className={`btn btn-primary w-full md:w-52`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
