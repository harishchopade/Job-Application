package com.springproject.jobapplication.job;

import java.util.List;

public interface JobService {
    List<Job> findAll();

    void createJob(Job job);
    
    Job getJobById(long id);
    boolean deleteJobById(long id);

    List<Job> getJobsByCompanyId(long companyId);
    
    boolean updateJobById(long id, Job updateJob);
}
