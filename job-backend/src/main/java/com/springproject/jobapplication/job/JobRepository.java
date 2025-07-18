package com.springproject.jobapplication.job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository takes 2 input 1 is entity and 2nd is type of primary key
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompanyId(long companyId);

}
