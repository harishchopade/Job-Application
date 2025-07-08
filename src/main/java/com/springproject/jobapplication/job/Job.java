package com.springproject.jobapplication.job;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;       // Used to give table a custom name

@Entity
// @Table(name = "Job_Table")  // Used if want to give custom name to table by default it take class name as table name.
public class Job {

    @Id // This will mark id as primary key and manage by spring boot
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Auto-generates the primary key value using the database's identity column (e.g., auto-increment)

    private long id;
    private String title;
    private String description;
    private String minSalary;
    private String maxSalary;
    private String location ;

    // Default constructor needed for JPA to create empty object and then add fields into it
    public Job() {
    }

    public Job(long id, String title, String description, String minSalary, String maxSalary, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.location = location;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(String minSalary) {
        this.minSalary = minSalary;
    }

    public String getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(String maxSalary) {
        this.maxSalary = maxSalary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
