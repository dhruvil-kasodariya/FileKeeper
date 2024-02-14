import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectFileList } from "../store/file/file.selector";
import { selectCurrentUser } from "../store/user/user.selecter";
import { addFile, deleteFile, getFilesByUser } from "../api/file.api";
import Navbar from "../componets/Navbar";
import FileContainer from "../componets/FileContainer";
import { baseUrl } from "../api/apiUrl.api";

const Home = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const files = useSelector(selectFileList);

  const fetchData = async () => {
    await getFilesByUser(currentUser.accessToken, currentUser._id, dispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteFileHandle = async (_id) => {
    await deleteFile(_id, currentUser.accessToken, dispatch);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addFileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", currentUser._id);
    await addFile(formData, currentUser.accessToken, dispatch);
     
    

    fetchData();
  };

  const downloadFile = async (file) => {
    let code = prompt("Please enter code:");
    if (code == file.code) {
      let url = `${baseUrl}/${file.path}`;
      window.open(url, "_blank");
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      toast.error("code doesnot match");
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col justify-between my-3 mx-5">
          <h1 className="text-4xl font-bold italic text-center my-5">File Keeper</h1>
          <form className="flex items-center">
            <input type="file" name="file" onChange={handleFile} />
            <button onClick={addFileHandler} className="border border-black rounded-lg p-2">Upload new File</button>
          </form>
        </div>
        <div className="container flex flex-wrap">
          {files &&
            files.map((file, index) => (
              <FileContainer
                fileData={file}
                deleteFileHandle={deleteFileHandle}
                downloadFile={downloadFile}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
