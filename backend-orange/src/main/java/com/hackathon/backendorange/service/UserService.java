package com.hackathon.backendorange.service;

import com.hackathon.backendorange.dto.AutenticationDTO;
import com.hackathon.backendorange.dto.LoginResponseDTO;
import com.hackathon.backendorange.exception.LoginException;
import com.hackathon.backendorange.exception.RegisterException;
import com.hackathon.backendorange.exception.UserAlreadyExistsException;
import com.hackathon.backendorange.security.TokenService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hackathon.backendorange.controller.assembler.UserAssembler;
import com.hackathon.backendorange.dto.UserDTO;
import com.hackathon.backendorange.model.User;
import com.hackathon.backendorange.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAssembler userAssembler;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public UserDTO register(UserDTO userDTO) {

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new UserAlreadyExistsException();
        }

        if (!isPasswordValid(userDTO.getPassword())) {
            throw new RegisterException();
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(userDTO.getPassword());
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        user.setPassword(encryptedPassword);
        user = userRepository.save(user);
        BeanUtils.copyProperties(user, userDTO);

        return userDTO;
    }

    private boolean isPasswordValid(String password) {
        return password.matches(".*\\d.*") && password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*") && password.matches(".*[A-Z].*");
    }

    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public LoginResponseDTO login(AutenticationDTO autenticationDTO) throws AuthenticationException, LoginException {

        userRepository.getByEmail(autenticationDTO.getEmail()).orElseThrow(LoginException::new);

        var usernamePassword = new UsernamePasswordAuthenticationToken(autenticationDTO.getEmail(), autenticationDTO.getPassword());
        var auth = authenticationManager.authenticate(usernamePassword);
        String token = tokenService.generateToken((User) auth.getPrincipal());

        return new LoginResponseDTO(token);
    }

    public UserDTO details(String email) {
        User user = userRepository.findUserByEmail(email);
        UserDTO userDTO = userAssembler.toDTO(user);

        return userDTO;
    }

}
