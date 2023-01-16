import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import App from './app';
import HistoryRouter from "../history-router/history-router";
import {AuthStatus} from "../../types/AuthStatus";
import {LogInError} from "../../types/LogInError";
import thunk from "redux-thunk";
import {createAPI} from "../../services/api";
import {makeFakeFilms, makeFakeUser} from "../../utils/mocks";
import {testSignInRender} from "../../pages/sign-in/sign-in.test";
import {AuthProcess} from "../../types/state";

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockFilms = makeFakeFilms();
const mockFilm = mockFilms[0];

const history = createMemoryHistory();

function makeStore (authState: AuthProcess) {
  return mockStore({
    FILM: {
      film: mockFilm,
      similarFilms: [],
      reviews: [],
      postReviewError: null,
      similarFilmsLoaded: false,
    },
    AUTH: authState,
    MAIN: {
      films: mockFilms,
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
}

function renderFakeApp (authStatus?: AuthStatus) {
  if (authStatus && authStatus === AuthStatus.Authorized) {
    render(
      <Provider store={
        makeStore({
          authorizationStatus: AuthStatus.Authorized,
          user: makeFakeUser(),
          loginError: LogInError.NoError,
        })}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>
    );

    return;
  }

  render(
    <Provider store={
      makeStore({
        authorizationStatus: AuthStatus.NotAuthorized,
        user: null,
        loginError: LogInError.NoError,
      })}>
      <HistoryRouter history={history}>
        <App/>
      </HistoryRouter>
    </Provider>
  );
}


describe('Application Routing', () => {
  it('should render main page when user navigate to "/"', () => {
    history.push('/');

    renderFakeApp();

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render sign in page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    renderFakeApp(AuthStatus.NotAuthorized)

    testSignInRender();
  });

  // это же private
  it('should render my list page when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    renderFakeApp(AuthStatus.Authorized);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render film page when user navigate to "/films/:id"', () => {
    history.push(`/films/${mockFilm.id}`);

    renderFakeApp();

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More Like This/i)).toBeInTheDocument();
  });

  // это же private
  it('should render add review page when user navigate to "/films/:id/review"', () => {
    history.push(`/films/${mockFilm.id}/review`);

    renderFakeApp(AuthStatus.Authorized);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-form')).toBeInTheDocument();
  });

  it('should render player when user navigate to "/player/:id"', () => {
    history.push(`/player/${mockFilm.id}`);

    renderFakeApp();

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });

  it('should render 404 page when user navigate to "*"', () => {
    history.push('/undefined');

    renderFakeApp();

    expect(screen.getByText('404. Такой страницы не существует')).toBeInTheDocument();
  });
});
