import {createAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/FilmInfo';

export const setGenre = createAction('setGenre', (genre: string) => ({payload: genre}));

export const loadFilms = createAction('loadFilms', (films: FilmInfo[]) => ({payload: films}));

export const loadPromoFilm = createAction('loadPromoFilm', (film: FilmInfo) => ({payload: film}));
