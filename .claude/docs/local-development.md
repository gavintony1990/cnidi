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

## 未来建议

后续初始化三端后，建议根目录补：

- `package.json` 作为开发编排入口
- `npm run dev:web`
- `npm run dev:admin`
- `npm run dev:boot`
- `npm run dev` 一键并行启动
