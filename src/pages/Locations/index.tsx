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
import { wishList } from '../../store/slices/LocationSlice';

export interface Post {
  stationName: string;
  fineDust: string;
  isCheck: boolean;
}

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  locationFineDustInfo: never[];
  setLocationFineDustInfo: Dispatch<SetStateAction<never[]>>;
}

interface LocationFineDustInfo {
  cityName: string;
  dateTime: string;
  fineDust: string;
  fineDustConcentration: string;
  isCheck: boolean;
  stationName: string;
}

function Location({
  cityName,
  setCityName,
  locationFineDustInfo,
  setLocationFineDustInfo,
}: Props) {
  const [cityDropdownVisibility, setCityDropdownVisibility] = useState(false);
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [dropDownList, setDropDownList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownList(filterCityList as never);
  }, [cityName]);

  useEffect(() => {
    dispatch(wishList(locationFineDustInfo));
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
      ) as never
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
      {locationFineDustInfo.map((post: Post) => (
        <LocationList
          key={post.stationName}
          post={post}
          cityCheckHandler={cityCheckHandler}
        />
      ))}
    </div>
  );
}

export default Location;
