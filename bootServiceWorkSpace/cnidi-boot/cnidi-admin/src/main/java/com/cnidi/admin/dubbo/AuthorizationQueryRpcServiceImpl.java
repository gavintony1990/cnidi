package com.cnidi.admin.dubbo;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.cnidi.dubbo.api.dto.AuthorizationProfile;
import com.cnidi.dubbo.api.service.AuthorizationQueryRpcService;
import com.cnidi.system.core.admin.entity.SysPermissionEntity;
import com.cnidi.system.core.admin.entity.SysRoleEntity;
import com.cnidi.system.core.admin.entity.SysRolePermissionEntity;
import com.cnidi.system.core.admin.entity.SysUserRoleEntity;
import com.cnidi.system.core.admin.mapper.SysPermissionMapper;
import com.cnidi.system.core.admin.mapper.SysRoleMapper;
import com.cnidi.system.core.admin.mapper.SysRolePermissionMapper;
import com.cnidi.system.core.admin.mapper.SysUserRoleMapper;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.dubbo.config.annotation.DubboService;

@DubboService
public class AuthorizationQueryRpcServiceImpl implements AuthorizationQueryRpcService {

    private final SysRoleMapper sysRoleMapper;
    private final SysPermissionMapper sysPermissionMapper;
    private final SysUserRoleMapper sysUserRoleMapper;
    private final SysRolePermissionMapper sysRolePermissionMapper;

    public AuthorizationQueryRpcServiceImpl(
            SysRoleMapper sysRoleMapper,
            SysPermissionMapper sysPermissionMapper,
            SysUserRoleMapper sysUserRoleMapper,
            SysRolePermissionMapper sysRolePermissionMapper
    ) {
        this.sysRoleMapper = sysRoleMapper;
        this.sysPermissionMapper = sysPermissionMapper;
        this.sysUserRoleMapper = sysUserRoleMapper;
        this.sysRolePermissionMapper = sysRolePermissionMapper;
    }

    @Override
    public AuthorizationProfile getAuthorizationProfile(Long userId) {
        List<Long> roleIds = sysUserRoleMapper.selectList(new LambdaQueryWrapper<SysUserRoleEntity>()
                        .eq(SysUserRoleEntity::getUserId, userId))
                .stream()
                .map(SysUserRoleEntity::getRoleId)
                .toList();

        if (roleIds.isEmpty()) {
            return new AuthorizationProfile(userId, Collections.emptyList(), Collections.emptyList());
        }

        List<String> roleCodes = sysRoleMapper.selectBatchIds(roleIds)
                .stream()
                .map(SysRoleEntity::getRoleCode)
                .toList();

        List<Long> permissionIds = sysRolePermissionMapper.selectList(
                        new LambdaQueryWrapper<SysRolePermissionEntity>().in(SysRolePermissionEntity::getRoleId, roleIds))
                .stream()
                .map(SysRolePermissionEntity::getPermissionId)
                .distinct()
                .toList();

        List<String> permissions = permissionIds.isEmpty()
                ? Collections.emptyList()
                : sysPermissionMapper.selectBatchIds(permissionIds)
                .stream()
                .map(SysPermissionEntity::getPermissionCode)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        return new AuthorizationProfile(userId, roleCodes, permissions);
    }
}
