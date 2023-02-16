import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react';
import Dropdown from '../../components/DropDown';
import Gnb from '../../components/Gnb';
import LocationItemList from '../../components/LocationItemList';
import Spinner from '../../components/Spinner';
import TitleSpace from '../../components/TitleSpace';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  favoritesList,
  getFavoriteList,
  updateFavoriteList,
} from '../../store/slices/locationSlice';
import * as S from './style';

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
  setLocationFineDustInfo: Dispatch<SetStateAction<LocationFineDustInfo[]>>;
  isLoading: boolean;
}

interface LocationFineDustInfo {
  cityName: string;
  stationName: string;
  fineDust: string;
  fineDustValue: string;
  dateTime: string;
  fineDustConcentration: string;
  isCheck: boolean;
}

interface Post {
  stationName: string;
  cityName: string;
  fineDust: string;
  fineDustValue: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

function Location({
  cityName,
  setCityName,
  locationFineDustInfo,
  setLocationFineDustInfo,
  isLoading,
}: Props) {
  const cityList = useRef(['서울', '경기', '인천', '대구', '부산']);
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [userName, setUserName] = useState<string | undefined>('');
  const dispatch = useAppDispatch();
  const checkedList = useAppSelector(
    (state) => state.locationSlice.checkedList
  );

  const dropDownCityList = useMemo(() => {
    const filterCityList = cityList.current.filter((item) => {
      return item !== cityName;
    });
    return filterCityList;
  }, [cityName]);

  useLayoutEffect(() => {
    const userEmailSplit: string | undefined = userEmail?.split('@')[0];
    setUserName(userEmailSplit);
  }, [userEmail]);

  useEffect(() => {
    dispatch(getFavoriteList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(favoritesList(locationFineDustInfo));
  }, [locationFineDustInfo, dispatch]);

  const cityCheckHandler = (post: Post) => {
    setLocationFineDustInfo(
      locationFineDustInfo.map((item: LocationFineDustInfo) =>
        item.stationName === post.stationName
          ? { ...item, isCheck: !item.isCheck }
          : item
      )
    );
    dispatch(updateFavoriteList(cityName));
  };

  return (
    <S.Wrapper>
      <TitleSpace title="locations" userName={userName} />
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
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      ) : (
        <LocationItemList
          mapList={checkedList}
          cityCheckHandler={cityCheckHandler}
        />
      )}
      <Gnb />
    </S.Wrapper>
  );
}

export default React.memo(Location);
