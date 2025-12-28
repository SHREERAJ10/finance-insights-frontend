import { useState } from "react";
import Auth from "../../components/Auth.jsx";
import { handleLogin } from "@/utils/AuthHandlers.jsx";
import { LOGIN_FIELDS, LOGIN_FORM_CONTENT } from "./loginConfig.js";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Auth
        formFields={LOGIN_FIELDS}
        {...LOGIN_FORM_CONTENT}
        formData={loginData}
        setFormData={setLoginData}
        submitAction={handleLogin}
      />
    </div>
  );
}

export default Login;