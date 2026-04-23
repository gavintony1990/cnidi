package com.cnidi.common.api;

public record ApiResponse<T>(T data, String requestId) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, "demo-request-id");
    }
}
