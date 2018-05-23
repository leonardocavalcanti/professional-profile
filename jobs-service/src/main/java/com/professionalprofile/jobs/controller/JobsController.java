package com.professionalprofile.jobs.controller;

import com.professionalprofile.jobs.domain.Job;
import com.professionalprofile.jobs.service.JobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class JobsController {

	@Autowired
	private JobsService jobsService;

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public Iterable<Job> getAllJobs() {
		return jobsService.findAll();
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.PUT)
	public void updateJob(@Valid @RequestBody Job job) {
		jobsService.update(job);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.POST)
	public Job createJob(@Valid @RequestBody Job job) {
		return jobsService.create(job);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		jobsService.delete(id);
	}
}
