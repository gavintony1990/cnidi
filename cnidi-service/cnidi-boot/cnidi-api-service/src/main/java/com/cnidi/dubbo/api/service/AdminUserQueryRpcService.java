package com.cnidi.dubbo.api.service;

import com.cnidi.dubbo.api.dto.AdminUserPageRequest;
import com.cnidi.dubbo.api.dto.AdminUserPageResponse;

public interface AdminUserQueryRpcService {

    AdminUserPageResponse pageUsers(AdminUserPageRequest request);
}
