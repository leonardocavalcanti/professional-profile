package com.professionalprofile.auth.service;

import com.professionalprofile.auth.domain.User;
import com.professionalprofile.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserServiceImpl implements UserService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	@Autowired
	private UserRepository repository;

	@Override
	public void create(User user) {

		User existing = repository.findOne(user.getUsername());
		Assert.isNull(existing, "User already exists");

		String hash = encoder.encode(user.getPassword());
		user.setPassword(hash);

		repository.save(user);

		log.info("new user has been created: {}", user.getUsername());
	}

	@Override
	public User findUserByUsername(final String username) {
		return repository.findOne(username);
	}

	@Override
	public void changeUserPassword(User user, String password, String oldPassword) {
		Assert.isTrue(encoder.matches(oldPassword, user.getPassword()), "Wrong old password");

		user.setPassword(encoder.encode(password));
		repository.save(user);
	}
}
