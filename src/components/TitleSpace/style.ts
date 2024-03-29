import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .titleSpace {
    height: 32.2108vh;
    display: flex;
    align-items: center;
    margin-left: 4rem;
    text-transform: capitalize;
    .userName {
      font-size: 4rem;
      line-height: 4.8rem;
      color: #3c3c3c;
    }
    .title {
      font-size: 6.4rem;
      line-height: 7.4rem;
      font-weight: 500;
      color: #3c3c3c;
    }
  }
  @media screen and (max-width: 390px) {
    & .titleSpace {
      height: 31.6351vh;
    }
  }
`;
