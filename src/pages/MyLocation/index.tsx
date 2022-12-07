import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import Dropdown from '../../components/DropDown';
import LocationList from '../../components/LocationItem';

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
  stationName: string;
  setStationName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export interface Post {
  stationName: string;
  cityName: string;
  fineDust: string;
  isCheck: boolean;
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
  isLoading,
}: Props) {
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const [stationFineDustInfo, setStationFineDustInfo] = useState([
    {
      cityName: '',
      stationName: '',
      fineDust: '',
      dateTime: '',
      fineDustConcentration: '',
      isCheck: false,
    },
  ]);

  const dropDownCityList = useMemo(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    return filterCityList;
  }, [cityName]);

  const dropDownStationList = useMemo(() => {
    const filter = locationFineDustInfo.filter((item: DropDown) => {
      return item.stationName !== stationName;
    });

    const filterData = filter.map((item: DropDown) => {
      return item.stationName;
    });
    return filterData;
  }, [locationFineDustInfo, stationName]);

  useEffect(() => {
    const filterPostDataList = locationFineDustInfo.filter((item) => {
      return item.stationName === stationName;
    });
    setStationFineDustInfo(filterPostDataList);
  }, [stationName, locationFineDustInfo]);

  return (
    <div>
      <Dropdown
        cityName={cityName}
        setCityName={setCityName}
        itemList={dropDownCityList}
      />
      <Dropdown
        cityName={stationName}
        setCityName={setStationName}
        itemList={dropDownStationList}
      />
      {isLoading ? (
        '로딩중'
      ) : (
        <div>
          {stationFineDustInfo.map((post: Post) => (
            <LocationList key={post.stationName} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLocation;
