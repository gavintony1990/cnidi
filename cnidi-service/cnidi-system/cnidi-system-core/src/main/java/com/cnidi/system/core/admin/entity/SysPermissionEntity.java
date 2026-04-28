package com.cnidi.system.core.admin.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.cnidi.dependencies.entity.BaseEntity;

@TableName("sys_permission")
public class SysPermissionEntity extends BaseEntity {

    private String permissionCode;
    private String permissionName;
    private String resourceType;
    private String remark;

    public String getPermissionCode() { return permissionCode; }
    public void setPermissionCode(String permissionCode) { this.permissionCode = permissionCode; }
    public String getPermissionName() { return permissionName; }
    public void setPermissionName(String permissionName) { this.permissionName = permissionName; }
    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
}
