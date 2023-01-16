import {User} from '../types/User';
import {name, internet, lorem, image, datatype} from 'faker';
import {FilmInfo} from '../types/FilmInfo';
import {Review} from '../types/Review';

export const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  name: name.title(),
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
});

export const makeFakeId = (): number => (datatype.number());

export const makeFakeFilm = (isFavourite?: boolean): FilmInfo => ({
  id: datatype.number(),
  name: lorem.word(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: '#866866',
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.paragraph(),
  rating: datatype.number({min: 0, max: 10}),
  scoresCount: datatype.number(),
  director: name.title(),
  starring: Array(3).fill('').map(() => name.title()),
  runTime: datatype.number(),
  genre: lorem.word(),
  released: datatype.number({min: 1825, max: 2023}),
  isFavorite: isFavourite === undefined ? datatype.boolean() : isFavourite,
});

export const makeFakeFilms = (genres?: string[], numberOfFilms?: number): FilmInfo[] => {
  const films = [];

  numberOfFilms = numberOfFilms || 5;

  for (let i = 0; i < numberOfFilms; i++) {
    const film = makeFakeFilm();
    if (genres && genres[i]) {
      film.genre = genres[i];
    }
    films.push(film);
  }

  return films;
};

export const makeFakeGenres = (): string[] => (Array(5).fill('').map(() => lorem.word()));

export const makeFakeReview = (): Review => ({
  comment: lorem.paragraph(),
  date: datatype.datetime().toDateString(),
  id: datatype.number(),
  rating: datatype.number({min: 0, max: 10}),
  user: {
    id: datatype.number(),
    name: name.title(),
  }
});

export const makeFakeReviews = (): Review[] => (Array(5).fill(null).map(() => makeFakeReview()));
