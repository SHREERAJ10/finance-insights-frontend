import { auth } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const handleLogin = (email, password) => {
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const handleSignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
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

export const logout = () => {
  signOut(auth).catch((err) => {
    console.log(err);
  });
};