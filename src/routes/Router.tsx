import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Gnb from '../components/Gnb';
import MyLocation from '../pages/MyLocation';
import Location from '../pages/Locations';
import Favorites from '../pages/Favorites';

interface PostDataList {
  stationName: string;
  pm10Grade: string;
  dataTime: string;
  pm25Value: string;
}

function Router() {
  const url = import.meta.env.VITE_SERVICE_URL;
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

  const getParameters = useMemo(() => {
    return {
      serviceKey:
        'B32FyO4r1il7R2cjyPyL1YCjNknWvY+7eQ66ZFvPPog06QXvBZ4F65RJxbHjwJ01o7iXCsS71hX367sokvnHcw==',
      returnType: 'json',
      numOfRows: '100',
      pageNo: '1',
      sidoName: cityName,
      ver: '1.0',
    };
  }, [cityName]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
        { params: getParameters }
      ); // API 호출
      setPostData(response.data.response.body.items);
      setIsLoading(false);
    } catch (e) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getParameters, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      </Routes>
      <Gnb />
    </>
  );
}

export default Router;
