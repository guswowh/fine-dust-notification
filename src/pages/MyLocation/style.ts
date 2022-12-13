import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .menuSpace {
    width: calc(100% - 8rem);
    margin: 0 4rem;
    display: flex;

    > li:first-child {
      width: 41.67%;
      margin-right: 1.6rem;
    }
    > li:last-child {
      width: 58.33%;
      margin-right: 0;
    }
  }
  & > .contents {
    padding-top: 4rem;
  }
`;
