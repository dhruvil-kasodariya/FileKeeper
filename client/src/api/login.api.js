import axios from "axios";
import { loginUrl } from "./apiUrl.api";
import {
  signInSuccess,
  signInFailed,
  signInStart,
} from "../store/user/user.action";

const loginApi = async (userData, dispatch, navigate) => {
  try {
    dispatch(signInStart(true));
    const responce = await axios.post(loginUrl, userData);
    if (responce.status === 200) {
      const data = responce.data;
      dispatch(signInSuccess(data));
      navigate("/home");
      return data;
    }
    return responce;
  } catch (error) {
    dispatch(signInFailed(error));
    console.error(error);
  }
};

export default loginApi;

