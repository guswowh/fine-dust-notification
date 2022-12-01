import axios from 'axios';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Dropdown from '../../components/DropDown.tsx';

interface Test {
  pm10Grade: string;
  stationName: string;
}

function Location() {
  const url = import.meta.env.VITE_SERVICE_URL;
  const [postData, setPostData] = useState([]);

  const [agedropdownVisibility, setAgeDropdownVisibility] = useState(false);
  const [cityName, setCityName] = useState('서울');
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [dropDownList, setDropDownList] = useState([]);

  const userChangeCity = () => {
    setAgeDropdownVisibility(!agedropdownVisibility);
  };

  const userSelectCity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent }: any = e.target;
    setCityName(textContent);
    setAgeDropdownVisibility(!agedropdownVisibility);
  };

  useEffect(() => {
    const filterCityList: any = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownList(filterCityList);
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
        {postData.map((post: Test) => (
          <div key={post.stationName}>
            <p>
              {post.pm10Grade === '1' ? '좋음' : ''}
              {post.pm10Grade === '2' ? '보통' : ''}
              {post.pm10Grade === '3' ? '한때나쁨' : ''}
              {post.pm10Grade === '4' ? '나쁨' : ''}
              {post.pm10Grade === '5' ? '매우나쁨' : ''}
              {post.pm10Grade === null ? '알수없음' : ''}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Location;
