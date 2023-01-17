import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import Player from './player';
import {makeFakeFilm} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: Player', () => {
  const mockFilm = makeFakeFilm();

  const mockStore = configureMockStore();
  const store = mockStore({
    FILM: {
      film: mockFilm,
      similarFilms: [],
      reviews: [],
      postReviewError: null,
      similarFilmsLoaded: false,
    },
  });

  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player/>
        </HistoryRouter>
      </Provider>
    );

    const video = screen.getByTestId('video-player');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', `${mockFilm.videoLink}#t=0`);

    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should start and stop playing when click play/pause button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('play-button'));

    expect(screen.getByTestId('pause-button')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('pause-button'));

    expect(screen.getByTestId('play-button')).toBeInTheDocument();
  });
});
