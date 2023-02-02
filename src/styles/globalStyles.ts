import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
${reset}

* {
  box-sizing: border-box;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif !important;
}
html {
  font-size: 62.5%; // 10px
  background-color: #F4F6F9;
}
body {
  margin: 0;
  max-width: 102.4rem;
  max-height: 136.6rem;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
    font-family: 'Roboto','Noto Sans KR',sans-serif !important;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
    max-width: 102.4rem;
    max-height: 136.6rem;
    margin: 0 auto;
    background: linear-gradient(180deg,rgb(255 255 255 / 120%) 0%,#EAF0FF 200%)
}
input, textarea { 
  -moz-user-select: auto;
  -webkit-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
}
input:focus {
  outline: none;
}
button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
a{
  text-decoration: none;
  color: inherit;
}
@media screen and (max-width: 768px) {
  html {
    font-size: 50%; // 8px
  }
}
@media screen and (max-width: 390px) {
  html {
    font-size: 37.5%; // 6px
  }
}
`;
