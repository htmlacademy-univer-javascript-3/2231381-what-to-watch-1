import {MyListData} from '../../types/state';
import {myListData} from './my-list-data';
import {changeFilmStatus, fetchMyList, logout} from '../api-action';
import {makeFakeFilm, makeFakeFilms} from '../../utils/mocks';

const mockFilms = makeFakeFilms();

describe('Reducer: myListData', () => {
  let state: MyListData;

  const initialState: MyListData = {
    myList: [],
    myListLength: 0,
    changedFilm: null,
  };

  beforeEach(() => { state = {...initialState}; });

  it('should return initial state without additional parameters', () => {
    expect(myListData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update my list to payload data when fetchMyList fulfilled', () => {
    expect(myListData.reducer(state, {type: fetchMyList.fulfilled.type, payload: mockFilms}))
      .toEqual({
        myList: mockFilms,
        myListLength: mockFilms.length,
        changedFilm: initialState.changedFilm
      });
  });

  describe('api-action: changeFilmStatus', () => {
    it('should set changed film to null when changeFilmStatus pending', () => {
      expect(myListData.reducer(state, {type: changeFilmStatus.pending.type}))
        .toEqual({...initialState, changedFilm: null});
    });

    it('should add film to list and increase list length when change film status to 1', () => {
      const mockFilm = makeFakeFilm(true);

      expect(myListData.reducer(state, {type: changeFilmStatus.fulfilled.type, payload: mockFilm}))
        .toEqual({
          myList: initialState.myList,
          myListLength: 1,
          changedFilm: {filmId: mockFilm.id, status: true}
        });
    });

    it('should delete film from list and decrease list length when change film status to 0', () => {
      const mockFilm = makeFakeFilm(false);

      expect(myListData.reducer(state, {type: changeFilmStatus.fulfilled.type, payload: mockFilm}))
        .toEqual({
          myList: initialState.myList,
          myListLength: -1,
          changedFilm: {filmId: mockFilm.id, status: false}
        });
    });
  });

  it('should clear my list data when logout', () => {
    expect(myListData.reducer(state, {type: logout.fulfilled.type}))
      .toEqual(initialState);
  });
});
