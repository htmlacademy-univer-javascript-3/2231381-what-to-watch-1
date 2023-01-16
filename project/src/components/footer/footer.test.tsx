import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import Footer from './footer';

describe('Component: Footer', () => {

  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer/>
      </HistoryRouter>
    );

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
