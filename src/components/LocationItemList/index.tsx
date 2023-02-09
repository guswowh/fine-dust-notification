import React from 'react';
import LocationItem from '../LocationItem';
import Wrapper from './style';

interface CityCheckHandler {
  (id: string): void;
}

interface UserPost {
  cityCheckHandler?: CityCheckHandler;
  mapList: MapList[];
}

interface MapList {
  cityName: string;
  stationName: string;
  fineDust: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

function LocationItemList({ mapList, cityCheckHandler }: UserPost) {
  return (
    <Wrapper>
      <ul className="contents">
        {mapList.map((post: MapList) => (
          <li key={post.stationName}>
            <LocationItem post={post} cityCheckHandler={cityCheckHandler} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

LocationItemList.defaultProps = {
  cityCheckHandler: null,
};

export default LocationItemList;
