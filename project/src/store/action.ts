import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/Genre';

export const setGenre = createAction('setGenre', (genre: Genre) => ({
  payload: genre
}));
