import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchFilms, fetchMyList, getAuthStatus} from './store/api-action';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

store.dispatch(fetchFilms());
store.dispatch(getAuthStatus());
store.dispatch(fetchMyList());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
