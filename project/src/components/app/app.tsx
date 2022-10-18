import Main, {MainPageProps} from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film, {FilmPageContentType} from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Page404 from '../../pages/404/404';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';

function App(props: MainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element=
          {
            <Main promoFilmName={props.promoFilmName}
              promoFilmGenre={props.promoFilmGenre}
              promoFilmYear={props.promoFilmYear}
              promoFilmPosterImgSrc={props.promoFilmPosterImgSrc}
              promoFilmBackgroundImgSrc={props.promoFilmBackgroundImgSrc}
            />
          }
        />
        <Route path={AppRoute.Login} element={<SignIn/>}/>
        <Route path={AppRoute.MyList} element=
          {
            <PrivateRoute isAuthorised={false}>
              <MyList/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element=
            {
              <Film backgroundImgSrc={props.promoFilmBackgroundImgSrc}
                    name={props.promoFilmName}
                    genre={props.promoFilmGenre}
                    year={props.promoFilmYear}
                    posterImgSrc={props.promoFilmPosterImgSrc}
                    contentType={FilmPageContentType.Overview}
                    isInList={false}
              />
            }
          />
          <Route path={AppRoute.FilmDetails} element=
            {
              <Film backgroundImgSrc={props.promoFilmBackgroundImgSrc}
                    name={props.promoFilmName}
                    genre={props.promoFilmGenre}
                    year={props.promoFilmYear}
                    posterImgSrc={props.promoFilmPosterImgSrc}
                    contentType={FilmPageContentType.Details}
                    isInList={false}
              />
            }
          />
          <Route path={AppRoute.FilmReviews} element=
            {
              <Film backgroundImgSrc={props.promoFilmBackgroundImgSrc}
                    name={props.promoFilmName}
                    genre={props.promoFilmGenre}
                    year={props.promoFilmYear}
                    posterImgSrc={props.promoFilmPosterImgSrc}
                    contentType={FilmPageContentType.Reviews}
                    isInList={false}
              />
            }
          />
        </Route>
        <Route path={AppRoute.AddReview} element={<AddReview/>}/>
        <Route path={AppRoute.Player} element={<Player isPause/>}/>
        <Route path={AppRoute.Page404} element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
