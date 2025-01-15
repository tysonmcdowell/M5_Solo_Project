import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import './SpotReviews.css';

const SpotReviews = ({ spot: { numReviews, avgStarRating } }) => {
    let content = !avgStarRating ? (
        <p className="new-spot"><FaStar /> New</p>
    ) : (
        <div className="spot-details-reviews">
            <FaStar className="star-icon" />
            <span className="rating">{avgStarRating}</span>
            <span className="dot-separator"><GoDotFill /></span>
            <span className="review-count">{numReviews} reviews</span>
        </div>
    );
    
    return <>{content}</>;
}

export default SpotReviews;
