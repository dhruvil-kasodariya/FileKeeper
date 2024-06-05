import axios from "axios";
import {
  addFileFailed,
  addFileStart,
  addFileSuccess,
  deleteFileFailed,
  deleteFileStart,
  deleteFileSuccess,
  getFilesByUserFailed,
  getFilesByUserStart,
  getFilesByUserSuccess,
} from "../store/file/file.action";
import {toast} from "react-toastify"
import { addFileUrl, deleteFileUrl, fileDownloadUrl, getFilesByUserUrl } from "./apiUrl.api";

export const getFilesByUser = async (token,userId ,dispatch) => {
  try {
    dispatch(getFilesByUserStart());
    const responce = await axios.get(`${getFilesByUserUrl}/${userId}`, {
      headers: {
        token: `blob ${token}`,
      },
    });
    if (responce.status === 200) {
      const data = responce.data;
  
      dispatch(getFilesByUserSuccess(data));
      return data;
    }
    return responce;
  } catch (error) {
    dispatch(getFilesByUserFailed(error));
    console.error(error);
  }
};

export const deleteFile = async (_id, token, dispatch) => {
  try {
    dispatch(deleteFileStart());
    const response = await axios.delete(`${deleteFileUrl}/${_id}`, {
      headers: {
        token: `blob ${token}`,
      },
    });
    if (response.status == 200) {
      dispatch(deleteFileSuccess(_id));
    }
  } catch (error) {
    dispatch(deleteFileFailed(error));
    console.error(error);
  }
};

export const addFile = async (file, token, dispatch) => {
  try {
    dispatch(addFileStart());
    const response = await axios.post(addFileUrl, file, {
      headers: {
        token: `blob ${token}`,
      },
    });
    if (response.status == 201) {
      toast.success(`save the code: ${response.data.originalname}`)
      const data =response.data
      dispatch(addFileSuccess(data));
      
    }
    return response
  } catch (error) {
    dispatch(addFileFailed(error));
    console.error(error);
  }
};

export const fileDownloadApi =async(fileData)=>{
  const response = await axios.post(
    fileDownloadUrl,
    fileData,
    {
      responseType: "base64",
    }
  );
  if(response.status ===200){
    return response.data
  }
  return null
}
