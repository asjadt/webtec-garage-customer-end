/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { getFullImageLink } from "../../utils/getFullImageLink";
import { FaRegFileLines } from "react-icons/fa6";
import FileViewer from "../FileViewer";
import CustomPopup from "../CustomPopup";

export default function CustomFileUploader({
  accept,
  files = [],
  onFileSelect = (event) => event,
  details,
  isFileUploading = false,
  onRemove = (event) => event,
  onDrop = (event) => event,
}) {
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setDragOver(false);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    onDrop(droppedFiles);
  };

  const onChangeInput = (e) => {
    onFileSelect(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileRemove = (index) => {
    onRemove(index);
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
      closeOnDocumentClick: false,
    });
  };

  const isImageFile = (file) => {
    if (typeof file === "string") {
      return (
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".JPEG") ||
        file.endsWith(".JPG")
      );
    } else if (file instanceof File) {
      return file.type.startsWith("image/");
    }
    return false;
  };

  return (
    <div data-cy={`container_custom_file_uploader`}>
      <CustomPopup
        popupClasses={`w-full sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`}
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

      <p
        data-cy={`attachment_custom_file_uploader`}
        className="text-sm font-semibold mb-2"
      >
        Attachment
      </p>
      <div
        data-cy={`upload_file_container_custom_file_uploader`}
        className="bg-base-300 border border-primary-content shadow-md rounded-xl pb-4"
      >
        <div
          data-cy={`upload_file_header_container_custom_file_uploader`}
          className="px-5 py-2 flex items-star md:items-center justify-start gap-2"
        >
          <div
            data-cy={`upload_file_empty_custom_file_uploader`}
            className="border rounded-full border-gray-500 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center"
          >
            <ImFilesEmpty className="text-sm text-gray-500" />
          </div>
          <div data-cy={`upload_file_header_custom_file_uploader`}>
            <h3
              data-cy={`upload_file_content_custom_file_uploader`}
              className="text-sm md:text-md font-medium "
            >
              Upload files
            </h3>
            <h5
              data-cy={`upload_file_sub_content_custom_file_uploader`}
              className="text-xs md:text-md font-light "
            >
              Select and upload the files of your choice
            </h5>
          </div>
        </div>
        <hr data-cy={`upload_file_hr_custom_file_uploader`} className="mb-5" />

        <div
          data-cy={`is_file_uploading_custom_file_uploader`}
          className="px-5 relative"
        >
          {isFileUploading && (
            <div
              data-cy={`is_file_uploading_loading_container_custom_file_uploader`}
              className={`absolute bg-opacity-70 top-0 left-[1.25rem]  h-full flex gap-2 flex-col justify-center items-center w-[calc(100%-2.5rem)] rounded-xl z-40 bg-primary-content`}
            >
              <span
                data-cy={`is_file_uploading_loading_content_custom_file_uploader`}
                className={`loading loading-spinner text-primary loading-lg`}
              ></span>

              <h1
                data-cy={`is_file_uploading_uploading..._custom_file_uploader`}
                className={`text-primary `}
              >
                Uploading...
              </h1>
            </div>
          )}
          <div
            data-cy={`drop_container_custom_file_uploader`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${
              dragOver ? "opacity-70" : "opacity-100"
            } relative flex justify-center px-5 items-center border-2 h-auto border-gray-500 border-dashed  py-10 rounded-xl flex-col`}
          >
            {files?.length === 0 && (
              <label
                data-cy={`drop_container_label_custom_file_uploader`}
                htmlFor="fl"
                className="absolute h-full w-full top-0 left-0"
              ></label>
            )}
            <input
              data-cy={`drop_container_input_custom_file_uploader`}
              onChange={onChangeInput}
              multiple
              id="fl"
              className="hidden"
              type="file"
              accept={accept}
            />

            {files.length === 0 ? (
              <>
                <IoCloudUploadSharp className="text-3xl text-gray-500 " />
                <span
                  data-cy={`drop_container_choose_file_content_custom_file_uploader`}
                  className="text-sm md:text-md font-semibold text-center"
                >
                  Choose a file or drag & drop it here
                </span>
                <span
                  data-cy={`drop_container_file_details_custom_file_uploader`}
                  className="text-xs font-light text-center"
                >
                  {details}
                </span>
                <label
                  data-cy={`drop_container_browse_label_custom_file_uploader`}
                  htmlFor="fl"
                  className="border mt-5 opacity-50 px-2 md:px-10 py-1 md:py-2 rounded-md border-gray-500 text-gray-500"
                >
                  Browse File
                </label>
              </>
            ) : (
              <div
                data-cy={`files_container_custom_file_uploader`}
                className="w-full flex flex-wrap gap-4 h-auto"
              >
                {files?.map((file, index) => (
                  <div
                    data-cy={`files_sub_container_custom_file_uploader`}
                    key={index}
                    className="flex flex-col items-center"
                  >
                    <div
                      data-cy={`files_image_container_custom_file_uploader`}
                      className="relative w-[200px] sm:w-[100px] h-[200px] sm:h-[100px] shadow-md rounded-xl  group flex justify-center items-center"
                    >
                      {file !== "" && (
                        <div
                          data-cy={`files_container_image_variation_custom_file_uploader`}
                          onClick={() => handleViewFiles([file])}
                        >
                          {isImageFile(file) ? (
                            <img
                              data-cy={`files_container_image_custom_file_uploader`}
                              src={
                                typeof file === "string"
                                  ? getFullImageLink(file)
                                  : URL.createObjectURL(file)
                              }
                              alt={file.name}
                              className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover group-hover:opacity-20"
                            />
                          ) : (
                            <div
                              data-cy={`files_container_no_image_custom_file_uploader`}
                              className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover group-hover:opacity-20 flex justify-center items-center"
                            >
                              <FaRegFileLines
                                className={`text-4xl text-primary`}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <button
                        data-cy={`files_container_cross_button_custom_file_uploader`}
                        className="absolute -top-2 hover:scale-125 duration-200 -right-2 flex justify-center items-center bg-error w-7 h-7 rounded-full overflow-hidden shadow-md"
                        onClick={() => handleFileRemove(file)}
                      >
                        <RxCross2 className="text-base-300" />
                      </button>
                    </div>
                  </div>
                ))}
                <label
                  data-cy={`add_more_label_custom_file_uploader`}
                  data-tip="Add more"
                  htmlFor="fl"
                  className="flex flex-col items-center tooltip tooltip-right tooltip-primary"
                >
                  <div
                    data-cy={`add_more_icon_custom_file_uploader`}
                    className="w-[200px] sm:w-[100px] h-[200px] sm:h-[100px] bg-base-300  shadow-md rounded-xl border-2 border-dashed   group flex justify-center items-center  hover:border-primary cursor-pointer text-gray-500 hover:text-primary"
                  >
                    <FiPlus className="text-5xl md:text-3xl" />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
