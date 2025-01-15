import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import './ReserveSpot.css';

const ReserveSpot = ({ spot }) => {
    const { price, avgStarRating, numReviews } = spot;

    const handleReservation = () => {
        window.alert('not done yet');
    };

    const renderReviewInfo = () => {
        if (!avgStarRating) {
            return (
                <p className="new-spot">
                    <FaStar /> New
                </p>
            );
        }

        return (
            <p className="spot-details-reviews">
                <FaStar />
                <span> {avgStarRating}</span>
                <span className="dot"><GoDotFill /></span>
                <span> {numReviews} reviews</span>
            </p>
        );
    };

    return (
        <div className="reserve-spot-container">
            <div className="pricing-and-rating">
                <p className="spot-details-price">
                    <em>${price}</em> night
                </p>
                {renderReviewInfo()}
            </div>
            <button className="reserve-button" onClick={handleReservation}>
                Reserve
            </button>
        </div>
    );
};

export default ReserveSpot;
