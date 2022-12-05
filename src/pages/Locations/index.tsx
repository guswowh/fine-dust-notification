import axios from 'axios';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../components/DropDown.tsx';
import LocationList from '../../components/LocationItem';
import { wishList } from '../../store/slices/LocationSlice';

export interface Post {
  provinceName: string;
  fineDust: string;
  isCheck: boolean;
}

interface PostDataList {
  stationName: string;
  pm10Grade: string;
  dataTime: string;
  pm25Value: string;
}

interface LocationFineDustInfo {
  cityName: string;
  dateTime: string;
  fineDust: string;
  fineDustConcentration: string;
  isCheck: boolean;
  provinceName: string;
}

function Location() {
  const url = import.meta.env.VITE_SERVICE_URL;
  const [postData, setPostData] = useState([]);
  const [agedropdownVisibility, setAgeDropdownVisibility] = useState(false);
  const [cityName, setCityName] = useState('서울');
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [dropDownList, setDropDownList] = useState([]);
  const [locationFineDustInfo, setLocationFineDustInfo] = useState([]);
  const dispatch = useDispatch();

  const userChangeCity = () => {
    setAgeDropdownVisibility(!agedropdownVisibility);
  };

  const userSelectCity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setAgeDropdownVisibility(!agedropdownVisibility);
  };

  useEffect(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownList(filterCityList as never);
  }, [cityName]);

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
      const response = await axios.get(url, { params: getParameters }); // API 호출
      setPostData(response.data.response.body.items);
    } catch (e) {
      console.log(e);
    }
  }, [getParameters, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const postDataList = postData.map((item: PostDataList) => {
      return {
        cityName,
        provinceName: item.stationName,
        fineDust: item.pm10Grade,
        dateTime: item.dataTime,
        fineDustConcentration: item.pm25Value,
        isCheck: false,
      };
    });
    setLocationFineDustInfo(postDataList as never);
  }, [postData, cityName]);

  useEffect(() => {
    dispatch(wishList(locationFineDustInfo));
  }, [locationFineDustInfo, dispatch]);

  const cityCheckHandler = (id: string) => {
    setLocationFineDustInfo(
      locationFineDustInfo.map((item: LocationFineDustInfo) =>
        item.provinceName === id ? { ...item, isCheck: !item.isCheck } : item
      ) as never
    );
  };

  return (
    <div>
      <ul>
        <button type="button" onClick={userChangeCity}>
          {cityName}
        </button>
        <Dropdown visibility={agedropdownVisibility}>
          {dropDownList.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectCity}>
                {item}
              </button>
            </li>
          ))}
        </Dropdown>
        {locationFineDustInfo.map((post: Post) => (
          <LocationList
            key={post.provinceName}
            post={post}
            cityCheckHandler={cityCheckHandler}
          />
        ))}
      </ul>
    </div>
  );
}

export default Location;
