import {MainData} from '../../types/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Namespace} from '../../const';
import {fetchFilms, fetchPromoFilm} from '../api-action';
import {FilmInfo} from '../../types/FilmInfo';

const initialState: MainData = {
  films: [],
  promoFilm: null,
  genres: ['All Genres'],
  selectedGenre: 'All Genres',
  isLoading: false,
};

export const mainData = createSlice({
  name: Namespace.Main,
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<FilmInfo[]>) => {
      const genres = new Set<string>(['All Genres']);
      for (const film of action.payload){
        genres.add(film.genre);
      }
      state.genres = Array.from(genres);
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  }
});

export const {setGenres, setSelectedGenre} = mainData.actions;
