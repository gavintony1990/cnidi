-- 用户表
CREATE TABLE IF NOT EXISTS sys_user (
    id         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',
    username   VARCHAR(64)  NOT NULL                COMMENT '用户名',
    email      VARCHAR(128)                          COMMENT '邮箱',
    password   VARCHAR(255) NOT NULL                COMMENT 'BCrypt 哈希密码',
    status     TINYINT(1)   NOT NULL DEFAULT 1      COMMENT '状态：1启用 0禁用',
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT                               COMMENT '创建人ID',
    updated_by BIGINT                               COMMENT '更新人ID',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统用户表';

-- 初始管理员账号
-- 明文密码：Admin@123456（仅用于开发环境，生产上线前必须修改）
INSERT INTO sys_user (username, password, status)
VALUES ('admin', '$2a$10$7EqJtq98hPqEX7fNZaFWoOa.lXqTppnSMplTSjkVGMf1/GdVpnxYe', 1);
