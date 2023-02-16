/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import axios from 'axios';
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
    console.log(filteredData);
    return filteredData;
  }
);

export const updateFavoriteList = createAsyncThunk(
  'locationSlice/updateFavoriteList',
  async (cityName: string) => {
    const favoriteDoc = doc(db, 'favorites', '0hAEaTo8wv2lpDVAJ86T');
    return { favoriteDoc, cityName };
  }
);

const initialState: LocationState = {
  isLoading: true,
  isError: false,
  isLogin: false,
  postData: [],
  checkedList: [],
  checkedListDB: [],
  userEmail: '',
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
  isLogin: boolean;
  postData: PostData[];
  checkedList: [];
  checkedListDB: any[];
  userEmail: string;
  selectCityName: string;
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    favorites: (state, action) => {
      // console.log(action.payload);
      state.checkedList = action.payload;
    },
    validateLoginStatus: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    // asyncUpFetch
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

    // getFavoriteList
    builder.addCase(getFavoriteList.fulfilled, (state, action) => {
      state.checkedListDB = action.payload;
      const emailSplit = auth.currentUser?.email?.split('.');

      let userEmail = 'finedust@finedust.com';

      if (emailSplit) {
        userEmail = emailSplit.join('');
      } else if (state.userEmail) {
        const userEmailSplit = state.userEmail.split('.');
        userEmail = userEmailSplit.join('');
      }

      if (emailSplit) {
        state.userEmail = userEmail;
      } else {
        state.userEmail = 'finedust@finedust.com';
      }
    });
    builder.addCase(getFavoriteList.rejected, (state) => {
      state.isError = false;
    });

    // updateFavoriteList
    builder.addCase(updateFavoriteList.fulfilled, (state, action) => {
      state.selectCityName = action.payload.cityName;
      const emailSplit: string[] | undefined =
        auth.currentUser?.email?.split('.');
      const userEmail: any = emailSplit?.join('');
      let userFavoriteData;

      if (!emailSplit) {
        userFavoriteData = {};
      } else {
        userFavoriteData = {
          [userEmail]: {
            [state.selectCityName]: current(state.checkedList),
          },
        };
      }

      const userFavoriteDataDB = state.checkedListDB[0][userEmail];

      let updateUserFavoriteList = { [userEmail]: {} };

      if (!userFavoriteDataDB[state.selectCityName]) {
        updateUserFavoriteList = {
          [userEmail]: {
            ...userFavoriteDataDB,
            ...userFavoriteData[userEmail],
          },
        };
      } else {
        Object.assign(
          userFavoriteDataDB[state.selectCityName],
          userFavoriteData[userEmail][state.selectCityName]
        );
        updateUserFavoriteList = {
          [userEmail]: userFavoriteDataDB,
        };
      }

      updateDoc(action.payload.favoriteDoc, updateUserFavoriteList);
    });
  },
});

export const favoritesList = locationSlice.actions.favorites;
export const { validateLoginStatus } = locationSlice.actions;
