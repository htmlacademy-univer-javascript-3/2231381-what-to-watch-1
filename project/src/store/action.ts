import {createAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/FilmInfo';

export const setGenre = createAction('setGenre', (genre: string) => ({payload: genre}));

export const loadFilms = createAction('loadFilms', (films: FilmInfo[]) => ({payload: films}));

export const setGenres = createAction('setGenres');

export const loadPromoFilm = createAction('loadPromoFilm', (film: FilmInfo) => ({payload: film}));

export const setLoadingStatus = createAction('startLoading', (isLoading: boolean) => ({payload: isLoading}));
