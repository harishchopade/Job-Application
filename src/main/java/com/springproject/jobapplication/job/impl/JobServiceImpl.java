package com.springproject.jobapplication.job.impl;

import com.springproject.jobapplication.job.Job;
import com.springproject.jobapplication.job.JobRepository;
import com.springproject.jobapplication.job.JobService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    // private List<Job> jobs = new ArrayList<>();   
    JobRepository jobRepository;   
    // private long nextId = 1L;


    // By this we do not need to manage the jobRepository object and do not need to create an instance and assigning and initialize.
    // It is a bean managed by spring and it will be AutoWired at the runtime
    public JobServiceImpl(JobRepository jobRepository){
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> findAll() {
        // return jobs;
        return jobRepository.findAll();
    }

    @Override
    public void createJob(Job job) {
        // job.setId(nextId++);    // (By this we can get full control over id rather than giving control to user)
        // jobs.add(job);
        jobRepository.save(job);
    }

    @Override
    public Job getJobById(long id) {
        // for (Job job : jobs){
        //     if(Objects.equals(job.getId(), id)){
        //         return job;
        //     }
        // }
        // return null;
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteJobById(long id){
        // Iterator<Job> iterator = jobs.iterator();
        // while(iterator.hasNext()){
        //     Job job = iterator.next();
        //     if(Objects.equals(job.getId(), id)){
        //         iterator.remove();
        //         return true;
        //     }
        // }
        // return false;
        try {
            jobRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateJobById(long id, Job updateJob) {
        // for (Job job : jobs){
        //     if(Objects.equals(job.getId(), id)){
        //         job.setTitle(updateJob.getTitle());
        //         job.setDescription(updateJob.getDescription());
        //         job.setMinSalary(updateJob.getMinSalary());
        //         job.setMaxSalary(updateJob.getMaxSalary());
        //         job.setLocation(updateJob.getLocation());
        //         return true;
        //     }
        // }
        // return false;
        Optional<Job> jobOptional = jobRepository.findById(id);
        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            job.setTitle(updateJob.getTitle());
            job.setDescription(updateJob.getDescription());
            job.setMinSalary(updateJob.getMinSalary());
            job.setMaxSalary(updateJob.getMaxSalary());
            job.setLocation(updateJob.getLocation());
            jobRepository.save(job);
            return true;
        }
        return false;
    }

}
