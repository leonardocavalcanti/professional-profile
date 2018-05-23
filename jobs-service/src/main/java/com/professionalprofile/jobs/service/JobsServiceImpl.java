package com.professionalprofile.jobs.service;

import com.professionalprofile.jobs.domain.Job;
import com.professionalprofile.jobs.repository.JobRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class JobsServiceImpl implements JobsService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private JobRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<Job> findAll() {
		List<Job> jobs = new ArrayList<>();
		repository.findAll().iterator().forEachRemaining(jobs::add);


		Collections.sort(jobs, (job, job1) -> job1.startDate.compareTo(job.startDate));

		return jobs;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Job create(Job create) {
		repository.save(create);

		log.info("new jobs has been created: " + create.companyName);

		return create;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Job update) {
		Job job = repository.findOne(update.id);

		Assert.notNull(job, "Job not found");

		job.companyName = update.companyName;
		job.role = update.role;
		job.startDate = update.startDate;
		job.finishDate = update.finishDate;
		job.description = update.description;
		job.longDescription = update.longDescription;

		repository.save(job);

		log.debug("Job {} changes has been saved", update.companyName);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void delete(String id) {
		Job job = repository.findOne(id);

		Assert.notNull(job, "Job not found");

		repository.delete(job);

		log.debug("Job {} changes has been deleted", job.companyName);
	}
}