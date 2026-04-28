package com.cnidi.system.core.auth.dto;

public record RegisterResponse(
        Long userId,
        String username,
        String status
) {
}
