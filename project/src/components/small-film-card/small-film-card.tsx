import {FilmInfo} from '../../types/FilmInfo';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import VideoPlayer from '../video-player/video-player';

function SmallFilmCard({film}: {film: FilmInfo}):JSX.Element {

  const [isPlayerOn, setIsPlayerOn] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  function handleMouseOver() {
    setTimer(setTimeout(() => setIsPlayerOn(true), 1000));
  }

  function handleMouseOut() {
    clearTimeout(timer);
    setIsPlayerOn(false);
  }

  return (
    <article className="small-film-card catalog__films-card" onPointerEnter={handleMouseOver} onPointerLeave={handleMouseOut}>
      <div className="small-film-card__image">
        {
          isPlayerOn ?
            <VideoPlayer videoSrc={film.previewVideoLink} posterSrc={film.previewImage}/> :
            <img src={film.previewImage} alt={film.name} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
