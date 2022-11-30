import {FilmInfo} from '../../types/FilmInfo';
import SmallFilmCard from '../small-film-card/small-film-card';

function FilmsList({films, numberOfFilms}: {films: FilmInfo[]; numberOfFilms?: number}) {

  const renderFilms = () => {
    const filmCards = [];
    let i = 0;
    numberOfFilms = numberOfFilms || films.length;
    while (i < films.length && i < numberOfFilms){
      filmCards.push(<SmallFilmCard key={films[i].id} film={films[i]}/>);
      i++;
    }
    return filmCards;
  };

  return(
    <div className="catalog__films-list">
      { renderFilms() }
    </div>
  );
}

export default FilmsList;
