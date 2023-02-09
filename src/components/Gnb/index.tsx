import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { FavoritesIcon, LocationsIcon, MyLocationIcon } from '../icons';
import Wrapper from './style';

interface Props {
  buttonName?: string;
}

function Gnb({ buttonName }: Props) {
  const location = useLocation();
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [isLogin, setIsLogin] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/signUp':
        setIsVisibility(true);
        break;
      case '/signIn':
        setIsVisibility(true);
        break;
      default:
        setIsVisibility(false);
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (userEmail !== 'finedust@finedust.com') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userEmail]);

  return (
    <Wrapper location={location.pathname}>
      {isVisibility ? (
        <>
          <div className="contents">
            <button className="submitButton" type="submit">
              {buttonName}
            </button>
          </div>
          <div className="bgGradation" />
        </>
      ) : (
        <>
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
        </>
      )}
    </Wrapper>
  );
}

Gnb.defaultProps = {
  buttonName: null,
};

export default React.memo(Gnb);
