package com.cnidi.common.api;

import java.util.List;

public record ErrorResponse(ErrorBody error) {

    public static ErrorResponse of(String code, String message, List<String> details, String requestId) {
        return new ErrorResponse(new ErrorBody(code, message, details, requestId));
    }

    public record ErrorBody(String code, String message, List<String> details, String requestId) {
    }
}
