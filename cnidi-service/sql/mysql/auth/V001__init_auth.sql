CREATE DATABASE IF NOT EXISTS `cnidi_auth`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE `cnidi_auth`;

CREATE TABLE IF NOT EXISTS `sys_user` (
  `id` BIGINT NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `nickname` VARCHAR(64) NOT NULL,
  `mobile` VARCHAR(32) DEFAULT NULL,
  `email` VARCHAR(128) DEFAULT NULL,
  `user_type` VARCHAR(32) NOT NULL,
  `status` VARCHAR(32) NOT NULL,
  `last_login_time` DATETIME DEFAULT NULL,
  `last_login_ip` VARCHAR(64) DEFAULT NULL,
  `remark` VARCHAR(255) DEFAULT NULL,
  `create_by` VARCHAR(64) DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(64) DEFAULT NULL,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sys_user_username` (`username`),
  UNIQUE KEY `uk_sys_user_mobile` (`mobile`),
  UNIQUE KEY `uk_sys_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='认证用户主表';

CREATE TABLE IF NOT EXISTS `sys_user_credential` (
  `id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `credential_type` VARCHAR(32) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `password_salt` VARCHAR(255) DEFAULT NULL,
  `password_version` INT NOT NULL DEFAULT 1,
  `expire_at` DATETIME DEFAULT NULL,
  `create_by` VARCHAR(64) DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(64) DEFAULT NULL,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sys_user_credential_user_type` (`user_id`, `credential_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户凭证表';

CREATE TABLE IF NOT EXISTS `sys_refresh_token` (
  `id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `token_hash` VARCHAR(255) NOT NULL,
  `client_type` VARCHAR(32) NOT NULL,
  `expire_at` DATETIME NOT NULL,
  `last_used_at` DATETIME DEFAULT NULL,
  `revoked` TINYINT(1) NOT NULL DEFAULT 0,
  `created_ip` VARCHAR(64) DEFAULT NULL,
  `user_agent` VARCHAR(512) DEFAULT NULL,
  `create_by` VARCHAR(64) DEFAULT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(64) DEFAULT NULL,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sys_refresh_token_hash` (`token_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='刷新令牌表';

CREATE TABLE IF NOT EXISTS `sys_login_log` (
  `id` BIGINT NOT NULL,
  `user_id` BIGINT DEFAULT NULL,
  `username` VARCHAR(64) NOT NULL,
  `login_type` VARCHAR(32) NOT NULL,
  `success` TINYINT(1) NOT NULL,
  `ip` VARCHAR(64) DEFAULT NULL,
  `user_agent` VARCHAR(512) DEFAULT NULL,
  `fail_reason` VARCHAR(255) DEFAULT NULL,
  `login_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='登录日志表';
