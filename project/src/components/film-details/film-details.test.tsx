import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {makeFakeFilm} from '../../utils/mocks';
import FilmDetails from './film-details';

describe('Component: FilmDetails', () => {
  const mockFilm = makeFakeFilm();
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <FilmDetails filmInfo={mockFilm}/>
      </HistoryRouter>
    );

    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    for (const actor of mockFilm.starring) {
      expect(screen.getByText(actor, {exact: false})).toBeInTheDocument();
    }
    expect(screen.getByText(mockFilm.runTime)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
