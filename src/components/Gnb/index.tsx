import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FavoritesIcon, LocationsIcon, MyLocationIcon } from '../icons';
import * as S from './style';

function Gnb() {
  const location = useLocation();

  return (
    <S.Wrapper location={location.pathname}>
      <ul>
        <Link to="/">
          <li>
            <MyLocationIcon fillOpacity="100" />
          </li>
        </Link>
        <Link to="location">
          <li>
            <LocationsIcon fillOpacity="100" />
          </li>
        </Link>
        <Link to="favorites">
          <li>
            <FavoritesIcon fillOpacity="100" />
          </li>
        </Link>
      </ul>
    </S.Wrapper>
  );
}

export default Gnb;
