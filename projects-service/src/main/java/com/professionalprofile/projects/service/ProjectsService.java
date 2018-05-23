package com.professionalprofile.projects.service;

import com.professionalprofile.projects.domain.Project;

public interface ProjectsService {

	/**
	 * Find all projects
	 *
	 * @return project list
	 */
	Iterable<Project> findAll();

	/**
	 * Creates new project with default parameters
	 *
	 * @param create
	 * @return created project
	 */
	Project create(Project create);

	/**
	 * Validates and applies incoming project updates
	 *
	 * @param update
	 */
	void update(Project update);

	/**
	 * Validates and deletes project by id
	 *
	 * @param id
	 */
	void delete(String id);
}
