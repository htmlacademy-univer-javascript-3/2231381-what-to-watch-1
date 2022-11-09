import {Genre} from '../../types/Genre';
import {FilmInfo} from '../../types/FilmInfo';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import {Link, useSearchParams} from 'react-router-dom';
import FilmCardBackground from '../../components/film-card-background/film-card-background';

export type MainPageProps = {
  isAuthorised: AuthStatus;
  promoFilm: FilmInfo;
  films: FilmInfo[];
}

function Main(props: MainPageProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenre = searchParams.get('genre');

  const toSearchFormat = (str: string) => str.replaceAll(' ', '-').replaceAll('&', 'and');

  const filmsToShow = selectedGenre && selectedGenre !== toSearchFormat(Genre.All) ?
    props.films.filter((film) => toSearchFormat(film.genre) === selectedGenre) :
    props.films;

  const showGenresNav = () => {
    const links = [];

    for (const value of Object.values(Genre)){
      const className = toSearchFormat(value) === selectedGenre ? 'catalog__genres-item--active' : '';
      links.push(
        <li className={`catalog__genres-item ${className}`}>
          <Link className="catalog__genres-link" to={{pathname: '', search: `?genre=${toSearchFormat(value)}`}}>{value}</Link>
        </li> );
    }

    return links;
  };

  return(
    <>
      <section className="film-card">
        <FilmCardBackground backgroundImgSrc={props.promoFilm.backgroundImgSrc} filmName={props.promoFilm.name}/>

        <Header isAuthorised={props.isAuthorised} className='film-card__head'/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={props.promoFilm.posterImgSrc} alt={props.promoFilm.name} width="218" height="327"/>
            </div>
            <FilmCardDescription filmInfo={props.promoFilm} films={props.films}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {
              showGenresNav()
            }
          </ul>

          <FilmsList films={filmsToShow}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
