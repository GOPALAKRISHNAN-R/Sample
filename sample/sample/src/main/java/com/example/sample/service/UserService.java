package com.example.sample.service;

import java.util.List;

import com.example.sample.dto.UserDto;
import com.example.sample.model.User;

public interface UserService {

	User findById(Long id);

	User save(UserDto registration);

	List<User> listUsers();

	void delete(User user);

	void update(User user);

}
