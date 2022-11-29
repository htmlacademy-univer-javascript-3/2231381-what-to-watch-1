import {createReducer} from '@reduxjs/toolkit';
import {loadFilms, loadPromoFilm, setGenre, setGenres, setLoadingStatus} from './action';
import {FilmInfo} from '../types/FilmInfo';

const initialState : {
  selectedGenre: string;
  films: FilmInfo[];
  promoFilm: FilmInfo | null;
  genres: Set<string>;
  isLoading: boolean;
} = {
  selectedGenre: 'All Genres',
  films: [],
  promoFilm: null,
  genres: new Set<string>(['All Genres']),
  isLoading: false,
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
    });
});
