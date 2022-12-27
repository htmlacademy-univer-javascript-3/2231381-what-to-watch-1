type FilmCardBackgroundProps = {
  backgroundImgSrc: string | undefined;
  backgroundColor: string,
  filmName: string;
}

function FilmCardBackground(props: FilmCardBackgroundProps) {
  return (
    props.backgroundImgSrc ?
      <div className="film-card__bg">
            <img src={props.backgroundImgSrc} alt={props.filmName}/>
      </div> :
      <div className="film-card__bg" style={{backgroundColor: props.backgroundColor}}/>
  );
}

export default FilmCardBackground;
