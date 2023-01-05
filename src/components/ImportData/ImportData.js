import React, { useRef, useState } from "react";
import "../../styles/importdata.scss";
import icons from "../../assets/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonThree from "../Button/ButtonThree";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function ImportData() {
  const wrapperRef = useRef(null);
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [fileList, setFileList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const onDragEnter = () => {
    wrapperRef.current.classList.add("drag-over");
    setIsSuccess(false);
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("drag-over");
    setIsSuccess(false);
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("drag-over");
    setIsSuccess(false);
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
    setIsSuccess(false);
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
    if (updatedList.length === 0) {
      setIsError(false);
    }
    setIsSuccess(false);
  };

  const uploadFiles = () => {
    let formData = new FormData();

    fileList.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post("api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setFileList([]);
        setSuccessfulMessage(response.data);
        setIsSuccess(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsError(true);
      });
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
        {isSuccess && (
          <div className="import-data-container__message">
            <p>{successfulMessage}</p>
          </div>
        )}
        {fileList.length > 0 && (
          <div className="import-data-container__file-preview">
            <div>{isError && <ErrorMessage message={errorMessage} />}</div>

            <div className="import-data-container__file-preview__title">
              <ButtonThree text="Upload files" onClick={uploadFiles} />
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
