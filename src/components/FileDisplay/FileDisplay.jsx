export default function FileDisplay({ file }) {
  if (
    file.split(".")[file.split(".").length - 1] === "png" ||
    file.split(".")[file.split(".").length - 1] === "jpg" ||
    file.split(".")[file.split(".").length - 1] === "jpeg"
  ) {
    return <img src={file.url} alt={file.name} />;
  } else if (file.split(".")[file.split(".").length - 1] === "pdf") {
    return <iframe src={file.url} />;
  } else if (file.split(".")[file.split(".").length - 1] === "docx") {
    return <iframe src={file.url} />;
  }
  return <div>File type not supported</div>;
}
