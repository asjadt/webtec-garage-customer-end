import React, { useState } from "react";
import ReactTags from "react-tag-input";

const TagInput = () => {
  const [tags, setTags] = useState([]);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        placeholder="Type and press Enter to add tags"
        classNames={{
          tagInput: "border border-gray-300 p-2 mr-2",
          tag: "bg-blue-500 text-white p-2 m-1 rounded",
          remove: "text-white ml-2 cursor-pointer",
        }}
      />
    </div>
  );
};

export default TagInput;
