import React from "react";
import { RatingView } from "react-simple-star-rating";
import DefaultPicture from "../../assets/images/account-icon.png";
import { MdModeEdit } from "react-icons/md";

const ListReviews = ({ reviews = [], currentUserId, onEdit }) => {
  const formatComment = (text = "") => {
    const trimmed = text.trimStart();
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };
  return (
    <>
      <section className="user-reviews-sections">
        {reviews?.map((review) => {
          const formattedComment = formatComment(review?.comment);
          return (
            <React.Fragment key={review?._id}>
              <div className="review-container">
                <img
                  src={review?.user?.avatar?.url || DefaultPicture}
                  className="review-user-icon"
                />
                <div className="review-star-container">
                  <p>{review?.user?.name}</p>
                  <RatingView
                    ratingValue={review?.rating}
                    size={20}
                    fillColor="#ffd700"
                    emptyColor="#ced4da"
                    className="product-rating-comp"
                  />
                </div>
              </div>
              <div className="review-comment">
                <p>{formattedComment}</p>
                {currentUserId && review?.user?._id === currentUserId && (
                  <button
                    type="button"
                    className="review-edit-btn"
                    onClick={() => onEdit?.(review)}
                  >
                    <MdModeEdit className="review-edit-icon" />
                  </button>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </>
  );
};

export default ListReviews;
