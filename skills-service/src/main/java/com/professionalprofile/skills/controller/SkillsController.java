package com.professionalprofile.skills.controller;

import com.professionalprofile.skills.domain.Skill;
import com.professionalprofile.skills.service.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class SkillsController {

	@Autowired
	private SkillsService projectsService;

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public Iterable<Skill> getAllSkills() {
		return projectsService.findAll();
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.PUT)
	public void updateSkill(@Valid @RequestBody Skill skill) {
		projectsService.update(skill);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.POST)
	public Skill createSkill(@Valid @RequestBody Skill skill) {
		return projectsService.create(skill);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void deleteSkill(@PathVariable String id) {
		projectsService.delete(id);
	}
}
