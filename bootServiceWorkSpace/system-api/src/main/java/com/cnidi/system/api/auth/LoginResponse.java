package com.cnidi.system.api.auth;

public record LoginResponse(String token, long expiresIn) {}
