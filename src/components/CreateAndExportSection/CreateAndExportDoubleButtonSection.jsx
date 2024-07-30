import React from "react";
import { BiPlus } from "react-icons/bi";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";

const CreateAndExportDoubleButtonSection = ({
  createPermission1,
  createPermission2,
  createHandler1,
  createHandler2,
  pdfHandler,
  csvHandler,
  blueBtnTitle1,
  blueBtnTitle2,
}) => {
  return (
    <div className="flex justify-end items-end gap-5 w-full">
      <div className="flex flex-col sm:flex-row md:flex-col screen864:flex-row justify-end gap-5 w-full">
        {/* EXPORT OPTIONS */}
        <div className="flex justify-end items-center">
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

        <div className={`flex flex-col justify-end sm:flex-row gap-5 `}>
          {createPermission1 && (
            <button
              onClick={createHandler1}
              className="btn btn-primary w-full sm:w-auto"
            >
              <span className="block">{blueBtnTitle1}</span>
            </button>
          )}
          {createPermission2 && (
            <button
              onClick={createHandler2}
              className="btn btn-primary w-full sm:w-auto"
            >
              <span className="block">{blueBtnTitle2}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAndExportDoubleButtonSection;
