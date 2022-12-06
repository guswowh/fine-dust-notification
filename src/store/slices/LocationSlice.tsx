/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState: LocationState = {
  locationsList: [],
  checkedList: [],
};

interface LocationState {
  locationsList: string[];
  checkedList: string[];
}

export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locations: (state, action) => {
      state.locationsList = action.payload;
    },
    wishList: (state, action) => {
      state.checkedList = action.payload;
    },
  },
});

export const { locations, wishList } = LocationSlice.actions;
