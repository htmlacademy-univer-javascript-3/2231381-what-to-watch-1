import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import HistoryRouter from "../history-router/history-router";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {Provider} from "react-redux";
import {makeFakeFilm, makeFakeReviews} from "../../utils/mocks";
import FilmReviews from "./film-reviews";

describe('Component: FilmReviews', () => {
  const mockStore = configureMockStore();

  const mockFilm = makeFakeFilm();
  const mockReviews = makeFakeReviews();
  const store = mockStore({
    FILM: {
      film: mockFilm,
      similarFilms: [],
      reviews: mockReviews,
      postReviewError: null,
      similarFilmsLoaded: false,
    },
  });
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmReviews/>
        </HistoryRouter>
      </Provider>
    );

    for (const review of mockReviews) {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    }
  })
})
