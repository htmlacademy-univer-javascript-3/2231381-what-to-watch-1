import {useParams} from 'react-router-dom';
import {FilmInfo} from '../types/FilmInfo';

export function useFilmId(films: FilmInfo[]) {
  const params = useParams();
  const filmId = parseFloat(params.id as string);
  return films.find((filmInfo) => filmInfo.id === filmId);
}
