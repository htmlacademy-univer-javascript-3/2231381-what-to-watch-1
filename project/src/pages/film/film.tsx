import {Link, useParams} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import Tabs from '../../components/tabs/tabs';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchFilm, fetchReviews, fetchSimilarFilms} from '../../store/api-action';
import {AuthStatus} from '../../types/AuthStatus';
import {getFilm, getSimilarFilms} from '../../store/film-data/selectors';
import {getAuthStatus} from '../../store/auth-process/selectors';

export enum FilmPageContentType {
  Overview='Overview',
  Details='Details',
  Reviews='Reviews'
}

function Film(): JSX.Element {

  const params = useParams();
  const filmId = params.id;

  const authorizationStatus = useAppSelector(getAuthStatus);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filmId !== undefined) {
      dispatch(fetchFilm(filmId));
      dispatch(fetchSimilarFilms(filmId));
      dispatch(fetchReviews(filmId));
    }
  }, [dispatch, filmId]);

  return (
    <>
      { film &&
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <FilmCardBackground backgroundImgSrc={film.backgroundImage} filmName={film.name}/>

            <Header className='film-card__head'/>

            <div className="film-card__wrap">
              <FilmCardDescription filmInfo={film}>
                {authorizationStatus === AuthStatus.Authorized && <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>}
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
        </section>}


      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={similarFilms} genre={film?.genre || 'All Genres'}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Film;
