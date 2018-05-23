package com.professionalprofile.projects.service;

import com.professionalprofile.projects.domain.Project;
import com.professionalprofile.projects.repository.ProjectsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class ProjectsServiceImpl implements ProjectsService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private ProjectsRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Iterable<Project> findAll() {
		return repository.findAll();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Project create(Project create) {
		repository.save(create);

		log.info("new project has been created: " + create.name);

		return create;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Project update) {
		Project project = repository.findOne(update.id);

		Assert.notNull(project, "Project not found");

		project.name = update.name;
		project.description = update.description;
		project.icon = update.icon;
		project.demoURL = update.demoURL;
		project.sourceURL = update.sourceURL;

		repository.save(project);

		log.debug("Project {} changes has been saved", update.name);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void delete(String id) {
		Project project = repository.findOne(id);

		Assert.notNull(project, "Project not found");

		repository.delete(project);

		log.debug("Project {} changes has been deleted", project.name);
	}
}