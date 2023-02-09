/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Gnb from '../../components/Gnb';
import TitleSpace from '../../components/TitleSpace';
import { auth, signUpWithUser } from '../../config/firebace';
import { useAppSelector } from '../../store';
import Wrapper from './style';

interface SubmitData {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SingUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    // watch,
  } = useForm<SubmitData>();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const userName = userEmail.split('@')[0];

  const formSubmit: SubmitHandler<SubmitData> = (data) => {
    const { email } = data;
    const { password } = data;
    signUpWithUser(auth, email, password)
      .then(() => {
        // const { user } = userCredential;
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

  return (
    <Wrapper>
      <TitleSpace title="sign up" userName={userName} />
      <form className="signUpForm" onSubmit={handleSubmit(formSubmit)}>
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

        <input
          {...register('passwordConfirm', {
            required: true,
            validate: (value) => value === getValues('password'),
          })}
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
        />
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'required' && (
            <span className="checkText">비밀번호를 입력해 주세요</span>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'validate' && (
            <span className="checkText">암호가 일치하지 않습니다</span>
          )}

        {/* <button className="submitBtn" type="submit">
          회원가입
        </button> */}
        <Gnb buttonName="sign up" />
      </form>
      <p className="errorMessage">{errorMessage}</p>
    </Wrapper>
  );
}

export default SingUp;
