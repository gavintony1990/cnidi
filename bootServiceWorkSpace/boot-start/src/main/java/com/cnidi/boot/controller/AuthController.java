package com.cnidi.boot.controller;

import com.cnidi.boot.filter.JwtAuthFilter.AuthPrincipal;
import com.cnidi.common.api.ApiResponse;
import com.cnidi.system.api.auth.CurrentUserVO;
import com.cnidi.system.api.auth.LoginRequest;
import com.cnidi.system.api.auth.LoginResponse;
import com.cnidi.system.biz.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request));
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout() {
        // JWT 无状态，登出由前端清除 token 完成
        return ApiResponse.success(null);
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserVO> me(@AuthenticationPrincipal AuthPrincipal principal) {
        return ApiResponse.success(authService.getCurrentUser(principal.userId(), principal.username()));
    }
}
