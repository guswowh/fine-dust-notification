import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FavoritesIcon, LocationsIcon, MyLocationIcon } from '../icons';
import Wrapper from './style';

function Gnb() {
  const location = useLocation();

  return (
    <Wrapper location={location.pathname}>
      <div className="contents">
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
      </div>

      <div className="bgGradation" />
    </Wrapper>
  );
}

export default Gnb;
