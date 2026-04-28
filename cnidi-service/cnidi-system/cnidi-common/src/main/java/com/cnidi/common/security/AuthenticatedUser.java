package com.cnidi.common.security;

import java.io.Serializable;
import java.util.List;

public record AuthenticatedUser(
        Long userId,
        String username,
        String userType,
        List<String> roles,
        List<String> permissions
) implements Serializable {
}
