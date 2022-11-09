import {FilmInfo} from '../../types/FilmInfo';
import {Link} from 'react-router-dom';

function SmallFilmCard({film}: {film: FilmInfo}):JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={film.posterImgSrc} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
