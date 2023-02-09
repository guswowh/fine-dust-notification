/* eslint-disable react/jsx-props-no-spreading */
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Gnb from '../../components/Gnb';
import { GoogleIcon } from '../../components/icons';
import TitleSpace from '../../components/TitleSpace';
import { auth, googleProvider, signInWithUser } from '../../config/firebace';
import { useAppDispatch, useAppSelector } from '../../store';
import { validateLoginStatus } from '../../store/slices/locationSlice';
import Wrapper from './style';

interface SubmitData {
  email: string;
  password: string;
  password_confirm: string;
}

function SingIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    // watch,
  } = useForm<SubmitData>();

  // const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  // const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const userName = userEmail.split('@')[0];

  // const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserInfo({ ...userInfo, [name]: value });
  // };

  // console.log(auth.currentUser);
  // console.log(cookies['access-token']);

  const loginSubmit: SubmitHandler<SubmitData> = (data) => {
    const { email } = data;
    const { password } = data;
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

  // const userSingUpHandeler = () => {
  //   const { email } = userInfo;
  //   const { password } = userInfo;

  //   signInWithUser(auth, email, password)
  //     .then((userCredential: any) => {
  //       // setCookie('access-token', userCredential.user.accessToken, {
  //       //   path: '/',
  //       // });
  //       const { user } = userCredential;
  //       dispatch(validateLoginStatus(true));
  //       navigate('/');
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       switch (errorCode) {
  //         case 'auth/user-not-found':
  //           setErrorMessage('회원을 찾을 수 없습니다.');
  //           break;
  //         case 'auth/wrong-password':
  //           setErrorMessage('비밀번호를 확인해 주세요');
  //           break;
  //         case 'auth/invalid-email':
  //           setErrorMessage('잘못된 이메일 형식입니다.');
  //           break;
  //         default:
  //           setErrorMessage(errorCode);
  //       }
  //     });

  //   signInWithUser(auth, email, password);
  // };

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
    <Wrapper>
      <TitleSpace title="sign in" userName={userName} />
      <form className="signUpForm" onSubmit={handleSubmit(loginSubmit)}>
        <input
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          name="email"
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <span className="checkText">이메일을 입력해 확인해 주세요</span>
        )}
        <input
          {...register('password', { required: true, minLength: 6 })}
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && errors.password.type === 'required' && (
          <span className="checkText">비밀번호를 입력해 주세요</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span className="checkText">비밀번호는 6자 이상이어야 합니다.</span>
        )}
        <Gnb buttonName="sign in" />
      </form>
      <div className="snsLoginContainer">
        <button type="button" onClick={signInWithGoogle}>
          <GoogleIcon size="36" />
        </button>
      </div>

      <button type="button" onClick={userSingOutHandeler}>
        로그아웃
      </button>
      <p className="errorMessage">{errorMessage}</p>
    </Wrapper>
  );
}

export default SingIn;
