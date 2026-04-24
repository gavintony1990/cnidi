package com.cnidi.common.util;

import java.util.UUID;

public final class RequestIdUtils {

    private RequestIdUtils() {
    }

    public static String newRequestId() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
