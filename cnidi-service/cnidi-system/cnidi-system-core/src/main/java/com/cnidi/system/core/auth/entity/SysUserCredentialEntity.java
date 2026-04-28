package com.cnidi.system.core.auth.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;
import java.time.LocalDateTime;

@TableName("sys_user_credential")
public class SysUserCredentialEntity extends BaseEntity {

    private Long userId;
    private String credentialType;
    private String passwordHash;
    private String passwordSalt;
    private Integer passwordVersion;
    private LocalDateTime expireAt;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getCredentialType() { return credentialType; }
    public void setCredentialType(String credentialType) { this.credentialType = credentialType; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getPasswordSalt() { return passwordSalt; }
    public void setPasswordSalt(String passwordSalt) { this.passwordSalt = passwordSalt; }
    public Integer getPasswordVersion() { return passwordVersion; }
    public void setPasswordVersion(Integer passwordVersion) { this.passwordVersion = passwordVersion; }
    public LocalDateTime getExpireAt() { return expireAt; }
    public void setExpireAt(LocalDateTime expireAt) { this.expireAt = expireAt; }
}
