import React from 'react';
import { Link } from 'react-router-dom';
// import * as S from './style'

function Gnb() {
  return (
    <div>
      <ul>
        <Link to="/">
          <li>내 지역보기</li>
        </Link>
        <Link to="location">
          <li>전체 시도보기</li>
        </Link>
        <Link to="favorites">
          <li>즐겨찾기</li>
        </Link>
      </ul>
    </div>
  );
}

export default Gnb;
