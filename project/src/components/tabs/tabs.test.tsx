import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import HistoryRouter from "../history-router/history-router";
import {makeFakeFilm} from "../../utils/mocks";
import Tabs from "./tabs";

describe('Component: Tabs', () => {
  const mockFilm = makeFakeFilm();
  const history = createMemoryHistory();

  it('should render navigation and film details by default', () => {
    render(
      <HistoryRouter history={history}>
        <Tabs filmInfo={mockFilm}/>
      </HistoryRouter>
    );

    const tabsNames = ['Overview', 'Details', 'Reviews'];
    for (const content of tabsNames) {
      expect(screen.getByTestId(content)).toBeInTheDocument();
    }

    expect(screen.getByTestId('Details')).toBeInTheDocument();
  })
})
