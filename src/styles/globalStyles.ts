import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
${reset}

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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
