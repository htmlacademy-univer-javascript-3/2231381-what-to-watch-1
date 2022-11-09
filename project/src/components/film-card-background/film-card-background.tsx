type FilmCardBackgroundProps = {
  backgroundImgSrc: string | undefined;
  filmName: string;
}

function FilmCardBackground(props: FilmCardBackgroundProps) {
  return (
    <div className="film-card__bg">
      {
        props.backgroundImgSrc ?
          <img src={props.backgroundImgSrc} alt={props.filmName}/> :
          null
      }
    </div>
  );
}

export default FilmCardBackground;
