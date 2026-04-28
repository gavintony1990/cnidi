package com.cnidi.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final String CLAIM_USER_ID = "uid";
    private static final String CLAIM_USER_TYPE = "userType";
    private static final String CLAIM_ROLES = "roles";
    private static final String CLAIM_PERMISSIONS = "permissions";
    private static final String CLAIM_TOKEN_TYPE = "tokenType";
    private static final String TOKEN_TYPE_ACCESS = "ACCESS";
    private static final String TOKEN_TYPE_REFRESH = "REFRESH";

    private final SecretKey secretKey;
    private final long accessTokenExpireMinutes;
    private final long refreshTokenExpireDays;

    public JwtTokenProvider(
            @Value("${cnidi.security.jwt.secret}") String secret,
            @Value("${cnidi.security.jwt.access-token-expire-minutes:30}") long accessTokenExpireMinutes,
            @Value("${cnidi.security.jwt.refresh-token-expire-days:7}") long refreshTokenExpireDays
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpireMinutes = accessTokenExpireMinutes;
        this.refreshTokenExpireDays = refreshTokenExpireDays;
    }

    public String createAccessToken(AuthenticatedUser user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusMinutes(accessTokenExpireMinutes);
        return Jwts.builder()
                .subject(user.username())
                .claim(CLAIM_USER_ID, user.userId())
                .claim(CLAIM_USER_TYPE, user.userType())
                .claim(CLAIM_ROLES, user.roles())
                .claim(CLAIM_PERMISSIONS, user.permissions())
                .claim(CLAIM_TOKEN_TYPE, TOKEN_TYPE_ACCESS)
                .issuedAt(toDate(now))
                .expiration(toDate(expiresAt))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(AuthenticatedUser user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusDays(refreshTokenExpireDays);
        return Jwts.builder()
                .subject(user.username())
                .claim(CLAIM_USER_ID, user.userId())
                .claim(CLAIM_USER_TYPE, user.userType())
                .claim(CLAIM_TOKEN_TYPE, TOKEN_TYPE_REFRESH)
                .issuedAt(toDate(now))
                .expiration(toDate(expiresAt))
                .signWith(secretKey)
                .compact();
    }

    public LocalDateTime getAccessTokenExpiresAt() {
        return LocalDateTime.now().plusMinutes(accessTokenExpireMinutes);
    }

    public LocalDateTime getRefreshTokenExpiresAt() {
        return LocalDateTime.now().plusDays(refreshTokenExpireDays);
    }

    public AuthenticatedUser parseAccessToken(String token) {
        Claims claims = parseClaims(token);
        if (!TOKEN_TYPE_ACCESS.equals(claims.get(CLAIM_TOKEN_TYPE, String.class))) {
            throw new IllegalArgumentException("Invalid access token type");
        }
        return new AuthenticatedUser(
                claims.get(CLAIM_USER_ID, Long.class),
                claims.getSubject(),
                claims.get(CLAIM_USER_TYPE, String.class),
                claims.get(CLAIM_ROLES, List.class),
                claims.get(CLAIM_PERMISSIONS, List.class)
        );
    }

    public Long parseRefreshTokenUserId(String token) {
        Claims claims = parseClaims(token);
        if (!TOKEN_TYPE_REFRESH.equals(claims.get(CLAIM_TOKEN_TYPE, String.class))) {
            throw new IllegalArgumentException("Invalid refresh token type");
        }
        return claims.get(CLAIM_USER_ID, Long.class);
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Date toDate(LocalDateTime value) {
        return Date.from(value.atZone(ZoneId.systemDefault()).toInstant());
    }
}
