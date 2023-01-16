import {MyListData} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {changeFilmStatus, fetchMyList, logout} from '../api-action';

const initialState: MyListData = {
  myList: [],
  myListLength: 0,
  changedFilm: null,
};

export const myListData = createSlice({
  name: Namespace.MyList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.myList = action.payload;
        state.myListLength = action.payload.length;
      })
      .addCase(changeFilmStatus.pending, (state) => {
        state.changedFilm = null;
      })
      .addCase(changeFilmStatus.fulfilled, (state, action) => {
        const isInList = action.payload.isFavorite;
        state.myListLength += isInList ? 1 : -1;
        state.changedFilm = {filmId: action.payload.id, status: action.payload.isFavorite};
      })
      .addCase(logout.fulfilled, (state) => {
        state.myList = [];
        state.myListLength = 0;
        state.changedFilm = null;
      });
  }
});
