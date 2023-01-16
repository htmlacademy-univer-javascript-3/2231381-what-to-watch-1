import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import AddReviewForm from './add-review-form';
import {makeFakeFilm} from '../../utils/mocks';
import {Provider} from 'react-redux';

describe('Component: AddReviewForm', () => {
  const mockStore = configureMockStore();

  const mockFilm = makeFakeFilm();
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
          <AddReviewForm filmId={mockFilm.id}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
    expect(screen.getByTestId('review-text')).toBeInTheDocument();

    const postButton = screen.getByRole('button');
    expect(postButton).toBeInTheDocument();
    expect(postButton).toHaveTextContent('Post');
  });
});
