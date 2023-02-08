import React, { useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  favoritesList,
  getFavoriteList,
} from '../../store/slices/locationSlice';
import LocationItemList from '../../components/LocationItemList';
import TitleSpace from '../../components/TitleSpace';

interface Props {
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

function Favorites({ locationFineDustInfo, setLocationFineDustInfo }: Props) {
  const location = useAppSelector((state) => state.locationSlice);
  const dispatch = useAppDispatch();

  const filterList = useMemo(() => {
    const filterItem = location.checkedList.filter((item: FilterItem) => {
      return item.isCheck === true;
    });
    return filterItem;
  }, [location.checkedList]);

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
  };

  return (
    <div>
      <TitleSpace title="favorites" userName="hyun jea cho" />
      <LocationItemList
        mapList={filterList}
        cityCheckHandler={cityCheckHandler}
      />
    </div>
  );
}

export default Favorites;
