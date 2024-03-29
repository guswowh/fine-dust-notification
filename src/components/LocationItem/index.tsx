import { useLocation } from 'react-router-dom';
import {
  ABitBadUiIcon,
  BadUiIcon,
  GootUiIcon,
  NormalUiIcon,
  OffCheckIcon,
  OnCheckIcon,
  TooBadUiIcon,
  UnknownUiIcon,
} from '../icons';
import Wrapper from './style';

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
  cityCheckHandler?: CityCheckHandler | undefined;
}

function LocationItem({ post, cityCheckHandler }: UserPost) {
  const location = useLocation();

  return (
    <Wrapper key={post.stationName}>
      <div className="inner">
        <ul className="contents">
          <li>
            {post.fineDust === '1' ? <GootUiIcon /> : ''}
            {post.fineDust === '2' ? <NormalUiIcon /> : ''}
            {post.fineDust === '3' ? <ABitBadUiIcon /> : ''}
            {post.fineDust === '4' ? <BadUiIcon /> : ''}
            {post.fineDust === '5' ? <TooBadUiIcon /> : ''}
            {post.fineDust === null ? <UnknownUiIcon /> : ''}
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
            <p className="stationName">{post.stationName}</p>
            <p className="fineDustInfo">미세먼지 농도: {post.fineDust}</p>
            <p className="fineDustInfo">{post.dateTime} 기준</p>

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
    </Wrapper>
  );
}

LocationItem.defaultProps = {
  cityCheckHandler: null,
};

export default LocationItem;
