import styled from 'styled-components';

interface Props {
  isDropDwon?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & ul {
    > li:first-child .cityName {
      display: flex;
      background: #ffffff;
      box-shadow: ${(props: Props) =>
        props.isDropDwon
          ? 'inset -12px -12px 16px rgba(255, 255, 255, 0.14), inset 4px 4px 10px rgba(13, 39, 80, 0.26);'
          : '12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #FFFFFF;'};
      border-radius: 2.4rem;
      padding: 0 4rem;
      height: 7.6135vh;
      width: fit-content;
      font-size: 4rem;
      align-items: center;
      justify-content: space-between;
      svg {
        width: 2.4rem;
      }
    }
  }
`;

export const DropdownContainer = styled.article`
  & ul {
    position: relative;
    background: #ffffff;
    box-shadow: ${(props: Props) =>
      props.isDropDwon
        ? 'inset -12px -12px 16px rgba(255, 255, 255, 0.14), inset 4px 4px 10px rgba(13, 39, 80, 0.26);'
        : '12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #FFFFFF;'};
    border-radius: 2.4rem;
    width: fit-content;
    height: 32.2108vh;
    overflow: scroll;
    -ms-overflow-style: none;
    & li {
      padding: 1.4rem 4rem;
      button {
        font-size: 4rem;
      }
    }
  }

  & ul::-webkit-scrollbar {
    display: none;
  }
`;
