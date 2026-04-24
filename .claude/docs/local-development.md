# Local Development

本文件记录当前仓库的本地开发约定。当前阶段已经完成三端最小骨架初始化，后续在此基础上继续扩展业务模板。

## 当前目录

```txt
WebServiceWorkSpace/
webAdminServiceWorkSpace/
bootServiceWorkSpace/
```

## 目标启动方式

### 后端

```bash
cd bootServiceWorkSpace
mvn -pl boot-start spring-boot:run
```

### 用户端

```bash
cd WebServiceWorkSpace
npm install
npm run dev
```

### 管理后台

```bash
cd webAdminServiceWorkSpace
npm install
npm run dev
```

## 当前状态

- 当前三端目录已完成最小骨架初始化
- 前端可作为 React + Vite 起点继续扩展
- 后端可作为 Spring Boot + Maven 多模块起点继续扩展
- 尚未添加根目录统一启动脚本

## DeepSeek CLI 本地接入

当前项目推荐把 DeepSeek 作为本地受控命令接入 Claude / Codex 工作流，不直接提交真实凭据，也不把它接入业务代码。

### 接入原则

- 仓库只提交示例配置和示例脚本
- 真实 API Key、真实 CLI 路径只放本机环境变量或 `.claude/mcp/settings.local.json`
- Claude / Codex 优先调用统一 wrapper，而不是直接调用裸 `deepseek`
- 默认使用非交互模式，避免把 prompt / response 持久化到仓库

### 建议文件

- 示例脚本：`scripts/deepseek-codex.example.sh`
- 本地实际脚本：`scripts/deepseek-codex.local.sh`
- 本地 Claude 设置实际文件：`.claude/mcp/settings.local.json`
- Claude 兼容入口：`.claude/settings.local.json`

### 推荐环境变量

```bash
export DEEPSEEK_API_KEY="your-local-key"
export DEEPSEEK_MODEL="deepseek-chat"
export DEEPSEEK_CLI_BIN="/absolute/path/to/deepseek"
```

如果 `DEEPSEEK_CLI_BIN` 未设置，wrapper 默认回退到 `deepseek`，要求该命令已在 `PATH` 中。

### 本地 Claude 设置示例

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(scripts/deepseek-codex.local.sh *)"
    ]
  },
  "env": {
    "DEEPSEEK_MODEL": "deepseek-chat"
  }
}
```

### 推荐调用方式

```bash
scripts/deepseek-codex.local.sh "总结当前目录结构"
printf '%s\n' "请审阅这个 patch" | scripts/deepseek-codex.local.sh --stdin
scripts/deepseek-codex.local.sh --model deepseek-reasoner "解释这个错误"
```

### Wrapper 约定

- 输入支持命令行 prompt 或 `--stdin`
- 输出统一写到 `stdout`
- 错误统一写到 `stderr`
- 缺少 CLI 或缺少密钥时立即失败并返回非零退出码
- 默认不落盘日志；如需审计，只记录时间、模式、退出码，不记录完整 prompt / response

### 落地步骤

1. 复制 `scripts/deepseek-codex.example.sh` 为 `scripts/deepseek-codex.local.sh`
2. 按本机实际情况调整底层 `deepseek` CLI 参数
3. `chmod +x scripts/deepseek-codex.local.sh`
4. 配置本机环境变量和 `.claude/mcp/settings.local.json`
5. 先执行 `--help`、普通 prompt、`--stdin` 三类自测

## 未来建议

后续初始化三端后，建议根目录补：

- `package.json` 作为开发编排入口
- `npm run dev:web`
- `npm run dev:admin`
- `npm run dev:boot`
- `npm run dev` 一键并行启动
