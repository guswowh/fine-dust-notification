/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth, signUpWithUser } from '../../config/firebace';

interface SubmitData {
  email: string;
  password: string;
  password_confirm: string;
}

function SingUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<SubmitData>();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const formSubmit: SubmitHandler<SubmitData> = (data) => {
    const { email } = data;
    const { password } = data;
    signUpWithUser(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        navigate('/signIn');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            setErrorMessage('사용 중인 이메일입니다.');
            break;
          default:
            setErrorMessage(errorCode);
        }
      });
  };

  // console.log(watch());

  // const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  // const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserInfo({ ...userInfo, [name]: value });
  // };

  // const userSingUpHandeler = () => {
  //   const { email } = userInfo;
  //   const { password } = userInfo;
  //   signUpWithUser(auth, email, password)
  //     .then((userCredential) => {
  //       const { user } = userCredential;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          name="email"
          type="email"
          placeholder="이메일"
        />
        {errors.email && <span>이메일을 입력해 확인해 주세요</span>}

        <input
          {...register('password', { required: true, minLength: 6 })}
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && errors.password.type === 'required' && (
          <span>비밀번호를 입력해 주세요</span>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <span>비밀번호는 6자 이상이어야 합니다.</span>
        )}

        <input
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === getValues('password'),
          })}
          type="password"
          name="password_confirm"
          placeholder="비밀번호 확인"
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <span>비밀번호를 입력해 주세요</span>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <span>암호가 일치하지 않습니다</span>
          )}

        <button type="submit">회원가입</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
}

export default SingUp;
