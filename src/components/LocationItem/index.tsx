// import { Post } from '../../pages/Locations';

interface CityCheckHandler {
  (id: string): void;
}

interface UserPost {
  post: {
    provinceName: string;
    fineDust: string;
    isCheck: boolean;
  };
  cityCheckHandler: CityCheckHandler;
}

function LocationList({ post, cityCheckHandler }: UserPost) {
  return (
    <div key={post.provinceName}>
      <p>
        {post.fineDust === '1' ? '좋음' : ''}
        {post.fineDust === '2' ? '보통' : ''}
        {post.fineDust === '3' ? '한때나쁨' : ''}
        {post.fineDust === '4' ? '나쁨' : ''}
        {post.fineDust === '5' ? '매우나쁨' : ''}
        {post.fineDust === null ? '알수없음' : ''}
      </p>
      <button type="button" onClick={() => cityCheckHandler(post.provinceName)}>
        {post.isCheck ? '선택' : '취소'}
      </button>
    </div>
  );
}

export default LocationList;
