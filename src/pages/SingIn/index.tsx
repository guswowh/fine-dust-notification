import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithUser } from '../../config/firebace';
import { useAppDispatch } from '../../store';
import { validateLoginStatus } from '../../store/slices/locationSlice';

function SingIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  // const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // console.log(auth.currentUser);
  // console.log(cookies['access-token']);

  const userSingUpHandeler = () => {
    const { email } = userInfo;
    const { password } = userInfo;

    signInWithUser(auth, email, password)
      .then((userCredential: any) => {
        // setCookie('access-token', userCredential.user.accessToken, {
        //   path: '/',
        // });
        const { user } = userCredential;
        dispatch(validateLoginStatus(true));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setErrorMessage('회원을 찾을 수 없습니다.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('비밀번호를 확인해 주세요');
            break;
          case 'auth/invalid-email':
            setErrorMessage('잘못된 이메일 형식입니다.');
            break;
          default:
            setErrorMessage(errorCode);
        }
      });

    signInWithUser(auth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
      });
  };

  const userSingOutHandeler = () => {
    signOut(auth)
      .then(() => {
        // removeCookie('access-token');
        dispatch(validateLoginStatus(false));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
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
      <p>{errorMessage}</p>
    </>
  );
}

export default SingIn;
