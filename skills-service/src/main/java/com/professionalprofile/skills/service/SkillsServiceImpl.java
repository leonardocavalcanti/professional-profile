package com.professionalprofile.skills.service;

import com.professionalprofile.skills.domain.Skill;
import com.professionalprofile.skills.repository.SkillsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class SkillsServiceImpl implements SkillsService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private SkillsRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Iterable<Skill> findAll() {
		return repository.findAll();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Skill create(Skill create) {
		repository.save(create);

		log.info("new skill has been created: " + create.name);

		return create;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Skill update) {
		Skill skill = repository.findOne(update.id);

		Assert.notNull(skill, "Skill not found");

		skill.name = update.name;
		skill.description = update.description;

		repository.save(skill);

		log.debug("Skill {} changes has been saved", update.name);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void delete(String id) {
		Skill skill = repository.findOne(id);

		Assert.notNull(skill, "Skill not found");

		repository.delete(skill);

		log.debug("Skill {} has been deleted", skill.name);
	}
}