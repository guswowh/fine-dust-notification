import React, {
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
  useState,
  useLayoutEffect,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  favoritesList,
  getFavoriteList,
  updateFavoriteList,
} from '../../store/slices/locationSlice';
import LocationItemList from '../../components/LocationItemList';
import TitleSpace from '../../components/TitleSpace';
import Gnb from '../../components/Gnb';

interface Props {
  cityName: string;
  locationFineDustInfo: {
    cityName: string;
    stationName: string;
    fineDust: string;
    dateTime: string;
    fineDustConcentration: string;
    isCheck: boolean;
  }[];
  setLocationFineDustInfo: Dispatch<SetStateAction<LocationFineDustInfo[]>>;
}

export interface Post {
  stationName: string;
  fineDust: string;
  isCheck: boolean;
}

interface LocationFineDustInfo {
  cityName: string;
  stationName: string;
  fineDust: string;
  dateTime: string;
  fineDustConcentration: string;
  isCheck: boolean;
}

interface FilterItem {
  isCheck: boolean;
}

function Favorites({
  cityName,
  locationFineDustInfo,
  setLocationFineDustInfo,
}: Props) {
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [userName, setUserName] = useState<string | undefined>('');
  const location = useAppSelector((state) => state.locationSlice);
  const dispatch = useAppDispatch();

  const filterList = useMemo(() => {
    const filterItem = location.checkedList.filter((item: FilterItem) => {
      return item.isCheck === true;
    });
    return filterItem;
  }, [location.checkedList]);

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

  const cityCheckHandler = (id: string) => {
    setLocationFineDustInfo(
      locationFineDustInfo.map((item: LocationFineDustInfo) =>
        item.stationName === id ? { ...item, isCheck: !item.isCheck } : item
      )
    );
    dispatch(updateFavoriteList(cityName));
  };

  return (
    <div>
      <TitleSpace title="favorites" userName={userName} />
      <LocationItemList
        mapList={filterList}
        cityCheckHandler={cityCheckHandler}
      />
      <Gnb />
    </div>
  );
}

export default Favorites;
