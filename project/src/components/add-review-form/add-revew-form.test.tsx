import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import AddReviewForm from './add-review-form';
import {makeFakeFilm} from '../../utils/mocks';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {postReview} from '../../store/api-action';

describe('Component: AddReviewForm', () => {
  const mockFilm = makeFakeFilm();

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);
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

  it('should render disabled post button when not valid review', async() => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm filmId={mockFilm.id}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('review-text'), 'x'.repeat(49));

    const postButton = screen.getByRole('button');
    expect(postButton).toBeDisabled();

    await userEvent.type(screen.getByTestId('review-text'), 'x'.repeat(50));
    expect(postButton).toBeDisabled();

    await userEvent.click(screen.getByTestId('rating-5'));
    expect(postButton).toBeEnabled();
  });

  it ('should fetch post review when click post button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm filmId={mockFilm.id}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('review-text'), 'x'.repeat(50));
    await userEvent.click(screen.getByTestId('rating-5'));
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[actions.length - 1].type).toBe(postReview.pending.type);
  });
});
