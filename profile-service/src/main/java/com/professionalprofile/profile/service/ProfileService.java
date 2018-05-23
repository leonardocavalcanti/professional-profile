package com.professionalprofile.profile.service;

import com.professionalprofile.profile.domain.Profile;

public interface ProfileService {

	/**
	 * Get unique profile
	 *
	 * @return profile
	 */
	Profile get();

	/**
	 * Creates new profile with default parameters
	 *
	 * @param create
	 * @return created profile
	 */
	Profile create(Profile create);

	/**
	 * Validates and applies incoming profile updates
	 *
	 * @param update
	 */
	void update(Profile update);
}
