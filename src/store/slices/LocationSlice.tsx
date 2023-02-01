/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const asyncUpFetch = createAsyncThunk(
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
  postData: [
    {
      coFlag: '',
      coGrade: '',
      coValue: '',
      dataTime: '',
      khaiGrade: '',
      khaiValue: '',
      no2Flag: '',
      no2Grade: '',
      no2Value: '',
      o3Flag: '',
      o3Grade: '',
      o3Value: '',
      pm10Flag: '',
      pm10Grade: '',
      pm10Value: '',
      pm25Flag: '',
      pm25Grade: '',
      pm25Value: '',
      sidoName: '',
      so2Flag: '',
      so2Grade: '',
      so2Value: '',
      stationName: '',
    },
  ],
  checkedList: [],
};

interface PostData {
  coFlag: string;
  coGrade: string;
  coValue: string;
  dataTime: string;
  khaiGrade: string;
  khaiValue: string;
  no2Flag: string;
  no2Grade: string;
  no2Value: string;
  o3Flag: string;
  o3Grade: string;
  o3Value: string;
  pm10Flag: string;
  pm10Grade: string;
  pm10Value: string;
  pm25Flag: string;
  pm25Grade: string;
  pm25Value: string;
  sidoName: string;
  so2Flag: string;
  so2Grade: string;
  so2Value: string;
  stationName: string;
}

interface LocationState {
  isLoading: boolean;
  isError: boolean;
  postData: PostData[];
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
      state.postData = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(asyncUpFetch.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const favoritesList = locationSlice.actions.favorites;
// export const asyncUpFetch
