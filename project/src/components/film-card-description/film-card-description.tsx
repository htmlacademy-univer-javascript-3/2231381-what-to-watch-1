import {FilmInfo} from '../../types/FilmInfo';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getChangedFilm, getMyListLength} from '../../store/my-list-data/selectors';
import {changeFilmStatus, fetchMyList} from '../../store/api-action';
import {getAuthStatus} from '../../store/auth-process/selectors';
import {AuthStatus} from '../../types/AuthStatus';
import {redirectToRoute} from '../../store/action';
import {AppRoute} from '../../const';

type FilmCardDescriptionProps = PropsWithChildren<{
  filmInfo: FilmInfo;
}>

function FilmCardDescription(props: FilmCardDescriptionProps){
  const myListLength = useAppSelector(getMyListLength);
  const changedFilm = useAppSelector(getChangedFilm);

  const [isInList, setIsInList] = useState(props.filmInfo.isFavorite);

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const changeStatus = () => {
    if (authStatus === AuthStatus.NotAuthorized) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      dispatch(changeFilmStatus({filmId: props.filmInfo.id, status: +(!isInList)}));
    }
  };

  useEffect(() => {
    dispatch(fetchMyList());
    if (changedFilm && changedFilm.filmId === props.filmInfo.id){
      setIsInList(changedFilm.status);
    } else if (!changedFilm) {
      setIsInList(false);
    }
  }, [changedFilm, dispatch, props.filmInfo.id]);

  return(
    <div className="film-card__desc" data-testid="film-card-description">
      <h2 className="film-card__title">{props.filmInfo.name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{props.filmInfo.genre}</span>
        <span className="film-card__year">{props.filmInfo.released}</span>
      </p>

      <div className="film-card__buttons">
        <Link to={`/player/${props.filmInfo.id}`} className="btn btn--play film-card__button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </Link>

        <button className="btn btn--list film-card__button"
          type="button"
          onClick={changeStatus}
          data-testid="add-to-my-list-button"
        >
          {
            <>
              {
                isInList ?
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"/>
                  </svg> :
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
              }
              <span>My list</span>
              <span className="film-card__count" data-testid='my-list-count'>{myListLength}</span>
            </>
          }
        </button>

        {props.children}
      </div>
    </div>
  );
}

export default React.memo(FilmCardDescription);
