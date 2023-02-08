import React, { useState } from 'react';
import { auth, signUpWithUser } from '../../config/firebace';

function SingUp() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const userSingUpHandeler = () => {
    const { email } = userInfo;
    const { password } = userInfo;

    signUpWithUser(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <h1>회원가입</h1>
      <input placeholder="Email" name="email" onChange={userInputHandler} />
      <input
        placeholder="Password"
        name="password"
        onChange={userInputHandler}
      />
      <button type="button" onClick={userSingUpHandeler}>
        회원가입
      </button>
    </>
  );
}

export default SingUp;
