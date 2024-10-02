import React from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomQuillEditor = ({ content, setContent, placeholder }) => {
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <Quill
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
      theme="snow"
    />
  );
};

export default CustomQuillEditor;
