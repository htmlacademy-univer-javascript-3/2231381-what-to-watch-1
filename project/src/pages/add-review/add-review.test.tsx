import HistoryRouter from "../../components/history-router/history-router";
import {render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {AuthStatus} from "../../types/AuthStatus";
import {LogInError} from "../../types/LogInError";
import AddReview from "./add-review";
import {makeFakeFilm, makeFakeUser} from "../../utils/mocks";
import Page404 from "../page-404/page-404";
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from "../../const";
import PrivateRoute from "../../components/private-route/private-route";

describe('Component: AddReview', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();


  it('should render correctly when authorized and film not null', () => {
    const mockFilm = makeFakeFilm();
    const mockUser = makeFakeUser();
    const store = mockStore({
      AUTH: {
        authorizationStatus: AuthStatus.Authorized,
        user: mockUser,
        loginError: LogInError.NoError,
      },
      FILM: {
        film: mockFilm,
        similarFilms: [],
        reviews: [],
        postReviewError: null,
        similarFilmsLoaded: false,
      },
    });

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
    const mockUser = makeFakeUser();
    const store = mockStore({
      AUTH: {
        authorizationStatus: AuthStatus.Authorized,
        user: mockUser,
        loginError: LogInError.NoError  ,
      },
      FILM: {
        film: null,
        similarFilms: [],
        reviews: [],
        postReviewError: null,
        similarFilmsLoaded: false,
      },
    });

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
})
