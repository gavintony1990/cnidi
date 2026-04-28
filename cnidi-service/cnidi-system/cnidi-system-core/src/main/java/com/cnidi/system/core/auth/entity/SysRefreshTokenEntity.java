package com.cnidi.system.core.auth.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;
import java.time.LocalDateTime;

@TableName("sys_refresh_token")
public class SysRefreshTokenEntity extends BaseEntity {

    private Long userId;
    private String tokenHash;
    private String clientType;
    private LocalDateTime expireAt;
    private LocalDateTime lastUsedAt;
    private Integer revoked;
    private String createdIp;
    private String userAgent;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getTokenHash() { return tokenHash; }
    public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }
    public String getClientType() { return clientType; }
    public void setClientType(String clientType) { this.clientType = clientType; }
    public LocalDateTime getExpireAt() { return expireAt; }
    public void setExpireAt(LocalDateTime expireAt) { this.expireAt = expireAt; }
    public LocalDateTime getLastUsedAt() { return lastUsedAt; }
    public void setLastUsedAt(LocalDateTime lastUsedAt) { this.lastUsedAt = lastUsedAt; }
    public Integer getRevoked() { return revoked; }
    public void setRevoked(Integer revoked) { this.revoked = revoked; }
    public String getCreatedIp() { return createdIp; }
    public void setCreatedIp(String createdIp) { this.createdIp = createdIp; }
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
}
