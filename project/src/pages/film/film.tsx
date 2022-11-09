import FilmOverview from './film-overview';
import FilmReviews from './film-reviews';
import FilmDetails from './film-details';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const contentType = searchParams.get('content');

  let content = null;
  let moreLikeThisFilms: FilmInfo[] = [];
  if (film){
    moreLikeThisFilms = props.films.filter((filmInfo) => filmInfo.genre === film.genre);

    switch (contentType) {
      case FilmPageContentType.Overview:
        content = <FilmOverview filmInfo={film}/>;
        break;
      case FilmPageContentType.Details:
        content = <FilmDetails filmInfo={film}/>;
        break;
      case FilmPageContentType.Reviews:
        content = <FilmReviews filmInfo={film}/>;
        break;
      default:
        content = <FilmOverview filmInfo={film}/>;
        break;
    }
  }

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

            {content}

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={moreLikeThisFilms}/>
        </section>

        <Footer/>
      </div>
    </> : <Navigate to={AppRoute.Page404}/>
  );
}

export default Film;
