import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  loadFilms,
  loadPromoFilm,
  setAuthStatus,
  setGenres,
  setLoadingStatus,
  setLoginError,
  setUser
} from '../store/action';
import {FilmInfo} from '../types/FilmInfo';
import {User, UserAuthData} from '../types/User';
import {AuthStatus} from '../types/AuthStatus';
import {saveToken} from './token';
import {LogInError} from '../types/LogInError';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const films : FilmInfo[] = (await api.get('/films')).data;
    dispatch(loadFilms(films));
    dispatch(setGenres());
    dispatch(setLoadingStatus(false));
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const film : FilmInfo = (await api.get('/promo')).data;
    dispatch(loadPromoFilm(film));
  },
);

export const getLogin = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getLogin',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const user : User = (await api.get('/login')).data;
      saveToken(user.token);
      dispatch(setUser(user));
      dispatch(setAuthStatus(AuthStatus.Authorized));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NotAuthorized));
    }
  },
);

export const postLogin = createAsyncThunk<void, UserAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('postLogin',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const user : User = (await api.post<User>('/login', {email, password})).data;
      saveToken(user.token);
      dispatch(setUser(user));
      dispatch(setAuthStatus(AuthStatus.Authorized));
    } catch {
      dispatch(setLoginError(LogInError.NotValidEmailAndPasswordCombination));
    }
  },
);
