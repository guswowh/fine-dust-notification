import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .menuSpace {
    width: calc(100% - 8rem);
    margin: 0 4rem;
    display: flex;

    > li {
      width: 100%;
      margin-right: 1.6rem;
    }
    > li:last-child {
    }
  }
`;

export const SpinnerContainer = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
`;
