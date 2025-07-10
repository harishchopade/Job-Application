package com.springproject.jobapplication.company;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springproject.jobapplication.job.Job;
import com.springproject.jobapplication.reviews.Reviews;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;

    // We need to compulsory to add relationship that is OneToMant in this case
    // But if we not given mappedBy then in database there is seperate table created like company_jobs
    // To get over it there is mappedBy where we need to pass the field that exist in jobs
    @JsonIgnore
    @OneToMany(mappedBy = "company")
    private List<Job> jobs;
    
    @OneToMany(mappedBy = "company")
    private List<Reviews> reviews;

   
    // For Jpa Repository
    public Company() {

    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    
     public List<Job> getJobs() {
        return jobs;
    }
    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
    public List<Reviews> getReviews() {
        return reviews;
    }
    public void setReviews(List<Reviews> reviews) {
        this.reviews = reviews;
    }

}
