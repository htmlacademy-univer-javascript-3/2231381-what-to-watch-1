import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import {useAppSelector} from '../../hooks';
import {getMyList} from '../../store/my-list-data/selectors';

function MyList(): JSX.Element {

  const myList = useAppSelector(getMyList);

  return (
    <div className="user-page">

      <Header className='user-page__head'>
        <h1 className="page-title user-page__title">My list<span className="user-page__film-count">{myList.length}</span></h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={myList} genre={'All Genres'}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyList;
