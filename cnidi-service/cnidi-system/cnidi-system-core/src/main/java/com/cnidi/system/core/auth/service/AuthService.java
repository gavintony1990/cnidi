package com.cnidi.system.core.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.cnidi.common.enums.ErrorCode;
import com.cnidi.common.exception.BaseException;
import com.cnidi.common.security.AuthenticatedUser;
import com.cnidi.common.security.JwtTokenProvider;
import com.cnidi.system.core.auth.dto.LoginRequest;
import com.cnidi.system.core.auth.dto.LoginResponse;
import com.cnidi.system.core.auth.dto.LogoutResponse;
import com.cnidi.system.core.auth.dto.MeResponse;
import com.cnidi.system.core.auth.dto.RefreshTokenRequest;
import com.cnidi.system.core.auth.dto.RegisterRequest;
import com.cnidi.system.core.auth.dto.RegisterResponse;
import com.cnidi.system.core.auth.entity.SysLoginLogEntity;
import com.cnidi.system.core.auth.entity.SysRefreshTokenEntity;
import com.cnidi.system.core.auth.entity.SysUserCredentialEntity;
import com.cnidi.system.core.auth.entity.SysUserEntity;
import com.cnidi.system.core.auth.mapper.SysLoginLogMapper;
import com.cnidi.system.core.auth.mapper.SysRefreshTokenMapper;
import com.cnidi.system.core.auth.mapper.SysUserCredentialMapper;
import com.cnidi.system.core.auth.mapper.SysUserMapper;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final SysUserMapper sysUserMapper;
    private final SysUserCredentialMapper sysUserCredentialMapper;
    private final SysRefreshTokenMapper sysRefreshTokenMapper;
    private final SysLoginLogMapper sysLoginLogMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            SysUserMapper sysUserMapper,
            SysUserCredentialMapper sysUserCredentialMapper,
            SysRefreshTokenMapper sysRefreshTokenMapper,
            SysLoginLogMapper sysLoginLogMapper,
            JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder
    ) {
        this.sysUserMapper = sysUserMapper;
        this.sysUserCredentialMapper = sysUserCredentialMapper;
        this.sysRefreshTokenMapper = sysRefreshTokenMapper;
        this.sysLoginLogMapper = sysLoginLogMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request, String ip, String userAgent) {
        SysUserEntity user = sysUserMapper.selectOne(new LambdaQueryWrapper<SysUserEntity>()
                .eq(SysUserEntity::getUsername, request.username()));
        if (user == null || !"ENABLED".equals(user.getStatus())) {
            logLogin(null, request.username(), false, ip, userAgent, "Invalid username or status");
            throw new BaseException(ErrorCode.UNAUTHORIZED, "Invalid username or password");
        }

        SysUserCredentialEntity credential = sysUserCredentialMapper.selectOne(
                new LambdaQueryWrapper<SysUserCredentialEntity>()
                        .eq(SysUserCredentialEntity::getUserId, user.getId())
                        .eq(SysUserCredentialEntity::getCredentialType, "PASSWORD"));
        if (credential == null || !passwordEncoder.matches(request.password(), credential.getPasswordHash())) {
            logLogin(user.getId(), user.getUsername(), false, ip, userAgent, "Invalid password");
            throw new BaseException(ErrorCode.UNAUTHORIZED, "Invalid username or password");
        }

        user.setLastLoginIp(ip);
        user.setLastLoginTime(LocalDateTime.now());
        sysUserMapper.updateById(user);
        logLogin(user.getId(), user.getUsername(), true, ip, userAgent, null);
        return buildLoginResponse(user, ip, userAgent);
    }

    public LoginResponse refresh(RefreshTokenRequest request, String ip, String userAgent) {
        Long userId;
        try {
            userId = jwtTokenProvider.parseRefreshTokenUserId(request.refreshToken());
        } catch (Exception ex) {
            throw new BaseException(ErrorCode.UNAUTHORIZED, "Invalid refresh token", ex);
        }

        SysRefreshTokenEntity stored = sysRefreshTokenMapper.selectOne(
                new LambdaQueryWrapper<SysRefreshTokenEntity>()
                        .eq(SysRefreshTokenEntity::getTokenHash, hashToken(request.refreshToken()))
                        .eq(SysRefreshTokenEntity::getRevoked, 0));
        if (stored == null || stored.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new BaseException(ErrorCode.UNAUTHORIZED, "Invalid refresh token");
        }
        stored.setLastUsedAt(LocalDateTime.now());
        sysRefreshTokenMapper.updateById(stored);

        SysUserEntity user = requireUser(userId);
        return buildLoginResponse(user, ip, userAgent);
    }

    public LogoutResponse logout(String refreshToken) {
        SysRefreshTokenEntity stored = sysRefreshTokenMapper.selectOne(
                new LambdaQueryWrapper<SysRefreshTokenEntity>()
                        .eq(SysRefreshTokenEntity::getTokenHash, hashToken(refreshToken))
                        .eq(SysRefreshTokenEntity::getRevoked, 0));
        if (stored != null) {
            stored.setRevoked(1);
            stored.setLastUsedAt(LocalDateTime.now());
            sysRefreshTokenMapper.updateById(stored);
        }
        return new LogoutResponse(true);
    }

    public MeResponse me(Long userId) {
        SysUserEntity user = requireUser(userId);
        return new MeResponse(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getUserType(),
                rolesFor(user),
                permissionsFor(user)
        );
    }

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        boolean usernameExists = sysUserMapper.selectCount(new LambdaQueryWrapper<SysUserEntity>()
                .eq(SysUserEntity::getUsername, request.username())) > 0;
        if (usernameExists) {
            throw new BaseException(ErrorCode.CONFLICT, "用户名已存在");
        }

        if (request.mobile() != null && !request.mobile().isBlank()) {
            boolean mobileExists = sysUserMapper.selectCount(new LambdaQueryWrapper<SysUserEntity>()
                    .eq(SysUserEntity::getMobile, request.mobile())) > 0;
            if (mobileExists) {
                throw new BaseException(ErrorCode.CONFLICT, "手机号已存在");
            }
        }

        if (request.email() != null && !request.email().isBlank()) {
            boolean emailExists = sysUserMapper.selectCount(new LambdaQueryWrapper<SysUserEntity>()
                    .eq(SysUserEntity::getEmail, request.email())) > 0;
            if (emailExists) {
                throw new BaseException(ErrorCode.CONFLICT, "邮箱已存在");
            }
        }

        SysUserEntity user = new SysUserEntity();
        user.setUsername(request.username());
        user.setNickname(request.nickname() != null && !request.nickname().isBlank()
                ? request.nickname() : request.username());
        user.setMobile(request.mobile());
        user.setEmail(request.email());
        user.setUserType("NORMAL");
        user.setStatus("ENABLED");
        sysUserMapper.insert(user);

        SysUserCredentialEntity credential = new SysUserCredentialEntity();
        credential.setUserId(user.getId());
        credential.setCredentialType("PASSWORD");
        credential.setPasswordHash(passwordEncoder.encode(request.password()));
        credential.setPasswordVersion(1);
        sysUserCredentialMapper.insert(credential);

        return new RegisterResponse(user.getId(), user.getUsername(), user.getStatus());
    }

    private LoginResponse buildLoginResponse(SysUserEntity user, String ip, String userAgent) {
        AuthenticatedUser authenticatedUser = new AuthenticatedUser(
                user.getId(),
                user.getUsername(),
                user.getUserType(),
                rolesFor(user),
                permissionsFor(user)
        );
        String accessToken = jwtTokenProvider.createAccessToken(authenticatedUser);
        String refreshToken = jwtTokenProvider.createRefreshToken(authenticatedUser);
        LocalDateTime accessExpiresAt = jwtTokenProvider.getAccessTokenExpiresAt();
        LocalDateTime refreshExpiresAt = jwtTokenProvider.getRefreshTokenExpiresAt();

        SysRefreshTokenEntity refreshTokenEntity = new SysRefreshTokenEntity();
        refreshTokenEntity.setUserId(user.getId());
        refreshTokenEntity.setTokenHash(hashToken(refreshToken));
        refreshTokenEntity.setClientType("WEB");
        refreshTokenEntity.setExpireAt(refreshExpiresAt);
        refreshTokenEntity.setRevoked(0);
        refreshTokenEntity.setCreatedIp(ip);
        refreshTokenEntity.setUserAgent(userAgent);
        sysRefreshTokenMapper.insert(refreshTokenEntity);

        return new LoginResponse(
                accessToken,
                Duration.between(LocalDateTime.now(), accessExpiresAt).toSeconds(),
                accessToken,
                refreshToken,
                accessExpiresAt,
                refreshExpiresAt,
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getUserType(),
                authenticatedUser.roles(),
                authenticatedUser.permissions()
        );
    }

    private SysUserEntity requireUser(Long userId) {
        SysUserEntity user = sysUserMapper.selectById(userId);
        if (user == null) {
            throw new BaseException(ErrorCode.UNAUTHORIZED, "User not found");
        }
        return user;
    }

    private List<String> rolesFor(SysUserEntity user) {
        return "ADMIN".equals(user.getUserType()) ? List.of("ADMIN") : List.of("USER");
    }

    private List<String> permissionsFor(SysUserEntity user) {
        return "ADMIN".equals(user.getUserType()) ? List.of("*") : List.of();
    }

    private void logLogin(Long userId, String username, boolean success, String ip, String userAgent, String failReason) {
        SysLoginLogEntity log = new SysLoginLogEntity();
        log.setUserId(userId);
        log.setUsername(username);
        log.setLoginType("PASSWORD");
        log.setSuccess(success);
        log.setIp(ip);
        log.setUserAgent(userAgent);
        log.setFailReason(failReason);
        log.setLoginTime(LocalDateTime.now());
        sysLoginLogMapper.insert(log);
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 is unavailable", ex);
        }
    }
}
