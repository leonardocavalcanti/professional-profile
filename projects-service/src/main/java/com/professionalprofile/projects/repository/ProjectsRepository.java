package com.professionalprofile.projects.repository;

import com.professionalprofile.projects.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsRepository extends CrudRepository<Project, String> {
}