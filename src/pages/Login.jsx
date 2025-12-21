import { useState } from "react";
import Auth from "../components/Auth.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.js";

const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const loginFields = [
  {
    id: "email",
    name: "email",
    placeholder: "Email",
    icon: "Mail",
    type: "email",
  },
  {
    id: "password",
    name: "password",
    placeholder: "Password",
    icon: "Lock",
    type: "password",
  },
];

const formContent = {
  heading: "Hello there,",
  subHeading: "Login to your account",
  submitText: "Login",
  footerText: "Don't have an account?",
  actionLink: {
    text: "Sign Up",
    href: "/signup",
  },
};

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Auth
        formFields={loginFields}
        {...formContent}
        formData={loginData}
        setFormData={setLoginData}
        submitAction={handleLogin}
      />
    </div>
  );
}

export default Login;
