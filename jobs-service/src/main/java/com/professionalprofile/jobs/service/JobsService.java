package com.professionalprofile.jobs.service;

import com.professionalprofile.jobs.domain.Job;

import java.util.List;

public interface JobsService {

	/**
	 * Find all jobs
	 *
	 * @return jobs list
	 */
	List<Job> findAll();

	/**
	 * Creates new jobs with default parameters
	 *
	 * @param create
	 * @return created jobs
	 */
	Job create(Job create);

	/**
	 * Validates and applies incoming jobs updates
	 *
	 * @param update
	 */
	void update(Job update);

	/**
	 * Validates and deletes jobs by id
	 *
	 * @param id
	 */
	void delete(String id);
}
