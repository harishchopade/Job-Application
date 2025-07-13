package com.springproject.jobapplication.reviews;

import java.util.List;

public interface ReviewServices {
    List<Reviews> getAllReviews(long companyId);
    boolean addReview(long companyId,Reviews reviews);
    Reviews getReviews(long companyId, long reviewId);
    boolean updateReview(long companyId, long reviewId, Reviews updatedReviews);
    boolean deleteReview(long companyId, long reviewId);
}
