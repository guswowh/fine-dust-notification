import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & > .contents {
    padding-top: 4rem;
    > li {
      padding-bottom: 2.4rem;
    }
    > li:last-child {
      padding-bottom: 32.2108vh;
    }
  }
`;
