package com.springproject.jobapplication.reviews.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.springproject.jobapplication.company.Company;
import com.springproject.jobapplication.company.CompanyService;
import com.springproject.jobapplication.reviews.ReviewRepository;
import com.springproject.jobapplication.reviews.ReviewServices;
import com.springproject.jobapplication.reviews.Reviews;

@Service
public class ReviewServicesImpl implements ReviewServices {

    private ReviewRepository reviewRepository;
    private CompanyService companyService;

    
    public ReviewServicesImpl(ReviewRepository reviewRepository, CompanyService companyService) {
        this.reviewRepository = reviewRepository;
        this.companyService = companyService;
    }


    @Override
    public List<Reviews> getAllReviews(long companyId) {
        List<Reviews> reviews = reviewRepository.findByCompanyId(companyId);

        return reviews;    
    }
    
    @Override
    public boolean addReview(long companyId, Reviews reviews){
        Company company = companyService.getCompanyById(companyId);
        if(company != null){
            reviews.setCompany(company);
            reviewRepository.save(reviews);
            return true;
        }
        return false;
    }

    @Override
    public Reviews getReviews(long companyId, long reviewId){
        List<Reviews> reviews = reviewRepository.findByCompanyId(companyId);
        
        return reviews.stream()
                        .filter(review -> review.getId() == reviewId)
                        .findFirst()
                        .orElse(null);
    }


    @Override
    public boolean updateReview(long companyId, long reviewId, Reviews updatedReviews) {
        Reviews existingReview = reviewRepository.findById(reviewId).orElse(null);
    
        if (existingReview != null && existingReview.getCompany().getId() == companyId) {
        
            if (updatedReviews.getTitle() != null) {
                existingReview.setTitle(updatedReviews.getTitle());
            }

            if (updatedReviews.getDescription() != null) {
                existingReview.setDescription(updatedReviews.getDescription());
            }

            // For primitive fields like int or double (rating), check if it's non-zero or provide custom logic
            if (updatedReviews.getRating() != 0) {
                existingReview.setRating(updatedReviews.getRating());
            }

            reviewRepository.save(existingReview);
            return true;
        }
        return false;
    }


    @Override
    public boolean deleteReview(long companyId, long reviewId) {
        if(companyService.getCompanyById(companyId) != null 
            && reviewRepository.findById(reviewId) != null){
                Reviews reviews = reviewRepository.findById(reviewId).orElse(null);     // We have check in condition already so it will always return object
                Company company = reviews.getCompany();

                // As there is bidirectional mapping between company and review 
                //so there is need to remove reviews from company 

                company.getReviews().remove(reviews);
                companyService.updateCompanyById(companyId, company);

                // To remove the reference of company from reviews but without this also i got desired o/p
                // reviews.setCompany(null);

                // Actual review delete
                reviewRepository.deleteById(reviewId);
                return true;
            }
        return false;
    }

    
}
