import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

describe('Component: Logo', () => {

  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo className={'logo__link'}/>
      </HistoryRouter>
    );

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should redirect to main page when click', async () => {
    render(
      <HistoryRouter history={history}>
        <Logo className={'logo__link'}/>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe('/');
  });
});
