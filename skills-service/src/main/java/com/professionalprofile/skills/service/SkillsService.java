package com.professionalprofile.skills.service;

import com.professionalprofile.skills.domain.Skill;

public interface SkillsService {

	/**
	 * Find all skills
	 *
	 * @return skill list
	 */
	Iterable<Skill> findAll();

	/**
	 * Creates new skill with default parameters
	 *
	 * @param create
	 * @return created skill
	 */
	Skill create(Skill create);

	/**
	 * Validates and applies incoming skill updates
	 *
	 * @param update
	 */
	void update(Skill update);

	/**
	 * Validates and deletes skill by id
	 *
	 * @param id
	 */
	void delete(String id);
}
