import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  width: calc(100% - 8rem);
  height: 32.2108vh;
  padding: 1.4rem;
  margin: 0 auto;
  background: #f6f6f6;
  box-shadow: inset -12px -12px 16px rgba(255, 255, 255, 0.14),
    inset 4px 4px 10px rgba(13, 39, 80, 0.26);
  border-radius: 2.4rem;
  & .inner {
    height: 100%;
    background: #fff;
    box-shadow: 12px 12px 28px rgba(13, 39, 80, 0.16), -4px -4px 10px #ffffff;
    border-radius: inherit;
    > ul.contents {
      position: relative;
      display: flex;
      height: 100%;
      align-items: center;
      > li:first-child svg {
        height: 19.9122vh;
        margin-left: 6.4rem;
      }

      > li:last-child {
        margin-left: 6.4rem;
        .fineDust {
          font-size: 6.4rem;
          line-height: 7.5rem;
          text-transform: uppercase;
          color: #5477d5;
        }
        .stationName {
          font-size: 4rem;
          line-height: 5.8rem;
        }
        .fineDustInfo {
          font-size: 2.4rem;
          line-height: 3.4rem;
        }
        .checkIcon {
          position: absolute;
          top: 6.4rem;
          right: 6.4rem;
          width: 6.4rem;
        }
      }
    }
  }
  @media screen and (max-width: 390px) {
    height: 31.6351vh;
    & .inner {
      overflow: hidden;
      ul.contents > li:first-child svg {
        position: absolute;
        right: -20rem;
        bottom: -10rem;
      }
    }
    & .inner > ul.contents > li:last-child {
      margin-left: 6rem;
      .checkIcon {
        width: 6rem;
        top: 6rem;
        right: 6rem;
      }
    }
  }
`;
