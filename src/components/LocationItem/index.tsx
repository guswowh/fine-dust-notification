import { useLocation } from 'react-router-dom';

interface CityCheckHandler {
  (id: string): void;
}

interface UserPost {
  post: {
    stationName: string;
    fineDust: string;
    isCheck: boolean;
  };
  cityCheckHandler?: CityCheckHandler;
}

function LocationList({ post, cityCheckHandler }: UserPost) {
  const location = useLocation();

  return (
    <div key={post.stationName}>
      <p>
        {post.fineDust === '1' ? '좋음' : ''}
        {post.fineDust === '2' ? '보통' : ''}
        {post.fineDust === '3' ? '한때나쁨' : ''}
        {post.fineDust === '4' ? '나쁨' : ''}
        {post.fineDust === '5' ? '매우나쁨' : ''}
        {post.fineDust === null ? '알수없음' : ''}
      </p>
      {location.pathname === '/location' ? (
        <button
          type="button"
          onClick={() =>
            cityCheckHandler !== undefined && cityCheckHandler(post.stationName)
          }
        >
          {post.isCheck ? '선택' : '취소'}
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

LocationList.defaultProps = {
  cityCheckHandler: null,
};

export default LocationList;
