import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
function Rating(props) {
  const { rating, numReviews, caption } = props
  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfStroke : emptyStar
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfStroke : emptyStar
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfStroke : emptyStar
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfStroke : emptyStar
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfStroke : emptyStar
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + " reviews"}</span>
      )}
    </div>
  )
}
export default Rating
