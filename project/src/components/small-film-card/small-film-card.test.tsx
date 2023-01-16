import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import SmallFilmCard from './small-film-card';
import {makeFakeFilm} from '../../utils/mocks';

describe('Component: SmallFilmCard', () => {

  const history = createMemoryHistory();

  const mockFilm = makeFakeFilm();

  it('should render preview image when player is off', () => {
    render(
      <HistoryRouter history={history}>
        <SmallFilmCard film={mockFilm}/>
      </HistoryRouter>
    );

    const linkToFilmPage = screen.getByRole('link');
    expect(linkToFilmPage).toBeInTheDocument();
    expect(linkToFilmPage).toHaveAttribute('href', `/films/${mockFilm.id}`);

    const previewImage = screen.getByRole('img');
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute('src', mockFilm.previewImage);
  });
});
