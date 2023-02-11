import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  favoritesList,
  getFavoriteList,
  updateFavoriteList,
} from '../../store/slices/locationSlice';
import LocationItemList from '../../components/LocationItemList';
import TitleSpace from '../../components/TitleSpace';
import Gnb from '../../components/Gnb';

interface Post {
  stationName: string;
  cityName: string;
  fineDust: string;
  fineDustValue: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

interface FilterItem {
  isCheck: boolean;
}

function Favorites() {
  const userEmail = useAppSelector((state) => state.locationSlice.userEmail);
  const [userName, setUserName] = useState<string | undefined>('');
  const dispatch = useAppDispatch();
  const checkedListDB = useAppSelector(
    (state) => state.locationSlice.checkedListDB
  );
  const [fineDustInfo, setFineDustInfo] = useState([
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

  useEffect(() => {
    let concatList: any = [];

    if (checkedListDB.length && userEmail) {
      const arrayList = Object.values(checkedListDB[0][userEmail]);
      if (arrayList.length) {
        concatList = arrayList.reduce((acc: any, cur) => {
          return acc.concat(cur);
        });
      }
    }
    setFineDustInfo(concatList);
  }, [checkedListDB, userEmail]);

  const filterList = useMemo(() => {
    const filterItem = fineDustInfo.filter((item: FilterItem) => {
      return item.isCheck;
    });
    return filterItem;
  }, [fineDustInfo]);

  useLayoutEffect(() => {
    const userEmailSplit: string | undefined = userEmail?.split('@')[0];
    setUserName(userEmailSplit);
  }, [userEmail]);

  useEffect(() => {
    dispatch(getFavoriteList());
  }, [dispatch]);

  const cityCheckHandler = (post: Post) => {
    const fineDustInfoList: Post[] = [];
    fineDustInfo.forEach((item: Post) => {
      if (item.cityName === post.cityName) {
        fineDustInfoList.push(item);
      }
    });

    const checkFineDustDispatch = fineDustInfoList.map((item: any) =>
      item.stationName === post.stationName
        ? { ...item, isCheck: !item.isCheck }
        : item
    );

    const checkFineDustview = fineDustInfo.map((item: any) =>
      item.stationName === post.stationName
        ? { ...item, isCheck: !item.isCheck }
        : item
    );
    setFineDustInfo(checkFineDustview);
    dispatch(updateFavoriteList(post.cityName));
    dispatch(favoritesList(checkFineDustDispatch));
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
