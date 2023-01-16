import {State} from '../../types/state';
import {FilmInfo} from '../../types/FilmInfo';
import {Namespace} from '../../const';

export const getMyList = (state: State): FilmInfo[] => state[Namespace.MyList].myList;

export const getMyListLength = (state: State): number => state[Namespace.MyList].myListLength;

export const getChangedFilm = (state: State): { filmId: number; status: boolean } | null =>
  state[Namespace.MyList].changedFilm;
