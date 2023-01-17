import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {makeFakeFilm, makeFakeReviews} from '../../utils/mocks';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

describe('Component: Tabs', () => {
  const mockFilm = makeFakeFilm();

  const history = createMemoryHistory();

  const tabsNames = ['Overview', 'Details', 'Reviews'];

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Tabs filmInfo={mockFilm}/>
      </HistoryRouter>
    );

    for (const content of tabsNames) {
      expect(screen.getByTestId(`${content}-tab`)).toBeInTheDocument();
    }
  });

  it('should change tab when click buttons', async () => {
    const mockStore = configureMockStore();
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs filmInfo={mockFilm}/>
        </HistoryRouter>
      </Provider>
    );

    for (const content of tabsNames) {
      await userEvent.click(screen.getByTestId(`${content}-tab`));

      switch (content) {
        case 'Overview':
          expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
          expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
          break;
        case 'Details':
          expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
          expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
          break;
        case 'Reviews':
          expect(screen.queryAllByTestId('review')).toHaveLength(mockReviews.length);
          break;
      }
    }
  });
});
