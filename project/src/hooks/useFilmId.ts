import {useParams} from 'react-router-dom';
import {useAppSelector} from './index';

export function useFilmId() {
  const params = useParams();
  const filmId = parseFloat(params.id as string);
  const {films} = useAppSelector((state) => state);
  return films.find((filmInfo) => filmInfo.id === filmId);
}
