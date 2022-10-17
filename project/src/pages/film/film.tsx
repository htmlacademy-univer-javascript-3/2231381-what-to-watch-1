import FilmOverview from './film-overview';
import FilmReviews from './film-reviews';
import FilmDetails from './film-details';
import SmallFilmCard, {SmallFilmCardProps} from '../../components/small-film-card/small-film-card';

export enum FilmPageContentType {
  Overview,
  Details,
  Reviews
}

type FilmPageProps = {
  backgroundImgSrc: string;
  name: string;
  genre: string;
  year: number;
  posterImgSrc: string;
  contentType: FilmPageContentType;
  isInList: boolean;
}

function Film(props: FilmPageProps): JSX.Element {
  let content;
  switch (props.contentType) {
    case FilmPageContentType.Overview:
      content = <FilmOverview/>;
      break;
    case FilmPageContentType.Details:
      content = <FilmDetails/>;
      break;
    case FilmPageContentType.Reviews:
      content = <FilmReviews/>;
      break;
  }

  const moreLikeThisFilms: SmallFilmCardProps[] = [
    {posterImgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
      filmName: 'Fantastic Beasts: The Crimes of Grindelwald'},
    {posterImgSrc: 'img/bohemian-rhapsody.jpg',
      filmName: 'Bohemian Rhapsody'},
    {posterImgSrc: 'img/macbeth.jpg',
      filmName: 'Macbeth'},
    {posterImgSrc: 'img/aviator.jpg',
      filmName: 'Aviator'}
  ];

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={props.backgroundImgSrc} alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{props.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.genre}</span>
                <span className="film-card__year">{props.year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  {
                    props.isInList ?
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg> :
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                  }
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={props.posterImgSrc} alt={props.name} width="218"
                height="327"
              />
            </div>

            {content}

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {
              moreLikeThisFilms.map((filmCardProps) => (
                <SmallFilmCard key={filmCardProps.filmName}
                  posterImgSrc={filmCardProps.posterImgSrc}
                  filmName={filmCardProps.filmName}
                />))
            }
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Film;
