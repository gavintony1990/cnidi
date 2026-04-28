package com.cnidi.system.core.admin.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;

@TableName("sys_role_permission")
public class SysRolePermissionEntity extends BaseEntity {

    private Long roleId;
    private Long permissionId;

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    public Long getPermissionId() { return permissionId; }
    public void setPermissionId(Long permissionId) { this.permissionId = permissionId; }
}
