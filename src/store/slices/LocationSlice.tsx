import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  checkedList: [],
};

export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    wishList: (state, action) => {
      // console.log(action.payload);
    },
  },
});

export const { wishList } = LocationSlice.actions;
