import {State} from '../../types/state';
import {Namespace} from '../../const';
import {FilmInfo} from '../../types/FilmInfo';
import {Review} from '../../types/Review';

export const getFilm = (state: State): FilmInfo | null => state[Namespace.Film].film;

export const getSimilarFilms = (state: State): FilmInfo[] => state[Namespace.Film].similarFilms;

export const getSimilarFilmsLoaded = (state: State): boolean => state[Namespace.Film].similarFilmsLoaded;

export const getReviews = (state: State): Review[] => state[Namespace.Film].reviews;

export const getPostReviewError = (state: State): string | null => state[Namespace.Film].postReviewError;
