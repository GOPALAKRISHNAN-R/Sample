package com.example.sample.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.sample.dto.UserDto;
import com.example.sample.model.User;
import com.example.sample.service.UserService;

@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public String registerClientAccount(@ModelAttribute("sdtmdsdto") @Valid UserDto clientDto, BindingResult result,RedirectAttributes redirectAttrs,
			Model model) {

		userService.save(clientDto);
		return "redirect:/";
	}

	// Display List of User
	@GetMapping("")
	public String home1(@ModelAttribute("sdtmdsdto") UserDto userDto, Model model) {
		List<User> posts = userService.listUsers();
		List<Object> dtoList = posts.stream().map(post -> convertToDto(post)).collect(Collectors.toList());
		model.addAttribute("userlist", dtoList);
		return "/index";

	}

	private UserDto convertToDto(User post) {
		ModelMapper modelMapper = new ModelMapper();
		UserDto postDto = modelMapper.map(post, UserDto.class);
		return postDto;
	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST, consumes = "application/json")
	public String editUserAccount1(@RequestBody UserDto userDto,RedirectAttributes redirectAttrs) {

		User existing = convertToUser(userDto);
		userService.update(existing);
		return "redirect:/";
//		return "fragments/user :: info-edit";
	}

	private User convertToUser(UserDto post) {
		
		System.err.println("name"+post.getName());
		System.err.println("password"+post.getPassword());
		ModelMapper modelMapper = new ModelMapper();
		User postDto = modelMapper.map(post, User.class);
		return postDto;
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.POST, produces = "application/json")
	public String deleteUserAccount1(@PathVariable("id") Long id,RedirectAttributes redirectAttrs) {

		User existing = userService.findById(id);
		userService.delete(existing);
		return "redirect:/";
//		return "fragments/sdtm_datasets :: info-delete";
	}

}
