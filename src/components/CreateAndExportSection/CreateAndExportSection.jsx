import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";

const CreateAndExportSection = ({
  exportBtn,
  createPermission,
  createHandler,
  pdfHandler,
  csvHandler,
  blueBtnTitle = "Create",
}) => {
  return (
    <div className="flex flex-col justify-end md:flex-row gap-5 w-full">
      <div className="flex justify-end md:justify-start gap-5">
        {exportBtn && (
          // EXPORT OPTIONS
          <div className="flex items-center ">
            {/* PDF EXPORT   */}
            <button
              data-tip="Export as PDF"
              onClick={() => pdfHandler("pdf")}
              className={`text-primary tooltip tooltip-left rounded-md btn-sm `}
            >
              <FaRegFilePdf className="text-2xl" />
            </button>
            {/* CSV EXPORT  */}
            <button
              data-tip="Export as CSV"
              onClick={() => csvHandler("csv")}
              className={`text-primary tooltip tooltip-left rounded-md btn-sm`}
            >
              <BsFiletypeCsv className="text-2xl" />
            </button>
          </div>
        )}

        {createPermission && (
          <button onClick={createHandler} className="btn btn-primary w-auto">
            <span className="block">{blueBtnTitle}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateAndExportSection;
