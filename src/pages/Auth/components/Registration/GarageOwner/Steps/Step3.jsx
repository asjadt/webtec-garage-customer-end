import { useEffect, useMemo, useState } from "react";
import { useData } from "../../../../../../context/DataContext";
import { isArraysAreEqual } from "../../../../../../utils/isArraysAreEqual";
import CustomLoading from "../../../../../../components/CustomLoading";
import Swal from "sweetalert2";

export default function Step3({
  formData,
  setFormData,
  handlePrevious,
  handleNext,
  errors,
  setErrors,
}) {
  const { makes, loading } = useData();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedMakes, setSelectedMakes] = useState([]);

  // HANDLE ACCORDION CHANGE
  const handleAccordionChange = (event) => {
    if (event?.target?.checked) {
      setSelectedMakes(makes?.map((res) => res.id));
      setFormData({ ...formData, makesIds: makes?.map((res) => res.id) });
    } else {
      setSelectedMakes([]);
      setFormData({ ...formData, makesIds: [] });
    }
    setIsCheckboxChecked(event?.target?.checked);
  };

  // HANDLE MAKE SELECT
  const onSelectMakes = (id) => {
    let makeIDs = selectedMakes;

    if (!formData?.makesIds.includes(id)) {
      setSelectedMakes([...makeIDs, id]);
    } else {
      setSelectedMakes(makeIDs?.filter((res) => res !== id));
      setIsCheckboxChecked(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      makesIds: selectedMakes,
      service: [
        {
          automobile_category_id: 1,
          services: [],
          automobile_makes: makes?.map((make) => {
            if (selectedMakes?.some((mk) => mk === make?.id)) {
              return {
                id: make?.id,
                checked: true,
              };
            } else {
              return {
                id: make?.id,
                checked: false,
              };
            }
          }),
        },
      ],
    });

    setIsCheckboxChecked(
      isArraysAreEqual(
        formData.makesIds,
        makes?.map((res) => res.id)
      )
    );
  }, [makes, selectedMakes]);

  const validateForm = () => {
    if (
      formData?.service[0]?.automobile_makes?.filter((make) => make?.checked)
        ?.length === 0
    ) {
      setErrors("Please select at least one make");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least one make",
      });
      return false;
    } else {
      setErrors("");
      return true;
    }
  };
  return (
    <div className={``}>
      {/* SELECT ALL MAKES */}
      {!loading && (
        <div className={`w-full flex justify-center items-center mb-5`}>
          <div
            className={` border flex items-center gap-2 px-2 py-2 border-primary shadow-md rounded-md`}
          >
            <label
              htmlFor="select_all_make"
              className={`flex items-center gap-x-2 cursor-pointer`}
            >
              <input
                id="select_all_make"
                onChange={handleAccordionChange}
                type="checkbox"
                className={`checkbox checkbox-primary checkbox-sm`}
                checked={isCheckboxChecked}
              />

              <h1>Select All</h1>
            </label>
          </div>
        </div>
      )}

      {/* SELECT MODELS */}
      {!loading ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3`}>
          {/* LIST OF MAKES  */}
          {makes?.map((res, i) => (
            <div key={i}>
              <div
                className={`w-full border flex items-center gap-2 px-2 py-2 border-primary shadow-md rounded-md`}
              >
                <input
                  id={`${res.name}-check-box`}
                  onChange={(e) => onSelectMakes(res.id)}
                  checked={formData?.makesIds?.includes(res.id)}
                  type="checkbox"
                  className={`checkbox checkbox-primary cursor-pointer checkbox-xs`}
                />
                <span>
                  {res.name
                    ? res.name.charAt(0).toUpperCase() + res.name.slice(1)
                    : ""}
                </span>
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
