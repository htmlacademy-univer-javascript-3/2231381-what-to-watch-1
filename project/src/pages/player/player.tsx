import {Link, Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-data/selectors';

type PlayerProps = {
  isPause: boolean;
}

function Player(props: PlayerProps): JSX.Element {

  const film = useAppSelector(getFilm);

  return ( film ?
    <div className="player">
      <video src={film.videoLink} className="player__video" poster="img/player-poster.jpg"/>

      <Link to={`/films/${film.id}`} type="button" className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">

          <button type="button" className="player__play">
            {props.isPause ?
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg> :
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg> }
          </button>

          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div> : <Navigate to={AppRoute.Page404}/>
  );
}

export default Player;
