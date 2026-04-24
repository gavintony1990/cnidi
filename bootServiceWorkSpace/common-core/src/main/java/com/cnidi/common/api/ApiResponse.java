package com.cnidi.common.api;

import java.util.List;
import java.util.UUID;

public record ApiResponse<T>(T data, ApiError error, String requestId) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, null, UUID.randomUUID().toString());
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        ApiError err = new ApiError(code, message, List.of(), UUID.randomUUID().toString());
        return new ApiResponse<>(null, err, err.requestId());
    }

    public record ApiError(String code, String message, List<String> details, String requestId) {}
}
