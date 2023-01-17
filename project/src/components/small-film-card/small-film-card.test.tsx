import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import SmallFilmCard from './small-film-card';
import {makeFakeFilm} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: SmallFilmCard', () => {
  const mockFilm = makeFakeFilm();

  const history = createMemoryHistory();

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

  it('should redirect to film page when click', async () => {
    render(
      <HistoryRouter history={history}>
        <SmallFilmCard film={mockFilm}/>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe(`/films/${mockFilm.id}`);
  });

  it('should play video when hovering and show preview image when unhover', async () => {
    render(
      <HistoryRouter history={history}>
        <SmallFilmCard film={mockFilm}/>
      </HistoryRouter>
    );

    const previewImage = screen.getByRole('img');
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute('src', mockFilm.previewImage);

    await userEvent.hover(screen.getByTestId('small-film-card'));

    setTimeout(() => {
      const video = screen.getByTestId('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', `${mockFilm.videoLink}#t=0`);
    }, 1000);

    await userEvent.unhover(screen.getByTestId('small-film-card'));
    expect(previewImage).toBeInTheDocument();
  });
});
