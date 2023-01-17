import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postReview} from '../../store/api-action';
import {getPostReviewError} from '../../store/film-data/selectors';
import {setPostReviewError} from '../../store/film-data/film-data';

function AddReviewForm({filmId}: {filmId: number}) {

  const postReviewError = useAppSelector(getPostReviewError);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: -1,
    reviewText: ''
  });

  const onChange = (evt: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
    dispatch(setPostReviewError(null));
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview({filmId: filmId, comment: formData.reviewText, rating: formData.rating}));
  };

  return(
    <div className="add-review" data-testid="add-review-form">
      <form className="add-review__form" onSubmit={onSubmit} name="add-review-form">
        {postReviewError && <p style={{textAlign: 'center', color: 'darkred'}}>{postReviewError}</p>}
        <div className="rating">
          <div className="rating__stars" data-testid="rating-stars">
            {
              Array.from({length: 10}, (_, i) => i + 1).reverse().map((ratingValue) => (
                <>
                  <input className="rating__input"
                    id={`star-${ratingValue.toString()}`}
                    type="radio"
                    name="rating"
                    value={ratingValue.toString()}
                    onChange={onChange}
                    key={ratingValue}
                    data-testid={`rating-${ratingValue}`}
                  />
                  <label className="rating__label" htmlFor={`star-${ratingValue.toString()}`}>{`Rating ${ratingValue.toString()}`}</label>
                </>))
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea"
            name="reviewText"
            id="review-text"
            placeholder="Review text"
            onChange={onChange}
            minLength={50}
            maxLength={400}
            data-testid="review-text"
          >
          </textarea>
          <div className="add-review__submit">
            {
              formData.rating !== -1 && formData.reviewText.length >= 50 ?
                <button className="add-review__btn" type="submit">Post</button> :
                <button className="add-review__btn" type="submit" disabled>Post</button>
            }
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
