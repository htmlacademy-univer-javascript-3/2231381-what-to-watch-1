import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import {AUTH_TOKEN_KEY_NAME} from '../services/token';
import {fetchFilms, getAuthStatus, login, logout, postReview} from './api-action';
import {makeFakeFilms, makeFakeId, makeFakeReview, makeFakeReviews} from '../utils/mocks';
import {setGenres} from './main-data/main-data';
import {redirectToRoute} from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('authentication process', () => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    it('should save token when user authorized', async () => {
      mockAPI
        .onGet('/login')
        .reply(200, {token: 'secret'});

      const store = mockStore();
      await store.dispatch(getAuthStatus());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getAuthStatus.pending.type,
        getAuthStatus.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
    });

    it('should not save token when user not authorized', async () => {
      mockAPI
        .onGet('/login')
        .reply(401);

      const store = mockStore();
      await store.dispatch(getAuthStatus());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getAuthStatus.pending.type,
        getAuthStatus.rejected.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });

    it('should authorize and save token when POST /login returns 200', async () => {
      const fakeUser = {email: 'test@test.ru', password: '123456'};

      mockAPI
        .onPost('/login')
        .reply(200, {token: 'secret'});

      const store = mockStore();
      await store.dispatch(login(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        login.pending.type,
        login.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
    });

    it('should not authorize when POST /login returns 400', async () => {
      const fakeUser = {email: '', password: ''};

      mockAPI
        .onPost('/login')
        .reply(400);

      const store = mockStore();
      await store.dispatch(login(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        login.pending.type,
        login.rejected.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(0);
    });

    it('should drop token when logout', async () => {
      mockAPI
        .onDelete('/logout')
        .reply(204);

      const store = mockStore();
      await store.dispatch(logout());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logout.pending.type,
        logout.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
    });

  });

  it('should set genres when fetchFilms successful', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, makeFakeFilms());

    const store = mockStore();
    await store.dispatch(fetchFilms());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilms.pending.type,
      setGenres.type,
      fetchFilms.fulfilled.type
    ]);
  });

  describe('postReview', () => {
    const mockId = makeFakeId();
    const mockReview = makeFakeReview();

    it('should redirect to film page after post review', async () => {
      mockAPI
        .onPost(`/comments/${mockId}`)
        .reply(200, makeFakeReviews().concat([mockReview]));

      const store = mockStore();
      await store.dispatch(postReview({filmId: mockId, comment: mockReview.comment, rating: mockReview.rating}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReview.pending.type,
        redirectToRoute.type,
        postReview.fulfilled.type
      ]);
    });

    it('should not redirect when error while post review', async () => {
      mockAPI
        .onPost(`/comments/${mockId}`)
        .reply(400);

      const store = mockStore();
      await store.dispatch(postReview({filmId: mockId, comment: mockReview.comment, rating: mockReview.rating}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type
      ]);
    });
  });
});
