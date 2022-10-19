import {SyntheticEvent, useState} from 'react';

function AddReviewForm() {

  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: ''
  });

  const fieldChangeHandle = (evt: SyntheticEvent) => {
    // @ts-ignore
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  return(
    <div className="add-review">
      <form action="#" className="add-review__form">
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
                    onChange={fieldChangeHandle}
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
            onChange={fieldChangeHandle}
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
