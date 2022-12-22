import {FilmInfo} from '../../types/FilmInfo';
import React, {useMemo} from "react";

function FilmDetails({filmInfo}: {filmInfo: FilmInfo}) {

  const renderStarringActors = (starring: string[]) => starring.slice(0, starring.length - 2).map((actor) => (
    <>
      {actor}, <br/>
    </>
  )).concat(<>{starring[starring.length - 1]}</>);
  const starringActors = useMemo(() => renderStarringActors(filmInfo.starring), [filmInfo]);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{filmInfo.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starringActors}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmInfo.runTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{filmInfo.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{filmInfo.released}</span>
        </p>
      </div>
    </div>
  );
}

export default React.memo(FilmDetails);
