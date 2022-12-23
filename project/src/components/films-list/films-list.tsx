import {FilmInfo} from '../../types/FilmInfo';
import SmallFilmCard from '../small-film-card/small-film-card';
import React, {useMemo, useState} from 'react';

function FilmsList({films, genre}: {films: FilmInfo[]; genre: string}) {

  const filmsToShow = genre === 'All Genres' ? films : films.filter((film) => film.genre === genre);
  const initialNumberOfFilms = filmsToShow.length > 8 ? 8 : filmsToShow.length;
  const [numberOfFilmsToShow, setNumberOfFilmsToShow] = useState(initialNumberOfFilms);

  const renderFilms = (filmsToRender: FilmInfo[], numberOfFilms: number) => {
    const filmCards = [];
    let i = 0;

    while (i < filmsToRender.length && i < numberOfFilms){
      filmCards.push(<SmallFilmCard key={filmsToRender[i].id} film={filmsToRender[i]}/>);
      i++;
    }

    return filmCards;
  };
  const filmsList = useMemo(() => renderFilms(filmsToShow, numberOfFilmsToShow), [filmsToShow, numberOfFilmsToShow]);

  return(
    <>
      <div className="catalog__films-list">
        { filmsList }
      </div>
      {
        numberOfFilmsToShow < filmsToShow.length &&
        <div className="catalog__more">
          <button className="catalog__button"
            type="button"
            onClick={() => setNumberOfFilmsToShow(numberOfFilmsToShow + 8)}
          >
            Show more
          </button>
        </div>
      }
    </>
  );
}

export default FilmsList;
