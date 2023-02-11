import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useLayoutEffect,
} from 'react';
import Dropdown from '../../components/DropDown';
import LocationItem from '../../components/LocationItem';
import Spinner from '../../components/Spinner';
import TitleSpace from '../../components/TitleSpace';
import { useAppDispatch, useAppSelector } from '../../store';
import * as S from './style';
import { getFavoriteList } from '../../store/slices/locationSlice';
import Gnb from '../../components/Gnb';

interface Props {
  cityName: string;
  setCityName: Dispatch<SetStateAction<string>>;
  locationFineDustInfo: {
    cityName: string;
    stationName: string;
    fineDust: string;
    fineDustValue: string;
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
  fineDustValue: string;
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
      fineDustValue: '',
      dateTime: '',
      fineDustConcentration: '',
      isCheck: false,
    },
  ]);

  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [userName, setUserName] = useState<string | undefined>('');
  const isLogin = useAppSelector((state) => state.locationSlice.isLogin);
  const dispatch = useAppDispatch();

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

  useLayoutEffect(() => {
    const userEmailSplit: string | undefined = userEmail?.split('@')[0];
    setUserName(userEmailSplit);
    dispatch(getFavoriteList());
  }, [dispatch, isLogin, userEmail]);

  useEffect(() => {
    const filterPostDataList = locationFineDustInfo.filter((item) => {
      return item.stationName === stationName;
    });

    setStationFineDustInfo(filterPostDataList);
  }, [stationName, locationFineDustInfo]);

  return (
    <S.Wrapper>
      <TitleSpace title="my location" userName={userName} />
      <ul className="menuSpace">
        <li>
          <Dropdown
            cityName={cityName}
            setCityName={setCityName}
            itemList={dropDownCityList}
          />
        </li>
        <li>
          <Dropdown
            cityName={stationName}
            setCityName={setStationName}
            itemList={dropDownStationList}
          />
        </li>
      </ul>
      {isLoading ? (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      ) : (
        <div className="contents">
          {stationFineDustInfo.map((post: Post) => (
            <LocationItem key={post.stationName} post={post} />
          ))}
        </div>
      )}
      <Gnb />
    </S.Wrapper>
  );
}

export default MyLocation;
