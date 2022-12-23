import {State} from "../../types/state";
import {FilmInfo} from "../../types/FilmInfo";
import {StoreNameSpace} from "../../const";

export const getMyList = (state: State): FilmInfo[] => state[StoreNameSpace.MyList].myList;

export const getMyListLength = (state: State): number => state[StoreNameSpace.MyList].myListLength;

export const getChangedFilm = (state: State): { filmId: number, status: boolean } | null =>
  state[StoreNameSpace.MyList].changedFilm;
