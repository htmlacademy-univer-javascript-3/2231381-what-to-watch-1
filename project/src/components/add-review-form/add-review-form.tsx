import React, {useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {postReview} from '../../services/api-action';

function AddReviewForm({filmId}: {filmId: number}) {

  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: ''
  });

  const onChangeReview = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const onChangeRating = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const dispatch = useAppDispatch();
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview({filmId: filmId, comment: formData.reviewText, rating: formData.rating}));
  };

  return(
    <div className="add-review">
      <form className="add-review__form" onSubmit={onSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              Array.from({length: 10}, (_, i) => i + 1).reverse().map((ratingValue) => (
                <>
                  <input className="rating__input"
                    id={`star-${ratingValue.toString()}`}
                    type="radio"
                    name="rating"
                    value={ratingValue.toString()}
                    onChange={onChangeRating}
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
            onChange={onChangeReview}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
