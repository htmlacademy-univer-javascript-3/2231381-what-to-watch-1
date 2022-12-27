import {filmData, setPostReviewError} from "./film-data";
import {FilmData} from "../../types/state";
import {fetchFilm, fetchReviews, fetchSimilarFilms, postReview} from "../api-action";
import {makeFakeFilm, makeFakeReview, makeFakeReviews, makeFakeFilms} from "../../utils/mocks";

const mockFilm = makeFakeFilm();
const mockSimilarFilms = makeFakeFilms();
const mockReviews = makeFakeReviews();
const mockNewReview = makeFakeReview();

describe('Reducer: filmData', () => {
  let state: FilmData;

  const initialState: FilmData = {
    film: null,
    similarFilms: [],
    reviews: [],
    postReviewError: null,
    similarFilmsLoaded: false,
  };

  beforeEach(() => { state = {...initialState}; })

  it('should return initial state without additional parameters', () => {
    expect(filmData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update postReviewError to payload data', () => {
    expect(filmData.reducer(state, { type: setPostReviewError.type, payload: 'error' }))
      .toEqual({...initialState, postReviewError: 'error'});
  })

  describe('api-action: fetchFilm', () => {
    it('should update film to payload data when fetchFilm fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchFilm.fulfilled.type, payload: mockFilm }))
        .toEqual({...initialState, film: mockFilm});
    });

    it('should set film to null when fetchFilm pending', () => {
      expect(filmData.reducer(state, { type: fetchFilm.pending.type }))
        .toEqual({...initialState, film: null});
    });
  });

  describe('api-action: fetchSimilarFilms', () => {
    it('should update similar films to payload data when fetchSimilarFilms fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchSimilarFilms.fulfilled.type, payload: mockSimilarFilms }))
        .toEqual({
          ...initialState,
          similarFilms: mockSimilarFilms,
          similarFilmsLoaded: true
        });
    });

    it('should set similar films to empty array when fetchSimilarFilms pending', () => {
      expect(filmData.reducer(state, { type: fetchSimilarFilms.pending.type }))
        .toEqual({
          ...initialState,
          similarFilms: [],
          similarFilmsLoaded: false
        });
    });

    it('should set similar films to empty array when fetchSimilarFilms rejected', () => {
      expect(filmData.reducer(state, { type: fetchSimilarFilms.rejected.type }))
        .toEqual({
          ...initialState,
          similarFilms: [],
          similarFilmsLoaded: false
        });
    });
  })

  it('should update review to payload data when fetchReview fulfilled', () => {
    expect(filmData.reducer(state, { type: fetchReviews.fulfilled.type, payload: mockReviews }))
      .toEqual({...initialState, reviews: mockReviews});
  });

  describe('api-action: postReview', () => {
    it('should set postReviewError to null when postReview pending', () => {
      expect(filmData.reducer(state, { type: postReview.pending.type }))
        .toEqual({...initialState, postReviewError: null});
    });

    it('should add review and update reviews to payload data when postReview fulfilled', () => {
      expect(filmData.reducer(state, { type: postReview.fulfilled.type, payload: mockReviews.concat([mockNewReview]) }))
        .toEqual({...initialState, reviews: mockReviews.concat(mockNewReview)});
    });

    it('should set postReviewError to error when postReview rejected', () => {
      expect(filmData.reducer(state, { type: postReview.rejected.type }))
        .toEqual({...initialState, postReviewError: 'Что-то пошло не так'});
    });
  })
})
