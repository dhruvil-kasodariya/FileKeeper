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
import { addFileUrl, deleteFileUrl, getFilesByUserUrl } from "./apiUrl.api";

export const getFilesByUser = async (token,userId ,dispatch) => {
  console.log("id",userId)
  try {
    dispatch(getFilesByUserStart());
    const responce = await axios.get(`${getFilesByUserUrl}/${userId}`, {
      headers: {
        token: `blob ${token}`,
      },
    });
    if (responce.status === 200) {
      const data = responce.data;
      console.log(responce)
      dispatch(getFilesByUserSuccess(data));
      return data;
    }
    return responce;
  } catch (error) {
    dispatch(getFilesByUserFailed(error));
    console.log(error);
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
    if (response.status == 200) {
      alert(`save the code: ${response.data.code}`)
      dispatch(addFileSuccess(response.data));
      return response.data
    }
  } catch (error) {
    dispatch(addFileFailed(error));
    console.error(error);
  }
};
