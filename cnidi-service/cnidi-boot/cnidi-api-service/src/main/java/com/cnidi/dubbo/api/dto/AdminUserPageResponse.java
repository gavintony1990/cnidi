package com.cnidi.dubbo.api.dto;

import java.io.Serializable;
import java.util.List;

public record AdminUserPageResponse(
        long pageNum,
        long pageSize,
        long total,
        List<AdminUserListItem> records
) implements Serializable {
}
