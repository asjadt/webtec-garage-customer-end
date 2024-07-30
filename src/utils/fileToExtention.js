export function fileToExtension(fileUrl) {
  // Extract the file name from the URL
  var fileName = fileUrl.split("/").pop();

  // Check if the file name contains a dot (.)
  if (fileName.includes(".")) {
    // Extract the extension using the part of the string after the last dot
    var extension = fileName.split(".").pop();
    return extension;
  } else {
    // If no dot is found, return an empty string or handle the case accordingly
    return "";
  }
}
