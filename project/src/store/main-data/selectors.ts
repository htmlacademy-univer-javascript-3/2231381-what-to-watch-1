import {State} from '../../types/state';
import {FilmInfo} from '../../types/FilmInfo';
import {Namespace} from '../../const';

export const getFilms = (state: State): FilmInfo[] => state[Namespace.Main].films;

export const getPromoFilm = (state: State): FilmInfo | null => state[Namespace.Main].promoFilm;

export const getGenres = (state: State): string[] => state[Namespace.Main].genres;

export const getSelectedGenre = (state: State): string => state[Namespace.Main].selectedGenre;

export const getIsLoading = (state: State): boolean => state[Namespace.Main].isLoading;
