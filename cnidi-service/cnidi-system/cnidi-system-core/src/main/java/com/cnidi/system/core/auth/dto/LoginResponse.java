package com.cnidi.system.core.auth.dto;

import java.time.LocalDateTime;
import java.util.List;

public record LoginResponse(
        String token,
        long expiresIn,
        String accessToken,
        String refreshToken,
        LocalDateTime accessTokenExpiresAt,
        LocalDateTime refreshTokenExpiresAt,
        Long userId,
        String username,
        String nickname,
        String userType,
        List<String> roles,
        List<String> permissions
) {
}
