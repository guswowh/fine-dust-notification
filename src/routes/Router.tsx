import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Gnb from '../components/Gnb';
import MyLocation from '../pages/MyLocation';
import Location from '../pages/Locations';
import Favorites from '../pages/Favorites';
import { asyncUpFetch } from '../store/slices/locationSlice';
import { useAppDispatch, useAppSelector } from '../store';
import ErrorPage from '../pages/ErrorPage';

interface PostDataList {
  stationName: string;
  pm10Grade: string;
  dataTime: string;
  pm25Value: string;
}

function Router() {
  const dispatch = useAppDispatch();
  const postDataPayload = useAppSelector(
    (state) => state.locationSlice.postData.payload
  );
  const isLoadingPayload = useAppSelector(
    (state) => state.locationSlice.isLoading
  );
  const isErrorPayload = useAppSelector((state) => state.locationSlice.isError);
  const [postData, setPostData] = useState([]);
  const [cityName, setCityName] = useState('서울');
  const [locationFineDustInfo, setLocationFineDustInfo] = useState([
    {
      cityName: '',
      stationName: '',
      fineDust: '',
      dateTime: '',
      fineDustConcentration: '',
      isCheck: false,
    },
  ]);
  const [stationName, setStationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncUpFetch(cityName));
  }, [cityName, dispatch]);

  useEffect(() => {
    if (postDataPayload) {
      setPostData(postDataPayload);
    }
    setIsLoading(isLoadingPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDataPayload?.length]);

  useEffect(() => {
    if (isErrorPayload) {
      navigate('errorPage');
    }
  }, [isErrorPayload, navigate]);

  useEffect(() => {
    const postDataList = postData.map((item: PostDataList) => {
      return {
        cityName,
        stationName: item.stationName,
        fineDust: item.pm10Grade,
        dateTime: item.dataTime,
        fineDustConcentration: item.pm25Value,
        isCheck: false,
      };
    });
    setStationName(postDataList[0]?.stationName);
    setLocationFineDustInfo(postDataList);
  }, [postData, cityName]);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <MyLocation
              cityName={cityName}
              setCityName={setCityName}
              locationFineDustInfo={locationFineDustInfo}
              stationName={stationName}
              setStationName={setStationName}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="location"
          element={
            <Location
              cityName={cityName}
              setCityName={setCityName}
              locationFineDustInfo={locationFineDustInfo}
              setLocationFineDustInfo={setLocationFineDustInfo}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="favorites"
          element={
            <Favorites
              locationFineDustInfo={locationFineDustInfo}
              setLocationFineDustInfo={setLocationFineDustInfo}
            />
          }
        />
        <Route path="errorPage" element={<ErrorPage />} />
      </Routes>
      <Gnb />
    </>
  );
}

export default Router;
