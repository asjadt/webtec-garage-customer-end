import axios from "axios";
import { Cross } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

const UPLOAD_STATUS_UPLOADING = "uploading";
const UPLOAD_STATUS_COMPLETE = "complete";

const FileUploadPreviewDefault = ({ name }) => name;

const FileUploadPreviewImage = ({ name, url }) => (
  <img
    className="w-full h-[200px] object-contain"
    src={url}
    alt={name}
    title={name}
  />
);

const FileUploadPreviewVideo = ({ name, url }) => (
  <video className="" src={url} title={name} controls />
);

const previewers = {
  image: FileUploadPreviewImage,
  video: FileUploadPreviewVideo,
};

const getPreviewType = (mime, name) => {
  const mimeParts = mime.toLowerCase().split("/");
  let type = mimeParts[0];

  if (type === "application") {
    type = mimeParts[1];
  }

  if (type.startsWith("x-") || type.includes("vnd")) {
    type = name.split(".").pop();
  }

  return type;
};

export const FileUpload = ({ inputData, setInputData, dataAuto }) => {
  const fileID = useRef(0);
  const [files, setFiles] = useState([]);

  const updateFile = (id, data) => {
    setFiles((prevFiles) =>
      prevFiles?.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  };

  const uploadFile = async (id, file) => {
    if (file.type.includes("image")) {
      const formData = new FormData();
      formData.append("images[]", file);

      try {
        const response = await axios.post(
          "v1.0/client/pre-bookings-image-multiple",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const totalSize = progressEvent.total;
              const uploadedSize = progressEvent.loaded;
              const progress = Math.floor((uploadedSize / totalSize) * 100);
              updateFile(id, {
                progress,
              });
            },
          }
        );

        // Assuming the server returns some data after a successful upload
        const responseData = response.data;
        console.log(responseData?.images[0]);
        setInputData({
          ...inputData,
          images: [...inputData?.images, responseData?.images[0]],
        });
        // Update the file status to UPLOAD_STATUS_COMPLETE
        updateFile(id, {
          progress: 100,
          status: UPLOAD_STATUS_COMPLETE,
        });
      } catch (error) {
        alert(`An error occurred while uploading ${file.name}`);
        handleRemoveFile(id);
      }
    } else {
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await axios.post(
          "v1.0/client/pre-bookings-video",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const totalSize = progressEvent.total;
              const uploadedSize = progressEvent.loaded;
              const progress = Math.floor((uploadedSize / totalSize) * 100);
              updateFile(id, {
                progress,
              });
            },
          }
        );

        // Assuming the server returns some data after a successful upload
        const responseData = response.data;
        setInputData({
          ...inputData,
          videos: [...inputData?.videos, responseData?.full_location],
        });

        // Update the file status to UPLOAD_STATUS_COMPLETE
        updateFile(id, {
          progress: 100,
          status: UPLOAD_STATUS_COMPLETE,
        });
      } catch (error) {
        alert(`An error occurred while uploading ${file.name}`);
        handleRemoveFile(id);
      }
    }
  };

  // HANDLE FILE UPLOAD
  const handleFile = (e) => {
    const newFiles = [...e.target.files]?.map((file) => {
      const id = ++fileID.current;
      const newFile = {
        id,
        type: getPreviewType(file.type, file.name),
        mime: file.type,
        name: file.name,
        size: file.size,
        url: window.URL.createObjectURL(file),
        progress: 0,
        status: UPLOAD_STATUS_UPLOADING,
        file,
      };

      uploadFile(id, e.target.files[0]);

      return newFile;
    });

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // HANDLE REMOVE FILE
  const handleRemoveFile = (id) => {
    const index = files?.findIndex((f) => f?.id === id);
    window.URL.revokeObjectURL(files[index]?.url);
    setFiles((prevFiles) => prevFiles?.filter((file) => file?.id !== id));
  };

  useEffect(() => {
    return () => {
      files?.forEach((file) => window.URL.revokeObjectURL(file?.url));
    };
  }, [files]);

  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`z-10 w-full px-2 py-2 flex flex-col shadow-lg rounded-lg border`}
    >
      <FileUploadButton onChange={handleFile} dataAuto={dataAuto} />
      <FileUploadPreview
        files={files}
        fileTypePreviews={previewers}
        onRemoveFile={handleRemoveFile}
        dataAuto={dataAuto}
      />
    </div>
  );
};

const FileUploadButton = ({ dataAuto, ...props }) => {
  return (
    <div
      data-auto={`container-${dataAuto}-fileUploadButton`}
      className="w-full"
    >
      <label
        data-auto={`label-${dataAuto}-fileUploadButton`}
        htmlFor="file_uploader"
        className="bg-primary-content text-primary font-medium w-full rounded-md cursor-pointer py-4  text-center  block "
      >
        Upload Files
      </label>
      <input
        data-auto={`input-${dataAuto}-fileUploadButton`}
        id="file_uploader"
        className="hidden"
        name="file"
        type="file"
        {...props}
        multiple
      />
    </div>
  );
};
const FileUploadPreview = ({
  files = [],
  fileTypePreviews = {},
  onRemoveFile,
  dataAuto,
}) => {
  return (
    <div data-auto={`container-${dataAuto}-uploadFiles`}>
      {files?.length ? (
        <div data-auto={`sub-container-${dataAuto}-uploadFiles`} className="">
          {files?.map((file, i) => {
            const Previewer =
              fileTypePreviews[file.type] || FileUploadPreviewDefault;

            return (
              <div
                data-auto={`container${i + 1}-${dataAuto}-uploadFiles`}
                key={file.id}
                className={`z-10 hover:border-primary duration-150 border border-base-300 group mt-5 rounded-md overflow-hidden relative `}
              >
                <button
                  data-auto={`close${i + 1}-${dataAuto}-uploadFiles`}
                  onClick={() => onRemoveFile(file.id)}
                  className={`z-10 group-hover:flex bg-primary rounded-[5px] w-10 h-10 hidden duration-150 justify-center items-center absolute right-2 top-2`}
                >
                  <FiX className={`text-base-300`} size={20} />
                </button>

                {file.progress !== 100 && (
                  <div
                    data-auto={`progress-container${
                      i + 1
                    }-${dataAuto}-uploadFiles`}
                    className={`z-10 flex items-center gap-3 py-5 px-5`}
                  >
                    <span>{file.progress}%</span>
                    <progress
                      className="progress progress-primary w-full"
                      value={file.progress}
                      max="100"
                    ></progress>
                  </div>
                )}

                <Previewer {...file} />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
