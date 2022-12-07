import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../components/DropDown';
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
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const dispatch = useDispatch();
  const location = useAppSelector((state) => state.LocationSlice);

  const dropDownCityList = useMemo(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    return filterCityList;
  }, [cityName]);

  useEffect(() => {
    dispatch(favorites(locationFineDustInfo));
  }, [locationFineDustInfo, dispatch]);

  const cityCheckHandler = (id: string) => {
    setLocationFineDustInfo(
      locationFineDustInfo.map((item: LocationFineDustInfo) =>
        item.stationName === id ? { ...item, isCheck: !item.isCheck } : item
      )
    );
  };

  return (
    <div>
      <Dropdown
        cityName={cityName}
        setCityName={setCityName}
        itemList={dropDownCityList}
      />
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
