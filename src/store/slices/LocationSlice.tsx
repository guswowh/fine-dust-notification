/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const asyncUpFetch = createAsyncThunk(
  'locationSlice/asyncUpFetch',
  async (cityName: string) => {
    const response = await axios.get(
      'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {
        params: {
          serviceKey:
            'B32FyO4r1il7R2cjyPyL1YCjNknWvY+7eQ66ZFvPPog06QXvBZ4F65RJxbHjwJ01o7iXCsS71hX367sokvnHcw==',
          returnType: 'json',
          numOfRows: '100',
          pageNo: '1',
          sidoName: cityName,
          ver: '1.0',
        },
      }
    ); // API 호출
    return response.data.response.body.items;
  }
);

const initialState: LocationState = {
  isLoading: true,
  isError: false,
  postData: {},
  checkedList: [],
};

interface LocationState {
  isLoading: boolean;
  isError: boolean;
  postData: any;
  checkedList: [];
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    favorites: (state, action) => {
      state.checkedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.postData = action;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(asyncUpFetch.rejected, (state, action) => {
      state.postData = action;
      state.isError = true;
    });
  },
});

export const { favorites } = locationSlice.actions;
export { asyncUpFetch };
