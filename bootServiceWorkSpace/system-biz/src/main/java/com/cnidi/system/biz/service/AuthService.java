package com.cnidi.system.biz.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.cnidi.common.exception.BusinessException;
import com.cnidi.common.exception.ErrorCode;
import com.cnidi.common.security.JwtUtils;
import com.cnidi.system.api.auth.CurrentUserVO;
import com.cnidi.system.api.auth.LoginRequest;
import com.cnidi.system.api.auth.LoginResponse;
import com.cnidi.system.biz.entity.SysUser;
import com.cnidi.system.biz.mapper.SysUserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final SysUserMapper sysUserMapper;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {
        SysUser user = sysUserMapper.selectOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, request.username())
        );

        // 账号不存在或密码错误统一返回相同错误，防止枚举账号
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            log.warn("Login failed for username: {}", request.username());
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "账号或密码错误");
        }

        if (user.getStatus() != null && user.getStatus() == 0) {
            throw new BusinessException(ErrorCode.UNAUTHORIZED, "账号已被禁用");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getUsername());
        log.info("Login success: userId={}, username={}", user.getId(), user.getUsername());
        return new LoginResponse(token, jwtUtils.getExpirationSeconds());
    }

    public CurrentUserVO getCurrentUser(Long userId, String username) {
        return new CurrentUserVO(userId, username, List.of("ADMIN"));
    }
}
