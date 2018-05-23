package com.professionalprofile.profile.controller;

import com.professionalprofile.profile.domain.Profile;
import com.professionalprofile.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class ProfileController {

	@Autowired
	private ProfileService profileService;

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public Profile getProfile() {
		return profileService.get();
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.POST)
	public Profile createProfile(@Valid @RequestBody Profile profile) {
		return profileService.create(profile);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.PUT)
	public void updateProfile(@RequestBody Profile profile) {
		profileService.update(profile);
	}
}
