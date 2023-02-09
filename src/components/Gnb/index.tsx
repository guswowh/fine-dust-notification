import { signOut } from 'firebase/auth';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebace';
import { useAppDispatch, useAppSelector } from '../../store';
import { validateLoginStatus } from '../../store/slices/locationSlice';
import {
  DropDownIconOff,
  DropDownIconOn,
  FavoritesIcon,
  LocationsIcon,
  MyLocationIcon,
} from '../icons';
import Wrapper from './style';

interface Props {
  buttonName?: string;
}

function Gnb({ buttonName }: Props) {
  const location = useLocation();
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [isLogin, setIsLogin] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);
  const [isButtonVisibility, setIsButtonVisibility] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const userButtonHandler = () => {
    setIsButtonVisibility(!isButtonVisibility);
  };

  const userSingOutHandeler = () => {
    signOut(auth)
      .then(() => {
        dispatch(validateLoginStatus(false));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <Wrapper location={location.pathname}>
      <div className="dropDownMenuContainer">
        <button className="onIcon" type="button" onClick={userButtonHandler}>
          {isButtonVisibility ? <DropDownIconOff /> : <DropDownIconOn />}
        </button>
        {isButtonVisibility ? (
          <div className="menuContainer">
            {isLogin ? (
              <Link to="/signUp">
                <button
                  className="button"
                  type="button"
                  onClick={userSingOutHandeler}
                >
                  Sign Out
                </button>
              </Link>
            ) : (
              <>
                <Link to="/signIn">
                  <button className="button" type="button">
                    Sign In
                  </button>
                </Link>
                <Link to="/signUp">
                  <button className="button" type="button">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {isVisibility ? (
              <Link to="/">
                <button className="button" type="button">
                  Home
                </button>
              </Link>
            ) : (
              ''
            )}

            {/* <button type="button">Sing Out</button> */}
          </div>
        ) : (
          ''
        )}
      </div>
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
