package com.springproject.jobapplication.reviews;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/companies/{companyId}")
public class ReviewController {

    private ReviewServices reviewServices;

    public ReviewController(ReviewServices reviewServices) {
        this.reviewServices = reviewServices;
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Reviews>> getAllReviews(@PathVariable long companyId){
        
        return new ResponseEntity<>(reviewServices.getAllReviews(companyId), HttpStatus.OK);
        
    }

    @PostMapping("/reviews")
    public ResponseEntity<String> addReview(@PathVariable long companyId, 
                                            @RequestBody Reviews reviews)
    {
        boolean isReviewSaved = reviewServices.addReview(companyId, reviews);
        if (isReviewSaved) {
            return new ResponseEntity<>("Review Added Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Company Not Found",HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<Reviews> getReview(@PathVariable long companyId,
                                             @PathVariable long reviewId){
        
        return new ResponseEntity<>(reviewServices.getReviews(companyId, reviewId), HttpStatus.OK);
    }

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<String> updateReview( @PathVariable long companyId,
                                                @PathVariable long reviewId,
                                                @RequestBody Reviews reviews){
        
        boolean isReviewUpdated = reviewServices.updateReview(companyId, reviewId, reviews);
        if(isReviewUpdated)
            return new ResponseEntity<>("Review Updated Successfully",HttpStatus.OK);
        
        return new ResponseEntity<>("Review not updated",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview( @PathVariable long companyId,
                                                @ PathVariable long reviewId){
        
        boolean isReviewDeleted = reviewServices.deleteReview(companyId, reviewId);
        if(isReviewDeleted){
            return new ResponseEntity<>("Review Deleted Successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Review Not Deleted",HttpStatus.NOT_FOUND);
        
    }
}
