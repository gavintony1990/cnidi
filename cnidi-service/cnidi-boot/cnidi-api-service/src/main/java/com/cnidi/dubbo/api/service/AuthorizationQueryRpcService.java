package com.cnidi.dubbo.api.service;

import com.cnidi.dubbo.api.dto.AuthorizationProfile;

public interface AuthorizationQueryRpcService {

    AuthorizationProfile getAuthorizationProfile(Long userId);
}
