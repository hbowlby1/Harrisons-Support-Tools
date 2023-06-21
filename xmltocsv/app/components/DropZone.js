import React from "react";
import { useState } from "react";
import { parseStringPromise } from "xml2js";
import { flatten } from "flat";
import { json2csv } from "json-2-csv";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../styles/DropZone.module.css";
import { Button } from "react-bootstrap";

const DropZone = ({ data, dispatch }) => {
  const [link, setLink] = useState([]);
  //const [download, setDownload] = useState();
  //onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  //onDragLeaves sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  //onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy (copy the item sources)
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //get files from dataTransfer object on the event as an array
    let files = [...e.dataTransfer.files];

    //checks if file(s) is dropped
    if (files && files.length > 0) {
      //loop through existing files
      const existingFiles = data.fileList.map((f) => f.name);
      //checks if file exists already and if so, do not add it (prevents dupes)
      files = files.filter((f) => !existingFiles.includes(f.name));

      //dispatch action that adds dropped file(s) to the fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });

      //reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  const handleFileSelect = (e) => {
    //get files from event on enter them as an array
    let files = [...e.target.files];
    //checks if files are selected.
    if (files && files.length > 0) {
      //loop over files
      const existingFiles = data.fileList.map((f) => f.name);

      //checks if files already exist
      files = files.filter((f) => !existingFiles.includes(f.name));

      //dispatch action to add selected file to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  //handle the file uploads
  const uploadFiles = async () => {
    //get files from the fileList array
    let files = data.fileList;

    //create an array to store the download links
    const downloadLinks = [];

    //loop through each file and convert them to CSV
    for (const file of files) {
      try {
        //initialize FileReader to read the file
        const reader = new FileReader();

        //read the file
        reader.onload = async (e) => {
          try {
            //parse the XML to JSON
            const jsonObj = await parseStringPromise(e.target.result);

            //flattens the JSON into a less complex structure
            const flatJSON = flatten(jsonObj);

            //converts the flatJSON to a CSV string
            const csvString = await json2csv(flatJSON);

            //create blob from CSV string
            const blob = new Blob([csvString], { type: "text/csv" });

            //create a download link for the file
            const url = URL.createObjectURL(blob);
            downloadLinks.push(url);

            //set the download links
            setLink(downloadLinks);
          } catch (err) {
            console.log(err);
          }
        };

        reader.readAsText(file);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <h1 className={styles.title}>Upload XML file(s) here.</h1>
      <div
        className={styles.dropzone}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Image src="/upload.svg" alt="upload" height={50} width={50} />
        <input
          id="fileSelect"
          type="file"
          multiple
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">You can add more than 1 file.</label>
        <h3 className={styles.uploadMessage}>Or drag your files here</h3>
      </div>

      {/* pass the selected file or dropped files as props */}
      <FilePreview fileData={data} />
      {data.fileList.length > 0 && (
        <button className={styles.uploadBtn} onClick={uploadFiles}>
          Upload
        </button>
      )}
      {link.length > 0 && (
        <>
          {link.map((downloadLinks, index) => (
            <a
              href={downloadLinks}
              download={`File${index + 1}.csv`}
              key={index}
            >
              <div className={styles.downloadBtns}>
                <Button>Download {data.fileList[index].name}.csv</Button>
              </div>
            </a>
          ))}
        </>
      )}
    </>
  );
};

export default DropZone;
