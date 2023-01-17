import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {makeFakeFilm, makeFakeUser} from '../../utils/mocks';
import FilmCardDescription from './film-card-description';
import userEvent from '@testing-library/user-event';
import {changeFilmStatus} from '../../store/api-action';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import {FilmInfo} from '../../types/FilmInfo';
import {User} from '../../types/User';
import {redirectToRoute} from '../../store/action';


describe('Component: FilmCardDescription', () => {
  const mockFilm = makeFakeFilm();

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);

  const makeStore = (myList: FilmInfo[], authStatus: AuthStatus, user: User | null) => mockStore({
    AUTH: {
      authorizationStatus: authStatus,
      user: user,
      loginError: LogInError.NoError,
    },
    MYLIST: {
      myList: myList,
      myListLength: myList.length,
      changedFilm: null,
    },
  });

  const history = createMemoryHistory();

  it('should render correctly', () => {
    const store = makeStore([], AuthStatus.Authorized, makeFakeUser());

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardDescription filmInfo={mockFilm}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/player/${mockFilm.id}`);

    const myListButton = screen.getByRole('button');
    expect(myListButton).toBeInTheDocument();
    expect(myListButton).toHaveTextContent('My list');
  });

  it('should fetch change film status when click my list button', async () => {
    const store = makeStore([], AuthStatus.Authorized, makeFakeUser());

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardDescription filmInfo={mockFilm}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('add-to-my-list-button'));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(changeFilmStatus.pending.type);
  });

  it ('should redirect to sign in page when click my list button if not authorized', async () => {
    const store = makeStore([], AuthStatus.NotAuthorized, null);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardDescription filmInfo={mockFilm}/>
          <Routes>
            <Route path={AppRoute.Login} element={<SignIn/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(redirectToRoute.type);
    expect(actions[actions.length - 1].payload).toBe(AppRoute.Login);
  });
});

