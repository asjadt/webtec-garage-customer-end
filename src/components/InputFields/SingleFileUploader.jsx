export default function SingleFileUploader({ fileName }) {
  const handleUploadButtonClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(event) => console.log(event.target.files[0])} // Handle selected file here
      />
      <button onClick={handleUploadButtonClick}>Upload {fileName}</button>
    </div>
  );
}
