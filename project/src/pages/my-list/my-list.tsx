import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import {useAppSelector} from '../../hooks';

function MyList(): JSX.Element {

  const {films} = useAppSelector((state) => state);
  const filmsInList = films.filter((film) => film.isFavorite);

  return (
    <div className="user-page">

      <Header className='user-page__head'>
        <h1 className="page-title user-page__title">My list<span className="user-page__film-count">{filmsInList.length.toString()}</span></h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={filmsInList}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyList;
