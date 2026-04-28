package com.cnidi.system.core.auth.dto;

import java.util.List;

public record MeResponse(
        Long userId,
        String username,
        String nickname,
        String userType,
        List<String> roles,
        List<String> permissions
) {
}
