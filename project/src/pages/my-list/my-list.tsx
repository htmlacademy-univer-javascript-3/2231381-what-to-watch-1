import {FilmInfo} from '../../types/FilmInfo';
import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';

function MyList({films} : {films: FilmInfo[]}): JSX.Element {

  const filmsInList = films.filter((film) => film.isInList);

  return (
    <div className="user-page">

      <Header isAuthorised={AuthStatus.Authorized} className='user-page__head'>
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
