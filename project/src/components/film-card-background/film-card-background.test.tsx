import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import HistoryRouter from "../history-router/history-router";
import FilmCardBackground from "./film-card-background";
import {makeFakeFilm} from "../../utils/mocks";

describe('Component: FilmCardBackground', () => {
  const history = createMemoryHistory();

  it('should render background image when it is defined', () => {
    const mockFilm = makeFakeFilm();

    render(
      <HistoryRouter history={history}>
        <FilmCardBackground backgroundImgSrc={mockFilm.backgroundImage}
                            backgroundColor={mockFilm.backgroundColor}
                            filmName={mockFilm.name}/>
      </HistoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockFilm.backgroundImage);
  });

  it('should render background color when background image is undefined', () => {
    const mockFilm = makeFakeFilm();

    render(
      <HistoryRouter history={history}>
        <FilmCardBackground backgroundImgSrc={undefined}
                            backgroundColor={mockFilm.backgroundColor}
                            filmName={mockFilm.name}/>
      </HistoryRouter>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByTestId('film-card-background-color')).toBeInTheDocument();
  })
})
