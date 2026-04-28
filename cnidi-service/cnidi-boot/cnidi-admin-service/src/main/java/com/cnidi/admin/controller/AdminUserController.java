package com.cnidi.admin.controller;

import com.cnidi.common.api.ApiResponse;
import com.cnidi.common.enums.ErrorCode;
import com.cnidi.common.exception.BaseException;
import com.cnidi.common.security.AuthenticatedUser;
import com.cnidi.dubbo.api.dto.AdminUserPageRequest;
import com.cnidi.dubbo.api.dto.AdminUserPageResponse;
import com.cnidi.dubbo.api.service.AdminUserQueryRpcService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @DubboReference
    private AdminUserQueryRpcService adminUserQueryRpcService;

    @GetMapping
    public ApiResponse<AdminUserPageResponse> pageUsers(
            @RequestParam(defaultValue = "1") @Min(1) long pageNum,
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) long pageSize,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) @Pattern(regexp = "ENABLED|DISABLED|LOCKED") String status,
            @RequestParam(required = false) @Pattern(regexp = "ADMIN|NORMAL") String userType,
            Authentication authentication
    ) {
        requirePermission(authentication, "user:read");
        return ApiResponse.success(adminUserQueryRpcService.pageUsers(new AdminUserPageRequest(
                pageNum,
                pageSize,
                username,
                nickname,
                mobile,
                status,
                userType
        )));
    }

    private void requirePermission(Authentication authentication, String permission) {
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUser user)) {
            throw new BaseException(ErrorCode.UNAUTHORIZED, "Unauthorized");
        }
        if (!user.permissions().contains("*") && !user.permissions().contains(permission)) {
            throw new BaseException(ErrorCode.FORBIDDEN, "Permission denied");
        }
    }
}
