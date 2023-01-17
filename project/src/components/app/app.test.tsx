import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import App from './app';
import HistoryRouter from '../history-router/history-router';
import {AuthStatus} from '../../types/AuthStatus';
import {LogInError} from '../../types/LogInError';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {makeFakeFilms, makeFakeUser} from '../../utils/mocks';
import {testSignInPageRender} from '../../pages/sign-in/sign-in.test';
import {testMainPageRender} from '../../pages/main/main.test';
import {User} from '../../types/User';


describe('Application Routing', () => {
  const mockFilms = makeFakeFilms();
  const mockFilm = mockFilms[0];
  const mockPromoFilm = mockFilms[0];
  const mockUser = makeFakeUser();

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);

  const history = createMemoryHistory();

  function renderFakeApp (authStatus: AuthStatus, user: User | null) {
    const store = mockStore({
      FILM: {
        film: mockFilm,
        similarFilms: [],
        reviews: [],
        postReviewError: null,
        similarFilmsLoaded: false,
      },
      AUTH: {
        authorizationStatus: authStatus,
        user: user,
        loginError: LogInError.NoError,
      },
      MAIN: {
        films: mockFilms,
        promoFilm: mockPromoFilm,
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>
    );
  }

  it('should render main page when user navigate to "/"', () => {
    history.push('/');

    renderFakeApp(AuthStatus.NotAuthorized, null);

    testMainPageRender(mockPromoFilm, [], mockFilms);
  });

  it('should render sign in page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    renderFakeApp(AuthStatus.NotAuthorized, null);

    testSignInPageRender();
  });

  it('should render my list page when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    renderFakeApp(AuthStatus.Authorized, mockUser);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render film page when user navigate to "/films/:id"', () => {
    history.push(`/films/${mockFilm.id}`);

    renderFakeApp(AuthStatus.NotAuthorized, null);

    expect(screen.getByText('More like this')).toBeInTheDocument();
  });

  it('should render add review page when user navigate to "/films/:id/review"', () => {
    history.push(`/films/${mockFilm.id}/review`);

    renderFakeApp(AuthStatus.Authorized, mockUser);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-form')).toBeInTheDocument();
  });

  it('should render player when user navigate to "/player/:id"', () => {
    history.push(`/player/${mockFilm.id}`);

    renderFakeApp(AuthStatus.NotAuthorized, null);

    const video = screen.getByTestId('video-player');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', `${mockFilm.videoLink}#t=0`);

    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render 404 page when user navigate to "*"', () => {
    history.push('/undefined');

    renderFakeApp(AuthStatus.NotAuthorized, null);

    expect(screen.getByText('404. Такой страницы не существует')).toBeInTheDocument();
  });
});
