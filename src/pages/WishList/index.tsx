import React, { useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import LocationList from '../../components/LocationItem';
import { wishList } from '../../store/slices/LocationSlice';

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

function WishList({ locationFineDustInfo, setLocationFineDustInfo }: Props) {
  const location = useAppSelector((state) => state.LocationSlice);
  const dispatch = useDispatch();

  const filterList = useMemo(() => {
    const filterItem = location.checkedList.filter((item: FilterItem) => {
      return item.isCheck === true;
    });
    return filterItem;
  }, [location.checkedList]);

  useEffect(() => {
    dispatch(wishList(locationFineDustInfo));
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
      {filterList.map((post: Post) => (
        <LocationList
          key={post.stationName}
          post={post}
          cityCheckHandler={cityCheckHandler}
        />
      ))}
    </div>
  );
}

export default WishList;
