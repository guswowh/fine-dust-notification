import React from 'react';
import { useAppSelector } from '../../store';

function WishList() {
  const location = useAppSelector((state) => state.LocationSlice);
  console.log(location);

  return <div>WishList</div>;
}

export default WishList;
