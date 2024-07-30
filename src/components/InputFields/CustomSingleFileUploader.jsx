import React, { useEffect, useState, useRef } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { formatFileSize } from "../../utils/byeToMDorKB";
import { FiPlus } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { getFullImageLink } from "../../utils/getFullImageLink";
import { FaRegFileLines } from "react-icons/fa6";
import FileViewer from "../FileViewer";
import CustomPopup from "../CustomPopup";

export default function CustomSingleFileUploader({
  accept,
  files,
  setFiles,
  details,
  label = "Attachment",
  isFileUploading = false,
  onRemove = (e) => {
    return e;
  },
  required = false,
  onDrop = (e) => {
    return e;
  },
  index = 0,
  idItemId = "text",
  size = "w-[200px] h-[200px]",
  error = "",
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setDragOver(false);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(e);
    console.log({ fileData: e });
  };

  const onChangeInput = (e) => {
    console.log({ selectedFile: e });
    setFiles(e);
    // Reset input value to allow selecting the same file again
    inputRef.current.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileRemove = (e) => {
    onRemove(e);
    // Reset input value to allow selecting the same file again
    inputRef.current.value = null;
  };

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

  // HANDLE VIEW FILES
  const handleViewFiles = (files) => {
    setPopupOption({
      open: true,
      type: "viewFiles",
      title: "View Files",
      files: files,
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      id: null,
      closeOnDocumentClick: false,
    });
  };

  return (
    <div data-cy={`container_custom_single_file_uploader`}>
      <CustomPopup
        popupClasses={`w-[70vw]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "viewFiles" && (
              <FileViewer
                files={popupOption?.files}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    files: [],
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
          </>
        }
      />
      {label && (
        <label
          data-cy={`label_custom_single_file_uploader`}
          htmlFor={`fl-${idItemId}-${index}`}
          className="label"
        >
          <span
            data-cy={`label_content_custom_single_file_uploader`}
            className={`label-text text-md font-bold`}
          >
            {label}{" "}
            {label && required && (
              <span
                data-cy={`label_required_custom_single_file_uploader`}
                className="text-error font-bold text-md"
              >
                *
              </span>
            )}
          </span>
        </label>
      )}
      <div
        data-cy={`upload_container_custom_single_file_uploader`}
        className={`bg-base-300 border border-primary-content shadow-md ${size} rounded-xl py-4`}
      >
        <div
          data-cy={`upload_sub_container_custom_single_file_uploader`}
          className="px-5 relative"
        >
          {isFileUploading && (
            <div
              data-cy={`uploading_custom_single_file_uploader`}
              className={`absolute bg-opacity-70 top-0 left-[1.25rem] h-full flex gap-2 flex-col justify-center items-center w-[calc(100%-2.5rem)] rounded-xl z-40 bg-primary-content`}
            >
              <span
                data-cy={`loading_custom_single_file_uploader`}
                className={`loading loading-spinner text-primary loading-lg`}
              ></span>

              <h1
                data-cy={`loading_content_custom_single_file_uploader`}
                className={`text-primary `}
              >
                Uploading...
              </h1>
            </div>
          )}
          <div
            data-cy={`drop_custom_single_file_uploader`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${dragOver ? "opacity-70" : "opacity-100"
              } relative flex justify-center px-5 items-center border-2 h-auto border-gray-500 border-dashed  py-5 rounded-xl flex-col`}
          >
            {files?.length === 0 && (
              <label
                data-cy={`drop_label_custom_single_file_uploader`}
                htmlFor={`fl-${idItemId}-${index}`}
                className="absolute h-full w-full top-0 left-0"
              ></label>
            )}
            <input
              ref={inputRef}
              data-cy={`drop_input_custom_single_file_uploader`}
              onChange={onChangeInput}
              multiple={false}
              className="hidden"
              id={`fl-${idItemId}-${index}`}
              type="file"
              accept={accept}
            />

            {files[0] === "" || files[0] === undefined || files[0] === null ? (
              <label
                data-cy={`drop_no_files_custom_single_file_uploader`}
                htmlFor={`fl-${idItemId}-${index}`}
                className={`w-[calc(100%-10px)] h-[120px] flex justify-center items-center flex-col gap-2 cursor-pointer`}
              >
                <IoCloudUploadSharp className="text-3xl text-gray-500 " />
                <span
                  data-cy={`drop_choose_content_custom_single_file_uploader`}
                  className="text-sm md:text-md font-semibold text-center"
                >
                  Choose a file or drag & drop it here
                </span>
                <span
                  data-cy={`drop_details_custom_single_file_uploader`}
                  className="text-xs font-light text-center"
                >
                  {details}
                </span>
                <div
                  data-cy={`drop_browse_file_custom_single_file_uploader`}
                  disabled
                  className="border py-1 px-2 rounded-md"
                >
                  Browse File
                </div>
              </label>
            ) : (
              <div
                data-cy={`image_container_custom_single_file_uploader`}
                className="w-full grid grid-cols-1 h-auto"
              >
                <div
                  data-cy={`image_sub_container_custom_single_file_uploader`}
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div
                    data-cy={`image_file_container_custom_single_file_uploader`}
                    className="relative w-[120px] h-[120px] shadow-md rounded-xl group flex justify-center items-center"
                    key={index}
                  >
                    <div
                      data-cy={`images_custom_single_file_uploader`}
                      onClick={() => handleViewFiles([files[0]])}
                    >
                      {files[0]?.endsWith(".png") ||
                        files[0]?.endsWith(".jpg") ||
                        files[0]?.endsWith(".jpeg") ||
                        files[0]?.endsWith(".JPEG") ||
                        files[0]?.endsWith(".JPG") ? (
                        <img
                          data-cy={`upload_image_container_custom_single_file_uploader`}
                          src={getFullImageLink(files[0])}
                          alt={files[0].name}
                          className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover "
                        />
                      ) : (
                        <div
                          data-cy={`image_lines_custom_single_file_uploader`}
                          className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover  flex justify-center items-center"
                        >
                          <FaRegFileLines className={`text-4xl text-primary`} />
                        </div>
                      )}
                    </div>

                    <button
                      data-cy={`cross_button_custom_single_file_uploader`}
                      className="absolute -top-2 hover:scale-125 duration-200 -right-2 flex justify-center items-center bg-error w-7 h-7 rounded-full overflow-hidden shadow-md"
                      onClick={() => handleFileRemove(files[0])}
                    >
                      <RxCross2 className="text-base-300" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-cy={`error_custom_single_file_uploader`}
          className="label h-7"
        >
          <span
            data-cy={`error_content_single_file_uploader`}
            className="label-text-alt text-error"
          >
            {error}
          </span>
        </label>
      )}
    </div>
  );
}
