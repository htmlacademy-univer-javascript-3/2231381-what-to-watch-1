import {MyListData} from "../../types/state";
import {createSlice} from "@reduxjs/toolkit";
import {StoreNameSpace} from "../../const";
import {changeFilmStatus, fetchMyList} from "../api-action";

const initialState: MyListData = {
  myList: [],
  myListLength: 0,
  changedFilm: null,
};

export const myListData = createSlice({
  name: StoreNameSpace.MyList,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.myList = action.payload;
        state.myListLength = action.payload.length;
        console.log('here')
      })
      .addCase(changeFilmStatus.pending, (state) => {
        state.changedFilm = null;
      })
      .addCase(changeFilmStatus.fulfilled, (state, action) => {
        const isInList = action.payload.isFavorite;
        state.myListLength += isInList ? 1 : -1;
        state.changedFilm = {filmId: action.payload.id, status: action.payload.isFavorite};
      })
  }
});
