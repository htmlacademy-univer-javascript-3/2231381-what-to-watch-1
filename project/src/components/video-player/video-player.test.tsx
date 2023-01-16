import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import VideoPlayer from './video-player';
import {makeFakeFilm} from '../../utils/mocks';

describe('Component: VideoPlayer', () => {

  const history = createMemoryHistory();

  const mockFilm = makeFakeFilm();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <VideoPlayer videoSrc={mockFilm.videoLink} posterSrc={mockFilm.posterImage}/>
      </HistoryRouter>
    );

    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', `${mockFilm.videoLink}#t=0`);
  });
});
