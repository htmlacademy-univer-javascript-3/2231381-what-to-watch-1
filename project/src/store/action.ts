import {createAction} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/FilmInfo';
import {User} from '../types/User';
import {LogInError} from '../types/LogInError';
import {Review} from '../types/Review';
import {AuthStatus} from '../types/AuthStatus';

export const setAuthStatus = createAction('user/setAuthStatus', (authStatus: AuthStatus) => ({payload: authStatus}));

export const setUser = createAction('user/setUser', (user: User) => ({payload: user}));

export const setLoginError = createAction('user/setLoginError', (error: LogInError) => ({payload: error}));


export const setFilms = createAction('main/setFilms', (films: FilmInfo[]) => ({payload: films}));

export const setPromoFilm = createAction('main/setPromoFilm', (film: FilmInfo) => ({payload: film}));

export const setGenres = createAction('main/setGenres');

export const setSelectedGenre = createAction('main/setSelectedGenre', (genre: string) => ({payload: genre}));

export const setLoadingStatus = createAction('main/setLoadingStatus', (isLoading: boolean) => ({payload: isLoading}));


export const setFilm = createAction('film/setFilm', (film: FilmInfo | null) => ({payload: film}));

export const setSimilarFilms = createAction('film/setSimilarFilms', (films: FilmInfo[]) => ({payload: films}));

export const setReviews = createAction('film/setReviews', (reviews: Review[]) => ({payload: reviews}));

export const setPostReviewError = createAction('film/setPostReviewError', (error: string | null) => ({payload: error}));


export const redirectToRoute = createAction<string>('redirectToRoute');
