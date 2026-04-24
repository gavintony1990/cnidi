package com.cnidi.system.api.auth;

import java.util.List;

public record CurrentUserVO(Long id, String username, List<String> roles) {}
