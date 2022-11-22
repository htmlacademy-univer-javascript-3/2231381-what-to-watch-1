import {Genre} from '../types/Genre';
import {createReducer} from '@reduxjs/toolkit';
import {setGenre} from './action';

const initialState : {
  genre: Genre
} = {
  genre: Genre.All
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    });
});
