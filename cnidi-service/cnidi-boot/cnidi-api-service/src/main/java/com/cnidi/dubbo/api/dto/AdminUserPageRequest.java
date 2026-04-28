package com.cnidi.dubbo.api.dto;

import java.io.Serializable;

public record AdminUserPageRequest(
        long pageNum,
        long pageSize,
        String username,
        String nickname,
        String mobile,
        String status,
        String userType
) implements Serializable {
}
