import {FilmInfo} from '../../types/FilmInfo';
import {PropsWithChildren, useState} from 'react';
import {Link} from 'react-router-dom';

type FilmCardDescProps = PropsWithChildren<{
  filmInfo: FilmInfo;
  films: FilmInfo[];
}>

function FilmCardDesc(props: FilmCardDescProps){

  const filmsInListCount = props.films.filter((filmInfo) => filmInfo.isInList).length;

  const [isInList, setIsInList] = useState(props.filmInfo.isInList);
  const [count, setCount] = useState(filmsInListCount);

  const addOrRemoveFilmToList = () => {
    isInList ? setCount(count - 1) : setCount(count + 1);
    setIsInList(!isInList);
  };

  return(
    <div className="film-card__desc">
      <h2 className="film-card__title">{props.filmInfo.name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{props.filmInfo.genre}</span>
        <span className="film-card__year">{props.filmInfo.year}</span>
      </p>

      <div className="film-card__buttons">
        <Link to={`/player/${props.filmInfo.id}`} className="btn btn--play film-card__button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </Link>

        <button className="btn btn--list film-card__button" type="button" onClick={addOrRemoveFilmToList}>
          {
            isInList ?
              <svg viewBox="0 0 18 14" width="18" height="14">
                <use xlinkHref="#in-list"></use>
              </svg> :
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
          }
          <span>My list</span>
          <span className="film-card__count">{count}</span>
        </button>

        {props.children}
      </div>
    </div>
  );
}

export default FilmCardDesc;
