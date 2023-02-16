import styled from 'styled-components';

const Wrapper = styled.div`
  & .signUpForm {
    padding: 4rem;
    & input:first-child {
      margin-top: 0;
    }
    & input {
      font-size: 4rem;
      padding: 0 4rem;
      height: 7.6135vh;
      width: 100%;
      height: 104px;
      margin-bottom: 2rem;
      margin-top: 2rem;
      background: #ffffff;
      border: none;
      box-shadow: inset -12px -12px 16px rgb(255 255 255 / 14%),
        inset 4px 4px 10px rgb(13 39 80 / 26%);
      border-radius: 2.4rem;
    }
    & .checkText {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 390px) {
      & input {
        height: 7.109vh;
        font-size: 3.2rem;
      }
    }
  }
  & .snsLoginContainer {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  & .errorMessage {
    text-align: center;
    font-size: 3rem;
  }
`;

export default Wrapper;
