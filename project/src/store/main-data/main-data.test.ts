import {MainData} from '../../types/state';
import {mainData, setGenres, setSelectedGenre} from './main-data';
import {makeFakeFilm, makeFakeFilms, makeFakeGenres} from '../../utils/mocks';
import {fetchFilms, fetchPromoFilm} from '../api-action';


describe('Reducer: mainData', () => {
  const mockFilms = makeFakeFilms();

  let state: MainData;

  const initialState: MainData = {
    films: [],
    promoFilm: null,
    genres: ['All Genres'],
    selectedGenre: 'All Genres',
    isLoading: false,
  };

  beforeEach(() => { state = {...initialState}; });

  it('should return initial state without additional parameters', () => {
    expect(mainData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update genres according to films', () => {
    const mockGenres = makeFakeGenres();
    const mockFilmsWithGenres = makeFakeFilms(mockGenres);

    expect(mainData.reducer(state, {type: setGenres.type, payload: mockFilmsWithGenres}))
      .toEqual({...initialState, genres: ['All Genres'].concat(mockGenres)});
  });

  it('should update selected genre', () => {
    expect(mainData.reducer(state, {type: setSelectedGenre.type, payload: 'genre'}))
      .toEqual({...initialState, selectedGenre: 'genre'});
  });

  it('should update films to payload data when fetchFilms fulfilled', () => {
    expect(mainData.reducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}))
      .toEqual({...initialState, films: mockFilms, isLoading: false});
  });

  it('should set isLoading to true when fetchFilms pending', () => {
    expect(mainData.reducer(state, {type: fetchFilms.pending.type}))
      .toEqual({...initialState, isLoading: true});
  });

  it('should update promo film to payload data', () => {
    const mockFilm = makeFakeFilm();

    expect(mainData.reducer(state, {type: fetchPromoFilm.fulfilled.type, payload: mockFilm}))
      .toEqual({...initialState, promoFilm: mockFilm});
  });
});
