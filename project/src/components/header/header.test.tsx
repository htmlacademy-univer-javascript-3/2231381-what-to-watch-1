import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import {Provider} from 'react-redux';
import {makeFakeUser} from '../../utils/mocks';
import Header from './header';
import {AppRoute} from '../../const';

describe('Component: Header', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();

  it('should render user info and sign out button when authorized', () => {
    const mockUser = makeFakeUser();

    const store = mockStore({
      AUTH: {
        authorizationStatus: AuthStatus.Authorized,
        user: mockUser,
        loginError: LogInError.NoError,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header className={''}/>
        </HistoryRouter>
      </Provider>
    );

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
    const store = mockStore({
      AUTH: {
        authorizationStatus: AuthStatus.NotAuthorized,
        user: null,
        loginError: LogInError.NoError,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header className={''}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links.find((link) => link.getAttribute('href') === '/')).toBeDefined();
    expect(links.find((link) => link.getAttribute('href') === AppRoute.Login)).toBeDefined();
  });
});
