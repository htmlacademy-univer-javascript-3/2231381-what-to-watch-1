import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {Provider} from 'react-redux';
import {makeFakeUser} from '../../utils/mocks';
import Header from './header';
import {AppRoute} from '../../const';
import {Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import userEvent from '@testing-library/user-event';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {User} from '../../types/User';
import {logout} from '../../store/api-action';
import {redirectToRoute} from '../../store/action';

describe('Component: Header', () => {
  const mockUser = makeFakeUser();

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);

  const makeStore = (authStatus: AuthStatus, user: User | null) => mockStore({
    AUTH: {
      authorizationStatus: authStatus,
      user: user,
      loginError: LogInError.NoError,
    },
  });

  const history = createMemoryHistory();

  const renderHeader = (store: MockStore) => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header className={''}/>
        </HistoryRouter>
      </Provider>
    );
  };

  it('should render user info and sign out button when authorized', () => {
    renderHeader(makeStore(AuthStatus.Authorized, mockUser));

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockUser.avatarUrl);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Sign out');
  });

  it('should render sign in link when not authorized', () => {
    renderHeader(makeStore(AuthStatus.NotAuthorized, null));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links.find((link) => link.getAttribute('href') === '/')).toBeDefined();
    expect(links.find((link) => link.getAttribute('href') === AppRoute.Login)).toBeDefined();
  });

  it('should redirect to sign in page when click sign in', async () => {
    render(
      <Provider store={ makeStore(AuthStatus.NotAuthorized, null)}>
        <HistoryRouter history={history}>
          <Header className={''}/>
          <Routes>
            <Route path={AppRoute.Login} element={<SignIn/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const logoLink = screen.getByTestId('signin-link');
    await userEvent.click(logoLink);

    expect(history.location.pathname).toBe(AppRoute.Login);
  });

  it('should sign out when click sign out', async () => {
    const store = makeStore(AuthStatus.Authorized, mockUser);
    renderHeader(store);

    expect(screen.getByText('Sign out')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(logout.pending.type);
  });

  it('should redirect to my list page when click user avatar', async () => {
    const store = makeStore(AuthStatus.Authorized, mockUser);
    renderHeader(store);

    expect(screen.getByRole('img')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('img'));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(redirectToRoute.type);
    expect(actions[actions.length - 1].payload).toBe(AppRoute.MyList);
  });
});
