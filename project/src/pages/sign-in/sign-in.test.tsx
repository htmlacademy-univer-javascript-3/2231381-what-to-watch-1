import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import SignIn from './sign-in';
import userEvent from '@testing-library/user-event';
import {login} from '../../store/api-action';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeFilms, makeFakeGenres, makeFakeUser} from '../../utils/mocks';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../main/main';
import {testMainPageRender} from '../main/main.test';

describe('Component: SignIn', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);
  let store = mockStore({
    AUTH: {
      authorizationStatus: AuthStatus.Unknown,
      user: null,
      loginError: LogInError.NoError,
    },
    MAIN: {
      films: [],
      promoFilm: null,
      genres: ['All Genres'],
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

  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    await testSignInPageRender();
  });

  it('should fetch login when click sign in button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@mail.ru');
    await userEvent.type(passwordInput, '12345test');

    await userEvent.click(screen.getByRole('button'));
    const actions = store.getActions();
    expect(actions[0].type).toBe(login.pending.type);
  });

  it('should render main page when authorized', () => {
    const mockGenres = makeFakeGenres();
    const mockFilms = makeFakeFilms(mockGenres);
    const mockPromoFilm = mockFilms[0];

    store = mockStore({
      AUTH: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser(),
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<SignIn/>}/>
            <Route path='' element={<Main/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    testMainPageRender(mockPromoFilm, mockGenres, mockFilms);
  });
});

export async function testSignInPageRender() {
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent('Sign in');
  expect(screen.getByRole('button')).not.toBeDisabled();

  const emailInput = screen.getByLabelText('Email address');
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');

  const passwordInput = screen.getByLabelText('Password');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');

  await userEvent.type(emailInput, 'test');
  await userEvent.type(passwordInput, '12345');
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
}
