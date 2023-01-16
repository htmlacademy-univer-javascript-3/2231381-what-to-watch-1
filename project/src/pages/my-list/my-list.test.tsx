import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import MyList from './my-list';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';

describe('Component: MyList', () => {

  const history = createMemoryHistory();

  const mockFilms = makeFakeFilms();

  const mockStore = configureMockStore();

  const store = mockStore({
    AUTH: {
      authorizationStatus: AuthStatus.Authorized,
      user: makeFakeUser(),
      loginError: LogInError.NoError,
    },
    MYLIST: {
      myList: mockFilms,
      myListLength: 0,
      changedFilm: null,
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    for (const film of mockFilms) {
      expect(screen.getByText(film.name)).toBeInTheDocument();
    }
  });
});
