package com.cnidi.common.api;

import com.cnidi.common.util.RequestIdUtils;

public record ApiResponse<T>(T data, String requestId) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, RequestIdUtils.newRequestId());
    }

    public static <T> ApiResponse<T> success(T data, String requestId) {
        return new ApiResponse<>(data, requestId);
    }
}
