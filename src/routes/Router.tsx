import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Gnb from '../components/Gnb';
import MyLocation from '../pages/MyLocation';
import Location from '../pages/Locations';
import WishList from '../pages/WishList';

function Router() {
  return (
    <>
      <Routes>
        <Route path="my-location" element={<MyLocation />} />
        <Route path="location" element={<Location />} />
        <Route path="wish-list" element={<WishList />} />
      </Routes>
      <Gnb />
    </>
  );
}

export default Router;
