package com.cnidi.system.core.service;

import com.cnidi.system.core.admin.mapper.SysMenuMapper;
import com.cnidi.system.core.admin.mapper.SysPermissionMapper;
import com.cnidi.system.core.admin.mapper.SysRoleMapper;
import com.cnidi.system.core.model.SystemSummary;
import org.springframework.stereotype.Service;

@Service
public class SystemOverviewService {

    private final SysRoleMapper sysRoleMapper;
    private final SysPermissionMapper sysPermissionMapper;
    private final SysMenuMapper sysMenuMapper;

    public SystemOverviewService(
            SysRoleMapper sysRoleMapper,
            SysPermissionMapper sysPermissionMapper,
            SysMenuMapper sysMenuMapper
    ) {
        this.sysRoleMapper = sysRoleMapper;
        this.sysPermissionMapper = sysPermissionMapper;
        this.sysMenuMapper = sysMenuMapper;
    }

    public SystemSummary getSummary() {
        return new SystemSummary(
                sysRoleMapper.selectCount(null),
                sysPermissionMapper.selectCount(null),
                sysMenuMapper.selectCount(null)
        );
    }
}
