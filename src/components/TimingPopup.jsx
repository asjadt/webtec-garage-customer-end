import { useEffect, useState } from "react";
import { LiaUserClockSolid } from "react-icons/lia";
import CustomPopup from "./CustomPopup";
import TimingViewer from "./TimingViewer";

export default function TimingPopup({ data, title }) {
  const [isOpen, setIsOpen] = useState(false);
  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  useEffect(() => {
    if (isOpen) {
      setPopupOption({
        open: true,
        title: title,
        onClose: () => {
          setPopupOption({ ...popupOption, open: false });
        },
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false,
      });
    } else {
      setPopupOption({
        open: false,
        type: "",
        id: null,
        onClose: () => {
          setPopupOption({ ...popupOption, open: false });
        },
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false,
      });
    }
  }, [isOpen]);

  return (
    <div className={`w-full`}>
      <CustomPopup
        popupClasses={`w-full sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        setIsOpen={setIsOpen}
        Component={
          <TimingViewer
            handleClosePopup={(e) => {
              setPopupOption({
                open: false,
                type: "",
                id: null,
                onClose: () => {
                  setPopupOption({ ...popupOption, open: false });
                  setIsOpen(false);
                },
                overlayStyle: { background: "red" },
                closeOnDocumentClick: false,
              });
            }}
            data={data}
          />
        }
      />
      <div className={``}>
        <button onClick={() => setIsOpen(true)}>
          <LiaUserClockSolid className={`text-2xl text-primary`} />
        </button>
      </div>
    </div>
  );
}
