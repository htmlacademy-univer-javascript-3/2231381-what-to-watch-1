import {createAction} from '@reduxjs/toolkit';

export const setGenre = createAction('setGenre', (genre) => ({
  payload: genre
}));

export const getFilmsByGenre = createAction('getFilmsByGenre');

