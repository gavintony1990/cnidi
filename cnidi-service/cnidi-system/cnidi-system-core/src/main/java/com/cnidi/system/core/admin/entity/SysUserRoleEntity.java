package com.cnidi.system.core.admin.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;

@TableName("sys_user_role")
public class SysUserRoleEntity extends BaseEntity {

    private Long userId;
    private Long roleId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
}
