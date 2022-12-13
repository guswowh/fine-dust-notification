/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState: LocationState = {
  checkedList: [],
};

interface LocationState {
  checkedList: never[];
}

export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    favorites: (state, action) => {
      state.checkedList = action.payload;
    },
  },
});

export const { favorites } = LocationSlice.actions;
