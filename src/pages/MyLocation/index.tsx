import axios from 'axios';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { useDispatch } from 'react-redux';
import Dropdown from '../../components/DropDown.tsx';
import LocationList from '../../components/LocationItem';
// import { wishList } from '../../store/slices/LocationSlice';

export interface Post {
  stationName: string;
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
  stationName: string;
}

function MyLocation() {
  const url = import.meta.env.VITE_SERVICE_URL;
  const [postData, setPostData] = useState([]);
  const [cityDropdownVisibility, setCityDropdownVisibility] = useState(false);
  const [stationDropdownVisibility, setStationDropdownVisibility] =
    useState(false);
  const [cityName, setCityName] = useState('서울');
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const stationList: React.MutableRefObject<string[]> = useRef([]);
  const [stationName, setStationName] = useState('');
  const [dropDownCityList, setDropDownCityList] = useState([]);
  const [dropDownStationList, setDropDownStationList] = useState([]);
  const [locationFineDustInfo, setLocationFineDustInfo] = useState([]);
  const [stationFineDustInfo, setStationFineDustInfo] = useState([]);
  // const dispatch = useDispatch();

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
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownCityList(filterCityList as never);
  }, [cityName]);

  useEffect(() => {
    const filterStationList = stationList.current.filter((item) => {
      return item !== stationName;
    });
    setDropDownStationList(filterStationList as never);
  }, [stationName]);

  useEffect(() => {
    const postDataList = postData.map((item: PostDataList) => {
      stationList.current = [...stationList.current, item.stationName];
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
    setLocationFineDustInfo(postDataList as never);
  }, [postData, cityName]);

  useEffect(() => {
    const filterPostDataList = locationFineDustInfo.filter(
      (item: LocationFineDustInfo) => {
        return item.stationName === stationName;
      }
    );
    setStationFineDustInfo(filterPostDataList);
  }, [stationName, locationFineDustInfo]);

  // useEffect(() => {
  //   dispatch(wishList(locationFineDustInfo));
  // }, [locationFineDustInfo, dispatch]);

  const userChangeCity = () => {
    setCityDropdownVisibility(!cityDropdownVisibility);
  };

  const userChangeStation = () => {
    setStationDropdownVisibility(!stationDropdownVisibility);
  };

  const userSelectCity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setCityDropdownVisibility(!cityDropdownVisibility);
  };

  const userSelectStation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setStationName(textContent as string);
    setStationDropdownVisibility(!stationDropdownVisibility);
  };

  // const cityCheckHandler = (id: string) => {
  //   setLocationFineDustInfo(
  //     locationFineDustInfo.map((item: LocationFineDustInfo) =>
  //       item.stationName === id ? { ...item, isCheck: !item.isCheck } : item
  //     ) as never
  //   );
  // };

  return (
    <div>
      <ul>
        <li>
          <button type="button" onClick={userChangeCity}>
            {cityName}
          </button>
        </li>
        <Dropdown visibility={cityDropdownVisibility}>
          {dropDownCityList.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectCity}>
                {item}
              </button>
            </li>
          ))}
        </Dropdown>
      </ul>
      <ul>
        <li>
          <button type="button" onClick={userChangeStation}>
            {stationName}
          </button>
        </li>
        <Dropdown visibility={stationDropdownVisibility}>
          {dropDownStationList.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectStation}>
                {item}
              </button>
            </li>
          ))}
        </Dropdown>
      </ul>
      {stationFineDustInfo.map((post: Post) => (
        <LocationList key={post.stationName} post={post} />
      ))}
    </div>
  );
}

export default MyLocation;
