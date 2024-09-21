import ImageResize from "@looop/quill-image-resize-module-react";
import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/ImageResize", ImageResize);
const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
  "align",
  "color",
  "background",
  "size",
  "h1",
];

const QuillEditor = (props) => {
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;
  const quillRef = useRef(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      const form = new FormData();
      form.append("image", file);
      axios
        .post(`${backServer}/notice/editorImage`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", `${backServer}${res.data}`);
          editor.setSelection(range.index + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ align: [] }, "image"],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],

        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      modules={modules}
      formats={formats}
      style={{ height: "500px", width: "100%" }}
      value={noticeContent || ""}
      onChange={setNoticeContent}
    />
  );
};

export default QuillEditor;
