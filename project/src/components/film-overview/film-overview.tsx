import {FilmInfo} from '../../types/FilmInfo';
import React, {useMemo} from 'react';

function FilmOverview({filmInfo}: {filmInfo: FilmInfo}){

  const getScore = (rating: number) => {
    if (0 <= rating && rating < 3){
      return 'Bad';
    } else if (3 <= rating && rating < 5){
      return 'Normal';
    } else if (5 <= rating && rating < 8){
      return 'Good';
    } else if (8 <= rating && rating < 10){
      return 'Very good';
    } else {
      return 'Awecome';
    }
  };

  const score = useMemo(() => getScore(filmInfo.rating), [filmInfo.rating]);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmInfo.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{score}</span>
          <span className="film-rating__count">{`${filmInfo.scoresCount} ${filmInfo.scoresCount === 1 ? 'rating' : 'ratings'}`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{filmInfo.description}</p>
        <p className="film-card__director"><strong>Director: {filmInfo.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {filmInfo.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default React.memo(FilmOverview);
