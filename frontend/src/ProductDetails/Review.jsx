import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NewReview from "../components/reviews/NewReview";
import ListReviews from "../components/reviews/ListReviews";

const Review = ({ productId, product, refetchProduct }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const alreadyReviewed = useMemo(
    () => !!product?.reviews?.some((r) => r?.user?._id === user?._id),
    [product?.reviews, user?._id]
  );

  const [showList, setShowList] = useState(alreadyReviewed);

  useEffect(() => setShowList(alreadyReviewed), [alreadyReviewed]);

  const [editReview, setEditReview] = useState(null);
  const formRef = useRef(null);

  const handleEdit = (rev) => {
    setEditReview({ _id: rev._id, rating: rev.rating, comment: rev.comment });
    setShowList(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReviewSuccess = async () => {
    await refetchProduct?.();
    setEditReview(null);
    setShowList(true);
  };
  return (
    <>
      <div ref={formRef} className="review-section">
        {isAuthenticated && (!showList || !!editReview) && (
          <NewReview
            productId={productId}
            onSuccess={handleReviewSuccess}
            reviewId={editReview?._id}
            initialRating={editReview?.rating}
            initialComment={editReview?.comment}
          />
        )}
        {!isAuthenticated && (
          <div className="review-prompt-box">
            <p className="login-reminder">Login to post your review.</p>
          </div>
        )}
      </div>
      {showList && product?.reviews?.length > 0 && (
        <ListReviews
          reviews={product?.reviews}
          currentUserId={user?._id}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default Review;
