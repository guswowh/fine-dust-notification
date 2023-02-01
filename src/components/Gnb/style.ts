import styled from 'styled-components';

interface Props {
  location: string;
}

const Wrapper = styled.div`
  & .contents {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 19.9122vh;
    background: linear-gradient(
      180deg,
      rgba(246, 246, 246, 0) 0%,
      #eaf0ff 100%
    );
    display: flex;
    justify-content: center;
    > ul {
      display: flex;
      justify-content: center;
      padding-top: 4rem;

      > a li {
        width: 22.4rem;
        height: 12.2987vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #9bb4f6;
        box-shadow: inset -12px -12px 16px rgba(255, 255, 255, 0.14),
          inset 4px 4px 18px rgba(13, 39, 80, 0.26);
        border-radius: 2.4rem;
        margin-right: 1.6rem;
        svg {
          height: 38.1%;
        }
      }
      > a:nth-child(1) li {
        box-shadow: ${(props: Props) =>
          props.location === '/'
            ? '12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #FFFFFF;'
            : 'inset -12px -12px 16px rgba(255, 255, 255, 0.14), inset 4px 4px 18px rgba(13, 39, 80, 0.26);'};

        background-color: ${(props) =>
          props.location === '/location' ? '#90ABF2' : '#9bb4f6'};

        svg path {
          fill-opacity: ${(props: Props) =>
            props.location === '/' ? '1' : '0.7;'};
        }
      }
      > a:nth-child(2) li {
        box-shadow: ${(props) =>
          props.location === '/location'
            ? '12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #FFFFFF;'
            : 'inset -12px -12px 16px rgba(255, 255, 255, 0.14), inset 4px 4px 10px rgba(13, 39, 80, 0.26);'};

        background-color: ${(props) =>
          props.location === '/location' ? '#90ABF2' : '#9bb4f6'};

        svg path {
          fill-opacity: ${(props: Props) =>
            props.location === '/location' ? '1' : '0.7;'};
        }
      }
      > a:nth-child(3) li {
        box-shadow: ${(props) =>
          props.location === '/favorites'
            ? '12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #FFFFFF;'
            : 'inset -12px -12px 16px rgba(255, 255, 255, 0.14), inset 4px 4px 10px rgba(13, 39, 80, 0.26);'};

        background-color: ${(props) =>
          props.location === '/location' ? '#90ABF2' : '#9bb4f6'};

        svg path {
          fill-opacity: ${(props: Props) =>
            props.location === '/favorites' ? '1' : '0.7;'};
        }
      }
      > a:last-child li {
        margin-right: 0;
      }
    }
  }

  & .bgGradation {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: linear-gradient(
      180deg,
      rgba(247, 247, 247, 0) 0%,
      #eaf0ff 100%
    );
    z-index: -111111;
  }
  @media screen and (max-width: 390px) {
    & .contents {
      height: 19.4313vh;
      > ul {
        padding-top: 3.3rem;
      }
    }
    & .contents > ul > a li {
      width: 13.6rem;
      height: 11.8483vh;
    }
  }
`;

export default Wrapper;
