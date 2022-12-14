import { useAppSelector} from '../../hooks';
import {getReviews} from '../../store/film-data/selectors';
import {Review} from '../../types/Review';

function FilmReviews() {

  const reviews = useAppSelector<Review[]>(getReviews);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          reviews.map((review) => (
            <div className="review" key={review.id}>
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating.toString()}</div>
            </div>))
        }
      </div>
    </div>
  );
}

export default FilmReviews;
