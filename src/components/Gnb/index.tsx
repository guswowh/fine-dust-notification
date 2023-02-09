import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { FavoritesIcon, LocationsIcon, MyLocationIcon } from '../icons';
import Wrapper from './style';

function Gnb() {
  const location = useLocation();
  const userEmail = useAppSelector((item) => item.locationSlice.userEmail);
  const [isLogin, setIsLogin] = useState(false);

  useLayoutEffect(() => {
    if (userEmail !== 'finedust@finedust.com') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userEmail]);

  return (
    <Wrapper location={location.pathname}>
      <div className="contents">
        <ul>
          <Link to="/">
            <li>
              <MyLocationIcon fillOpacity="100" />
            </li>
          </Link>
          <Link to="/location">
            <li>
              <LocationsIcon fillOpacity="100" />
            </li>
          </Link>
          {isLogin ? (
            <Link to="/favorites">
              <li>
                <FavoritesIcon fillOpacity="100" />
              </li>
            </Link>
          ) : (
            ''
          )}
        </ul>
      </div>

      <div className="bgGradation" />
    </Wrapper>
  );
}

export default Gnb;
