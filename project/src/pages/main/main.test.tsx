import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import Main from './main';
import {makeFakeFilms, makeFakeGenres} from '../../utils/mocks';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {setSelectedGenre} from '../../store/main-data/main-data';
import {FilmInfo} from '../../types/FilmInfo';

describe('Component: Main', () => {
  const mockGenres = makeFakeGenres();
  const mockFilms = makeFakeFilms(mockGenres);
  const mockPromoFilm = mockFilms[0];

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    AUTH: {
      authorizationStatus: AuthStatus.NotAuthorized,
      user: null,
      loginError: LogInError.NoError,
    },
    MAIN: {
      films: mockFilms,
      promoFilm: mockPromoFilm,
      genres: ['All Genres'].concat(mockGenres),
      selectedGenre: 'All Genres',
      isLoading: false,
    },
    MYLIST: {
      myList: [],
      myListLength: 0,
      changedFilm: null,
    },
  });

  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main/>
        </HistoryRouter>
      </Provider>
    );

    testMainPageRender(mockPromoFilm, mockGenres, mockFilms);
  });

  it('should fetch select genre when click genre button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main/>
        </HistoryRouter>
      </Provider>
    );

    const genre = mockGenres[0];

    await userEvent.click(screen.getByTestId(`${genre}-genre-button`));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(setSelectedGenre.type);
    expect(actions[actions.length - 1].payload).toBe(genre);
  });
});

export function testMainPageRender(mockPromoFilm: FilmInfo, mockGenres: string[], mockFilms: FilmInfo[]) {
  expect(screen.queryAllByText(mockPromoFilm.name).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText('Play')).toBeInTheDocument();
  expect(screen.getByText('My list')).toBeInTheDocument();

  for (const genre of mockGenres) {
    if (genre === mockPromoFilm.genre) {
      expect(screen.queryAllByText(genre).length).toBe(2);
    } else {
      expect(screen.getByText(genre)).toBeInTheDocument();
    }
  }

  for (const film of mockFilms) {
    expect(screen.queryAllByText(film.name).length).toBeGreaterThanOrEqual(1);
  }
}
