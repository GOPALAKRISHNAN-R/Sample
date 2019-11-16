package com.example.sample.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sample.dto.UserDto;
import com.example.sample.model.User;
import com.example.sample.repository.UserRepository;
import com.example.sample.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User findById(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public User save(UserDto registration) {
		// TODO Auto-generated method stub

		User user = new User();
		user.setName(registration.getName());
		user.setPassword(registration.getPassword());
		return userRepository.save(user);
	}

	@Override
	public List<User> listUsers() {
		// TODO Auto-generated method stub
		return (List<User>) userRepository.findAll();

	}

	@Override
	public void delete(User user) {
		// TODO Auto-generated method stub
		userRepository.delete(user);
	}

	@Override
	public void update(User user) {
		// TODO Auto-generated method stub
		userRepository.save(user);
	}

}
