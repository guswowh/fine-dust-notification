import { useLocation } from 'react-router-dom';
import { GootUiIcon, OffCheckIcon, OnCheckIcon } from '../icons';
import * as S from './style';

interface Post {
  stationName: string;
  fineDust: string;
  isCheck: boolean;
  fineDustConcentration?: string;
  dateTime?: string;
}

interface CityCheckHandler {
  (id: string): void;
}

interface UserPost {
  post: Post;
  cityCheckHandler?: CityCheckHandler;
}

function LocationList({ post, cityCheckHandler }: UserPost) {
  const location = useLocation();

  return (
    <S.Wrapper key={post.stationName}>
      <div className="inner">
        <ul className="contents">
          <li>
            <GootUiIcon />
          </li>
          <li>
            <p className="fineDust">
              {post.fineDust === '1' ? 'good' : ''}
              {post.fineDust === '2' ? 'normal' : ''}
              {post.fineDust === '3' ? 'a bit bad' : ''}
              {post.fineDust === '4' ? 'bad' : ''}
              {post.fineDust === '5' ? 'too bad' : ''}
              {post.fineDust === null ? 'unknown' : ''}
            </p>
            <p className="concentration">
              미세먼지 농도: {post.fineDustConcentration}
            </p>
            <p className="dateTime">{post.dateTime} 기준</p>
            <p />

            {location.pathname !== '/' ? (
              <button
                className="checkIcon"
                type="button"
                onClick={() =>
                  cityCheckHandler !== undefined &&
                  cityCheckHandler(post.stationName)
                }
              >
                {post.isCheck ? <OnCheckIcon /> : <OffCheckIcon />}
              </button>
            ) : (
              ''
            )}
          </li>
        </ul>
      </div>
    </S.Wrapper>
  );
}

LocationList.defaultProps = {
  cityCheckHandler: null,
};

export default LocationList;
