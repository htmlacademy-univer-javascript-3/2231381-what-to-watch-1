import HistoryRouter from '../../components/history-router/history-router';
import Page404 from './page-404';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';

describe('Component: Page404', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    AUTH: {
      authorizationStatus: AuthStatus.Unknown,
      user: null,
      loginError: LogInError.NoError,
    },
  });
  const history = createMemoryHistory();


  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Page404/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('404. Такой страницы не существует')).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).not.toHaveLength(0);
  });
});
