import { useState } from "react";
import Auth from "../../components/Auth.jsx";
import { handleLogin } from "@/utils/AuthHandlers.jsx";
import { LOGIN_FIELDS, LOGIN_FORM_CONTENT } from "./loginConfig.js";
import { useNavigate } from "react-router-dom";
import { notifyUser, toastType } from "@/utils/ToastNotifications.js";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[85%] max-w-123.75 border border-[#BEBEBE] rounded-2xl bg-[#FAFAFA] px-6 pt-5 pb-7 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">
            {LOGIN_FORM_CONTENT.heading}
          </h1>
          <span className="text-xl">{LOGIN_FORM_CONTENT.subHeading}</span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await handleLogin(loginData.email, loginData.password);
              navigate("/");
            } catch (err) {
              notifyUser(err.message, toastType.warn);
            }
          }}
        >
          <Auth
            formFields={LOGIN_FIELDS}
            {...LOGIN_FORM_CONTENT}
            formData={loginData}
            setFormData={setLoginData}
          />
        </form>
        <div className="text-lg text-[#11111] flex gap-1 justify-center">
          <span className="font-light">{LOGIN_FORM_CONTENT.footerText}</span>
          <a
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => navigate(LOGIN_FORM_CONTENT.actionLink.href)}
          >
            {LOGIN_FORM_CONTENT.actionLink.text}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
