import { useContext, useEffect, useState } from "react";
import styles from "../Style/Fileuploader.module.css";
import { RiFileTransferFill } from "react-icons/ri";
import * as XLSX from "xlsx";
import {
  CREATE_PLAYER,
  UPLOAD_FILE,
} from "../../../Queries/Players/Mutation/CREATE_PLAYER";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_IMAGE_UPLOAD } from "../../../Queries/Image/Query/GET_IMAGE_UPLOAD";
import { loginContext } from "../../Context/UserContext";
import { Context } from "../../User/Components/AlertContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { EXCEL_FILES } from "../../../Queries/files/EXCEL_FILES";
import {useParams } from "react-router-dom";
export const Fileuploader = ({ setActiveTab }) => {
  const { value } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [player, setPlayer] = useState([]);
  const { auctionData, loading, refreshData, refreshToken } = useContext(loginContext);
  const { setAlert, setVisible } = useContext(Context);
  const [totalRows, setTotalRows] = useState(0);
  const [file, setFile] = useState();
  useEffect(() => {
    if (auctionData && auctionData[value]) {
      setPlayer(auctionData[value].players);
    }
  }, [auctionData]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files[0]);
  };
  let filename;

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
  const [getSignerUrlForUpload] = useLazyQuery(GET_IMAGE_UPLOAD, {
    onCompleted: async (data) => {
      const res = data.getSignerUrlForUpload;
      try {
        const response = await axios.put(res, file, {
          headers: { "Content-Type": "application/octet-stream" },
        });
        const url = res.split("?")[0];
        const finalUrl = url.split(process.env.REACT_APP_IMAGE_CDN)[1];
        await Excelupload({
          variables: {
            file: finalUrl,
            auctionid: auctionData[value].auctionid,
            filename: file.name,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleFileUpload = async (uploadedFile) => {
    await refreshToken();
    if (uploadedFile) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("file");

        const data = new Uint8Array(e.target.result);
        try {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const totalRowsInFile = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }).length;
          console.log( XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }))
          setTotalRows(totalRowsInFile - 1);
          XLSX.utils
            .sheet_to_json(worksheet, { header: 1 })
            .forEach(async (row, rowIndex) => {
              let error = "Invalid ";
              if (rowIndex === 0) {
                const expectedHeaders = [
                  "playername",
                  "playermobile",
                  "playerdob",
                  "playerrole",
                  "tshirtsize",
                  "trousersize",
                ];
                const actualHeaders = row.map((header) =>
                  header.toLowerCase().trim()
                );

                if (!arraysEqual(expectedHeaders, actualHeaders)) {
                  setAlert({
                    message:
                      "Incorrect header order. Headers must follow the order",
                    status: "error",
                  });
                  setVisible(true);
                  setFile(null);
                  return;
                }
              }
            });
         
        } catch (error) {
          console.error("Error processing Excel file:", error);
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const [Excelupload] = useMutation(EXCEL_FILES, {
    onCompleted: async (data) => {
      console.log(data.Excelupload);
    await refreshData();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  const processFile = async () => {
    if (file) {
      filename = `data/${uuidv4()}.xlsx`;
      console.log(filename);
      await getSignerUrlForUpload({
        variables: { filename: filename },
      });
    }
    // await refreshData();
    setActiveTab("Status");
  };
  if (loading || !auctionData) {
    return <div>Loading....</div>;
  }

  return (
    <div
      className={styles.modal}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles["modal-body"]}>
        <h2 className={styles["modal-title"]}>Upload a file</h2>
        <button className={styles["upload-area"]}>
          <span>
            <RiFileTransferFill
              className={styles["upload-area-icon"]}
            ></RiFileTransferFill>
          </span>
          <span className={styles["upload-area-title"]}>
            Drag file(s) here to upload.
          </span>
          <span className={styles["upload-area-description"]}>
            Alternatively, you can select a file by <br />
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                handleFileUpload(e.target.files[0]);
                setFile(e.target.files[0]);
              }} // Bind to handleFileUpload
              style={{ display: "none" }}
            />
            <strong
              onClick={() => document.getElementById("fileInput").click()}
            >
              clicking here
            </strong>
            <p>{file?.name}</p>
          </span>
        </button>
      </div>
      <div className={styles["modal-footer"]}>
        <button
          className={styles["btn"]}
          onClick={() => setFile()}
        >
          Cancel
        </button>
        <button className={styles["btn"]} onClick={processFile} disabled={file===undefined}>
          Upload File
        </button>
      </div>
    </div>
  );
};
