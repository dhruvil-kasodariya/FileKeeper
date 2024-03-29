import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Form from "./Form";
import loginApi from "../api/login.api";

function SignIn({ handleSwitch }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = userInfo;
    if (!username || !password) {
      !username && toast.error("enter user name");
      !password && toast.error("enter password");
      return;
    } else {
      try {
        await loginApi(userInfo, dispatch, navigate);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Form
        title={"Sign In Form"}
        handleInputChange={handleChangeUserInfo}
        handleSubmit={handleSignInSubmit}
        userData={userInfo}
      />
      <button className="w-full" onClick={handleSwitch}>
        Don't have account ?{" "}
        <span className="font-medium underline">Sign Up</span>
      </button>
    </div>
  );
}

export default SignIn;
