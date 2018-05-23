package com.professionalprofile.profile.service;

import com.professionalprofile.profile.domain.Profile;
import com.professionalprofile.profile.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private ProfileRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Profile get() {
		return repository.findAll().iterator().hasNext() ? repository.findAll().iterator().next() : new Profile();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Profile create(Profile create) {
		Assert.isTrue(!repository.findAll().iterator().hasNext(), "Profile already created");

		repository.save(create);

		log.info("Profile has been created: " + create.name);

		return create;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void update(Profile update) {
		Profile profile = repository.findAll().iterator().next();

		Assert.notNull(profile, "Profile not found");

		profile.name = update.name;
		profile.title = update.title;
		profile.pictureURL = update.pictureURL;
		profile.resumeURL = update.resumeURL;
		profile.description = update.description;
		profile.externalPages = update.externalPages;

		repository.save(profile);

		log.debug("Profile {} changes has been saved", update.name);
	}
}