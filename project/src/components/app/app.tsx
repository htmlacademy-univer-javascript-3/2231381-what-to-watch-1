import Main from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/404/404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';
import {FilmInfo} from '../../types/FilmInfo';
import {AuthStatus} from '../../types/AuthStatus';

type AppProps = {
  promoFilm: FilmInfo;
  films: FilmInfo[];
  isAuthorised: AuthStatus;
}

function App({promoFilm, films, isAuthorised} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Main promoFilm={promoFilm} films={films} isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.Login} element={<SignIn/>}/>
        <Route path={AppRoute.MyList} element=
          {
            <PrivateRoute isAuthorised={isAuthorised}>
              <MyList films={films}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<Film films={films} isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.AddReview} element={<AddReview films={films} isAuthorised={isAuthorised}/>}/>
        <Route path={AppRoute.Player} element={<Player films={films} isPause/>}/>
        <Route path={AppRoute.Page404} element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
