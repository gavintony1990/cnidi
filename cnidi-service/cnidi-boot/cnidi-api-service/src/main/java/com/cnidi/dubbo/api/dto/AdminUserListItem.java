package com.cnidi.dubbo.api.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public record AdminUserListItem(
        Long id,
        String username,
        String nickname,
        String mobile,
        String email,
        String userType,
        String status,
        List<String> roleCodes,
        LocalDateTime createTime
) implements Serializable {
}
