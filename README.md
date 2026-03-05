## spa-with-cloudflare

基于 Vite 的单页应用（SPA），用于演示在 **Cloudflare Pages** 上以 **CSR（Client Side Rendering）模式** 部署与回滚。

### 本地运行（使用 pnpm）

1. 安装依赖：

   ```bash
   pnpm install
   ```

2. 启动开发服务器：

   ```bash
   pnpm dev
   ```

   然后在浏览器中打开终端输出的地址（通常是 `http://localhost:5173`）。

### 项目结构（核心部分）

- `index.html`：应用入口 HTML 壳。
- `src/main.tsx`：挂载 React 应用。
- `src/App.tsx`：主页面，展示当前部署信息、部署与回滚流程说明。
- `src/styles.css`：简单的暗色系 UI 样式。
- `vite.config.ts`：Vite 配置，内置 `__BUILD_TIME__` 常量。
- `wrangler.toml`：用于 `wrangler pages dev/deploy` 的 Pages 输出目录配置。

### 在 Cloudflare Pages 上部署（推荐方式）

1. 将本项目推送到 Git 仓库（GitHub / GitLab / Bitbucket）。
2. 登录 Cloudflare Dashboard，进入 **Pages**，创建新项目，选择对应仓库。
3. 构建配置：
   - **Build command**：`pnpm build`
   - **Build output directory**：`dist`
4. 保存后，Cloudflare 会自动为每次推送创建新的 **生产部署** 和 **预览部署**。

#### 可选：版本号环境变量

为了更直观地演示回滚效果，可以在 Pages 项目的 **Environment variables** 中添加：

- 名称：`VITE_APP_VERSION`
- 值：如 `v1.0.0`、`experiment-A`、`rollback-test` 等

应用在运行时会通过 `import.meta.env.VITE_APP_VERSION` 读取此值，并显示在页面顶部的“应用版本”区域中。

### 使用 Cloudflare Pages 演示回滚

1. **部署第一个版本**
   - 设置 `VITE_APP_VERSION=v1`（或任意标识）。
   - 提交并推送代码，等待 Cloudflare Pages 完成第一次构建。
   - 打开生产 URL，记住页面显示的版本号和构建时间。

2. **部署一个新版本**
   - 修改页面内容（例如改一段文案）或更新 `VITE_APP_VERSION=v2`。
   - 再次提交并推送，触发第二次构建部署。
   - 刷新生产 URL，确认你已经看到“新版本”的内容和构建时间。

3. **通过 Dashboard 回滚**
   - 在 Cloudflare Dashboard 中打开对应 Pages 项目。
   - 进入 **Deployments** / **部署历史** 页面。
   - 在列表中找到之前的某个生产部署，点击右侧菜单中的
     **“Rollback to this deployment”** / **“回滚到此部署”**。
   - 几秒钟后，刷新生产 URL，可以看到页面上的版本号和构建时间回到了旧值。

> 注意：Cloudflare Pages 目前的回滚操作主要通过 Dashboard 或 API 完成，
> Wrangler CLI 的回滚能力主要用于 **Workers**，不是 Pages。

### 使用 Wrangler 进行本地预览与部署（可选）

本仓库提供了 `wrangler.toml`，配置了：

```toml
pages_build_output_dir = "./dist"
```

你可以通过以下方式使用 Wrangler：

1. 本地构建并预览：

   ```bash
   pnpm build
   npx wrangler pages dev dist
   ```

2. 如果你已经在 Cloudflare 上创建了 Pages 项目，也可以使用：

   ```bash
   pnpm build
   npx wrangler pages deploy dist --project-name <你的-pages-项目名>
   ```

   这会触发一次新的 Pages 部署，和通过 Git 提交触发的效果一致。

