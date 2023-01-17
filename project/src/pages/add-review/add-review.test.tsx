import HistoryRouter from '../../components/history-router/history-router';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import AddReview from './add-review';
import {makeFakeFilm, makeFakeUser} from '../../utils/mocks';
import Page404 from '../page-404/page-404';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import PrivateRoute from '../../components/private-route/private-route';
import {User} from '../../types/User';
import {FilmInfo} from '../../types/FilmInfo';
import userEvent from '@testing-library/user-event';


describe('Component: AddReview', () => {
  const mockFilm = makeFakeFilm();
  const mockUser = makeFakeUser();

  const mockStore = configureMockStore();

  const makeStore = (authStatus: AuthStatus, user: User | null, film: FilmInfo | null) => mockStore({
    AUTH: {
      authorizationStatus: authStatus,
      user: user,
      loginError: LogInError.NoError,
    },
    FILM: {
      film: film,
      similarFilms: [],
      reviews: [],
      postReviewError: null,
      similarFilmsLoaded: false,
    },
  });

  const history = createMemoryHistory();

  it('should render correctly when authorized and film not null', () => {
    const store = makeStore(AuthStatus.Authorized, mockUser, mockFilm);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-form')).toBeInTheDocument();
  });

  it('should render page 404 when no such film', () => {
    const store = makeStore(AuthStatus.Authorized, mockUser, null);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.AddReview} element=
              {
                <PrivateRoute>
                  <AddReview/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Page404} element={<Page404/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('404. Такой страницы не существует')).toBeInTheDocument();
  });

  it('should redirect to film page when click on link', async () => {
    render(
      <Provider store={makeStore(AuthStatus.Authorized, mockUser, mockFilm)}>
        <HistoryRouter history={history}>
          <AddReview/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('link-to-film'));

    expect(history.location.pathname).toBe(`/films/${mockFilm.id}`);
  });
});
