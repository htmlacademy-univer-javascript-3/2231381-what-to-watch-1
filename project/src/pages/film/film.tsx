import {Link, Navigate} from 'react-router-dom';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import {useFilmId} from '../../hooks/useFilmId';
import {AppRoute} from '../../const';
import Tabs from '../../components/tabs/tabs';
import {useAppSelector} from '../../hooks';

export enum FilmPageContentType {
  Overview='Overview',
  Details='Details',
  Reviews='Reviews'
}

type FilmPageProps = {
  isAuthorised: AuthStatus;
}

function Film(props: FilmPageProps): JSX.Element {

  const film = useFilmId();
  const {films} = useAppSelector((state) => state);

  return ( film ?
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <FilmCardBackground backgroundImgSrc={film.backgroundImage} filmName={film.name}/>

          <Header isAuthorised={props.isAuthorised} className='film-card__head'/>

          <div className="film-card__wrap">
            <FilmCardDescription filmInfo={film}>
              <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
            </FilmCardDescription>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <Tabs filmInfo={film}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={films.filter((filmInfo) => filmInfo.genre === film.genre)}/>
        </section>

        <Footer/>
      </div>
    </> : <Navigate to={AppRoute.Page404}/>
  );
}

export default Film;
