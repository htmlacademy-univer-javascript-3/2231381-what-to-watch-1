import FilmOverview from '../../components/tab/film-overview';
import FilmReviews from '../../components/tab/film-reviews';
import FilmDetails from '../../components/tab/film-details';
import {FilmInfo} from '../../types/FilmInfo';
import {Link, useSearchParams, Navigate} from 'react-router-dom';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import {useFilmId} from '../../hooks/useFilmId';
import {AppRoute} from '../../const';
import Tab from "../../components/tab/tab";

export enum FilmPageContentType {
  Overview='Overview',
  Details='Details',
  Reviews='Reviews'
}

type FilmPageProps = {
  isAuthorised: AuthStatus;
  films: FilmInfo[];
}

function Film(props: FilmPageProps): JSX.Element {

  const film = useFilmId(props.films);

  return ( film ?
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <FilmCardBackground backgroundImgSrc={film.backgroundImgSrc} filmName={film.name}/>

          <Header isAuthorised={props.isAuthorised} className='film-card__head'/>

          <div className="film-card__wrap">
            <FilmCardDescription filmInfo={film} films={props.films}>
              <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
            </FilmCardDescription>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImgSrc} alt={film.name} width="218" height="327"/>
            </div>

            <Tab filmInfo={film}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={props.films.filter((filmInfo) => filmInfo.genre === film.genre)}/>
        </section>

        <Footer/>
      </div>
    </> : <Navigate to={AppRoute.Page404}/>
  );
}

export default Film;
