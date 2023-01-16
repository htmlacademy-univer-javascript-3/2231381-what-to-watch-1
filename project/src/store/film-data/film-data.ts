import {FilmData} from '../../types/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppRoute, StoreNameSpace} from '../../const';
import {fetchFilm, fetchReviews, fetchSimilarFilms, postReview} from '../api-action';
import {useAppDispatch} from '../../hooks';
import {redirectToRoute} from '../action';

const initialState: FilmData = {
  film: null,
  similarFilms: [],
  reviews: [],
  postReviewError: null,
  similarFilmsLoaded: false,
};

export const filmData = createSlice({
  name: StoreNameSpace.Film,
  initialState,
  reducers: {
    setPostReviewError: (state, action: PayloadAction<string | null>) => {
      state.postReviewError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilm.pending, (state) => {
        state.film = null;
      })
      .addCase(fetchFilm.rejected, () => {
        const dispatch = useAppDispatch();
        dispatch(redirectToRoute(AppRoute.Page404));
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarFilmsLoaded = true;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.similarFilms = [];
        state.similarFilmsLoaded = false;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.similarFilms = [];
        state.similarFilmsLoaded = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.pending, (state) => {
        state.postReviewError = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewError = 'Что-то пошло не так';
      });
  },
});

export const {setPostReviewError} = filmData.actions;
