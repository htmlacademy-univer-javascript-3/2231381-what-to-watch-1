import {configureMockStore} from "@jedmao/redux-mock-store";
import {AuthStatus} from "../../types/AuthStatus";
import {LogInError} from "../../types/LogInError";
import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import HistoryRouter from "../../components/history-router/history-router";
import SignIn from "./sign-in";

describe('Component: SignIn', () => {
  const mockStore = configureMockStore();

  const store = mockStore({
    AUTH: {
      authorizationStatus: AuthStatus.Unknown,
      user: null,
      loginError: LogInError.NoError,
    },
  });
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
    expect(screen.getByRole('button')).not.toBeDisabled();

    const emailInput = screen.getByTestId('user-email')
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    const passwordInput = screen.getByTestId('user-password')
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });
})
