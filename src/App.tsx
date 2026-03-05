import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const appVersion = import.meta.env.VITE_APP_VERSION || "dev-local";

const Home: React.FC = () => (
  <>
    <section className="card highlight">
      <h2>当前部署信息</h2>
      <div className="info-grid">
        <div>
          <span className="label">应用版本</span>
          <span className="value">{appVersion}</span>
        </div>
        <div>
          <span className="label">构建时间</span>
          <span className="value">{__BUILD_TIME__}</span>
        </div>
        <div>
          <span className="label">渲染模式</span>
          <span className="value">CSR（Client Side Rendering）+ 前端路由</span>
        </div>
      </div>
      <p className="hint">
        每次在 Cloudflare Pages 上触发新的构建部署时，这里的版本号和构建时间都会变化。
        通过回滚到旧的部署，可以直观地看到信息恢复到旧版本。
      </p>
    </section>

    <section className="layout-grid">
      <section className="card">
        <h2>什么是 CSR？</h2>
        <p>
          CSR（Client Side Rendering）指的是页面的 HTML
          主要在浏览器中由 JavaScript 渲染。服务器只返回一个轻量的
          HTML 壳，后续路由和视图切换都由前端控制。
        </p>
        <ul>
          <li>初次加载会请求一份打包后的 JS 代码。</li>
          <li>页面路由切换不刷新整个页面，只在前端更新视图。</li>
          <li>非常适合部署在 Cloudflare Pages 这类静态托管平台上。</li>
        </ul>
      </section>

      <section className="card">
        <h2>如何使用这个 Demo？</h2>
        <p>上方导航中提供了三个核心页面：</p>
        <ul>
          <li>
            <strong>概览</strong>：当前部署信息与 CSR 简介（当前页面）。
          </li>
          <li>
            <strong>部署到 Cloudflare Pages</strong>：逐步部署说明和环境变量配置。
          </li>
          <li>
            <strong>演示回滚</strong>：如何基于部署历史做版本回滚。
          </li>
        </ul>
        <p className="hint">
          你可以直接访问 <code>/</code>、<code>/deploy</code>、
          <code>/rollback</code> 等路径来验证前端路由在 Cloudflare Pages 上的工作情况。
        </p>
      </section>
    </section>
  </>
);

const DeployGuide: React.FC = () => (
  <section className="card">
    <h2>部署到 Cloudflare Pages</h2>
    <ol>
      <li>将本仓库推送到 Git 仓库（GitHub / GitLab / Bitbucket）。</li>
      <li>在 Cloudflare Dashboard &gt; Pages 中创建项目，选择刚才的仓库。</li>
      <li>构建命令：<code>pnpm build</code></li>
      <li>构建输出目录：<code>dist</code></li>
      <li>完成后，Pages 会为生产环境分配一个 URL。</li>
    </ol>
    <p className="hint">
      推荐在 Cloudflare Pages 的环境变量中设置
      <code>VITE_APP_VERSION</code>，用于标记当前部署版本号（如
      <code>v1.0.0</code>、<code>rollback-test</code> 等）。
    </p>
  </section>
);

const RollbackGuide: React.FC = () => (
  <section className="card">
    <h2>如何演示回滚？</h2>
    <ol>
      <li>修改页面内容或更新 <code>VITE_APP_VERSION</code>，触发一次新的部署。</li>
      <li>在浏览器中访问生产 URL，确认已经看到新版本信息。</li>
      <li>
        打开 Cloudflare Pages 项目的 <strong>Deployments / 部署历史</strong>{" "}
        页面。
      </li>
      <li>
        找到之前的某一次生产部署，点击右侧菜单中的
        <strong>Rollback to this deployment / 回滚到此部署</strong>。
      </li>
      <li>刷新生产 URL，可以看到版本号和构建时间回到旧值。</li>
    </ol>
    <p className="hint">
      Cloudflare Pages 的回滚只需要几秒钟，不需要重新构建代码，非常适合快速恢复到稳定版本。
    </p>
  </section>
);

const NotFound: React.FC = () => (
  <section className="card">
    <h2>页面不存在</h2>
    <p>你访问的路径没有对应的路由。</p>
    <p className="hint">
      如果是在 Cloudflare Pages 上访问深链接（如 <code>/deploy</code>），
      能够正确加载到这个 SPA，就说明前端路由已经在纯静态环境中正常工作。
    </p>
  </section>
);

export const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Cloudflare CSR SPA Demo</h1>
        <p className="subtitle">
          基于 Vite 的单页应用，用于演示在 Cloudflare Pages 上的 CSR 部署、前端路由和回滚。
        </p>
        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            概览
          </NavLink>
          <NavLink
            to="/deploy"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            部署到 Pages
          </NavLink>
          <NavLink
            to="/rollback"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            演示回滚
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deploy" element={<DeployGuide />} />
          <Route path="/rollback" element={<RollbackGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>Cloudflare Pages · CSR Demo SPA with Router</span>
      </footer>
    </div>
  );
};

