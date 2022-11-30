import {createReducer} from '@reduxjs/toolkit';
import {
  setFilm,
  setFilms,
  setGenres,
  setAuthStatus,
  setLoadingStatus,
  setLoginError,
  setPromoFilm,
  setReviews,
  setSelectedGenre,
  setSimilarFilms,
  setUser, setPostReviewError
} from './action';
import {FilmInfo} from '../types/FilmInfo';
import {User} from '../types/User';
import {LogInError} from '../types/LogInError';
import {Review} from '../types/Review';
import {AuthStatus} from '../types/AuthStatus';

type AuthState = {
  authorizationStatus: AuthStatus;
  user: User | null;
  loginError: LogInError;
}

type MainPageInfo = {
  films: FilmInfo[];
  promoFilm: FilmInfo | null;
  genres: string[];
  selectedGenre: string;
  isLoading: boolean;
}

type FilmPageInfo = {
  film: FilmInfo | null;
  similarFilms: FilmInfo[];
  reviews: Review[];
  postReviewError: string | null;
}

const initialState : AuthState & MainPageInfo & FilmPageInfo = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  loginError: LogInError.NoError,

  films: [],
  promoFilm: null,
  genres: ['All Genres'],
  selectedGenre: 'All Genres',
  isLoading: false,

  film: null,
  similarFilms: [],
  reviews: [],
  postReviewError: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder

    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setLoginError, (state, action) => {
      state.loginError = action.payload;
    })


    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setGenres, (state) => {
      const genres = new Set<string>(['All Genres']);
      for (const film of state.films){
        genres.add(film.genre);
      }
      state.genres = Array.from(genres);
    })
    .addCase(setSelectedGenre, (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })


    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setPostReviewError, (state, action) => {
      state.postReviewError = action.payload;
    });
});
