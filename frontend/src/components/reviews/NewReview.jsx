import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../../redux/api/productApi";
import toast from "react-hot-toast";

const NewReview = ({
  productId,
  onSuccess,
  reviewId,
  initialRating,
  initialComment,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation();

  const { data } = useCanUserReviewQuery(productId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true, // optional but nice
  });
  const canReview = data?.canReview;

  useEffect(() => {
    if (!reviewId) return;

    setRating(initialRating || 0);
    setComment(initialComment || "");
  }, [initialRating, initialComment, reviewId]);

  const handleRating = (rate) => {
    const normalized = (rate / 20) * 20;
    setRating(normalized);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Posted!");
      setRating(0);
      setComment("");

      onSuccess?.();
    }
  }, [error, isSuccess, onSuccess, reviewId]);

  if (!canReview && !reviewId) {
    return (
      <div className="review-no-purchase">
        <p>You can review products only after purchasing them.</p>
      </div>
    );
  }

  return (
    <>
      <section className="update-review-section">
        <div className="update-review-rating">
          <p>Your Rating of this product:</p>
          <Rating
            ratingValue={rating}
            allowFraction
            size={20}
            fillColor="#ffd700"
            emptyColor="#ced4da"
            className="product-rating-comp"
            onClick={handleRating}
            allowHover={false}
          />
        </div>
        <form onSubmit={submitHandler} className="update-review-form">
          <textarea
            placeholder="Write your review"
            name="review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="update-review-btn"
          >
            {isLoading
              ? "Submitting..."
              : reviewId
              ? "Update Review"
              : "Submit Review"}
          </button>
        </form>
      </section>
    </>
  );
};

export default NewReview;
