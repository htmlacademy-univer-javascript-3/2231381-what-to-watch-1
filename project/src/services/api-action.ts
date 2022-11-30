import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  redirectToRoute,
  setAuthStatus,
  setFilm,
  setFilms,
  setGenres,
  setLoadingStatus,
  setLoginError, setPostReviewError,
  setPromoFilm,
  setReviews,
  setSimilarFilms,
  setUser
} from '../store/action';
import {FilmInfo} from '../types/FilmInfo';
import {User, UserAuthData} from '../types/User';
import {dropToken, saveToken} from './token';
import {LogInError} from '../types/LogInError';
import {Review} from '../types/Review';
import {AuthStatus} from '../types/AuthStatus';
import {AppRoute} from '../const';


export const getAuthStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getAuthStatus',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>('/login');
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthStatus(AuthStatus.Authorized));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NotAuthorized));
    }
  },
);

export const login = createAsyncThunk<void, UserAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<User>('/login', {email, password});
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthStatus(AuthStatus.Authorized));
    } catch {
      dispatch(setLoginError(LogInError.NotValidEmailAndPasswordCombination));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dropToken();
    dispatch(setAuthStatus(AuthStatus.NotAuthorized));
  },
);


export const getFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'main/getFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<FilmInfo[]>('/films');
    dispatch(setFilms(data));
    dispatch(setGenres());
    dispatch(setLoadingStatus(false));
  },
);

export const getPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'main/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo>('/promo');
    dispatch(setPromoFilm(data));
  },
);


export const getFilm = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/getFilm',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setFilm(null));
      const {data} = await api.get<FilmInfo>(`/films/${filmId}`);
      dispatch(setFilm(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.Page404));
    }
  },
);

export const getSimilarFilms = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/getSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmInfo[]>(`/films/${filmId}/similar`);
    dispatch(setSimilarFilms(data));
  },
);

export const getReviews = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/getReviews',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${filmId}`);
    dispatch(setReviews(data));
  },
);

export const postReview = createAsyncThunk<void, {filmId: number; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'film/postReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    try {
      dispatch(setPostReviewError(null));
      const {data} = await api.post<Review[]>(`/comments/${filmId}`, {comment, rating});
      dispatch(setReviews(data));
      dispatch(redirectToRoute(`/films/${filmId}`));
    } catch {
      dispatch(setPostReviewError('Что-то пошло не так'));
    }
  }
);
