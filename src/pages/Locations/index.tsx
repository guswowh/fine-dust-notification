import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '../../components/DropDown';
import LocationItemList from '../../components/LocationItemList';
import TitleSpace from '../../components/TitleSpace';
import { useAppSelector } from '../../store';
import { favorites } from '../../store/slices/locationSlice';
import * as S from './style';

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
  const location = useAppSelector((state) => state.locationSlice);

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
    <S.Wrapper>
      <TitleSpace title="locations" userName="hyun jae cho" />
      <ul className="menuSpace">
        <li>
          <Dropdown
            cityName={cityName}
            setCityName={setCityName}
            itemList={dropDownCityList}
          />
        </li>
      </ul>

      {isLoading ? (
        '로딩중'
      ) : (
        <LocationItemList
          mapList={location.checkedList}
          cityCheckHandler={cityCheckHandler}
        />
      )}
    </S.Wrapper>
  );
}

export default Location;
