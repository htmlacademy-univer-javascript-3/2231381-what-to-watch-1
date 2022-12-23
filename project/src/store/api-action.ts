import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {FilmInfo} from '../types/FilmInfo';
import {User, UserAuthData} from '../types/User';
import {dropToken, saveToken} from '../services/token';
import {Review} from '../types/Review';
import {redirectToRoute} from './action';
import {setGenres} from './main-data/main-data';


export const getAuthStatus = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/getAuthStatus',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>('/login');
    saveToken(data.token);
    return data;
  },
);

export const login = createAsyncThunk<User, UserAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<User>('/login', {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete('/logout');
    dropToken();
  },
);



export const fetchFilms = createAsyncThunk<FilmInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'main/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo[]>('/films');
    dispatch(setGenres(data));
    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<FilmInfo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'main/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FilmInfo>('/promo');
    return data;
  },
);

export const fetchMyList = createAsyncThunk<FilmInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'myList/fetchMyList',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmInfo[]>('/favorite');
    return data;
  }
)

export const changeFilmStatus = createAsyncThunk<FilmInfo, {filmId: number; status: number;}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'myList/postReview',
  async ({filmId, status}, {extra: api}) => {
    const {data} = await api.post<FilmInfo>(`/favorite/${filmId}/${status}`, {filmId, status});
    return data;
  }
);



export const fetchFilm = createAsyncThunk<FilmInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/fetchFilm',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<FilmInfo>(`/films/${filmId}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<FilmInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/fetchSimilarFilms',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<FilmInfo[]>(`/films/${filmId}/similar`);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/fetchReviews',
  async (filmId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${filmId}`);
    return data;
  },
);

export const postReview = createAsyncThunk<Review[], {filmId: number; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/postReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review[]>(`/comments/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`/films/${filmId}`));
    return data;
  }
);
