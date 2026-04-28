package com.cnidi.system.core.auth.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;
import java.time.LocalDateTime;

@TableName("sys_user")
public class SysUserEntity extends BaseEntity {

    private String username;
    private String nickname;
    private String mobile;
    private String email;
    private String userType;
    private String status;
    private LocalDateTime lastLoginTime;
    private String lastLoginIp;
    private String remark;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLastLoginTime() { return lastLoginTime; }
    public void setLastLoginTime(LocalDateTime lastLoginTime) { this.lastLoginTime = lastLoginTime; }
    public String getLastLoginIp() { return lastLoginIp; }
    public void setLastLoginIp(String lastLoginIp) { this.lastLoginIp = lastLoginIp; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
}
