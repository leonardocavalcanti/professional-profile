package com.professionalprofile.auth.controller;

import com.professionalprofile.auth.domain.User;
import com.professionalprofile.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Locale;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/current", method = RequestMethod.GET)
	public Principal getUser(Principal principal) {
		return principal;
	}

	@PreAuthorize("#oauth2.hasScope('admin')")
	@RequestMapping(method = RequestMethod.POST)
	public void createUser(@Valid @RequestBody User user) {
		userService.create(user);
	}

	@RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
	public void changeUserPassword(@RequestParam("password") String password, @RequestParam("oldPassword") String oldPassword) {
		User user = userService.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

		userService.changeUserPassword(user, password, oldPassword);
	}
}
