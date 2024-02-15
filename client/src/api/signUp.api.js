import axios from "axios";
import { signUpUrl } from "./apiUrl.api";
import {
  signUpSuccess,
  signUpFailed,
  signUpStart,
} from "../store/user/user.action";

const signUpApi = async (userData, dispatch, navigate) => {
  try {
    dispatch(signUpStart(true));
    const responce = await axios.post(signUpUrl, userData);
    if (responce.status==201) {
      const data = responce.data;
      dispatch(signUpSuccess(data));
      navigate("/home");
      return data;
    }
    return responce;
  } catch (error) {
    dispatch(signUpFailed(error));
    console.error(error);
  }
};

export default signUpApi;
