package com.professionalprofile.auth.service;

import com.professionalprofile.auth.domain.User;

public interface UserService {

	void create(User user);

	User findUserByUsername(String username);

	void changeUserPassword(User user, String password, String oldPassword);
}
