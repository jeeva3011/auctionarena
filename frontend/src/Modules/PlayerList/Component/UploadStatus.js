import React, { useContext, useEffect, useState } from "react";
import style from "../Style/UploadStatus.module.css";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { loginContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import { socketDetails } from "../../Context/WebSocketContext";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress'
import ProgressBar from "react-bootstrap/ProgressBar";
// import 'bootstrap/dist/css/bootstrap.min.css'

const UploadStatus = () => {
  const { value } = useParams();
  const { auctionData, loading, refreshData, refreshToken } =
    useContext(loginContext);
  const [uploadinFiles, setUploadingFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState();
  const { socket } = useContext(socketDetails);

  useEffect(() => {
    const handleFileStatus = async (data) => {
      if (auctionData && auctionData[value].auctionid === data.auctionid) {
        await refreshData();
        setUploadingFiles((prevFiles) => [
          ...prevFiles,
          { file: data.fileid, percentage: 0 },
        ]);
      }
    };
    const refereshprocess = async () =>{
      await refreshData()
    }
    const handleProgressBar = (data) => {
      if (auctionData && auctionData[value].auctionid === data.auctionid) {
        setUploadingFiles((prevFiles) => {
          const index = prevFiles.findIndex(
            (file) => file.file === data.fileid
          );
          if (index !== -1) {
            prevFiles[index].percentage = data.percentage;
            if (data.percentage === 100) {
              prevFiles.splice(index, 1);
              refereshprocess()
            }
          }
          else{
            setUploadingFiles((prevFiles) => [
              ...prevFiles,
              { file: data.fileid, percentage: data.percentage },
            ])
          }
          return [...prevFiles];
        });
      }
    };
    socket.on("connect", () => {});
    socket.on("file-status", (data) => handleFileStatus(data));
    socket.on("progress-bar", (data) => handleProgressBar(data));
    return () => {
      socket.off("connect");
      socket.off("file-upload-complete");
      socket.off("progress-percent");
    };
  }, [socket]);
  const [Files, setFiles] = useState();
  useEffect(() => {
    if (auctionData) {
      setFiles(auctionData[value].files);
    }
  }, [auctionData, loading]);

  if (loading && !auctionData) {
    return <div>loading ...</div>;
  }
  return (
    <div className={style.tableContainer}>
      <table className={style.statusTable}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Download logs</th>
          </tr>
        </thead>
        <tbody>
          {Files &&
            Files.map((file, index) => {
              return (
                <tr key={file.fileid}>
                  <td>{index + 1}</td>
                  <td>{file.filename}</td>
                  <td
                    style={{
                      color:
                        file.totalrecords === file.successrecords
                          ? "green"
                          : "red",
                    }}
                  >
                    {uploadinFiles.findIndex(
                      (files) => files.file === file.fileid
                    ) === -1 ? (
                      <>
                        {file.successrecords} of {file.totalrecords} records
                      </>
                    ) : (
                      <LinearProgress
                        variant="determinate"
                        value={
                          +uploadinFiles[
                            uploadinFiles.findIndex(
                              (files) => files.file === file.fileid
                            )
                          ].percentage
                        }
                        style={{height:'20px'}}
                      />
                    )}
                  </td>
                  <td>
                    {uploadinFiles.findIndex(
                      (files) => files.file === file.fileid
                    ) === -1 ? (
                      file.errorfilepath !== 'success' && file.errorfilepath ? (
                        <a
                          href={
                            process.env.REACT_APP_IMAGE_CDN + file.errorfilepath
                          }
                        >
                          <FaFileDownload />
                          logs
                        </a>
                      ) : (
                        <span className={style.successMsg}>
                          <MdOutlineDownloadDone />
                          Success
                        </span>
                      )
                    ) : (
                      <>
                        {
                          uploadinFiles[
                            uploadinFiles.findIndex(
                              (files) => files.file === file.fileid
                            )
                          ].percentage
                        }
                        %
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UploadStatus;
