import {Genre} from '../../types/Genre';
import {FilmInfo} from '../../types/FilmInfo';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import {setGenre} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useState} from 'react';

export type MainPageProps = {
  isAuthorised: AuthStatus;
  promoFilm: FilmInfo;
  films: FilmInfo[];
}

function Main(props: MainPageProps): JSX.Element {

  const dispatch = useAppDispatch();
  const genre = useAppSelector((state) => state.genre);
  const filmsToShow = genre === Genre.All ? props.films : props.films.filter((film) => film.genre === genre);

  const showGenresNav = () => {
    const links = [];

    for (const value of Object.values(Genre)){
      const className = value === genre ? 'catalog__genres-item--active' : '';
      links.push(
        <li className={`catalog__genres-item ${className}`}>
          <button className="catalog__genres-link"
            onClick={() => dispatch(setGenre(value))}
            style={{background:'transparent', border:'none'}}
          >
            {value}
          </button>
        </li> );
    }

    return links;
  };

  const [numberOfFilmsToShow, setNumberOfFilmsToShow] = useState(8);

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

          <FilmsList films={filmsToShow} numberOfFilms={numberOfFilmsToShow}/>

          {
            numberOfFilmsToShow < props.films.length &&
            <div className="catalog__more">
              <button className="catalog__button" type="button" onClick={() => setNumberOfFilmsToShow(numberOfFilmsToShow + 8)}>Show more</button>
            </div>
          }

        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
