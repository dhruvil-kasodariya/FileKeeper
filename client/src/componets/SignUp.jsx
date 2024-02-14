import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Form from "./Form";
import signUpApi from "../api/signUp.api";

function SignUp({ handleSwitch }) {
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const { useremail, username, password } = user;
    if (!useremail || !username || !password) {
      !username && toast.error("enter user name");
      !useremail && toast.error("enter user email");
      !password && toast.error("enter password");
      return;
    } else {
      try {
        await signUpApi(user, dispatch, navigate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Form
        title={"Sign Up Form"}
        handleInputChange={handleChangeUserInfo}
        handleSubmit={handleSignUpSubmit}
        userData={user}
        isSignUp={true}
      />
      <button className="w-full" onClick={handleSwitch}>
        Already have account ?
        <span className="font-medium underline">Log In</span>
      </button>
    </div>
  );
}

export default SignUp;
