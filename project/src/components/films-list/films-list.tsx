import {FilmInfo} from '../../types/FilmInfo';
import SmallFilmCard from '../small-film-card/small-film-card';
import React, {useMemo, useState} from "react";

function FilmsList({films, genre}: {films: FilmInfo[]; genre: string}) {

  const initialNumberOfFilms = films.length > 8 ? 8 : films.length;
  const [numberOfFilmsToShow, setNumberOfFilmsToShow] = useState(initialNumberOfFilms);

  const renderFilms = (films: FilmInfo[], genre: string, numberOfFilms: number) => {
    const filmsToShow = genre === 'All Genres' ? films : films.filter((film) => film.genre === genre);

    const filmCards = [];
    let i = 0;

    while (i < filmsToShow.length && i < numberOfFilms){
      filmCards.push(<SmallFilmCard key={filmsToShow[i].id}  film={filmsToShow[i]}/>);
      i++;
    }

    return filmCards;
  };
  const filmsToShow = useMemo(() => renderFilms(films, genre, numberOfFilmsToShow), [films, genre, numberOfFilmsToShow]);

  return(
    <>
      <div className="catalog__films-list">
        { filmsToShow }
      </div>
      {
        numberOfFilmsToShow < films.length &&
        <div className="catalog__more">
          <button className="catalog__button"
                  type="button"
                  onClick={() => setNumberOfFilmsToShow(numberOfFilmsToShow + 8)}>
            Show more
          </button>
        </div>
      }
    </>
  );
}

export default FilmsList;
