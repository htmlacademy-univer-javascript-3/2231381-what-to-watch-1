type FilmCardBgProps = {
  backgroundImgSrc: string | undefined;
  filmName: string;
}

function FilmCardBg(props: FilmCardBgProps) {
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

export default FilmCardBg;
