/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import { string } from 'prop-types';
import { auth, db } from '../../config/firebace';

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

export const getFavoriteList = createAsyncThunk(
  'locationSlice/getFavoriteList',
  async () => {
    const data = await getDocs(collection(db, 'favorites'));
    const filteredData = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    return filteredData;
  }
);

export const updateFavoriteList = createAsyncThunk(
  'locationSlice/updateFavoriteList',
  async (cityName: string) => {
    const favoriteDoc = doc(db, 'favorites', '0hAEaTo8wv2lpDVAJ86T');
    return { favoriteDoc, cityName };
    // return updateDoc(favoriteDoc);
  }
);

const initialState: LocationState = {
  isLoading: true,
  isError: false,
  postData: [],
  checkedList: [],
  checkedListDB: [],
  userEmail: 'fine dust',
  selectCityName: '',
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
  checkedListDB: [];
  userEmail: string;
  selectCityName: string;
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
    // asyncUpFetch
    builder.addCase(asyncUpFetch.pending, (state, action) => {
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

    // getFavoriteList
    builder.addCase(getFavoriteList.fulfilled, (state, action: any) => {
      state.checkedListDB = action.payload;
      const emailSplit: any = auth.currentUser?.email?.split('.');
      // const email = emailSplit[0];
      if (emailSplit) {
        state.userEmail = emailSplit;
      } else {
        state.userEmail = 'fine dust';
      }
    });
    builder.addCase(getFavoriteList.rejected, (state, action) => {
      state.isError = false;
    });

    // updateFavoriteList
    builder.addCase(updateFavoriteList.fulfilled, (state: any, action) => {
      state.selectCityName = action.payload.cityName;
      const emailSplit: any = auth.currentUser?.email?.split('.');
      let userFavoriteData;

      if (!emailSplit) {
        userFavoriteData = {};
      } else {
        userFavoriteData = {
          [emailSplit[0]]: {
            [state.checkedList[0].cityName]: current(state.checkedList),
          },
        };
      }

      let userFavoriteDataDB = {};

      if (state.userEmail !== 'finedust') {
        if (!state.checkedListDB.length) {
          userFavoriteDataDB = [];
        } else {
          userFavoriteDataDB = state.checkedListDB[0][emailSplit[0]];
        }
      }

      let updateUserFavoriteList: any;

      if (emailSplit) {
        updateUserFavoriteList = {
          [emailSplit[0]]: {
            ...userFavoriteDataDB,
            ...userFavoriteData[emailSplit[0]],
          },
        };
      }

      const selectDataName = state.selectCityName;
      let newDataName;

      if (updateUserFavoriteList) {
        newDataName =
          updateUserFavoriteList[emailSplit[0]][state.selectCityName][0]
            .cityName;
      }

      if (selectDataName === newDataName) {
        updateDoc(action.payload.favoriteDoc, updateUserFavoriteList);
      }
    });
  },
});

export const favoritesList = locationSlice.actions.favorites;
// export const asyncUpFetch
