import {FilmInfo} from '../../types/FilmInfo';
import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import VideoPlayer from '../video-player/video-player';

function SmallFilmCard({film}: {film: FilmInfo}):JSX.Element {

  const [isPlayerOn, setIsPlayerOn] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setTimeout(() => setIsPlayerOn(true), 1000);
  const handleMouseOut = () => setIsPlayerOn(false);

  useEffect(() => {
    // @ts-ignore
    const card : EventTarget = ref.current;
    if (card) {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);

      return () => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }
  );

  return (
    <article className="small-film-card catalog__films-card" ref={ref}>
      <div className="small-film-card__image">
        {
          isPlayerOn ?
            <VideoPlayer videoSrc={film.videoSrc} posterSrc={film.posterImgSrc}/> :
            <img src={film.posterImgSrc} alt={film.name} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
