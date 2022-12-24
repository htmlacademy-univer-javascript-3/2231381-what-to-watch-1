import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-data/selectors';
import React, {useEffect, useRef, useState} from 'react';
import {fetchFilm} from '../../store/api-action';
import Spinner from '../../components/spinner/spinner';

function Player(): JSX.Element {
  const film = useAppSelector(getFilm);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPause, setIsPause] = useState(true);
  const play = () => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.play();
        setIsPause(false);
      } else {
        videoRef.current.pause();
        setIsPause(true);
      }
    }
  };

  const [timeLeft, setTimeLeft] = useState(0);
  const progressRef = useRef(null);
  const [progressPosition, setProgressPosition] = useState(0);
  const updateProgress = () => {
    if (videoRef.current) {
      setTimeLeft(Math.round(videoRef.current?.duration - videoRef.current?.currentTime));
      setProgressPosition((videoRef.current?.currentTime * 100) / videoRef.current?.duration);
    }
  };

  const getTimeLeft = () => {
    const hours = Math.floor(timeLeft / 60 / 60);
    const minutes = Math.floor(timeLeft / 60 - hours * 60);
    const seconds = Math.floor(timeLeft % 60);

    function timeToFormat (time: number) {
      return time > 9 ? time : `0${time}`;
    }

    return hours > 0 ?
      `${timeToFormat(hours)}:${timeToFormat(minutes)}:${timeToFormat(seconds)}` :
      `${timeToFormat(minutes)}:${timeToFormat(seconds)}`;
  };

  const dispatch = useAppDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(fetchFilm(params.id));
    }
  }, [dispatch, params.id]);

  return ( film ?
    <div className="player">
      <video src={`${film.videoLink}#t=0`}
        className="player__video"
        poster={film.posterImage}
        ref={videoRef}
        onTimeUpdate={updateProgress}
      />

      <Link to={`/films/${film.id}`} type="button" className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"/>
            <div className="player__toggler" style={{left: `${progressPosition}%`}} ref={progressRef}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>

        <div className="player__controls-row">

          <button type="button" className="player__play" onClick={play}>
            {isPause ?
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg> :
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg> }
          </button>

          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={() => {videoRef.current?.requestFullscreen();}}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div> : <Spinner/>
  );
}

export default Player;
