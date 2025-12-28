import React, { useState } from "react";
import Auth from "../../components/Auth.jsx";
import { handleSignUp } from "@/utils/AuthHandlers.jsx";
import { SIGN_UP_FIELDS, SIGN_UP_FORM_CONTENT } from "./signUpConfig.js";

function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Auth
        formFields={SIGN_UP_FIELDS}
        {...SIGN_UP_FORM_CONTENT}
        formData={signUpData}
        setFormData={setSignUpData}
        submitAction = {handleSignUp}
      />
    </div>
  );
}

export default SignUp;
