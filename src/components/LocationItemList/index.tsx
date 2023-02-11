import React from 'react';
import LocationItem from '../LocationItem';
import Wrapper from './style';

interface Post {
  stationName: string;
  cityName: string;
  fineDust: string;
  fineDustValue: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

interface CityCheckHandler {
  (post: Post): void;
}

interface UserPost {
  cityCheckHandler?: CityCheckHandler;
  mapList: MapList[];
}

interface MapList {
  cityName: string;
  stationName: string;
  fineDust: string;
  fineDustValue: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

function LocationItemList({ mapList, cityCheckHandler }: UserPost) {
  const sortByStationName = [...mapList];
  sortByStationName.sort((x, y) => x.stationName.localeCompare(y.stationName));

  return (
    <Wrapper>
      <ul className="contents">
        {sortByStationName.map((post: MapList) => (
          <li key={(post.cityName, post.stationName)}>
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
