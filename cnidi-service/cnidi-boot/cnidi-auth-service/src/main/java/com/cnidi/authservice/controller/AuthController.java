package com.cnidi.authservice.controller;

import com.cnidi.common.api.ApiResponse;
import com.cnidi.common.security.AuthenticatedUser;
import com.cnidi.system.core.auth.dto.LoginRequest;
import com.cnidi.system.core.auth.dto.LoginResponse;
import com.cnidi.system.core.auth.dto.LogoutRequest;
import com.cnidi.system.core.auth.dto.LogoutResponse;
import com.cnidi.system.core.auth.dto.MeResponse;
import com.cnidi.system.core.auth.dto.RefreshTokenRequest;
import com.cnidi.system.core.auth.dto.RegisterRequest;
import com.cnidi.system.core.auth.dto.RegisterResponse;
import com.cnidi.system.core.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        return ApiResponse.success(authService.login(request, httpServletRequest.getRemoteAddr(), httpServletRequest.getHeader("User-Agent")));
    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResponse> refresh(@Valid @RequestBody RefreshTokenRequest request, HttpServletRequest httpServletRequest) {
        return ApiResponse.success(authService.refresh(request, httpServletRequest.getRemoteAddr(), httpServletRequest.getHeader("User-Agent")));
    }

    @PostMapping("/logout")
    public ApiResponse<LogoutResponse> logout(@Valid @RequestBody LogoutRequest request) {
        return ApiResponse.success(authService.logout(request.refreshToken()));
    }

    @GetMapping("/me")
    public ApiResponse<MeResponse> me(Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        return ApiResponse.success(authService.me(user.userId()));
    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.success(authService.register(request));
    }
}
