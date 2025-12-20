import React, { useState } from 'react'
import Auth from '../components/Auth.jsx'

const signUpFields = [
  {
    id: "username",
    name: "username",
    placeholder: "Username",
    icon: "UserRound",
    type: "text",
  },
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
  heading:"Sign Up",
  subHeading:"Create your new account",
  submitText:"Sign Up",
  footerText:"Already have an account?",
  actionLink:{
    text:"Login",
    href:"/login"
  }
}

function SignUp() {

  const [signUpData, setSignUpData] = useState(
    {
      username:"",
      email:"",
      password:""
    }
  )

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <Auth formFields={signUpFields} {...formContent} formData={signUpData} setFormData = {setSignUpData} />
    </div>
  )
}

export default SignUp