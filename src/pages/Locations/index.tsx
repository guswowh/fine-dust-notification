import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../components/DropDown.tsx';
import LocationList from '../../components/LocationItem';
import { useAppSelector } from '../../store';
import { favorites } from '../../store/slices/LocationSlice';

interface Post {
  stationName: string;
  fineDust: string;
  isCheck: boolean;
}

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  locationFineDustInfo: {
    cityName: string;
    stationName: string;
    fineDust: string;
    dateTime: string;
    fineDustConcentration: string;
    isCheck: boolean;
  }[];
  setLocationFineDustInfo: Dispatch<SetStateAction<LocationFineDustInfo[]>>;
  isLoading: boolean;
}

interface LocationFineDustInfo {
  cityName: string;
  stationName: string;
  fineDust: string;
  dateTime: string;
  fineDustConcentration: string;
  isCheck: boolean;
}

function Location({
  cityName,
  setCityName,
  locationFineDustInfo,
  setLocationFineDustInfo,
  isLoading,
}: Props) {
  const [cityDropdownVisibility, setCityDropdownVisibility] = useState(false);
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [dropDownList, setDropDownList] = useState(['']);
  const dispatch = useDispatch();
  const location = useAppSelector((state) => state.LocationSlice);

  useEffect(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownList(filterCityList);
  }, [cityName]);

  useEffect(() => {
    dispatch(favorites(locationFineDustInfo));
  }, [locationFineDustInfo, dispatch]);

  const userChangeCity = () => {
    setCityDropdownVisibility(!cityDropdownVisibility);
  };

  const userSelectCity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { textContent } = e.target as HTMLButtonElement;
    setCityName(textContent as string);
    setCityDropdownVisibility(!cityDropdownVisibility);
  };

  const cityCheckHandler = (id: string) => {
    setLocationFineDustInfo(
      locationFineDustInfo.map((item: LocationFineDustInfo) =>
        item.stationName === id ? { ...item, isCheck: !item.isCheck } : item
      )
    );
  };

  return (
    <div>
      <ul>
        <button type="button" onClick={userChangeCity}>
          {cityName}
        </button>
        <Dropdown visibility={cityDropdownVisibility}>
          {dropDownList.map((item) => (
            <li key={item}>
              <button type="button" onClick={userSelectCity}>
                {item}
              </button>
            </li>
          ))}
        </Dropdown>
      </ul>
      {isLoading ? (
        '로딩중'
      ) : (
        <div>
          {location.checkedList.map((post: Post) => (
            <LocationList
              key={post.stationName}
              post={post}
              cityCheckHandler={cityCheckHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Location;
