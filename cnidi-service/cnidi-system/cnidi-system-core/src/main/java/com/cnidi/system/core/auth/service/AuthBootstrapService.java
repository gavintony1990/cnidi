package com.cnidi.system.core.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.cnidi.system.core.auth.entity.SysUserCredentialEntity;
import com.cnidi.system.core.auth.entity.SysUserEntity;
import com.cnidi.system.core.auth.mapper.SysUserCredentialMapper;
import com.cnidi.system.core.auth.mapper.SysUserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthBootstrapService {

    private static final String ADMIN_USERNAME = "admin";

    private final SysUserMapper sysUserMapper;
    private final SysUserCredentialMapper sysUserCredentialMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthBootstrapService(
            SysUserMapper sysUserMapper,
            SysUserCredentialMapper sysUserCredentialMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.sysUserMapper = sysUserMapper;
        this.sysUserCredentialMapper = sysUserCredentialMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void initializeAdminData() {
        SysUserEntity existing = sysUserMapper.selectOne(new LambdaQueryWrapper<SysUserEntity>()
                .eq(SysUserEntity::getUsername, ADMIN_USERNAME));
        if (existing != null) {
            return;
        }

        SysUserEntity user = new SysUserEntity();
        user.setUsername(ADMIN_USERNAME);
        user.setNickname("Administrator");
        user.setUserType("ADMIN");
        user.setStatus("ENABLED");
        sysUserMapper.insert(user);

        SysUserCredentialEntity credential = new SysUserCredentialEntity();
        credential.setUserId(user.getId());
        credential.setCredentialType("PASSWORD");
        credential.setPasswordHash(passwordEncoder.encode("admin123"));
        credential.setPasswordVersion(1);
        sysUserCredentialMapper.insert(credential);
    }
}
