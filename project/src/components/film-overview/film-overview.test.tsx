import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import HistoryRouter from "../history-router/history-router";
import {makeFakeFilm} from "../../utils/mocks";
import FilmOverview from "./film-overview";

describe('Component: FilmOverview', () => {
  const mockFilm = makeFakeFilm();
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmOverview filmInfo={mockFilm}/>
      </HistoryRouter>
    );

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.scoresCount, {exact: false})).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${mockFilm.starring.join(', ')} and other`)).toBeInTheDocument();
  })
})
