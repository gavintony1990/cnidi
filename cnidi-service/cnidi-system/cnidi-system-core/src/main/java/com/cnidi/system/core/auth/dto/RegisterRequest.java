package com.cnidi.system.core.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 32) String username,
        @Size(max = 64) String nickname,
        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确") String mobile,
        @Email String email,
        @NotBlank @Size(min = 8, max = 64) String password
) {
}
