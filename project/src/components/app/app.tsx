import Main from '../../pages/main/main';
import {Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='' element={<Main/>}/>
      <Route path={AppRoute.Login} element={<SignIn/>}/>
      <Route path={AppRoute.MyList} element=
        {
          <PrivateRoute>
            <MyList/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Film} element={<Film/>}/>
      <Route path={AppRoute.AddReview} element=
        {
          <PrivateRoute>
            <AddReview/>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Player} element={<Player/>}/>
      <Route path={AppRoute.Page404} element={<Page404/>}/>
    </Routes>
  );
}

export default App;
