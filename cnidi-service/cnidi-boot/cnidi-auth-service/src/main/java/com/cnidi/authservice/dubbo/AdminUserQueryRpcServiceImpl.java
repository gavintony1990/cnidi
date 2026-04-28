package com.cnidi.authservice.dubbo;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cnidi.dubbo.api.dto.AdminUserListItem;
import com.cnidi.dubbo.api.dto.AdminUserPageRequest;
import com.cnidi.dubbo.api.dto.AdminUserPageResponse;
import com.cnidi.dubbo.api.service.AdminUserQueryRpcService;
import com.cnidi.system.core.auth.entity.SysUserEntity;
import com.cnidi.system.core.auth.mapper.SysUserMapper;
import java.util.Collections;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.util.StringUtils;

@DubboService
public class AdminUserQueryRpcServiceImpl implements AdminUserQueryRpcService {

    private final SysUserMapper sysUserMapper;

    public AdminUserQueryRpcServiceImpl(SysUserMapper sysUserMapper) {
        this.sysUserMapper = sysUserMapper;
    }

    @Override
    public AdminUserPageResponse pageUsers(AdminUserPageRequest request) {
        LambdaQueryWrapper<SysUserEntity> wrapper = new LambdaQueryWrapper<SysUserEntity>()
                .likeRight(StringUtils.hasText(request.username()), SysUserEntity::getUsername, request.username())
                .like(StringUtils.hasText(request.nickname()), SysUserEntity::getNickname, request.nickname())
                .eq(StringUtils.hasText(request.mobile()), SysUserEntity::getMobile, request.mobile())
                .eq(StringUtils.hasText(request.status()), SysUserEntity::getStatus, request.status())
                .eq(StringUtils.hasText(request.userType()), SysUserEntity::getUserType, request.userType())
                .orderByDesc(SysUserEntity::getCreateTime)
                .orderByDesc(SysUserEntity::getId);
        Page<SysUserEntity> page = sysUserMapper.selectPage(new Page<>(request.pageNum(), request.pageSize()), wrapper);
        return new AdminUserPageResponse(
                page.getCurrent(),
                page.getSize(),
                page.getTotal(),
                page.getRecords().stream()
                        .map(user -> new AdminUserListItem(
                                user.getId(),
                                user.getUsername(),
                                user.getNickname(),
                                user.getMobile(),
                                user.getEmail(),
                                user.getUserType(),
                                user.getStatus(),
                                Collections.emptyList(),
                                user.getCreateTime()
                        ))
                        .toList()
        );
    }
}
