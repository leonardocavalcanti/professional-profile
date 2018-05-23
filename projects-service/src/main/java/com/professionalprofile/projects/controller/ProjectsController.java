package com.professionalprofile.projects.controller;

import com.professionalprofile.projects.domain.Project;
import com.professionalprofile.projects.service.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class ProjectsController {

	@Autowired
	private ProjectsService projectsService;

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public Iterable<Project> getAllProjects() {
		return projectsService.findAll();
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.PUT)
	public void updateProject(@Valid @RequestBody Project project) {
		projectsService.update(project);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.POST)
	public Project createProject(@Valid @RequestBody Project project) {
		return projectsService.create(project);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void deleteProject(@PathVariable String id) {
		projectsService.delete(id);
	}
}
