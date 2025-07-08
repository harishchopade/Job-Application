package com.springproject.jobapplication.job.impl;

import com.springproject.jobapplication.job.Job;
import com.springproject.jobapplication.job.JobService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Service
public class JobServiceImpl implements JobService {

    private List<Job> jobs = new ArrayList<>();      
    private long nextId = 1L;

    @Override
    public List<Job> findAll() {
        return jobs;
    }

    @Override
    public void createJob(Job job) {
        job.setId(nextId++);    // (By this we can get full control over id rather than giving control to user)
        jobs.add(job);
    }

    @Override
    public Job getJobById(long id) {
        for (Job job : jobs){
            if(Objects.equals(job.getId(), id)){
                return job;
            }
        }
        return null;
    }

    @Override
    public boolean deleteJobById(long id){
        Iterator<Job> iterator = jobs.iterator();
        while(iterator.hasNext()){
            Job job = iterator.next();
            if(Objects.equals(job.getId(), id)){
                iterator.remove();
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean updateJobById(long id, Job updateJob) {
        for (Job job : jobs){
            if(Objects.equals(job.getId(), id)){
                job.setTitle(updateJob.getTitle());
                job.setDescription(updateJob.getDescription());
                job.setMinSalary(updateJob.getMinSalary());
                job.setMaxSalary(updateJob.getMaxSalary());
                job.setLocation(updateJob.getLocation());
                return true;
            }
        }
        return false;
    }

}
