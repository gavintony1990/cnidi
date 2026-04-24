package com.cnidi.common.exception;

public enum ErrorCode {
    UNAUTHORIZED("UNAUTHORIZED", 401),
    FORBIDDEN("FORBIDDEN", 403),
    NOT_FOUND("NOT_FOUND", 404),
    VALIDATION_ERROR("VALIDATION_ERROR", 400),
    INTERNAL_ERROR("INTERNAL_ERROR", 500);

    public final String code;
    public final int httpStatus;

    ErrorCode(String code, int httpStatus) {
        this.code = code;
        this.httpStatus = httpStatus;
    }
}
