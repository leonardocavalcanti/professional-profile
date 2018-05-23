package com.professionalprofile.jobs.repository;

import com.professionalprofile.jobs.domain.Job;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends CrudRepository<Job, String> {
}