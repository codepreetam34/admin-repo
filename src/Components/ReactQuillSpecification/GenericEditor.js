import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

const previewContainer = {
  backgroundColor: "#f8f8f8",
  padding: "10px",
  border: "1px solid #ddd",
  marginTop: "20px",
};

const previewContent = {
  marginTop: "10px",
};

const GenericEditor = ({ onData, dataText, editorId, placeholder }) => {
  const [state, setState] = useState({ value: dataText || "" });

  const handleChange = (value) => {
    setState({ value });
    onData(value);
  };

  useEffect(() => {
    if (dataText !== undefined && dataText) {
      setState({ value: dataText });
    }
  }, [dataText]);

  const modules = {
    toolbar: [
      [{ font: [] }], // Font family
      [{ size: ["small", false, "large", "huge"] }], // Font size
      [{ header: [1, 2, 3,false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }], // Font color and background color
      ["clean"],
      ["emoji"], // Emoji
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "font",
    "size", 
    "bold",
    "header",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={state?.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        id={editorId}
      />
      <div style={{ ...previewContainer, whiteSpace: "pre-wrap" }}>
        <h3>Preview</h3>
        <div style={{ ...previewContent }}>
          {state?.value !== null &&
          state?.value !== undefined &&
          state?.value !== "" ? (
            <div dangerouslySetInnerHTML={{ __html: state?.value }} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </div>
  );
};

GenericEditor.propTypes = {
  onData: PropTypes.func.isRequired,
  dataText: PropTypes.string,
  editorId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

GenericEditor.defaultProps = {
  dataText: "",
  placeholder: "Write something awesome...",
};

export default GenericEditor;
