import { useState } from 'react';
import Auth from '../components/Auth.jsx';

const loginFields = [
  {
    id:"email",
    name: "email",
    placeholder: "Email",
    icon: "Mail",
    type: "email",
  },
  {
    id:"password",
    name: "password",
    placeholder: "Password",
    icon: "Lock",
    type: "password",
  },
];

const formContent = {
  heading:"Hello there,",
  subHeading:"Login to your account",
  submitText:"Login",
  footerText:"Don't have an account?",
  actionLink:{
    text:"Sign Up",
    href:"/signup"
  }
}

function Login() {

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    });

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <Auth formFields={loginFields} {...formContent} formData={loginData} setFormData = {setLoginData} />
    </div>
  )
}

export default Login