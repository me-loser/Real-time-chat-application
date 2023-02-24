import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const onClickSignIn = async () => {
    try {
      setSignInError("");
      await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      navigate("/");
    } catch (e) {
      setSignInError(e.message);
    }
  };

  return (
    <div className="full-height-page">
      <div className="centered-container space-before">
        <h1>Sign In</h1>
        {signInError ? (
          <div>
            <p className="error-message">{signInError}</p>
          </div>
        ) : null}
        <input
          type="text"
          value={emailValue}
          placeholder="someone@gmail.com"
          className="full-width space-after"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <input
          type="password"
          value={passwordValue}
          placeholder="****"
          className="full-width space-after"
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button className="full-width" onClick={onClickSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
