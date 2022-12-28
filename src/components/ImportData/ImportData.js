import React, { useRef, useState } from "react";
import "../../styles/importdata.scss";
import icons from "../../assets/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ImportData() {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => {
    wrapperRef.current.classList.add("drag-over");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("drag-over");
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("drag-over");
  };

  const onFileChange = (files) => {
    console.log(files);
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const setImageFile = (name) => {
    let arr = name.split(".");
    let extension = arr.pop();
    switch (extension) {
      case "eml":
        extension = icons.eml;
        break;

      case "csv":
        extension = icons.csv;
        break;

      case "txt":
        extension = icons.txt;
        break;

      default:
        extension = icons.fileDefault;
        break;
    }

    return extension;
  };

  return (
    <div className="import-data-container">
      <h1>Import data to the database</h1>
      <div
        className="import-data-container__wrapper"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div>
          <FontAwesomeIcon icon={icons.faCloudArrowUp} />
        </div>
        <div>Drag and drop your files or click to browse</div>
        <div>
          <p>Supported files</p>
          <p>EML, CSV, TXT</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      <div>
        {fileList.length > 0 && (
          <div className="import-data-container__file-preview">
            <div className="import-data-container__file-preview__title">
              Ready to upload
            </div>
            {fileList.map((item, index) => (
              <div
                className="import-data-container__file-preview__item"
                key={index}
              >
                <div className="import-data-container__file-preview__item__image">
                  <img src={setImageFile(item.name)} alt="File" />
                </div>
                <div className="import-data-container__file-preview__item__info">
                  <p>{item.name}</p>
                  <p>{item.size} Kb</p>
                </div>
                <div className="import-data-container__file-preview__item__delete">
                  <span onClick={() => fileRemove(item)}>X</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImportData;
