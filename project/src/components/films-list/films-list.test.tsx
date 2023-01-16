import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {makeFakeFilms} from '../../utils/mocks';
import FilmsList from './films-list';

describe('Component: FilmsList', () => {

  const history = createMemoryHistory();

  it('should render films cards and show more button when more films left', () => {

    const mockFilms = makeFakeFilms([], 9);

    render(
      <HistoryRouter history={history}>
        <FilmsList films={mockFilms} genre={'All Genres'}/>
      </HistoryRouter>
    );

    const showMoreButton = screen.getByRole('button');
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent('Show more');

    expect(screen.queryAllByTestId('small-film-card')).toHaveLength(8);
  });

  it('should render only films cards when all films shown', () => {
    const mockFilms = makeFakeFilms([], 7);

    render(
      <HistoryRouter history={history}>
        <FilmsList films={mockFilms} genre={'All Genres'}/>
      </HistoryRouter>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('small-film-card')).toHaveLength(7);
  });
});
