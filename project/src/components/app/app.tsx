import Main from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';
import {AuthStatus} from '../../types/AuthStatus';

type AppProps = {
  isAuthorised: AuthStatus;
}

function App({isAuthorised} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Main isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.Login} element={<SignIn/>}/>
        <Route path={AppRoute.MyList} element=
          {
            <PrivateRoute isAuthorised={isAuthorised}>
              <MyList/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<Film isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.AddReview} element={<AddReview isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.Player} element={<Player isPause/>}/>
        <Route path={AppRoute.Page404} element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
