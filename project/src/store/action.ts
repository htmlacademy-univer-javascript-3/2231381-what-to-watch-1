import {createAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/FilmInfo';
import {AuthStatus} from '../types/AuthStatus';
import {User} from '../types/User';
import {LogInError} from '../types/LogInError';

export const setGenre = createAction('setGenre', (genre: string) => ({payload: genre}));

export const loadFilms = createAction('loadFilms', (films: FilmInfo[]) => ({payload: films}));

export const setGenres = createAction('setGenres');

export const loadPromoFilm = createAction('loadPromoFilm', (film: FilmInfo) => ({payload: film}));

export const setLoadingStatus = createAction('startLoading', (isLoading: boolean) => ({payload: isLoading}));

export const setAuthStatus = createAction('setAuthStatus', (authStatus: AuthStatus) => ({payload: authStatus}));

export const setUser = createAction('setUser', (user: User) => ({payload: user}));

export const setLoginError = createAction('setLoginError', (error: LogInError) => ({payload: error}));
