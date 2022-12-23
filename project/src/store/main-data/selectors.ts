import {State} from '../../types/state';
import {FilmInfo} from '../../types/FilmInfo';
import {StoreNameSpace} from '../../const';

export const getFilms = (state: State): FilmInfo[] => state[StoreNameSpace.Main].films;

export const getPromoFilm = (state: State): FilmInfo | null => state[StoreNameSpace.Main].promoFilm;

export const getGenres = (state: State): string[] => state[StoreNameSpace.Main].genres;

export const getSelectedGenre = (state: State): string => state[StoreNameSpace.Main].selectedGenre;

export const getIsLoading = (state: State): boolean => state[StoreNameSpace.Main].isLoading;
