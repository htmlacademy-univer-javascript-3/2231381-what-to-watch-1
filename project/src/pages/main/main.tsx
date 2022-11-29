import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import FilmsList from '../../components/films-list/films-list';
import FilmCardBackground from '../../components/film-card-background/film-card-background';
import {setGenre} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useState} from 'react';
import Spinner from '../../components/spinner/spinner';
import {fetchPromoFilm} from '../../services/api-action';

function Main(): JSX.Element {

  const dispatch = useAppDispatch();
  dispatch(fetchPromoFilm());
  const {selectedGenre, films, promoFilm, genres, isLoading} = useAppSelector((state) => state);
  const filmsToShow = selectedGenre === 'All Genres' ? films : films.filter((film) => film.genre === selectedGenre);


  const showGenresNav = () => {
    const links = [];

    for (const value of Array.from(genres)){
      const className = value === selectedGenre ? 'catalog__genres-item--active' : '';
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
      {promoFilm &&
        <section className="film-card">
          <FilmCardBackground backgroundImgSrc={promoFilm.backgroundImage} filmName={promoFilm.name}/>

          <Header className='film-card__head'/>

          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327"/>
              </div>
              <FilmCardDescription filmInfo={promoFilm}/>
            </div>
          </div>
        </section>}

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {
              showGenresNav()
            }
          </ul>

          {
            isLoading ? <Spinner/> : <FilmsList films={filmsToShow} numberOfFilms={numberOfFilmsToShow}/>
          }

          {
            numberOfFilmsToShow < films.length &&
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
