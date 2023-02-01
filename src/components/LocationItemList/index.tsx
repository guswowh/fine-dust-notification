import React from 'react';
import LocationItem from '../LocationItem';
import * as S from './style';

interface CityCheckHandler {
  (id: string): void;
}

interface UserPost {
  cityCheckHandler?: CityCheckHandler;
  mapList: MapList[];
}

interface MapList {
  stationName: string;
  fineDust: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

function LocationItemList({ mapList, cityCheckHandler }: UserPost) {
  return (
    <S.Wrapper>
      <ul className="contents">
        {mapList.map((post: MapList) => (
          <li key={post.stationName}>
            <LocationItem post={post} cityCheckHandler={cityCheckHandler} />
          </li>
        ))}
      </ul>
    </S.Wrapper>
  );
}

LocationItemList.defaultProps = {
  cityCheckHandler: null,
};

export default LocationItemList;
