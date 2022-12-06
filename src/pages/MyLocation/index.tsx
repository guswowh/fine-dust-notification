import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import Dropdown from '../../components/DropDown.tsx';
import LocationList from '../../components/LocationItem';

export interface Post {
  stationName: string;
  cityName: string;
  fineDust: string;
  isCheck: boolean;
}

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  locationFineDustInfo: never[];
  stationName: string;
  setStationName: Dispatch<SetStateAction<string>>;
}

interface LocationFineDustInfo {
  cityName: string;
  dateTime: string;
  fineDust: string;
  fineDustConcentration: string;
  isCheck: boolean;
  stationName: string;
}

interface DropDown {
  stationName: string;
}

function MyLocation({
  cityName,
  setCityName,
  locationFineDustInfo,
  stationName,
  setStationName,
}: // stationList,
Props) {
  const [cityDropdownVisibility, setCityDropdownVisibility] = useState(false);
  const [stationDropdownVisibility, setStationDropdownVisibility] =
    useState(false);
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [dropDownCityList, setDropDownCityList] = useState([]);
  const [dropDownStationList, setDropDownStationList] = useState([]);
  const [stationFineDustInfo, setStationFineDustInfo] = useState([]);

  useEffect(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    setDropDownCityList(filterCityList as never);
  }, [cityName]);

  useEffect(() => {
    const filter = locationFineDustInfo.filter((item: DropDown) => {
      return item.stationName !== stationName;
    });

    const filterData = filter.map((item: DropDown) => {
      return item.stationName;
    });

    setDropDownStationList(filterData as never);
  }, [locationFineDustInfo, stationName]);

  useEffect(() => {
    const filterPostDataList = locationFineDustInfo.filter(
      (item: LocationFineDustInfo) => {
        return item.stationName === stationName;
      }
    );
    setStationFineDustInfo(filterPostDataList);
  }, [stationName, locationFineDustInfo]);

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
