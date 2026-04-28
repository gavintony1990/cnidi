package com.cnidi.dubbo.api.dto;

import java.io.Serializable;
import java.util.List;

public record AuthorizationProfile(
        Long userId,
        List<String> roles,
        List<String> permissions
) implements Serializable {
}
