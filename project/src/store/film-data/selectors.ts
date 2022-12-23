import {State} from '../../types/state';
import {StoreNameSpace} from '../../const';
import {FilmInfo} from '../../types/FilmInfo';
import {Review} from '../../types/Review';

export const getFilm = (state: State): FilmInfo | null => state[StoreNameSpace.Film].film;

export const getSimilarFilms = (state: State): FilmInfo[] => state[StoreNameSpace.Film].similarFilms;

export const getReviews = (state: State): Review[] => state[StoreNameSpace.Film].reviews;

export const getPostReviewError = (state: State): string | null => state[StoreNameSpace.Film].postReviewError;
