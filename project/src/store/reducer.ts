import {createReducer} from '@reduxjs/toolkit';
import {
  loadFilms,
  loadPromoFilm,
  setAuthStatus,
  setGenre,
  setGenres,
  setLoadingStatus,
  setLoginError,
  setUser
} from './action';
import {FilmInfo} from '../types/FilmInfo';
import {AuthStatus} from '../types/AuthStatus';
import {User} from '../types/User';
import {LogInError} from '../types/LogInError';

const initialState : {
  selectedGenre: string;
  films: FilmInfo[];
  promoFilm: FilmInfo | null;
  genres: Set<string>;
  isLoading: boolean;
  authorizationStatus: AuthStatus;
  user: User | null;
  loginError: LogInError;
} = {
  selectedGenre: 'All Genres',
  films: [],
  promoFilm: null,
  genres: new Set<string>(['All Genres']),
  isLoading: false,
  authorizationStatus: AuthStatus.NotAuthorized,
  user: null,
  loginError: LogInError.NoError,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setGenres, (state) => {
      const genres = new Set<string>(['All Genres']);
      for (const film of state.films){
        genres.add(film.genre);
      }
      state.genres = genres;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setLoginError, (state, action) => {
      state.loginError = action.payload;
    });
});
