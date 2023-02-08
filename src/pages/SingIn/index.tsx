import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { auth, googleProvider, signInWithUser } from '../../config/firebace';

function SingIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [cookies, setCookie, removeCookie] = useCookies();

  const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const userSingUpHandeler = () => {
    const { email } = userInfo;
    const { password } = userInfo;

    signInWithUser(auth, email, password)
      .then((userCredential: any) => {
        setCookie('access-token', userCredential.user.accessToken, {
          path: '/',
        });
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    signInWithUser(auth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const userSingOutHandeler = () => {
    signOut(auth)
      .then((userCredential) => {
        removeCookie('access-token');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <h1>로그인</h1>
      <input placeholder="Email" name="email" onChange={userInputHandler} />
      <input
        placeholder="Password"
        name="password"
        onChange={userInputHandler}
      />
      <button type="button" onClick={userSingUpHandeler}>
        로그인
      </button>
      <button type="button" onClick={signInWithGoogle}>
        구글 로그인
      </button>
      <button type="button" onClick={userSingOutHandeler}>
        로그아웃
      </button>
    </>
  );
}

export default SingIn;
