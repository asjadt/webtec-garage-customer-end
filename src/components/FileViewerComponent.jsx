import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React from "react";

const FileViewerComponent = ({ fileUrls }) => {
  return (
    <div>
      <DocViewer documents={fileUrls} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default FileViewerComponent;
