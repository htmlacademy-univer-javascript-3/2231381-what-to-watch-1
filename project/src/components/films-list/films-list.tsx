import {FilmInfo} from '../../types/FilmInfo';
import SmallFilmCard from '../small-film-card/small-film-card';

function FilmsList({films}: {films: FilmInfo[]}) {
  return(
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <SmallFilmCard key={film.id} film={film}/>))
      }
    </div>
  );
}

export default FilmsList;
