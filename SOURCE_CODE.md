# 维修墙 · 完整源码阅读版

所有文件已经作为可运行文件交付，本文件按要求顺序提供逐文件完整代码块。运行请打开 index.html。

## index.html

```html
<!-- ===== 文件: index.html ===== -->
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0b0e13">
  <meta name="description" content="纯静态 F1 车队经营模拟：研发、转会、策略、实时比赛与多年生涯。支持离线与 GitHub Pages。">
  <title>维修墙 · F1 车队经理</title>
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./css/base.css">
  <link rel="stylesheet" href="./css/layout.css">
  <link rel="stylesheet" href="./css/race.css">
  <link rel="stylesheet" href="./css/visuals.css">
<link rel="stylesheet" href="./css/live.css">
  <script src="./js/boot.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <svg class="svg-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="i-grid" viewBox="0 0 24 24"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/></symbol>
    <symbol id="i-car" viewBox="0 0 24 24"><path d="m5 7 2-4h10l2 4 2 3v8H3v-8zm-2 3h18M6 14h2m8 0h2M6 18v3m12-3v3"/></symbol>
    <symbol id="i-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v7L4 20h16l-6-10V3M8 14h8"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m0-17a4 4 0 0 1 0 8m3 3a6 6 0 0 1 3 6"/></symbol>
    <symbol id="i-helmet" viewBox="0 0 24 24"><path d="M3 14a9 9 0 1 1 18 0v5H3Zm0 0h18M13 7l-2 7m-5 5v2h12v-2"/></symbol>
    <symbol id="i-wallet" viewBox="0 0 24 24"><path d="M3 6V3h16v3M3 6h18v15H3Zm12 5h6v6h-6Z"/><circle cx="17" cy="14" r=".6"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M3 5h18v16H3Zm4-3v6m10-6v6M3 10h18M7 14h3m4 0h3m-10 4h3"/></symbol>
    <symbol id="i-flag" viewBox="0 0 24 24"><path d="M4 22V3h15l-3 5 3 5H4m5-10v10m5-10v10M4 8h14"/></symbol>
    <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M7 3h10v7a5 5 0 0 1-10 0Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-5 0h10"/></symbol>
    <symbol id="i-save" viewBox="0 0 24 24"><path d="M3 3h15l3 3v15H3Zm4 0v7h10V3M7 21v-7h10v7"/></symbol>
  </svg>
  <div id="app"><main class="boot-message" id="main-content"><h1>维修墙 · F1 车队经理</h1><p>正在启动赛季控制中心…</p></main></div>
  <noscript><p class="notice">本游戏需要启用 JavaScript。所有数据与模拟都在本地运行。</p></noscript>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
  <dialog id="modal" aria-labelledby="modal-title"><header class="modal-heading"><h2 id="modal-title"></h2><button class="icon-btn" data-close aria-label="关闭对话框">×</button></header><div id="modal-body"></div></dialog>
</body>
</html>
```

## css/base.css

```css
/* ===== 文件: css/base.css ===== */
:root {
  --bg: #0b0e13;
  --surface: #12171f;
  --surface-2: #171e29;
  --surface-3: #202938;
  --line: #273141;
  --text: #edf2fa;
  --muted: #93a1b6;
  --accent: #68e8b5;
  --danger: #ff727f;
  --warning: #ffd166;
  --radius: 13px;
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.6 var(--font); font-variant-numeric: tabular-nums; }
button, input, select, textarea { font: inherit; }
button, a, input, select, textarea, summary { -webkit-tap-highlight-color: transparent; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; }
button:disabled { opacity: .42; cursor: not-allowed; }
button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
h1, h2, h3, p { margin: 0; }
h1 { font-size: clamp(25px, 2.5vw, 36px); font-weight: 750; line-height: 1.25; letter-spacing: -.8px; }
h2 { font-size: 16px; font-weight: 650; }
h3 { font-size: 15px; font-weight: 650; }
p + p { margin-top: 10px; }
small { display: block; color: var(--muted); font-size: 11px; }
strong { font-weight: 650; }
.muted { color: var(--muted); font-size: 12px; }
.eyebrow { font-size: 10px; color: var(--accent); font-weight: 700; letter-spacing: 2px; margin-bottom: 9px; }
.label { color: var(--muted); font-size: 12px; }
.btn { display: inline-flex; justify-content: center; align-items: center; gap: 8px; padding: 9px 15px; min-height: 38px; border: 1px solid #354052; background: #1b2330; color: var(--text); border-radius: 7px; font-size: 12px; font-weight: 600; line-height: 1.5; white-space: nowrap; transition: background .15s, border-color .15s, transform .15s; }
.btn:hover:not(:disabled) { background: #2b3647; border-color: #667488; }
.btn:active:not(:disabled) { transform: translateY(1px); }
.btn.primary { background: var(--accent); color: #07120e; border-color: var(--accent); }
.btn.primary:hover:not(:disabled) { filter: brightness(1.1); }
.btn.danger { color: var(--danger); border-color: #62323e; background: #2a1b24; }
.btn.small { padding: 6px 10px; min-height: 30px; font-size: 11px; }
.btn.selected { background: #283e3a; color: #8cf3c8; border-color: #68e8b5; }
.icon-btn { border: 0; background: transparent; color: var(--muted); font-size: 26px; width: 35px; height: 35px; }
.icon { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.badge { display: inline-flex; align-items: center; padding: 3px 8px; border: 1px solid #344053; border-radius: 5px; font-size: 10px; white-space: nowrap; color: #c0cce0; background: #1a2330; }
.badge.accent, .badge.success { color: #8cf3c8; background: #162c28; border-color: #275344; }
.badge.danger { color: #ff9aa3; background: #341e28; border-color: #68323d; }
.badge.subtle { color: #a4b0c1; background: transparent; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.split { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.full { grid-column: 1 / -1; }
.positive { color: #83e6b5; }
.negative { color: #ff9b9b; }
.large-number { display: block; font-size: 24px; margin: 12px 0; }
.progress-block { margin: 8px 0; }
.progress-label { display: flex; justify-content: space-between; gap: 10px; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
.progress { width: 100%; height: 5px; border-radius: 5px; background: #26303e; overflow: hidden; }
.progress i { height: 100%; display: block; background: var(--accent); border-radius: inherit; transition: width .3s ease; }
.field { display: flex; flex-direction: column; gap: 7px; margin: 0 0 14px; min-width: 0; }
.field > span, .field-label { color: #bac7d9; font-size: 12px; font-weight: 600; }
input, select, textarea { color: var(--text); background: #0d121a; border: 1px solid #354153; border-radius: 6px; padding: 9px 10px; min-width: 0; max-width: 100%; }
input::placeholder, textarea::placeholder { color: #67788d; }
input[type="color"] { height: 40px; padding: 4px; width: 100%; }
input[type="range"] { accent-color: var(--accent); padding: 0; flex: 1; min-width: 80px; }
input[type="checkbox"], input[type="radio"] { accent-color: var(--accent); }
textarea { width: 100%; resize: vertical; font-family: Consolas, ui-monospace, monospace; font-size: 11px; }
.check { display: flex; align-items: center; gap: 9px; color: #aab9ca; font-size: 12px; margin: 15px 0; }
.range-row { display: flex; gap: 13px; align-items: center; }
.range-row output { color: var(--accent); font-family: ui-monospace, monospace; width: 32px; }
.disabled-reason { font-size: 10px; max-width: 180px; margin: 3px 0; }
.empty { text-align: center; padding: 26px 15px; color: var(--muted); }
.empty .icon { width: 28px; height: 28px; margin-bottom: 10px; }
.notice { border: 1px solid #345447; background: #13251f; border-radius: 8px; padding: 14px; color: #b6d9cb; font-size: 12px; margin: 14px 0; }
details { border-top: 1px solid var(--line); padding-top: 12px; margin-top: 14px; }
summary { cursor: pointer; color: #c2d0e1; margin-bottom: 12px; }
canvas { display: block; width: 100%; height: 220px; }
.chart-note { color: var(--muted); font-size: 10px; text-align: center; }
.svg-sprite { position: absolute; width: 0; height: 0; overflow: hidden; }
.skip-link { position: fixed; top: -60px; left: 20px; z-index: 200; padding: 10px; background: var(--accent); color: #0b0e13; }
.skip-link:focus { top: 10px; }
.toast { position: fixed; right: 24px; bottom: 24px; z-index: 100; max-width: min(520px,90vw); background: #23392f; color: #eafff3; border: 1px solid #4a8c6b; padding: 12px 19px; border-radius: 9px; box-shadow: 0 8px 30px #0006; opacity: 0; transform: translateY(15px); pointer-events: none; transition: .2s; }
.toast.visible { opacity: 1; transform: translateY(0); }
.toast.error { background: #3b202b; border-color: #a64a60; }
.boot-message { padding: 10vh 10vw; }
.boot-message p { margin-top: 20px; color: var(--muted); }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; } }
```

## css/layout.css

```css
/* ===== 文件: css/layout.css ===== */
.app-shell { display: grid; grid-template-columns: 206px minmax(0,1fr); min-height: 100vh; }
.sidebar { position: fixed; inset: 0 auto 0 0; width: 206px; background: #0e131b; border-right: 1px solid var(--line); z-index: 20; padding: 25px 14px; display: flex; flex-direction: column; }
.wordmark { display: flex; align-items: center; gap: 6px; font-size: 20px; font-weight: 800; letter-spacing: -1px; white-space: nowrap; }
.wordmark > span:last-child { display: block; font-size: 10px; letter-spacing: 1px; color: var(--muted); font-weight: 500; margin-left: 4px; }
.brand-slashes { color: var(--accent); font-size: 20px; letter-spacing: -7px; margin-right: 9px; }
.sidebar .wordmark { padding: 3px 10px 28px; }
.nav-group-label { font-size: 9px; color: #58677d; letter-spacing: 2px; padding: 7px 14px; }
.sidebar nav { display: flex; flex-direction: column; gap: 5px; }
.nav-link { display: flex; align-items: center; gap: 12px; border-radius: 7px; padding: 11px 14px; font-size: 12px; color: #8b9aaf; border: 1px solid transparent; }
.nav-link:hover { color: #e4f0ff; background: #171e29; }
.nav-link.active { color: #a6f1d1; background: #1b302b; border-color: #2b4b3f; }
.nav-link.active::after { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--accent); margin-left: auto; }
.sidebar-footer { margin-top: auto; padding: 18px 10px 0; color: #5d6e84; font-size: 10px; }
.sidebar-footer strong { display: block; color: #8f9cb0; font-size: 11px; }
.workspace { grid-column: 2; min-width: 0; }
.topbar { height: 70px; padding: 10px 32px; display: flex; justify-content: space-between; gap: 18px; align-items: center; background: #10151ddd; backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 15; }
.team-badge { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 13px; }
.team-badge svg { width: 33px; height: 33px; }
.top-metrics { display: flex; align-items: center; gap: 24px; font-size: 12px; }
.top-metrics > div { display: flex; flex-direction: column; }
.top-metrics small { font-size: 9px; color: #6d7f96; }
.top-cap { width: 115px; }
.save-status { color: #91a992; font-size: 9px; white-space: nowrap; }
.main-content { padding: 30px 32px 45px; max-width: 1780px; margin: auto; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 26px; }
.page-heading .muted { margin-top: 9px; max-width: 860px; }
.panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 21px; margin-bottom: 20px; min-width: 0; }
.panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.panel-heading h2::before { content: ''; display: inline-block; width: 3px; height: 12px; background: var(--accent); border-radius: 3px; margin-right: 9px; }
.grid-2 { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px; }
.stats-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 15px; margin-bottom: 22px; }
.stat { background: var(--surface); padding: 19px; border: 1px solid var(--line); border-radius: 10px; position: relative; overflow: hidden; }
.stat > strong { display: block; font-size: 27px; line-height: 1.3; margin: 8px 0; font-weight: 650; letter-spacing: -.8px; }
.stat > small { font-size: 10px; }
.stat.danger > strong { color: var(--danger); }
.stats-grid.compact { gap: 12px; }
.stats-grid.compact strong { display: block; font-size: 14px; margin-top: 5px; }
.hero { min-height: 215px; border: 1px solid #2e4541; background: linear-gradient(110deg,#182b28,#101b22 58%,#111b24); border-radius: var(--radius); display: grid; grid-template-columns: 43% 57%; overflow: hidden; margin-bottom: 21px; }
.hero-copy { padding: 30px; z-index: 1; }
.hero-copy h2 { font-size: 31px; line-height: 1.3; letter-spacing: -1px; }
.hero-copy > p:not(.eyebrow) { color: #83a59c; font-size: 11px; margin-top: 8px; }
.hero-badges { display: flex; gap: 8px; margin-top: 22px; flex-wrap: wrap; }
.hero-visual { position: relative; display: flex; align-items: center; }
.telemetry-grid { position: absolute; inset: 0; opacity: .15; background: linear-gradient(#71968b33 1px,transparent 1px),linear-gradient(90deg,#71968b33 1px,transparent 1px); background-size: 26px 26px; transform: skewX(-18deg) scale(1.3); }
.car-art { width: 100%; display: block; position: relative; filter: drop-shadow(0 10px 15px #0007); }
.visual-label { position: absolute; bottom: 15px; right: 25px; color: #608176; font-size: 9px; letter-spacing: 2px; }
.next-race { display: flex; gap: 19px; align-items: center; margin-bottom: 18px; }
.round-mark { font-size: 50px; line-height: 1; font-weight: 800; color: #365146; border-right: 1px solid #34443e; padding-right: 20px; }
.next-race h3 { font-size: 22px; margin-bottom: 5px; }
.next-race + p { margin-bottom: 17px; }
.objective { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.todo { padding: 0 0 0 18px; color: #a5b2c5; font-size: 12px; margin: 0; }
.todo li { margin: 10px 0; }
.todo li::marker { color: var(--accent); }
.driver-mini { display: grid; grid-template-columns: 44px 1fr auto; gap: 10px; align-items: center; border-top: 1px solid var(--line); padding: 15px 0 5px; }
.driver-mini:first-child { padding-top: 0; border-top: 0; }
.driver-mini > strong { font-size: 22px; color: var(--accent); }
.driver-number { font-weight: 800; font-style: italic; color: #637086; font-size: 31px; line-height: 1; }
.news-item { display: flex; align-items: baseline; gap: 14px; padding: 11px 0; border-bottom: 1px solid #202938; font-size: 12px; }
.news-item:last-child { border-bottom: 0; }
.news-item time { color: #74869f; font-size: 10px; white-space: nowrap; }
.news-dot { width: 6px; height: 6px; flex: 0 0 6px; background: var(--accent); border-radius: 50%; }
.news-dot.warning { background: var(--warning); }
.news-dot.danger { background: var(--danger); }
.attribute-row { display: grid; grid-template-columns: 90px 1fr 38px; gap: 15px; align-items: center; font-size: 12px; margin: 9px 0; }
.attribute-row > span { color: #a5b2c5; }
.attribute-row strong { text-align: right; }
.table-scroll { overflow-x: auto; max-width: 100%; }
table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; white-space: nowrap; }
th { color: #7689a2; font-size: 10px; font-weight: 500; position: sticky; top: 0; background: var(--surface); z-index: 1; }
th, td { border-bottom: 1px solid #26303d; padding: 12px 9px; }
td:first-child, th:first-child { padding-left: 0; }
td:last-child, th:last-child { padding-right: 0; }
tr:last-child td { border-bottom: 0; }
tbody tr:hover { background: #ffffff03; }
td small { font-size: 10px; margin-top: 3px; }
.sort { color: inherit; background: none; border: 0; padding: 0; font: inherit; }
.sort span { color: #4f5c71; padding-left: 4px; }
.team-line { display: inline-block; width: 3px; height: 12px; background: var(--row-color); margin-right: 8px; border-radius: 3px; }
.wear-cell { display: flex; align-items: center; gap: 8px; min-width: 125px; }
.wear-cell .progress-block { width: 70px; }
.form-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 0 16px; }
.form-grid > .btn { justify-self: start; margin-bottom: 15px; }
.project-library { border-top: 1px solid var(--line); padding-top: 10px; }
.project-row { display: grid; grid-template-columns: 1fr 75px 45px 40px; gap: 8px; padding: 12px 0; border-bottom: 1px solid #232c3b; font-size: 11px; }
.project-card { border-bottom: 1px solid var(--line); padding: 16px 0; }
.project-card:first-child { padding-top: 0; }
.project-card > p { margin: 8px 0; font-size: 12px; }
.project-card .actions { margin-top: 12px; }
.facility-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
.facility { border: 1px solid #2c3645; border-radius: 9px; padding: 18px; background: #111821; }
.facility > p { margin: 12px 0; font-size: 12px; }
.filter-row { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
.filter-row input { flex: 1; }
.driver-card { border: 1px solid var(--line); background: var(--surface); border-radius: var(--radius); padding: 24px; margin-bottom: 20px; }
.driver-top { display: flex; align-items: center; gap: 15px; margin-bottom: 23px; }
.driver-top .rating { margin-left: auto; color: var(--accent); font-size: 30px; font-weight: 700; }
.driver-attributes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 25px; margin-bottom: 22px; }
.driver-attributes > div { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); border-bottom: 1px solid #222d3a; padding-bottom: 5px; }
.driver-attributes strong { color: #d1dfed; }
.driver-card .actions { margin-top: 17px; }
.inline-form { display: flex; gap: 10px; align-items: end; margin-top: 15px; }
.inline-form .field { flex: 1; margin: 0; }
.setup-form { border: 1px solid #293746; border-radius: 8px; padding: 18px; }
.setup-form h3 { margin-bottom: 19px; }
.session-strip { display: flex; gap: 6px; flex-wrap: wrap; margin: 20px 0; }
.session-strip span { padding: 6px 12px; border: 1px solid #303e50; border-radius: 5px; color: #77889f; font-size: 11px; }
.session-strip .done { color: #a2d7bb; border-color: #324b40; }
.session-strip .current { color: #a9f0cf; background: #1c392e; border-color: #4c886c; }
dialog { background: #151c27; color: var(--text); border: 1px solid #41516a; border-radius: 13px; padding: 24px; width: min(760px,92vw); max-height: 88vh; box-shadow: 0 25px 100px #000b; }
dialog::backdrop { background: #04070bcc; backdrop-filter: blur(3px); }
.modal-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.dialog-copy { color: #bdcbdc; margin-bottom: 22px; }
.game-over { margin-bottom: 20px; border: 1px solid #8e455b; padding: 20px; border-radius: 10px; background: #2a1922; }
.wizard-shell { display: grid; grid-template-columns: 35% 65%; min-height: 100vh; }
.wizard-cover { padding: 40px 35px; background: radial-gradient(ellipse at 0 60%,#204139 0,transparent 75%),#0e181d; border-right: 1px solid #2b3f3c; position: fixed; width: 35%; inset: 0 auto 0 0; display: flex; flex-direction: column; overflow: hidden; }
.wizard-cover::before { content: ''; position: absolute; inset: 0; background: linear-gradient(30deg,transparent 49.8%,#6cd7bb0b 50%,transparent 50.2%); background-size: 50px 100px; pointer-events: none; }
.cover-title { position: relative; z-index: 1; margin-top: 18vh; }
.cover-title h1 { font-size: clamp(29px,3.4vw,52px); line-height: 1.3; letter-spacing: -2px; }
.cover-title > p:last-child { font-size: 12px; color: #86a59c; margin-top: 22px; line-height: 2; }
.cover-car { width: 150%; margin: 20px -30%; transform: rotate(-19deg); }
.cover-bottom { display: flex; justify-content: space-between; font-size: 9px; color: #678c7e; margin-top: auto; letter-spacing: 1px; z-index: 1; }
.cover-number { position: absolute; bottom: 40px; left: -20px; font-size: 170px; line-height: 1; letter-spacing: -15px; font-weight: 800; color: #99f1d005; pointer-events: none; }
.wizard-main { grid-column: 2; padding: 35px 40px; max-width: 1050px; width: 100%; }
.wizard-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.wizard-top h2 { font-size: 24px; }
.wizard-section { border-top: 1px solid #263341; padding: 23px 0 25px; }
.step-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.step-heading > span { font-size: 11px; border: 1px solid #446354; color: #8cd2b3; width: 25px; height: 25px; text-align: center; line-height: 23px; border-radius: 50%; }
.step-heading > small { margin-left: auto; font-size: 10px; }
.mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }
.mode-card { display: grid; grid-template-columns: 18px 1fr; gap: 5px 8px; border: 1px solid #303f50; background: #121b25; border-radius: 8px; padding: 16px; cursor: pointer; }
.mode-card.active { border-color: #65ae8c; background: #172a24; }
.mode-card input { margin: 5px 0; }
.mode-card span { grid-column: 2; color: #8295ab; font-size: 10px; }
.mode-card strong { font-size: 12px; }
.team-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.team-option { text-align: left; background: #121923; color: var(--text); border: 1px solid #2a3748; border-radius: 7px; display: flex; align-items: center; gap: 10px; padding: 12px; min-width: 0; }
.team-option.active { background: #1d2c2b; border-color: var(--team); }
.team-option svg { width: 31px; height: 31px; flex-shrink: 0; }
.team-option strong { display: block; font-size: 12px; }
.team-option small { font-size: 9px; margin-top: 3px; }
.team-rating { margin-left: auto; color: #8295ab; font-size: 12px; }
.selected-team { margin-top: 13px; padding: 15px; background: #101c22; border-left: 2px solid #597b6b; }
.selected-team > strong { font-size: 12px; }
.selected-team p, .selected-team > span { font-size: 10px; color: #92a5b6; }
.start-career { width: 100%; justify-content: space-between; margin-top: 18px; font-size: 14px; padding: 13px 19px; }
.logo-picker { display: grid; grid-template-columns: repeat(8,1fr); gap: 7px; margin: 12px 0 20px; }
.logo-option { position: relative; background: #152029; border: 1px solid #344154; border-radius: 6px; padding: 6px; cursor: pointer; }
.logo-option:has(input:checked) { border-color: var(--accent); background: #253d32; }
.logo-option input { position: absolute; top: 1px; left: 1px; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
.logo-option:focus-within { outline: 2px solid var(--accent); }
.logo-option svg { width: 100%; display: block; }
@media (min-width: 1650px) { .hero { min-height: 250px; } }
@media (max-width: 1150px) { .sidebar { width: 72px; padding: 20px 9px; } .app-shell { grid-template-columns: 72px minmax(0,1fr); } .nav-link { justify-content: center; padding: 13px 9px; } .nav-link > span, .nav-link.active::after, .sidebar .wordmark > span:last-child, .sidebar .wordmark .brand-slashes, .sidebar .wordmark .brand-name, .sidebar-footer, .nav-group-label { display: none; } .sidebar .wordmark { padding: 0 0 25px; font-size: 0; justify-content: center; } .sidebar .wordmark::before { content: 'F1'; font-size: 20px; color: var(--accent); } .main-content { padding: 25px; } .topbar { padding: 10px 25px; } .top-metrics { gap: 18px; } .facility-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .hero-copy { padding: 25px; } .hero-copy h2 { font-size: 27px; } }
@media (max-width: 850px) { .grid-2 { grid-template-columns: minmax(0,1fr); gap: 0; } .stats-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .top-metrics .top-next, .top-metrics .top-cap { display: none; } .hero { grid-template-columns: 1fr 1fr; } .hero-copy { padding: 23px; } .hero-copy h2 { font-size: 25px; } .wizard-cover { width: 27%; padding: 30px 20px; } .wizard-shell { grid-template-columns: 27% 73%; } .cover-title h1 { font-size: 28px; } .cover-title > p:last-child { font-size: 11px; } .wizard-main { padding: 30px 24px; } .cover-bottom { flex-direction: column; gap: 10px; } .wizard-cover .wordmark > span:last-child { display: none; } }
@media (max-width: 600px) { .main-content { padding: 18px 14px; } .topbar { padding: 8px 14px; height: 64px; } .team-badge { font-size: 11px; gap: 6px; } .top-metrics > div:first-child, .top-metrics .top-money { display: none; } .page-heading { display: block; } .page-heading .actions { margin-top: 15px; } .hero { grid-template-columns: 1fr; } .hero-visual { display: none; } .stat { padding: 13px; } .stat > strong { font-size: 22px; } .facility-grid, .form-grid { grid-template-columns: 1fr; } .news-item { gap: 8px; } .news-item time { display: none; } .panel { padding: 15px; } .wizard-cover { display: none; } .wizard-shell { display: block; } .wizard-main { padding: 25px 18px; } .team-option { padding: 9px; gap: 7px; } .team-option svg { width: 25px; } .team-option small { white-space: normal; } .step-heading > small { display: none; } .logo-picker { grid-template-columns: repeat(6,1fr); } .driver-card { padding: 18px; } .filter-row { flex-wrap: wrap; } }
.test-overrun { margin: -5px 0 20px; }
```

## css/live.css

```css
/* ===== 文件: css/live.css ===== */
/* Broadcast timing wall */
.live-toolbar{display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:16px 18px;background:#131c28;border:1px solid #2a384a;border-radius:10px;margin-bottom:18px}
.session-clock small{display:block;color:var(--muted);font-size:10px;letter-spacing:.4px}.session-clock strong{display:block;font:700 28px/1.25 ui-monospace,monospace;letter-spacing:-1px}.live-lap{padding-left:16px;border-left:1px solid var(--line);display:flex;flex-direction:column;min-width:65px}.live-lap strong{font-size:18px}.live-lap small{font-size:9px;color:var(--muted)}.live-toolbar .speed-controls{margin-left:auto}.live-toolbar>.actions{flex-basis:100%;border-top:1px solid var(--line);padding-top:10px;gap:8px}.live-toolbar .btn{padding:7px 10px}
.broadcast-grid{display:grid;grid-template-columns:minmax(278px,.85fr) minmax(360px,1.4fr) minmax(230px,.75fr);gap:14px;align-items:start;margin-bottom:18px}.broadcast-grid .panel{padding:14px;margin:0}.live-tower .panel-heading{margin-bottom:12px}.live-tower .panel-heading h2{font-size:13px}.live-tower .muted{font-size:9px}.broadcast-timing{width:100%;font-size:10px;font-variant-numeric:tabular-nums}.broadcast-timing td,.broadcast-timing th{padding:8px 4px;white-space:nowrap}.broadcast-timing th{color:#8597af;font-size:9px}.broadcast-timing td:first-child{width:18px;color:#a7b7cc}.broadcast-timing tr.focused-row{background:#26394b60;box-shadow:inset 2px 0 0 var(--accent)}.driver-code{font:800 12px ui-monospace,monospace;letter-spacing:.2px;border:0;border-left:3px solid var(--team);background:transparent;color:#eff4fa;padding:0 0 0 5px;cursor:pointer}.tower-gap{font:10px ui-monospace,monospace}.broadcast-timing .tyre{width:21px;height:21px;font-size:9px;border-width:2px}.phase-label{font-size:9px}.tiny-sector-strip{display:flex;gap:2px;margin:4px 0 0 8px}.tiny-sector-strip i{height:3px;width:8px;border-radius:1px;background:currentColor}.tone-neutral{color:#65748a}.live-tower .timing-legend{padding-top:12px;gap:9px;font-size:9px}
.track-panel{background:radial-gradient(ellipse at 50% 45%,#1a2b3c55,transparent 65%),#101925!important;overflow:hidden}.map-heading{display:flex;justify-content:space-between;gap:10px;align-items:center}.map-heading .eyebrow{font-size:8px;margin-bottom:4px}.map-heading h2{font-size:20px}.map-heading>span{font:8px ui-monospace,monospace;color:#7388a0}.track-panel svg#track-map{width:100%;height:auto;display:block;overflow:visible;aspect-ratio:800/740}.circuit-shadow{fill:none;stroke:#263a4d;stroke-width:20;stroke-linejoin:round;stroke-linecap:round}.circuit-line{fill:none;stroke:#7d8b9a;stroke-width:8;stroke-linejoin:round;stroke-linecap:round}.pit-lane{fill:none;stroke:#667c98;stroke-width:4;stroke-dasharray:5 5}.map-small{font:13px ui-monospace,monospace;fill:#8194ac;paint-order:stroke;stroke:#101925;stroke-width:4}.sector-label{font:700 16px ui-monospace,monospace;fill:#a6bcd4;paint-order:stroke;stroke:#101925;stroke-width:5}.driver-dot{paint-order:stroke;filter:drop-shadow(0 1px 3px #000a)}.dot-halo{fill:none;stroke:#fff;stroke-width:2;opacity:0}.selected-dot .dot-halo{opacity:.8}.dot-label-bg{fill:#101925;opacity:.94;stroke:#34465a}.dot-label{font:800 17px ui-monospace,monospace;letter-spacing:.5px}.slow-dot .driver-dot{stroke-dasharray:3 2}.track-panel a{cursor:pointer}.track-panel a:focus .dot-halo{opacity:1;stroke:var(--accent)}.map-caption{display:flex;justify-content:space-between;font-size:8px;gap:8px;color:#758ba5;padding:0 2px 12px;border-bottom:1px solid var(--line)}
.map-telemetry{margin-top:15px}.telemetry-title{display:flex;gap:10px;align-items:center}.telemetry-title>strong{font:800 24px ui-monospace,monospace;color:var(--team);border-left:3px solid var(--team);padding-left:8px}.telemetry-title>div{flex:1}.telemetry-title b{display:block;font-size:11px}.telemetry-title small{display:block;font-size:9px;color:var(--muted);margin-top:3px}.live-numbers{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.live-numbers small{display:block;font-size:9px;color:var(--muted);margin-bottom:5px}.live-numbers b{font:700 24px ui-monospace,monospace;color:#e4edf7}.live-numbers em{font:10px system-ui;color:var(--muted)}.sector-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.sector-box{border:1px solid #2b384a;border-top:3px solid currentColor;background:#0d1520;border-radius:4px;padding:9px 7px}.sector-box>small{display:flex;justify-content:space-between;font-size:10px}.sector-box>small span{font-size:7px;color:#a1b2c8}.sector-box>b{font:700 17px ui-monospace,monospace;display:block;margin:8px 0}.sector-box>span{font-size:8px;color:#7c91aa}.sector-box>span strong{font-weight:500;color:#c2d2e5}.telemetry-foot{display:flex;justify-content:space-between;gap:7px;margin-top:13px;font-size:8px;color:#73869f}.telemetry-foot b{color:#c0cede;margin-left:3px}
.live-commands>h2{font-size:13px;margin:5px 0 13px;display:flex;align-items:center;gap:8px}.live-command{background:#141e2b;border:1px solid #2d3d51;border-radius:8px;padding:13px;margin-bottom:14px}.live-command h3{font-size:10px}.driver-chip{font:800 15px ui-monospace,monospace;color:var(--accent);display:block;margin-bottom:4px}.live-command .badge{font-size:8px;padding:4px 6px}.car-health{display:flex;gap:12px;font-size:9px;color:var(--muted);margin:13px 0 9px}.car-health span{display:flex;align-items:center;gap:4px}.car-health .icon{width:12px;height:12px}.car-health b{color:#d8e6f4}.live-command .field{margin:10px 0;font-size:10px}.live-command .field>span{font-size:9px}.live-command select{font-size:10px;padding:7px;min-width:0;width:100%}.live-command .tyre-field{margin-top:12px}.live-command .tyre-cards{gap:3px}.live-command .tyre-choice{padding:5px 2px;min-width:0}.live-command .tyre-choice small{font-size:8px}.live-command .tyre-choice .tyre{width:24px;height:24px;font-size:10px}.live-command .inline-form{display:grid;grid-template-columns:1fr auto;gap:6px}.live-command .btn{font-size:9px;padding:7px 8px;white-space:normal}.qual-commands{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:9px}.qual-commands .btn{padding:8px 4px;line-height:1.4}.command-intent{font-size:9px;color:#9bb3ce;min-height:1.5em;margin:10px 0}.live-command .tyre-inventory{gap:4px}.live-command .tyre-stock{padding:5px 3px;gap:3px}.live-command .tyre-stock .tyre{width:17px;height:17px;font-size:8px;border-width:2px}.live-command .tyre-stock b{font-size:9px}.live-command input:disabled+.tyre-choice{opacity:.35}
@media(min-width:1600px){.broadcast-timing{font-size:11px}.broadcast-timing td{padding:9px 6px}.live-command h3{font-size:12px}.live-command .btn{font-size:10px}.live-numbers b{font-size:30px}}
@media(max-width:1200px){.broadcast-grid{grid-template-columns:minmax(265px,.8fr) minmax(350px,1.2fr)}.live-commands{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:14px}.live-commands>h2{grid-column:1/-1;margin-bottom:0}.live-command .driver-chip{display:inline;margin-right:6px}.live-command .tyre-cards{max-width:340px}.live-toolbar .speed-controls{margin-left:0}.live-numbers b{font-size:27px}}
@media(max-width:760px){.broadcast-grid{display:flex;flex-direction:column}.broadcast-grid>section,.broadcast-grid>aside{width:100%}.track-panel{order:-1}.live-tower{max-height:500px;overflow:auto}.live-commands{display:block}.live-command .tyre-cards{max-width:none}.track-panel svg#track-map{max-height:390px}.live-toolbar{gap:12px}.live-toolbar>.actions{gap:6px}.session-clock strong{font-size:25px}.live-numbers b{font-size:24px}.map-heading>span{font-size:7px}.sector-box>b{font-size:17px}}
.page-heading:has(.live-indicator){margin-bottom:16px}.page-heading:has(.live-indicator) h1{font-size:28px}.page-heading:has(.live-indicator) .muted{font-size:10px;margin-top:7px}.live-toolbar{gap:13px;padding:12px 16px}.live-toolbar>.actions{padding-top:8px}.live-toolbar .btn{padding:6px 9px}

.hide-label .dot-label,.hide-label .dot-label-bg{display:none}.map-label-toggle{font-size:8px;padding:3px 5px;margin-left:5px}.map-caption>span{display:flex;align-items:center;gap:3px}

/* Readable timing wall: explicit column widths and uncompressed driver names. */
:root{--live-mono:Consolas,"Liberation Mono",Menlo,monospace}
.broadcast-grid{grid-template-columns:minmax(320px,.82fr) minmax(390px,1.38fr) minmax(245px,.8fr)}
.broadcast-timing{table-layout:fixed;font-size:14px;width:100%;min-width:0}
.broadcast-timing td,.broadcast-timing th{padding:10px 8px;overflow:visible;line-height:1.35;vertical-align:middle}
.broadcast-timing th{font-size:11px}.broadcast-timing td:first-child{width:auto}
.broadcast-timing td:last-child,.broadcast-timing th:last-child{text-align:center;padding-right:4px}
.driver-code{display:inline-block;min-width:0;width:auto;flex-shrink:0;font-family:var(--live-mono);font-size:21px;line-height:1.25;font-weight:800;font-stretch:normal;letter-spacing:1px;white-space:nowrap;padding:3px 0 3px 6px;text-align:left;word-spacing:normal}
.tower-gap{display:inline-block;font-family:var(--live-mono);font-size:16px;font-weight:650;line-height:1.4;letter-spacing:0;white-space:nowrap}
.broadcast-timing .tyre{width:29px;height:29px;font-size:13px;border-width:2px}
.broadcast-timing tbody tr{cursor:pointer;min-height:46px}.broadcast-timing tbody tr:hover{background:#2c41576b}
.broadcast-timing .phase-label{font-size:10px;line-height:1.5;margin:3px 0 0 12px}
.qualifying-timing .driver-code{font-size:17px;min-width:0;padding-left:7px}
.qualifying-timing .tower-gap{font-size:11px}.qualifying-timing .lap-value{font-family:var(--live-mono);font-size:12px;gap:3px}
.qualifying-timing .lap-value .icon{display:none}.qualifying-timing td{padding:10px 5px}
.qualifying-timing .tyre{width:25px;height:25px;font-size:11px}
.gap-controls{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.gap-controls .btn{min-height:29px;font-size:10px;padding:4px 7px;letter-spacing:.25px}
.live-tower .panel-heading{align-items:center;gap:7px;flex-wrap:wrap}.live-tower .panel-heading h2{font-size:15px}.tower-note{font-size:11px;line-height:1.6;color:var(--muted);margin-top:12px;white-space:normal}
.live-toolbar{gap:15px}.session-clock strong{font-size:34px;letter-spacing:0;font-family:var(--live-mono)}.session-clock small,.live-lap small{font-size:11px}.live-lap strong{font-size:24px}.live-toolbar .btn{font-size:12px}
.live-weather{padding:4px 16px;border-left:1px solid #34465e;min-width:210px}.weather-current{display:flex;align-items:center;gap:8px}.weather-current .icon{color:#79baff;width:22px;height:22px}.weather-current strong{font-size:17px;line-height:1.4}.weather-facts{display:flex;gap:15px;flex-wrap:wrap;margin-top:5px;color:#9aabc1;font-size:11px}.weather-facts b{color:#e6edf9;font-size:13px}
#tower-race-control{margin:-14px -14px 15px}.tower-control{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:12px 12px 0 0;background:#18352d;color:#9af4c7;border-bottom:1px solid #356a53}.tower-control strong{display:block;font-family:var(--live-mono);font-size:17px;letter-spacing:.6px;line-height:1.35}.tower-control span:not(.control-symbol){display:block;font-size:12px;margin-top:3px;white-space:normal}.control-symbol{display:flex;align-items:center;flex:0 0 auto}.control-symbol .icon{width:25px;height:25px}.control-SC,.control-VSC,.control-YELLOW{background:repeating-linear-gradient(135deg,#f8d94e,#f8d94e 18px,#edd04c 18px,#edd04c 36px);color:#201d0d;border-color:#ffe983}.control-RED{background:#9e2438;color:#fff;border-color:#f77587}.control-CHEQUERED{background:#dae3ed;color:#111f2f;border-color:#fff}
.dot-label{font-family:var(--live-mono);font-size:24px;font-weight:800;letter-spacing:1px;font-kerning:none;font-stretch:normal;pointer-events:none}.dot-label-bg{fill:#0b1420;stroke:#637b94;opacity:.98}.dot-connector{stroke-width:1.5;opacity:.6;pointer-events:none}.hide-label .dot-label-wrap,.hide-label .dot-connector{display:none}.dot-hit{pointer-events:all}.dot-label-wrap{cursor:pointer}
.telemetry-title>strong{font-size:30px;letter-spacing:1px;min-width:3.5em;font-family:var(--live-mono)}.telemetry-title b{font-size:15px;line-height:1.5;overflow-wrap:anywhere}.telemetry-title small{font-size:12px;line-height:1.5}.telemetry-title>div{min-width:0}.live-numbers b{font-family:var(--live-mono);font-size:clamp(24px,2.3vw,34px);letter-spacing:-.6px;white-space:nowrap}.live-numbers small{font-size:12px}.live-numbers em{font-size:12px}.sector-box>b{font-family:var(--live-mono);font-size:clamp(15px,1.4vw,21px);letter-spacing:-.3px;white-space:nowrap}.sector-box>small{font-size:12px;flex-wrap:wrap;gap:3px}.sector-box>small span{font-size:9px}.sector-box>span{font-size:10px;line-height:1.6;display:block;white-space:normal}.telemetry-foot{font-size:11px;flex-wrap:wrap;line-height:1.8}
.live-commands>h2{font-size:15px}.live-command h3{font-size:12px;line-height:1.5;overflow-wrap:anywhere}.driver-chip{font-size:19px;font-family:var(--live-mono);letter-spacing:1px}.live-command .badge{font-size:10px}.live-command .split{align-items:flex-start;flex-wrap:wrap}.car-health{font-size:11px;flex-wrap:wrap}.car-health b{font-size:14px}.live-command .field>span{font-size:11px}.live-command select,.live-command .btn{font-size:11px;line-height:1.5}.command-intent{font-size:11px;line-height:1.65}.live-command .tyre-choice{padding:0}.map-caption{font-size:10px;line-height:1.7;flex-wrap:wrap}.map-label-toggle{font-size:10px;padding:4px 6px}
.live-race-details{margin-top:22px}.live-race-details .panel-heading{flex-wrap:wrap}.race-detail-table{min-width:1200px;font-family:var(--live-mono);font-size:14px;table-layout:auto}.race-detail-table th{font-family:var(--font);font-size:12px}.race-detail-table td{padding:13px 12px}.detail-driver{display:flex;align-items:center;gap:12px;border:0;border-left:3px solid var(--team);background:transparent;color:#e9f2fc;padding:4px 8px;text-align:left}.detail-driver b{font-family:var(--live-mono);font-size:18px;letter-spacing:1px;min-width:3ch}.detail-driver>span{font-family:var(--font);font-size:12px}.race-detail-table .lap-value{font-size:14px}.detail-sectors{display:flex;gap:15px;font-size:12px}.detail-sectors small{font-size:10px;line-height:1.5}.race-detail-table .focused-row{background:#26394b60}.pit-history-heading{display:flex;align-items:center;gap:9px;font-size:17px;margin-top:26px;margin-bottom:12px}.pit-history-table{font-size:14px;min-width:610px}.pit-history-table th{font-size:12px}.pit-history-table td{font-family:var(--live-mono);font-size:15px}.pit-history-table small{font-family:var(--font);font-size:11px}.pit-tyre-change{display:flex;align-items:center;gap:10px}.empty-pit-log{padding:20px;color:var(--muted);font-size:13px}.fastest-summary strong{font-size:29px}.top-metrics strong{font-size:14px}.stat>strong{font-size:30px}
@media(max-width:1360px){.broadcast-grid{grid-template-columns:minmax(320px,.85fr) minmax(360px,1.15fr)}.live-commands{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:14px}.live-commands>h2{grid-column:1/-1}.live-command .tyre-cards{max-width:380px}}
@media(max-width:900px){.broadcast-grid{grid-template-columns:minmax(300px,.8fr) minmax(330px,1.2fr)}.live-weather{padding:4px 10px;min-width:190px}.live-numbers{gap:10px}.live-numbers b{font-size:24px}.live-numbers em{font-size:10px}.sector-box{padding:8px 5px}.sector-box>b{font-size:15px}}
@media(max-width:760px){.broadcast-grid{display:flex;flex-direction:column}.live-tower{max-height:none;overflow:visible}.track-panel{order:0}.live-commands{display:block}.broadcast-grid>section,.broadcast-grid>aside{width:100%}.session-clock strong{font-size:30px}.live-weather{border-left:0;padding:0;min-width:180px}.live-numbers b{font-size:clamp(23px,6.5vw,31px)}.sector-box>b{font-size:clamp(15px,4vw,20px)}.live-toolbar .speed-controls{flex-wrap:wrap}.track-panel svg#track-map{max-height:none}.telemetry-title b{font-size:14px}.live-command .tyre-cards{max-width:none}.live-race-details{padding:15px}.gap-controls .btn{font-size:11px}}

/* Rank and abbreviation share the first column; each keeps its own space. */
.tower-driver{display:flex;align-items:center;gap:6px;white-space:nowrap}
.tower-position{flex:0 0 1.7em;text-align:right;color:#a7b7cc;font:600 14px/1.4 var(--live-mono);font-variant-numeric:tabular-nums}
.qualifying-timing .tower-driver{gap:4px}.qualifying-timing .tower-position{font-size:12px}

.broadcast-timing td{padding-left:5px;padding-right:5px}

/* Own team and inspected driver remain distinct, including on the same row. */
.broadcast-timing tr.player-row,.race-detail-table tr.player-row{background:#26463785}
.broadcast-timing tr.player-row:hover,.race-detail-table tr.player-row:hover{background:#315a479e}
.broadcast-timing tr.focused-row,.race-detail-table tr.focused-row{box-shadow:inset -3px 0 0 #e8f2ff}
.broadcast-timing tr.player-row.focused-row,.race-detail-table tr.player-row.focused-row{background:#315a47aa}
```

## css/race.css

```css
/* ===== 文件: css/race.css ===== */
.race-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; border: 1px solid #334251; border-radius: 10px; background: #131c26; padding: 15px 20px; margin-bottom: 22px; }
.lap-count { font-size: 29px; font-weight: 750; white-space: nowrap; }
.lap-count small { display: inline; font-size: 12px; font-weight: 400; }
.flag-state { font-size: 12px; font-weight: 750; background: #214d35; border: 1px solid #42795a; color: #aff2c1; padding: 6px 10px; border-radius: 4px; }
.speed-controls { display: flex; gap: 4px; margin-right: auto; }
.speed-controls .btn { min-height: 32px; padding: 5px 11px; }
.live-indicator { display: inline-flex; align-items: center; gap: 8px; color: #8bd3ad; font-size: 11px; }
.live-indicator::before { content: ''; width: 6px; height: 6px; background: #7de7a9; border-radius: 50%; box-shadow: 0 0 12px #7de7a966; }
.race-layout { display: grid; grid-template-columns: minmax(0,1fr) 285px; gap: 20px; }
.tower { padding: 18px; }
.timing-table { font-size: 11px; }
.timing-table th { padding-top: 10px; padding-bottom: 14px; font-size: 9px; }
.timing-table td { padding: 10px 7px; }
.timing-table td:first-child { font-weight: 750; width: 35px; text-align: center; }
.timing-table td[data-cell="last"] { font-family: Consolas, ui-monospace, monospace; color: #abbbcf; }
.timing-table .player-row { background: #26463738; }
.timing-table .player-row td:first-child { color: #8ce5b9; }
.timing-table td small { margin-left: 11px; font-size: 9px; }
.command-column { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
.command-card { background: #151e28; border: 1px solid #33463f; border-top: 2px solid var(--accent); border-radius: 10px; padding: 17px; }
.command-card h3 { font-size: 14px; }
.command-card .eyebrow { font-size: 9px; margin-bottom: 3px; }
.command-card .field { margin-bottom: 10px; }
.command-card .field > span { font-size: 10px; }
.command-card select { font-size: 11px; padding: 7px 8px; }
.telemetry-cells { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px 0; }
.telemetry-cells small { font-size: 9px; margin-bottom: 4px; }
.telemetry-cells strong { font-size: 13px; font-family: Consolas, ui-monospace, monospace; }
.pit-form { display: flex; gap: 7px; margin: 13px 0 10px; }
.pit-form select { flex: 1; }
.pit-form .btn { font-size: 10px; padding: 7px 10px; }
.radio-advice { border-left: 2px solid #4c735e; padding-left: 9px; color: #9fbfaf; font-size: 10px; margin: 12px 0; }
.tyre { display: inline-flex; width: 25px; height: 25px; align-items: center; justify-content: center; border: 2px solid #a8b4c6; border-radius: 50%; color: #dce4ee; background: #0b1017; font-size: 12px; font-weight: 800; }
.tyre-S { border-color: #ff5364; color: #ff7e8c; }
.tyre-M { border-color: #ffd166; color: #ffd166; }
.tyre-H { border-color: #e5eaf1; color: #e5eaf1; }
.tyre-I { border-color: #50d6a1; color: #50d6a1; }
.tyre-W { border-color: #67a9ff; color: #67a9ff; }
.race-events { max-height: 250px; overflow: auto; padding-right: 8px; }
.race-events p { font-size: 11px; padding: 9px 0; border-bottom: 1px solid #273343; margin: 0; color: #bac9db; }
.race-events b { font-size: 10px; color: #6fcba4; margin-right: 8px; }
.weather-overview { display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 15px; }
.weather-overview span { color: #91a5bb; font-size: 10px; }
.weather-radar { display: flex; gap: 6px; align-items: end; background: linear-gradient(180deg,#14212c,#14222a); border: 1px solid #2d4759; padding: 15px 10px 8px; border-radius: 7px; min-height: 120px; margin-bottom: 14px; }
.weather-radar > div { flex: 1; text-align: center; display: flex; flex-direction: column; align-items: stretch; justify-content: end; height: 95px; }
.weather-radar i { background: linear-gradient(0deg,#315768,#6fc4d7); border-radius: 3px 3px 0 0; min-height: 4px; opacity: .85; }
.weather-radar small { font-size: 8px; margin-top: 8px; }
@media (max-width: 1250px) { .race-layout { grid-template-columns: 1fr; } .command-column { display: grid; grid-template-columns: 1fr 1fr; } .race-toolbar { gap: 10px; } .race-toolbar .actions { width: 100%; } }
@media (max-width: 600px) { .command-column { grid-template-columns: 1fr; } .race-toolbar { padding: 12px; } .speed-controls .btn { padding: 4px 7px; } }
```

## css/visuals.css

```css
/* ===== 文件: css/visuals.css ===== */
/* 数据显示：语义色独立于车队强调色，图标、文字与形状同时表达状态。 */
:root {
  --success: #78e3b0;
  --warning: #ffd166;
  --danger: #ff8794;
  --info: #82bcff;
  --cyan: #6edbe7;
  --fastest: #d4a1ff;
}
.tone-success { --tone: var(--success); color: var(--success); }
.tone-warning { --tone: var(--warning); color: var(--warning); }
.tone-danger { --tone: var(--danger); color: var(--danger); }
.tone-info { --tone: var(--info); color: var(--info); }
.tone-cyan, .tone-pit { --tone: var(--cyan); color: var(--cyan); }
.tone-fastest { --tone: var(--fastest); color: var(--fastest); }
.tone-neutral { --tone: #a6b5c9; color: #a6b5c9; }
.tone-accent { --tone: var(--accent); }
.icon { flex-shrink: 0; vertical-align: middle; }
.badge { gap: 5px; font-weight: 600; }
.badge .icon { width: 13px; height: 13px; }
.badge.warning { color: #ffdc83; background: #332b16; border-color: #706035; }
.badge.info { color: #9bcaff; background: #162a43; border-color: #365a84; }
.badge.fastest { color: #e1baff; background: #302040; border-color: #755098; }
.badge.pit { color: #92ecf6; background: #142e35; border-color: #32606c; }
.badge.danger { color: #ff9da9; background: #351d28; border-color: #75384a; }
.btn .icon { width: 15px; height: 15px; }
.panel-heading h2 { display: flex; align-items: center; gap: 9px; }
.panel-heading h2::before { display: none; }
.section-icon { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 7px; background: #1c2836; border: 1px solid #334359; }
.section-icon .icon { width: 16px; height: 16px; }
.stat-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.stat-symbol { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: #202c3b; border: 1px solid #344257; }
.stat-symbol .icon { width: 17px; height: 17px; }
.stat { border-top-color: #3a4c63; }
.stat.danger { border-top-color: #c55c70; }
.stat > strong { margin-top: 5px; }
.progress-block .progress i { background: var(--tone, var(--accent)); }
.progress-block .progress-label strong { color: var(--tone, var(--accent)); }
.wear-meter { display: inline-flex; gap: 7px; align-items: center; min-width: 110px; }
.wear-meter .progress-block { width: 49px; flex-shrink: 0; margin: 0; }
.wear-meter > strong { font-size: 11px; font-weight: 650; }
.wear-meter > .icon { width: 12px; height: 12px; }
.metric { display: inline-flex; gap: 5px; align-items: center; font-variant-numeric: tabular-nums; }
.metric .icon { width: 13px; height: 13px; }
.attribute-row > span { display: flex; gap: 6px; align-items: center; }
.attribute-row > span .icon { width: 14px; height: 14px; }
.attribute-row { grid-template-columns: 110px minmax(0,1fr) 38px; }
[data-compound="S"], .tyre-S { --compound: #ff687a; --compound-bg: #371b28; --compound-line: #8f3d4d; }
[data-compound="M"], .tyre-M { --compound: #ffda71; --compound-bg: #332b18; --compound-line: #82703b; }
[data-compound="H"], .tyre-H { --compound: #f1f5fb; --compound-bg: #282f39; --compound-line: #7b8797; }
[data-compound="I"], .tyre-I { --compound: #6ee0a5; --compound-bg: #173329; --compound-line: #3c805f; }
[data-compound="W"], .tyre-W { --compound: #78b9ff; --compound-bg: #182c46; --compound-line: #3e6f9f; }
.tyre { position: relative; flex-shrink: 0; width: 27px; height: 27px; font-size: 12px; color: var(--compound, #dce4ee); border-color: var(--compound, #a8b4c6); border-width: 2px; box-shadow: inset 0 0 0 2px #080d14; line-height: 1; }
.tyre::after { content: ''; position: absolute; inset: 3px; border: 1px solid currentColor; opacity: .2; border-radius: 50%; pointer-events: none; }
.compound-tag { display: inline-flex; align-items: center; gap: 7px; color: var(--compound); background: var(--compound-bg); border: 1px solid var(--compound-line); border-radius: 7px; padding: 5px 8px; font-size: 11px; }
.tyre-legend { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 12px 0 17px; }
.tyre-legend .tyre { width: 22px; height: 22px; font-size: 10px; }
.tyre-field { min-width: 0; margin: 0 0 15px; padding: 0; border: 0; }
.tyre-field > legend { display: block; color: #c0cde0; font-size: 12px; font-weight: 600; margin-bottom: 8px; padding: 0; }
.tyre-options { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 6px; }
.tyre-choice { position: relative; cursor: pointer; min-width: 0; }
.tyre-choice > input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; z-index: 1; }
.tyre-choice-body { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px; border: 1px solid #39495e; border-radius: 8px; background: #101721; padding: 10px 3px; color: #a8b6c9; min-height: 78px; transition: background .15s,border-color .15s; }
.tyre-choice-body > span:not(.tyre) { font-size: 10px; white-space: nowrap; }
.tyre-choice-body > .icon { position: absolute; top: 4px; right: 4px; width: 11px; height: 11px; color: var(--compound); opacity: 0; }
.tyre-choice:hover .tyre-choice-body { border-color: var(--compound-line); }
.tyre-choice input:checked + .tyre-choice-body { color: var(--compound); border-color: var(--compound); background: var(--compound-bg); box-shadow: inset 0 0 0 1px var(--compound-line); }
.tyre-choice input:checked + .tyre-choice-body > .icon { opacity: 1; }
.tyre-choice input:focus-visible + .tyre-choice-body { outline: 2px solid var(--compound); outline-offset: 3px; }
.tyre-choice input:disabled + .tyre-choice-body { opacity: .4; cursor: not-allowed; }
.tyre-field:has(.tyre-choice:nth-child(2):last-child) .tyre-options { grid-template-columns: repeat(2,minmax(0,1fr)); }
.tyre-field.compact .tyre-choice-body { min-height: 65px; padding: 8px 2px; gap: 5px; }
.tyre-field.compact .tyre { width: 23px; height: 23px; font-size: 10px; }
.tyre-field.compact legend { font-size: 10px; }
.tyre-field.compact .tyre-choice-body > span:not(.tyre) { font-size: 9px; }
.tyre-inventory { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 6px; margin: 12px 0; }
.tyre-stock { display: flex; align-items: center; justify-content: center; gap: 7px; background: var(--compound-bg); border: 1px solid var(--compound-line); border-radius: 7px; padding: 8px 5px; color: var(--compound); }
.tyre-stock strong { display: block; line-height: 1.2; font-size: 15px; }
.tyre-stock small { font-size: 9px; color: inherit; opacity: .85; margin-top: 3px; }
.tyre-stock.depleted { opacity: .45; border-style: dashed; }
.command-card .tyre-inventory { gap: 4px; }
.command-card .tyre-stock { flex-direction: column; gap: 4px; padding: 7px 2px; text-align: center; }
.command-card .tyre-stock .tyre { width: 22px; height: 22px; font-size: 10px; }
.command-card .tyre-stock strong { font-size: 12px; }
.command-card .tyre-stock small { font-size: 8px; }
.command-card .pit-form { display: block; margin: 15px 0 8px; }
.command-card .pit-form > .btn { width: 100%; }
.command-card .telemetry-cells small { display: flex; gap: 4px; align-items: center; }
.command-card .telemetry-cells small .icon { width: 12px; height: 12px; }
.command-card .field > span { display: flex; align-items: center; gap: 5px; }
.command-card .field > span .icon { width: 12px; height: 12px; }
.lap-value { display: inline-flex; align-items: center; gap: 5px; font-family: Consolas, ui-monospace, monospace; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; }
.lap-value .icon { width: 13px; height: 13px; }
.lap-value.tone-fastest { background: #ad62e91a; border-radius: 4px; padding: 3px 5px; }
.lap-value small { color: inherit; font-family: var(--font); font-size: 9px; }
.fastest-summary { display: flex; gap: 12px; align-items: center; background: linear-gradient(105deg,#382147,#211b30); border: 1px solid #775093; border-radius: 9px; padding: 13px 17px; margin-bottom: 16px; color: #e0b9ff; }
.fastest-summary > .icon { width: 26px; height: 26px; }
.fastest-summary small { font-size: 10px; letter-spacing: 1px; color: #c796e8; }
.fastest-summary strong { display: block; font: 700 20px Consolas,ui-monospace,monospace; color: #efdbff; margin-top: 3px; }
.fastest-summary > span { font-size: 13px; margin-left: auto; color: #d8c5e8; }
.timing-legend { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 10px 0 17px; font-size: 10px; }
.timing-legend > span { display: inline-flex; gap: 5px; align-items: center; }
.timing-legend .icon { width: 12px; height: 12px; }
.flag-state { display: inline-flex; gap: 7px; align-items: center; white-space: nowrap; }
.flag-state .icon { width: 16px; height: 16px; }
.flag-GREEN { color: #a6f0bb; background: #1c432d; border-color: #4a8a62; }
.flag-SC, .flag-VSC { color: #ffe38f; background: repeating-linear-gradient(135deg,#3b321d,#3b321d 7px,#302a1b 7px,#302a1b 14px); border-color: #9b803e; }
.flag-RED { color: #ffb1bc; background: #4d1f30; border-color: #b4516b; }
.rank-badge { display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 3px 6px; min-width: 31px; color: #b6c5d8; background: #202a37; border: 1px solid #344155; border-radius: 5px; font-size: 10px; font-weight: 700; }
.rank-badge .icon { width: 12px; height: 12px; }
.rank-1 { color: #ffe094; background: #42351b; border-color: #8c7137; }
.rank-2 { color: #e3edf9; background: #2b3645; border-color: #6a7d97; }
.rank-3 { color: #efb692; background: #3c2c24; border-color: #89654d; }
.tyre-age { display: inline-flex; align-items: center; gap: 7px; }
.tyre-age > span:last-child { font-size: 10px; color: #a3b5ca; }
.pit-count { display: inline-flex; align-items: center; gap: 5px; color: #b3cbdc; }
.pit-count .icon { width: 13px; height: 13px; color: #6edbe7; }
.points-value { font-size: 15px; font-weight: 750; }
.timing-table { min-width: 835px; }
.timing-table td { padding-top: 12px; padding-bottom: 12px; }
.timing-table td[data-cell="last"], .timing-table td[data-cell="best"] { color: inherit; }
.timing-table .badge { font-size: 9px; }
.timing-table .badge .tyre { width: 18px; height: 18px; font-size: 9px; }
.timing-table .player-row { background: #213b363d; }
.timing-table .player-row td:first-child { border-left: 2px solid var(--accent); }
.timing-table .retired-row { background: #3b1d2422; }
.timing-table .retired-row td:nth-child(2) { opacity: .6; }
.retired-car { border-top-color: var(--danger); }
.weather-overview strong, .weather-overview > span { display: inline-flex; align-items: center; gap: 6px; }
.weather-overview strong { color: #90cfff; }
.weather-overview .icon { width: 15px; height: 15px; }
.event-item { display: flex; align-items: flex-start; gap: 10px; padding: 11px 0; border-bottom: 1px solid #2b3544; }
.event-item:last-child { border-bottom: 0; }
.event-symbol { width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center; background: #213041; border: 1px solid #3d4d63; border-radius: 6px; flex-shrink: 0; color: var(--tone); }
.event-symbol .icon { width: 14px; height: 14px; }
.event-meta { display: flex; gap: 9px; align-items: center; font-size: 9px; margin-bottom: 3px; color: var(--tone); }
.event-meta b { border: 1px solid #455368; padding: 0 5px; border-radius: 3px; }
.event-item p, .race-events .event-item p { padding: 0; margin: 0; border: 0; color: #ccd7e6; font-size: 11px; line-height: 1.7; }
.race-events { max-height: 350px; }
.finance-legend { display: flex; gap: 18px; margin-bottom: 8px; font-size: 11px; }
.finance-legend > span { display: inline-flex; gap: 5px; align-items: center; }
.finance-legend .icon { width: 13px; height: 13px; }
.data-icon-label { display: inline-flex; gap: 6px; align-items: center; }
.data-icon-label .icon { width: 14px; height: 14px; }
.news-item .news-symbol { flex-shrink: 0; }
.news-symbol .icon { width: 15px; height: 15px; }
@media (max-width: 850px) {
  .tyre-stock { gap: 5px; }
  .fastest-summary > span { font-size: 11px; }
}
@media (max-width: 600px) {
  .tyre-stock { flex-direction: column; text-align: center; }
  .tyre-stock strong { font-size: 13px; }
  .tyre-stock small { font-size: 8px; }
  .tyre-options { gap: 4px; }
  .tyre-choice-body { min-height: 72px; }
  .attribute-row { grid-template-columns: 105px minmax(0,1fr) 34px; gap: 8px; }
  .fastest-summary { gap: 8px; padding: 11px; }
  .fastest-summary strong { font-size: 17px; }
}

/* Own-team emphasis travels with each row when tables are sorted. */
table tbody tr.player-row{background:#26463785}
table tbody tr.player-row:hover{background:#315a479e}
table tbody tr.player-row>td:first-child{box-shadow:inset 3px 0 0 var(--accent)}
table tbody tr.player-row>td{border-bottom-color:#47735b80}
```

## js/data/drivers-data.js

```js
// ===== 文件: js/data/drivers-data.js =====
// 所有能力、薪资、潜力均为非官方游戏化平衡值；年龄按赛季年减出生年。
export const ATTRS = {
  pace:'总体速度',qualifying:'单圈速度',racePace:'正赛节奏',racecraft:'超车',defending:'防守',tyres:'轮胎管理',wet:'湿地能力',starts:'起步',consistency:'稳定性',feedback:'研发反馈',fitness:'体能',aggression:'攻击性',experience:'经验',potential:'潜力'
};
const rows = [ ['verstappen','Max Verstappen',1,'荷兰',1997,95,98,94,18], ['perez','Sergio Pérez',11,'墨西哥',1990,86,88,87,9], ['leclerc','Charles Leclerc',16,'摩纳哥',1997,92,97,94,13], ['sainz','Carlos Sainz',55,'西班牙',1994,89,91,91,10], ['hamilton','Lewis Hamilton',44,'英国',1985,93,94,94,20], ['russell','George Russell',63,'英国',1998,90,94,94,11], ['norris','Lando Norris',4,'英国',1999,91,94,96,12], ['ricciardo','Daniel Ricciardo',3,'澳大利亚',1989,83,86,86,7], ['alonso','Fernando Alonso',14,'西班牙',1981,91,91,92,14], ['ocon','Esteban Ocon',31,'法国',1996,84,86,88,6], ['gasly','Pierre Gasly',10,'法国',1996,85,88,89,7], ['tsunoda','Yuki Tsunoda',22,'日本',2000,81,86,88,3], ['vettel','Sebastian Vettel',5,'德国',1987,86,87,87,12], ['stroll','Lance Stroll',18,'加拿大',1998,78,79,81,4], ['albon','Alexander Albon',23,'泰国',1996,84,89,89,5], ['latifi','Nicholas Latifi',6,'加拿大',1995,69,72,73,1.5], ['bottas','Valtteri Bottas',77,'芬兰',1989,85,90,87,8], ['zhou','Zhou Guanyu',24,'中国',1999,76,79,83,2], ['magnussen','Kevin Magnussen',20,'丹麦',1992,81,85,83,4], ['schumacher','Mick Schumacher',47,'德国',1999,74,77,84,2], ['piastri','Oscar Piastri',81,'澳大利亚',2001,85,89,97,6], ['devries','Nyck de Vries',21,'荷兰',1995,72,75,80,1.5], ['sargeant','Logan Sargeant',2,'美国',2000,71,74,80,1], ['hulkenberg','Nico Hülkenberg',27,'德国',1987,84,90,86,6], ['lawson','Liam Lawson',30,'新西兰',2002,77,81,89,2], ['antonelli','Kimi Antonelli',12,'意大利',2006,78,83,97,3], ['doohan','Jack Doohan',7,'澳大利亚',2003,73,77,87,1.5], ['hadjar','Isack Hadjar',6,'法国',2004,77,82,93,2], ['bearman','Oliver Bearman',87,'英国',2005,77,82,94,2], ['bortoleto','Gabriel Bortoleto',5,'巴西',2004,76,80,94,2], ['colapinto','Franco Colapinto',43,'阿根廷',2003,76,80,89,2], ['drugovich','Felipe Drugovich',34,'巴西',2000,75,78,87,1.5], ['pourchaire','Théo Pourchaire',98,'法国',2003,74,78,90,1.3], ['iwasa','Ayumu Iwasa',40,'日本',2001,73,77,88,1.2], ['vandoorne','Stoffel Vandoorne',42,'比利时',1992,77,80,81,2], ['fittipaldi','Pietro Fittipaldi',51,'巴西',1996,69,72,77,1] ];
export const DRIVER_DATA = Object.fromEntries(rows.map(([id,name,number,nationality,birth,pace,qualifying,potential,salary],i)=>[id,{
  id,name,number,nationality,birth,salary,attributes:{
    pace,qualifying,racePace:pace+(i%3)-1,racecraft:Math.min(98,pace+2),defending:pace,tyres:Math.min(97,pace+3),wet:Math.max(60,pace+(i%5)-2),starts:pace-1,consistency:Math.min(98,pace+2),feedback:Math.min(97,pace+2),fitness:88-i%8,aggression:72+i%23,experience:Math.min(99,Math.max(10,(2025-birth-17)*4)),potential
  }
}]));
// 赛季初相对实力调整，避免把成熟期能力倒灌进新秀赛季。
export const YEAR_ADJUSTMENTS = {
  2022:{
    piastri:-9,norris:-3,tsunoda:-5,albon:-2,hamilton:1
  },2023:{
    piastri:-5,norris:-1,alonso:1,tsunoda:-2,devries:0
  },2024:{
    piastri:2,norris:2,ricciardo:-2,perez:-3
  },2025:{
    piastri:7,norris:3,hamilton:-3,perez:-3,tsunoda:2,albon:2,gasly:1
  }
};
export const RESERVES = {
  2022:['hulkenberg','piastri','vandoorne','fittipaldi'],2023:['ricciardo','lawson','drugovich','schumacher','pourchaire'],2024:['lawson','bearman','doohan','colapinto','drugovich','pourchaire'],2025:['perez','bottas','zhou','ricciardo','drugovich','colapinto','iwasa']
};
```

## js/data/i18n.js

```js
// ===== 文件: js/data/i18n.js =====
export const NAV = [['dashboard','总览','grid'],['car','车辆','car'],['rnd','研发','flask'],['staff','人员','users'],['drivers','车手','helmet'],['finance','财务','wallet'],['calendar','赛历','calendar'],['race','比赛指挥','flag'],['standings','积分档案','trophy'],['save','存档','save']];
export const SESSION_NAMES = {
  FP1:'第一节练习',FP2:'第二节练习',FP3:'第三节练习',Q:'正赛排位',SQ:'冲刺排位',SPRINT:'冲刺赛',RACE:'正赛',DONE:'周末结束'
};
export const DIFFICULTIES = {
  easy:{
    name:'简单',ai:0.82,mistake:0.8,tolerance:1.5,cap:1.06
  },standard:{
    name:'标准',ai:1,mistake:1,tolerance:1,cap:1
  },hard:{
    name:'硬核',ai:1.2,mistake:1.2,tolerance:0.75,cap:0.98
  }
};
```

## js/data/logos.js

```js
// ===== 文件: js/data/logos.js =====
const shapes = [ '<circle cx="32" cy="32" r="25"/><path d="M20 42 32 18 44 42Z" fill="var(--secondary)"/>', '<path d="M10 9H54V35L32 57 10 35Z"/><path d="m21 33 11-17 11 17-11 13Z" fill="var(--secondary)"/>', '<path d="m32 4 28 28-28 28L4 32Z"/><circle cx="32" cy="32" r="11" fill="var(--secondary)"/>', '<path d="m32 3 9 18 20 3-15 15 4 21-18-10-18 10 4-21L3 24l20-3Z"/>', '<path d="M4 23h24L45 9l15 23-15 23-17-14H4l16-9Z"/>', '<path d="M3 15 27 26V13h10v13L61 15 47 40 32 54 17 40Z"/>', '<path d="M10 11h44v42H10Z"/><path d="m17 43 15-26 15 26H35l-3-7-4 7Z" fill="var(--secondary)"/>', '<path d="m32 4 25 14v28L32 60 7 46V18Z"/><path d="m19 24 13 19 13-19Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="27"/><path d="M15 27h34v10H15Z" fill="var(--secondary)"/>', '<path d="M7 6h24L18 31h24L27 58H4l13-23H7Z M37 6h21L45 29H25Z"/>', '<path d="M32 4 60 54H4Z"/><path d="m32 22 10 22H22Z" fill="var(--secondary)"/>', '<path d="M7 13h50L47 50H17Z"/><path d="M18 23h28l-5 17H23Z" fill="var(--secondary)"/>', '<path d="M7 32 26 8h12l19 24-19 24H26Z"/><path d="M27 18h10v28H27Z" fill="var(--secondary)"/>', '<path d="M10 7h44v10H20v10h27v10H20v20H10Z"/>', '<path d="M5 16h54L48 29H34v27H20V29H5Z"/>', '<path d="m32 3 8 20 21 9-21 8-8 21-8-21-21-8 21-9Z"/>', '<path d="M7 7h18v50H7Zm32 0h18v50H39Z"/><path d="M25 25h14v14H25Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="25"/><path d="M19 18h26L29 46H17l12-18H19Z" fill="var(--secondary)"/>', '<path d="M4 45 19 15h13L20 45ZM29 45l15-30h16L45 45Z"/>', '<path d="M8 6h48L32 58Z"/><path d="m21 17 11 24 11-24Z" fill="var(--secondary)"/>', '<path d="m32 4 24 24-24 32L8 28Z"/><path d="m19 28 13-12 13 12Z" fill="var(--secondary)"/>', '<path d="M5 12h20v40H5Zm29 0h25L47 32l12 20H34L22 32Z"/>', '<path d="M8 8h48v48H8Z"/><circle cx="32" cy="32" r="16" fill="var(--secondary)"/><circle cx="32" cy="32" r="8"/>', '<path d="M6 28 27 7v17h31v13H27v20L6 36Z"/>' ];
export const LOGOS = shapes;
export function logo(index=0,color='#67e8c0',secondary='#0b0e13') {
  const valid=/^#[0-9a-f]{6}$/i;
  return `<svg viewBox="0 0 64 64" role="img" aria-label="几何队徽" style="fill:${valid.test(color)?color:'#67e8c0'};--secondary:${valid.test(secondary)?secondary:'#0b0e13'}">${shapes[Math.abs(Number(index)||0)%shapes.length]}</svg>`;
}
```

## js/data/parts.js

```js
// ===== 文件: js/data/parts.js =====
export const DIMENSIONS = {
  downforce:'下压力',aero:'气动效率',grip:'机械抓地',suspension:'路肩适应',brakes:'制动',power:'动力功率',ers:'能量部署',reliability:'可靠性',tyres:'轮胎友好',weight:'轻量化'
};
export const PARTS = [ ['front','前翼','aero','downforce',1.8,8,99],['rear','尾翼','aero','aero',1.8,8,99],['floor','底板','aero','downforce',3.8,14,99],['sidepod','侧箱','aero','aero',2.8,11,99],['suspension','悬挂','chassis','grip',2.1,10,99],['gearbox','变速箱','chassis','suspension',1.6,9,4],['ice','内燃机','power','power',4.8,18,3],['turbo','涡轮','power','power',3.1,14,3],['mguk','MGU-K','power','ers',2.8,14,3],['mguh','MGU-H','power','ers',2.6,14,3],['battery','电池','power','ers',2.2,12,2],['electronics','电子系统','power','ers',1.7,9,2],['brakes','制动系统','chassis','brakes',1.5,8,99],['cooling','散热','reliability','reliability',1.4,7,99] ].map(([id,name,department,dimension,cost,days,quota])=>({
  id,name,department,dimension,cost,days,quota
}));
export function partQuota(part,year) {
  return ['ice','turbo','mguk','mguh'].includes(part.id)&&year>=2023?4:part.quota;
}
export const DEPARTMENTS = {
  aero:'空气动力部',chassis:'底盘机械部',power:'动力单元部',reliability:'可靠性部',strategy:'策略赛道工程部',manufacturing:'制造生产部'
};
export const FACILITIES = {
  wind:{
    name:'风洞',effect:'提高空气动力研发效率',cost:8,days:35
  },cfd:{
    name:'CFD 集群',effect:'提高 CFD 研发效率',cost:7,days:28
  },sim:{
    name:'模拟器',effect:'提高设定数据采集与车手训练效率',cost:5,days:24
  },factory:{
    name:'制造车间',effect:'增加同时生产能力并缩短工期',cost:6,days:30
  },marketing:{
    name:'市场营销部',effect:'提高赞助报价与车手吸引力',cost:4,days:21
  }
};
export const COMPOUNDS = {
  S:{
    name:'软胎',life:19,pace:-0.65,deg:0.085,min:85,max:105,color:'#ff5364'
  },M:{
    name:'中性胎',life:29,pace:0,deg:0.05,min:80,max:105,color:'#ffd166'
  },H:{
    name:'硬胎',life:40,pace:0.4,deg:0.035,min:80,max:110,color:'#e5eaf1'
  },I:{
    name:'半雨胎',life:33,pace:1,deg:0.04,min:55,max:85,color:'#50d6a1'
  },W:{
    name:'全雨胎',life:29,pace:2,deg:0.05,min:45,max:70,color:'#67a9ff'
  }
};
export const MODES = {
  push:{
    name:'推进到底',pace:-0.38,wear:1.35,fuel:1.1,risk:1.8
  },normal:{
    name:'正常',pace:0,wear:1,fuel:1,risk:1
  },tyres:{
    name:'节省轮胎',pace:0.32,wear:0.73,fuel:0.98,risk:0.7
  },fuel:{
    name:'节省燃油',pace:0.4,wear:0.94,fuel:0.84,risk:0.85
  },attack:{
    name:'攻击',pace:-0.15,wear:1.15,fuel:1.05,risk:1.35
  },defend:{
    name:'防守',pace:0.12,wear:1.1,fuel:1.03,risk:1.2
  },yield:{
    name:'让车',pace:0.65,wear:0.88,fuel:0.94,risk:0.6
  },safe:{
    name:'保守完赛',pace:0.75,wear:0.7,fuel:0.9,risk:0.4
  }
};
export const ENGINES = {
  high:{
    name:'高功率',pace:-0.2,wear:1.55,fuel:1.06
  },normal:{
    name:'常规',pace:0,wear:1,fuel:1
  },save:{
    name:'保寿命',pace:0.28,wear:0.7,fuel:0.94
  }
};
```

## js/data/sponsors.js

```js
// ===== 文件: js/data/sponsors.js =====
// 赞助商均为虚构品牌；金额单位：百万美元。
export const SPONSORS = [ {
  id:'apex',name:'APEX 科技',kind:'主赞助',min:75,base:15,goal:'podium',bonus:2
}, {
  id:'orbit',name:'ORBIT 云计算',kind:'主赞助',min:55,base:11,goal:'points',bonus:0.7
}, {
  id:'nova',name:'NOVA 能源',kind:'主赞助',min:0,base:8,goal:'finish',bonus:0.15
}, {
  id:'vector',name:'VECTOR 工程',kind:'技术伙伴',min:0,base:3,goal:'q3',bonus:0.5
}, {
  id:'pulse',name:'PULSE 通讯',kind:'技术伙伴',min:55,base:4,goal:'points',bonus:0.5
}, {
  id:'zenith',name:'ZENITH 精密',kind:'技术伙伴',min:70,base:5,goal:'win',bonus:3
}, {
  id:'arc',name:'ARC 出行',kind:'技术伙伴',min:0,base:2.5,goal:'finish',bonus:0.12
} ];
export const SPONSOR_GOALS = {
  podium:'正赛登上领奖台',points:'正赛获得积分',finish:'正赛至少一车完赛',q3:'进入 Q3',win:'赢得正赛'
};
```

## js/data/staff-data.js

```js
// ===== 文件: js/data/staff-data.js =====
export const ROLES = {
  principal:'车队领队',technical:'技术总监',aero:'空气动力主管',performance:'性能主管',reliability:'可靠性主管',engineer:'比赛工程师',analyst:'性能工程师',strategy:'策略主管',mechanics:'维修区机械师',sporting:'运动总监',academy:'青训主管',marketing:'市场赞助主管'
};
export const TRAITS = {
  pit:{
    name:'进站大师',description:'停站时间减少 0.15 秒'
  },aggressive:{
    name:'激进研发',description:'研发速度 +10%，失败风险 +5%'
  },tyre:{
    name:'轮胎低语者',description:'轮胎磨损 -5%'
  },money:{
    name:'摇钱树',description:'赞助收入 +8%'
  },calm:{
    name:'沉稳',description:'车手失误概率 -10%'
  },mentor:{
    name:'育成专家',description:'青训成长 +20%'
  },precise:{
    name:'数据专家',description:'练习采集误差 -15%'
  }
};
// 虚构员工，避免对真实工程师合同与能力作伪精确推断。
const names=['林远','Elias Weber','Sofia Rossi','陈翊','Amelia Clarke','Hugo Martin','Marco Bellini','Anna Fischer','Lucas Moreau','松田 凛','James Reed','Eva Laurent','Noah Silva','周宁','Luca Bianchi','Mia Evans','Daniel König','Oliver Walsh','Elena Costa','Leo Park','高桥 悠','Isabel Santos','Max Keller','许知行'];
export const STAFF_POOL = names.map((name,i)=>({
  id:'market-'+i,name,role:Object.keys(ROLES)[i%12],ability:65+(i*7)%31,trait:Object.keys(TRAITS)[i%7],salary:0.45+(i*7%31)*0.045,loyalty:55+i%30,morale:75,years:2
}));
```

## js/data/teams.js

```js
// ===== 文件: js/data/teams.js =====
// 基础史实字段与游戏数值分开：performance、cash、设施等级均非官方。
export const SUPPLIERS = {
  Mercedes:{
    name:'Mercedes',power:88,reliability:94,price:13
  },Ferrari:{
    name:'Ferrari',power:91,reliability:89,price:14
  },RBPT:{
    name:'Red Bull Powertrains',power:90,reliability:90,price:12
  },HondaRBPT:{
    name:'Honda RBPT',power:92,reliability:93,price:13
  },Renault:{
    name:'Renault',power:82,reliability:86,price:10
  }
};
const identities = {
  redbull:['Red Bull','Oracle Red Bull Racing','RBR','#3671c6','Milton Keynes, 英国','factory'], ferrari:['Ferrari','Scuderia Ferrari','FER','#ef3340','Maranello, 意大利','factory'], mercedes:['Mercedes','Mercedes-AMG PETRONAS F1 Team','MER','#27f4d2','Brackley, 英国','factory'], mclaren:['McLaren','McLaren F1 Team','MCL','#ff8700','Woking, 英国','customer'], alpine:['Alpine','BWT Alpine F1 Team','ALP','#ff87bc','Enstone, 英国 / Viry, 法国','factory'], aston:['Aston Martin','Aston Martin Aramco F1 Team','AMR','#229971','Silverstone, 英国','customer'], williams:['Williams','Williams Racing','WIL','#64c4ff','Grove, 英国','customer'], junior:['AlphaTauri','Scuderia AlphaTauri','ATY','#7695b1','Faenza, 意大利','customer'], sauber:['Alfa Romeo','Alfa Romeo F1 Team ORLEN','ALF','#c92d4b','Hinwil, 瑞士','customer'], haas:['Haas','Haas F1 Team','HAS','#b6babd','Kannapolis, 美国 / Banbury, 英国','customer']
};
export const LINEUPS = {
  2022:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','ricciardo'],alpine:['alonso','ocon'],junior:['gasly','tsunoda'],aston:['vettel','stroll'],williams:['albon','latifi'],sauber:['bottas','zhou'],haas:['magnussen','schumacher']
  }, 2023:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],alpine:['gasly','ocon'],junior:['tsunoda','devries'],aston:['alonso','stroll'],williams:['albon','sargeant'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2024:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],aston:['alonso','stroll'],alpine:['gasly','ocon'],williams:['albon','sargeant'],junior:['tsunoda','ricciardo'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2025:{
    mclaren:['norris','piastri'],ferrari:['leclerc','hamilton'],redbull:['verstappen','lawson'],mercedes:['russell','antonelli'],aston:['alonso','stroll'],alpine:['gasly','doohan'],williams:['albon','sainz'],junior:['hadjar','tsunoda'],haas:['ocon','bearman'],sauber:['hulkenberg','bortoleto']
  }
};
export const ALTERNATIVE_LINEUPS = {
  2022:[], 2023:[{
    label:'2023 新加坡：Lawson 代替伤停的 Ricciardo',changes:{
      junior:['tsunoda','lawson']
    }
  }], 2024:[{
    label:'2024 美国站：Colapinto / Lawson',changes:{
      williams:['albon','colapinto'],junior:['tsunoda','lawson']
    }
  }], 2025:[{
    label:'2025 日本站：Tsunoda / Lawson 互换',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson']
    }
  },{
    label:'2025 伊莫拉站：另含 Colapinto 接替 Doohan',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson'],alpine:['gasly','colapinto']
    }
  }]
};
export const PERFORMANCE = {
  2022:{
    redbull:94,ferrari:92,mercedes:87,mclaren:79,alpine:80,aston:72,junior:73,sauber:75,haas:72,williams:64
  },2023:{
    redbull:97,ferrari:87,mercedes:87,mclaren:83,aston:85,alpine:78,williams:71,junior:68,sauber:69,haas:68
  },2024:{
    redbull:95,ferrari:91,mclaren:91,mercedes:87,aston:78,alpine:68,williams:69,junior:75,sauber:65,haas:72
  },2025:{
    mclaren:96,ferrari:90,redbull:91,mercedes:90,williams:79,aston:72,alpine:70,junior:75,haas:74,sauber:68
  }
};
export const PREVIOUS_RANKS = {
  2022:['mercedes','redbull','ferrari','mclaren','alpine','junior','aston','williams','sauber','haas'],2023:['redbull','ferrari','mercedes','alpine','mclaren','sauber','aston','haas','junior','williams'],2024:['redbull','mercedes','ferrari','mclaren','aston','alpine','williams','junior','sauber','haas'],2025:['mclaren','ferrari','redbull','mercedes','aston','alpine','haas','junior','williams','sauber']
};
export function seasonTeams(year,alternate=-1) {
  const lineups=LINEUPS[year];
  if(!lineups)throw new Error('尚未内置该历史赛季');
  return Object.entries(lineups).map(([id,drivers],index)=> {
    let [name,fullName,abbr,color,hq,type]=identities[id]; if(id==='junior'&&year>=2024) {
      name=year===2024?'RB':'Racing Bulls'; fullName=year===2024?'Visa Cash App RB F1 Team':'Visa Cash App Racing Bulls F1 Team'; abbr='VCB'; color='#6692ff';
    }
    if(id==='sauber'&&year>=2024) {
      name='Sauber'; fullName='Stake F1 Team Kick Sauber'; abbr='SAU'; color='#52e252';
    }
    if(id==='sauber'&&year===2023)fullName='Alfa Romeo F1 Team Stake'; if(id==='ferrari'&&year===2025)fullName='Scuderia Ferrari HP'; if(id==='haas'&&year>=2023)fullName='MoneyGram Haas F1 Team'; if(id==='williams'&&year===2025)fullName='Atlassian Williams Racing'; if(id==='aston'&&year<=2023)fullName='Aston Martin Aramco Cognizant F1 Team'; const supplier=['redbull','junior'].includes(id)?(year===2022?'RBPT':'HondaRBPT'):['ferrari','sauber','haas'].includes(id)?'Ferrari':id==='alpine'?'Renault':'Mercedes'; const p=PERFORMANCE[year][id]; return {
      id,name,fullName,abbr,color,secondary:'#f1f5fb',hq,type,supplier,drivers:ALTERNATIVE_LINEUPS[year][alternate]?.changes[id]||drivers,performance:p,cash:68+(p-60)*2.1,reputation:p,logo:index,previousRank:PREVIOUS_RANKS[year].indexOf(id)+1
    };
  });
}
```

## js/data/track-layouts.js

```js
// ===== 文件: js/data/track-layouts.js =====
// Geographic centre lines, adapted from bacinger/f1-circuits (MIT). See THIRD_PARTY_NOTICES.md.
export const TRACK_LAYOUTS = {"australia":[[344.55,524.79],[311.76,492.42],[263.21,442.9],[260.4,440.04],[259.21,436.12],[259.4,434.4],[260.21,432.81],[261.85,428.81],[264.6,423.95],[266.3,417.75],[267.27,410.11],[267.46,404.52],[265.76,393.62],[263.63,388.07],[260.31,382.27],[256.41,377.61],[247.77,369.0],[237.51,359.61],[223.07,345.65],[205.47,326.87],[198.41,319.31],[179.64,295.76],[170.33,283.3],[160.69,268.16],[142.15,235.7],[137.57,226.6],[134.8,219.78],[135.15,215.98],[136.73,213.29],[140.64,211.33],[153.72,209.04],[178.48,203.98],[181.35,202.84],[183.16,201.65],[184.38,199.94],[186.19,194.59],[186.54,188.95],[184.87,140.62],[184.29,122.9],[184.71,121.39],[189.96,115.26],[194.76,111.63],[231.58,85.05],[239.74,80.36],[277.75,64.84],[292.1,59.66],[305.09,51.82],[314.95,45.82],[319.37,45.04],[322.88,45.0],[326.14,46.92],[330.43,51.98],[335.62,56.55],[342.71,61.58],[351.74,64.96],[363.44,66.39],[374.02,66.88],[382.98,68.23],[392.97,71.7],[401.81,75.91],[411.54,83.13],[418.12,89.01],[424.66,97.54],[430.79,108.16],[434.24,118.98],[436.4,127.35],[437.49,134.37],[446.39,182.99],[446.46,189.08],[445.49,196.38],[443.1,203.86],[440.3,210.23],[435.3,217.33],[430.69,222.96],[425.63,229.82],[423.08,234.8],[420.86,240.44],[419.18,246.85],[409.09,300.37],[408.32,306.9],[407.9,314.66],[407.9,321.76],[408.51,334.66],[409.99,344.67],[412.73,356.14],[416.12,367.24],[420.5,376.8],[425.08,385.66],[432.69,397.58],[437.78,405.09],[447.97,415.91],[481.66,445.88],[486.98,450.0],[491.98,452.74],[495.65,454.49],[502.78,456.65],[509.61,457.23],[517.93,456.9],[525.44,456.86],[532.73,456.57],[538.92,456.78],[544.21,458.08],[549.49,460.66],[553.1,462.7],[559.52,468.41],[596.76,500.13],[610.62,511.73],[617.39,519.85],[622.42,525.69],[627.9,534.39],[633.44,547.29],[638.99,563.46],[653.69,614.33],[662.49,646.66],[664.17,655.64],[665.1,660.17],[665.2,662.95],[662.88,664.18],[655.98,666.83],[622.84,680.22],[588.7,693.82],[586.05,694.55],[581.8,695.0],[576.61,694.63],[571.25,692.43],[565.84,688.79],[562.65,685.85],[559.58,681.08],[539.34,643.72],[527.09,623.88],[525.44,621.23],[523.73,619.67],[522.03,619.02],[519.09,618.9],[517.03,620.08],[495.04,644.99],[491.98,648.05],[488.69,649.97],[484.56,651.6],[480.89,652.46],[477.6,652.42],[473.67,651.64],[468.22,649.72],[464.19,646.87],[462.61,645.31],[344.55,524.79]],"bahrain":[[194.83,353.12],[199.92,170.68],[204.73,51.2],[207.0,45.84],[211.76,45.0],[216.9,46.38],[220.74,49.21],[245.4,74.19],[252.11,76.72],[259.46,76.18],[302.35,62.27],[312.63,61.13],[321.93,61.73],[603.28,116.21],[612.9,119.03],[618.04,124.39],[619.28,131.25],[618.31,137.75],[615.12,145.1],[609.06,152.5],[602.03,158.46],[592.4,165.86],[558.49,191.08],[531.24,219.43],[524.53,225.99],[519.12,235.32],[506.95,262.89],[502.79,268.85],[496.35,273.06],[489.97,276.49],[479.75,277.64],[448.97,272.52],[440.64,272.82],[432.04,274.51],[424.96,278.18],[416.36,286.12],[353.89,365.28],[347.84,370.69],[339.18,372.08],[333.77,367.86],[331.83,359.32],[332.15,346.31],[347.19,256.63],[355.84,200.47],[357.14,189.4],[355.52,179.17],[353.3,171.52],[348.81,163.88],[323.17,141.73],[319.66,140.04],[315.82,141.12],[313.6,145.1],[304.3,214.38],[301.76,260.6],[297.27,343.73],[294.08,430.58],[290.83,509.73],[292.13,522.73],[297.27,530.44],[305.27,534.65],[316.47,536.94],[327.99,536.1],[342.37,533.27],[357.14,526.16],[369.58,517.38],[381.75,504.92],[389.16,492.7],[402.89,456.95],[410.57,441.9],[417.93,433.11],[427.56,425.16],[439.08,418.06],[455.08,414.09],[472.66,413.79],[485.16,416.68],[501.81,424.62],[545.68,446.41],[554.65,452.97],[562.33,460.62],[566.17,467.72],[570.93,475.66],[570.93,482.77],[567.09,490.11],[559.41,497.51],[548.87,505.46],[216.57,691.57],[210.52,694.7],[200.89,695.0],[196.72,691.03],[182.01,659.79],[180.72,647.33],[181.04,623.79],[185.2,494.69],[194.83,353.12]],"china":[[247.42,595.41],[198.48,607.69],[189.56,608.51],[178.82,608.51],[169.25,605.45],[162.69,602.67],[154.03,597.13],[147.78,591.52],[142.99,585.15],[139.41,577.65],[136.44,570.1],[136.13,562.07],[136.44,552.87],[137.65,545.91],[139.71,539.24],[143.59,533.4],[148.99,528.38],[160.93,523.13],[171.97,523.13],[180.59,526.43],[184.16,530.33],[186.58,534.52],[186.84,540.36],[185.07,548.68],[181.49,561.19],[180.59,566.5],[182.7,571.81],[187.74,577.36],[196.41,580.66],[205.94,578.72],[211.03,575.41],[214.3,569.86],[217.28,564.26],[220.25,556.76],[222.07,548.44],[222.67,538.94],[221.16,530.92],[216.37,522.01],[213.09,516.46],[203.27,504.48],[177.01,476.39],[156.75,449.96],[140.02,431.9],[119.15,408.24],[112.6,397.09],[109.57,389.06],[88.1,325.92],[81.25,306.98],[75.3,288.33],[75.0,283.61],[77.67,279.72],[83.06,277.47],[92.29,279.19],[101.86,285.56],[109.88,292.23],[117.94,300.84],[129.28,312.53],[139.11,326.98],[156.45,357.31],[179.68,398.21],[187.14,409.6],[194.6,418.51],[202.96,426.59],[212.79,431.9],[223.27,435.8],[234.01,437.98],[246.51,437.98],[257.55,435.8],[268.28,431.9],[279.02,425.17],[289.2,416.85],[297.21,407.41],[305.88,388.76],[319.29,360.38],[324.98,351.77],[330.93,345.92],[338.39,341.5],[349.42,336.72],[359.86,335.89],[368.83,336.72],[376.89,339.79],[384.05,344.51],[389.09,348.7],[393.57,353.71],[415.65,396.55],[421.04,402.4],[427.59,404.34],[433.84,403.22],[439.54,400.98],[461.61,371.77],[464.59,365.93],[464.59,360.68],[462.77,355.37],[408.79,263.61],[375.08,209.08],[338.08,147.89],[333.04,146.24],[327.95,147.59],[323.17,151.78],[317.52,158.16],[312.13,164.83],[307.09,168.19],[300.79,170.14],[294.24,169.02],[287.69,163.17],[279.92,154.56],[276.04,147.59],[273.67,141.22],[272.46,131.72],[273.07,123.11],[274.58,114.79],[277.25,107.0],[284.41,97.56],[291.26,92.24],[300.79,88.05],[310.97,85.87],[319.03,85.05],[328.86,85.58],[341.66,88.64],[350.03,92.24],[358.7,96.97],[370.59,108.12],[381.08,122.87],[494.42,296.42],[565.13,403.22],[601.82,458.87],[634.03,509.2],[676.67,572.87],[722.33,639.67],[725.0,645.51],[724.7,651.06],[720.82,654.95],[714.57,654.42],[701.72,648.29],[694.26,642.98],[685.94,636.9],[598.55,517.52],[594.67,515.34],[587.51,514.75],[477.99,540.65],[247.42,595.41]],"spain":[[552.8,335.27],[484.03,444.47],[446.01,505.69],[406.47,568.14],[365.09,634.65],[350.96,657.1],[346.44,662.15],[342.39,665.71],[338.9,667.31],[332.64,668.11],[326.93,667.74],[322.69,666.64],[318.6,664.42],[304.33,655.32],[299.82,653.29],[291.72,651.5],[285.18,651.5],[275.84,653.53],[270.54,656.86],[230.96,686.45],[225.43,689.22],[219.73,691.31],[212.08,693.89],[204.86,695.0],[198.55,695.0],[191.69,694.63],[184.05,693.65],[176.64,691.25],[167.71,686.82],[163.11,683.43],[158.87,679.74],[155.05,676.3],[144.93,663.01],[139.96,652.73],[136.37,641.29],[135.45,633.23],[134.52,623.63],[134.75,613.48],[136.27,602.71],[140.55,585.61],[145.25,571.83],[150.31,561.0],[155.74,552.45],[224.51,443.06],[228.66,439.18],[234.41,435.8],[245.13,433.15],[251.95,433.95],[257.47,435.62],[263.82,439.18],[271.0,444.97],[275.61,450.2],[281.13,461.27],[283.11,469.64],[283.66,482.62],[283.2,490.37],[281.27,499.11],[277.54,507.66],[270.63,520.89],[220.69,598.96],[219.31,604.25],[219.22,608.87],[220.46,614.4],[222.76,618.22],[225.29,621.42],[229.25,624.19],[234.18,625.91],[238.05,626.59],[244.35,625.35],[247.25,624.19],[322.33,590.22],[332.73,583.76],[343.08,575.83],[353.49,565.98],[360.85,557.06],[390.73,510.18],[393.95,503.17],[395.33,498.31],[394.09,490.62],[390.26,483.73],[384.37,478.25],[370.75,470.19],[363.34,464.16],[359.24,459.55],[355.19,453.64],[352.93,449.64],[334.15,404.85],[312.84,354.4],[311.14,345.73],[311.14,336.87],[312.01,330.04],[313.4,323.46],[317.58,315.83],[320.81,310.66],[327.71,303.09],[334.57,297.74],[573.46,175.18],[581.84,170.45],[586.21,165.77],[588.33,161.28],[588.88,155.87],[587.18,149.84],[584.37,145.04],[580.32,141.1],[574.43,136.61],[564.9,132.43],[559.01,131.01],[550.86,129.9],[543.87,129.6],[536.82,130.03],[529.14,131.99],[518.46,137.16],[511.14,141.41],[500.92,150.39],[490.79,157.65],[483.8,160.79],[472.98,161.59],[466.54,160.17],[458.85,156.24],[452.68,151.07],[448.86,145.04],[445.78,138.27],[444.81,130.83],[444.53,127.32],[446.65,117.48],[450.43,110.46],[456.32,104.74],[513.26,57.86],[518.87,53.12],[525.96,48.94],[532.4,46.66],[541.38,45.25],[550.22,45.0],[558.32,46.66],[564.95,49.49],[578.39,58.04],[593.39,67.7],[606.37,76.68],[614.75,81.55],[643.06,99.51],[649.87,104.31],[654.2,108.86],[658.11,114.15],[661.29,120.24],[663.91,128.36],[665.38,135.93],[665.48,146.82],[663.91,156.6],[656.04,172.17],[552.8,335.27]],"monaco":[[475.21,172.0],[474.13,165.32],[475.63,159.3],[479.5,151.06],[483.15,145.26],[494.52,130.85],[552.32,52.35],[556.34,46.71],[562.3,45.0],[569.54,47.08],[574.58,51.24],[578.23,57.77],[578.98,65.13],[579.15,71.22],[579.74,76.19],[582.74,82.13],[586.23,86.66],[592.72,95.8],[597.12,103.9],[598.84,108.8],[601.04,111.69],[604.53,112.66],[608.55,111.47],[611.56,108.35],[612.47,103.9],[610.48,100.11],[605.39,96.39],[590.31,77.23],[588.16,72.63],[588.11,68.17],[589.29,64.76],[590.9,61.56],[597.98,57.92],[608.93,55.1],[614.88,52.87],[621.0,50.42],[629.48,47.45],[638.71,46.78],[643.59,49.23],[645.42,56.81],[643.7,101.07],[636.88,146.6],[629.8,175.56],[621.91,196.21],[608.39,219.83],[592.83,239.81],[570.29,264.39],[538.04,284.15],[518.83,293.58],[481.81,310.88],[456.91,319.5],[420.15,328.19],[396.49,331.9],[383.93,334.28],[381.78,337.92],[381.62,341.11],[380.87,344.82],[379.26,348.46],[373.95,350.32],[366.44,351.58],[358.12,346.83],[353.56,346.53],[287.34,355.22],[254.45,359.97],[224.18,364.73],[215.81,365.99],[210.23,366.95],[206.2,371.11],[199.87,383.59],[194.51,395.7],[190.21,407.8],[188.34,416.42],[186.35,431.42],[186.19,457.12],[186.46,463.5],[188.34,467.89],[192.09,472.12],[200.41,478.21],[205.99,483.33],[208.4,488.83],[209.37,496.78],[218.82,551.44],[221.23,561.02],[221.98,564.06],[221.77,568.15],[219.35,571.42],[214.04,575.13],[208.73,577.73],[207.49,581.44],[208.51,589.24],[214.58,606.99],[220.1,620.36],[225.74,630.91],[235.4,644.72],[247.52,656.97],[256.43,662.1],[266.41,666.78],[271.4,669.01],[273.92,671.83],[276.82,680.52],[275.43,685.12],[270.92,687.8],[250.9,693.07],[239.74,694.85],[232.39,695.0],[225.84,694.03],[221.71,690.92],[219.19,688.32],[219.08,682.23],[218.12,677.32],[216.19,671.31],[204.92,657.42],[196.65,644.13],[190.21,634.17],[183.4,615.31],[168.32,562.8],[164.19,545.87],[161.29,527.75],[157.53,501.31],[154.58,466.92],[154.58,444.49],[155.55,427.34],[157.43,409.51],[160.75,397.11],[164.51,385.97],[166.34,379.14],[167.25,373.12],[166.82,363.98],[166.66,358.34],[168.48,355.0],[173.15,352.77],[184.53,350.02],[194.67,349.58],[208.57,347.87],[227.94,345.42],[245.11,342.37],[288.79,329.52],[313.2,322.84],[335.58,319.2],[350.93,317.94],[362.89,313.63],[397.5,297.22],[412.69,290.98],[434.85,286.0],[453.37,283.4],[471.02,280.43],[480.95,276.94],[493.02,269.37],[503.48,258.45],[509.39,249.24],[512.02,239.58],[511.59,229.48],[509.87,219.98],[506.11,209.51],[501.12,199.55],[493.29,193.46],[485.78,186.41],[482.13,183.21],[478.75,179.8],[475.21,172.0]],"canada":[[471.31,515.66],[479.3,552.81],[485.24,580.18],[488.55,600.43],[488.99,617.13],[483.84,661.93],[484.79,667.29],[488.39,670.64],[501.68,676.52],[504.32,678.48],[505.59,682.37],[505.11,686.29],[503.24,690.21],[499.64,693.23],[495.1,695.0],[489.15,695.0],[482.6,693.57],[466.95,689.16],[456.3,685.57],[446.16,680.07],[436.46,673.66],[414.07,654.46],[400.78,642.02],[398.27,638.14],[397.66,634.93],[397.82,631.73],[400.15,624.6],[400.94,620.19],[400.46,616.61],[398.9,613.59],[373.4,582.48],[368.88,578.6],[360.27,572.53],[355.11,568.27],[349.48,560.8],[346.34,552.81],[344.15,544.62],[343.38,538.06],[343.54,489.53],[343.54,485.46],[341.82,482.25],[338.68,479.77],[333.2,478.52],[325.86,480.29],[321.63,480.82],[316.48,479.39],[312.09,476.56],[308.97,473.54],[306.14,469.81],[304.43,466.42],[302.07,459.67],[300.04,451.33],[297.71,441.0],[297.4,432.29],[294.41,395.15],[294.73,375.05],[295.2,358.88],[296.6,341.12],[298.48,327.09],[300.36,316.04],[313.49,263.1],[315.68,258.27],[318.83,256.35],[322.11,255.63],[326.94,255.26],[330.69,254.01],[334.31,251.9],[338.23,247.79],[341.19,243.0],[343.85,236.44],[356.83,183.65],[361.98,155.03],[363.7,134.93],[364.49,114.31],[364.34,107.56],[363.54,100.47],[354.0,53.52],[353.69,50.69],[354.0,48.21],[356.2,45.72],[360.42,45.0],[363.09,45.9],[364.97,48.02],[365.58,49.79],[366.69,60.27],[368.25,76.3],[368.88,81.61],[370.92,87.5],[377.79,101.52],[383.89,113.97],[414.71,193.6],[418.3,203.9],[463.97,422.53],[465.84,431.58],[465.39,434.59],[463.36,436.93],[459.74,438.33],[457.41,440.66],[456.46,443.3],[456.62,446.7],[464.92,484.56],[471.31,515.66]],"france":[[415.89,398.63],[491.43,456.23],[529.95,486.01],[532.37,486.84],[534.63,486.67],[536.44,485.69],[537.48,484.19],[537.94,482.24],[538.55,461.99],[539.13,457.73],[540.05,455.43],[541.7,452.95],[544.27,449.8],[547.88,446.7],[552.08,444.39],[556.6,443.07],[561.25,442.75],[566.54,443.07],[571.35,444.71],[575.11,447.01],[578.26,449.98],[584.29,456.58],[590.16,461.99],[596.93,467.09],[604.15,471.2],[611.22,474.35],[618.74,476.48],[626.12,478.12],[634.56,478.78],[643.43,478.78],[650.5,477.8],[657.44,476.13],[664.36,473.82],[671.27,471.03],[677.15,467.75],[680.91,465.44],[684.22,463.8],[687.37,462.83],[690.55,462.65],[693.85,463.31],[697.01,465.13],[699.73,467.57],[701.53,470.05],[702.57,472.53],[703.49,475.5],[704.07,479.58],[704.07,484.71],[703.18,488.49],[701.84,492.12],[699.88,495.89],[698.07,498.54],[683.61,517.46],[678.8,524.2],[674.15,531.6],[669.47,540.33],[667.36,545.42],[666.47,548.53],[666.01,551.5],[666.47,554.47],[667.51,557.12],[669.01,559.74],[671.58,562.88],[674.88,565.67],[679.41,568.78],[684.06,571.08],[688.74,572.41],[692.94,572.9],[697.16,572.72],[701.53,571.75],[705.6,570.28],[709.64,568.46],[712.67,566.47],[715.36,564.34],[717.63,561.73],[720.04,558.76],[722.0,554.95],[723.5,551.85],[724.39,548.39],[724.85,544.93],[725.0,541.79],[724.69,472.85],[724.69,468.06],[724.39,464.47],[723.8,461.15],[722.3,456.58],[720.63,451.79],[718.69,448.16],[716.13,444.39],[712.82,440.59],[709.06,436.64],[704.99,433.36],[701.38,430.88],[697.92,429.07],[694.59,427.6],[667.51,417.06],[635.3,404.88],[604.3,393.35],[567.43,379.71],[534.63,367.21],[530.56,365.39],[526.8,363.26],[499.26,344.34],[494.28,340.88],[491.89,338.23],[484.06,326.22],[481.95,324.27],[478.95,322.45],[475.92,321.96],[473.69,321.96],[471.27,323.12],[469.31,324.58],[458.79,334.46],[456.52,336.1],[453.95,336.59],[451.26,336.1],[421.31,324.93],[326.64,289.53],[288.4,275.04],[174.19,232.42],[147.54,222.4],[144.85,221.07],[142.58,219.26],[141.39,217.62],[140.02,215.66],[138.52,213.18],[137.47,210.7],[131.45,196.39],[129.79,193.6],[128.14,190.46],[125.57,187.18],[123.18,183.54],[120.77,180.93],[116.09,176.63],[111.59,173.04],[107.52,170.56],[102.84,168.57],[98.65,167.42],[95.93,167.1],[92.93,167.59],[89.9,168.57],[87.51,170.07],[85.09,172.2],[83.75,173.84],[82.83,176.0],[75.76,196.88],[75.0,199.67],[75.0,201.0],[75.61,202.82],[76.96,204.14],[79.07,204.77],[83.14,204.63],[97.27,202.33],[101.34,202.33],[105.41,202.82],[108.87,204.28],[111.28,206.27],[113.39,208.58],[114.59,210.7],[115.78,213.5],[116.24,215.8],[116.39,217.79],[116.09,220.41],[114.74,228.47],[114.74,230.46],[115.2,232.59],[116.09,234.58],[117.89,236.22],[120.61,238.53],[136.86,248.23],[150.11,255.63],[162.14,260.73],[172.69,265.16],[178.1,267.99],[183.98,271.1],[190.28,275.39],[198.57,280.98],[209.56,289.85],[218.28,296.27],[223.69,301.72],[231.07,309.43],[234.25,311.73],[238.59,314.21],[254.87,323.26],[259.82,325.25],[263.74,325.56],[267.35,325.07],[270.96,323.78],[274.27,321.61],[276.53,319.31],[278.95,316.03],[281.03,313.41],[283.75,311.25],[286.45,310.27],[289.47,309.78],[293.39,309.78],[297.46,310.09],[301.07,311.25],[303.3,312.75],[319.58,325.25],[341.09,341.86],[365.47,359.81],[388.94,378.06],[415.89,398.63]],"austria":[[508.23,532.39],[463.46,544.28],[352.54,574.48],[344.9,575.05],[339.8,570.44],[331.21,553.81],[304.04,517.09],[274.56,475.18],[251.39,438.18],[230.26,401.69],[195.68,326.3],[186.15,306.21],[171.53,282.54],[149.02,255.0],[111.66,217.48],[77.08,182.9],[75.0,178.28],[75.24,173.37],[79.2,170.95],[88.25,169.33],[116.56,166.04],[144.87,164.95],[174.11,165.24],[201.95,167.95],[234.22,173.14],[332.82,192.19],[377.83,198.14],[475.06,202.24],[482.98,204.95],[487.84,210.38],[489.68,216.38],[489.21,222.68],[486.67,228.62],[476.94,242.53],[469.26,251.77],[455.1,264.3],[439.58,272.73],[420.76,278.96],[400.33,282.25],[379.01,280.87],[296.16,267.53],[285.03,268.92],[275.97,272.15],[268.09,277.63],[261.11,284.97],[256.72,293.68],[254.37,303.21],[253.94,311.92],[255.31,321.45],[257.86,328.49],[298.01,398.69],[304.75,406.08],[315.41,412.83],[327.72,415.61],[339.56,414.51],[352.07,409.31],[359.75,403.08],[367.64,393.26],[375.05,383.74],[382.96,375.6],[392.45,369.08],[403.59,362.5],[419.15,356.78],[435.38,353.26],[563.94,350.55],[662.82,348.12],[673.25,348.35],[683.44,351.93],[691.83,358.17],[698.54,366.59],[703.63,377.74],[723.82,445.8],[725.0,452.03],[723.82,456.65],[721.51,460.23],[713.63,466.47],[703.2,472.7],[689.71,479.51],[674.42,486.04],[656.31,492.04],[508.23,532.39]],"britain":[[436.94,51.15],[507.64,45.0],[520.2,45.76],[529.86,48.96],[536.16,53.13],[543.67,61.86],[548.41,71.8],[552.25,84.32],[557.63,105.56],[563.15,126.42],[566.36,149.48],[567.74,163.97],[569.58,199.12],[570.35,229.13],[571.57,240.85],[576.03,251.8],[584.45,267.1],[587.99,275.83],[587.84,282.4],[586.29,290.11],[574.34,321.72],[573.57,334.45],[575.4,343.55],[579.71,351.31],[591.52,367.79],[594.26,375.37],[594.57,384.31],[592.58,392.44],[585.38,401.38],[576.18,407.95],[563.59,415.28],[553.8,421.06],[546.88,427.8],[538.93,441.12],[523.28,470.49],[437.25,628.83],[409.04,672.75],[401.06,683.49],[394.64,689.23],[387.13,693.02],[379.3,695.0],[372.1,694.41],[364.12,692.6],[357.39,689.65],[351.4,684.89],[346.32,677.3],[344.8,674.35],[337.13,657.66],[328.55,642.74],[319.36,630.43],[313.06,622.89],[306.02,615.14],[293.58,602.41],[265.84,569.24],[263.06,567.47],[259.23,567.05],[255.42,568.86],[243.77,579.4],[239.78,580.79],[235.79,580.37],[232.42,578.98],[227.65,574.42],[222.6,569.24],[216.31,560.9],[211.72,551.96],[208.48,542.81],[205.74,532.49],[205.43,528.32],[206.2,524.14],[208.48,520.18],[214.0,511.42],[298.66,401.0],[317.67,376.55],[321.64,371.96],[328.55,367.41],[336.82,365.43],[343.58,365.22],[352.93,366.02],[378.99,369.98],[387.59,370.99],[396.48,371.37],[406.61,369.98],[415.8,367.62],[424.07,363.03],[478.05,320.12],[481.58,317.76],[485.88,315.57],[490.31,315.15],[493.67,316.37],[496.76,319.15],[498.6,322.31],[507.79,354.51],[510.56,359.06],[514.37,361.84],[518.83,362.06],[523.75,359.86],[526.81,355.9],[528.8,351.73],[532.64,341.19],[535.69,332.26],[538.0,323.49],[539.22,314.98],[539.99,306.0],[539.37,296.69],[537.53,292.52],[532.79,287.16],[357.83,127.44],[353.09,124.44],[346.48,121.07],[338.37,119.89],[329.93,120.86],[321.35,125.03],[318.27,128.83],[316.12,134.39],[312.6,163.38],[310.6,169.33],[306.33,174.13],[299.88,177.29],[292.83,178.3],[285.01,176.28],[279.49,172.53],[276.12,168.15],[273.5,163.01],[273.04,157.44],[274.13,151.46],[278.4,141.72],[300.94,97.05],[308.17,88.49],[315.21,81.33],[325.34,72.6],[333.6,66.83],[344.04,62.45],[353.09,59.5],[372.26,57.1],[436.94,51.15]],"hungary":[[256.06,534.69],[149.01,449.08],[117.36,424.34],[114.51,419.57],[112.82,414.8],[113.3,409.44],[115.43,405.26],[118.53,402.46],[122.59,400.49],[128.54,399.6],[137.35,399.6],[161.88,400.2],[178.29,403.0],[193.29,407.47],[209.01,413.67],[220.91,420.41],[229.92,426.61],[317.3,495.76],[323.7,499.1],[329.89,500.53],[336.08,500.53],[341.11,498.8],[346.58,496.83],[350.84,493.5],[354.42,489.56],[356.79,485.92],[358.92,480.86],[359.65,473.82],[359.41,469.89],[357.52,464.52],[355.87,459.22],[330.85,416.77],[328.24,408.9],[327.76,402.7],[329.21,397.39],[331.1,390.66],[333.47,384.46],[361.09,329.37],[410.11,230.17],[418.92,214.43],[429.17,200.66],[442.0,185.75],[444.62,181.58],[446.55,177.35],[446.99,172.58],[445.58,167.21],[423.22,82.92],[422.74,76.48],[423.42,70.28],[425.11,64.08],[427.73,58.18],[432.47,53.41],[438.18,49.17],[444.13,46.13],[450.09,45.0],[457.48,45.24],[464.6,46.97],[473.21,50.6],[482.94,56.8],[489.86,61.57],[497.94,67.48],[506.5,74.21],[517.24,85.42],[562.92,134.9],[565.05,139.67],[565.78,143.37],[565.54,147.3],[563.16,150.64],[559.34,154.28],[556.25,157.38],[555.08,160.18],[555.32,165.25],[556.49,170.85],[573.14,233.57],[576.72,241.97],[579.33,245.37],[581.94,248.41],[585.52,251.27],[589.82,252.64],[597.91,254.31],[632.41,259.38],[639.57,262.18],[644.07,265.28],[647.89,268.38],[651.23,273.75],[652.4,278.52],[653.84,284.12],[653.84,290.32],[652.64,297.06],[644.07,357.45],[643.83,368.18],[644.55,374.92],[646.44,381.89],[649.1,388.69],[682.88,442.64],[686.22,450.75],[686.94,456.41],[687.18,461.72],[686.46,467.32],[685.25,472.99],[682.88,478.06],[679.06,483.06],[620.99,548.28],[569.36,608.14],[551.74,627.81],[547.44,630.32],[543.42,630.91],[539.6,630.32],[536.26,628.35],[532.92,625.31],[497.7,585.37],[491.99,579.76],[465.08,557.82],[460.34,555.32],[455.59,553.35],[449.84,552.52],[444.86,553.05],[438.18,556.15],[434.16,560.62],[431.31,565.45],[429.62,569.63],[429.17,575.29],[429.86,580.89],[432.23,586.2],[435.33,590.43],[488.41,633.18],[498.18,642.12],[501.03,646.95],[503.17,653.69],[504.13,661.56],[503.41,668.83],[501.03,675.03],[498.18,680.93],[493.68,686.0],[486.28,690.77],[478.68,693.87],[470.35,695.0],[461.55,693.87],[453.66,690.77],[446.31,685.7],[256.06,534.69]],"belgium":[[320.47,113.93],[284.72,51.45],[284.34,48.65],[285.93,46.16],[289.23,45.0],[292.92,46.02],[304.68,51.94],[333.25,65.65],[346.98,74.1],[361.28,84.69],[374.09,95.42],[384.26,106.5],[438.86,171.61],[442.7,175.25],[449.29,179.35],[461.06,186.96],[466.22,192.08],[470.57,199.02],[473.36,205.33],[475.22,212.42],[476.8,225.5],[477.72,230.12],[479.3,234.4],[482.34,240.01],[509.32,283.17],[526.49,310.59],[531.25,320.83],[534.29,328.43],[537.86,340.67],[559.41,415.88],[592.46,530.07],[600.12,557.52],[600.52,561.98],[599.72,566.92],[597.08,570.88],[593.24,574.21],[588.35,576.84],[585.45,579.65],[583.46,582.94],[581.88,587.92],[582.14,592.87],[588.75,622.46],[588.62,627.58],[587.57,632.21],[584.0,637.32],[579.75,640.8],[504.43,692.86],[499.67,694.86],[494.91,695.0],[489.89,693.53],[485.78,690.55],[482.88,686.27],[481.69,681.96],[481.42,677.33],[482.88,673.02],[485.51,668.56],[489.35,665.44],[522.27,645.11],[525.84,641.46],[527.81,637.82],[528.61,633.54],[528.21,628.24],[514.59,588.24],[510.37,571.9],[500.72,521.48],[495.96,492.56],[494.91,487.61],[492.52,482.32],[489.35,478.01],[484.6,473.38],[479.3,469.91],[473.5,467.59],[467.4,466.61],[447.7,465.28],[440.18,466.12],[433.3,468.08],[426.31,471.06],[420.61,474.89],[414.0,480.99],[409.78,487.09],[405.16,495.85],[386.51,542.48],[369.85,583.96],[366.28,590.41],[362.06,594.87],[356.25,598.16],[350.42,599.81],[345.02,599.98],[339.59,598.83],[334.97,596.69],[327.29,591.71],[322.26,589.57],[316.19,588.59],[310.11,589.26],[304.55,591.04],[299.79,594.37],[296.76,598.16],[293.05,603.28],[262.52,651.21],[259.48,654.01],[255.78,656.01],[251.29,656.99],[246.26,656.68],[241.91,654.68],[221.27,639.64],[209.12,630.73],[206.09,626.77],[202.92,621.97],[201.06,617.34],[199.74,611.87],[199.48,606.26],[200.39,599.49],[202.51,593.71],[205.28,586.28],[209.39,575.02],[216.52,562.29],[224.33,551.21],[236.21,537.86],[256.04,518.5],[267.68,509.42],[277.6,503.64],[328.63,477.02],[336.02,472.4],[343.03,466.93],[349.51,460.83],[355.04,454.2],[360.2,447.26],[367.08,434.57],[372.64,422.33],[385.33,394.07],[387.56,387.93],[388.9,381.34],[389.15,373.07],[387.83,365.63],[380.3,346.28],[372.11,324.96],[362.19,298.35],[359.67,288.47],[357.3,276.72],[355.85,265.82],[354.91,256.56],[352.01,213.75],[352.54,210.94],[354.26,208.95],[356.9,208.28],[361.39,208.95],[366.03,208.95],[369.2,208.28],[371.3,205.97],[371.84,203.34],[370.52,199.87],[354.26,173.25],[320.47,113.93]],"italy":[[223.96,457.84],[234.89,329.31],[239.86,275.43],[240.39,273.23],[241.93,271.96],[243.84,271.66],[246.2,271.96],[248.41,272.13],[250.46,271.96],[251.86,270.86],[252.96,269.3],[253.24,267.9],[253.24,266.33],[245.5,236.94],[244.4,228.94],[243.98,221.71],[244.54,213.85],[247.43,175.53],[248.55,169.26],[249.93,163.43],[252.0,157.17],[254.75,150.4],[257.92,143.8],[262.6,136.41],[267.43,130.31],[273.93,123.38],[280.97,117.24],[288.82,111.61],[297.24,106.75],[306.74,102.02],[316.28,98.72],[326.76,95.75],[338.63,93.69],[350.77,92.59],[398.08,88.52],[456.01,85.05],[459.46,84.75],[461.26,83.79],[462.77,82.22],[464.68,75.46],[465.52,73.59],[466.9,72.32],[469.25,71.56],[477.11,70.13],[485.66,68.26],[497.8,64.33],[552.01,46.1],[556.69,45.0],[561.12,45.0],[565.39,45.8],[568.42,47.03],[571.33,48.77],[574.08,50.66],[577.53,54.43],[579.46,57.4],[580.84,61.03],[581.54,65.09],[583.87,90.85],[588.29,134.84],[588.15,138.77],[587.46,141.3],[586.36,143.5],[584.57,145.07],[581.26,147.27],[545.81,166.43],[516.98,182.59],[499.04,192.49],[490.34,197.52],[480.55,204.42],[473.52,209.78],[467.46,215.11],[435.99,242.14],[413.67,262.4],[366.48,303.85],[338.07,328.85],[334.2,332.78],[332.68,335.28],[332.4,337.78],[332.4,340.78],[333.38,347.37],[333.66,350.97],[333.66,356.17],[333.24,359.0],[332.12,362.6],[330.47,366.83],[327.72,371.1],[323.99,375.5],[319.73,379.1],[316.28,381.76],[314.48,383.83],[313.11,386.63],[311.85,391.83],[308.96,415.55],[305.93,440.84],[282.48,667.64],[281.5,675.81],[280.55,679.6],[278.61,683.5],[275.98,686.67],[272.95,689.5],[268.69,692.3],[264.0,694.03],[258.62,695.0],[254.05,694.67],[249.79,693.73],[244.82,691.83],[240.0,689.63],[236.41,687.14],[232.12,683.84],[227.3,678.64],[223.99,673.94],[221.1,668.91],[218.6,662.94],[216.27,656.35],[214.48,649.58],[213.64,643.78],[212.68,634.99],[212.54,626.19],[212.4,617.86],[211.99,601.36],[211.71,586.9],[211.99,571.2],[213.78,550.64],[220.54,485.6],[223.96,457.84]],"singapore":[[710.8,319.68],[723.74,418.5],[725.0,431.29],[723.74,437.61],[720.25,443.12],[704.23,467.59],[701.35,471.58],[698.32,473.04],[694.48,473.5],[685.68,473.04],[645.1,470.82],[582.54,464.15],[574.6,462.08],[569.6,459.04],[565.66,454.75],[562.37,446.15],[561.92,437.66],[562.17,432.61],[560.55,429.98],[551.81,429.37],[542.77,429.17],[496.63,426.54],[366.7,419.61],[350.98,417.74],[339.96,414.76],[328.64,409.15],[282.55,368.66],[262.84,351.83],[259.56,349.2],[254.86,348.44],[249.0,349.5],[244.6,352.43],[241.72,355.26],[233.38,380.64],[228.98,399.65],[217.97,457.17],[195.28,572.93],[194.01,575.36],[192.35,577.48],[189.21,579.75],[185.47,580.61],[180.87,580.51],[178.75,579.65],[173.45,572.93],[168.14,565.4],[164.2,556.86],[159.95,552.66],[139.94,536.64],[129.98,527.44],[123.77,521.42],[119.93,516.01],[116.04,502.82],[116.59,496.65],[117.7,491.95],[120.43,486.49],[119.02,483.05],[113.96,481.33],[104.66,478.15],[96.68,473.04],[86.88,466.17],[79.3,459.5],[76.57,453.89],[75.3,446.0],[75.0,439.08],[82.68,425.98],[113.66,370.53],[153.53,298.9],[160.61,285.96],[167.23,279.85],[169.96,277.62],[179.05,275.8],[187.09,280.76],[197.25,287.83],[239.04,331.66],[242.78,333.58],[245.86,332.82],[248.74,327.36],[265.22,295.11],[287.25,257.81],[291.3,251.79],[295.19,250.38],[302.21,253.51],[306.25,255.88],[423.5,323.72],[442.65,331.05],[455.94,333.53],[621.3,343.28],[627.72,342.02],[636.06,338.13],[642.93,333.28],[647.33,325.24],[648.44,317.61],[647.17,299.46],[642.42,274.79],[628.07,234.96],[624.18,226.47],[621.55,219.44],[620.14,210.85],[620.14,199.83],[622.56,175.31],[626.76,165.65],[632.52,159.84],[637.37,159.39],[641.77,160.55],[646.62,166.16],[649.25,169.6],[651.77,173.09],[656.32,176.93],[666.78,182.08],[675.58,184.51],[686.59,183.45],[692.25,185.72],[695.13,189.77],[696.8,196.24],[701.25,250.63],[710.8,319.68]],"japan":[[630.07,381.83],[670.17,430.1],[717.08,487.58],[721.37,493.66],[723.76,500.0],[725.0,505.71],[724.91,511.31],[724.21,515.62],[718.74,532.53],[716.14,536.96],[712.36,540.31],[709.18,542.12],[703.47,543.52],[698.27,543.33],[692.55,541.41],[687.23,537.21],[681.82,529.03],[654.15,486.55],[648.91,482.09],[644.41,480.65],[637.6,479.47],[623.3,479.36],[616.1,477.3],[611.02,473.73],[607.18,469.05],[605.37,464.48],[598.93,440.01],[596.23,433.75],[591.94,428.37],[586.95,424.72],[580.66,421.77],[574.22,420.55],[557.59,420.3],[549.9,418.82],[544.64,416.32],[539.2,412.12],[535.21,406.26],[532.76,400.29],[531.64,394.65],[531.7,389.27],[532.73,384.7],[540.89,362.37],[542.13,357.84],[542.34,351.87],[541.47,347.93],[539.32,342.22],[536.11,337.35],[529.98,333.01],[522.51,328.95],[513.65,324.49],[505.84,321.36],[500.04,319.74],[491.87,318.38],[482.62,318.23],[475.33,318.52],[469.25,320.15],[464.32,322.25],[456.64,325.52],[448.57,330.06],[439.28,337.65],[432.03,345.35],[401.51,382.34],[399.94,384.48],[395.07,385.62],[350.5,389.64],[347.62,389.27],[344.57,387.21],[343.33,383.71],[342.78,380.76],[336.01,352.9],[326.97,300.58],[325.24,290.96],[324.82,286.1],[325.3,281.09],[326.27,275.89],[328.33,270.51],[330.66,265.17],[337.85,248.66],[338.61,246.12],[338.07,243.8],[336.71,241.66],[334.38,240.08],[331.69,239.23],[329.08,239.41],[326.12,241.4],[323.67,244.94],[313.18,263.07],[304.65,276.74],[299.09,284.85],[294.49,290.19],[290.53,293.58],[283.72,298.96],[276.56,302.79],[269.06,305.04],[255.99,306.95],[243.62,307.47],[234.31,306.77],[223.21,304.34],[211.05,300.91],[197.45,295.83],[188.86,291.85],[181.33,287.31],[174.37,282.12],[167.02,275.52],[159.43,267.12],[154.41,259.79],[149.91,251.76],[138.78,222.13],[132.82,209.16],[129.8,203.96],[125.68,200.13],[120.3,197.7],[113.86,196.48],[106.15,196.67],[99.01,197.7],[92.03,199.25],[85.22,202.05],[79.66,206.29],[76.3,211.67],[75.0,216.94],[75.39,223.57],[76.91,228.51],[79.11,233.48],[82.89,237.64],[90.36,244.64],[99.71,252.42],[108.84,260.42],[120.42,269.18],[133.67,278.21],[147.22,286.69],[162.37,293.91],[175.91,300.84],[189.83,306.14],[212.42,313.95],[237.27,323.65],[267.36,334.18],[297.21,343.62],[317.87,350.77],[344.57,360.97],[350.68,362.52],[356.76,362.7],[363.2,361.49],[369.46,359.76],[380.74,355.41],[391.11,350.21],[399.82,344.83],[408.83,337.83],[425.67,322.06],[448.75,300.54],[455.16,295.24],[459.73,292.03],[463.9,289.27],[466.86,287.5],[468.47,287.35],[470.58,288.24],[475.78,292.88],[479.53,296.01],[482.59,296.89],[485.46,296.34],[488.85,294.09],[494.41,289.05],[500.67,284.55],[507.66,281.6],[516.19,280.87],[524.14,281.31],[532.55,283.04],[540.95,286.32],[548.09,289.75],[557.04,295.83],[565.09,303.31],[573.34,312.52],[630.07,381.83]],"usa":[[205.38,487.93],[264.07,534.71],[280.28,546.06],[292.83,553.54],[297.48,555.75],[299.29,556.3],[301.31,555.95],[303.12,554.84],[304.36,552.98],[304.97,551.28],[304.77,549.22],[292.01,512.53],[286.33,495.56],[285.34,490.34],[285.13,485.87],[285.34,480.65],[286.33,475.79],[288.14,469.66],[290.98,464.44],[294.03,459.77],[298.27,454.91],[302.92,451.54],[309.21,447.63],[343.41,426.39],[357.4,417.61],[360.41,414.65],[363.05,411.09],[365.27,408.12],[367.12,404.01],[368.52,400.49],[372.18,390.25],[374.61,386.89],[377.65,382.97],[381.69,380.36],[384.93,378.66],[393.01,375.5],[399.3,372.33],[402.92,369.53],[405.18,366.76],[407.2,363.0],[407.99,358.53],[409.22,350.9],[409.83,346.03],[411.03,340.66],[412.67,336.74],[414.69,332.98],[417.32,329.27],[420.16,325.91],[424.4,322.19],[429.26,318.63],[434.53,315.66],[440.17,313.25],[445.06,312.1],[449.1,311.95],[452.35,312.1],[457.61,313.61],[491.2,329.07],[494.45,330.37],[497.87,330.37],[500.5,329.27],[507.2,325.15],[515.07,318.83],[520.75,313.05],[526.43,305.42],[530.67,300.4],[534.53,297.39],[538.77,295.53],[542.02,294.78],[546.67,294.78],[551.94,296.29],[555.98,298.5],[559.23,301.7],[561.04,303.92],[562.85,306.73],[564.49,309.89],[566.92,312.5],[569.76,313.61],[572.56,313.61],[633.1,300.2],[636.97,298.9],[639.39,297.59],[641.21,295.89],[676.64,252.86],[707.8,215.18],[719.73,199.91],[724.62,190.97],[725.0,188.72],[724.42,186.66],[722.98,185.56],[721.17,184.25],[719.15,183.7],[716.93,183.85],[713.88,184.61],[649.11,205.33],[603.96,217.98],[554.16,230.08],[494.65,242.03],[457.41,248.2],[422.97,253.22],[321.56,264.41],[310.24,266.47],[308.8,267.38],[308.19,269.24],[308.39,270.74],[309.83,272.79],[316.5,280.23],[339.58,311.95],[349.71,328.36],[350.32,330.77],[349.71,334.29],[348.27,336.74],[345.64,338.6],[343.41,339.15],[339.17,339.71],[320.36,338.2],[318.51,337.3],[316.91,335.79],[315.3,333.93],[313.86,331.32],[310.03,320.88],[308.39,316.77],[305.76,313.05],[293.41,300.4],[291.6,298.9],[289.38,297.95],[287.15,297.59],[275.01,296.48],[272.58,296.64],[271.15,297.59],[269.74,299.25],[269.13,301.51],[269.95,304.12],[293.41,344.57],[302.92,362.45],[303.74,367.31],[303.53,372.14],[302.75,376.05],[301.72,379.97],[299.09,387.24],[295.43,395.27],[293.0,398.43],[288.96,401.4],[284.31,403.65],[265.09,412.39],[261.23,413.34],[257.4,413.54],[250.32,412.99],[243.61,412.04],[237.15,409.98],[230.07,407.17],[223.78,403.46],[219.54,400.29],[216.7,395.47],[194.64,364.5],[177.43,342.87],[175.21,340.66],[172.58,339.51],[169.12,338.8],[166.08,338.96],[161.84,340.1],[156.78,341.76],[152.53,343.42],[81.46,374.59],[77.43,377.36],[75.82,379.97],[75.0,382.77],[75.82,384.83],[77.43,386.69],[79.45,388.55],[116.69,418.56],[205.38,487.93]],"mexico":[[193.71,144.6],[354.99,166.99],[407.3,173.85],[462.4,178.81],[488.96,182.12],[557.48,191.79],[676.89,209.53],[701.51,214.49],[705.72,216.14],[707.94,218.04],[709.07,221.1],[709.36,223.91],[704.87,253.47],[705.44,256.07],[706.85,258.43],[719.42,265.24],[723.06,267.14],[725.0,270.2],[725.0,273.05],[722.5,291.49],[718.57,308.03],[712.43,324.06],[705.44,338.49],[650.62,431.52],[584.89,534.73],[580.68,541.8],[580.11,546.05],[580.97,549.61],[582.95,552.22],[602.51,564.24],[604.45,566.15],[604.73,569.2],[603.36,571.81],[600.01,574.86],[563.34,602.52],[559.7,604.17],[556.63,604.62],[553.84,603.67],[547.13,599.41],[546.0,596.61],[546.0,590.95],[562.77,460.08],[562.54,456.07],[560.83,452.32],[558.33,449.21],[554.41,446.4],[534.84,434.33],[527.85,427.97],[523.64,423.71],[519.44,415.69],[514.95,403.87],[510.51,396.8],[505.45,391.84],[499.87,388.29],[492.31,384.98],[431.87,375.76],[425.16,373.66],[421.01,370.1],[419.02,367.75],[417.37,364.44],[409.52,340.14],[407.02,335.38],[403.1,330.92],[393.31,325.01],[348.56,300.91],[335.66,295.5],[316.95,290.99],[167.01,269.25],[163.93,268.09],[162.28,266.19],[160.86,263.13],[160.58,259.13],[158.08,220.6],[155.0,193.95],[153.87,190.89],[151.65,188.73],[148.58,187.33],[144.65,187.78],[140.45,191.59],[135.11,199.61],[132.04,201.96],[128.4,203.36],[124.24,203.16],[119.47,201.01],[113.89,198.4],[108.55,196.75],[83.13,193.95],[78.92,192.54],[76.94,190.89],[75.28,187.78],[75.0,184.73],[76.65,177.41],[80.29,167.74],[85.07,159.68],[92.06,150.01],[100.19,143.39],[110.54,138.18],[120.03,135.63],[129.25,135.38],[142.67,137.03],[193.71,144.6]],"brazil":[[234.54,511.57],[270.91,652.31],[274.76,667.14],[278.61,675.69],[287.32,688.66],[291.81,692.31],[298.25,694.93],[304.62,695.0],[311.63,693.55],[315.3,691.62],[326.66,681.14],[337.71,668.86],[342.07,665.62],[347.75,663.62],[353.5,663.28],[361.83,665.97],[379.51,676.8],[393.53,682.59],[403.95,685.28],[413.48,686.52],[422.19,687.0],[435.01,685.48],[444.8,683.35],[456.86,679.0],[468.16,672.45],[479.34,663.69],[488.37,654.18],[495.5,644.04],[500.81,634.52],[505.23,623.84],[522.53,566.67],[529.85,537.98],[542.35,489.3],[557.63,427.1],[584.47,325.18],[594.13,288.42],[600.95,262.63],[604.11,250.63],[605.31,243.05],[604.55,235.95],[602.78,231.12],[598.93,225.39],[591.98,220.57],[583.9,217.19],[572.22,214.78],[537.3,207.88],[523.66,206.36],[515.2,206.98],[504.85,208.43],[495.06,211.33],[486.41,216.43],[478.2,221.26],[469.99,228.02],[462.1,236.77],[451.3,250.5],[415.82,298.42],[394.98,327.94],[377.24,353.17],[357.79,378.69],[347.56,392.89],[339.67,403.58],[334.17,409.65],[328.05,413.44],[319.34,416.55],[309.74,417.79],[295.34,417.44],[285.74,415.86],[278.1,413.44],[271.29,410.34],[259.6,404.0],[253.79,398.82],[249.94,393.72],[246.22,386.34],[243.38,376.34],[239.84,361.59],[236.94,348.07],[233.02,323.25],[232.26,312.97],[232.45,302.56],[234.92,294.63],[238.89,290.63],[241.67,289.18],[245.14,288.01],[249.88,287.46],[254.87,288.7],[260.11,290.77],[274.25,301.52],[279.94,304.9],[284.36,306.77],[289.09,307.73],[293.45,308.08],[298.25,307.45],[304.81,305.04],[312.58,298.63],[316.94,292.15],[319.27,285.04],[319.65,278.98],[318.7,271.94],[316.05,266.42],[309.99,257.53],[304.5,252.01],[285.11,233.05],[275.14,221.6],[268.25,211.4],[263.27,197.74],[259.41,180.78],[257.65,170.5],[256.7,161.26],[257.33,153.68],[260.3,148.51],[262.76,145.4],[266.74,144.09],[270.02,143.27],[274.25,143.96],[279.18,145.95],[302.86,172.92],[323.31,195.54],[326.85,198.43],[334.49,203.74],[341.5,206.84],[347.31,208.57],[354.44,209.74],[361.07,210.5],[368.71,210.57],[380.71,208.84],[389.87,205.88],[399.59,200.29],[409.44,192.29],[414.93,185.05],[420.81,176.92],[436.53,152.16],[453.89,123.06],[473.53,91.27],[474.79,87.55],[475.11,83.13],[473.91,78.79],[471.63,74.1],[467.28,70.03],[456.99,64.65],[442.02,59.21],[411.65,47.76],[405.71,46.17],[398.14,45.0],[382.86,46.65],[369.47,48.93],[340.17,55.21],[330.45,58.52],[311.13,66.58],[301.59,70.79],[278.86,83.06],[269.83,89.2],[262.13,96.1],[254.3,103.34],[247.92,110.86],[242.24,119.68],[237.06,130.92],[232.89,142.92],[226.33,167.4],[219.19,198.23],[214.46,227.26],[206.31,258.22],[201.07,281.53],[196.52,297.66],[195.01,309.39],[194.69,325.32],[195.58,344.21],[197.66,358.35],[201.2,374.83],[207.32,398.55],[225.19,473.71],[234.54,511.57]],"abudhabi":[[396.22,409.15],[486.62,396.9],[491.4,395.3],[494.99,391.57],[497.47,386.41],[497.93,381.29],[496.59,375.92],[482.12,314.4],[479.63,307.69],[476.23,302.73],[470.58,297.99],[465.85,295.64],[440.22,287.67],[431.7,283.35],[425.36,279.03],[419.63,273.61],[415.32,268.53],[412.11,264.3],[408.21,254.98],[406.8,247.89],[406.68,240.17],[408.25,231.02],[411.15,221.41],[417.53,196.95],[419.78,178.82],[420.01,165.94],[418.87,154.77],[411.8,97.37],[407.1,61.2],[406.19,57.0],[405.31,53.6],[402.6,50.12],[397.98,46.3],[395.19,45.34],[391.98,45.0],[388.92,45.5],[385.64,46.8],[383.19,49.28],[381.71,51.59],[379.83,55.45],[374.22,72.15],[368.87,96.32],[323.65,231.15],[306.01,283.35],[296.23,312.47],[288.89,335.05],[281.26,363.08],[265.1,414.69],[249.71,461.18],[247.91,465.72],[247.45,469.12],[247.91,471.09],[249.63,473.06],[253.53,473.19],[267.93,471.47],[271.1,471.47],[273.66,474.53],[281.83,505.58],[283.51,511.41],[288.67,524.3],[293.36,533.53],[303.48,548.26],[315.02,561.68],[329.53,574.15],[391.06,622.7],[405.08,634.07],[416.12,641.96],[430.86,651.48],[443.5,658.79],[463.94,668.65],[482.61,677.04],[510.38,690.17],[522.26,694.96],[528.94,695.0],[536.01,693.57],[542.46,689.84],[545.9,686.52],[548.19,683.25],[550.48,678.42],[551.78,673.72],[552.55,669.36],[551.93,662.14],[550.48,656.9],[548.42,651.82],[545.4,647.29],[541.13,643.18],[535.82,639.61],[530.2,637.13],[522.03,635.96],[457.25,630.76],[449.27,629.71],[445.83,628.95],[442.2,627.65],[407.41,605.91],[403.9,603.27],[401.53,600.25],[399.01,593.79],[390.91,555.89],[391.44,552.91],[393.32,550.9],[396.14,550.1],[425.02,545.78],[428.42,544.35],[430.59,543.22],[432.88,540.87],[435.18,536.55],[435.71,531.22],[435.79,504.99],[433.69,500.5],[431.09,497.82],[427.16,496.31],[421.77,495.13],[417.07,494.5],[410.81,494.29],[404.62,494.75],[344.35,504.03],[339.16,504.41],[332.55,504.15],[326.1,503.02],[321.66,501.55],[318.72,498.87],[315.67,495.59],[299.13,465.55],[290.58,451.74],[288.78,447.67],[287.52,442.26],[287.1,437.64],[287.02,432.1],[287.94,428.33],[290.16,425.6],[292.91,424.22],[299.21,423.08],[396.22,409.15]],"imola":[[487.35,241.28],[475.83,241.12],[403.92,225.67],[378.26,222.96],[363.3,222.8],[288.27,229.52],[251.42,238.25],[246.84,241.28],[244.65,243.99],[244.0,246.5],[241.3,258.26],[239.31,261.99],[234.72,265.17],[200.82,282.43],[195.76,288.09],[141.06,423.69],[140.41,427.31],[140.5,431.71],[146.29,452.78],[146.29,456.12],[144.4,460.2],[142.3,463.0],[77.53,518.41],[75.67,521.6],[75.0,525.37],[75.82,529.42],[78.2,534.25],[81.3,536.89],[84.81,537.95],[90.21,537.87],[194.64,524.31],[206.53,523.49],[224.1,524.47],[236.83,526.32],[254.18,529.62],[271.97,532.88],[281.19,534.69],[287.01,533.51],[291.42,531.31],[297.13,525.76],[302.86,515.39],[311.66,493.42],[313.71,483.79],[314.36,472.86],[312.65,461.74],[299.91,401.44],[300.08,397.67],[301.88,393.35],[309.3,381.67],[319.0,366.58],[321.84,365.13],[325.61,364.73],[328.22,365.87],[342.58,371.65],[347.0,372.24],[497.59,371.26],[499.53,372.08],[501.41,376.56],[502.81,380.49],[504.44,381.48],[507.62,381.56],[567.75,356.79],[575.34,352.55],[600.39,335.25],[614.72,322.21],[628.61,308.25],[662.51,275.0],[669.37,270.13],[676.82,266.47],[721.18,246.78],[724.52,243.52],[725.0,238.37],[724.1,234.28],[710.72,205.98],[707.6,203.31],[704.17,202.25],[699.36,202.05],[695.51,203.03],[635.89,225.67],[614.72,233.85],[603.2,238.01],[593.16,240.29],[586.39,241.51],[487.35,241.28]],"netherlands":[[154.39,346.12],[227.25,170.0],[254.94,105.36],[261.21,98.22],[269.7,94.21],[278.96,93.02],[287.54,94.8],[295.62,100.3],[301.24,107.22],[304.24,115.85],[304.47,125.44],[296.43,144.11],[273.33,200.34],[265.88,226.52],[262.89,253.82],[264.48,279.41],[262.07,289.82],[256.4,296.81],[245.05,306.03],[232.84,310.87],[199.11,324.03],[190.44,330.58],[188.08,340.25],[187.76,348.95],[191.25,357.8],[197.79,364.12],[205.96,367.47],[218.49,367.17],[280.27,347.46],[308.96,342.11],[333.7,341.29],[355.58,342.93],[376.28,346.42],[391.03,350.96],[415.18,356.09],[437.47,358.03],[453.27,354.75],[472.29,349.77],[495.17,338.24],[522.04,320.69],[540.25,312.06],[556.45,307.37],[577.83,304.99],[594.67,305.37],[664.9,309.68],[681.1,313.4],[696.13,320.91],[706.8,330.06],[713.65,339.8],[720.32,350.96],[723.87,363.83],[725.0,377.44],[723.73,390.75],[719.83,404.29],[711.38,419.02],[679.11,463.05],[667.21,482.61],[640.25,540.85],[627.31,545.38],[611.33,547.24],[596.03,546.5],[578.01,543.45],[559.31,537.05],[539.29,527.46],[519.45,513.33],[507.2,499.72],[504.97,491.39],[506.93,482.61],[514.55,471.6],[525.45,464.61],[541.47,458.73],[568.84,454.42],[595.22,447.8],[619.28,438.58],[632.58,429.21],[637.62,417.97],[638.3,405.7],[633.98,393.5],[622.86,382.42],[612.88,378.93],[560.99,372.6],[508.74,372.75],[453.22,379.45],[406.29,391.27],[377.23,400.42],[345.19,412.32],[314.55,425.34],[289.58,440.14],[280.41,444.08],[273.87,442.82],[267.74,434.34],[261.21,421.99],[252.22,416.41],[240.69,415.97],[229.43,421.25],[223.44,429.35],[220.67,438.06],[223.44,455.76],[248.59,602.58],[249.13,612.4],[246.36,622.44],[241.91,630.92],[237.6,636.35],[226.93,643.56],[215.54,646.17],[167.24,646.98],[157.39,646.46],[143.05,644.23],[128.2,639.4],[115.99,633.82],[99.74,621.03],[89.16,606.89],[81.95,594.77],[76.68,578.41],[75.0,564.05],[76.5,540.62],[80.95,523.96],[150.63,354.9],[154.39,346.12]],"saudi":[[433.46,545.5],[400.24,448.41],[398.34,446.76],[396.71,446.55],[389.12,449.02],[387.07,448.52],[385.24,447.6],[383.82,445.68],[383.04,443.0],[384.38,435.49],[389.97,418.03],[390.56,415.49],[390.68,410.45],[388.48,396.64],[381.04,353.05],[380.4,344.2],[378.84,341.29],[371.13,338.24],[367.49,335.96],[364.64,333.49],[360.76,327.32],[358.68,321.15],[358.34,313.64],[359.39,307.81],[361.03,304.43],[366.35,296.34],[368.27,291.93],[369.18,287.34],[368.62,280.33],[365.86,268.48],[362.51,263.23],[360.39,261.45],[355.29,257.9],[352.73,255.99],[350.82,253.86],[349.41,248.48],[349.82,225.71],[350.6,220.75],[355.51,214.45],[359.39,211.75],[368.54,208.49],[371.18,207.07],[374.35,201.98],[376.06,191.9],[377.62,183.89],[381.16,172.47],[383.8,165.38],[385.7,153.62],[386.33,145.66],[385.99,136.71],[384.8,101.4],[382.11,55.76],[381.06,52.82],[378.43,49.12],[375.06,46.81],[369.88,45.0],[364.69,45.81],[361.25,47.6],[357.73,49.99],[354.83,55.48],[353.39,63.01],[353.73,69.78],[355.07,75.25],[362.86,88.87],[367.03,95.3],[370.49,104.68],[371.84,110.59],[372.81,118.86],[372.54,125.26],[371.76,132.72],[369.18,140.54],[366.17,147.19],[362.07,155.14],[358.73,162.78],[357.27,171.16],[357.36,176.88],[357.36,181.29],[355.78,184.63],[353.39,187.49],[349.63,189.61],[341.53,192.0],[335.82,196.83],[333.15,201.19],[332.18,204.89],[330.86,212.27],[330.52,220.7],[330.52,226.42],[331.06,232.83],[332.08,239.66],[334.91,248.19],[342.23,263.92],[347.19,275.97],[349.77,286.21],[350.9,295.34],[350.53,304.14],[350.02,309.52],[350.12,321.07],[350.78,324.36],[351.53,329.66],[354.66,339.16],[357.46,345.18],[361.27,351.61],[367.47,361.48],[371.64,368.96],[374.79,376.92],[378.08,388.92],[379.13,397.79],[379.65,407.77],[379.38,416.9],[378.33,425.23],[376.38,436.33],[375.18,440.19],[374.08,443.71],[374.33,446.89],[375.23,450.12],[377.65,453.66],[380.26,456.0],[386.43,461.04],[389.48,464.79],[392.31,469.97],[396.44,488.98],[396.49,493.89],[394.63,499.56],[390.63,507.07],[377.43,532.87],[374.23,540.83],[371.67,550.05],[370.71,556.56],[370.32,562.44],[371.47,575.91],[374.91,589.3],[377.16,597.46],[379.43,605.31],[382.38,615.05],[386.92,625.4],[393.58,637.63],[398.29,644.33],[404.2,652.05],[412.47,661.58],[423.18,671.11],[433.24,677.88],[454.28,692.58],[460.08,695.0],[463.94,693.92],[467.33,691.77],[469.48,688.04],[469.29,684.1],[463.77,659.5],[453.2,608.67],[447.71,589.19],[442.61,573.1],[433.46,545.5]],"miami":[[395.78,312.89],[484.59,368.34],[486.1,372.43],[485.45,376.23],[482.81,381.29],[463.9,395.34],[458.01,401.7],[456.07,413.15],[458.01,425.28],[456.15,440.25],[451.61,449.83],[434.47,463.55],[414.95,470.29],[402.27,473.13],[383.58,473.56],[368.9,470.91],[351.72,463.21],[264.56,410.94],[252.05,403.38],[245.65,402.27],[238.29,401.7],[230.93,402.66],[221.58,405.6],[213.71,410.02],[205.66,416.52],[197.26,422.11],[186.27,423.93],[176.36,423.02],[165.71,417.87],[155.71,408.92],[146.63,399.92],[136.41,394.86],[125.9,392.74],[113.21,394.96],[101.57,398.62],[91.79,403.24],[84.56,409.93],[77.68,420.71],[75.0,432.17],[75.3,441.74],[77.42,448.19],[80.93,452.62],[88.07,456.52],[96.68,456.52],[107.33,454.16],[119.23,454.21],[143.77,459.41],[188.69,468.51],[235.13,467.16],[306.02,464.22],[325.63,470.43],[349.86,479.1],[369.38,485.98],[395.61,494.31],[422.87,498.88],[450.27,499.22],[479.05,494.5],[505.32,485.26],[565.35,463.36],[600.18,450.07],[616.98,442.61],[659.91,419.8],[683.02,405.02],[687.65,398.76],[686.14,393.56],[681.94,389.52],[671.33,383.12],[663.93,377.58],[659.91,369.49],[659.04,361.07],[661.42,350.82],[667.14,345.09],[673.84,342.39],[693.71,343.6],[703.62,342.25],[707.99,339.41],[714.66,332.91],[725.0,314.43],[724.31,310.39],[719.29,308.36],[714.74,304.99],[714.57,298.11],[722.79,271.59],[722.14,267.06],[718.42,264.03],[697.73,262.15],[398.98,251.57],[160.78,240.78],[153.81,242.61],[152.34,248.1],[154.72,254.93],[162.99,262.25],[175.84,272.02],[189.64,279.44],[200.9,282.28],[210.81,281.46],[222.93,277.08],[251.19,263.79],[267.03,259.56],[286.5,257.87],[305.72,260.57],[323.85,268.12],[395.78,312.89]],"qatar":[[221.33,438.43],[153.21,313.71],[126.48,265.3],[124.71,256.25],[125.86,246.85],[129.26,239.56],[134.61,234.22],[142.82,229.38],[152.23,227.91],[161.11,229.53],[229.11,270.79],[235.6,272.6],[244.17,272.89],[254.03,270.0],[261.98,262.56],[266.53,254.44],[267.63,246.22],[266.09,186.94],[267.06,178.87],[269.49,171.92],[272.76,165.26],[277.44,159.78],[374.42,52.29],[379.77,47.94],[388.03,45.64],[395.98,45.0],[404.06,47.1],[410.38,50.82],[439.19,78.33],[442.41,84.16],[443.87,92.13],[443.56,99.09],[441.62,105.89],[437.42,112.01],[374.42,181.22],[371.68,186.26],[371.5,191.74],[372.96,196.59],[376.05,200.16],[380.6,203.05],[386.88,203.88],[391.25,202.61],[396.95,200.01],[507.01,155.96],[514.21,155.18],[523.09,156.45],[530.55,159.83],[536.39,165.7],[539.96,173.14],[541.38,180.48],[541.25,186.94],[539.13,193.11],[534.62,200.26],[530.86,203.78],[522.29,210.78],[512.75,221.74],[504.8,232.76],[498.17,244.5],[492.82,258.26],[489.78,267.65],[486.51,284.15],[483.77,291.2],[479.08,297.17],[474.05,300.94],[467.29,303.97],[404.73,319.19],[399.25,322.42],[395.05,326.14],[392.62,332.31],[391.65,338.28],[392.75,347.29],[399.56,356.2],[411.22,367.99],[429.2,381.7],[447.98,392.37],[467.07,399.17],[486.15,403.23],[504.8,404.85],[525.16,402.89],[618.65,392.52],[627.22,394.33],[637.12,399.02],[644.72,404.85],[651.83,414.54],[673.52,454.87],[675.29,461.82],[675.29,468.14],[674.32,474.74],[669.81,483.16],[636.15,537.49],[631.9,541.55],[625.63,544.44],[619.14,546.4],[610.39,546.06],[502.9,524.37],[495.25,524.37],[487.65,526.63],[481.2,531.03],[476.65,536.66],[401.81,682.23],[395.8,689.18],[389.0,693.38],[379.15,695.0],[371.68,694.17],[364.39,691.08],[356.97,684.62],[221.33,438.43]],"azerbaijan":[[672.97,252.43],[720.55,232.04],[723.07,230.03],[724.68,227.08],[725.0,224.23],[724.2,220.11],[711.71,193.25],[698.18,163.4],[684.71,132.73],[682.48,131.26],[679.64,130.76],[634.13,148.98],[578.45,170.53],[502.5,204.68],[437.02,234.67],[431.4,237.87],[430.27,244.76],[454.6,304.23],[454.36,308.16],[437.75,315.76],[404.9,329.79],[382.59,343.22],[369.91,351.24],[364.45,357.96],[364.58,365.06],[367.88,373.53],[366.75,377.47],[362.55,381.66],[319.84,414.18],[289.86,437.25],[277.27,446.53],[273.09,449.8],[269.15,449.94],[265.91,446.01],[249.54,399.1],[246.94,391.75],[244.21,390.73],[240.14,392.1],[234.83,389.15],[230.52,387.11],[222.54,387.56],[217.74,386.93],[215.41,385.03],[214.21,380.29],[211.2,370.97],[208.04,366.4],[203.44,366.85],[184.55,373.64],[167.56,380.53],[129.92,398.25],[102.3,414.89],[95.44,420.09],[91.4,428.07],[84.06,453.04],[75.4,483.39],[75.0,489.12],[78.7,551.88],[78.32,557.83],[79.85,560.99],[143.34,594.36],[154.49,599.6],[166.89,605.79],[175.39,609.24],[179.83,608.22],[183.93,601.99],[192.24,586.8],[201.13,570.03],[209.49,554.06],[211.77,551.01],[257.77,509.13],[264.36,503.01],[268.3,493.76],[273.36,462.29],[275.02,455.43],[278.69,450.09],[286.54,444.25],[349.28,395.76],[360.8,387.39],[367.8,383.45],[388.32,373.96],[432.79,355.04],[475.63,336.26],[517.96,318.19],[550.73,304.12],[624.61,272.65],[672.97,252.43]],"vegas":[[562.25,622.07],[580.52,601.52],[584.4,597.2],[587.17,592.51],[588.1,586.94],[585.74,581.92],[581.9,578.71],[574.98,576.09],[568.39,575.02],[562.04,575.39],[556.11,577.16],[543.11,584.98],[531.09,596.9],[526.47,599.97],[516.36,602.22],[510.91,602.11],[501.04,598.78],[495.58,595.76],[490.52,591.44],[482.11,580.07],[478.71,570.44],[476.38,285.08],[478.14,280.76],[481.57,278.58],[540.42,279.69],[558.07,279.58],[567.29,277.44],[571.01,274.23],[581.42,264.08],[586.1,257.47],[589.68,250.35],[592.27,244.11],[593.82,235.99],[594.89,226.32],[594.6,220.64],[591.38,218.61],[582.85,217.65],[579.87,215.77],[577.3,211.82],[576.29,205.65],[576.77,201.15],[585.03,186.87],[586.46,183.07],[589.91,176.5],[588.66,169.6],[581.95,165.17],[569.49,163.77],[476.17,161.4],[441.71,156.38],[430.32,150.89],[417.74,137.93],[406.95,116.34],[390.43,77.51],[379.82,66.33],[368.81,58.77],[357.63,54.63],[340.13,48.99],[320.28,45.0],[317.56,45.66],[314.97,47.66],[312.94,54.45],[310.89,59.1],[290.28,99.36],[277.46,123.32],[270.79,135.46],[263.93,147.16],[252.09,167.71],[239.93,195.36],[233.49,216.25],[226.42,240.27],[221.68,257.47],[218.13,274.6],[215.3,291.94],[212.29,317.37],[211.55,332.21],[210.77,349.89],[211.1,397.75],[211.28,425.1],[211.37,445.84],[207.4,554.24],[206.21,609.86],[206.18,637.61],[205.11,671.05],[206.98,673.74],[209.55,674.63],[215.69,674.52],[220.22,676.25],[230.42,686.47],[239.33,691.57],[251.2,693.89],[302.87,695.0],[370.45,694.19],[426.06,694.52],[453.22,694.15],[475.46,691.05],[498.71,686.62],[504.77,683.85],[509.66,680.79],[513.56,677.1],[562.25,622.07]]};
```

## js/data/tracks.js

```js
// ===== 文件: js/data/tracks.js =====
// 长度/圈数取通常完整赛程；基准圈速、气象与策略系数是游戏化参数。
const raw = [ ['bahrain','巴林','巴林','Sakhir',5.412,57,15,92,1.3,.35,22,80,420,3,31,.06,.25,'traction','重刹与后轮牵引，夜间赛温度逐渐下降。'], ['saudi','沙特阿拉伯','沙特阿拉伯','Jeddah',6.174,50,27,91,0.8,.4,23,80,450,3,30,.05,.65,'fast','高速街道，墙边容错小，安全车概率较高。'], ['australia','澳大利亚','澳大利亚','Melbourne',5.278,58,14,81,1,.4,22,80,430,4,28,.25,.55,'fast','高速变向和路肩，轮胎温度需要管理。'], ['imola','艾米利亚-罗马涅','意大利','Imola',4.909,63,19,78,1,.78,27,80,550,1,28,.3,.45,'downforce','狭窄而难超车，进站损失大，强调排位。'], ['miami','迈阿密','美国','Miami',5.412,57,19,90,1.1,.48,21,80,410,3,38,.2,.4,'traction','炎热路面与低速组合弯，冷却和牵引关键。'], ['spain','西班牙','西班牙','Barcelona',4.657,66,14,79,1.5,.55,23,80,450,2,36,.15,.25,'downforce','高速长弯持续压迫轮胎，气动效率与耐久并重。'], ['monaco','摩纳哥','摩纳哥','Monte Carlo',3.337,78,19,75,.6,.98,20,60,310,1,27,.2,.75,'street','几乎无法超车，设定、排位与进站窗口决定比赛。'], ['azerbaijan','阿塞拜疆','阿塞拜疆','Baku',6.003,51,20,104,.75,.3,22,80,440,2,29,.1,.65,'low','超长直道与古城窄弯，低阻和制动同样重要。'], ['canada','加拿大','加拿大','Montreal',4.361,70,14,75,1,.38,19,80,360,3,26,.32,.6,'traction','重刹、路肩和墙边出口，制动系统压力大。'], ['britain','英国','英国','Silverstone',5.891,52,18,89,1.4,.45,23,80,460,2,26,.4,.35,'downforce','高速弯链与侧向载荷，风雨变化常影响策略。'], ['austria','奥地利','奥地利','Spielberg',4.318,71,10,68,1.1,.28,20,80,400,3,30,.32,.4,'fast','短圈、海拔与严格赛道限制，交通密集。'], ['france','法国','法国','Le Castellet',5.842,53,15,95,1.25,.48,24,80,460,2,39,.08,.2,'downforce','长直道和高速弯相连，前胎温度不容忽视。'], ['hungary','匈牙利','匈牙利','Budapest',4.381,70,14,82,1.2,.85,21,80,410,2,37,.25,.25,'downforce','连续中低速弯，高下压力；脏空气损失明显。'], ['belgium','比利时','比利时','Spa-Francorchamps',7.004,44,19,108,1.2,.3,23,80,470,2,23,.5,.5,'fast','单圈最长，气候多变，高速与低阻需要折中。'], ['netherlands','荷兰','荷兰','Zandvoort',4.259,72,14,75,1.3,.85,21,60,340,2,27,.35,.5,'downforce','倾斜弯与狭窄赛道，前轮负荷高。'], ['italy','意大利','意大利','Monza',5.793,53,11,83,.8,.22,24,80,470,2,31,.2,.35,'low','低下压力与长直道，DRS 和刹车效率突出。'], ['singapore','新加坡','新加坡','Singapore',4.94,62,19,97,1.15,.8,28,60,410,3,34,.4,.8,'street','闷热夜赛，慢弯频繁，安全车可能改写局面。'], ['japan','日本','日本','Suzuka',5.807,53,18,91,1.4,.65,23,80,460,2,27,.45,.4,'downforce','高速 S 弯，前轴响应、节奏与轮胎管理关键。'], ['usa','美国','美国','Austin',5.513,56,20,98,1.35,.4,22,80,420,2,33,.25,.4,'downforce','颠簸和连续变向，综合性能考验。'], ['mexico','墨西哥','墨西哥','Mexico City',4.304,71,17,79,.85,.45,22,80,430,3,32,.18,.45,'traction','高海拔冷却困难，低速抓地与动力部署重要。'], ['brazil','圣保罗','巴西','São Paulo',4.309,71,15,74,1.15,.25,21,80,410,2,29,.45,.6,'traction','短圈、起伏和常见阵雨，安全车窗口价值高。'], ['abudhabi','阿布扎比','阿联酋','Yas Island',5.281,58,16,89,.9,.4,22,80,420,2,30,.04,.25,'traction','黄昏到夜间，长直道与中低速弯相连。'], ['qatar','卡塔尔','卡塔尔','Lusail',5.419,57,16,85,1.5,.55,25,80,500,1,35,.06,.25,'downforce','高速长弯和高胎压负荷，轮胎过热风险大。'], ['vegas','拉斯维加斯','美国','Las Vegas',6.201,50,17,96,.65,.25,22,80,430,2,16,.08,.65,'low','低温夜赛与超长直道，暖胎困难。'], ['china','中国','中国','Shanghai',5.451,56,16,94,1.25,.38,23,80,460,2,25,.35,.35,'traction','大半径弯加超长后直道，左前胎和牵引力关键。'] ];
export const TRACKS = Object.fromEntries(raw.map(([id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes])=>[id,{
  id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes
}]));
export const SCHEDULES = {
  2022:'bahrain:03-20 saudi:03-27 australia:04-10 imola:04-24 miami:05-08 spain:05-22 monaco:05-29 azerbaijan:06-12 canada:06-19 britain:07-03 austria:07-10 france:07-24 hungary:07-31 belgium:08-28 netherlands:09-04 italy:09-11 singapore:10-02 japan:10-09 usa:10-23 mexico:10-30 brazil:11-13 abudhabi:11-20', 2023:'bahrain:03-05 saudi:03-19 australia:04-02 azerbaijan:04-30 miami:05-07 monaco:05-28 spain:06-04 canada:06-18 austria:07-02 britain:07-09 hungary:07-23 belgium:07-30 netherlands:08-27 italy:09-03 singapore:09-17 japan:09-24 qatar:10-08 usa:10-22 mexico:10-29 brazil:11-05 vegas:11-18 abudhabi:11-26', 2024:'bahrain:03-02 saudi:03-09 australia:03-24 japan:04-07 china:04-21 miami:05-05 imola:05-19 monaco:05-26 canada:06-09 spain:06-23 austria:06-30 britain:07-07 hungary:07-21 belgium:07-28 netherlands:08-25 italy:09-01 azerbaijan:09-15 singapore:09-22 usa:10-20 mexico:10-27 brazil:11-03 vegas:11-23 qatar:12-01 abudhabi:12-08', 2025:'australia:03-16 china:03-23 japan:04-06 bahrain:04-13 saudi:04-20 miami:05-04 imola:05-18 monaco:05-25 spain:06-01 canada:06-15 austria:06-29 britain:07-06 belgium:07-27 hungary:08-03 netherlands:08-31 italy:09-07 azerbaijan:09-21 singapore:10-05 usa:10-19 mexico:10-26 brazil:11-09 vegas:11-22 qatar:11-30 abudhabi:12-07'
};
export const SPRINTS = {
  2022:['imola','austria','brazil'],2023:['azerbaijan','austria','belgium','qatar','usa','brazil'],2024:['china','miami','austria','usa','brazil','qatar'],2025:['china','miami','belgium','usa','brazil','qatar']
};
export function trackForYear(id,year) {
  const t={
    ...TRACKS[id]
  };
  if(id==='spain'&&year===2022) {
    t.length=4.675;
    t.corners=16;
    t.baseTime=82;
  }
  if(id==='singapore'&&year===2022) {
    t.length=5.063;
    t.laps=61;
    t.corners=23;
    t.baseTime=103;
    t.drs=3;
  }
  if(id==='singapore'&&year>=2024)t.drs=4;
  if(id==='australia'&&year===2022)t.drs=3;
  return t;
}
```

## js/core/ai.js

```js
// ===== 文件: js/core/ai.js =====
import {
  PARTS, partQuota
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  startProject
}
from './rnd.js';
import {
  chance, choose, between
}
from './rng.js';
import {
  transferDriver, freeReplacement, seedAIYouth
}
from './drivers.js';
import {
  spend, income
}
from './finance.js';
import {
  news
}
from './helpers.js';
export function aiManagement(s) {
  for(const t of s.teams) {
    if(t.id===s.player.teamId)continue;
    seedAIYouth(s,t);
    const f=s.finance[t.id],spending=t.personality==='吝啬'?22:t.personality==='激进'?8:t.personality==='技术优先'?12:18;
    if(f.cash>spending&&t.projects.filter(p=>p.status==='researching').length<2) {
      const options=PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')&&!t.projects.some(x=>x.part===p.id&&x.status==='researching'));
      if(options.length) {
        const focused=options.filter(p=>t.personality==='技术优先'?p.department==='aero':t.personality==='稳健'?p.department==='reliability':false);
        const part=choose(s,focused.length?focused:options);
        try{
          startProject(s,part.id,s.calendar.round>s.calendar.events.length*.7&&chance(s,.5)?'research':'development',2,t.id);
        }
        catch(e) {
          if(!(e instanceof Error))throw e;
        }
      }
    }
    const store=s.parts[t.id];
    for(let i=store.stock.length-1; i>=0; i--) {
      const spec=store.stock[i];
      const slot=store.cars.findIndex(c=>c[spec.part].level<spec.level);
      if(slot>=0) {
        const c=store.cars[slot][spec.part];
        c.level=spec.level;
        c.gain=spec.gain;
        c.risk=spec.risk;
        store.stock.splice(i,1);
      }
    }
    for(const c of store.cars)for(const p of PARTS)if(c[p.id].wear>67&&f.cash>p.cost*.3) {
      spend(s,t,p.cost*.23,'AI 更换磨损部件',true);
      c[p.id].wear=0;
      c[p.id].used++;
      if(c[p.id].used>partQuota(p,s.season.year))t.gridPenalties[store.cars.indexOf(c)]+=10;
    }
  }
}
export function aiRaceDecision(s,car,track) {
  const r=s.race,difficulty=DIFFICULTIES[s.settings.difficulty];
  const error=chance(s,s.settings.difficulty==='easy'?.2:s.settings.difficulty==='hard'?.015:.07);
  const remain=r.totalLaps-r.lap;
  const wet=r.wetness;
  const weatherTyre=wet>.7?'W':wet>.23?'I':null;
  const wrong=weatherTyre?car.compound!==weatherTyre:['I','W'].includes(car.compound);
  let pit=wrong&&!error&&remain>2;
  let target=weatherTyre||'H';
  const threshold=error?94:73+(difficulty.ai-1)*-10;
  if(car.tyreWear>threshold&&remain>4) {
    pit=true;
    if(!weatherTyre)target=remain<16?'S':remain<27?'M':'H';
  }
  if(!r.sprint&&!weatherTyre&&car.usedDry.length<2&&remain<=Math.max(5,Math.floor(r.totalLaps*.18))) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&car.stops<2&&remain<8) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(r.control!=='GREEN'&&!error&&car.tyreAge>10&&remain>10) {
    pit=true;
    target=weatherTyre||'H';
  }
  if(pit) {
    const stock=s.calendar.weekend.tyres[car.driverId];
    if(stock[target]<=0) {
      const alternatives=weatherTyre?['I','W']:['H','M','S'];
      target=alternatives.find(k=>stock[k]>0)||null;
    }
    if(target)car.pitRequest=target;
  }
  if(car.tyreWear>85)car.mode='tyres';
  else if(remain<7&&car.fuel>remain*r.fuelPerLap*1.1)car.mode='attack';
  else car.mode=car.fuel<remain*r.fuelPerLap*.94?'fuel':'normal';
  const team=s.teams.find(t=>t.id===car.teamId);
  if(team.personality==='激进'&&car.tyreWear<55&&remain<15)car.mode='attack';
  if(team.personality==='稳健'&&car.tyreWear>65)car.mode='tyres';
  car.engine=car.tyreWear>95?'save':'normal';
}
export function aiTransfers(s) {
  for(const t of s.teams.filter(t=>t.id!==s.player.teamId)) {
    for(let slot=0; slot<2; slot++) {
      const d=s.drivers.find(d=>d.id===t.drivers[slot]);
      if(d.contract.years>0&&!d.retired)continue;
      const free=s.drivers.filter(x=>!x.teamId&&!x.academy&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace);
      const rival=s.drivers.filter(x=>x.teamId&&x.teamId!==t.id&&!x.retired&&x.contract.years<=1&&x.attributes.pace< t.reputation+6).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const youth=s.drivers.filter(x=>x.academy===t.id&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const candidate=youth&&youth.attributes.pace>=74&&chance(s,.25)?youth:rival&&chance(s,.3)?rival:free[0];
      if(candidate&&candidate.attributes.pace>d.attributes.pace+1&&s.finance[t.id].cash>15) {
        const old=candidate.teamId,fee=old?candidate.contract.salary*.65:0;
        spend(s,t,fee,'AI 转会补偿',true);
        if(old)income(s,s.teams.find(x=>x.id===old),fee,'AI 转会收入');
        transferDriver(s,candidate,t,slot,candidate.contract.salary*1.12,2);
        news(s,`${t.name} 在转会窗签下 ${candidate.name}`);
      }
      else if(d.retired) {
        const reserve=freeReplacement(s,t.id,d.id);
        if(reserve)transferDriver(s,reserve,t,slot,reserve.contract.salary,2);
      }
      else{
        d.contract.years=2;
        d.contract.salary*=between(s,1.02,1.1);
      }
    }
  }
}
```

## js/core/calendar.js

```js
// ===== 文件: js/core/calendar.js =====
import {
  SCHEDULES, SPRINTS, trackForYear
}
from '../data/tracks.js';
import {
  sessionsFor
}
from './rules.js';
import {
  advanceRND
}
from './rnd.js';
import {
  dailyFinance
}
from './finance.js';
import {
  developDrivers
}
from './drivers.js';
import {
  aiManagement
}
from './ai.js';
import {
  staffEvents
}
from './staff.js';
import {
  between, chance
}
from './rng.js';
import {
  requireCondition, news, mutable, teamOf
}
from './helpers.js';
export function makeCalendar(year) {
  const reference=Math.min(year,2025);
  return SCHEDULES[reference].split(' ').map((item,i)=> {
    const [track,date]=item.split(':'); return {
      round:i+1,track,date:`${year}-${date}`,sprint:SPRINTS[reference].includes(track),completed:false,result:null
    };
  });
}
export function currentEvent(s) {
  return s.calendar.events[s.calendar.round];
}
export function currentTrack(s) {
  const e=currentEvent(s);
  return e?trackForYear(e.track,Math.min(s.season.year,2025)):null;
}
export function advanceDays(s,days) {
  requireCondition(Number.isInteger(days)&&days>0&&days<=180,'推进天数无效');
  s.calendar.day+=days;
  const dt=new Date(s.calendar.date+'T12:00:00Z');
  dt.setUTCDate(dt.getUTCDate()+days);
  s.calendar.date=dt.toISOString().slice(0,10);
  dailyFinance(s,days);
  developDrivers(s,days);
  advanceRND(s,days);
  const f=s.finance[s.player.teamId];
  if(f.cash<0&&!s.season.gameOver) {
    s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
    news(s,s.season.gameOver,'danger');
  }
}
export function waitDays(s,days=7) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'请先完成当前周末或转会窗');
  const e=currentEvent(s);
  const left=Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000);
  requireCondition(left>2,'距离比赛不足三天，请进入比赛周末');
  advanceDays(s,Math.min(days,left-2));
  aiManagement(s);
  return '工厂与训练已推进';
}
export function enterWeekend(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'当前阶段不能创建比赛周末');
  const e=currentEvent(s);
  requireCondition(e,'本赛季赛历已结束');
  const delta=Math.max(0,Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000)-2);
  if(delta)advanceDays(s,delta);
  aiManagement(s);
  staffEvents(s);
  const w={
    sessions:sessionsFor(s.season.year,e.sprint),index:0,setups:{
    },ideal:{
    },confidence:{
    },grids:{
    },qualifying:null,practice:[],q3:[],strategy:{
    },tyres:{
    },weekendWet:false,weatherStart:chance(s,currentTrack(s).rain)?between(s,.2,.8):0
  };
  for(const t of s.teams) {
    w.setups[t.id]=[[50,50,50,50],[50,50,50,50]];
    w.ideal[t.id]=[0,1].map(()=>[between(s,25,75),between(s,25,75),between(s,25,75),between(s,25,75)]);
    w.confidence[t.id]=[0,1].map(()=>Array.from({
      length:4
    },()=>({
      low:0,high:100,estimate:50
    })));
    for(const [slot,id]of t.drivers.entries()) {
      w.tyres[id]={
        S:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?6:8,M:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?4:3,H:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?3:2,I:4,W:3
      };
      w.strategy[id]={
        start:w.weatherStart>.65?'W':w.weatherStart>.2?'I':'M',pitLap:Math.round(currentTrack(s).laps*.45),secondLap:0,next:'H',backup:'B',rain:'I',auto:false
      };
      const worn=Object.values(s.parts[t.id].cars[slot]).some(x=>x.wear>75);
      if(t.id===s.player.teamId&&worn)news(s,`${s.drivers.find(d=>d.id===id).name} 的部件磨损偏高，本站存在可靠性风险`,'warning');
    }
  }
  s.calendar.weekend=w;
  s.race=null;
  news(s,`抵达${currentTrack(s).name}，${e.sprint?'冲刺':'标准'}周末开始`);
  return '比赛周末已开启';
}
export function changeSetup(s,slot,values) {
  const w=s.calendar.weekend;
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'设定仅能在练习阶段调整');
  requireCondition([0,1].includes(slot)&&Array.isArray(values)&&values.length===4&&values.every(x=>Number.isFinite(x)&&x>=0&&x<=100),'设定参数无效');
  w.setups[s.player.teamId][slot]=values;
  return '赛车设定已更新';
}
export function setStrategy(s,id,plan) {
  const w=s.calendar.weekend;
  requireCondition(w&&!s.race?.running,'比赛开始后请使用实时指令');
  requireCondition(teamOf(s).drivers.includes(id),'不是本队车手');
  requireCondition(['S','M','H','I','W'].includes(plan.start)&&['S','M','H','I','W'].includes(plan.next),'轮胎配方无效');
  requireCondition(Number.isInteger(plan.pitLap)&&plan.pitLap>=1&&plan.pitLap<=currentTrack(s).laps,'进站圈数无效');
  requireCondition(Number.isInteger(plan.secondLap)&&plan.secondLap>=0&&plan.secondLap<=currentTrack(s).laps,'第二次进站圈无效');
  requireCondition(['A','B','C'].includes(plan.backup)&&['I','W'].includes(plan.rain),'备选策略无效');
  w.strategy[id]={
    ...plan,auto:!!plan.auto
  };
  return '策略计划已保存';
}
```

## js/core/car.js

```js
// ===== 文件: js/core/car.js =====
import {
  PARTS, COMPOUNDS, MODES, ENGINES, partQuota
}
from '../data/parts.js';
import {
  SUPPLIERS
}
from '../data/teams.js';
import {
  clamp, teamOf, driverOf, requireCondition, mutable
}
from './helpers.js';
import {
  spend
}
from './finance.js';
import {
  between
}
from './rng.js';
export function initParts(s,t) {
  s.parts[t.id]={
    cars:[0,1].map(()=>Object.fromEntries(PARTS.map(p=>[p.id,{
      level:1,gain:0,wear:0,used:1,risk:0
    }]))),stock:[],production:[]
  };
}
export function performance(s,t,slot=0) {
  const p=t.performance,pu=SUPPLIERS[t.supplier]||{
    power:p,reliability:75
  };
  const v={
    downforce:p,aero:p-1,grip:p+1,suspension:p-2,brakes:p, power:t.custom&&t.type==='factory'?p-2:pu.power,ers:p-1,reliability:t.custom?76:89,tyres:p-1,weight:p
  };
  for(const part of PARTS) {
    const item=s.parts[t.id].cars[slot][part.id];
    v[part.dimension]+=item.gain;
    v.reliability-=item.risk;
  }
  if(t.type==='customer')v.power=pu.power+(s.season.year>=2026?2:0);
  for(const [key,gain]of Object.entries(t.carry||{
  }))if(Object.hasOwn(v,key))v[key]+=gain;
  for(const key of Object.keys(v))v[key]=clamp(v[key],30,99);
  return v;
}
export const WEIGHTS = {
  downforce:{
    downforce:.34,aero:.13,grip:.12,suspension:.08,brakes:.08,power:.09,ers:.05,tyres:.07,weight:.04
  },low:{
    downforce:.08,aero:.32,grip:.08,suspension:.04,brakes:.1,power:.21,ers:.09,tyres:.03,weight:.05
  },street:{
    downforce:.15,aero:.04,grip:.29,suspension:.15,brakes:.17,power:.05,ers:.04,tyres:.06,weight:.05
  },fast:{
    downforce:.22,aero:.24,grip:.1,suspension:.07,brakes:.05,power:.16,ers:.07,tyres:.05,weight:.04
  },traction:{
    downforce:.15,aero:.12,grip:.21,suspension:.09,brakes:.12,power:.15,ers:.06,tyres:.06,weight:.04
  }
};
export function carScore(s,t,slot,track) {
  const v=performance(s,t,slot),w={
    ...WEIGHTS[track.type]
  };
  if(s.season.year>=2026) {
    w.ers+=.13;
    w.power+=.05;
    w.downforce*=.7;
  }
  const sum=Object.values(w).reduce((a,x)=>a+x,0);
  return Object.entries(w).reduce((n,[k,a])=>n+v[k]*a,0)/sum;
} // 圈速基线：评分每差 1 分约 0.075 秒，顶底车差 25–35 分对应 1.9–2.6 秒。
// 车手有效评分每分 0.026 秒；常见队友差 4–20 分对应 0.1–0.52 秒。
export function theoreticalLap(s,t,d,slot,track,qualifying=false) {
  const a=d.attributes;
  const skill=qualifying?a.qualifying*.8+a.pace*.2:a.racePace*.55+a.tyres*.18+a.consistency*.12+a.pace*.15;
  return track.baseTime+(95-carScore(s,t,slot,track))*.075+(95-skill)*.026+(d.fatigue||0)*.002+(75-d.morale)*.0015;
}
export function setupPenalty(setup,ideal) {
  return setup.reduce((sum,v,i)=>sum+Math.max(0,Math.abs(v-ideal[i])-5),0)*.008;
}
export function tyreState(car,track,driver,weather,mode='normal',trait=false) {
  const c=COMPOUNDS[car.compound],m=MODES[mode],wet=['I','W'].includes(car.compound);
  const life=c.life/track.wear*(.78+driver.attributes.tyres*.003);
  const fraction=car.tyreWear/100;
  const gripLoss=c.deg*car.tyreAge+Math.pow(Math.max(0,fraction-.65),2)*24;
  const temp=track.temp+(wet?30:60)+m.wear*7-weather*20+(car.dirty?5:0);
  const tempLoss=Math.max(c.min-temp,0)*.024+Math.max(temp-c.max,0)*.032;
  const mismatch=car.compound==='I'?Math.max(0,.22-weather)*22+Math.max(0,weather-.7)*12:car.compound==='W'?Math.max(0,.65-weather)*22:weather*weather*24;
  return {
    loss:c.pace+gripLoss+tempLoss+mismatch,temperature:temp,wear:100/life*m.wear*(trait?.95:1)*(wet&&weather<.15?2.5:1)
  };
}
export function lapTime(s,car,track) {
  const t=teamOf(s,car.teamId),d=driverOf(s,car.driverId),mode=MODES[car.mode],engine=ENGINES[car.engine];
  const tyres=tyreState(car,track,d,s.race.wetness,car.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  car.tyreTemperature=tyres.temperature;
  car.tyreWear=clamp(car.tyreWear+tyres.wear,0,130);
  const setup=s.calendar.weekend.setups[t.id][car.slot];
  const ideal=s.calendar.weekend.ideal[t.id][car.slot];
  // 燃油质量影响 0.03 s/kg，即每 10 kg 慢 0.3 秒；单圈噪声限定 ±0.15 秒。
  const time=theoreticalLap(s,t,d,car.slot,track)+setupPenalty(setup,ideal)+car.fuel*.03+tyres.loss+mode.pace+engine.pace+(car.dirty?.22:0)-(car.drs?.4:0)+s.race.wetness*(7+(100-d.attributes.wet)*.07)+between(s,-.15,.15);
  car.fuel-=s.race.fuelPerLap*mode.fuel*engine.fuel;
  return Math.max(40,time);
}
export function replacePart(s,slot,id) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'更换部件请在进入比赛周末之前进行');
  const t=teamOf(s),part=PARTS.find(p=>p.id===id);
  requireCondition(part&&[0,1].includes(slot),'部件或赛车无效');
  spend(s,t,part.cost*.23,'更换 '+part.name,true);
  const item=s.parts[t.id].cars[slot][id];
  item.wear=0;
  item.used++;
  if(item.used>partQuota(part,s.season.year)) {
    t.gridPenalties[slot]+=10;
  }
  return '已换新'+(item.used>partQuota(part,s.season.year)?'，下站罚退 10 位':'');
}
export function fitPart(s,stockId,slot) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'周末开始后禁止装新规格，请先完成本周末');
  const t=teamOf(s),p=s.parts[t.id],i=p.stock.findIndex(x=>x.id===stockId);
  requireCondition(i>=0&&[0,1].includes(slot),'库存不存在');
  const spec=p.stock[i],item=p.cars[slot][spec.part];
  requireCondition(spec.level>item.level,'该赛车已安装同级或更高规格');
  item.level=spec.level;
  item.gain=spec.gain;
  item.risk=spec.risk;
  p.stock.splice(i,1);
  return '规格已装车，性能立即生效';
}
export function replacementCost(part) {
  return part.cost*.23;
}
// 供界面展示的纯数据预测；不会消耗 RNG，也不会改动真实轮胎库存。
export function tyreChartData(s,track){
  if(!track)return {labels:[],series:[]};
  const t=teamOf(s),d=driverOf(s,t.drivers[0]);
  const labels=Array.from({length:46},(_,i)=>String(i));
  const series=['S','M','H'].map(compound=>{
    const values=[],c={compound,tyreAge:0,tyreWear:0,dirty:false};
    for(let lap=0;lap<=45;lap++){
      const state=tyreState(c,track,d,0,'normal',false);
      values.push(Math.min(125,c.tyreWear));
      c.tyreWear+=state.wear;c.tyreAge++;
    }
    return {values,color:COMPOUNDS[compound].color};
  });
  return {labels,series,type:'line'};
}
```

## js/core/driverCodes.js

```js
// ===== 文件: js/core/driverCodes.js =====
// Official broadcast codes where available; custom drivers receive unique editable codes.
import { requireCondition, driverOf } from './helpers.js';
export const DRIVER_CODES={verstappen:'VER',perez:'PER',leclerc:'LEC',sainz:'SAI',hamilton:'HAM',russell:'RUS',norris:'NOR',ricciardo:'RIC',alonso:'ALO',ocon:'OCO',gasly:'GAS',tsunoda:'TSU',vettel:'VET',stroll:'STR',albon:'ALB',latifi:'LAT',bottas:'BOT',zhou:'ZHO',magnussen:'MAG',schumacher:'MSC',piastri:'PIA',devries:'DEV',sargeant:'SAR',hulkenberg:'HUL',lawson:'LAW',antonelli:'ANT',doohan:'DOO',hadjar:'HAD',bearman:'BEA',bortoleto:'BOR',colapinto:'COL',drugovich:'DRU',pourchaire:'POU',iwasa:'IWA',vandoorne:'VAN',fittipaldi:'FIT'};
export function assignDriverCodes(s){
  const used=new Set();
  for(const d of s.drivers){
    let code=d.code||DRIVER_CODES[d.id]||d.name.split(' ').at(-1).replace(/[^a-z]/gi,'').slice(0,3).toUpperCase().padEnd(3,'X');
    if(!/^[A-Z]{3}$/.test(code))code='DRV';
    if(used.has(code)){const base=code.slice(0,2);let i=0;while(i<26&&used.has(base+String.fromCharCode(65+i)))i++;if(i<26)code=base+String.fromCharCode(65+i);else{let n=0;do{code=String.fromCharCode(65+Math.floor(n/676)%26,65+Math.floor(n/26)%26,65+n%26);n++;}while(used.has(code));}}
    d.code=code;used.add(code);
  }
}
export function setDriverCode(s,id,value){
  const d=driverOf(s,id),code=String(value).trim().toUpperCase();
  requireCondition(d?.teamId===s.player.teamId,'只能修改本队车手缩写');
  requireCondition(/^[A-Z]{3}$/.test(code),'缩写必须是三个英文字母');
  requireCondition(!s.drivers.some(x=>x.id!==id&&x.code===code),'该缩写已被其他车手使用');
  d.code=code;return '车手缩写已更新';
}
```

## js/core/drivers.js

```js
// ===== 文件: js/core/drivers.js =====
import { assignDriverCodes, DRIVER_CODES } from './driverCodes.js';
// ===== 文件: js/core/drivers.js =====
import {
  DRIVER_DATA, YEAR_ADJUSTMENTS
}
from '../data/drivers-data.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  uid, clamp, copy, teamOf, driverOf, news, requireCondition, rosterMutable
}
from './helpers.js';
import {
  spend, income
}
from './finance.js';
import {
  staffAbility
}
from './staff.js';
export function makeDriver(id,year) {
  const source=DRIVER_DATA[id];
  requireCondition(source,'车手数据不存在');
  const d=copy(source),delta=YEAR_ADJUSTMENTS[year]?.[id]||0;
  for(const k of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[k]=clamp(d.attributes[k]+delta,60,98);
  d.code=DRIVER_CODES[id];
  d.age=year-d.birth;
  d.attributes.experience=clamp((d.age-17)*4,10,99);
  Object.assign(d,{
    teamId:null,morale:80,fatigue:0,points:0,results:[],wins:0,fastest:0,star:d.attributes.pace>=90,contract:{
      salary:d.salary,years:2,bonus:.1,buyout:.65
    },plan:'balanced',academy:false,retired:false
  });
  return d;
}
export function createCustomDriver(s,name,age,pace,number) {
  requireCondition(name.trim().length>=1&&name.length<=32,'车手名字需为 1—32 个字符');
  requireCondition(Number.isInteger(age)&&age>=18&&age<=45&&Number.isFinite(pace)&&pace>=60&&pace<=80,'自建车手年龄需 18—45，初始能力 60—80');
  const d=makeDriver('drugovich',s.season.year);
  d.id=uid(s,'custom-driver');
  d.name=name.trim();delete d.code;
  d.age=age;
  d.birth=s.season.year-age;
  d.number=number;
  d.nationality='自定义';
  for(const k of Object.keys(d.attributes))d.attributes[k]=pace;
  d.attributes.fitness=90;
  d.attributes.experience=clamp((age-17)*4,10,99);
  d.attributes.potential=Math.max(pace,age<25?92:84);
  d.contract.salary=1.3;
  d.star=false;
  s.drivers.push(d);assignDriverCodes(s);
  return d;
}
export function freeReplacement(s,teamId,exclude) {
  return s.drivers.filter(d=>!d.teamId&&!d.academy&&!d.retired&&d.id!==exclude).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
}
export function transferDriver(s,d,t,slot,salary,years) {
  const oldId=d.teamId;
  if(oldId) {
    const old=teamOf(s,oldId),seat=old.drivers.indexOf(d.id),replacement=freeReplacement(s,old.id,d.id);
    requireCondition(replacement,'对方车队无可用替补，转会暂时无法完成');
    old.drivers[seat]=replacement.id;
    replacement.teamId=old.id;
  }
  const outgoing=s.drivers.find(x=>x.id===t.drivers[slot]);
  if(outgoing)outgoing.teamId=null;
  t.drivers[slot]=d.id;
  d.teamId=t.id;
  d.academy=false;
  d.contract={
    salary,years,bonus:.1,buyout:.65
  };
  d.morale=85;
}
export function signDriver(s,id,slot,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId!==t.id&&!d.retired,'该车手不可签约');
  requireCondition(!d.academy||d.academy===t.id,'只能提拔本队青训');
  requireCondition([0,1].includes(slot)&&Number.isFinite(salary)&&salary>=.1&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const outgoing=driverOf(s,t.drivers[slot]);
  const release=outgoing.contract.salary*outgoing.contract.years*.3;
  const fee=d.teamId?d.contract.salary*d.contract.years*d.contract.buyout:0;
  requireCondition(s.finance[t.id].cash>=release+fee,'现金不足以支付转会和解约补偿');
  const desire=.5+(salary/Math.max(.5,d.contract.salary)-1)*.4+(t.reputation-d.attributes.pace)*.012+t.facilities.marketing.level*.02;
  if(!chance(s,clamp(desire,.08,.98))) {
    news(s,`${d.name} 拒绝 ${t.name} 的报价，薪水与竞争力尚不足`,'warning');
    return '谈判未达成';
  }
  const old=d.teamId;
  spend(s,t,fee+release,'车手转会与席位解约',true);
  if(old)income(s,teamOf(s,old),fee,'车手转会补偿');
  transferDriver(s,d,t,slot,salary,years);
  news(s,`${d.name} 签约 ${t.name}，合同 ${years} 年`);
  return '签约成功';
}
export function renewDriver(s,id,salary,years) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId,'只能续约本队车手');
  requireCondition(Number.isFinite(salary)&&salary>=d.contract.salary*.95&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价无效（最低原薪资 95%，年限 1—5 年）');
  d.contract.salary=salary;
  d.contract.years=years;
  d.morale=clamp(d.morale+8);
  return '车手续约成功';
}
export function releaseDriver(s,id) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId===t.id,'只能解约本队车手');
  const reserve=freeReplacement(s,t.id,id);
  requireCondition(reserve,'没有可用替补，请先招募青训或签入车手');
  spend(s,t,d.contract.salary*d.contract.years*.5,'车手解约补偿',true);
  const slot=t.drivers.indexOf(id);
  t.drivers[slot]=reserve.id;
  reserve.teamId=t.id;
  d.teamId=null;
  return `合同解除，${reserve.name} 临时接替席位`;
}
export function trainDriver(s,id,plan) {
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId||d.academy===s.player.teamId,'只能安排本队训练');
  requireCondition(['balanced','pace','tyres','wet','rest'].includes(plan),'训练项目无效');
  d.plan=plan;
  return '发展计划已更新';
}
export function recruitYouth(s) {
  rosterMutable(s);
  const t=teamOf(s);
  requireCondition(s.drivers.filter(d=>d.academy===t.id).length<4,'青训最多 4 人');
  spend(s,t,1,'招募青训车手',true);
  const names=['Ren Sato','Alex Morgan','Gabriel Costa','陈星河','Luca Moretti','Émile Laurent'];
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'youth');
  d.name=choose(s,names)+' '+s.nextId;delete d.code;
  d.age=18;
  d.birth=s.season.year-18;
  d.academy=t.id;
  d.background=chance(s,.5)?'F2':'F3';
  for(const k of Object.keys(d.attributes))d.attributes[k]=between(s,61,76);
  d.attributes.potential=between(s,86,97);
  d.contract.salary=.3;
  s.drivers.push(d);assignDriverCodes(s);
  news(s,`${d.name} 从 ${d.background} 加入青训`);
  return '新青训车手已报到';
}
export function sellYouth(s,id) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.academy===s.player.teamId,'不是本队青训车手');
  income(s,teamOf(s),Math.max(.5,(d.attributes.pace-55)*.2),'青训车手培养转让');
  d.academy=false;
  return '青训资产已出售，车手进入自由市场';
}
export function developDrivers(s,days) {
  for(const d of s.drivers) {
    if(d.retired)continue;
    d.fatigue=clamp(d.fatigue-days*(d.plan==='rest'?2:1)*(.5+d.attributes.fitness*.005));
    const team=d.teamId||d.academy;
    if(!team)continue;
    const t=teamOf(s,team),academy=staffAbility(s,t.id,'academy');
    const young=d.age<27;
    const growth=young?Math.max(0,d.attributes.potential-d.attributes.pace)*days/18000*(1+academy/100)*(d.academy?1.5:1)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='mentor')?1.2:1):d.age>30?-(d.age-29)*days/24000:0;
    for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency','feedback'])d.attributes[key]=clamp(d.attributes[key]+growth,50,99);
    if(d.plan!=='balanced'&&d.plan!=='rest') {
      const cost=days*.008;
      if(s.finance[t.id].cash>cost) {
        spend(s,t,cost,'车手专项训练',true);
        const key=d.plan==='pace'?'qualifying':d.plan;
        d.attributes[key]=clamp(d.attributes[key]+days*(1+t.facilities.sim.level*.1)*.018,0,d.attributes.potential);
      }
    }
  }
}
export function seedAIYouth(s,t){
  if(s.drivers.some(d=>d.academy===t.id&&!d.retired))return;
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'ai-youth');delete d.code;d.name=choose(s,['Matteo Riva','Evan Brooks','Haru Mori','Rafael Lima','林逸'])+' '+t.abbr;
  d.age=18;d.birth=s.season.year-18;d.academy=t.id;d.background='F2 / F3 虚构新秀';d.contract.salary=.4;
  for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[key]=between(s,68,77);
  d.attributes.potential=between(s,88,97);s.drivers.push(d);assignDriverCodes(s);
}
```

## js/core/finance.js

```js
// ===== 文件: js/core/finance.js =====
import {
  SUPPLIERS
}
from '../data/teams.js';
import {
  SPONSORS
}
from '../data/sponsors.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  clamp, news, teamOf, requireCondition, mutable
}
from './helpers.js';
import {
  checkBudget
}
from './rules.js';
export function initFinance(s,t,cash) {
  s.finance[t.id]={
    cash,capUsed:0,capLimit:s.season.rules.cap*DIFFICULTIES[s.settings.difficulty].cap,ledger:[],sponsors:[],audited:false,disqualified:false,rescue:false
  };
}
export function spend(s,t,amount,label,cap=true,forced=false) {
  const f=s.finance[t.id];
  requireCondition(Number.isFinite(amount)&&amount>=0,'支出金额无效');
  requireCondition(forced||f.cash>=amount,'现金不足');
  f.cash-=amount;
  if(cap)f.capUsed+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount:-amount,cap
  });
  f.ledger.length=Math.min(f.ledger.length,160);
  return amount;
}
export function income(s,t,amount,label) {
  const f=s.finance[t.id];
  f.cash+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount,cap:false
  });
  f.ledger.length=Math.min(f.ledger.length,160);
}
export function signSponsor(s,id,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),f=s.finance[t.id],sp=SPONSORS.find(x=>x.id===id);
  requireCondition(sp,'赞助商不存在');
  requireCondition(t.reputation>=sp.min,'声望尚未达到签约要求');
  requireCondition(!f.sponsors.some(x=>x.id===id),'已签约该赞助商');
  requireCondition(f.sponsors.filter(x=>x.kind===sp.kind).length<(sp.kind==='主赞助'?1:3),'该类型赞助席位已满');
  const boost=1+t.facilities.marketing.level*.03+(s.staff.some(x=>x.teamId===t.id&&x.trait==='money')?.08:0);
  const contract={
    ...sp,annual:sp.base*boost,paid:0
  };
  f.sponsors.push(contract);
  if(t.id===s.player.teamId||s.calendar.day>0)news(s,`${t.name} 与 ${sp.name} 签约，年收入 $${contract.annual.toFixed(2)}m`);
}
export function dailyFinance(s,days) {
  for(const t of s.teams) {
    const payroll=s.drivers.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.contract.salary,0)+s.staff.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.salary,0);
    spend(s,t,(payroll+12+t.facilities.factory.level*1.2+(t.type==='customer'?(SUPPLIERS[t.supplier]?.price||12):9))*days/365,'薪资与工厂运营',true,true);
    for(const sp of s.finance[t.id].sponsors) {
      const amount=sp.annual*days/365;
      sp.paid+=amount;
      income(s,t,amount,sp.name+' 分期赞助');
    }
  }
}
export function raceIncome(s,result) {
  for(const t of s.teams) {
    const own=result.rows.filter(r=>r.teamId===t.id);
    for(const row of own.filter(x=>x.points>0)) {
      const driver=s.drivers.find(d=>d.id===row.driverId);
      spend(s,t,driver.contract.bonus,'车手积分绩效奖金',true,true);
    }
    income(s,t,.3+t.reputation*.006+s.drivers.filter(d=>d.teamId===t.id&&d.star).length*.15,'周边与赛事分成');
    for(const sp of s.finance[t.id].sponsors) {
      let ok=false;
      if(sp.goal==='podium')ok=own.some(r=>r.position<=3&&r.classified);
      if(sp.goal==='points')ok=own.some(r=>r.points>0);
      if(sp.goal==='finish')ok=own.some(r=>!r.retired);
      if(sp.goal==='q3')ok=s.calendar.weekend.q3.some(id=>t.drivers.includes(id));
      if(sp.goal==='win')ok=own.some(r=>r.position===1&&r.classified);
      if(ok)income(s,t,sp.bonus,sp.name+' 达标奖金');
    }
    checkBudget(s,t);
    if(s.finance[t.id].cash<0&&t.id===s.player.teamId) {
      s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
      news(s,s.season.gameOver,'danger');
    }
  }
}
export function emergency(s) {
  mutable(s);
  const t=teamOf(s),f=s.finance[t.id];
  requireCondition(!f.rescue,'本季董事会援助已使用');
  requireCondition(f.cash<20,'仅现金低于 $20m 时可申请');
  f.rescue=true;
  t.confidence=clamp(t.confidence-15);
  t.reputation=clamp(t.reputation-5);
  income(s,t,15,'董事会紧急注资');
  news(s,'董事会注资 $15m，信心 -15、声望 -5','warning');
}
```

## js/core/helpers.js

```js
// ===== 文件: js/core/helpers.js =====
export const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
export const copy=x=>JSON.parse(JSON.stringify(x));
export function uid(s,prefix) {
  s.nextId=(s.nextId||0)+1;
  return prefix+'-'+s.nextId;
}
export function news(s,text,type='info') {
  s.news.unshift({
    id:uid(s,'news'),day:s.calendar?.day||0,date:s.calendar?.date||'',text,type
  });
  s.news.length=Math.min(120,s.news.length);
}
export function teamOf(s,id=s.player.teamId) {
  const t=s.teams.find(t=>t.id===id);
  if(!t)throw new Error('车队不存在');
  return t;
}
export function driverOf(s,id) {
  const d=s.drivers.find(d=>d.id===id);
  if(!d)throw new Error('车手不存在');
  return d;
}
export function requireCondition(ok,message) {
  if(!ok)throw new Error(message);
}
export function mutable(s) {
  requireCondition(!s.race||s.race.finished,'比赛进行中：请先完成比赛');
  requireCondition(!s.season.gameOver,'本次生涯已结束，可读取存档或重新开局');
}
export function rosterMutable(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend||s.season.offseason,'比赛周末已登记阵容，请在周末结算后签约');
}
export function ties(a,b) {
  const n=Math.max(a.results?.length||0,b.results?.length||0,30);
  for(let p=1; p<=n; p++) {
    const ca=(a.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    const cb=(b.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    if(ca!==cb)return cb-ca;
  }
  return (a.previousRank||99)-(b.previousRank||99)||String(a.id).localeCompare(String(b.id));
}
export function teamStandings(s) {
  return s.teams.slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
export function driverStandings(s) {
  return s.drivers.filter(d=>d.teamId||d.points||d.results.length).slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
```

## js/core/race.js

```js
// ===== 文件: js/core/race.js =====
import {
  COMPOUNDS, MODES, ENGINES, PARTS
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  currentTrack
}
from './calendar.js';
import {
  theoreticalLap, setupPenalty, lapTime, performance
}
from './car.js';
import {
  staffAbility
}
from './staff.js';
import {
  aiRaceDecision
}
from './ai.js';
import {
  raceIncome
}
from './finance.js';
import {
  RACE_POINTS, SPRINT_POINTS, eliminationSize, penalty, trackLimits, pitLanePenalty
}
from './rules.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  clamp, copy, teamOf, driverOf, news, requireCondition
}
from './helpers.js';
export function event(s,text,type='info') {
  const r=s.race;
  r.sequence++;
  r.events.unshift({
    lap:r.lap,text,type,...(r.realtime?{at:r.time}:{})
  });
  if(r.events.length>300)r.events.pop();
}
export function practice(s) {
  const w=s.calendar.weekend,track=currentTrack(s);
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'当前不是练习阶段');
  const session=w.sessions[w.index],rows=[];
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()) {
    const d=driverOf(s,id),conf=w.confidence[t.id][slot],skill=staffAbility(s,t.id,'engineer')*.75+staffAbility(s,t.id,'analyst')*.25;
    for(let i=0; i<4; i++) {
      const prior=conf[i],half=Math.max(3,(prior.high-prior.low)*.27/(1+t.facilities.sim.level*.05+(skill-45)*.003));
      const noise=between(s,-half*.55,half*.55)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='precise')?.85:1);
      const estimate=clamp(w.ideal[t.id][slot][i]+noise,0,100);
      prior.estimate=estimate;
      prior.low=clamp(estimate-half);
      prior.high=clamp(estimate+half);
      if(t.id!==s.player.teamId)w.setups[t.id][slot][i]=estimate;
    }
    const time=theoreticalLap(s,t,d,slot,track)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+between(s,-.15,.15);
    d.fatigue=clamp(d.fatigue+1);
    for(const p of Object.values(s.parts[t.id].cars[slot]))p.wear=clamp(p.wear+.5);
    rows.push({
      id,name:d.name,time,feedback:Math.round((d.attributes.feedback+skill)/2)
    });
  }
  rows.sort((a,b)=>a.time-b.time);
  w.practice.push({
    session,rows,wearEstimate:[Math.round(19/track.wear),Math.round(29/track.wear),Math.round(40/track.wear)],fuel:1.65*track.length/5.4
  });
  w.index++;
  news(s,`${session} 完成：设定置信区间收敛，已取得轮胎与燃油数据`);
  return '练习完成，可参照置信区间调整下一节设定';
}
export function qualifying(s,mode='push',all=false) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='Q'||kind==='SQ','当前不是排位阶段');
  requireCondition(['push','safe','save'].includes(mode),'排位指令无效');
  if(!w.qualifying||w.qualifying.kind!==kind||w.qualifying.done)w.qualifying={
    kind,stage:0,active:s.teams.flatMap(t=>t.drivers),eliminated:[],stages:[],done:false
  };
  const q=w.qualifying;
  do{
    q.stage++;
    const rows=q.active.map(id=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id); const selected=t.id===s.player.teamId?mode:'push'; const compound=kind==='SQ'&&q.stage<3?'M':selected==='save'?'M':'S'; const stock=w.tyres[id]; let tyre=compound; if(stock[tyre]<=0)tyre=stock.S>0?'S':stock.M>0?'M':'H'; stock[tyre]=Math.max(0,stock[tyre]-1); const push=selected==='push'?-.12:selected==='safe'?.2:.55; const error=chance(s,(100-d.attributes.consistency)*.0015*(selected==='push'?1.6:.6)); const time=theoreticalLap(s,t,d,slot,track,true)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+COMPOUNDS[tyre].pace+push+between(s,-.15,.15)+(error?between(s,.3,1.4):0); return {
        id,name:d.name,teamId:t.id,time,stage:q.stage,compound:tyre
      };
    }).sort((a,b)=>a.time-b.time);
    q.stages.push(rows);
    if(q.stage<3) {
      const count=eliminationSize(s.teams.length*2),eliminated=rows.slice(-count);
      q.eliminated=eliminated.concat(q.eliminated);
      q.active=rows.slice(0,-count).map(x=>x.id);
    }
    else{
      q.done=true;
      w.grids[kind]=rows.concat(q.eliminated).map(x=>x.id);
      if(kind==='Q')w.q3=rows.map(x=>x.id);
      w.index++;
      news(s,`${kind==='Q'?'正赛':'冲刺'}排位结束，${rows[0].name} 获杆位`);
    }
  }
  while(all&&!q.done);
  return q.done?'排位结束':`第 ${q.stage} 段完成，可调整下一段指令`;
}
export function useTyre(s,car,compound) {
  const stock=s.calendar.weekend.tyres[car.driverId];
  if(!COMPOUNDS[compound]||stock[compound]<=0)return false;
  stock[compound]--;
  car.compound=compound;
  car.tyreAge=0;
  car.tyreWear=0;
  if(['S','M','H'].includes(compound)&&!car.usedDry.includes(compound))car.usedDry.push(compound);
  return true;
}
export function startRace(s) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='RACE'||kind==='SPRINT','当前不是比赛阶段');
  requireCondition(!s.race||s.race.finished,'比赛已开始');
  const sprint=kind==='SPRINT',totalLaps=sprint?Math.ceil(100/track.length):track.laps;
  let grid=copy(sprint?(w.grids.SQ||w.grids.Q):(s.season.year===2022&&w.grids.SPRINT?w.grids.SPRINT:w.grids.Q));
  requireCondition(Array.isArray(grid)&&grid.length===s.teams.length*2,'请先完成排位赛');
  const pitDrivers=new Set(!sprint?s.teams.flatMap(t=>t.drivers.filter((id,slot)=>t.pitLaneNext?.[slot])):[]);
  if(!sprint) {
    grid=grid.map((id,i)=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId); return {
        id,index:i+t.gridPenalties[t.drivers.indexOf(id)]+(pitDrivers.has(id)?999:0)
      };
    }).sort((a,b)=>a.index-b.index).map(x=>x.id);
    for(const t of s.teams)t.gridPenalties=[0,0];
  }
  const initial=w.weatherStart??(chance(s,track.rain)?between(s,.2,.8):0);
  const forecast=Array.from({
    length:Math.ceil(totalLaps/5)+1
  },(_,i)=>({
    lap:i*5+1,rain:chance(s,track.rain)?between(s,.2,.9):0,confidence:clamp(staffAbility(s,s.player.teamId,'strategy'),40,98)
  }));
  s.race={
    kind,sprint,totalLaps,lap:0,running:true,finished:false,control:'GREEN',controlLeft:0,red:false,sequence:0,wetness:initial,rain:initial,forecast,weatherWet:initial>.1,events:[],penalties:[],cars:[],fastest:{
      time:9999,driverId:null
    },fuelPerLap:track.length*.31,positions:[],segments:[],result:null
  };
  const r=s.race;
  for(const [position,id]of grid.entries()) {
    const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id),strategy=w.strategy[id];
    const car={
      driverId:id,name:d.name,teamId:t.id,slot,grid:position+1,position:position+1,time:position*.22+(pitDrivers.has(id)?15:0),lastLap:0,best:9999,lap:0,compound:'M',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:Math.min(110,totalLaps*r.fuelPerLap*1.04),mode:'normal',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,driveThrough:false,pitThisLap:false,plan:copy(strategy),planUsed:[],sectors:[]
    };
    let tyre=t.id===s.player.teamId&&!strategy.auto&&!sprint?strategy.start:initial>.65?'W':initial>.2?'I':sprint?'M':strategy.start;
    if(w.tyres[id][tyre]<=0)tyre=Object.keys(COMPOUNDS).find(k=>w.tyres[id][k]>0)||'H';
    useTyre(s,car,tyre);
    r.cars.push(car);
  }
  if(!sprint)for(const t of s.teams)t.pitLaneNext=[false,false];
  event(s,`${sprint?'冲刺赛':'正赛'}开始，${r.cars.length} 台赛车就位`);
  return '绿灯亮起';
}
export function raceCommand(s,id,command,value) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前无进行中的比赛');
  const c=r.cars.find(c=>c.driverId===id&&c.teamId===s.player.teamId);
  requireCondition(c&&!c.retired,'该赛车已退赛或不是本队赛车');
  if(command==='mode') {
    requireCondition(MODES[value],'驾驶指令无效');
    c.mode=value;
  }
  else if(command==='engine') {
    requireCondition(ENGINES[value],'引擎模式无效');
    c.engine=value;
  }
  else if(command==='pit') {
    requireCondition(COMPOUNDS[value]&&s.calendar.weekend.tyres[id][value]>0,'该配方没有新胎可用');
    c.pitRequest=value;
    event(s,`${c.name}：收到进站指令，本圈末换 ${value} 胎`,'radio');
  }
  else if(command==='cancelPit') {
    c.pitRequest=null;
  }
  else throw new Error('指令不存在');
  return '车手已确认指令';
}
export function resumeRed(s) {
  requireCondition(s.race?.red,'当前没有红旗');
  s.race.red=false;
  s.race.control='SC';
  s.race.controlLeft=2;
  event(s,'红旗解除，安全车带领重新发车','warning');
  return '比赛恢复';
}
export function pit(s,car,track) {
  const target=car.pitRequest;
  if(!target)return;
  car.pitRequest=null;
  const previousCompound=car.compound;
  if(!useTyre(s,car,target)) {
    event(s,`${car.name}：请求配方已用尽，取消进站`,'warning');
    return;
  }
  const ability=staffAbility(s,car.teamId,'mechanics');
  let stop=clamp(4.7-ability*.025+between(s,-.18,.18),2,4.5);
  if(s.staff.some(x=>x.teamId===car.teamId&&x.trait==='pit'))stop=Math.max(2,stop-.15);
  if(chance(s,.006+(100-ability)*.0003)) {
    stop+=between(s,7,14);
    event(s,`${car.name}：螺栓卡住，停站 ${stop.toFixed(1)} 秒`,'warning');
  }
  const loss=track.pitLoss*(s.race.control==='GREEN'?1:.58)+stop;
  car.time+=loss;
  car.stops++;
  car.pitThisLap=true;
  car.pitLog.push({
    lap:s.race.realtime?car.lap:s.race.lap,compound:target,stop,loss,...(s.race.realtime?{at:s.race.time}:{}),from:previousCompound
  });
  event(s,`${car.name} 进站：${target} 胎，停站 ${stop.toFixed(2)} 秒`,'pit');
  if(chance(s,.003)) {
    penalty(s,car,0,'维修区超速，罚穿越维修区');
    car.driveThrough=true;
  }
}
export function retire(s,c,reason) {
  if(c.retired)return;
  c.retired=true;
  c.reason=reason;
  event(s,`${c.name} 退赛：${reason}`,'danger');
}
export function reliability(s,c,track) {
  const t=teamOf(s,c.teamId),v=performance(s,t,c.slot),engine=ENGINES[c.engine];
  for(const def of PARTS) {
    if(def.id==='mguh'&&s.season.year>=2026)continue;
    const p=s.parts[t.id].cars[c.slot][def.id];
    p.wear=clamp(p.wear+(def.department==='power'?.17:.08)*track.wear*(def.department==='power'?engine.wear:1));
    // 每个部件整站基础故障约 0.5%—4%，按本站圈数摊分。
    const perRace=clamp(.005+Math.max(0,p.wear-30)*.0004+(100-v.reliability)*.00012+Math.max(0,track.temp-30)*.0002+(c.dirty?.002:0),.005,.04);
    if(chance(s,perRace*engine.wear/s.race.totalLaps)) {
      retire(s,c,def.name+' 故障');
      return;
    }
  }
}
export function controlEvents(s,track) {
  const r=s.race;
  if(r.controlLeft>0) {
    r.controlLeft--;
    if(r.controlLeft===0) {
      r.control='GREEN';
      event(s,'赛道恢复绿旗，DRS 将重新启用');
    }
  }
  if(r.lap%5===1) {
    const cell=r.forecast[Math.floor((r.lap-1)/5)];
    r.rain=cell?.rain||0;
    if(r.rain>.25&&r.wetness<.2)event(s,'雨带抵达赛道，注意轮胎交叉点','weather');
  }
  r.wetness=clamp(r.wetness+(r.rain-r.wetness)*.35,0,1);
  if(r.wetness>.15)r.weatherWet=true;
  if(r.control==='GREEN'&&chance(s,track.sc/r.totalLaps)) {
    r.control=chance(s,.58)?'SC':'VSC';
    r.controlLeft=3;
    event(s,r.control==='SC'?'安全车出动，维修区保持开放':'虚拟安全车启动','warning');
  }
  if(r.control==='GREEN'&&chance(s,.045/r.totalLaps)) {
    r.control='RED';
    r.red=true;
    event(s,'红旗：赛道需清理，比赛暂停','danger');
  }
}
export function tick(s,count=1,untilEvent=false) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前没有比赛');
  requireCondition(Number.isInteger(count)&&count>0&&count<=1000,'推进圈数无效');
  const track=currentTrack(s),sequence=r.sequence;
  for(let iteration=0; iteration<count&&!r.finished; iteration++) {
    if(r.red)break;
    r.lap++;
    controlEvents(s,track);
    if(r.red) {
      r.lap--;
      break;
    }
    const previous=r.cars.filter(c=>!c.retired).slice().sort((a,b)=>a.time-b.time);
    const previousTimes=Object.fromEntries(previous.map(c=>[c.driverId,c.time]));
    for(const [index,c]of previous.entries()) {
      c.pitThisLap=false;
      const ahead=previous[index-1],oldGap=ahead?previousTimes[c.driverId]-previousTimes[ahead.driverId]:999;
      c.dirty=oldGap<1.5&&r.control==='GREEN';
      c.drs=!!ahead&&oldGap<1&&r.lap>2&&r.wetness<.18&&r.control==='GREEN'&&!c.drsBroken;
      const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
      if(t.id!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
      else{
        const planned=[c.plan.pitLap,c.plan.secondLap];
        for(let i=0; i<planned.length; i++)if(planned[i]===r.lap&&!c.planUsed.includes(i)) {
          c.pitRequest=c.plan.next;
          c.planUsed.push(i);
        }
        if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-r.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
        if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
      }
      const oldWear=c.tyreWear,oldFuel=c.fuel;
      let time=lapTime(s,c,track);
      c.tyreAge++;
      if(r.lap===1) {
        time+=(95-d.attributes.starts)*.024+between(s,-.3,.3);
        if(chance(s,.0015)) {
          time+=between(s,3,8);
          event(s,`${c.name} 起步拥挤中发生轻微接触`,'warning');
        }
      }
      if(r.control!=='GREEN') {
        time=track.baseTime*1.38+(time-track.baseTime)*.2;
        c.tyreTemperature-=25;
        c.tyreWear=oldWear+(c.tyreWear-oldWear)*.45;
        c.fuel=oldFuel-(oldFuel-c.fuel)*.65;
      }
      const calm=s.staff.some(x=>x.teamId===t.id&&x.trait==='calm')?.9:1;
      const human=t.id===s.player.teamId?DIFFICULTIES[s.settings.difficulty].mistake:1;
      const error=(100-d.attributes.consistency)*.000045*MODES[c.mode].risk*(1+r.wetness*3)*calm*human*(1.15-d.attributes.experience*.002);
      if(chance(s,error)) {
        time+=between(s,1,5);
        event(s,`${c.name} 锁死轮胎，损失时间`,'warning');
      }
      if(chance(s,.0015*MODES[c.mode].risk*(1.15-staffAbility(s,t.id,'sporting')*.002)))trackLimits(s,c);
      if(chance(s,.015/r.totalLaps)) {
        c.drsBroken=true;
        event(s,`${c.name}：DRS 失效`,'radio');
      }
      if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
      if(c.fuel<=0)retire(s,c,'燃油耗尽');
      reliability(s,c,track);
      if(c.retired)continue;
      if(c.driveThrough) {
        time+=track.pitLoss;
        c.driveThrough=false;
        event(s,`${c.name} 完成穿越维修区罚则`,'penalty');
      }
      c.lastLap=time;
      c.time+=time;
      c.lap=r.lap;
      c.sectors=[time*.32,time*.36,time*.32];
      c.best=Math.min(c.best,time);
      if(time<r.fastest.time&&r.control==='GREEN') {
        r.fastest={
          time,driverId:c.driverId
        };
      }
      pit(s,c,track);
      // 不能仅按自由空气圈速穿过对手：必须通过超车对抗，否则被限制在前车之后。
      if(ahead&&!ahead.retired&&c.time<ahead.time&&!ahead.pitThisLap&&!c.pitThisLap) {
        const rival=driverOf(s,ahead.driverId);
        const overtaking=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
        if(r.control!=='GREEN'||!chance(s,overtaking)) {
          c.time=ahead.time+between(s,.15,.45);
        }
        else{
          if(chance(s,.003*MODES[c.mode].risk*(1+r.wetness)*(.6+d.attributes.aggression*.008))) {
            retire(s,c,'争夺位置时发生碰撞');
            if(chance(s,.4))retire(s,ahead,'被卷入碰撞');
            if(chance(s,.35))penalty(s,c,10,'造成碰撞');
            if(chance(s,.08))pitLanePenalty(s,c,'危险驾驶');
          }
          else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${c.name} 超过 ${ahead.name}`,'overtake');
        }
      }
    }
    const active=r.cars.filter(c=>!c.retired).sort((a,b)=>a.time-b.time);
    if(r.control==='SC'&&active.length) {
      const lead=active[0].time;
      for(let i=1; i<active.length; i++)active[i].time=lead+Math.max(i*.8,(active[i].time-lead)*.65);
    }
    r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.retired?b.lap-a.lap:a.time-b.time));
    r.cars.forEach((c,i)=>c.position=i+1);
    r.positions.push({
      lap:r.lap,positions:r.cars.map(c=>({
        id:c.driverId,position:c.position
      }))
    });
    if(r.lap%10===0)r.segments.push({
      lap:r.lap,leader:r.cars[0].driverId,time:r.cars[0].time
    });
    if(r.lap>=r.totalLaps||!active.length)finishRace(s);
    if(untilEvent&&r.sequence!==sequence)break;
  }
  return r.finished?'比赛结束':r.red?'红旗暂停':`推进至第 ${r.lap} 圈`;
}
export function simulateToEnd(s) {
  let guard=0;
  while(s.race&&!s.race.finished&&guard++<10) {
    if(s.race.red)resumeRed(s);
    tick(s,1000);
  }
  requireCondition(s.race.finished,'比赛未能完成');
  return '比赛已模拟完毕';
}
export function finishRace(s) {
  const r=s.race,w=s.calendar.weekend,track=currentTrack(s);
  if(r.finished)return;
  for(const c of r.cars) {
    if(!r.sprint&&!(r.realtime?c.usedWet:r.weatherWet)&&!c.retired&&c.usedDry.length<2) {
      c.disqualified=true;
      event(s,`${c.name} 未使用两种干胎，取消本站资格`,'penalty');
    }
    if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&c.stops<2&&!c.retired) {
      c.disqualified=true;
      event(s,`${c.name} 未满足摩纳哥两停规则，取消资格`,'penalty');
    }
    c.time+=c.penalty;
  }
  r.cars.sort((a,b)=>Number(!!a.disqualified)-Number(!!b.disqualified)||b.lap-a.lap||a.time-b.time);
  const points=r.sprint?SPRINT_POINTS:RACE_POINTS;
  const fullDistance=r.cars[0]?.lap||r.totalLaps;
  const rows=r.cars.map((c,i)=> {
    const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId); const classified=!c.disqualified&&c.lap>=Math.floor(fullDistance*.9)&&c.lap>0; let awarded=classified?(points[i]||0):0; if(!r.sprint&&s.season.rules.fastestLap&&i<10&&classified&&r.fastest.driverId===d.id)awarded++; if(s.finance[t.id].disqualified)awarded=0; const row={
      driverId:d.id,name:d.name,teamId:t.id,position:i+1,time:c.time,lap:c.lap,grid:c.grid,points:awarded,classified,retired:c.retired,disqualified:!!c.disqualified,reason:c.reason,best:c.best,stops:c.stops,penalty:c.penalty,tyres:c.compound,kind:r.kind,round:s.calendar.round+1
    }; d.points+=awarded; t.points+=awarded; d.results.push(copy(row)); t.results.push(copy(row)); d.morale=clamp(d.morale+(awarded>0?3:-1)); d.fatigue=clamp(d.fatigue+(r.sprint?3:8)*(1+(100-d.attributes.fitness)*.01)); if(i===0&&classified&&!r.sprint) {
      d.wins++; t.wins++;
    }
    if(!r.sprint&&r.fastest.driverId===d.id)d.fastest++; return row;
  });
  r.result={
    year:s.season.year,kind:r.kind,round:s.calendar.round+1,track:track.name,rows,fastest:copy(r.fastest),penalties:copy(r.penalties),segments:copy(r.segments),events:copy(r.events)
  };
  r.finished=true;
  r.running=false;
  w.grids[r.kind]=r.cars.map(c=>c.driverId);
  w.index++;
  s.history.races.push(copy(r.result));
  if(!r.sprint) {
    s.calendar.events[s.calendar.round].result=copy(r.result);
    raceIncome(s,r.result);
    const t=teamOf(s),own=rows.filter(x=>x.teamId===t.id),successful=own.some(x=>x.points>0);
    t.confidence=clamp(t.confidence+(successful?3:-1.8)/DIFFICULTIES[s.settings.difficulty].tolerance);
    t.objectives.finish+=own.filter(x=>!x.retired&&!x.disqualified).length;
    t.objectives.points+=own.reduce((a,x)=>a+x.points,0);
    t.objectives.podiums+=own.filter(x=>x.position<=3&&x.classified).length;
    if(t.confidence<=0&&!s.season.gameOver)s.season.gameOver='董事会信心归零，你被解除车队经理职务。';
  }
  news(s,`${track.name}${r.sprint?'冲刺赛':'正赛'}：${rows[0]?.name||'无'} 获胜`);
}
```

## js/core/realtime.js

```js
// ===== 文件: js/core/realtime.js =====
// Continuous, serializable discrete-event simulation. All event times are seconds.
import { currentTrack } from './calendar.js';
import { theoreticalLap, setupPenalty, tyreState } from './car.js';
import { MODES, ENGINES, COMPOUNDS } from '../data/parts.js';
import { teamOf, driverOf, clamp, copy, requireCondition, news } from './helpers.js';
import { between, chance } from './rng.js';
import { eliminationSize, trackLimits } from './rules.js';
import { aiRaceDecision } from './ai.js';
import { startRace, finishRace, event, useTyre, pit, retire, reliability, controlEvents, resumeRed } from './race.js';
import { SECTOR_ENDS, geometry, sectorMotion } from './trackGeometry.js';
const NEVER=1e12,EPS=1e-7;
export const PHASE_NAMES={GARAGE:'车库',OUT:'出场圈',FLY:'飞行圈',ABORT:'已放弃',IN:'回场圈',RACE:'比赛中',GRID:'等待出发',PIT:'维修区',FINISHED:'已冲线',ELIMINATED:'已淘汰'};
export function initCar(c,time=0){
  Object.assign(c,{phase:'RACE',progress:0,sector:0,segmentStart:time,segmentEnd:time,segmentDuration:0,lapStart:time,
    sectorStart:time,currentLap:0,speed:0,sectors:[],sectorSpeeds:[],sectorTones:[],bestSectors:[9999,9999,9999],lastSectors:[],lastSectorSpeeds:[],lastSectorTones:[],lapValid:true,finished:false,usedWet:['I','W'].includes(c.compound),crossings:[],nextRelease:NEVER,pitUntil:0,totalDistance:c.lap||0});
}
function startSegment(s,c){
  const r=s.race,track=currentTrack(s),t=teamOf(s,c.teamId),d=driverOf(s,c.driverId),fraction=SECTOR_ENDS[c.sector]-(SECTOR_ENDS[c.sector-1]||0);
  const tyres=tyreState(c,track,d,r.wetness,c.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  const base=theoreticalLap(s,t,d,c.slot,track,!!r.qualifying)+setupPenalty(s.calendar.weekend.setups[t.id][c.slot],s.calendar.weekend.ideal[t.id][c.slot])+c.fuel*.03+tyres.loss+MODES[c.mode].pace+ENGINES[c.engine].pace+r.wetness*(7+(100-d.attributes.wet)*.07);
  let duration=Math.max(12,base*geometry(track.id).sectorWeights[c.sector]+between(s,-.06,.06));
  if(r.qualifying&&c.phase!=='FLY')duration*=c.phase==='OUT'?1.25:1.3;
  if(r.qualifying&&c.phase==='FLY'&&c.consecutive)duration*=.998;
  const ahead=r.cars.filter(x=>x!==c&&!x.retired&&!x.finished&&x.phase==='RACE'&&x.totalDistance>c.totalDistance).sort((a,b)=>a.totalDistance-b.totalDistance)[0];
  c.drs=!!ahead&&!r.qualifying&&r.control==='GREEN'&&c.lap>=(s.season.year>=2024?1:2)&&r.wetness<.18&&!c.drsBroken&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1;
  c.dirty=!!ahead&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1.5;
  if(c.drs)duration-=.4*fraction;if(c.dirty)duration+=.22*fraction;
  if(r.control==='SC')duration*=1.45;else if(r.control==='VSC')duration*=1.35;
  if(ahead&&ahead.lap===c.lap&&ahead.sector===c.sector&&ahead.segmentEnd>r.time&&ahead.segmentEnd>r.time+duration){
    const rival=driverOf(s,ahead.driverId),prob=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
    if(r.control!=='GREEN'||!chance(s,prob))duration=ahead.segmentEnd-r.time+.25;
    else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${d.code} 获得超车机会，正在进攻 ${rival.code}`,'overtake');
  }
  if(c.phase==='FLY'&&chance(s,(100-d.attributes.consistency)*.00025*(c.mode==='push'?1.8:1))){
    duration+=between(s,.3,1.1);if(chance(s,.35)){c.lapValid=false;event(s,`${d.code} 超出赛道边界，本圈成绩删除`,'warning');}
  }
  c.segmentStart=r.time;c.sectorStart=r.time;c.segmentDuration=duration;c.segmentEnd=r.time+duration;
  c.segmentWear=tyres.wear*fraction*(r.control==='GREEN'?1:.45)*(r.qualifying&&c.phase!=='FLY'?.6:1);
  c.segmentFuel=r.fuelPerLap*fraction*MODES[c.mode].fuel*ENGINES[c.engine].fuel*(r.control==='GREEN'?1:.65)*(r.qualifying&&c.phase!=='FLY'?.65:1);
  c.tyreTemperature=tyres.temperature-(r.control==='GREEN'?0:20);
}
export function refreshPositions(s){
  const r=s.race,track=currentTrack(s);
  for(const c of r.cars){
    if(['RACE','OUT','FLY','IN','ABORT'].includes(c.phase)&&!c.retired&&!c.finished){
      const f=clamp((r.time-c.segmentStart)/(c.segmentDuration||1),0,1),start=SECTOR_ENDS[c.sector-1]||0,width=SECTOR_ENDS[c.sector]-start;
      const motion=sectorMotion(track.id,c.sector,f);c.progress=start+width*motion.distance;c.speed=track.length*width/c.segmentDuration*3600*motion.rate;
      c.currentLap=Math.max(0,r.time-c.lapStart);c.totalDistance=c.lap+c.progress;
    }else{c.speed=0;if(c.phase==='PIT')c.currentLap=r.time-c.lapStart;}
  }
  if(r.qualifying)r.cars.sort((a,b)=>Number(a.phase==='ELIMINATED')-Number(b.phase==='ELIMINATED')||a.stageBest-b.stageBest||a.bestAt-b.bestAt||a.grid-b.grid);
  else r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.finished&&b.finished?b.lap-a.lap||a.time-b.time:b.totalDistance-a.totalDistance)||a.grid-b.grid);
  r.cars.forEach((c,i)=>{c.position=i+1;});
}
export function startRealtimeRace(s){startRace(s);s.settings.speed=1;attachRealtimeRace(s);return '绿灯亮起 · 1× 对应真实时间';}
export function attachRealtimeRace(s){
  const r=s.race;if(!r||r.realtime||r.finished)return;
  r.realtime=true;r.qualifying=false;r.time=r.lap?Math.min(...r.cars.filter(c=>!c.retired).map(c=>c.time),r.lap*currentTrack(s).baseTime):0;r.chequered=false;r.bestSectors=[9999,9999,9999];r.timeLimit=(r.sprint?1:2)*3600;
  for(const c of r.cars){const delay=r.lap?Math.max(0,c.time-r.time):(c.grid-1)*.15+(c.time>10?15:0);initCar(c,r.time);if(r.lap>0&&r.weatherWet)c.usedWet=true;if(c.retired){c.segmentEnd=NEVER;continue;}c.phase=delay?'GRID':'RACE';c.nextRelease=delay?r.time+delay:NEVER;c.segmentEnd=NEVER;if(!delay){prepareRaceLap(s,c);startSegment(s,c);}}
  refreshPositions(s);
}
function prepareRaceLap(s,c){
  const r=s.race,track=currentTrack(s);c.pitThisLap=false;
  if(c.teamId!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
  else{
    [c.plan.pitLap,c.plan.secondLap].forEach((lap,i)=>{if(Number.isInteger(lap)&&lap>0&&lap===c.lap&&!c.planUsed.includes(i)){c.pitRequest=c.plan.next;c.planUsed.push(i);}});
    if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-c.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
    if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
  }
}
function completeSector(s,c){
  const r=s.race,track=currentTrack(s),sector=c.sector,dt=r.time-c.sectorStart,width=SECTOR_ENDS[sector]-(SECTOR_ENDS[sector-1]||0);
  c.tyreWear=clamp(c.tyreWear+c.segmentWear,0,130);c.fuel=Math.max(0,c.fuel-c.segmentFuel);
  c.sectors[sector]=dt;c.sectorSpeeds[sector]=track.length*width/dt*3600;
  const timing=!r.qualifying||c.phase==='FLY';
  c.sectorTones[sector]=!timing||!c.lapValid?'neutral':dt<r.bestSectors[sector]-EPS?'fastest':dt<c.bestSectors[sector]-EPS?'success':'warning';

  if(sector<2){c.sector++;startSegment(s,c);return;}
  c.progress=0;c.lap++;c.totalDistance=c.lap;c.tyreAge++;c.lastLap=r.time-c.lapStart;
  if(!c.lapValid)c.sectorTones=['neutral','neutral','neutral'];
  c.lastSectors=copy(c.sectors);c.lastSectorSpeeds=copy(c.sectorSpeeds);c.lastSectorTones=copy(c.sectorTones);
  if(timing&&c.lapValid&&r.control==='GREEN'){
    for(let i=0;i<3;i++){r.bestSectors[i]=Math.min(r.bestSectors[i],c.sectors[i]);c.bestSectors[i]=Math.min(c.bestSectors[i],c.sectors[i]);}
    c.best=Math.min(c.best,c.lastLap);
    if(c.lastLap<r.fastest.time)r.fastest={time:c.lastLap,driverId:c.driverId};
  }
  if(r.qualifying){qualCrossing(s,c);if(r.q.status==='RUNNING'&&oldFlying(c)&&chance(s,.0008))suspendQualifying(s);return;}
  c.time=r.time;c.crossings.push(r.time);if(c.crossings.length>100)c.crossings.shift();
  if(c.lap>r.lap){
    r.lap=c.lap;
    r.positions.push({lap:r.lap,positions:r.cars.map(x=>({id:x.driverId,position:x.position}))});
    if(r.lap%10===0)r.segments.push({lap:r.lap,leader:c.driverId,time:r.time});
    if(c.lap>=r.totalLaps||(r.limitFinishLap&&c.lap>=r.limitFinishLap)){r.chequered=true;event(s,'方格旗：领先车手完成比赛，其余车手在下一次过线结束','info');}
    if(!r.chequered){const old=r.control;controlEvents(s,track);if(old!==r.control)rescaleControl(s,old,r.control);}
  }
  if(r.chequered){c.finished=true;c.phase='FINISHED';c.segmentEnd=NEVER;return;}
  if(chance(s,(100-driverOf(s,c.driverId).attributes.consistency)*.000045*MODES[c.mode].risk)){c.penalty+=0;event(s,`${c.name} 锁死轮胎，下一段损失时间`,'warning');c.pendingDelay=between(s,1,3);}
  if(chance(s,.0015*MODES[c.mode].risk))trackLimits(s,c);
  if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
  if(chance(s,.015/r.totalLaps)){c.drsBroken=true;event(s,`${c.name} 的 DRS 发生故障`,'radio');}
  if(c.fuel<=0)retire(s,c,'燃油耗尽');
  reliability(s,c,track);if(c.retired){c.segmentEnd=NEVER;return;}
  prepareRaceLap(s,c);
  if(c.driveThrough&&r.control==='GREEN'){c.driveThrough=false;c.lapStart=r.time;c.phase='PIT';c.pitUntil=r.time+track.pitLoss;c.segmentEnd=NEVER;c.sectors=[];c.sectorTones=[];event(s,`${c.name} 执行穿越维修区罚则`,'penalty');return;}
  if(c.pitRequest){
    c.lapStart=r.time;const before=c.time;pit(s,c,track);const delay=c.time-before;c.time=before;
    if(delay>0){c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.phase='PIT';c.pitUntil=r.time+delay;c.segmentEnd=NEVER;c.usedWet=c.usedWet||['I','W'].includes(c.compound);return;}
  }
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
  if(c.pendingDelay){c.segmentDuration+=c.pendingDelay;c.segmentEnd+=c.pendingDelay;c.pendingDelay=0;}
}
function oldFlying(c){return c.phase==='FLY';}
export function suspendQualifying(s){
  const r=s.race;requireCondition(r?.qualifying&&!r.finished,'当前不是排位赛');r.red=true;r.control='RED';
  for(const c of r.cars)if(!['ELIMINATED','GARAGE'].includes(c.phase)){c.phase='GARAGE';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.lapValid=false;c.progress=0;c.speed=0;}
  event(s,'排位红旗：倒计时冻结，进行中的圈作废；赛车返回车库等待恢复','danger');
}
function stageDuration(r){return (r.kind==='SQ'?[12,10,8]:[18,15,12])[r.q.stage-1]*60;}
export function startQualifying(s){
  const w=s.calendar.weekend,kind=w?.sessions[w.index];requireCondition(kind==='Q'||kind==='SQ','当前不是排位赛');requireCondition(!s.race||s.race.finished,'请先完成当前场次');
  const ids=s.teams.flatMap(t=>t.drivers),practiceOrder=w.practice.at(-1)?.rows.map(x=>x.id)||ids,q={kind,stage:1,active:ids,eliminated:[],stages:[],done:false,status:'RUNNING'};
  w.qualifying=q;
  const wet=w.weatherStart||0;
  s.race={realtime:true,qualifying:true,q,kind,sprint:false,totalLaps:0,lap:0,time:0,running:true,finished:false,red:false,control:'GREEN',controlLeft:0,sequence:0,events:[],penalties:[],cars:[],fastest:{time:9999,driverId:null},bestSectors:[9999,9999,9999],wetness:wet,rain:wet,fuelPerLap:currentTrack(s).length*.31,positions:[],segments:[],forecast:[],result:null};
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()){
    const c={driverId:id,name:driverOf(s,id).name,teamId:t.id,slot,grid:practiceOrder.indexOf(id)+1,position:practiceOrder.indexOf(id)+1,time:0,lastLap:0,best:9999,lap:0,compound:'S',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:0,mode:'push',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,plan:{},planUsed:[],stageBest:9999,bestAt:NEVER,afterLap:'IN',autoQual:false};
    initCar(c);c.phase='GARAGE';s.race.cars.push(c);
  }
  s.settings.speed=1;beginQualStage(s);event(s,`${kind}1 开始，出场圈不计成绩，计时归零后仅允许完成已经开始的飞行圈`);
  return '排位开始 · 请下达出场指令';
}
function beginQualStage(s){
  const r=s.race,q=r.q;q.status='RUNNING';q.deadline=r.time+stageDuration(r);q.remaining=stageDuration(r);r.fastest={time:9999,driverId:null};r.bestSectors=[9999,9999,9999];
  for(const c of r.cars){
    c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.stageBest=9999;c.bestAt=NEVER;c.bestSectors=[9999,9999,9999];c.sectors=[];c.sectorSpeeds=[];c.lastSectors=[];c.lastSectorTones=[];c.sectorTones=[];c.currentLap=0;c.progress=0;c.sector=0;c.segmentEnd=NEVER;c.nextRelease=NEVER;c.stageTyre=null;c.hasSet=false;c.attempted=false;c.flyAttempted=false;
    if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,55);
  }
  refreshPositions(s);
}
export function allowedQualTyres(s,c){
  const r=s.race;if(r.wetness>.15)return ['S','M','H','I','W'];
  if(r.kind==='Q'&&s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id))return [['H','M','S'][r.q.stage-1]];
  return r.kind==='SQ'?[r.q.stage<3?'M':'S']:['S','M','H'];
}
function sendQual(s,c,compound,fresh=true){
  const r=s.race;requireCondition(r.q.status==='RUNNING'&&r.time<r.q.deadline,'本段已结束，禁止出场');requireCondition(c.phase==='GARAGE','车手尚未回到车库');
  requireCondition(allowedQualTyres(s,c).includes(compound),'本段只允许配方：'+allowedQualTyres(s,c).join(' / '));
  const regulated=r.kind==='SQ'&&r.wetness<=.15;
  if(regulated&&c.stageTyre){requireCondition(compound===c.stageTyre,'同一段冲刺排位仅可使用一套指定轮胎');fresh=false;}
  if(!fresh)requireCondition(c.hasSet&&c.compound===compound,'没有可复用的这套轮胎，请选择新胎');
  if(fresh){requireCondition(useTyre(s,c,compound),'该配方没有新胎可用');c.hasSet=true;c.stageTyre=compound;}
  c.fuel=r.fuelPerLap*7;c.phase='OUT';c.sector=0;c.progress=0;c.lapStart=r.time;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.afterLap='IN';c.outChoice='FLY';c.lapValid=true;c.nextRelease=NEVER;c.consecutive=false;c.attempted=true;
  event(s,`${driverOf(s,c.driverId).code} 离开车库 · ${compound} 胎出场圈`,'pit');startSegment(s,c);
}
export function qualCommand(s,id,command,value){
  const r=s.race,c=r?.cars.find(x=>x.driverId===id&&x.teamId===s.player.teamId);
  requireCondition(r?.qualifying&&!r.finished&&c&&!c.retired,'当前车手不能接收排位指令');
  if(command==='send')sendQual(s,c,value?.compound||allowedQualTyres(s,c)[0],value?.fresh!==false);
  else if(command==='auto'){
    c.autoQual=!c.autoQual;if(!c.autoQual)c.nextRelease=NEVER;if(c.autoQual&&c.phase==='GARAGE'&&r.q.status==='RUNNING')c.nextRelease=r.time+1;
  }
  else if(command==='fly'){requireCondition(c.phase==='OUT','仅在出场圈选择开始飞行圈');c.outChoice='FLY';}
  else if(command==='return'){
    requireCondition(['OUT','FLY','ABORT'].includes(c.phase),'当前阶段无法选择回站');
    if(c.phase==='OUT')c.outChoice='PIT';else c.afterLap='IN';
  }
  else if(command==='abort'){
    requireCondition(c.phase==='FLY','当前没有飞行圈');c.phase='ABORT';c.lapValid=false;c.afterLap='PIT';event(s,`${driverOf(s,id).code} 放弃本次飞行圈，圈末回 Pit`,'radio');
  }
  else if(command==='repeat'){requireCondition(c.phase==='FLY','当前没有飞行圈');c.afterLap='FLY';c.mode='push';}
  else throw new Error('排位指令无效');
  return '排位指令已确认';
}
function garage(s,c){
  const r=s.race;c.phase='GARAGE';c.progress=0;c.speed=0;c.segmentEnd=NEVER;c.currentLap=0;c.nextRelease=NEVER;
  if((c.teamId!==s.player.teamId||c.autoQual)&&r.time+currentTrack(s).baseTime*2.4<r.q.deadline)c.nextRelease=r.time+between(s,15,45);
}
function qualCrossing(s,c){
  const r=s.race,q=r.q,old=c.phase;
  if(old==='FLY'&&c.lapValid){
    if(c.lastLap<c.stageBest-EPS){c.stageBest=c.lastLap;c.bestAt=r.time;}
    event(s,`${driverOf(s,c.driverId).code} · ${c.lastLap.toFixed(3)} 秒${c.lastLap===r.fastest.time?' · 全场最快':''}`,c.lastLap===r.fastest.time?'fastest':'info');
  }
  if(old==='IN'||old==='ABORT'||(old==='OUT'&&c.outChoice==='PIT')){garage(s,c);return;}
  const canFly=r.time<q.deadline-EPS;
  if((old==='OUT'||(old==='FLY'&&c.afterLap==='FLY'))&&canFly&&c.fuel>r.fuelPerLap*2){
    c.phase='FLY';c.flyAttempted=true;c.consecutive=old==='FLY';c.afterLap=c.teamId!==s.player.teamId||c.autoQual?'FLY':'IN';
  }else c.phase='IN';
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
}
function endQualStage(s){
  const r=s.race,q=r.q,w=s.calendar.weekend;
  const rows=r.cars.filter(c=>q.active.includes(c.driverId)).sort((a,b)=>a.stageBest-b.stageBest||a.bestAt-b.bestAt||Number(b.flyAttempted)-Number(a.flyAttempted)||Number(b.attempted)-Number(a.attempted)||(a.qualRank||a.grid)-(b.qualRank||b.grid)).map(c=>({id:c.driverId,name:c.name,teamId:c.teamId,time:c.stageBest,stage:q.stage,compound:c.compound,noTime:c.stageBest>=9999,sectors:copy(c.bestSectors),achievedAt:c.bestAt}));
  q.stages.push(rows);
  // 107% is shown as a steward-review flag rather than inventing discretionary permission.
  if(q.stage===1&&r.wetness<=.15&&rows[0]?.time<9999)w.review107=rows.filter(x=>x.time>rows[0].time*1.07).map(x=>x.id);
  if(q.stage<3){
    rows.forEach((row,i)=>{const car=r.cars.find(c=>c.driverId===row.id);car.qualRank=i+1;});
    const n=eliminationSize(s.teams.length*2);q.eliminated=rows.slice(-n).concat(q.eliminated);q.active=rows.slice(0,-n).map(x=>x.id);q.status='BREAK';q.breakEnd=r.time+(r.kind==='Q'&&q.stage===2?480:420);q.remaining=q.breakEnd-r.time;
    for(const c of r.cars){c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.progress=0;c.speed=0;}
    event(s,`${r.kind}${q.stage} 结束，${n} 台赛车淘汰；进入节间休息`,'info');
  }else{
    q.done=true;q.status='DONE';r.finished=true;r.running=false;w.grids[r.kind]=rows.concat(q.eliminated).map(x=>x.id);if(r.kind==='Q')w.q3=rows.map(x=>x.id);w.index++;
    for(const c of r.cars){c.phase='GARAGE';c.segmentEnd=NEVER;}
    news(s,`${r.kind} 排位结束：${rows[0]?.name||'无'} 获杆位`);
  }
}
export function skipQualBreak(s){requireCondition(s.race?.qualifying&&s.race.q.status==='BREAK','当前没有节间休息');advanceRealtime(s,s.race.q.breakEnd-s.race.time,true);return '节间休息已快进';}
function rescaleControl(s,old,next){
  const rate=x=>x==='SC'?1.45:x==='VSC'?1.35:1,ratio=rate(next)/rate(old);
  for(const c of s.race.cars)if(c.segmentEnd<NEVER&&c.segmentEnd>s.race.time){c.segmentStart=s.race.time-(s.race.time-c.segmentStart)*ratio;c.segmentEnd=s.race.time+(c.segmentEnd-s.race.time)*ratio;c.segmentDuration*=ratio;}
}
export function resumeRealtime(s){
  const r=s.race;if(r.qualifying){requireCondition(r.red,'当前没有红旗');r.red=false;r.control='GREEN';for(const c of r.cars)if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,25);return '排位恢复';}
  const old=r.control;resumeRed(s);rescaleControl(s,old,r.control);return '比赛恢复';
}
export function advanceRealtime(s,seconds,force=false){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');requireCondition(Number.isFinite(seconds)&&seconds>=0&&seconds<=40000,'时间步长无效');
  if(r.finished||r.red||(!r.running&&!force))return '';
  const target=r.time+seconds;let guard=0;
  while(!r.finished&&!r.red&&r.time<target-EPS&&guard++<100000){
    let next=target;if(!r.qualifying&&r.time<r.timeLimit-EPS)next=Math.min(next,r.timeLimit);
    if(r.qualifying){const q=r.q;if(q.status==='BREAK')next=Math.min(next,q.breakEnd);else if(r.time<q.deadline-EPS)next=Math.min(next,q.deadline);}
    for(const c of r.cars){if(c.retired||c.finished)continue;next=Math.min(next,c.segmentEnd,c.nextRelease,c.phase==='PIT'?c.pitUntil:NEVER);}
    r.time=next;refreshPositions(s);
    if(!r.qualifying&&!r.limitFinishLap&&r.time>=r.timeLimit-EPS){r.limitFinishLap=r.lap+2;event(s,'比赛时限已到，领先者将在下一圈结束时收到方格旗','warning');}
    // Stable ID order makes results independent of rendering cadence and sorted tower order.
    for(const c of r.cars.slice().sort((a,b)=>a.driverId.localeCompare(b.driverId))){
      if(c.retired||c.finished)continue;
      if(c.nextRelease<=r.time+EPS){
        c.nextRelease=NEVER;
        if(r.qualifying){if(r.q.status==='RUNNING'&&r.time<r.q.deadline-EPS&&c.phase==='GARAGE'){
          const preferred=r.wetness>.65?'W':r.wetness>.2?'I':r.kind==='SQ'&&r.q.stage<3?'M':'S',stock=s.calendar.weekend.tyres[c.driverId];
          const type=allowedQualTyres(s,c).find(k=>k===preferred&&(stock[k]>0||c.stageTyre===k))||allowedQualTyres(s,c).find(k=>stock[k]>0||c.stageTyre===k);
          if(type)sendQual(s,c,type,stock[type]>0);
        }}else{c.phase='RACE';c.lapStart=r.time;prepareRaceLap(s,c);startSegment(s,c);}
      }
      if(c.phase==='PIT'&&c.pitUntil<=r.time+EPS){c.phase='RACE';c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];startSegment(s,c);c.sectorStart=c.lapStart;}
      if(c.segmentEnd<=r.time+EPS&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase))completeSector(s,c);
    }
    if(r.qualifying){
      s.calendar.weekend.qualifying=r.q;const q=r.q;if(q.status==='BREAK'&&q.breakEnd<=r.time+EPS){q.stage++;beginQualStage(s);event(s,`${r.kind}${q.stage} 开始`);}
      else if(q.status==='RUNNING'&&r.time>=q.deadline-EPS&&!r.cars.some(c=>c.phase==='FLY'&&!c.retired))endQualStage(s);
      q.remaining=Math.max(0,(q.status==='BREAK'?q.breakEnd:q.deadline)-r.time);
    }else if(r.cars.every(c=>c.finished||c.retired))finishRace(s);
    refreshPositions(s);
  }
  requireCondition(guard<100000,'模拟事件上限已达到');return r.finished?'场次结束':r.red?'红旗暂停':'';
}
export function fastForwardLap(s){
  const r=s.race;requireCondition(r?.realtime&&!r.finished,'当前没有实时场次');
  requireCondition(!r.red,'当前红旗暂停，请先恢复场次');
  const leader=r.qualifying?r.cars.find(c=>c.teamId===s.player.teamId&&['FLY','OUT','IN','ABORT'].includes(c.phase))||r.cars.find(c=>['FLY','OUT','IN','ABORT'].includes(c.phase)):r.cars.find(c=>!c.retired&&!c.finished);
  if(!leader){advanceRealtime(s,Math.min(90,r.qualifying?r.q.remaining:90),true);return '已推进比赛时间';}
  const lap=leader.lap;let guard=0;
  while(!r.finished&&!r.red&&!leader.retired&&leader.lap===lap&&guard++<1000){
    const seconds=Math.max(.001,Math.min(leader.phase==='PIT'?leader.pitUntil-r.time:leader.phase==='GRID'?leader.nextRelease-r.time:leader.segmentEnd-r.time,60));advanceRealtime(s,seconds,true);
  }
  return '已快进至本圈结束';
}
export function finishRealtime(s){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');
  if(r.qualifying)for(const c of r.cars)if(c.teamId===s.player.teamId){c.autoQual=true;if(c.phase==='GARAGE')c.nextRelease=r.time+1;}
  let guard=0;while(!r.finished&&guard++<1000){if(r.red)resumeRealtime(s);advanceRealtime(s,60,true);}
  requireCondition(r.finished,'自动模拟未能结束');return '场次已模拟完毕';
}
```

## js/core/rnd.js

```js
// ===== 文件: js/core/rnd.js =====
import {
  PARTS, FACILITIES
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  chance
}
from './rng.js';
import {
  uid, clamp, news, teamOf, requireCondition, mutable
}
from './helpers.js';
import {
  spend, income
}
from './finance.js';
import {
  staffAbility
}
from './staff.js';
export function projectQuote(s,t,part,kind='development',copies=2) {
  const p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  const level=Math.max(...s.parts[t.id].cars.map(c=>c[part].level),...t.projects.filter(x=>x.part===part).map(x=>x.level),1)+1;
  const aero=p.department==='aero';
  const feedback=t.drivers.reduce((a,id)=>a+s.drivers.find(d=>d.id===id).attributes.feedback,0)/200;
  const aggressive=s.staff.some(x=>x.teamId===t.id&&x.trait==='aggressive');
  const efficiency=(.65+(staffAbility(s,t.id,'technical')*.55+staffAbility(s,t.id,'aero')*.25+staffAbility(s,t.id,'performance')*.2)/180)*(1+t.departments[p.department].level*.07)*(aero?1+(t.facilities.wind.level+t.facilities.cfd.level)*.025:1)*(1+feedback*.12)*(aggressive?1.1:1);
  return {
    level,cost:p.cost*(1+level*.12)*(kind==='research'?1.1:1),days:Math.ceil(p.days*(1+level*.05)/efficiency),gain:2.2/(1+level*.08),wind:aero?18+level*2:0,cfd:aero?24+level*2:0,risk:clamp(.04+level*.008+(aggressive?.05:0)-(staffAbility(s,t.id,'reliability')-60)*.001,.015,.25),manufacturing:p.cost*.22*copies
  };
}
export function startProject(s,part,kind='development',copies=2,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  requireCondition(['development','research'].includes(kind)&&[1,2].includes(copies),'研发参数无效');
  requireCondition(!(t.type==='customer'&&p.department==='power'),'客户车队不能自主改进动力单元，请依靠供应商');
  requireCondition(!(s.season.year>=2026&&part==='mguh'),'新规赛季不再允许 MGU-H 研发');
  requireCondition(kind!=='research'||s.calendar.round>=Math.floor(s.calendar.events.length*.55),'下赛季研究在赛季过半后开放');
  requireCondition(t.projects.filter(p=>p.status==='researching').length<2+Math.floor(t.facilities.cfd.level/3),'研发槽位已满');
  requireCondition(!t.projects.some(x=>x.part===part&&x.kind===kind&&x.status==='researching'),'相同项目已在进行');
  const q=projectQuote(s,t,part,kind,copies);
  requireCondition(t.wind.used+q.wind<=t.wind.limit&&t.cfd.used+q.cfd<=t.cfd.limit,'风洞或 CFD 额度不足');
  spend(s,t,q.cost+q.manufacturing,`${p.name} ${kind==='research'?'下季研究':'研发与制造预付'}`,true);
  t.wind.used+=q.wind;
  t.cfd.used+=q.cfd;
  const item={
    id:uid(s,'project'),part,kind,copies,...q,remaining:q.days,progress:0,status:'researching',boosted:false,safer:false
  };
  t.projects.push(item);
  news(s,`${t.name} 启动${p.name}${kind==='research'?'下季研究':'升级'}，预计 ${q.days} 天`);
  return '研发项目已立项';
}
export function changeProject(s,id,operation) {
  mutable(s);
  const t=teamOf(s),p=t.projects.find(x=>x.id===id&&x.status==='researching');
  requireCondition(p,'项目不在研发阶段');
  if(operation==='cancel') {
    p.status='cancelled';
    income(s,t,p.manufacturing,'取消项目退还制造预付');
    return '项目已叫停，研发成本不退，制造预付已退回';
  }
  if(operation==='boost') {
    requireCondition(!p.boosted,'已追加过投入');
    spend(s,t,p.cost*.3,'研发追加投入',true);
    p.remaining*=.7;
    p.risk=clamp(p.risk+.025,0,1);
    p.boosted=true;
    return '工期缩短 30%，失败风险上升';
  }
  requireCondition(operation==='safe'&&!p.safer,'已执行风险审查或操作无效');
  spend(s,t,p.cost*.15,'研发风险审查',true);
  p.risk*=.45;
  p.remaining*=1.15;
  p.safer=true;
  return '失败风险降低，剩余工期增加 15%';
}
export function upgradeFacility(s,id) {
  mutable(s);
  const t=teamOf(s),f=t.facilities[id],def=FACILITIES[id];
  requireCondition(f&&def,'设施不存在');
  requireCondition(!f.building&&f.level<6,'设施已在建或达到 6 级');
  spend(s,t,def.cost*(1+f.level*.6),def.name+' 建设投资',false);
  f.building={
    remaining:def.days+f.level*5,total:def.days+f.level*5
  };
  return '设施建设启动（不计入预算帽）';
}
export function upgradeDepartment(s,id) {
  mutable(s);
  const t=teamOf(s),d=t.departments[id];
  requireCondition(d&&d.level<6,'部门已达上限或不存在');
  spend(s,t,2+d.level,'部门扩编',true);
  d.level++;
  d.people+=8;
  return '部门等级与人数已提升';
}
export function advanceRND(s,days) {
  for(let day=0; day<days; day++)advanceOneRND(s,1);
}
function advanceOneRND(s,days) {
  for(const t of s.teams) {
    for(const f of Object.values(t.facilities)) {
      if(f.building) {
        f.building.remaining-=days;
        if(f.building.remaining<=0) {
          f.level++;
          f.building=null;
          news(s,`${t.name} 的设施升级至 ${f.level} 级`);
        }
      }
    }
    const speed=t.id===s.player.teamId?1:DIFFICULTIES[s.settings.difficulty].ai;
    for(const p of t.projects.filter(x=>x.status==='researching')) {
      p.remaining-=days*speed;
      p.progress=clamp(100*(1-p.remaining/p.days));
      if(p.remaining>0)continue;
      if(chance(s,p.risk)) {
        p.status='failed';
        income(s,t,p.manufacturing,'失败项目退还制造预付');
        news(s,`${t.name} 的${PARTS.find(x=>x.id===p.part).name}研发失败`,'warning');
        continue;
      }
      p.status='complete';
      if(p.kind==='research') {
        const dimension=PARTS.find(x=>x.id===p.part).dimension;
        t.research[dimension]=(t.research[dimension]||0)+p.gain;
        news(s,`${t.name} 下赛季研究完成，技术储备增加`);
      }
      else{
        for(let i=0; i<p.copies; i++)s.parts[t.id].production.push({
          id:uid(s,'unit'),part:p.part,level:p.level,gain:p.gain,risk:p.part==='cooling'?0:p.risk*3,remaining:Math.ceil(5/(1+t.facilities.factory.level*.18+t.departments.manufacturing.level*.08))
        });
        news(s,`${t.name} 研发完成，${p.copies} 套部件进入制造队列`);
      }
    }
    const q=s.parts[t.id].production,capacity=factoryCapacity(t);
    let budget=days*capacity;
    for(const item of q) {
      if(budget<=0)break;
      const use=Math.min(item.remaining,budget);
      item.remaining-=use;
      budget-=use;
    }
    for(const item of q.filter(x=>x.remaining<=0)) {
      s.parts[t.id].stock.push(item);
      news(s,`${t.name} 新规格零件生产完成，可分配装车`);
    }
    s.parts[t.id].production=q.filter(x=>x.remaining>0);
  }
}
export function factoryCapacity(t) {
  return 1+Math.floor(t.facilities.factory.level/2)+Math.floor(t.departments.manufacturing.level/3);
}
export function projectCapacity(t) {
  return 2+Math.floor(t.facilities.cfd.level/3);
}
export function researchUnlocked(s) {
  return s.calendar.round>=Math.floor(s.calendar.events.length*.55);
}
export function facilityCost(t,id) {
  return FACILITIES[id].cost*(1+t.facilities[id].level*.6);
}
export function departmentCost(t,id) {
  return 2+t.departments[id].level;
}
export function overrunTesting(s) {
  mutable(s);
  const t=teamOf(s);
  requireCondition(!t.wind.overrun,'本季超额试验已被处罚，不能再次申请');
  spend(s,t,5,'空气动力超额试验罚款',false);
  t.wind.limit+=45;
  t.cfd.limit+=60;
  t.wind.overrun=true;
  t.confidence=clamp(t.confidence-10);
  news(s,`${t.name} 违规增加风洞 / CFD 测试，被罚 $5m，董事会信心 -10`,'warning');
  return '违规试验额度已增加，同时已执行罚款与董事会处罚';
}
```

## js/core/rng.js

```js
// ===== 文件: js/core/rng.js =====
export function seedFrom(value) {
  let h=2166136261;
  for(const c of String(value)) {
    h^=c.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
} // Mulberry32：仅修改可序列化状态 s.rng，保存/加载后继续同一随机序列。
export function random(s) {
  s.rng=(s.rng+0x6D2B79F5)>>>0;
  let t=s.rng;
  t=Math.imul(t^(t>>>15),t|1);
  t^=t+Math.imul(t^(t>>>7),t|61);
  return ((t^(t>>>14))>>>0)/4294967296;
}
export function between(s,a,b) {
  return a+(b-a)*random(s);
}
export function integer(s,a,b) {
  return Math.floor(between(s,a,b+1));
}
export function chance(s,p) {
  return random(s)<p;
}
export function choose(s,items) {
  return items[integer(s,0,items.length-1)];
}
// 只在新生涯向导点击“生成种子”时使用时钟作为初始熵；比赛中不调用。
export function generateSeed(){const source={rng:seedFrom(String(Date.now()))};return 'PIT-'+integer(source,10000000,99999999).toString(36).toUpperCase();}
```

## js/core/rules.js

```js
// ===== 文件: js/core/rules.js =====
import {
  news, clamp
}
from './helpers.js';
export const RACE_POINTS=[25,18,15,12,10,8,6,4,2,1];
export const SPRINT_POINTS=[8,7,6,5,4,3,2,1];
export function seasonRules(year) {
  return {
    fastestLap:year<=2024,cap:year===2022?140:135,sprintFormat:year===2022?'2022':year===2023?'2023':'2024',major:year===2026,monacoStops:year>=2025?2:0
  };
}
export function sessionsFor(year,sprint) {
  if(!sprint)return ['FP1','FP2','FP3','Q','RACE'];
  if(year===2022)return ['FP1','Q','FP2','SPRINT','RACE'];
  if(year===2023)return ['FP1','Q','SQ','SPRINT','RACE'];
  return ['FP1','SQ','SPRINT','Q','RACE'];
}
export function eliminationSize(count) {
  return Math.max(1,Math.floor((count-10)/2));
}
export function penalty(s,car,seconds,reason) {
  car.penalty+=seconds;
  const record={
    lap:s.race.lap,driver:car.driverId,seconds,reason
  };
  s.race.penalties.push(record);
  s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：${reason}${seconds>0?'，罚时 '+seconds+' 秒':''}`,type:'penalty'
  });
}
export function trackLimits(s,car) {
  car.warnings++;
  if(car.warnings===3)s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：赛道限制黑白旗（三次警告）`,type:'warning'
  });
  if(car.warnings>=4)penalty(s,car,car.warnings===4?5:10,'多次超出赛道限制');
}
export function checkBudget(s,t) {
  const f=s.finance[t.id];
  const excess=f.capUsed-f.capLimit;
  const severe=excess>f.capLimit*.1;
  if(excess<=0||f.audited&&(!severe||f.disqualified))return;
  f.audited=true;
  const hard=s.settings.difficulty==='hard';
  const fine=Math.max(1,excess*(hard?1.8:1.2));
  f.cash-=fine;
  f.ledger.unshift({
    day:s.calendar.day,label:'预算帽调查罚款',amount:-fine,cap:false
  });
  t.wind.limit*=0.85;
  t.cfd.limit*=0.85;
  t.confidence=clamp(t.confidence-12);
  if(severe) {
    t.points=0;
    f.disqualified=true;
    for(const r of t.results)r.points=0;
    for(const d of s.drivers){for(const r of d.results)if(r.teamId===t.id)r.points=0;d.points=d.results.reduce((sum,r)=>sum+r.points,0);}
    for(const race of s.history.races)if(!race.year||race.year===s.season.year)for(const r of race.rows)if(r.teamId===t.id)r.points=0;
    for(const e of s.calendar.events)if(e.result)for(const r of e.result.rows)if(r.teamId===t.id)r.points=0;
    if(s.race?.result)for(const r of s.race.result.rows)if(r.teamId===t.id)r.points=0;
  }
  news(s,`${t.name} 预算帽超支 $${excess.toFixed(2)}m，罚款 $${fine.toFixed(2)}m、测试额度削减 15%${f.disqualified?'，并取消本季积分资格':''}`,'warning');
}
export function pitLanePenalty(s,car,reason){
  const t=s.teams.find(t=>t.id===car.teamId);
  if(!t.pitLaneNext)t.pitLaneNext=[false,false];
  t.pitLaneNext[car.slot]=true;
  s.race.penalties.push({lap:s.race.lap,driver:car.driverId,seconds:0,reason:reason+'，下场正赛维修区起步'});
  s.race.events.unshift({lap:s.race.lap,text:car.name+'：'+reason+'，下场正赛维修区起步',type:'penalty'});
}
```

## js/core/save.js

```js
// ===== 文件: js/core/save.js =====
import { assignDriverCodes } from './driverCodes.js';
import { attachRealtimeRace } from './realtime.js';
// ===== 文件: js/core/save.js =====
import {
  copy, requireCondition
}
from './helpers.js';
import {
  PARTS
}
from '../data/parts.js';
import {
  TRACKS
}
from '../data/tracks.js';
const PREFIX='apex-manager-v2-';
export const SLOT_NAMES={
  auto:'自动存档',1:'手动槽位 1',2:'手动槽位 2',3:'手动槽位 3'
};
export function migrate(raw) {
  let s=copy(raw);
  requireCondition(s&&typeof s==='object'&&!Array.isArray(s),'存档必须是对象');
  if(s.schemaVersion===1) {
    s.schemaVersion=2;
    s.history=s.history||{
      races:[],seasons:[]
    };
    s.settings.autosave=true;
    for(const t of s.teams||[])t.carry=t.carry||{
    };
  }
  if(s.schemaVersion===2){s.schemaVersion=3;assignDriverCodes(s);if(s.race&&!s.race.finished)attachRealtimeRace(s);}
  requireCondition(s.schemaVersion===3,'存档版本不受支持（本版本为 3）');
  // Repair the 2.0.0 disabled-second-stop request in saves made before lap one.
  if(s.race?.realtime&&!s.race.qualifying&&!s.race.finished&&Array.isArray(s.race.cars))for(const c of s.race.cars){
    if(c.lap===0&&c.plan?.secondLap===0&&Array.isArray(c.planUsed)&&c.planUsed.includes(1)){
      c.planUsed=c.planUsed.filter(i=>i!==1);
      const manual=Array.isArray(s.race.events)&&s.race.events.some(e=>e.type==='radio'&&e.text?.startsWith(c.name+'：收到进站指令'));
      if(!manual&&c.pitRequest===c.plan.next)c.pitRequest=null;
    }
  }
  return s;
}
export function validate(raw) {
  const s=migrate(raw);
  requireCondition(Array.isArray(s.teams)&&s.teams.length>=10&&s.teams.length<=11,'车队数据损坏');
  requireCondition(Array.isArray(s.drivers)&&s.drivers.length>=20&&s.drivers.length<=500,'车手数据损坏');
  requireCondition(Array.isArray(s.staff)&&s.staff.length<=1000,'员工数据损坏');
  requireCondition(Number.isInteger(s.rng)&&s.rng>=0&&s.rng<=4294967295,'随机状态损坏');
  requireCondition(Number.isInteger(s.nextId)&&s.nextId>=0,'对象编号损坏');
  requireCondition(s.player&&s.settings&&s.season&&s.calendar&&s.history&&Array.isArray(s.news),'存档缺少必要字段');
  requireCondition(['easy','standard','hard'].includes(s.settings.difficulty),'难度数据损坏');
  requireCondition(Number.isInteger(s.season.year)&&s.season.year>=2022&&s.season.year<=2200&&s.season.rules,'赛季数据损坏');
  requireCondition(s.teams.some(t=>t.id===s.player.teamId),'玩家车队不存在');
  requireCondition(Array.isArray(s.calendar.events)&&s.calendar.events.length>=22&&s.calendar.events.length<=24&&s.calendar.events.every(e=>TRACKS[e.track]),'赛历损坏');
  requireCondition(Number.isInteger(s.calendar.round)&&s.calendar.round>=0&&s.calendar.round<=s.calendar.events.length&&/^\d{4}-\d{2}-\d{2}$/.test(s.calendar.date),'赛历进度损坏');
  requireCondition(new Set(s.teams.map(t=>t.id)).size===s.teams.length&&new Set(s.drivers.map(d=>d.id)).size===s.drivers.length,'对象编号重复');
  const active=[];
  for(const t of s.teams) {
    const f=s.finance?.[t.id],p=s.parts?.[t.id];
    requireCondition(f&&Number.isFinite(f.cash)&&Number.isFinite(f.capUsed)&&Number.isFinite(f.capLimit)&&f.capLimit>0&&Array.isArray(f.ledger)&&Array.isArray(f.sponsors),'财务数据损坏');
    requireCondition(t.departments&&t.facilities&&t.wind&&t.cfd&&Array.isArray(t.projects)&&Array.isArray(t.results)&&t.objectives&&Array.isArray(t.gridPenalties),'车队管理数据损坏');
    requireCondition(t.drivers?.length===2,'车手阵容损坏');
    for(const id of t.drivers) {
      requireCondition(s.drivers.some(d=>d.id===id&&d.teamId===t.id),'车手归属冲突');
      active.push(id);
    }
    requireCondition(p&&p.cars?.length===2&&Array.isArray(p.stock)&&Array.isArray(p.production),'部件数据损坏');
    for(const car of p.cars)for(const def of PARTS)requireCondition(car[def.id]&&Number.isFinite(car[def.id].wear)&&Number.isFinite(car[def.id].gain),'部件规格损坏');
  }
  requireCondition(new Set(active).size===active.length,'车手重复占位');
  for(const d of s.drivers)requireCondition(typeof d.name==='string'&&d.name.length<=100&&d.attributes&&Object.keys(d.attributes).length>=14&&Object.values(d.attributes).every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&d.contract&&Number.isFinite(d.contract.salary)&&Array.isArray(d.results),'车手属性损坏');
  if(s.calendar.weekend) {
    const w=s.calendar.weekend;
    requireCondition(Array.isArray(w.sessions)&&Number.isInteger(w.index)&&w.index>=0&&w.index<=w.sessions.length&&w.setups&&w.ideal&&w.strategy&&w.confidence&&w.tyres&&w.grids,'周末数据损坏');
    for(const t of s.teams)requireCondition(w.setups[t.id]?.length===2&&w.ideal[t.id]?.length===2&&t.drivers.every(id=>w.tyres[id]&&w.strategy[id]),'周末赛车数据损坏');
  }
  if(s.race)requireCondition(s.calendar.weekend&&Array.isArray(s.race.cars)&&s.race.cars.length===active.length&&s.race.cars.every(c=>active.includes(c.driverId))&&Number.isFinite(s.race.lap)&&s.race.lap<=s.race.totalLaps&&Array.isArray(s.race.events)&&Array.isArray(s.race.penalties),'比赛数据损坏');
  if(s.race?.realtime){
    const r=s.race;requireCondition(Number.isFinite(r.time)&&r.time>=0&&r.cars.every(c=>Number.isFinite(c.segmentEnd)&&Number.isFinite(c.segmentDuration)&&Number.isFinite(c.progress)&&c.progress>=0&&c.progress<=1&&Number.isInteger(c.sector)&&c.sector>=0&&c.sector<=2),'实时计时数据损坏');
    requireCondition(r.cars.every(c=>['GRID','RACE','PIT','GARAGE','OUT','FLY','IN','ABORT','ELIMINATED','FINISHED'].includes(c.phase)&&['segmentStart','segmentEnd','segmentDuration','sectorStart','lapStart','currentLap','speed','progress','totalDistance','nextRelease','pitUntil'].every(k=>Number.isFinite(c[k]))&&c.segmentDuration>=0),'实时赛车状态损坏');
    if(r.qualifying){requireCondition(r.q&&[1,2,3].includes(r.q.stage)&&['RUNNING','BREAK','DONE'].includes(r.q.status),'排位阶段损坏');s.calendar.weekend.qualifying=r.q;}
  }
  requireCondition(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code))&&new Set(s.drivers.map(d=>d.code)).size===s.drivers.length,'车手缩写数据损坏');
  let nodes=0;
  const walk=(x,depth)=> {
    requireCondition(depth<45&&++nodes<1200000,'存档结构超出安全限制');
    if(typeof x==='number')requireCondition(Number.isFinite(x),'存档包含无效数值');
    if(typeof x==='string')requireCondition(x.length<10000,'存档文本异常');
    if(x&&typeof x==='object')for(const [k,v]of Object.entries(x)) {
      requireCondition(!['__proto__','constructor','prototype'].includes(k),'存档包含无效字段');
      walk(v,depth+1);
    }
  };
  walk(s,0);
  return s;
}
export function exportText(s) {
  return JSON.stringify({
    format:'APEX_MANAGER',schemaVersion:3,state:s
  },null,2);
}
export function importText(text) {
  requireCondition(typeof text==='string'&&text.length<=12*1024*1024,'存档为空或超过 12 MB');
  let data;
  try{
    data=JSON.parse(text);
  }
  catch(e) {
    throw new Error('JSON 无法解析，请检查是否复制完整');
  }
  return validate(data?.format==='APEX_MANAGER'?data.state:data);
}
function storage() {
  try{
    return globalThis.localStorage;
  }
  catch(e) {
    throw new Error('浏览器禁用本地存储，请使用 JSON 导出备份');
  }
}
export function saveSlot(s,slot='auto') {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'存档槽位无效');
  try{
    storage().setItem(PREFIX+slot,JSON.stringify({
      format:'APEX_MANAGER',savedAt:new Date().toISOString(),state:s
    }));
    return new Date().toLocaleTimeString('zh-CN',{
      hour12:false
    });
  }
  catch(e) {
    throw new Error('保存失败：存储空间不足或浏览器限制，请导出 JSON 备份');
  }
}
export function loadSlot(slot='auto') {
  const text=storage().getItem(PREFIX+slot);
  requireCondition(text,'该槽位暂无存档');
  return importText(text);
}
export function slotInfo(slot) {
  try{
    const text=storage().getItem(PREFIX+slot);
    if(!text)return null;
    const d=JSON.parse(text);
    return {
      savedAt:d.savedAt,year:d.state?.season?.year,team:d.state?.teams?.find(t=>t.id===d.state?.player?.teamId)?.name||'未知车队'
    };
  }
  catch(e) {
    return {
      broken:true
    };
  }
}
export function deleteSlot(slot) {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'槽位无效');
  storage().removeItem(PREFIX+slot);
}
```

## js/core/season.js

```js
// ===== 文件: js/core/season.js =====
import {
  currentEvent, advanceDays, makeCalendar
}
from './calendar.js';
import {
  income
}
from './finance.js';
import {
  checkBudget, seasonRules
}
from './rules.js';
import {
  aiTransfers
}
from './ai.js';
import {
  initParts
}
from './car.js';
import {
  PARTS
}
from '../data/parts.js';
import {
  clamp, copy, teamOf, teamStandings, driverStandings, news, requireCondition, mutable
}
from './helpers.js';
import {
  chance, between
}
from './rng.js';
export function closeWeekend(s) {
  mutable(s);
  const w=s.calendar.weekend;
  requireCondition(w&&w.index>=w.sessions.length,'比赛周末尚未结束');
  currentEvent(s).completed=true;
  s.calendar.round++;
  s.calendar.weekend=null;
  s.race=null;
  advanceDays(s,3);
  if(s.calendar.round>=s.calendar.events.length)settleSeason(s);
  return s.season.offseason?'赛季结算完成，转会窗已开启':'本站已结算，可安排工厂事务与下一站';
}
export function settleSeason(s) {
  requireCondition(!s.season.offseason,'赛季已结算');
  const standings=teamStandings(s),drivers=driverStandings(s);
  s.history.seasons.push({
    year:s.season.year,teams:standings.map(t=>({
      id:t.id,name:t.name,points:t.points,rank:standings.indexOf(t)+1
    })),drivers:drivers.map(d=>({
      id:d.id,name:d.name,points:d.points
    })),playerRank:standings.findIndex(t=>t.id===s.player.teamId)+1
  });
  for(const [i,t]of standings.entries()) {
    income(s,t,Math.max(22,78-i*5.5),'赛季制造商奖金');
    checkBudget(s,t);
    t.previousRank=i+1;
    t.reputation=clamp(t.reputation+(i<4?3:i>=8?-2:0),25,99);
    const target=t.objectives.target;
    const met=i+1<=target||t.objectives.points>0&&t.custom;
    t.confidence=clamp(t.confidence+(met?10:-18));
    for(const id of t.drivers) {
      const d=s.drivers.find(x=>x.id===id);
      d.contract.years=Math.max(0,d.contract.years-1);
    }
    for(const e of s.staff.filter(x=>x.teamId===t.id))e.years=Math.max(0,e.years-1);
  }
  for(const d of s.drivers) {
    d.age++;
    if(d.age>=39&&chance(s,.2+(d.age-39)*.08)) {
      d.retired=true;
      news(s,`${d.name} 宣布赛季结束后退役`);
    }
  }
  aiTransfers(s);
  s.season.offseason=true;
  s.season.nextRules=s.season.year+1===2026?'2026 技术重置：气动收益保留 35%，电能部署权重上升、MGU-H 退出。提前研究以 150% 系数转化。后续赛历沿用 2025，属于架空生涯。':'渐进规则调整：旧规格增益保留 75%，下季研究转化为基础性能。';
  news(s,'赛季结束：奖金到账，转会窗开启。'+s.season.nextRules);
  const p=teamOf(s);
  if(p.confidence<=0&&!s.season.gameOver)s.season.gameOver='连续未达董事会目标，本次经理生涯结束。';
}
export function nextSeason(s) {
  mutable(s);
  requireCondition(s.season.offseason,'请先完成当前赛季');
  const player=teamOf(s);
  for(const id of player.drivers) {
    const d=s.drivers.find(x=>x.id===id);
    requireCondition(!d.retired&&d.contract.years>0,'请在转会窗为两位主力续约或签入替代车手');
  }
  requireCondition(s.staff.some(x=>x.teamId===player.id&&x.role==='principal'&&x.years>0),'请为车队领队续约或聘用新领队');
  const year=s.season.year+1,major=year===2026;
  s.season={
    year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
  };
  const events=makeCalendar(year);
  s.calendar={
    events,round:0,weekend:null,day:0,date:`${year}-02-01`
  };
  for(const t of s.teams) {
    const carry={
      ...t.carry
    };
    for(const part of PARTS) {
      const avg=s.parts[t.id].cars.reduce((sum,c)=>sum+c[part.id].gain,0)/2;
      carry[part.dimension]=(carry[part.dimension]||0)+avg;
    }
    for(const key of Object.keys(carry))carry[key]*=major?.35:.75;
    for(const [key,gain]of Object.entries(t.research))carry[key]=(carry[key]||0)+gain*(major?1.5:1);
    t.carry=carry;
    t.research={
    };
    t.projects=[];
    t.points=0;
    t.wins=0;
    t.results=[];
    t.gridPenalties=[0,0];t.pitLaneNext=[false,false];
    t.wind={
      limit:Math.round(180+(t.previousRank-1)*14),used:0
    };
    t.cfd={
      limit:Math.round(240+(t.previousRank-1)*18),used:0
    };
    t.objectives={
      target:t.custom?Math.max(5,t.previousRank-1):Math.max(1,t.previousRank-1),points:0,finish:0,podiums:0
    };
    const f=s.finance[t.id];
    f.capUsed=0;
    f.capLimit=s.season.rules.cap*(s.settings.difficulty==='easy'?1.06:s.settings.difficulty==='hard'?.98:1);
    f.audited=false;
    f.disqualified=false;
    f.rescue=false;
    for(const sp of f.sponsors)sp.paid=0;
    initParts(s,t);
    for(const e of s.staff.filter(x=>x.teamId===t.id&&t.id!==s.player.teamId&&x.years===0))e.years=2;
  }
  for(const d of s.drivers) {
    d.points=0;
    d.results=[];
    d.wins=0;
    d.fastest=0;
    d.fatigue=0;
  }
  s.race=null;
  news(s,`${year} 赛季正式开启${year>2025?'（架空生涯，沿用 2025 赛道与冲刺站点）':''}`);
  return '新赛季已开启';
}
```

## js/core/staff.js

```js
// ===== 文件: js/core/staff.js =====
import {
  ROLES, TRAITS, STAFF_POOL
}
from '../data/staff-data.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  uid, clamp, news, teamOf, requireCondition, rosterMutable
}
from './helpers.js';
import {
  spend, income
}
from './finance.js';
export function staffAbility(s,teamId,role) {
  const group=s.staff.filter(x=>x.teamId===teamId&&x.role===role);
  return group.length?group.reduce((a,x)=>a+x.ability*(.8+x.morale*.002),0)/group.length:45;
}
export function seedStaff(s,t) {
  for(const [i,role]of Object.keys(ROLES).entries())s.staff.push({
    id:uid(s,'staff'),name:STAFF_POOL[(i+t.logo)%STAFF_POOL.length].name,role,teamId:t.id,ability:clamp(t.performance+between(s,-10,2),50,95),trait:Object.keys(TRAITS)[i%7],salary:.45+(t.performance-60)*.035,years:2,morale:78,loyalty:between(s,55,90)
  });
}
export function hireStaff(s,id,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),candidate=s.staff.find(x=>x.id===id);
  requireCondition(candidate&&candidate.teamId!==t.id,'员工不可签约');
  requireCondition(Number.isFinite(salary)&&salary>=.1&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const occupied=s.staff.filter(x=>x.teamId===t.id&&x.role===candidate.role).length;
  requireCondition(occupied<2,'同一岗位最多两位员工，请先解约');
  const willing=clamp(.35+(salary/candidate.salary-1)*.55+(t.reputation-candidate.ability)*.012, .08,.98);
  if(!chance(s,willing)) {
    news(s,`${candidate.name} 拒绝了报价；提高薪资或提升车队声望后可再次谈判`,'warning');
    return '谈判未达成';
  }
  const fee=candidate.teamId?candidate.salary*candidate.years*.6:0;
  spend(s,t,fee,'员工签约违约金',true);
  if(candidate.teamId)income(s,teamOf(s,candidate.teamId),fee,'员工转会补偿');
  Object.assign(candidate,{
    teamId:t.id,salary,years,morale:85,loyalty:65
  });
  news(s,`${candidate.name} 加盟 ${t.name}，担任${ROLES[candidate.role]}`);
  return '签约成功';
}
export function renewStaff(s,id,salary,years) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  requireCondition(Number.isFinite(salary)&&salary>=e.salary*.95&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价需至少为原薪资的 95%，年限 1—5 年');
  e.salary=salary;
  e.years=years;
  e.morale=clamp(e.morale+7);
  e.loyalty=clamp(e.loyalty+10);
  return '员工已续约';
}
export function fireStaff(s,id) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  spend(s,teamOf(s),e.salary*e.years*.5,'员工解约补偿',true);
  e.teamId=null;
  e.morale=55;
  return '员工合同已解除';
}
export function staffEvents(s) {
  for(const e of s.staff.filter(x=>x.teamId)) {
    e.morale=clamp(e.morale+between(s,-2,2));
    if(e.loyalty<65&&chance(s,.003)) {
      const buyer=choose(s,s.teams.filter(t=>t.id!==e.teamId));
      if(s.finance[buyer.id].cash>e.salary*3) {
        const old=teamOf(s,e.teamId);
        spend(s,buyer,e.salary,'员工挖角补偿',true);
        income(s,old,e.salary,'员工离职补偿');
        e.teamId=buyer.id;
        e.salary*=1.2;
        e.loyalty=80;
        news(s,`${e.name} 接受 ${buyer.name} 报价，离开 ${old.name}`,'warning');
      }
    }
  }
}
```

## js/core/state.js

```js
// ===== 文件: js/core/state.js =====
import { assignDriverCodes, setDriverCode } from './driverCodes.js';
import { startRealtimeRace, startQualifying, advanceRealtime, qualCommand, skipQualBreak, fastForwardLap, finishRealtime, resumeRealtime } from './realtime.js';
// ===== 文件: js/core/state.js =====
import {
  seasonTeams
}
from '../data/teams.js';
import {
  DRIVER_DATA, RESERVES
}
from '../data/drivers-data.js';
import {
  STAFF_POOL
}
from '../data/staff-data.js';
import {
  DEPARTMENTS, FACILITIES
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  seedFrom, choose
}
from './rng.js';
import {
  copy, uid, clamp, teamOf, news, requireCondition
}
from './helpers.js';
import {
  seasonRules
}
from './rules.js';
import {
  makeCalendar, enterWeekend, changeSetup, setStrategy, waitDays
}
from './calendar.js';
import {
  initParts, replacePart, fitPart
}
from './car.js';
import {
  initFinance, signSponsor, spend, emergency
}
from './finance.js';
import {
  seedStaff, hireStaff, renewStaff, fireStaff
}
from './staff.js';
import {
  makeDriver, createCustomDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth
}
from './drivers.js';
import {
  startProject, changeProject, upgradeFacility, upgradeDepartment, overrunTesting
}
from './rnd.js';
import {
  practice, qualifying, startRace, raceCommand, tick, resumeRed, simulateToEnd
}
from './race.js';
import {
  closeWeekend, nextSeason
}
from './season.js';
let state=null;
export function getState() {
  return state;
}
export function setState(value) {
  state=value;
}
function enrichTeam(s,t) {
  Object.assign(t,{
    points:0,wins:0,results:[],confidence:t.custom?65:80,projects:[],research:{
    },carry:{
    },gridPenalties:[0,0],personality:choose(s,['激进','稳健','吝啬','技术优先']),facilities:Object.fromEntries(Object.keys(FACILITIES).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/9),1,5),building:null
    }])),departments:Object.fromEntries(Object.keys(DEPARTMENTS).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/10),1,4),people:t.custom?12:40,supervisor:k==='aero'?'空气动力主管':'部门主管'
    }])),wind:{
      limit:180+(t.previousRank-1)*14,used:0
    },cfd:{
      limit:240+(t.previousRank-1)*18,used:0
    },objectives:{
      target:t.custom?9:Math.max(1,Math.ceil((100-t.performance)/4)),points:0,finish:0,podiums:0
    }
  });
  initParts(s,t);
  initFinance(s,t,t.cash);
  seedStaff(s,t);
  for(const id of t.drivers) {
    const d=s.drivers.find(d=>d.id===id);
    d.teamId=t.id;
  }
}
export function createGame(options={
}) {
  const year=Number(options.year||2025);
  requireCondition([2022,2023,2024,2025].includes(year),'请选择内置赛季');
  const difficulty=options.difficulty||'standard';
  requireCondition(DIFFICULTIES[difficulty],'难度无效');
  const seed=String(options.seed||'APEX-2025');
  requireCondition(seed.length<=100,'种子过长');
  const teams=seasonTeams(year,Number(options.alternate??-1));
  const ids=new Set(teams.flatMap(t=>t.drivers).concat(RESERVES[year]));
  const s={
    schemaVersion:3,rng:seedFrom(seed),nextId:0,teams,drivers:Array.from(ids).map(id=>makeDriver(id,year)),staff:[],parts:{
    },finance:{
    },calendar:{
      events:makeCalendar(year),round:0,weekend:null,day:0,date:`${year}-02-01`
    },race:null,season:{
      year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
    },player:{
      teamId:options.custom?'custom':options.teamId||teams[0].id
    },settings:{
      difficulty,seed,speed:1,autosave:true
    },news:[],history:{
      races:[],seasons:[]
    }
  };
  if(options.custom) {
    const name=String(options.name||'Aurora Racing').trim(),abbr=String(options.abbr||'AUR').toUpperCase();
    requireCondition(name.length>0&&name.length<=32&&/^[A-Z]{3}$/.test(abbr),'车队名称 1—32 字，缩写为三个英文字母');
    const color=options.color||'#68e8b5',secondary=options.secondary||'#eff8ff';
    requireCondition(/^#[0-9a-f]{6}$/i.test(color)&&/^#[0-9a-f]{6}$/i.test(secondary),'颜色无效');
    const type=options.type||'customer',supplier=options.supplier||'Mercedes';
    requireCondition(['customer','factory'].includes(type)&&['Mercedes','Ferrari','HondaRBPT','Renault'].includes(supplier),'制造商或供应商无效');
    const names=options.driverNames||['Ren Aoki','Alex Morgan'];
    const age=Number(options.age||21),pace=Number(options.pace||74);
    const selected=options.driverIds||['custom','custom'];
    const customDrivers=names.map((n,i)=> {
      if(selected[i]&&selected[i]!=='custom') {
        const d=s.drivers.find(x=>x.id===selected[i]); requireCondition(d&&!teams.some(t=>t.drivers.includes(d.id)),'所选车手已被占用'); return d;
      }
      return createCustomDriver(s,n,age,pace,i?91:90);
    });
    requireCondition(customDrivers[0].id!==customDrivers[1].id,'两个席位不能使用同一车手');
    teams.push({
      id:'custom',custom:true,name,fullName:name,abbr,color,secondary,hq:'玩家自建总部',type,supplier,drivers:customDrivers.map(d=>d.id),performance:type==='factory'?60:58,cash:type==='factory'?48:55,reputation:38,logo:clamp(Math.floor(Number(options.logo)||0),0,23),previousRank:11
    });
  }
  requireCondition(teams.some(t=>t.id===s.player.teamId),'车队不存在');
  for(const t of teams)enrichTeam(s,t);
  for(const e of STAFF_POOL)s.staff.push({
    ...copy(e),teamId:null
  });
  for(const t of teams) {
    signSponsor(s,t.reputation>=75?'apex':t.reputation>=55?'orbit':'nova',t.id);
    signSponsor(s,'vector',t.id);
  }
  if(options.custom)spend(s,teamOf(s),12,'入场担保金（游戏化）',false);
  news(s,`${year} 赛季开始。你已接管 ${teamOf(s).name}，所有能力与财务数值均为非官方游戏化设计。`);
  assignDriverCodes(s);
  return s;
} // UI 的全部游戏变更只经过此 action 入口；失败时由调用方保留旧状态。
export function reduce(s,action,p={
}) {
  requireCondition(s,'请先创建或加载游戏');
  requireCondition(!s.season.gameOver||['autosave','speed','pause'].includes(action),'生涯已结束，请读取存档或新建生涯');
  switch(action) {
    case'enterWeekend':return enterWeekend(s);
    case'wait':return waitDays(s,Number(p.days)||7);
    case'setup':return changeSetup(s,Number(p.slot),p.values);
    case'strategy':return setStrategy(s,p.id,p.plan);
    case'practice':return practice(s);
    case'qualifying':startQualifying(s);return p.all?finishRealtime(s):'排位开始';
    case'startQualifying':return startQualifying(s);
    case'advanceRealtime':return advanceRealtime(s,Number(p.seconds));
    case'qualCommand':return qualCommand(s,p.id,p.command,p.value);
    case'skipQualBreak':return skipQualBreak(s);
    case'mapLabels':s.settings.mapLabels=s.settings.mapLabels==='team'?'all':'team';return '地图标注已切换';
    case'timingGap':requireCondition(['leader','interval'].includes(p.value),'时间差模式无效');s.settings.timingGap=p.value;return '时间差模式已切换';
    case'focusDriver':requireCondition(s.race?.cars.some(c=>c.driverId===p.id),'当前场次没有该车手');s.settings.focusDriver=p.id;return '已切换遥测车手';
    case'driverCode':return setDriverCode(s,p.id,p.value);
    case'startRace':return startRealtimeRace(s);
    case'tick':return s.race?.realtime?fastForwardLap(s):tick(s,p.count||1,!!p.untilEvent);
    case'finishRace':return s.race?.realtime?finishRealtime(s):simulateToEnd(s);
    case'resume':return s.race?.realtime?resumeRealtime(s):resumeRed(s);
    case'command':return raceCommand(s,p.id,p.command,p.value);
    case'closeWeekend':return closeWeekend(s);
    case'project':return startProject(s,p.part,p.kind,Number(p.copies)||2);
    case'projectChange':return changeProject(s,p.id,p.operation);
    case'overrun':return overrunTesting(s);
    case'facility':return upgradeFacility(s,p.id);
    case'department':return upgradeDepartment(s,p.id);
    case'replace':return replacePart(s,Number(p.slot),p.id);
    case'fit':return fitPart(s,p.id,Number(p.slot));
    case'hireStaff':return hireStaff(s,p.id,Number(p.salary),Number(p.years));
    case'renewStaff':return renewStaff(s,p.id,Number(p.salary),Number(p.years));
    case'fireStaff':return fireStaff(s,p.id);
    case'signDriver':return signDriver(s,p.id,Number(p.slot),Number(p.salary),Number(p.years));
    case'renewDriver':return renewDriver(s,p.id,Number(p.salary),Number(p.years));
    case'releaseDriver':return releaseDriver(s,p.id);
    case'train':return trainDriver(s,p.id,p.plan);
    case'youth':return recruitYouth(s);
    case'sellYouth':return sellYouth(s,p.id);
    case'sponsor':signSponsor(s,p.id);
    return'赞助合同已签署';
    case'rescue':return emergency(s);
    case'nextSeason':return nextSeason(s);
    case'pause':requireCondition(s.race&&!s.race.finished,'当前没有进行中的比赛');
    s.race.running=!s.race.running;
    return s.race.running?'比赛继续':'比赛已暂停';
    case'speed':requireCondition([1,2,4,8,10,16,32,64].includes(Number(p.value)),'速度无效');
    s.settings.speed=Number(p.value);
    return'比赛速度已调整';
    case'autosave':s.settings.autosave=!!p.value;
    return'自动存档设置已更新';
    default:throw new Error('未知操作');
  }
}
export function dispatch(action,p={
}) {
  // Time updates have validated numeric inputs and no user-supplied transaction.
  if(action==='advanceRealtime')return reduce(state,action,p);
  const before=copy(state);
  try{
    const message=reduce(state,action,p);
    return message;
  }
  catch(e) {
    state=before;
    throw e;
  }
}
```

## js/core/trackGeometry.js

```js
// ===== 文件: js/core/trackGeometry.js =====
import { TRACK_LAYOUTS } from '../data/track-layouts.js';
const cache=new Map();
export const SECTOR_ENDS=[.32,.68,1];
export function geometry(id){
  if(cache.has(id))return cache.get(id);
  const points=TRACK_LAYOUTS[id],lengths=[0];
  for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
  const total=lengths.at(-1),fractions=lengths.map(v=>v/total),value={points,fractions,profiles:[],sectorWeights:[]};cache.set(id,value);
  // Equal-distance samples estimate bend intensity, rather than using the density
  // of GeoJSON vertices. The resulting travel-time profile is deterministic.
  for(let sector=0;sector<3;sector++){
    const start=SECTOR_ENDS[sector-1]||0,width=SECTOR_ENDS[sector]-start,cumulative=[0];
    for(let i=0;i<120;i++){
      const f=start+width*(i+.5)/120,a=trackPoint(id,f-.006),b=trackPoint(id,f),c=trackPoint(id,f+.006);
      const ux=b[0]-a[0],uy=b[1]-a[1],vx=c[0]-b[0],vy=c[1]-b[1];
      const angle=Math.acos(Math.max(-1,Math.min(1,(ux*vx+uy*vy)/(Math.hypot(ux,uy)*Math.hypot(vx,vy)||1))));
      const cost=1+Math.min(2,angle*4);cumulative.push(cumulative.at(-1)+cost);
    }
    const sum=cumulative.at(-1);value.profiles.push(cumulative.map(n=>n/sum));value.sectorWeights.push(sum/120*width);
  }
  const sum=value.sectorWeights.reduce((a,b)=>a+b,0);value.sectorWeights=value.sectorWeights.map(n=>n/sum);return value;
}
export function trackPoint(id,progress){
  const g=geometry(id),p=((progress%1)+1)%1;let low=0,high=g.fractions.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(g.fractions[mid]<=p)low=mid;else high=mid;}
  const f=(p-g.fractions[low])/(g.fractions[high]-g.fractions[low]||1),a=g.points[low],b=g.points[high];return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
}
export function sectorMotion(id,sector,f){
  const profile=geometry(id).profiles[sector];let low=0,high=profile.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(profile[mid]<=f)low=mid;else high=mid;}
  const duration=profile[high]-profile[low]||1,inside=Math.max(0,Math.min(1,(f-profile[low])/duration));
  return {distance:(low+inside)/(profile.length-1),rate:1/(duration*(profile.length-1))};
}
```

## js/ui/calendarView.js

```js
// ===== 文件: js/ui/calendarView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  currentEvent, currentTrack
}
from '../core/calendar.js';
import {
  trackForYear
}
from '../data/tracks.js';
import {
  SESSION_NAMES
}
from '../data/i18n.js';
import {
  h, header, panel, badge, button, field, select, link, table, number, empty, tyreField, tyreInventory, tyreLegend, icon
}
from './uiKit.js';
export function calendarView(s) {
  const t=teamOf(s),event=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  let body='';
  if(s.season.offseason) {
    body=panel('转会窗与技术规则',`<p>${h(s.season.nextRules)}</p><p>请续约车手与领队，或签入替代人选。现金及研发技术储备延续，部件配额和预算帽在新赛季重置。</p><div class="actions">${link('车手转会','drivers')}${link('员工合同','staff')}${button('进入下一赛季','nextSeason',{}, {class:'primary',confirm:'确认阵容后进入下一赛季。未交付的本季项目将取消，不退回费用。确认？'})}</div>`);
  }
  else if(event) {
    body=panel('R'+String(event.round).padStart(2,'0')+' · '+track.name,`<div class="stats-grid compact"><div><small>比赛日期</small><strong>${h(event.date)}</strong></div><div><small>距离</small><strong>${track.length} km × ${track.laps} 圈</strong></div><div><small>维修区</small><strong>${track.pitSpeed} km/h · ${track.pitLength}m</strong></div><div><small>进站通行损失</small><strong>${track.pitLoss} 秒 + 停站</strong></div></div><p class="muted">${w?'发车路面积水预估 '+number((w.weatherStart||0)*100)+'% · ':''}${h(track.notes)} · DRS ${track.drs} 区 · 轮胎磨耗 ×${track.wear} · 降雨倾向 ${number(track.rain*100)}%</p>${w?`<div class="session-strip">${w.sessions.map((x,i)=>`<span class="${i<w.index?'done':i===w.index?'current':''}">${i<w.index?'✓ ':''}${h(SESSION_NAMES[x])}</span>`).join('')}</div><div class="actions">${w.index>=w.sessions.length?button('完成本站结算','closeWeekend',{}, {class:'primary'}):link('进入比赛指挥','race','primary')}</div>`:`<div class="actions">${button('进入比赛周末','enterWeekend',{}, {class:'primary'})}${button('推进工厂 7 天','wait',{days:7})}</div><p class="muted">进入周末会自动推进至赛前两天，并结算工厂、训练、薪资和赞助。期间阵容与新部件登记将锁定。</p>`}`);
    if(w) {
      const current=w.sessions[w.index];
      if(current?.startsWith('FP'))body+=panel('练习与设定采集',`<div class="grid-2">${t.drivers.map((id,slot)=>`<form data-form="setup" class="setup-form"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><input type="hidden" name="slot" value="${slot}">${['前翼角度','尾翼角度','悬挂软硬','胎压 / 能量倾向'].map((label,i)=>{const c=w.confidence[t.id][slot][i];return field(label,`<div class="range-row"><input type="range" name="v${i}" min="0" max="100" value="${w.setups[t.id][slot][i]}" aria-label="${h(label)}"><output>${Math.round(w.setups[t.id][slot][i])}</output></div>`,`采集置信区间 ${number(c.low)}—${number(c.high)}，非精确最优值`);}).join('')}<button type="submit" class="btn">保存设定</button></form>`).join('')}</div><div class="actions">${button('执行 '+SESSION_NAMES[current],'practice',{}, {class:'primary'})}</div>`);
      body+=panel('策略工作台',`${tyreLegend()}<div class="grid-2">${t.drivers.map(id=>{const p=w.strategy[id];return `<form data-form="strategy" class="setup-form"><input type="hidden" name="id" value="${h(id)}"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><div class="form-grid">${tyreField('起步轮胎','start',p.start)}${field('计划首停',`<input name="pitLap" type="number" min="1" max="${track.laps}" value="${p.pitLap}" required>`)}${field('第二次进站（0 为取消）',`<input name="secondLap" type="number" min="0" max="${track.laps}" value="${p.secondLap}" required>`)}${tyreField('进站新胎','next',p.next)}${field('备选方案',select('backup',[['A','A · 严格执行窗口'],['B','B · 安全车低价停站'],['C','C · 自动应对降雨']],p.backup))}${tyreField('雨胎预案','rain',p.rain,{codes:['I','W']})}</div><label class="check"><input type="checkbox" name="auto" ${p.auto?'checked':''}>工程师自动管理比赛策略</label><p class="muted">${s.season.year>=2025&&track.id==='monaco'?'摩纳哥要求至少两次停站。':'干燥正赛必须使用至少两种干胎；雨战豁免。'}</p><div class="inventory-heading">${icon('tyre')}新胎库存</div>${tyreInventory(w.tyres[id])}<button type="submit" class="btn">保存策略</button></form>`;}).join('')}</div>`);
    }
  }
  return `${header('赛历与准备','比赛周末',s.season.year>2025?'架空生涯使用 2025 赛历，技术规则在 2026 进入游戏化新规模型。':'按历史实际举行的赛历：2022 / 2023 共 22 站，2024 / 2025 共 24 站。')}${body}${panel('完整赛历',table(['站次','大奖赛','城市','日期','赛制','状态 / 冠军'],s.calendar.events.map((e,i)=>{const tr=trackForYear(e.track,Math.min(s.season.year,2025));return [String(i+1).padStart(2,'0'),h(tr.name),h(tr.city),h(e.date),badge(e.sprint?'冲刺':'标准',e.sprint?'accent':''),e.completed?'✓ '+h(e.result?.rows[0]?.name||'完成'):badge(i===s.calendar.round?'下一站':'待举行',i===s.calendar.round?'accent':'')];}),'season-calendar'))}`;
}
```

## js/ui/carView.js

```js
// ===== 文件: js/ui/carView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  performance, replacementCost
}
from '../core/car.js';
import {
  DIMENSIONS, PARTS, partQuota
}
from '../data/parts.js';
import {
  h, header, panel, number, progress, badge, table, money, button, empty, tyreLegend, wearMeter, icon, metric, severity
}
from './uiKit.js';
export function carView(s) {
  const t=teamOf(s),p=s.parts[t.id],blocked=!!s.calendar.weekend;
  return `${header('赛车工程','车辆与部件','磨损不会随新规格重置；部件配额按赛季累计。')}
 <div class="grid-2">${[0,1].map(slot=>{const v=performance(s,t,slot);return panel((slot+1)+' 号车 · '+s.drivers.find(d=>d.id===t.drivers[slot]).name,Object.entries(DIMENSIONS).map(([key,label])=>`<div class="attribute-row"><span>${icon({downforce:'wind',aero:'wind',grip:'tyre',suspension:'wrench',brakes:'shield',power:'bolt',ers:'battery',reliability:'shield',tyres:'tyre',weight:'layers'}[key])}${h(label)}</span>${progress(v[key])}<strong class="tone-${severity(v[key],'rating')}">${number(v[key])}</strong></div>`).join(''));}).join('')}</div>
 ${panel('轮胎磨损预测 · S / M / H',`${tyreLegend(['S','M','H'])}<canvas data-chart="tyres" data-height="220" aria-label="三种干胎的磨损预测曲线"></canvas><p class="muted">横轴：圈数；纵轴：磨损百分比。红 S / 黄 M / 白 H；正常驾驶、干地、当前赛道预测，不影响真实轮胎库存。</p>`)}${[0,1].map(slot=>panel((slot+1)+' 号车部件',table(['部件','规格','磨损','使用 / 配额','更换成本','操作'],PARTS.map(part=>{const item=p.cars[slot][part.id],quota=partQuota(part,s.season.year);return [h(part.name)+(s.season.year>=2026&&part.id==='mguh'?badge('已停用'):''),badge('V'+item.level),wearMeter(item.wear),item.used>quota?badge(item.used+' / '+quota+' · 超额','danger'):item.used===quota?badge(item.used+' / '+quota+' · 已满','warning'):item.used+' / '+(quota===99?'不限':quota),money(replacementCost(part)),button('更换', 'replace',{slot,id:part.id},{disabled:blocked,reason:blocked?'比赛周末内不可更换':'',confirm:`支付更换费用并启用新部件；超配额将使下站罚退 10 位。确认？`})];}),'car-parts-'+slot))).join('')}
 ${panel('升级库存与分配',p.stock.length?table(['部件','规格','性能增益','分配'],p.stock.map(item=>[h(PARTS.find(x=>x.id===item.part).name),badge('V'+item.level),metric('+'+number(item.gain),'success','up'),[0,1].map(slot=>button('装到 '+(slot+1)+' 号车','fit',{id:item.id,slot},{disabled:blocked||p.cars[slot][item.part].level>=item.level,reason:blocked?'请在周末之外装车':p.cars[slot][item.part].level>=item.level?'已装同级或更高规格':''})).join(' ')])):empty('完成研发与制造后，新规格将在这里出现。'))}
 ${panel('制造队列',p.production.length?table(['部件','规格','剩余产能日'],p.production.map(x=>[h(PARTS.find(p=>p.id===x.part).name),'V'+x.level,x.remaining.toFixed(1)+' 天'])):empty('没有生产中的部件。'))}`;
}
```

## js/ui/dashboard.js

```js
// ===== 文件: js/ui/dashboard.js =====
import {
  teamOf, driverOf, teamStandings
}
from '../core/helpers.js';
import {
  currentEvent, currentTrack
}
from '../core/calendar.js';
import {
  SESSION_NAMES
}
from '../data/i18n.js';
import {
  h, header, panel, stat, money, badge, progress, link, button, carArt, number
}
from './uiKit.js';
export function dashboard(s) {
  const t=teamOf(s),f=s.finance[t.id],event=currentEvent(s),track=currentTrack(s),rank=teamStandings(s).findIndex(x=>x.id===t.id)+1,w=s.calendar.weekend;
  const active=t.projects.filter(p=>p.status==='researching');
  const objectives=t.objectives;
  return `${header('指挥中心 / '+s.season.year,'车队控制中心','从工厂到终点线，每一次决策都算数。',link(w?'进入比赛周末':'准备下一站','calendar','primary'))}
 <section class="hero"><div class="hero-copy"><p class="eyebrow">${h(t.abbr)} / ${h(t.type==='factory'?'厂商车队':'客户车队')}</p><h2>${h(t.name)}</h2><p>${h(t.hq)}</p><div class="hero-badges">${badge('制造商第 '+rank+' 名','accent')}${badge(t.points+' 积分')}${badge('声望 '+number(t.reputation))}</div></div><div class="hero-visual"><div class="telemetry-grid"></div>${carArt(t.color)}<span class="visual-label">本季赛车 · 规格 ${Math.max(...Object.values(s.parts[t.id].cars[0]).map(x=>x.level))}</span></div></section>
 <div class="stats-grid">${stat('可用现金',money(f.cash),'现金流决定车队生存')}${stat('预算帽余额',money(f.capLimit-f.capUsed),'支出与现金独立核算',f.capUsed>f.capLimit?'danger':'')}${stat('董事会信心',number(t.confidence)+' / 100',t.confidence<30?'董事会要求立即改善':'管理层持续评估赛季表现')}${stat('研发运行中',active.length+' 项',s.parts[t.id].stock.length+' 件新规格待装车')}</div>
 <div class="grid-2"><div>${panel('下一站',event?`<div class="next-race"><span class="round-mark">${String(event.round).padStart(2,'0')}</span><div><p class="eyebrow">${h(event.date)} ${event.sprint?' · 冲刺周末':''}</p><h3>${h(track.name)}大奖赛</h3><p class="muted">${h(track.city)} · ${track.length} km · ${track.laps} 圈</p></div></div><p class="muted">${h(track.notes)}</p><div class="actions">${badge(w?SESSION_NAMES[w.sessions[w.index]]||'等待结算':'赛前工厂阶段','accent')}${link('赛历与策略','calendar')}</div>`:`<p>本赛季已经结束。${h(s.season.nextRules)}</p>${link('前往转会窗','drivers','primary')}`)}
 ${panel('赛季目标',`<div class="objective"><span>制造商前 ${objectives.target}</span>${badge('当前 P'+rank,rank<=objectives.target?'success':'')}</div>${progress(objectives.points, t.custom?1:Math.max(10,150-rank*10),'赛季积分 '+objectives.points)}${progress(objectives.finish,s.calendar.events.length*2,'双车完赛记录 '+objectives.finish)}<p class="muted">${t.custom?'首季优先完成全年运营，争取首个积分。':'持续获得积分、控制现金与预算帽，保持董事会信任。'}</p>`)}
 ${panel('待办提醒',`<ul class="todo"><li>${active.length<2?'研发有空槽，技术中心可以启动新项目。':'研发部门正在执行项目。'}</li><li>${s.parts[t.id].stock.length?'有新规格部件可装车。':'当前没有等待装车的新规格。'}</li><li>${t.drivers.some(id=>driverOf(s,id).contract.years<=1)?'主力车手合同将到期，请安排续约。':'主力车手合同稳定。'}</li><li>${f.cash<20?'现金低于 $20m，可向董事会申请一次紧急注资。':'现金流维持正常。'}</li></ul>`)}</div>
 <div>${panel('性能轮廓',`<canvas data-chart="performance" data-type="radar" data-height="245" aria-label="赛车性能雷达图"></canvas><p class="chart-note">0—100 · 当前一号车装车性能 · 非官方评分</p>`)}${panel('主力阵容',t.drivers.map((id,i)=>{const d=driverOf(s,id);return `<article class="driver-mini"><span class="driver-number">${h(d.number)}</span><div><h3>${h(d.name)}</h3><p class="muted">${h(d.nationality)} · ${d.age} 岁 · 合同 ${d.contract.years} 年</p></div><strong>${number(d.attributes.pace)}</strong><div class="full">${progress(d.morale,100,'士气')}</div></article>`;}).join(''))}${panel('预算帽使用',`<div class="split"><strong>${money(f.capUsed)}</strong><span class="muted">/ ${money(f.capLimit)}</span></div>${progress(f.capUsed,f.capLimit)}<p class="muted">研发、制造、薪资、运营计入；设施与担保金不计入。</p>`)}</div></div>
 ${panel('车队通讯',`<div class="news-list">${s.news.slice(0,8).map(n=>`<div class="news-item"><span class="news-dot ${h(n.type)}"></span><time>${h(n.date)}</time><p>${h(n.text)}</p></div>`).join('')}</div>`,badge('最近 '+Math.min(8,s.news.length)+' 条'))}`;
}
```

## js/ui/driversView.js

```js
// ===== 文件: js/ui/driversView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  ATTRS
}
from '../data/drivers-data.js';
import {
  h, header, panel, number, money, badge, progress, button, table, select, field, empty
}
from './uiKit.js';
function contract(d,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(d.id)}">${kind==='signDriver'?'接洽 / 签约':'续约谈判'}</button>`;
}
function card(s,d) {
  return `<article class="driver-card"><div class="driver-top"><span class="driver-number">${h(d.number)}</span><div><p class="eyebrow">${h(d.nationality)} · ${d.age} 岁 ${d.academy?'· 青训':''}</p><h2>${h(d.name)} <small class="tone-info">${h(d.code)}</small></h2></div><span class="rating">${number(d.attributes.pace)}</span></div><form data-form="driverCode" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('三字母缩写',`<input name="value" value="${h(d.code)}" pattern="[A-Za-z]{3}" minlength="3" maxlength="3" required aria-label="车手三字母缩写">`)}<button class="btn small" type="submit">保存缩写</button></form><div class="driver-attributes">${Object.entries(ATTRS).map(([key,label])=>`<div><span>${h(label)}</span><strong>${number(d.attributes[key])}</strong></div>`).join('')}</div><div class="stats-grid compact"><div><small>年薪</small><strong>${money(d.contract.salary)}</strong></div><div><small>剩余合同</small><strong>${d.contract.years} 年</strong></div><div><small>本季积分</small><strong>${d.points}</strong></div></div>${progress(d.morale,100,'士气')}${progress(d.fatigue,100,'疲劳')}<form data-form="train" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('发展计划',select('plan',[['balanced','均衡发展'],['pace','单圈专项'],['tyres','轮胎管理'],['wet','湿地训练'],['rest','恢复体能']],d.plan))}<button class="btn small" type="submit">应用计划</button></form><p class="muted">专项训练 $0.008m/天，计入预算帽。绩效奖金 ${money(d.contract.bonus)}，转会条款 ${(d.contract.buyout*100).toFixed(0)}%。</p><div class="actions">${d.academy?contract(d,'signDriver')+button('出售青训','sellYouth',{id:d.id},{confirm:'出售培养权并让车手进入自由市场，确认？'}):contract(d,'renewDriver')+button('解约','releaseDriver',{id:d.id},{class:'small danger',confirm:'支付剩余合同薪资 50% 解约，由最佳自由替补接替席位。确认？'})}${d.retired?badge('已宣布退役','danger'):''}</div></article>`;
}
export function driversView(s) {
  const t=teamOf(s),own=t.drivers.map(id=>s.drivers.find(d=>d.id===id)),youth=s.drivers.filter(d=>d.academy===t.id),market=s.drivers.filter(d=>d.teamId!==t.id&&!d.academy&&!d.retired);
  return `${header('阵容与转会','车手阵容',s.season.offseason?'转会窗已开启：进入下一赛季之前，请确保两位主力拥有有效合同。':'年轻车手通过比赛与训练成长，30 岁后逐步老化。')}
 <div class="grid-2">${own.map(d=>card(s,d)).join('')}</div>
 ${panel('青训学院',youth.length?`<div class="grid-2">${youth.map(d=>card(s,d)).join('')}</div>`:empty('从 F2 / F3 招募年轻车手，发展后提拔或出售。'),button('招募青训 · $1.00m','youth',{}, {disabled:youth.length>=4,reason:youth.length>=4?'青训名额已满':'',confirm:'花费 $1m 招募年轻车手，计入预算帽。确认？'}))}
 ${panel('车手市场',`<div class="filter-row"><input type="search" data-filter="driver-market" placeholder="搜索姓名、国籍或现任车队" aria-label="搜索车手"><span class="muted">有合同车手可挖角；薪资、声望与赛车竞争力影响意愿。</span></div>${table(['车手','国籍 / 年龄','速度','潜力','现任车队','年薪 / 合同','操作'],market.map(d=>[h(d.name),h(d.nationality)+' · '+d.age,number(d.attributes.pace),number(d.attributes.potential),h(s.teams.find(t=>t.id===d.teamId)?.name||'自由车手'),money(d.contract.salary)+' / '+d.contract.years+' 年',contract(d,'signDriver')]),'driver-market')}`)}`;
}
```

## js/ui/financeView.js

```js
// ===== 文件: js/ui/financeView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  SPONSORS, SPONSOR_GOALS
}
from '../data/sponsors.js';
import {
  h, header, panel, money, stat, progress, badge, button, table, empty, icon, metric
}
from './uiKit.js';
export function financeView(s) {
  const t=teamOf(s),f=s.finance[t.id];
  return `${header('财务办公室','现金流与预算帽','现金是银行账户；预算帽是合规累计支出。设施建设、罚款和担保金不计入预算帽。')}
 <div class="stats-grid">${stat('银行现金',money(f.cash),'现金小于零会终止本次生涯',f.cash<15?'danger':'')}${stat('计入预算帽',money(f.capUsed),'年度累计支出')}${stat('预算帽上限',money(f.capLimit),'含难度调整 · 非官方平衡值')}${stat('合规状态',f.disqualified?'取消积分资格':f.audited?'已受调查':'正常',f.audited?'风洞 / CFD 额度已削减':'超支将在正赛后接受调查')}</div>
 <div class="grid-2">${panel('预算帽监测',`${progress(f.capUsed,f.capLimit,'已使用')}<p>剩余额度 <strong>${money(f.capLimit-f.capUsed)}</strong></p><p class="muted">研发、生产、更换、人员与车手薪资、运营（含引擎供应 / 自研维护）、专项培养和违约金计入；资金收入不会恢复预算帽额度。</p>${button('申请 $15m 紧急注资','rescue',{}, {disabled:f.rescue||f.cash>=20,reason:f.rescue?'本季已使用援助':f.cash>=20?'现金低于 $20m 时可申请':'',confirm:'获得 $15m 紧急注资，董事会信心 -15，声望 -5。确认？'})}`)}${panel('最近现金收支',`<div class="finance-legend"><span class="tone-success">${icon('up')}收入</span><span class="tone-danger">${icon('down')}支出</span></div><canvas data-chart="finance" data-height="200" aria-label="现金收支图"></canvas>`)}</div>
 ${panel('已签赞助',f.sponsors.length?`<div class="facility-grid">${f.sponsors.map(sp=>`<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><strong class="large-number">${money(sp.annual)} / 年</strong><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}</p><p>本年已付 ${money(sp.paid)}</p></article>`).join('')}</div>`:empty('没有赞助合同。'))}
 ${panel('赞助洽谈',`<div class="facility-grid">${SPONSORS.filter(sp=>!f.sponsors.some(x=>x.id===sp.id)).map(sp=>{const full=f.sponsors.filter(x=>x.kind===sp.kind).length>=(sp.kind==='主赞助'?1:3);return `<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><p>基础年收入 ${money(sp.base)}</p><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}<br>声望要求 ${sp.min}，营销与员工特质提高实际报价。</p>${button('签署赞助','sponsor',{id:sp.id},{disabled:t.reputation<sp.min||full,reason:full?'该类赞助席位已满':t.reputation<sp.min?'声望不足':'',confirm:'签署本年度赞助合同，收入按日分期发放。确认？'})}</article>`;}).join('')}</div>`)}
 ${panel('财务流水',table(['模拟日','交易说明','金额','计入预算帽'],f.ledger.slice(0,100).map(item=>[item.day,h(item.label),`<strong class="metric ${item.amount>=0?'positive':'negative'}">${icon(item.amount>=0?'up':'down')}${item.amount>=0?'+':''}${money(item.amount)}</strong>`,badge(item.cap?'计入':'不计入',item.cap?'info':'subtle',item.cap?'shield':'')]),'finance-ledger'))}`;
}
```

## js/ui/liveData.js

```js
// ===== 文件: js/ui/liveData.js =====
// Pure display calculations. These never advance the simulation or consume RNG.
export function timingGap(s,c,baseTime){
  const r=s.race;
  if(c.retired)return 'OUT';
  if(r.qualifying)return c.stageBest>=9999?'NO TIME':r.fastest.time===c.stageBest?'LEADER':'+'+(c.stageBest-r.fastest.time).toFixed(3);
  const active=r.cars.filter(x=>!x.retired).slice().sort((a,b)=>a.position-b.position),index=active.findIndex(x=>x.driverId===c.driverId);
  if(index<=0)return s.settings.timingGap==='interval'?'INTERVAL':'LEADER';
  const reference=s.settings.timingGap==='interval'?active[index-1]:active[0];
  const distance=Math.max(0,reference.totalDistance-c.totalDistance),laps=Math.floor(distance+1e-8);
  return laps>0?'+'+laps+' LAP':'+'+(distance*baseTime).toFixed(3);
}
const intersects=(a,b,gap=5)=>a.x<b.x+b.width+gap&&a.x+a.width+gap>b.x&&a.y<b.y+b.height+gap&&a.y+a.height+gap>b.y;
export function layoutMapLabels(markers,previous={},reserved=[]){
  const width=76,height=36,placed=reserved.slice(),result=[];
  for(const marker of markers){
    const {id,x,y}=marker,candidates=[];
    if(previous[id])candidates.push(previous[id]);
    for(let ring=0;ring<8;ring++){
      const dx=14+ring*42,dy=12+ring*40;
      candidates.push([dx,-height/2],[-width-dx,-height/2],[-width/2,-height-dy],[-width/2,dy],
        [dx,-height-dy],[-width-dx,-height-dy],[dx,dy],[-width-dx,dy]);
    }
    // A bounded grid guarantees a place even when the whole field shares one point.
    for(let yy=10;yy<=740-height-10;yy+=height+8)for(let xx=10;xx<=800-width-10;xx+=width+8)candidates.push([xx-x,yy-y]);
    let best=null;
    for(const [dx,dy]of candidates){
      const box={x:Math.max(8,Math.min(800-width-8,x+dx)),y:Math.max(8,Math.min(740-height-8,y+dy)),width,height};
      if(placed.some(p=>intersects(box,p)))continue;
      if(markers.some(p=>p.x>=box.x-9&&p.x<=box.x+width+9&&p.y>=box.y-9&&p.y<=box.y+height+9))continue;
      best=box;break;
    }
    if(!best)best={x:8,y:8,width,height};
    placed.push(best);result.push({id,...best,dx:best.x-x,dy:best.y-y});
  }
  return result;
}
```

## js/ui/liveView.js

```js
// ===== 文件: js/ui/liveView.js =====
import { timingGap, layoutMapLabels } from './liveData.js';
import { teamOf, driverOf } from '../core/helpers.js';
import { currentTrack } from '../core/calendar.js';
import { PHASE_NAMES, allowedQualTyres } from '../core/realtime.js';
import { geometry, trackPoint, SECTOR_ENDS } from '../core/trackGeometry.js';
import { MODES, ENGINES } from '../data/parts.js';
import { SESSION_NAMES } from '../data/i18n.js';
import { h, header, panel, badge, button, icon, time, number, tyre, tyreInventory, tyreField, select, lapDisplay, flagState, fastestSummary, eventItem, wearMeter, table } from './uiKit.js';
export function clock(seconds,countdown=true){const n=Math.max(0,countdown?Math.ceil(seconds):Math.floor(seconds));return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
function phase(c){return c.retired?'退赛':PHASE_NAMES[c.phase]||c.phase;}
function phaseTone(c){return c.retired?'danger':c.phase==='FLY'?'success':c.phase==='OUT'?'info':['PIT','IN','ABORT'].includes(c.phase)?'warning':'neutral';}
function focused(s){return s.race.cars.find(c=>c.driverId===(s.settings.focusDriver||teamOf(s).drivers[0]))||s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0])||s.race.cars[0];}
function sectorTone(c,i){return c.phase==='ABORT'?'neutral':c.sectorTones[i]||c.lastSectorTones?.[i]||'neutral';}
function sectorValue(c,i){return c.sectors[i]||c.lastSectors[i]||0;}
function sectorSpeed(c,i){return c.sectorSpeeds[i]||c.lastSectorSpeeds[i]||0;}
function timingCells(s,c){
  const r=s.race,d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  const code=`<div class="tower-driver"><span class="tower-position" aria-label="第 ${c.position} 名">${c.position}</span><button class="driver-code" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}" title="${h(d.name)}" aria-label="聚焦 ${h(d.code+' '+d.name)}">${h(d.code)}</button></div>`;
  if(!r.qualifying)return {driver:code,gap:`<span class="tower-gap ${c.retired?'tone-danger':''}">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
  return {driver:code+`<small class="phase-label tone-${phaseTone(c)}">${h(phase(c))}</small>`,best:lapDisplay(c.stageBest,{fastest:r.fastest.driverId===c.driverId}),gap:`<span class="tower-gap">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
}
function timingRow(s,c){return `<tr data-car="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(timingCells(s,c)).map(([k,v])=>`<td data-cell="${k}">${v}</td>`).join('')}</tr>`;}
function gapControls(s){return `<div class="gap-controls" role="group" aria-label="时间差显示模式">${['leader','interval'].map(value=>`<button class="btn small ${((s.settings.timingGap||'leader')===value)?'selected':''}" data-action="timingGap" data-payload="${h(JSON.stringify({value}))}" aria-pressed="${(s.settings.timingGap||'leader')===value}" title="${value==='leader'?'相对第一名的差距':'相对前一名的差距'}">${value.toUpperCase()}</button>`).join('')}</div>`;}
function weatherSummary(s){
  const r=s.race,track=currentTrack(s),rain=r.rain||0;
  const name=rain>.65?'大雨':rain>.2?'降雨':rain>.05?'小雨':r.wetness>.15?'雨停 · 路面湿滑':'晴朗 / 干燥';
  return `<div class="live-weather" aria-label="实时天气"><div class="weather-current">${icon(rain>.05?'rain':'thermometer')}<strong>${name}</strong></div><div class="weather-facts"><span>路面积水 <b>${number(r.wetness*100)}%</b></span><span>路温 <b>${track.temp}°C</b></span></div></div>`;
}
function controlBanner(s){
  const r=s.race,code=r.red?'RED':r.chequered?'CHEQUERED':r.control==='YELLOW'||r.yellow?'YELLOW':r.control;
  const labels={GREEN:['TRACK CLEAR','赛道开放'],YELLOW:['YELLOW FLAG','黄旗 · 注意减速，禁止超车'],SC:['SAFETY CAR','安全车出动 · 禁止超车'],VSC:['VIRTUAL SAFETY CAR','虚拟安全车 · 减速行驶'],RED:['RED FLAG','红旗暂停 · 等待恢复'],CHEQUERED:['CHEQUERED FLAG','方格旗 · 等待其余车手冲线']};
  const [title,description]=labels[code]||labels.GREEN;
  return `<div class="tower-control control-${h(code)}" role="status" aria-live="polite"><span class="control-symbol">${icon('flag')}</span><div><strong>${title}</strong><span>${description}</span></div></div>`;
}
function trackSvg(s){
  const track=currentTrack(s),g=geometry(track.id),start=trackPoint(track.id,0),end=trackPoint(track.id,.98),out=trackPoint(track.id,.02);
  return `<svg id="track-map" viewBox="0 0 800 740" aria-label="${h(track.name)}赛道实时位置，点击三字母缩写查看车手" role="group"><defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#91a7bb" stroke-opacity=".035"/></pattern></defs><rect width="800" height="740" fill="url(#map-grid)"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-shadow"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-line"/>
    <path class="pit-lane" d="M${end.join(',')} Q${start[0]+40},${start[1]+40} ${out.join(',')}"/><text x="${start[0]+27}" y="${start[1]+48}" class="map-small">PIT</text><g transform="translate(${start.join(',')})"><rect x="-7" y="-9" width="14" height="18" fill="#e8eef6"/><path d="M-7-9H0V0H7V9H0V0H-7Z" fill="#121a25"/><text x="12" y="-13" class="map-small">START / FINISH</text></g>
    ${[.32,.68].map((f,i)=>{const p=trackPoint(track.id,f);return `<g transform="translate(${p.join(',')})"><circle r="7" fill="${i?'#67b9ff':'#d1a0ff'}"/><text x="12" y="-12" class="sector-label">S${i+1} / S${i+2}</text></g>`;}).join('')}
    ${s.race.cars.map(c=>{const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);return `<a data-dot="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" tabindex="0" role="button" aria-label="${h(d.code+' '+d.name)}"><title>${h(d.name+' · '+t.name)}</title><circle class="dot-hit" r="18" fill="transparent"/><circle class="dot-halo" r="16"/><circle class="driver-dot" r="8" fill="${c.slot?'#101925':t.color}" stroke="${t.color}" stroke-width="${c.slot?4:2}"/><line class="dot-connector" stroke="${t.color}"/><g class="dot-label-wrap"><rect class="dot-label-bg" width="76" height="36" rx="5"/><text class="dot-label" x="38" y="18" text-anchor="middle" dominant-baseline="central" fill="${t.color}">${h(d.code)}</text></g></a>`;}).join('')}</svg>`;
}
function telemetry(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  return `<div class="map-telemetry" id="map-telemetry" data-focused-driver="${h(c.driverId)}" style="--team:${t.color}"><div class="telemetry-title"><strong data-focus="code">${h(d.code)}</strong><div><b data-focus="name">${h(d.name)}</b><small><span data-focus="team">${h(t.name)}</span> · <span data-focus="phase">${phase(c)}</span></small></div><span data-focus="tyre">${tyre(c.compound)}</span></div><div class="live-numbers"><div><small>当前圈计时</small><b data-focus="lap">${time(c.currentLap)}</b></div><div><small>模拟实时速度</small><b><span data-focus="speed">${number(c.speed)}</span><em> km/h</em></b></div></div><div class="sector-grid">${[0,1,2].map(i=>`<div data-sector="${i}" class="sector-box tone-${sectorTone(c,i)}"><small>S${i+1}<span data-sector-current="${i}"></span></small><b data-sector-time="${i}">${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</b><span><strong data-sector-speed="${i}">${number(sectorSpeed(c,i))}</strong> km/h 均速</span></div>`).join('')}</div><div class="telemetry-foot"><span>上圈 <b data-focus="last">${time(c.lastLap)}</b></span><span>最佳 <b data-focus="best">${time(c.best)}</b></span><span>已完成 <b data-focus="completed">${c.lap}</b> 圈</span></div></div>`;
}
function command(s,c){
  const r=s.race,d=driverOf(s,c.driverId),q=r.qualifying,id=c.driverId;
  return `<article class="live-command" data-command-car="${h(id)}"><div class="split"><h3><span class="driver-chip">${h(d.code)}</span> ${h(d.name)}</h3><span data-live="phase">${badge(phase(c),phaseTone(c))}</span></div><div class="car-health"><span>${icon('fuel')}<b data-live="fuel">${number(c.fuel)}</b> kg</span><span>${icon('thermometer')}<b data-live="temp">${number(c.tyreTemperature)}</b>°C</span></div><div data-live="wear">${wearMeter(c.tyreWear)}</div>
    ${q?`<form data-form="qualSend"><input name="id" value="${h(id)}" type="hidden">${tyreField('出场配方','compound',allowedQualTyres(s,c)[0],{compact:true})}<div class="inline-form">${select('fresh',[['new','使用新胎'],['reuse','复用本段轮胎']],'new','aria-label="选择新胎或复用轮胎"')}<button class="btn primary" type="submit" data-q-send>驶出车库</button></div></form><div class="qual-commands">${button('出场圈后 → 飞行圈','qualCommand',{id,command:'fly'},{class:'small'})}${button('出场圈后 → 回 Pit','qualCommand',{id,command:'return'},{class:'small'})}${button('放弃飞行圈 → 回 Pit','qualCommand',{id,command:'abort'},{class:'small danger'})}${button('完成后 → 回场圈','qualCommand',{id,command:'return'},{class:'small'})}${button('完成后 → 再推一圈','qualCommand',{id,command:'repeat'},{class:'small'})}${button('自动出场：'+(c.autoQual?'开':'关'),'qualCommand',{id,command:'auto'},{class:'small'})}</div><p class="command-intent" data-live="intent"></p>`:
    `<label class="field"><span>驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(id)}"`)}</label><label class="field"><span>引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(id)}"`)}</label><form data-form="pit"><input name="id" value="${h(id)}" type="hidden">${tyreField('下一次过线进站','value','H',{compact:true})}<div class="actions"><button class="btn primary small" type="submit">${icon('pit')}确认进站</button>${button('取消','command',{id,command:'cancelPit'},{class:'small'})}</div></form><p class="command-intent" data-live="intent"></p>`}
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[id])}</div></article>`;
}
export function liveView(s){
  const r=s.race,track=currentTrack(s),q=r.qualifying,c=focused(s);
  return `${header('LIVE TIMING / 比赛指挥',track.name+' · '+SESSION_NAMES[r.kind],q?'出场圈 → 飞行圈 → 回场圈。倒计时结束后，只能完成已开始的飞行圈。':'连续比赛时钟 · 车手独立计时 · 默认 1× 为现实时间',`<span class="live-indicator">LIVE</span>`)}
    <div class="live-toolbar"><div class="session-clock"><small>${q?r.kind+r.q.stage+' · '+(r.q.status==='BREAK'?'节间休息':'剩余时间'):'已用时间'}</small><strong data-live-clock>${clock(q?r.q.remaining:r.time,q)}</strong></div><div class="live-lap"><strong data-live-lap>${q?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps)}</strong><small>${q?(r.kind==='SQ'?'12 / 10 / 8 MIN':'18 / 15 / 12 MIN'):' / '+r.totalLaps}</small></div>${flagState(r)}<div id="toolbar-weather">${weatherSummary(s)}</div><div class="speed-controls">${[1,2,4,8,16,32,64].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('快进一圈','tick',{}, {class:'small'})}${q?button('跳过节间休息','skipQualBreak',{}, {class:'small',disabled:r.q.status!=='BREAK'}):''}${button('自动完成','finishRace',{}, {class:'small',confirm:'按当前策略自动完成本场次；排位期间由 AI 安排本队出场。确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div class="broadcast-grid"><section class="panel live-tower"><div id="tower-race-control">${controlBanner(s)}</div><div class="panel-heading"><h2>${icon('stopwatch')}实时排名</h2>${q?'<span class="muted">排位成绩</span>':gapControls(s)}</div><div class="table-scroll"><table class="broadcast-timing ${q?'qualifying-timing':'race-timing'}"><colgroup>${q?'<col style="width:32%"><col style="width:30%"><col style="width:24%"><col style="width:14%">':'<col style="width:41%"><col style="width:43%"><col style="width:16%">'}</colgroup><thead><tr>${q?'<th>车手</th><th>最佳圈</th><th>差距</th><th>轮胎</th>':`<th>车手</th><th data-gap-heading>${s.settings.timingGap==='interval'?'INTERVAL':'LEADER'}</th><th>轮胎</th>`}</tr></thead><tbody id="timing-body">${r.cars.map(x=>timingRow(s,x)).join('')}</tbody></table></div><p class="tower-note">${q?'点击车手查看遥测':'时间差 / 秒 · 点击任意一行聚焦车手'}</p></section>
    <section class="panel track-panel"><div class="map-heading"><div><p class="eyebrow">CIRCUIT TRACKER</p><h2>${h(track.city)}</h2></div><span>${track.length.toFixed(3)} KM · ${track.corners} TURNS</span></div>${trackSvg(s)}<div class="map-caption"><span>● 实心 / 空心：同队两台赛车</span><span>计时线示意 ${button('标注：'+(s.settings.mapLabels==='team'?'本队':'全场'),'mapLabels',{}, {class:'small map-label-toggle'})}</span></div>${telemetry(s,c)}</section>
    <aside class="live-commands"><h2>${icon('radio')}车队无线电</h2>${r.cars.filter(x=>x.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(x=>command(s,x)).join('')}</aside></div>
    <div class="grid-2">${panel('赛事消息',`<div id="race-events" class="race-events">${r.events.slice(0,10).map(eventItem).join('')}</div>`)}${panel(q?'排位规则与状态':'比赛策略',q?`<p>${s.teams.length*2} 台赛车，前两段各淘汰 ${s.teams.length===11?6:5} 台，最后 10 台争夺杆位。无有效圈显示 NO TIME。</p><p>${r.kind==='SQ'?'干地 SQ1 / SQ2 每段只允许一套新中性胎，SQ3 一套软胎。':'成绩相同时，先做出该成绩者排名靠前。Q1 / Q2 之间休息 7 分钟，Q2 / Q3 之间休息 8 分钟。'}</p><p class="muted">${r.kind==='SQ'?'冲刺排位各段之间休息 7 分钟。':'107% 超时将标记为待裁判审查，游戏默认允许发车。'}飞行圈默认完成后回场；可提前选择连续推进。${r.q.status==='BREAK'?'本段已结束，可等待倒计时或跳过休息。':''}</p><details><summary>已完成各段成绩</summary>${r.q.stages.map((rows,i)=>`<h3>${r.kind}${i+1}</h3>${table(['名次','车手','时间'],rows.map((x,j)=>[j+1,h(driverOf(s,x.id).code),time(x.time)]))}`).join('')||'暂无'}</details>`:`<p>正赛干地须实际使用两种干胎；使用过雨胎可豁免。${track.id==='monaco'&&s.season.year>=2025?'摩纳哥至少两次停站。':''}</p><p class="muted">绿色旗帜下可使用 DRS；雨地、安全车与虚拟安全车期间禁用。出站损失计入连续比赛时间。离开此页面、切换到后台或打开对话框时暂停推进。</p>`)}</div>${raceDetails(s)}`;
}
const setText=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
const setHtml=(el,value)=>{if(el&&el._liveHTML!==value){el.innerHTML=value;el._liveHTML=value;}};
export function patchLive(s){
  const r=s.race,track=currentTrack(s),body=document.querySelector('#timing-body');if(!body)return;
  // Throttle only race/sprint gap text by real elapsed time, independent of simulation speed.
  // A new table or a LEADER / INTERVAL switch receives a fresh reading immediately.
  const now=globalThis.performance.now(),gapMode=s.settings.timingGap||'leader';
  const refreshGaps=r.qualifying||body._gapMode!==gapMode||now-(body._gapUpdatedAt??-Infinity)>=500;
  if(refreshGaps){body._gapUpdatedAt=now;body._gapMode=gapMode;}
  setHtml(document.querySelector('#toolbar-weather'),weatherSummary(s));setHtml(document.querySelector('#tower-race-control'),controlBanner(s));
  setText(document.querySelector('[data-live-clock]'),clock(r.qualifying?r.q.remaining:r.time,r.qualifying));
  setText(document.querySelector('[data-live-lap]'),r.qualifying?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps));
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag){flag.className='flag-state flag-'+code;setHtml(flag,`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);}
  const cells=new Map([...body.children].map(el=>[el.dataset.car,el])),markers=[];
  setText(document.querySelector('[data-gap-heading]'),s.settings.timingGap==='interval'?'INTERVAL':'LEADER');
  for(const btn of document.querySelectorAll('.gap-controls button')){const selected=JSON.parse(btn.dataset.payload).value===(s.settings.timingGap||'leader');btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected));}
  for(const c of r.cars){
    const row=cells.get(c.driverId);for(const [k,v]of Object.entries(timingCells(s,c))){
      if(k==='gap'&&!refreshGaps)continue;
      setHtml(row?.querySelector(`[data-cell="${k}"]`),v);
    }
    if(row){row.classList.toggle('retired-row',c.retired);row.classList.toggle('focused-row',c.driverId===focused(s).driverId);const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);}
    const dot=document.querySelector(`[data-dot="${c.driverId}"]`);if(dot){
      const hidden=['GARAGE','ELIMINATED','GRID'].includes(c.phase)||c.retired;
      dot.style.display=hidden?'none':'';
      const p=trackPoint(track.id,c.progress);if(c.phase==='PIT'){p[0]+=25;p[1]+=25;}
      dot.setAttribute('transform',`translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`);
      const showLabel=!hidden&&(s.settings.mapLabels!=='team'||c.teamId===s.player.teamId||c.driverId===focused(s).driverId);
      dot.classList.toggle('hide-label',!showLabel);if(showLabel)markers.push({id:c.driverId,x:p[0],y:p[1]});
      dot.setAttribute('aria-pressed',String(c.driverId===focused(s).driverId));
      dot.classList.toggle('selected-dot',c.driverId===focused(s).driverId);dot.classList.toggle('slow-dot',['OUT','IN','ABORT','PIT'].includes(c.phase));
      setText(dot.querySelector('.dot-label'),driverOf(s,c.driverId).code);
    }
    const ctrl=document.querySelector(`[data-command-car="${c.driverId}"]`);if(ctrl){
      setText(ctrl.querySelector('[data-live="fuel"]'),number(c.fuel));setText(ctrl.querySelector('[data-live="temp"]'),number(c.tyreTemperature));setHtml(ctrl.querySelector('[data-live="phase"]'),badge(phase(c),phaseTone(c)));setHtml(ctrl.querySelector('[data-live="wear"]'),wearMeter(c.tyreWear));setHtml(ctrl.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      const inactive=c.retired||c.finished||c.phase==='ELIMINATED';
      for(const el of ctrl.querySelectorAll('select,input,button'))el.disabled=inactive;
      if(r.qualifying){
        const garage=c.phase==='GARAGE'&&r.q.status==='RUNNING'&&r.q.remaining>0;
        for(const el of ctrl.querySelectorAll('form input,form select,form button'))el.disabled=!garage;
        for(const input of ctrl.querySelectorAll('input[name="compound"]'))input.disabled=!garage||!allowedQualTyres(s,c).includes(input.value);
        for(const btn of ctrl.querySelectorAll('[data-action="qualCommand"]')){
          const p=JSON.parse(btn.dataset.payload);btn.disabled=inactive||(p.command==='fly'?c.phase!=='OUT':p.command==='abort'||p.command==='repeat'?c.phase!=='FLY':p.command==='return'?!['FLY','OUT'].includes(c.phase):false);
          if(p.command==='auto')setText(btn,'自动出场：'+(c.autoQual?'开':'关'));
        }
        setText(ctrl.querySelector('[data-live="intent"]'),c.phase==='OUT'?'圈末计划：'+(c.outChoice==='PIT'?'返回 Pit':'开始飞行圈'):c.phase==='FLY'?'完成后：'+(c.afterLap==='FLY'?'再推一个飞行圈':'进入回场圈'):c.phase==='ABORT'?'本圈无效，圈末返回 Pit':c.phase==='IN'?'完成回场圈后返回车库':c.phase==='GARAGE'?'等待出场指令':'本段已淘汰');
      }else setText(ctrl.querySelector('[data-live="intent"]'),c.pitRequest?'已预约：本圈末进站换 '+c.pitRequest+' 胎':c.phase==='PIT'?'正在维修区，出站后恢复比赛':'按当前策略行驶 · 停站 '+c.stops+' 次');
    }
  }
  const svg=document.querySelector('#track-map');
  if(svg){const previous=svg._labelOffsets||{};const priority=markers.sort((a,b)=>Number(b.id===focused(s).driverId)-Number(a.id===focused(s).driverId)||a.id.localeCompare(b.id));
    const offsets={};for(const label of layoutMapLabels(priority,previous)){const dot=svg.querySelector(`[data-dot="${label.id}"]`);dot.querySelector('.dot-label-wrap').setAttribute('transform',`translate(${label.dx} ${label.dy})`);const line=dot.querySelector('.dot-connector');line.setAttribute('x2',label.dx+38);line.setAttribute('y2',label.dy+18);offsets[label.id]=[label.dx,label.dy];}svg._labelOffsets=offsets;
  }
  const c=focused(s),d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),focus=document.querySelector('#map-telemetry');if(focus){
    focus.dataset.focusedDriver=c.driverId;focus.style.setProperty('--team',t.color);
    for(const [key,value]of Object.entries({code:d.code,name:d.name,team:t.name}))setText(focus.querySelector(`[data-focus="${key}"]`),value);
    for(const [k,v]of Object.entries({phase:phase(c),lap:time(c.currentLap),speed:number(c.speed),last:time(c.lastLap),best:time(r.qualifying?c.stageBest:c.best),completed:c.lap}))setText(focus.querySelector(`[data-focus="${k}"]`),v);
    setHtml(focus.querySelector('[data-focus="tyre"]'),tyre(c.compound));
    for(let i=0;i<3;i++){
      const box=focus.querySelector(`[data-sector="${i}"]`);box.className='sector-box tone-'+(sectorTone(c,i));const active=c.sector===i&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase);
      setText(focus.querySelector(`[data-sector-current="${i}"]`),active?'进行中':'');setText(focus.querySelector(`[data-sector-time="${i}"]`),active?time(Math.max(0,r.time-c.sectorStart)):sectorValue(c,i)>0?time(sectorValue(c,i)):'—');setText(focus.querySelector(`[data-sector-speed="${i}"]`),number(sectorSpeed(c,i)));
    }
  }
  patchDetails(s);
  setHtml(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));setHtml(document.querySelector('#race-events'),r.events.slice(0,10).map(eventItem).join(''));setText(document.querySelector('[data-live-wet]'),number(r.wetness*100)+'%');
}

function detailCells(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),best=s.race.qualifying?c.stageBest:c.best;
  return {
    driver:`<button class="detail-driver" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}"><b>${h(d.code)}</b><span>${h(d.name)}</span></button>`,
    current:c.phase==='GARAGE'||c.phase==='ELIMINATED'?'—':time(c.currentLap),
    last:c.lastLap>0?lapDisplay(c.lastLap,{fastest:c.lastLap===s.race.fastest.time}):'—',
    best:lapDisplay(best,{fastest:s.race.fastest.driverId===c.driverId}),
    sectors:`<div class="detail-sectors">${[0,1,2].map(i=>`<span class="tone-${sectorTone(c,i)}"><small>S${i+1}</small>${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</span>`).join('')}</div>`,
    age:`${c.tyreAge} 圈`,wear:wearMeter(c.tyreWear),fuel:number(c.fuel)+' kg',stops:c.stops,status:badge(phase(c),phaseTone(c))
  };
}
function pitHistory(s){
  const records=s.race.cars.flatMap(c=>(c.pitLog||[]).map((entry,i)=>({...entry,id:c.driverId,sequence:i+1}))).sort((a,b)=>(b.at??b.lap)-(a.at??a.lap)||a.id.localeCompare(b.id));
  if(!records.length)return '<p class="empty-pit-log">尚无进站换胎记录。</p>';
  return `<div class="table-scroll"><table class="pit-history-table"><thead><tr><th>比赛时间</th><th>车手</th><th>圈数</th><th>换胎</th><th>停站用时</th><th>总损失</th></tr></thead><tbody>${records.map(entry=>`<tr class="${s.race.cars.find(c=>c.driverId===entry.id)?.teamId===s.player.teamId?'player-row':''}"><td>${entry.at===undefined?'—':clock(entry.at,false)}</td><td><b>${h(driverOf(s,entry.id).code)}</b><small>${h(driverOf(s,entry.id).name)} · 第 ${entry.sequence} 停</small></td><td>L${entry.lap}</td><td><span class="pit-tyre-change">${entry.from?tyre(entry.from)+'<span>→</span>':''}${tyre(entry.compound)}</span></td><td>${Number(entry.stop).toFixed(2)} s</td><td>+${Number(entry.loss).toFixed(2)} s</td></tr>`).join('')}</tbody></table></div>`;
}
export function raceDetails(s){
  return `<section class="panel live-race-details" id="race-details"><div class="panel-heading"><h2>${icon('chart')}圈速与进站数据</h2><span class="muted">全部车手 · 实时更新</span></div><div id="live-fastest">${fastestSummary(s,s.race.fastest)}</div><div class="table-scroll"><table class="race-detail-table"><thead><tr>${['车手','当前圈计时','上一圈','最佳圈','Sector 计时','胎龄','磨损','燃油','停站','状态'].map(label=>`<th>${label}</th>`).join('')}</tr></thead><tbody id="detail-timing-body">${s.race.cars.map(c=>`<tr data-detail-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(detailCells(s,c)).map(([key,value])=>`<td data-detail-cell="${key}">${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div><h3 class="pit-history-heading">${icon('pit')}进站换胎记录</h3><div id="pit-history">${pitHistory(s)}</div></section>`;
}
function patchDetails(s){
  const body=document.querySelector('#detail-timing-body');if(!body)return;
  const rows=new Map([...body.children].map(row=>[row.dataset.detailCar,row]));
  for(const c of s.race.cars){const row=rows.get(c.driverId);if(!row)continue;
    for(const [key,value]of Object.entries(detailCells(s,c)))setHtml(row.querySelector(`[data-detail-cell="${key}"]`),value);
    row.classList.toggle('focused-row',c.driverId===focused(s).driverId);
    const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);
  }
  setHtml(document.querySelector('#pit-history'),pitHistory(s));
}
```

## js/ui/raceView.js

```js
// ===== 文件: js/ui/raceView.js =====
import { liveView, patchLive, raceDetails } from './liveView.js';
// ===== 文件: js/ui/raceView.js =====
import { teamOf } from '../core/helpers.js';
import { currentTrack } from '../core/calendar.js';
import { SESSION_NAMES } from '../data/i18n.js';
import { MODES, ENGINES, COMPOUNDS } from '../data/parts.js';
import {
  h, header, panel, badge, button, link, table, time, number, icon, select, empty,
  tyre, tyreField, tyreInventory, tyreLegend, lapDisplay, wearMeter, severity,
  rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary
} from './uiKit.js';

function timingLegend() {
  return `<div class="timing-legend"><span class="tone-fastest">${icon('stopwatch')}全场最快</span><span class="tone-success">${icon('check')}个人最快</span><span class="tone-warning">${icon('warning')}需要关注</span><span class="tone-danger">${icon('cross')}故障 / 处罚</span></div>`;
}
function resultTable(s,result) {
  const leader=result.rows.find(r=>r.classified);
  return table(['名次','车手','车队','位次变化','差距 / 状态','最快圈','进站','罚时','积分'],result.rows.map(r=>[
    rankBadge(r.position),h(s.drivers.find(d=>d.id===r.driverId)?.code||'')+' · '+h(r.name),h(s.teams.find(t=>t.id===r.teamId)?.name||r.teamId),
    positionChange(r.grid,r.position),
    r.disqualified?badge('DSQ · 取消资格','danger'):r.retired?badge('退赛 · '+r.reason,'danger'):r.position===1?time(r.time):r.lap<(leader?.lap||0)?'+'+((leader?.lap||0)-r.lap)+' LAP':'+'+number(r.time-(leader?.time||0))+'s',
    lapDisplay(r.best,{fastest:result.fastest?.driverId===r.driverId}),
    `<span class="pit-count">${icon('pit')}${r.stops}</span>`,
    r.penalty?badge('+'+r.penalty+'s','danger','warning'):'—',
    `<strong class="points-value ${r.points>0?'tone-success':''}">${r.points}</strong>`
  ]),'race-result','',result.rows.map(row=>row.teamId===s.player.teamId?'player-row':''));
}
function sessionControls(s) {
  const w=s.calendar.weekend,current=w.sessions[w.index];
  if(!current)return `<div class="notice">${icon('check')}周末全部场次已完成。${button('完成本站结算','closeWeekend',{}, {class:'primary'})}</div>`;
  if(current.startsWith('FP'))return panel(SESSION_NAMES[current],`<p>练习将采集设定置信区间、轮胎寿命和燃油数据。可先在赛历页面调整两台赛车的设定。</p><div class="actions">${link('调校赛车','calendar')}${button('模拟本节练习','practice',{}, {class:'primary'})}</div>`);
  if(current==='Q'||current==='SQ') {
    const q=w.qualifying;
    return panel(SESSION_NAMES[current],`<p>${s.teams.length*2} 台赛车参加。排位赛使用实时倒计时与赛道地图，请分别安排两台赛车出场。</p><p>${current==='SQ'?'SQ1 / SQ2 / SQ3 为 12 / 10 / 8 分钟。':'Q1 / Q2 / Q3 为 18 / 15 / 12 分钟。'}前两段各淘汰 ${s.teams.length===11?6:5} 台赛车。</p><div class="actions">${button('进入实时'+SESSION_NAMES[current],'startQualifying',{}, {class:'primary'})}</div>`);

  }
  return panel(SESSION_NAMES[current]+' · 发车准备',`<p>发车路面积水预估 ${number((w.weatherStart||0)*100)}%。策略工作台可配置两台赛车的起步轮胎、进站窗口和安全车预案。默认由你指挥。</p>${tyreLegend()}<div class="actions">${link('检查策略','calendar')}${button('开始'+SESSION_NAMES[current],'startRace',{}, {class:'primary'})}</div>`);
}
function temperatureTone(car) {
  const compound=COMPOUNDS[car.compound];
  if(!compound)return 'neutral';
  return car.tyreTemperature<compound.min?'info':car.tyreTemperature>compound.max?'warning':'success';
}
function liveRow(s,c) {
  const leader=s.race.cars.find(x=>!x.retired)||s.race.cars[0],fastest=s.race.fastest?.driverId===c.driverId;
  return `<tr data-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''} ${c.retired?'retired-row':''}">
    <td data-cell="position">${rankBadge(c.position)}</td>
    <td><span class="team-line" style="--row-color:${h(s.teams.find(t=>t.id===c.teamId).color)}"></span><strong>${h(c.name)}</strong><small>${h(s.teams.find(t=>t.id===c.teamId).abbr)}</small></td>
    <td data-cell="gap">${c.retired?badge('退赛','danger'):c.position===1?'领先':'+'+number(c.time-leader.time)}</td>
    <td data-cell="last">${lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===s.race.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best})}</td>
    <td data-cell="best">${lapDisplay(c.best,{fastest})}</td>
    <td data-cell="tyre"><span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span></td>
    <td data-cell="wear">${wearMeter(c.tyreWear)}</td>
    <td data-cell="stops"><span class="pit-count">${icon('pit')}${c.stops}</span></td>
    <td data-cell="status">${raceStatus(c)}</td>
  </tr>`;
}
function carControl(s,c) {
  return `<article class="command-card ${c.retired?'retired-car':''}" data-command-car="${h(c.driverId)}">
    <div class="split"><div><p class="eyebrow">${c.slot+1} 号车 · P<span data-live="position">${c.position}</span></p><h3>${h(c.name)}</h3></div><span class="tyre tyre-${h(c.compound)}" data-live="compound" title="${h(COMPOUNDS[c.compound].name)}">${c.compound}</span></div>
    <div class="telemetry-cells">
      <div><small>${icon('tyre')}轮胎磨损</small><strong data-live="wear" class="tone-${severity(c.tyreWear)}">${number(c.tyreWear)}%</strong></div>
      <div><small>${icon('thermometer')}轮胎温度</small><strong data-live="temp" class="tone-${temperatureTone(c)}">${number(c.tyreTemperature)}°C</strong></div>
      <div><small>${icon('fuel')}燃油</small><strong data-live="fuel">${number(c.fuel)} kg</strong></div>
      <div><small>${icon('stopwatch')}最佳单圈</small><strong data-live="best">${lapDisplay(c.best,{fastest:s.race.fastest?.driverId===c.driverId})}</strong></div>
    </div>
    <label class="field"><span>${icon('car')}驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(c.driverId)}"`)}</label>
    <label class="field"><span>${icon('bolt')}引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(c.driverId)}"`)}</label>
    <form data-form="pit" class="pit-form"><input type="hidden" name="id" value="${h(c.driverId)}">${tyreField('进站轮胎','value','H',{compact:true})}<button type="submit" class="btn primary">${icon('pit')}进站换胎</button></form>
    <div class="actions">${button('取消进站','command',{id:c.driverId,command:'cancelPit'},{class:'small'})}</div>
    <p class="radio-advice" data-live="advice">${c.retired?'已退赛':c.tyreWear>65?'轮胎退化明显，建议准备进站':'轮胎状态正常，注意天气与窗口。'}</p>
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[c.driverId])}</div>
  </article>`;
}
function renderRaceView(s) {
  const w=s.calendar.weekend,track=currentTrack(s),r=s.race;
  if(r?.realtime&&!r.finished)return liveView(s);
  if(!w)return `${header('比赛指挥','维修墙待命','先进入比赛周末，再执行练习、排位与比赛。')}${panel('下一站准备',`${empty(s.season.offseason?'当前处于转会窗。':'本站赛车尚未登记。')}${link('前往赛历','calendar','primary')}`)}`;
  if(!r||r.finished)return `${header('比赛指挥',track.name+' · '+(SESSION_NAMES[w.sessions[w.index]]||'周末结束'),'按对应年份的周末流程推进。')}${sessionControls(s)}${r?.qualifying&&r.finished?panel('排位赛各段成绩',r.q.stages.map((rows,i)=>`<details ${i===2?'open':''}><summary>${r.kind}${i+1}</summary>${table(['名次','车手','配方','成绩'],rows.map((x,j)=>[rankBadge(j+1),h(s.drivers.find(d=>d.id===x.id)?.code)+' · '+h(x.name),tyre(x.compound),lapDisplay(x.time,{fastest:j===0})]),'','',rows.map(x=>s.drivers.find(d=>d.id===x.id)?.teamId===s.player.teamId?'player-row':''))}</details>`).join('')):''}${r?.result?panel((r.sprint?'冲刺赛':'正赛')+'赛后报告',`${fastestSummary(s,r.fastest)}${timingLegend()}${resultTable(s,r.result)}<p class="muted">${s.season.rules.fastestLap?'正赛前十中的全场最快圈可获 1 分。':'本赛季最快圈不加分。'}</p><details><summary>罚则与事件记录</summary>${r.events.map(eventItem).join('')}</details><details><summary>分段成绩与位置轨迹</summary>${table(['圈数','领跑车手','累计时间'],r.segments.map(x=>[x.lap,h(s.drivers.find(d=>d.id===x.leader)?.name),time(x.time)]))}<canvas data-chart="positions" aria-label="本队位置变化图"></canvas></details>`):''}`;
  return `${header('比赛指挥 / 实时计时',track.name+' · '+SESSION_NAMES[r.kind],track.city+' · '+r.totalLaps+' 圈',`<span class="live-indicator">实时模拟</span>`)}
    <div class="race-toolbar"><div class="lap-count"><span data-race="lap">${r.lap}</span><small> / ${r.totalLaps} 圈</small></div>${flagState(r)}<div class="speed-controls">${[1,2,4,10].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('下一圈','tick',{count:1},{class:'small'})}${button('下一事件','tick',{count:1000,untilEvent:true},{class:'small'})}${button('模拟到底','finishRace',{}, {class:'small',confirm:'自动执行当前指令和策略直到终点，确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div id="live-fastest">${fastestSummary(s,r.fastest)}</div>${timingLegend()}
    <div class="race-layout"><section class="panel tower"><div class="panel-heading"><h2>${icon('stopwatch')}实时计时塔</h2><span class="muted">差距相对领先者 / 秒</span></div><div class="table-scroll"><table class="timing-table"><thead><tr><th>位置</th><th>车手 / 车队</th><th>领先差距</th><th>上一圈</th><th>最佳圈</th><th>配方 / 胎龄</th><th>磨损</th><th>停站</th><th>状态</th></tr></thead><tbody id="timing-body">${r.cars.map(c=>liveRow(s,c)).join('')}</tbody></table></div></section><aside class="command-column">${r.cars.filter(c=>c.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(c=>carControl(s,c)).join('')}</aside></div>
    <div class="grid-2">${panel('气象与雨带预报',`<div class="weather-overview"><strong data-race="weather">${icon('rain')}路面积水 ${number(r.wetness*100)}%</strong><span>${icon('thermometer')}${track.temp}°C 基准路温</span></div><div class="weather-radar">${r.forecast.map(cell=>`<div title="第 ${cell.lap} 圈，预报降雨强度 ${number(cell.rain*100)}%，可信度 ${number(cell.confidence)}%"><i style="height:${Math.max(6,cell.rain*75)}px"></i><small>L${cell.lap}</small></div>`).join('')}</div><p class="muted">阴影柱表示预报雨带强度；路面湿度滞后于降雨。DRS 在湿地与安全车期间禁用。</p>`)}${panel('车队无线电与事件',`<div class="race-events" id="race-events">${r.events.slice(0,12).map(eventItem).join('')}</div>`)}</div>`;
}
// 只替换改变的单元格内容与现有行顺序；不会重建行或驾驶 / 换胎控件。
export function patchRace(s) {
  if(s.race?.realtime){patchLive(s);return;}
  const r=s.race,body=document.querySelector('#timing-body');
  if(!r||r.finished||!body)return;
  const text=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
  const html=(el,value)=>{if(el&&el._visualHtml!==value){el.innerHTML=value;el._visualHtml=value;}};
  text(document.querySelector('[data-race="lap"]'),r.lap);
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag&&flag.dataset.control!==code)html(flag.parentElement.querySelector('[data-race="control"]'),`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);
  if(flag){flag.className='flag-state flag-'+code;flag.dataset.control=code;}
  html(document.querySelector('[data-race="weather"]'),`${icon('rain')}路面积水 ${number(r.wetness*100)}%`);
  html(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));
  const leader=r.cars.find(c=>!c.retired)||r.cars[0],rows=new Map(Array.from(body.children).map(el=>[el.dataset.car,el]));
  const controls=new Map(Array.from(document.querySelectorAll('[data-command-car]')).map(el=>[el.dataset.commandCar,el]));
  for(const c of r.cars) {
    const row=rows.get(c.driverId);if(!row)continue;
    const values={
      position:rankBadge(c.position),gap:c.retired?badge('退赛','danger'):h(c.position===1?'领先':'+'+number(c.time-leader.time)),
      last:lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===r.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best}),
      best:lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}),
      tyre:`<span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span>`,
      wear:wearMeter(c.tyreWear),stops:`<span class="pit-count">${icon('pit')}${c.stops}</span>`,status:raceStatus(c)
    };
    for(const [key,value]of Object.entries(values))html(row.querySelector(`[data-cell="${key}"]`),value);
    row.classList.toggle('retired-row',c.retired);body.appendChild(row);
    const command=controls.get(c.driverId);
    if(command) {
      const fields={position:c.position,compound:c.compound,wear:number(c.tyreWear)+'%',temp:number(c.tyreTemperature)+'°C',fuel:number(c.fuel)+' kg',advice:c.retired?'已退赛':c.tyreWear>65?'轮胎衰退明显，建议准备进站':r.wetness>.2?'雨带已经抵达，建议检查配方':'轮胎状态正常，注意窗口。'};
      for(const [key,value]of Object.entries(fields))text(command.querySelector(`[data-live="${key}"]`),value);
      const compound=command.querySelector('[data-live="compound"]');compound.className='tyre tyre-'+c.compound;compound.title=COMPOUNDS[c.compound].name;
      command.querySelector('[data-live="wear"]').className='tone-'+severity(c.tyreWear);
      command.querySelector('[data-live="temp"]').className='tone-'+temperatureTone(c);
      html(command.querySelector('[data-live="best"]'),lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}));
      html(command.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      command.classList.toggle('retired-car',c.retired);
      for(const input of command.querySelectorAll('select,button,input[type="radio"]'))input.disabled=c.retired;
    }
  }
  const events=document.querySelector('#race-events');if(events)html(events,r.events.slice(0,12).map(eventItem).join(''));
  const resume=document.querySelector('[data-action="resume"]');if(resume)resume.disabled=!r.red;
}
export function reportHtml(s,index) {
  const result=s.history.races[index];
  return result?`<p>${h(result.track)} · 第 ${result.round} 站 · ${result.kind==='SPRINT'?'冲刺':'正赛'}</p>${fastestSummary(s,result.fastest)}${resultTable(s,result)}<details><summary>罚则记录</summary>${result.penalties.map(p=>`<p>${badge('L'+p.lap,'warning','warning')} ${h(p.reason)} ${p.seconds?badge('+'+p.seconds+'s','danger'):''}</p>`).join('')||'<p>无罚则</p>'}</details>`:empty('该报告不存在。');
}

export function raceView(s){
  const content=renderRaceView(s);
  return s.calendar.weekend&&s.race?.realtime&&s.race.finished?content+raceDetails(s):content;
}
```

## js/ui/rndView.js

```js
// ===== 文件: js/ui/rndView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  projectQuote, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost
}
from '../core/rnd.js';
import {
  PARTS, FACILITIES, DEPARTMENTS
}
from '../data/parts.js';
import {
  h, header, panel, stat, money, number, badge, progress, button, field, select, empty
}
from './uiKit.js';
export function rndView(s) {
  const t=teamOf(s),researchOpen=researchUnlocked(s);
  return `${header('技术中心','把想法变成圈速','研发 → 验证 → 制造 → 单车装配。只生产一套时，升级只能先用于一台车。')}
 <div class="stats-grid">${stat('风洞额度',t.wind.used+' / '+t.wind.limit,'按上赛季排名分配')}${stat('CFD 额度',t.cfd.used+' / '+t.cfd.limit,'研发立项时扣除')}${stat('制造能力',factoryCapacity(t)+' 产能日 / 天','零件按队列依次生产')}${stat('下季研究',researchOpen?'已开放':'尚未开放','赛季进度达到 55% 后开放')}</div>
 <div class="actions test-overrun">${button('违规增加试验额度','overrun',{}, {disabled:!!t.wind.overrun,reason:t.wind.overrun?'本季已被处罚':'',confirm:'违规增加风洞 45 / CFD 60 额度，立即罚款 $5m（不计入预算帽），董事会信心 -10。确认承担处罚？'})}</div><div class="grid-2">${panel('研发项目库',`<form data-form="project" class="form-grid">${field('目标部件',select('part',PARTS.map(p=>[p.id,p.name+(t.type==='customer'&&p.department==='power'?' · 客户不可研制':''),t.type==='customer'&&p.department==='power'||s.season.year>=2026&&p.id==='mguh']),'floor'))}${field('项目方向',select('kind',[['development','本季升级'],['research','下赛季前期研究',!researchOpen]],'development'))}${field('生产套数',select('copies',[[2,'两套 · 双车装配'],[1,'一套 · 单车优先']],2))}<div class="field"><span>立项说明</span><p class="muted">同时运行 ${projectCapacity(t)} 项。费用包含制造预付，失败退还制造部分。</p></div><button class="btn primary" type="submit">核对报价并立项</button></form><div class="project-library">${PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')).map(p=>{const q=projectQuote(s,t,p.id);return `<div class="project-row"><div><strong>${h(p.name)}</strong><small>${h(DEPARTMENTS[p.department])} · V${q.level}</small></div><span>${money(q.cost+q.manufacturing)}</span><span>${q.days} 天</span><span>+${number(q.gain)}</span></div>`;}).join('')}</div>`)}
 ${panel('进行中的项目',t.projects.length?t.projects.slice().reverse().slice(0,16).map(p=>`<article class="project-card"><div class="split"><h3>${h(PARTS.find(x=>x.id===p.part).name)} · V${p.level}</h3>${badge({researching:'研发中',complete:'完成',failed:'失败',cancelled:'已叫停'}[p.status],p.status==='complete'?'success':'')}</div><p class="muted">${p.kind==='research'?'下季研究':'本季升级'} · ${p.copies} 套 · 失败风险 ${number(p.risk*100)}%</p>${progress(p.progress)}<p>剩余 ${Math.max(0,p.remaining).toFixed(1)} 天</p>${p.status==='researching'?`<div class="actions">${button('追加投入','projectChange',{id:p.id,operation:'boost'},{disabled:p.boosted,confirm:'花费原研发费用的 30%，缩短剩余工期 30%，增加失败风险。确认？'})}${button('风险审查','projectChange',{id:p.id,operation:'safe'},{disabled:p.safer,confirm:'花费原研发费用的 15%，降低风险并延长剩余工期。确认？'})}${button('叫停','projectChange',{id:p.id,operation:'cancel'},{class:'danger',confirm:'终止该项目，只退回制造预付，研发支出不退。确认？'})}</div>`:''}</article>`).join(''):empty('选择一个部件，启动第一项研发。'))}</div>
 ${panel('工厂设施',`<div class="facility-grid">${Object.entries(FACILITIES).map(([id,def])=>{const f=t.facilities[id];return `<article class="facility"><div class="split"><h3>${h(def.name)}</h3>${badge('Lv.'+f.level)}</div><p class="muted">${h(def.effect)}</p><p>${money(facilityCost(t,id))} · 不计入预算帽</p>${f.building?`${progress(f.building.total-f.building.remaining,f.building.total)}<p>建造剩余 ${f.building.remaining} 天</p>`:button(f.level>=6?'已满级':'升级设施','facility',{id},{disabled:f.level>=6,confirm:`升级 ${def.name}，支出 ${money(facilityCost(t,id))}，不计入预算帽。确认？`})}</article>`;}).join('')}</div>`)}
 ${panel('研发部门',`<div class="facility-grid">${Object.entries(DEPARTMENTS).map(([id,label])=>{const d=t.departments[id];return `<article class="facility"><h3>${h(id==='power'&&t.type==='customer'?'引擎供应商支持':label)}</h3><p>等级 ${d.level} · ${d.people} 人 · ${h(d.supervisor)}</p>${button('扩编 '+money(departmentCost(t,id)),'department',{id},{disabled:d.level>=6,confirm:'部门扩编计入预算帽。确认支出？'})}</article>`;}).join('')}</div>`)}`;
}
```

## js/ui/saveView.js

```js
// ===== 文件: js/ui/saveView.js =====
import {
  SLOT_NAMES, slotInfo
}
from '../core/save.js';
import {
  h, header, panel, badge, field
}
from './uiKit.js';
export function saveView(s) {
  return `${header('生涯档案','存档与备份','三个手动槽位与独立自动存档。JSON 备份可跨浏览器、跨设备导入。')}
 ${panel('本地存档槽',`<div class="facility-grid">${Object.entries(SLOT_NAMES).map(([slot,label])=>{const info=slotInfo(slot);return `<article class="facility"><div class="split"><h3>${h(label)}</h3>${badge(info?.broken?'损坏':info?'可读取':'空')}</div><p>${info&&!info.broken?h(info.team)+' · '+info.year+' 赛季':'尚无有效数据'}</p><p class="muted">${info?.savedAt?h(new Date(info.savedAt).toLocaleString('zh-CN')):'—'}</p><div class="actions">${slot==='auto'?'':`<button class="btn" data-save="${slot}">写入此槽</button>`}<button class="btn" data-load="${slot}" ${info?'':'disabled'}>读取</button><button class="btn danger small" data-delete-save="${slot}" ${info?'':'disabled'}>删除</button></div></article>`;}).join('')}</div><label class="check"><input type="checkbox" data-autosave ${s.settings.autosave?'checked':''}>关键操作后自动保存（比赛中每 5 秒保存一次）</label>`)}
 <div class="grid-2">${panel('导出 JSON',`<p class="muted">下载完整存档，或复制文本框内容。导出包括随机状态与比赛中的全部指令。</p><div class="actions"><button class="btn primary" data-export>下载 JSON 文件</button><button class="btn" data-export-text>显示 JSON 文本</button></div><label class="field"><span>导出文本</span><textarea id="export-text" rows="10" readonly aria-label="导出存档 JSON"></textarea></label><button class="btn small" data-copy>复制到剪贴板</button>`)}${panel('导入 JSON',`<form data-form="import"><label class="field"><span>选择备份文件</span><input id="import-file" type="file" accept=".json,application/json"></label><label class="field"><span>或粘贴完整 JSON</span><textarea name="json" id="import-text" rows="10" required aria-label="导入存档 JSON"></textarea></label><button class="btn primary" type="submit">验证并导入</button><p class="muted">损坏或版本不兼容的存档会被拒绝，当前生涯保持不变。</p></form>`)}</div>
 ${panel('新生涯',`<p class="muted">重新选择赛季或创建第 11 支车队。建议先保存到手动槽或导出 JSON。</p><button class="btn danger" data-new-game>新建游戏</button>`)}`;
}
```

## js/ui/setupWizard.js

```js
// ===== 文件: js/ui/setupWizard.js =====
import {
  seasonTeams, ALTERNATIVE_LINEUPS, SUPPLIERS
}
from '../data/teams.js';
import {
  DRIVER_DATA, RESERVES
}
from '../data/drivers-data.js';
import {
  LOGOS, logo
}
from '../data/logos.js';
import {
  h, badge, field, select, money, carArt
}
from './uiKit.js';
export function setupWizard(draft={
},hasSave=false) {
  const year=Number(draft.year||2025),teams=seasonTeams(year,Number(draft.alternate??-1)),selected=teams.find(t=>t.id===draft.teamId)||teams[0],custom=draft.mode==='custom';
  const free=RESERVES[year].filter(id=>!teams.some(t=>t.drivers.includes(id)));
  return `<div class="wizard-shell"><aside class="wizard-cover"><a class="wordmark" href="#setup"><span class="brand-slashes">▰▰</span> 维修墙<span>车队经理</span></a><div class="cover-title"><p class="eyebrow">你的车队。你的决定。</p><h1>从维修墙，<br>指挥整个赛季。</h1><p>赛车研发、车手转会、进站窗口。<br>把每一个决策，变成赛道上的优势。</p></div><div class="cover-car">${carArt(selected.color)}</div><div class="cover-bottom"><span>2022 — 2025</span><span>离线可玩 · 本地存档</span></div><span class="cover-number" aria-hidden="true">${year}</span></aside>
 <main id="main-content" class="wizard-main"><div class="wizard-top"><div><p class="eyebrow">新经理生涯</p><h2>建立你的赛季</h2></div>${hasSave?'<button class="btn" data-load="auto">继续自动存档</button>':''}</div><form id="setup-form" data-form="newGame"><section class="wizard-section"><div class="step-heading"><span>01</span><h3>选择时代</h3><small>历史赛历与真实开季阵容</small></div><div class="form-grid">${field('赛季',select('year',[2022,2023,2024,2025],year,'data-wizard-change'))}${field('阵容快照',select('alternate',[[-1,'默认开季阵容'],...ALTERNATIVE_LINEUPS[year].map((a,i)=>[i,a.label])],draft.alternate??-1,'data-wizard-change'))}</div><p class="muted">${year<=2023?'22 站完整赛历':'24 站完整赛历'} · ${year<=2024?'前十最快圈加 1 分':'最快圈不再加分'} · ${year===2022?'冲刺结果决定正赛发车顺序':year===2023?'周五正赛排位，周六独立冲刺':'周五冲刺排位，周六冲刺后进行正赛排位'}</p></section>
 <section class="wizard-section"><div class="step-heading"><span>02</span><h3>选择挑战</h3></div><div class="mode-grid"><label class="mode-card ${custom?'':'active'}"><input type="radio" name="mode" value="existing" ${custom?'':'checked'} data-wizard-change><strong>接管现有车队</strong><span>继承阵容、员工与工厂，完成董事会目标。</span></label><label class="mode-card ${custom?'active':''}"><input type="radio" name="mode" value="custom" ${custom?'checked':''} data-wizard-change><strong>第 11 支车队</strong><span>从零起步，打造属于你的赛车品牌。</span></label></div>
 ${custom?`<div class="form-grid customization">${field('车队名称',`<input name="name" maxlength="32" required value="${h(draft.name||'Aurora Racing')}">`)}${field('三字母缩写',`<input name="abbr" maxlength="3" pattern="[A-Za-z]{3}" required value="${h(draft.abbr||'AUR')}">`)}${field('主色',`<input type="color" name="color" value="${h(draft.color||'#68e8b5')}">`)}${field('副色',`<input type="color" name="secondary" value="${h(draft.secondary||'#eff8ff')}">`)}${field('制造商类型',select('type',[['customer','客户车队 · 购买动力单元'],['factory','厂商车队 · 自研动力单元']],draft.type||'customer'))}${field('引擎供应商',select('supplier',['Mercedes','Ferrari','HondaRBPT','Renault'].map(k=>[k,SUPPLIERS[k].name+' · 年采购 '+money(SUPPLIERS[k].price)]),draft.supplier||'Mercedes'))}</div><p class="field-label">选择队徽 · 24 款原创几何标志</p><div class="logo-picker">${LOGOS.map((_,i)=>`<label class="logo-option"><input type="radio" name="logo" value="${i}" ${Number(draft.logo||0)===i?'checked':''} aria-label="几何队徽 ${i+1}">${logo(i,draft.color||'#68e8b5',draft.secondary||'#eff8ff')}</label>`).join('')}</div><div class="form-grid">${[0,1].map(i=>`<div class="setup-driver">${field((i+1)+' 号车手来源',select('driverId'+i,[['custom','自建车手'],...free.map(id=>[id,DRIVER_DATA[id].name])],draft['driverId'+i]||'custom'))}${field('自建车手姓名',`<input name="driverName${i}" maxlength="32" value="${h(draft['driverName'+i]||(i?'Alex Morgan':'Ren Aoki'))}">`)}</div>`).join('')}${field('自建车手初始年龄',`<input name="age" type="number" min="18" max="45" value="${h(draft.age||21)}" required>`)}${field('自建车手初始能力',`<input name="pace" type="number" min="60" max="80" value="${h(draft.pace||74)}" required>`,'60—80；年轻车手后续有更多成长空间')}</div><p class="notice">新车队须支付 $12m 入场担保金；客户初始现金 $55m，厂商 $48m（均未扣担保金）。初始工厂和声望低于现有车队。</p>`:`<input type="hidden" name="teamId" value="${h(selected.id)}"><div class="team-picker">${teams.map(t=>`<button type="button" class="team-option ${selected.id===t.id?'active':''}" data-choose-team="${h(t.id)}" style="--team:${h(t.color)}">${logo(t.logo,t.color)}<span><strong>${h(t.name)}</strong><small>${t.drivers.map(id=>h(DRIVER_DATA[id].name.split(' ').at(-1))).join(' / ')}</small></span><span class="team-rating">${t.performance}</span></button>`).join('')}</div><div class="selected-team"><strong>${h(selected.fullName)}</strong><p>${h(selected.hq)} · ${h(SUPPLIERS[selected.supplier].name)} · ${selected.type==='factory'?'厂商':'客户'}</p><span>起始现金 ${money(selected.cash)} ${badge('声望 '+selected.reputation)}</span></div>`}</section>
 <section class="wizard-section"><div class="step-heading"><span>03</span><h3>设定生涯</h3></div><div class="form-grid">${field('难度',select('difficulty',[['easy','简单 · 更多宽容'],['standard','标准 · 完整经营挑战'],['hard','硬核 · 更强 AI 与严格董事会']],draft.difficulty||'standard'))}${field('随机种子',`<input name="seed" maxlength="100" value="${h(draft.seed||'APEX-2025')}" required>`,'相同种子与相同决策，可复现模拟结果')}</div><div class="actions"><button type="button" class="btn small" data-generate-seed>随机生成新种子</button></div><p class="muted">非官方同人模拟。车手能力、车队性能与所有经营金额为游戏化平衡值。仅在浏览器本地保存，无账号、无网络请求。</p><button class="btn primary start-career" type="submit">开始经理生涯 <span>→</span></button></section></form></main></div>`;
}
```

## js/ui/staffView.js

```js
// ===== 文件: js/ui/staffView.js =====
import {
  teamOf
}
from '../core/helpers.js';
import {
  ROLES, TRAITS
}
from '../data/staff-data.js';
import {
  staffAbility
}
from '../core/staff.js';
import {
  h, header, panel, table, money, number, badge, progress, button
}
from './uiKit.js';
function contract(e,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(e.id)}">${kind==='hireStaff'?'谈判签约':'续约'}</button>`;
}
export function staffView(s) {
  const t=teamOf(s),own=s.staff.filter(e=>e.teamId===t.id),market=s.staff.filter(e=>e.teamId!==t.id);
  return `${header('组织与合同','人员管理','所有员工均为虚构人物；岗位能力与特质实际参与研发、设定、进站及成长计算。')}
 <div class="stats-grid">${[['technical','研发主管'],['engineer','比赛工程'],['mechanics','维修区'],['academy','青训']].map(([role,label])=>`<div class="stat"><span class="label">${label}</span><strong>${number(staffAbility(s,t.id,role))}</strong><small>缺编时以 45 能力应急运作</small></div>`).join('')}</div>
 ${panel('现任员工',table(['姓名 / 岗位','能力 / 士气','特质','年薪','合同','忠诚','操作'],own.map(e=>[`<strong>${h(e.name)}</strong><small>${h(ROLES[e.role])}</small>`,`<strong>${number(e.ability)}</strong><small>士气 ${number(e.morale)}</small>`,`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span><small>${h(TRAITS[e.trait].description)}</small>`,money(e.salary),e.years+' 年',number(e.loyalty),contract(e,'renewStaff')+' '+button('解约','fireStaff',{id:e.id},{class:'small danger',confirm:`解约 ${e.name}，支付剩余薪资 50% 的补偿。缺编会降低对应效率。确认？`})]),'own-staff'))}
 ${panel('员工市场与挖角',`<div class="filter-row"><input type="search" data-filter="staff-market" aria-label="搜索员工" placeholder="搜索姓名、岗位、特质或所在车队"><span class="muted">有合同员工需支付 60% 剩余薪资作为违约金</span></div>${table(['姓名','岗位','能力','特质','现任车队','年薪','操作'],market.map(e=>[h(e.name),h(ROLES[e.role]),number(e.ability),`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span>`,h(s.teams.find(t=>t.id===e.teamId)?.name||'自由员工'),money(e.salary),contract(e,'hireStaff')]),'staff-market')}`)}`;
}
```

## js/ui/standingsView.js

```js
// ===== 文件: js/ui/standingsView.js =====
import {
  teamOf, teamStandings, driverStandings
}
from '../core/helpers.js';
import {
  h, header, panel, table, badge, progress, time, empty, lapDisplay, rankBadge, icon
}
from './uiKit.js';
export function standingsView(s) {
  const teams=teamStandings(s),drivers=driverStandings(s),current=s.history.races.filter(r=>r.kind==='RACE'&&s.calendar.events.some(e=>e.result?.rows[0]?.driverId===r.rows[0]?.driverId&&e.result?.track===r.track));
  return `${header('锦标赛档案',s.season.year+' 赛季积分榜','同分按正赛最高名次次数逐级比较；同样成绩时按既有种子顺序排列。')}
 ${progress(s.calendar.round,s.calendar.events.length,'赛季进度 '+s.calendar.round+' / '+s.calendar.events.length)}
 <div class="grid-2">${panel('制造商积分',table(['名次','车队','积分','正赛冠军'],teams.map((t,i)=>[rankBadge(i+1)+(t.id===s.player.teamId?' '+badge('本队','info'):''),`<span class="team-line" style="--row-color:${h(t.color)}"></span>${h(t.name)}`,'<strong>'+t.points+'</strong>',t.wins]),'constructors','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}${panel('车手积分',table(['名次','车手','车队','积分','冠军','最快圈'],drivers.map((d,i)=>[rankBadge(i+1),h(d.name),h(s.teams.find(t=>t.id===d.teamId)?.abbr||'自由车手'),'<strong>'+d.points+'</strong>',d.wins,`<span class="metric tone-fastest">${icon('stopwatch')}${d.fastest}</span>`]),'drivers-standings','',drivers.map(d=>d.teamId===s.player.teamId?'player-row':'')))}</div>
 ${panel('车队积分走势',`<canvas data-chart="points" data-type="line" data-height="220" aria-label="本队积分走势"></canvas>`)}
 ${panel('每站积分明细',table(['车队',...s.calendar.events.map((e,i)=>'R'+(i+1))],teams.map(t=>[h(t.name),...s.calendar.events.map((e,i)=>t.results.filter(r=>r.round===i+1).reduce((a,r)=>a+r.points,0)||'—')]),'round-points','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}
 ${panel('分站档案',s.history.races.length?table(['站次','赛道','场次','冠军','最快圈','报告'],s.history.races.map((r,i)=>[r.round,h(r.track),r.kind==='SPRINT'?'冲刺':'正赛',h(r.rows[0]?.name||'无'),lapDisplay(r.fastest.time,{fastest:true}),`<button class="btn small" data-report="${i}">查看成绩</button>`]),'race-archive'):empty('比赛结束后，这里将保存分站冠军、最快圈与完整报告。'))}
 ${panel('荣誉室与历年记录',s.history.seasons.length?table(['赛季','制造商冠军','车手冠军','本队名次'],s.history.seasons.map(x=>[x.year,h(x.teams[0]?.name),h(x.drivers[0]?.name),'P'+x.playerRank])):empty('完成首个赛季后，年度排名与冠军将进入荣誉室。'))}`;
}
```

## js/ui/uiKit.js

```js
// ===== 文件: js/ui/uiKit.js =====
import {
  logo
}
from '../data/logos.js';
export const h=value=>String(value??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}
[c]));
export const money=n=>'$'+Number(n||0).toFixed(2)+'m';
export const number=n=>Number(n||0).toFixed(1);
export function time(n) {
  if(!Number.isFinite(n)||n>=9000)return '—';
  const ms=Math.round(n*1000),m=Math.floor(ms/60000);
  return `${m}:${((ms-m*60000)/1000).toFixed(3).padStart(6,'0')}`;
}
export function icon(id) {
  return VISUAL_ICONS[id]?`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${VISUAL_ICONS[id]}</svg>`:`<svg class="icon" aria-hidden="true"><use href="#i-${h(id)}"></use></svg>`;
}
export function badge(text,type='',symbol='') {
  const glyph=symbol||TONE_ICONS[type]||'';
  return `<span class="badge ${h(type)}">${glyph?icon(glyph):''}${h(text)}</span>`;
}
export function button(label,action,payload={
},options={
}) {
  return `<button type="button" class="btn ${h(options.class||'')}" data-action="${h(action)}" data-payload="${h(JSON.stringify(payload))}" ${options.disabled?'disabled':''} ${options.reason?`title="${h(options.reason)}"`:''} ${options.confirm?`data-confirm="${h(options.confirm)}"`:''}>${h(label)}</button>${options.disabled&&options.reason?`<small class="disabled-reason">${h(options.reason)}</small>`:''}`;
}
export function link(label,route,cls='') {
  return `<a class="btn ${h(cls)}" href="#${h(route)}">${h(label)}</a>`;
}
export function header(eyebrow,title,subtitle='',actions='') {
  return `<div class="page-heading"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1>${subtitle?`<p class="muted">${h(subtitle)}</p>`:''}</div><div class="actions">${actions}</div></div>`;
}
export function panel(title,body,extra='',cls='') {
  const visual=visualCategory(title);
  return `<section class="panel ${h(cls)}"><div class="panel-heading"><h2><span class="section-icon tone-${visual.tone}">${icon(visual.symbol)}</span>${h(title)}</h2>${extra}</div>${body}</section>`;
}
export function progress(value,max=100,label='',options={}) {
  const pct=Math.max(0,Math.min(100,Number(value)/Math.max(.001,Number(max))*100));
  const kind=options.kind||(/疲劳/.test(label)?'wear':/预算帽|已使用/.test(label)?'cap':/士气|信心/.test(label)?'confidence':'');
  const tone=kind?severity(kind==='cap'?pct:Number(value),kind):'accent';
  return `<div class="progress-block tone-${tone}">${label?`<div class="progress-label"><span>${h(label)}</span><strong>${pct.toFixed(0)}%</strong></div>`:''}<div class="progress" role="progressbar" aria-valuenow="${pct.toFixed(0)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;
}
export function stat(label,value,note='',cls='') {
  const visual=visualCategory(label);
  return `<div class="stat ${h(cls)}"><div class="stat-heading"><span class="label">${h(label)}</span><span class="stat-symbol tone-${cls==='danger'?'danger':visual.tone}">${icon(visual.symbol)}</span></div><strong>${h(value)}</strong><small>${h(note)}</small></div>`;
}
export function teamBadge(t) {
  return `<span class="team-badge">${logo(t.logo,t.color,t.secondary)}<span>${h(t.name)}</span></span>`;
}
export function tyre(c) {
  return `<span class="tyre tyre-${h(c)}" data-compound="${h(c)}" title="${h(TYRE_LABELS[c]||c)} ${h(c)}" aria-label="${h(TYRE_LABELS[c]||c)} ${h(c)}">${h(c)}</span>`;
}
export function empty(text) {
  return `<div class="empty">${icon('flag')}<p>${h(text)}</p></div>`;
}
export function table(headers,rows,id='',cls='',rowClasses=[]) {
  return `<div class="table-scroll"><table ${id?`id="${h(id)}"`:''} class="${h(cls)}"><thead><tr>${headers.map((x,i)=>`<th><button class="sort" data-sort="${i}" aria-label="按${h(x)}排序">${h(x)} <span>↕</span></button></th>`).join('')}</tr></thead><tbody>${rows.map((row,i)=>`<tr${rowClasses[i]?` class="${h(rowClasses[i])}"`:""}>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function field(label,control,note='') {
  return `<label class="field"><span>${h(label)}</span>${control}${note?`<small>${h(note)}</small>`:''}</label>`;
}
export function select(name,items,value,attrs='') {
  return `<select name="${h(name)}" ${attrs}>${items.map(x=>{const [key,label,disabled]=Array.isArray(x)?x:[x,x,false];return `<option value="${h(key)}" ${String(key)===String(value)?'selected':''} ${disabled?'disabled':''}>${h(label)}</option>`;}).join('')}</select>`;
}
export function carArt(color='#68e8b5') {
  return `<svg class="car-art" viewBox="0 0 600 200" aria-label="赛车俯视示意图" role="img"><defs><linearGradient id="car-shade" x2="0" y2="1"><stop stop-color="${h(color)}"/><stop offset="1" stop-color="#183b35"/></linearGradient></defs><g fill="#121b27" stroke="#526171" stroke-width="2"><rect x="128" y="22" width="66" height="43" rx="10"/><rect x="128" y="135" width="66" height="43" rx="10"/><rect x="402" y="18" width="72" height="48" rx="11"/><rect x="402" y="134" width="72" height="48" rx="11"/></g><g stroke="${h(color)}" fill="none" opacity=".6"><path d="m165 63 85 22m-85 52 85-22m189-50-83 25m83 45-83-25"/></g><g fill="url(#car-shade)" stroke="${h(color)}"><path d="M90 92 220 84 258 60 370 55 422 78 490 82v36l-68 4-52 23-112-5-38-24L90 108Z"/><rect x="76" y="40" width="22" height="120" rx="5"/><rect x="486" y="33" width="24" height="134" rx="4"/><path d="M211 88h78v24h-78Z"/></g><ellipse cx="315" cy="100" rx="35" ry="23" fill="#0b0e13" stroke="#c1f9e8" stroke-width="4"/><ellipse cx="322" cy="100" rx="10" ry="14" fill="#e9eef5"/><path d="M354 83h48m-48 34h48" stroke="#d3fff0" opacity=".5"/><text x="375" y="105" fill="#e6fff7" font-family="system-ui" font-size="15" font-weight="800">F1</text></svg>`;
}
let toastTimer;
export function toast(text,type='info') {
  const el=document.querySelector('#toast');
  el.textContent=text;
  el.className='toast visible '+type;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('visible'),4500);
}
export function openDialog(title,content,onSubmit=null) {
  const d=document.querySelector('#modal');
  document.querySelector('#modal-title').textContent=title;
  document.querySelector('#modal-body').innerHTML=content;
  const form=d.querySelector('form');
  if(form&&onSubmit)form.addEventListener('submit',e=> {
    e.preventDefault(); onSubmit(new FormData(form));
  });
  d.showModal();
  const first=d.querySelector('input, select, button');
  first?.focus();
  return d;
}
export function confirmDialog(message,callback) {
  openDialog('确认操作',`<p class="dialog-copy">${h(message)}</p><div class="actions"><button class="btn" data-close>取消</button><button class="btn primary" id="confirm-yes">确认执行</button></div>`);
  document.querySelector('#confirm-yes').onclick=()=> {
    document.querySelector('#modal').close();
    callback();
  };
} // 所有图表均由原生 Canvas 绘制，尺寸根据 devicePixelRatio 匹配设备像素。
export function drawChart(canvas,{
  labels=[],values=[],series=[],colors=[],type='bar',color='#68e8b5'
}={
}) {
  const rect=canvas.getBoundingClientRect(),w=Math.max(240,rect.width),height=canvas.dataset.height?Number(canvas.dataset.height):220,dpr=window.devicePixelRatio||1;
  canvas.width=w*dpr;
  canvas.height=height*dpr;
  canvas.style.height=height+'px';
  const ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,height);
  ctx.font='11px system-ui';
  ctx.lineWidth=1;
  ctx.strokeStyle='#283141';
  ctx.fillStyle='#8d9aaf';
  if(type==='radar') {
    const cx=w/2,cy=height/2,r=Math.min(w*.28,height*.34),n=labels.length;
    for(let ring=1; ring<=4; ring++) {
      ctx.beginPath();
      for(let i=0; i<n; i++) {
        const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*ring/4,y=cy+Math.sin(a)*r*ring/4;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    for(let i=0; i<n; i++) {
      const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*(values[i]||0)/100,y=cy+Math.sin(a)*r*(values[i]||0)/100;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle=color+'30';
    ctx.fill();
    ctx.strokeStyle=color;
    ctx.stroke();
    ctx.fillStyle='#a9b6c8';
    ctx.textAlign='center';
    labels.forEach((l,i)=> {
      const a=i/n*Math.PI*2-Math.PI/2; ctx.fillText(l,cx+Math.cos(a)*(r+30),cy+Math.sin(a)*(r+23)+4);
    });
    return;
  }
  const left=36,bottom=height-30,top=14,right=w-12,max=Math.max(1,...values,...series.flatMap(s=>s.values));
  for(let i=0; i<=4; i++) {
    const y=bottom-(bottom-top)*i/4;
    ctx.beginPath();
    ctx.moveTo(left,y);
    ctx.lineTo(right,y);
    ctx.stroke();
    ctx.fillText((max*i/4).toFixed(0),2,y+4);
  }
  if(type==='line') {
    const lines=series.length?series:[{
      values,color
    }];
    for(const line of lines) {
      ctx.beginPath();
      line.values.forEach((v,i)=> {
        const x=left+i/Math.max(1,line.values.length-1)*(right-left),y=bottom-v/max*(bottom-top); i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.strokeStyle=line.color||color;
      ctx.lineWidth=2;
      ctx.stroke();
    }
  }
  else values.forEach((v,i)=> {
    const width=(right-left)/Math.max(1,values.length),barHeight=v/max*(bottom-top); ctx.fillStyle=colors[i]||color; ctx.fillRect(left+i*width+5,bottom-barHeight,Math.max(2,width-10),barHeight);
  });
  ctx.fillStyle='#8d9aaf';
  ctx.textAlign='center';
  labels.forEach((l,i)=> {
    if(labels.length<16||i%Math.ceil(labels.length/8)===0)ctx.fillText(l,left+(type==='line'?i/Math.max(1,labels.length-1)*(right-left):(i+.5)/Math.max(1,labels.length)*(right-left)),height-9);
  });
}
// 图标均为项目内手绘 SVG；语义色不随车队主色变化。
const VISUAL_ICONS = {
  tyre:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m6 6 2 2m8 8 2 2M6 18l2-2m8-8 2-2"/>',
  stopwatch:'<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m7-1 2 2m-9 3v5l3 2"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  fuel:'<path d="M4 21V4h10v17M2 21h14M6 7h6v5H6m8-5 4 4v7a2 2 0 0 0 4 0v-7l-3-3m0 0v4h3"/>',
  thermometer:'<path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Zm3-7v10"/><circle cx="12" cy="18" r="1"/>',
  rain:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 2 9M7 17l-1 3m6-3-1 3m6-3-1 3"/>',
  pit:'<path d="M3 21V8l9-6 9 6v13M7 21V11h10v10M9 15h6m-6 3h6"/>',
  warning:'<path d="M12 3 2 21h20ZM12 9v5m0 3v1"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  cross:'<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m-8 0 8-8"/>',
  up:'<path d="M12 21V3m-7 7 7-7 7 7"/>',
  down:'<path d="M12 3v18m-7-7 7 7 7-7"/>',
  coins:'<ellipse cx="10" cy="6" rx="7" ry="3"/><path d="M3 6v5c0 4 14 4 14 0V6M3 11v5c0 4 14 4 14 0m3-5v7c0 2-4 3-7 3"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  chart:'<path d="M3 3v18h18M7 16v-4m5 4V7m5 9v-7"/>',
  radio:'<path d="M4 8h16v13H4Zm3-5 12-2M8 12h8M7 17h2m6 0h2"/>',
  wrench:'<path d="M15 3a6 6 0 0 0-7 7l-6 7 5 5 7-7a6 6 0 0 0 7-7l-5 4-4-4Z"/>',
  wind:'<path d="M2 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',
  heart:'<path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8Z"/>',
  battery:'<path d="M3 6h17v12H3Zm17 4h2v4h-2M7 9v6m-3-3h6m4 0h3"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/>',
  star:'<path d="m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/>',
  play:'<path d="m7 3 14 9-14 9Z"/>',
  pause:'<path d="M6 3h4v18H6Zm8 0h4v18h-4Z"/>',
  forward:'<path d="m3 4 9 8-9 8Zm9 0 9 8-9 8Z"/>'
};
export const TYRE_CODES = ['S','M','H','I','W'];
const TYRE_LABELS = {S:'软胎',M:'中性胎',H:'硬胎',I:'半雨胎',W:'全雨胎'};
const TONE_ICONS = {success:'check',warning:'warning',danger:'cross',info:'radio',fastest:'stopwatch',pit:'pit'};
export function tyreTag(code,showName=true) {
  return `<span class="compound-tag" data-compound="${h(code)}">${tyre(code)}${showName?`<span>${h(TYRE_LABELS[code]||code)}</span>`:''}</span>`;
}
export function tyreLegend(codes=TYRE_CODES) {
  return `<div class="tyre-legend" aria-label="轮胎配方颜色图例">${codes.map(code=>tyreTag(code)).join('')}</div>`;
}
export function tyreInventory(stock) {
  return `<div class="tyre-inventory" aria-label="新胎库存">${TYRE_CODES.map(code=>`<span class="tyre-stock ${stock[code]>0?'':'depleted'}" data-compound="${code}" title="${TYRE_LABELS[code]}：${Number(stock[code]||0)} 套">${tyre(code)}<span><strong>${Number(stock[code]||0)}</strong><small>${stock[code]>0?'套新胎':'已用尽'}</small></span></span>`).join('')}</div>`;
}
export function tyreField(label,name,value,{codes=TYRE_CODES,compact=false}={}) {
  return `<fieldset class="tyre-field ${compact?'compact':''}"><legend>${h(label)}</legend><div class="tyre-options">${codes.map(code=>`<label class="tyre-choice" data-compound="${code}"><input type="radio" name="${h(name)}" value="${code}" ${code===value?'checked':''} aria-label="${h(label+'：'+TYRE_LABELS[code]+' '+code)}" required><span class="tyre-choice-body">${tyre(code)}<span>${TYRE_LABELS[code]}</span>${icon('check')}</span></label>`).join('')}</div></fieldset>`;
}
export function severity(value,kind='wear') {
  if(!Number.isFinite(Number(value)))return 'neutral';
  if(kind==='rating')return value>=85?'success':value>=70?'info':value>=55?'warning':'danger';
  if(kind==='confidence')return value<30?'danger':value<55?'warning':'success';
  if(kind==='cap')return value>=100?'danger':value>=85?'warning':'info';
  return value>=85?'danger':value>=65?'warning':'success';
}
export function metric(text,tone='neutral',symbol='') {
  return `<span class="metric tone-${h(tone)}">${symbol?icon(symbol):''}<span>${h(text)}</span></span>`;
}
export function wearMeter(value) {
  const tone=severity(value);
  return `<div class="wear-meter tone-${tone}">${progress(value,100,'',{kind:'wear'})}<strong>${number(value)}%</strong>${value>=65?icon('warning'):''}</div>`;
}
export function lapDisplay(value,{fastest=false,personal=false,label=false}={}) {
  const valid=Number.isFinite(value)&&value>0&&value<9000;
  const tone=valid&&fastest?'fastest':valid&&personal?'success':'neutral';
  return `<span class="lap-value tone-${tone}" ${valid&&fastest?'title="本场全场最快圈"':valid&&personal?'title="个人最佳单圈"':''}>${valid&&fastest?icon('stopwatch'):''}<span>${valid?time(value):'—'}</span>${label&&valid&&fastest?'<small>全场最快</small>':''}</span>`;
}
export function rankBadge(position) {
  return `<span class="rank-badge rank-${Number(position)}">${position<=3?icon('trophy'):''}<span>P${Number(position)}</span></span>`;
}
export function positionChange(grid,position) {
  const change=Number(grid)-Number(position);
  return Number.isFinite(change)&&change?metric((change>0?'+':'')+change,change>0?'success':'danger',change>0?'up':'down'):metric('持平','neutral');
}
export function raceStatus(car) {
  if(car.retired)return badge(car.reason||'已退赛','danger');
  if(car.pitRequest)return `<span class="badge pit">${icon('pit')}进站 ${tyre(car.pitRequest)}</span>`;
  if(car.drs)return badge('DRS 开启','info','bolt');
  if(car.dirty)return badge('脏空气','warning','wind');
  return badge('正常','subtle','check');
}
export function flagState(race) {
  const code=race.red?'RED':race.control;
  const names={GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'};
  return `<span class="flag-state flag-${h(code)}" data-race="control" data-control="${h(code)}">${icon('flag')}<span>${h(names[code]||code)}</span></span>`;
}
export function eventItem(event) {
  const types={weather:['rain','info','天气'],pit:['pit','pit','进站'],overtake:['up','success','超车'],radio:['radio','info','无线电'],danger:['cross','danger','事故 / 故障'],penalty:['warning','danger','处罚'],warning:['warning','warning','提醒'],info:['flag','neutral','赛况'],fastest:['stopwatch','fastest','最快圈']};
  const [symbol,tone,label]=types[event.type]||types.info;
  return `<div class="event-item tone-${tone}"><span class="event-symbol">${icon(symbol)}</span><div><div class="event-meta"><b>${event.at!==undefined?Math.floor(event.at/60)+':'+String(Math.floor(event.at%60)).padStart(2,'0'):'L'+h(event.lap)}</b><span>${label}</span></div><p>${h(event.text)}</p></div></div>`;
}
export function fastestSummary(s,record,attrs='') {
  const driver=s.drivers.find(d=>d.id===record?.driverId);
  return `<div class="fastest-summary" ${attrs}>${icon('stopwatch')}<div><small>全场最快圈</small><strong>${record?.time<9000?time(record.time):'—'}</strong></div><span>${h(driver?.name||'等待有效圈速')}</span></div>`;
}
function visualCategory(label) {
  const rules=[[/轮胎|配方/,'tyre','cyan'],[/最快|圈速/,'stopwatch','fastest'],[/预算帽|合规/,'shield','info'],[/现金|收支|财务|流水|赞助/,'coins','success'],[/信心|士气|目标/,'heart','warning'],[/研发|技术|项目/,'flask','cyan'],[/工厂|设施|制造|部件|车辆/,'wrench','info'],[/天气|气象|雨/,'rain','info'],[/人员|员工|阵容|车手|青训/,'users','info'],[/积分|冠军|荣誉|档案/,'trophy','warning'],[/通讯|新闻|无线电/,'radio','info'],[/比赛|赛历|下一站/,'flag','cyan'],[/存档|备份/,'save','info']];
  const rule=rules.find(([pattern])=>pattern.test(label));
  return rule?{symbol:rule[1],tone:rule[2]}:{symbol:'chart',tone:'neutral'};
}
```

## js/main.js

```js
// ===== 文件: js/main.js =====
import { generateSeed } from './core/rng.js';
// ===== 文件: js/main.js =====
import {
  NAV, SESSION_NAMES
}
from './data/i18n.js';
import {
  seasonTeams
}
from './data/teams.js';
import {
  DIMENSIONS, COMPOUNDS
}
from './data/parts.js';
import {
  getState, setState, createGame, dispatch
}
from './core/state.js';
import {
  teamOf, copy
}
from './core/helpers.js';
import {
  currentEvent, currentTrack
}
from './core/calendar.js';
import {
  performance, tyreChartData
}
from './core/car.js';
import {
  projectQuote
}
from './core/rnd.js';
import {
  saveSlot, loadSlot, slotInfo, deleteSlot, exportText, importText
}
from './core/save.js';
import {
  dashboard
}
from './ui/dashboard.js';
import {
  carView
}
from './ui/carView.js';
import {
  rndView
}
from './ui/rndView.js';
import {
  staffView
}
from './ui/staffView.js';
import {
  driversView
}
from './ui/driversView.js';
import {
  financeView
}
from './ui/financeView.js';
import {
  calendarView
}
from './ui/calendarView.js';
import {
  raceView, patchRace, reportHtml
}
from './ui/raceView.js';
import {
  standingsView
}
from './ui/standingsView.js';
import {
  saveView
}
from './ui/saveView.js';
import {
  setupWizard
}
from './ui/setupWizard.js';
import {
  h, icon, teamBadge, money, progress, toast, openDialog, confirmDialog, field, select, drawChart
}
from './ui/uiKit.js';
const views={
  dashboard,car:carView,rnd:rndView,staff:staffView,drivers:driversView,finance:financeView,calendar:calendarView,race:raceView,standings:standingsView,save:saveView
};
let draft={
  year:2025,teamId:'mclaren',mode:'existing',seed:generateSeed()
};
let wizard=true;
let saveStatus='尚未保存';
let lastAutosave=0;
let frame=0;
let liveFrame=false;
const root=document.querySelector('#app');
function route() {
  const key=location.hash.slice(1);
  return views[key]?key:'dashboard';
}
function autosave(force=false) {
  const s=getState();
  if(!s?.settings.autosave)return;
  if(!force&&Date.now()-lastAutosave<5000)return;
  try{
    saveStatus='已保存 '+saveSlot(s);
    lastAutosave=Date.now();
  }
  catch(error) {
    saveStatus='自动保存失败，请导出备份';
    toast(error.message,'error');
  }
  const el=document.querySelector('#save-status');
  if(el)el.textContent=saveStatus;
}
function charts() {
  const s=getState();
  if(!s)return;
  const t=teamOf(s);
  for(const canvas of root.querySelectorAll('canvas[data-chart]')) {
    const kind=canvas.dataset.chart;
    if(kind==='tyres'){drawChart(canvas,tyreChartData(s,currentTrack(s)));}
    else if(kind==='performance') {
      const v=performance(s,t);
      drawChart(canvas,{
        type:'radar',labels:['下压力','气动效率','机械抓地','动力','轮胎管理','可靠性'],values:[v.downforce,v.aero,v.grip,v.power,v.tyres,v.reliability],color:t.color
      });
    }
    else if(kind==='finance') {
      const list=s.finance[t.id].ledger.slice(0,12).reverse();
      drawChart(canvas,{
        labels:list.map(x=>'日'+x.day),values:list.map(x=>Math.abs(x.amount)),colors:list.map(x=>x.amount>=0?'#78e3b0':'#ff8794'),color:t.color
      });
    }
    else if(kind==='points') {
      let total=0;
      const values=s.calendar.events.map((e,i)=> {
        total+=t.results.filter(x=>x.round===i+1).reduce((a,x)=>a+x.points,0); return total;
      });
      drawChart(canvas,{
        type:'line',labels:values.map((_,i)=>'R'+(i+1)),values,color:t.color
      });
    }
    else if(kind==='positions'&&s.race) {
      const records=s.race.positions;
      drawChart(canvas,{
        type:'line',labels:records.map(x=>'L'+x.lap),series:t.drivers.map((id,i)=>({
          color:i?t.secondary:t.color,values:records.map(x=>x.positions.find(p=>p.id===id)?.position||s.teams.length*2)
        }))
      });
    }
  }
}
function shell(s,content) {
  const t=teamOf(s),f=s.finance[t.id],e=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  document.documentElement.style.setProperty('--accent',t.color);
  return `<div class="app-shell"><aside class="sidebar"><a class="wordmark" href="#dashboard"><span class="brand-slashes">▰▰</span><b class="brand-name">维修墙</b><span>车队经理</span></a><p class="nav-group-label">赛季运营</p><nav aria-label="主导航">${NAV.map(([key,label,id])=>`<a class="nav-link ${route()===key?'active':''}" href="#${key}" title="${h(label)}" ${route()===key?'aria-current="page"':''}>${icon(id)}<span>${h(label)}</span></a>`).join('')}</nav><div class="sidebar-footer"><strong>${s.season.year} · ${s.teams.length} 支车队</strong><p>本地模拟 / 零外部依赖</p><p>非官方 F1 同人项目</p></div></aside><div class="workspace"><header class="topbar">${teamBadge(t)}<div class="top-metrics"><div><small>当前日期</small><strong>${h(s.calendar.date)}</strong></div><div class="top-next"><small>${s.season.offseason?'赛季阶段':'下一站 / R'+(e?.round||'—')}</small><strong>${h(track?.name||'转会窗')}</strong></div><div class="top-money"><small>可用现金</small><strong>${money(f.cash)}</strong></div><div class="top-cap"><small>预算帽 ${money(f.capUsed)} / ${money(f.capLimit)}</small>${progress(f.capUsed,f.capLimit)}</div><span id="save-status" class="save-status" role="status">${h(saveStatus)}</span></div></header><main id="main-content" class="main-content">${s.season.gameOver?`<section class="game-over"><h2>经理生涯结束</h2><p>${h(s.season.gameOver)}</p><a class="btn" href="#save">读取存档或新建生涯</a></section>`:''}${content}</main></div></div>`;
}
function render() {
  frame=0;
  const s=getState();
  try{
    if(wizard||!s) {
      root.innerHTML=setupWizard(draft,!!slotInfo('auto'));
      document.documentElement.style.setProperty('--accent','#68e8b5');
      return;
    }
    root.innerHTML=shell(s,views[route()](s));
    requestAnimationFrame(()=>{charts();const latest=getState();if(route()==='race'&&latest?.race?.realtime&&!latest.race.finished)patchRace(latest);});
  }
  catch(error) {
    toast('界面渲染失败：'+error.message,'error');
    root.innerHTML=`<main class="boot-message"><h1>无法显示当前页面</h1><p>${h(error.message)}</p><a class="btn" href="#save">前往存档</a><button class="btn" data-new-game>重新开始</button></main>`;
  }
}
function scheduleRender(live=false) {
  if(frame) {
    if(!live)liveFrame=false;
    return;
  }
  liveFrame=live;
  frame=requestAnimationFrame(()=> {
    frame=0; const s=getState(); if(liveFrame&&!wizard&&route()==='race'&&s?.race&&!s.race.finished&&document.querySelector('#timing-body')) {
      liveFrame=false; patchRace(s); return;
    }
    liveFrame=false; render();
  });
}
function perform(action,payload={
},quiet=false) {
  try{
    const prev=getState()?.race;const signature=prev?`${prev.q?.stage}/${prev.q?.status}`:'';
    const message=dispatch(action,payload);const active=getState()?.race;const changed=active&&signature!==`${active.q?.stage}/${active.q?.status}`;
    if(!changed&&['tick','command','advanceRealtime','qualCommand','focusDriver','timingGap'].includes(action)&&getState().race&&!getState().race.finished) {
      if(action==='command'||action==='qualCommand')toast(message);
      if(action==='focusDriver'||action==='timingGap')patchRace(getState());
      scheduleRender(true);
    }
    else{
      scheduleRender();
      if(!quiet)toast(message);
    }
    autosave(!quiet);
  }
  catch(error) {
    toast(error.message,'error');
    if(!quiet)scheduleRender();
  }
}
function captureDraft() {
  const form=document.querySelector('#setup-form');
  if(form)draft={
    ...draft,...Object.fromEntries(new FormData(form))
  };
}
function load(slot) {
  const work=()=> {
    try{
      const state=loadSlot(slot);
      setState(state);
      wizard=false;
      saveStatus='已读取 '+slot;
      location.hash='dashboard';
      render();
      toast('存档读取成功');
    }
    catch(error) {
      toast(error.message,'error');
    }
  };
  if(getState()&&!wizard)confirmDialog('读取此存档将替换当前进度，请确保已备份。确认读取？',work);
  else work();
}
function download(filename,text) {
  const url=URL.createObjectURL(new Blob([text],{
    type:'application/json'
  })),a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function contractDialog(kind,id) {
  const s=getState(),isStaff=kind.includes('Staff'),entity=(isStaff?s.staff:s.drivers).find(x=>x.id===id);
  if(!entity)return;
  const salary=isStaff?entity.salary:entity.contract.salary;
  const signing=kind==='signDriver'||kind==='hireStaff';
  openDialog((signing?'接洽签约 · ':'续约 · ')+entity.name,`<form><p class="muted">合同将立即生效。比赛周末已登记时，请先完成周末再签约。${signing?'对方可能拒绝报价；挖角及替换已有席位需要违约金。':''}</p>${field('年薪（百万美元）',`<input name="salary" type="number" min="0.1" max="${isStaff?20:100}" step="0.01" value="${(salary*1.15).toFixed(2)}" required>`)}${field('合同年限',select('years',[1,2,3,4,5],2))}${kind==='signDriver'?field('替换席位',select('slot',[[0,'1 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[0]).name],[1,'2 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[1]).name]],0)):''}<p class="notice">确认即提出合同并按结果支付解约 / 挖角费用；薪资在日常运营中计入预算帽。</p><div class="actions"><button class="btn" type="button" data-close>取消</button><button type="submit" class="btn primary">确认合同报价</button></div></form>`,data=> {
    document.querySelector('#modal').close(); perform(kind,{
      id,...Object.fromEntries(data)
    });
  });
}
root.addEventListener('click',event=> {
  const el=event.target.closest('button,a,[data-action]'); if(!el)return; if(el.hasAttribute('data-generate-seed')){captureDraft();draft.seed=generateSeed();render();return;}
  if(el.dataset.chooseTeam) {
    captureDraft(); draft.teamId=el.dataset.chooseTeam; render(); return;
  }
  if(el.dataset.action) {
    const action=el.dataset.action; let payload; try{
      payload=JSON.parse(el.dataset.payload||'{}');
    }
    catch(error) {
      toast('操作参数无效','error'); return;
    }
    if(el.dataset.confirm)confirmDialog(el.dataset.confirm,()=>perform(action,payload)); else perform(action,payload); return;
  }
  if(el.dataset.contract) {
    contractDialog(el.dataset.contract,el.dataset.id); return;
  }
  if(el.dataset.report!==undefined) {
    openDialog('比赛档案',reportHtml(getState(),Number(el.dataset.report))); return;
  }
  if(el.dataset.save) {
    confirmDialog('将当前进度写入此槽位，覆盖原有存档。确认？',()=> {
      try{
        saveStatus='手动保存 '+saveSlot(getState(),el.dataset.save); render(); toast('手动存档成功');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.dataset.load) {
    load(el.dataset.load); return;
  }
  if(el.dataset.deleteSave) {
    confirmDialog('永久删除这个本地存档槽位，确认？',()=> {
      try{
        deleteSlot(el.dataset.deleteSave); render(); toast('存档已删除');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.hasAttribute('data-new-game')) {
    confirmDialog('进入新生涯向导，当前进度请先手动保存或导出备份。确认？',()=> {
      wizard=true; location.hash='setup'; render();
    }); return;
  }
  if(el.hasAttribute('data-export')) {
    download('pitwall-'+getState().season.year+'-'+getState().calendar.round+'.json',exportText(getState())); toast('存档已导出'); return;
  }
  if(el.hasAttribute('data-export-text')) {
    document.querySelector('#export-text').value=exportText(getState()); toast('JSON 文本已生成'); return;
  }
  if(el.hasAttribute('data-copy')) {
    const area=document.querySelector('#export-text'); if(!area.value)area.value=exportText(getState()); if(navigator.clipboard&&location.protocol!=='file:') {
      navigator.clipboard.writeText(area.value).then(()=>toast('已复制存档')).catch(()=> {
        area.select(); toast('请按 Ctrl+C 复制选中文本');
      });
    }
    else{
      area.select(); toast('请按 Ctrl+C 复制选中文本');
    }
    return;
  }
  if(el.dataset.sort!==undefined) {
    const table=el.closest('table'),body=table.tBodies[0],index=Number(el.dataset.sort),direction=el.dataset.direction==='asc'?-1:1; el.dataset.direction=direction===1?'asc':'desc'; const rows=Array.from(body.rows); rows.sort((a,b)=> {
      const x=a.cells[index].textContent.trim(),y=b.cells[index].textContent.trim(),nx=Number(x.replace(/[^\d.\-]/g,'')),ny=Number(y.replace(/[^\d.\-]/g,'')); return direction*(x.match(/\d/)&&y.match(/\d/)&&Number.isFinite(nx)&&Number.isFinite(ny)?nx-ny:x.localeCompare(y,'zh-CN'));
    }); for(const row of rows)body.append(row);
  }
});
root.addEventListener('change',event=> {
  const el=event.target; if(wizard&&el.type==='color'){captureDraft();render();}
  else if(el.hasAttribute('data-wizard-change')) {
    const previousYear=Number(draft.year); captureDraft(); if(Number(draft.year)!==previousYear) {
      draft.alternate=-1; draft.teamId=seasonTeams(Number(draft.year))[0].id;
    }
    render();
  }
  else if(el.dataset.liveCommand) {
    perform('command',{
      id:el.dataset.driver,command:el.dataset.liveCommand,value:el.value
    });
  }
  else if(el.hasAttribute('data-autosave')) {
    perform('autosave',{
      value:el.checked
    });
  }
  else if(el.id==='import-file') {
    const file=el.files[0]; if(!file)return; if(file.size>12*1024*1024) {
      toast('存档超过 12 MB 限制','error'); return;
    }
    file.text().then(text=> {
      document.querySelector('#import-text').value=text; toast('文件已读取，请点击验证并导入');
    }).catch(()=>toast('无法读取文件','error'));
  }
});
root.addEventListener('keydown',event=>{const el=event.target.closest('a[role="button"][data-action]');if(el&&['Enter',' '].includes(event.key)){event.preventDefault();perform(el.dataset.action,JSON.parse(el.dataset.payload||'{}'));}});
root.addEventListener('input',event=> {
  const el=event.target; if(el.type==='range'&&el.nextElementSibling?.tagName==='OUTPUT')el.nextElementSibling.value=el.value; if(el.dataset.filter) {
    const term=el.value.trim().toLocaleLowerCase(); const table=document.getElementById(el.dataset.filter); if(table)for(const row of table.tBodies[0].rows)row.hidden=!row.textContent.toLocaleLowerCase().includes(term);
  }
});
root.addEventListener('submit',event=> {
  const form=event.target; if(!form.dataset.form)return; event.preventDefault(); const p=Object.fromEntries(new FormData(form)),kind=form.dataset.form; try{
    if(kind==='newGame') {
      const state=createGame({
        ...p,custom:p.mode==='custom',driverNames:[p.driverName0||'Ren Aoki',p.driverName1||'Alex Morgan'],driverIds:[p.driverId0||'custom',p.driverId1||'custom']
      }); setState(state); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('欢迎来到维修墙，先检查目标与工厂，再进入比赛周末。');
    }
    else if(kind==='setup') {
      perform('setup',{
        slot:Number(p.slot),values:[0,1,2,3].map(i=>Number(p['v'+i]))
      });
    }
    else if(kind==='strategy') {
      perform('strategy',{
        id:p.id,plan:{
          start:p.start,pitLap:Number(p.pitLap),secondLap:Number(p.secondLap),next:p.next,backup:p.backup,rain:p.rain,auto:form.querySelector('[name="auto"]').checked
        }
      });
    }
    else if(kind==='project') {
      const q=projectQuote(getState(),teamOf(getState()),p.part,p.kind,Number(p.copies)); confirmDialog(`项目总预付 ${money(q.cost+q.manufacturing)}，工期 ${q.days} 天，风洞 ${q.wind} / CFD ${q.cfd}，失败风险 ${(q.risk*100).toFixed(1)}%。确认立项？`,()=>perform('project',p));
    }
    else if(kind==='qualSend'){perform('qualCommand',{id:p.id,command:'send',value:{compound:p.compound,fresh:p.fresh!=='reuse'}});}
    else if(kind==='driverCode'){perform('driverCode',{id:p.id,value:p.value});}
    else if(kind==='train') {
      perform('train',p);
    }
    else if(kind==='pit') {
      perform('command',{
        id:p.id,command:'pit',value:p.value
      });
    }
    else if(kind==='import') {
      const imported=importText(p.json); confirmDialog('存档结构验证通过。导入将替换当前进度，确认？',()=> {
        setState(imported); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('存档导入成功');
      });
    }
  }
  catch(error) {
    toast(error.message,'error');
  }
});
document.addEventListener('click',event=>{const skip=event.target.closest('a[href="#main-content"]');if(skip){event.preventDefault();const main=document.querySelector('#main-content');if(main){main.setAttribute('tabindex','-1');main.focus();main.scrollIntoView();}}});
document.addEventListener('click',event=> {
  if(event.target.closest('[data-close]'))document.querySelector('#modal').close();
});
root.addEventListener('toggle',event=> {
  if(event.target.tagName==='DETAILS'&&event.target.open)requestAnimationFrame(charts);
},true);
window.addEventListener('hashchange',()=> {
  if(!wizard&&!getState())wizard=true; render(); window.scrollTo(0,0);
});
let resizeFrame=0;
window.addEventListener('resize',()=> {
  cancelAnimationFrame(resizeFrame); resizeFrame=requestAnimationFrame(charts);
});
window.addEventListener('beforeunload',()=> {
  if(!wizard)autosave(true);
});
let lastTick=performanceNow();
function performanceNow() {
  return globalThis.performance.now();
}
document.addEventListener('visibilitychange',()=>{lastTick=performanceNow();});
setInterval(()=> {
  const s=getState(),now=performanceNow(); if(wizard||document.hidden||document.querySelector('dialog[open]')||!s?.race||s.race.finished||!s.race.running||s.race.red||s.season.gameOver||route()!=='race') {
    lastTick=now; return;
  }
  const elapsed=Math.max(0,(now-lastTick)/1000);lastTick=now;
  if(s.race.realtime)perform('advanceRealtime',{seconds:Math.min(elapsed*s.settings.speed,40000)},true);
  else if(elapsed>=1.2/s.settings.speed)perform('tick',{count:1},true);
},60);
try{
  const saved=slotInfo('auto');
  if(saved&&!saved.broken) {
    setState(loadSlot('auto'));
    wizard=false;
    saveStatus='已恢复自动存档';
  }
}
catch(error) {
  toast('自动存档无法读取，可新建生涯或导入备份：'+error.message,'error');
}
render();
```

## js/boot.js

```js
// ===== 文件: js/boot.js =====
// file:// 禁止跨文件 ES Module 导入，因此使用已随包生成的经典脚本。
// HTTP / GitHub Pages 使用模块源码。玩家运行两条路径都不需要构建。
(function () {
  function failure(error) {
    const root = document.getElementById('app'); root.replaceChildren(); const main = document.createElement('main'); main.className = 'boot-message'; const title = document.createElement('h1'); title.textContent = '启动失败'; const text = document.createElement('p'); text.textContent = '请完整解压项目后打开 index.html，或运行 python -m http.server 8000。错误：' + error.message; main.append(title, text); root.append(main);
  }
  if (location.protocol === 'file:') {
    const script = document.createElement('script'); script.src = './js/offline.js'; script.onerror = function () {
      failure(new Error('缺少 js/offline.js'));
    }; document.head.append(script);
  }
  else {
    import('./main.js').catch(failure);
  }
}
());
```

## js/offline.js

```js
// ===== 文件: js/offline.js =====
// 由 tools/build_offline.py 从分层 ES Module 源码生成；无运行时依赖。
(function () {
'use strict';
const modules = {};

// ===== 文件: js/core/rng.js =====
modules['js/core/rng.js'] = (function () {
// ===== 文件: js/core/rng.js =====
function seedFrom(value) {
  let h=2166136261;
  for(const c of String(value)) {
    h^=c.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
} // Mulberry32：仅修改可序列化状态 s.rng，保存/加载后继续同一随机序列。
function random(s) {
  s.rng=(s.rng+0x6D2B79F5)>>>0;
  let t=s.rng;
  t=Math.imul(t^(t>>>15),t|1);
  t^=t+Math.imul(t^(t>>>7),t|61);
  return ((t^(t>>>14))>>>0)/4294967296;
}
function between(s,a,b) {
  return a+(b-a)*random(s);
}
function integer(s,a,b) {
  return Math.floor(between(s,a,b+1));
}
function chance(s,p) {
  return random(s)<p;
}
function choose(s,items) {
  return items[integer(s,0,items.length-1)];
}
// 只在新生涯向导点击“生成种子”时使用时钟作为初始熵；比赛中不调用。
function generateSeed(){const source={rng:seedFrom(String(Date.now()))};return 'PIT-'+integer(source,10000000,99999999).toString(36).toUpperCase();}

return {seedFrom, random, between, integer, chance, choose, generateSeed};
}());

// ===== 文件: js/data/i18n.js =====
modules['js/data/i18n.js'] = (function () {
// ===== 文件: js/data/i18n.js =====
const NAV = [['dashboard','总览','grid'],['car','车辆','car'],['rnd','研发','flask'],['staff','人员','users'],['drivers','车手','helmet'],['finance','财务','wallet'],['calendar','赛历','calendar'],['race','比赛指挥','flag'],['standings','积分档案','trophy'],['save','存档','save']];
const SESSION_NAMES = {
  FP1:'第一节练习',FP2:'第二节练习',FP3:'第三节练习',Q:'正赛排位',SQ:'冲刺排位',SPRINT:'冲刺赛',RACE:'正赛',DONE:'周末结束'
};
const DIFFICULTIES = {
  easy:{
    name:'简单',ai:0.82,mistake:0.8,tolerance:1.5,cap:1.06
  },standard:{
    name:'标准',ai:1,mistake:1,tolerance:1,cap:1
  },hard:{
    name:'硬核',ai:1.2,mistake:1.2,tolerance:0.75,cap:0.98
  }
};

return {NAV, SESSION_NAMES, DIFFICULTIES};
}());

// ===== 文件: js/data/teams.js =====
modules['js/data/teams.js'] = (function () {
// ===== 文件: js/data/teams.js =====
// 基础史实字段与游戏数值分开：performance、cash、设施等级均非官方。
const SUPPLIERS = {
  Mercedes:{
    name:'Mercedes',power:88,reliability:94,price:13
  },Ferrari:{
    name:'Ferrari',power:91,reliability:89,price:14
  },RBPT:{
    name:'Red Bull Powertrains',power:90,reliability:90,price:12
  },HondaRBPT:{
    name:'Honda RBPT',power:92,reliability:93,price:13
  },Renault:{
    name:'Renault',power:82,reliability:86,price:10
  }
};
const identities = {
  redbull:['Red Bull','Oracle Red Bull Racing','RBR','#3671c6','Milton Keynes, 英国','factory'], ferrari:['Ferrari','Scuderia Ferrari','FER','#ef3340','Maranello, 意大利','factory'], mercedes:['Mercedes','Mercedes-AMG PETRONAS F1 Team','MER','#27f4d2','Brackley, 英国','factory'], mclaren:['McLaren','McLaren F1 Team','MCL','#ff8700','Woking, 英国','customer'], alpine:['Alpine','BWT Alpine F1 Team','ALP','#ff87bc','Enstone, 英国 / Viry, 法国','factory'], aston:['Aston Martin','Aston Martin Aramco F1 Team','AMR','#229971','Silverstone, 英国','customer'], williams:['Williams','Williams Racing','WIL','#64c4ff','Grove, 英国','customer'], junior:['AlphaTauri','Scuderia AlphaTauri','ATY','#7695b1','Faenza, 意大利','customer'], sauber:['Alfa Romeo','Alfa Romeo F1 Team ORLEN','ALF','#c92d4b','Hinwil, 瑞士','customer'], haas:['Haas','Haas F1 Team','HAS','#b6babd','Kannapolis, 美国 / Banbury, 英国','customer']
};
const LINEUPS = {
  2022:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','ricciardo'],alpine:['alonso','ocon'],junior:['gasly','tsunoda'],aston:['vettel','stroll'],williams:['albon','latifi'],sauber:['bottas','zhou'],haas:['magnussen','schumacher']
  }, 2023:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],alpine:['gasly','ocon'],junior:['tsunoda','devries'],aston:['alonso','stroll'],williams:['albon','sargeant'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2024:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],aston:['alonso','stroll'],alpine:['gasly','ocon'],williams:['albon','sargeant'],junior:['tsunoda','ricciardo'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2025:{
    mclaren:['norris','piastri'],ferrari:['leclerc','hamilton'],redbull:['verstappen','lawson'],mercedes:['russell','antonelli'],aston:['alonso','stroll'],alpine:['gasly','doohan'],williams:['albon','sainz'],junior:['hadjar','tsunoda'],haas:['ocon','bearman'],sauber:['hulkenberg','bortoleto']
  }
};
const ALTERNATIVE_LINEUPS = {
  2022:[], 2023:[{
    label:'2023 新加坡：Lawson 代替伤停的 Ricciardo',changes:{
      junior:['tsunoda','lawson']
    }
  }], 2024:[{
    label:'2024 美国站：Colapinto / Lawson',changes:{
      williams:['albon','colapinto'],junior:['tsunoda','lawson']
    }
  }], 2025:[{
    label:'2025 日本站：Tsunoda / Lawson 互换',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson']
    }
  },{
    label:'2025 伊莫拉站：另含 Colapinto 接替 Doohan',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson'],alpine:['gasly','colapinto']
    }
  }]
};
const PERFORMANCE = {
  2022:{
    redbull:94,ferrari:92,mercedes:87,mclaren:79,alpine:80,aston:72,junior:73,sauber:75,haas:72,williams:64
  },2023:{
    redbull:97,ferrari:87,mercedes:87,mclaren:83,aston:85,alpine:78,williams:71,junior:68,sauber:69,haas:68
  },2024:{
    redbull:95,ferrari:91,mclaren:91,mercedes:87,aston:78,alpine:68,williams:69,junior:75,sauber:65,haas:72
  },2025:{
    mclaren:96,ferrari:90,redbull:91,mercedes:90,williams:79,aston:72,alpine:70,junior:75,haas:74,sauber:68
  }
};
const PREVIOUS_RANKS = {
  2022:['mercedes','redbull','ferrari','mclaren','alpine','junior','aston','williams','sauber','haas'],2023:['redbull','ferrari','mercedes','alpine','mclaren','sauber','aston','haas','junior','williams'],2024:['redbull','mercedes','ferrari','mclaren','aston','alpine','williams','junior','sauber','haas'],2025:['mclaren','ferrari','redbull','mercedes','aston','alpine','haas','junior','williams','sauber']
};
function seasonTeams(year,alternate=-1) {
  const lineups=LINEUPS[year];
  if(!lineups)throw new Error('尚未内置该历史赛季');
  return Object.entries(lineups).map(([id,drivers],index)=> {
    let [name,fullName,abbr,color,hq,type]=identities[id]; if(id==='junior'&&year>=2024) {
      name=year===2024?'RB':'Racing Bulls'; fullName=year===2024?'Visa Cash App RB F1 Team':'Visa Cash App Racing Bulls F1 Team'; abbr='VCB'; color='#6692ff';
    }
    if(id==='sauber'&&year>=2024) {
      name='Sauber'; fullName='Stake F1 Team Kick Sauber'; abbr='SAU'; color='#52e252';
    }
    if(id==='sauber'&&year===2023)fullName='Alfa Romeo F1 Team Stake'; if(id==='ferrari'&&year===2025)fullName='Scuderia Ferrari HP'; if(id==='haas'&&year>=2023)fullName='MoneyGram Haas F1 Team'; if(id==='williams'&&year===2025)fullName='Atlassian Williams Racing'; if(id==='aston'&&year<=2023)fullName='Aston Martin Aramco Cognizant F1 Team'; const supplier=['redbull','junior'].includes(id)?(year===2022?'RBPT':'HondaRBPT'):['ferrari','sauber','haas'].includes(id)?'Ferrari':id==='alpine'?'Renault':'Mercedes'; const p=PERFORMANCE[year][id]; return {
      id,name,fullName,abbr,color,secondary:'#f1f5fb',hq,type,supplier,drivers:ALTERNATIVE_LINEUPS[year][alternate]?.changes[id]||drivers,performance:p,cash:68+(p-60)*2.1,reputation:p,logo:index,previousRank:PREVIOUS_RANKS[year].indexOf(id)+1
    };
  });
}

return {SUPPLIERS, LINEUPS, ALTERNATIVE_LINEUPS, PERFORMANCE, PREVIOUS_RANKS, seasonTeams};
}());

// ===== 文件: js/data/parts.js =====
modules['js/data/parts.js'] = (function () {
// ===== 文件: js/data/parts.js =====
const DIMENSIONS = {
  downforce:'下压力',aero:'气动效率',grip:'机械抓地',suspension:'路肩适应',brakes:'制动',power:'动力功率',ers:'能量部署',reliability:'可靠性',tyres:'轮胎友好',weight:'轻量化'
};
const PARTS = [ ['front','前翼','aero','downforce',1.8,8,99],['rear','尾翼','aero','aero',1.8,8,99],['floor','底板','aero','downforce',3.8,14,99],['sidepod','侧箱','aero','aero',2.8,11,99],['suspension','悬挂','chassis','grip',2.1,10,99],['gearbox','变速箱','chassis','suspension',1.6,9,4],['ice','内燃机','power','power',4.8,18,3],['turbo','涡轮','power','power',3.1,14,3],['mguk','MGU-K','power','ers',2.8,14,3],['mguh','MGU-H','power','ers',2.6,14,3],['battery','电池','power','ers',2.2,12,2],['electronics','电子系统','power','ers',1.7,9,2],['brakes','制动系统','chassis','brakes',1.5,8,99],['cooling','散热','reliability','reliability',1.4,7,99] ].map(([id,name,department,dimension,cost,days,quota])=>({
  id,name,department,dimension,cost,days,quota
}));
function partQuota(part,year) {
  return ['ice','turbo','mguk','mguh'].includes(part.id)&&year>=2023?4:part.quota;
}
const DEPARTMENTS = {
  aero:'空气动力部',chassis:'底盘机械部',power:'动力单元部',reliability:'可靠性部',strategy:'策略赛道工程部',manufacturing:'制造生产部'
};
const FACILITIES = {
  wind:{
    name:'风洞',effect:'提高空气动力研发效率',cost:8,days:35
  },cfd:{
    name:'CFD 集群',effect:'提高 CFD 研发效率',cost:7,days:28
  },sim:{
    name:'模拟器',effect:'提高设定数据采集与车手训练效率',cost:5,days:24
  },factory:{
    name:'制造车间',effect:'增加同时生产能力并缩短工期',cost:6,days:30
  },marketing:{
    name:'市场营销部',effect:'提高赞助报价与车手吸引力',cost:4,days:21
  }
};
const COMPOUNDS = {
  S:{
    name:'软胎',life:19,pace:-0.65,deg:0.085,min:85,max:105,color:'#ff5364'
  },M:{
    name:'中性胎',life:29,pace:0,deg:0.05,min:80,max:105,color:'#ffd166'
  },H:{
    name:'硬胎',life:40,pace:0.4,deg:0.035,min:80,max:110,color:'#e5eaf1'
  },I:{
    name:'半雨胎',life:33,pace:1,deg:0.04,min:55,max:85,color:'#50d6a1'
  },W:{
    name:'全雨胎',life:29,pace:2,deg:0.05,min:45,max:70,color:'#67a9ff'
  }
};
const MODES = {
  push:{
    name:'推进到底',pace:-0.38,wear:1.35,fuel:1.1,risk:1.8
  },normal:{
    name:'正常',pace:0,wear:1,fuel:1,risk:1
  },tyres:{
    name:'节省轮胎',pace:0.32,wear:0.73,fuel:0.98,risk:0.7
  },fuel:{
    name:'节省燃油',pace:0.4,wear:0.94,fuel:0.84,risk:0.85
  },attack:{
    name:'攻击',pace:-0.15,wear:1.15,fuel:1.05,risk:1.35
  },defend:{
    name:'防守',pace:0.12,wear:1.1,fuel:1.03,risk:1.2
  },yield:{
    name:'让车',pace:0.65,wear:0.88,fuel:0.94,risk:0.6
  },safe:{
    name:'保守完赛',pace:0.75,wear:0.7,fuel:0.9,risk:0.4
  }
};
const ENGINES = {
  high:{
    name:'高功率',pace:-0.2,wear:1.55,fuel:1.06
  },normal:{
    name:'常规',pace:0,wear:1,fuel:1
  },save:{
    name:'保寿命',pace:0.28,wear:0.7,fuel:0.94
  }
};

return {DIMENSIONS, PARTS, partQuota, DEPARTMENTS, FACILITIES, COMPOUNDS, MODES, ENGINES};
}());

// ===== 文件: js/core/helpers.js =====
modules['js/core/helpers.js'] = (function () {
// ===== 文件: js/core/helpers.js =====
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const copy=x=>JSON.parse(JSON.stringify(x));
function uid(s,prefix) {
  s.nextId=(s.nextId||0)+1;
  return prefix+'-'+s.nextId;
}
function news(s,text,type='info') {
  s.news.unshift({
    id:uid(s,'news'),day:s.calendar?.day||0,date:s.calendar?.date||'',text,type
  });
  s.news.length=Math.min(120,s.news.length);
}
function teamOf(s,id=s.player.teamId) {
  const t=s.teams.find(t=>t.id===id);
  if(!t)throw new Error('车队不存在');
  return t;
}
function driverOf(s,id) {
  const d=s.drivers.find(d=>d.id===id);
  if(!d)throw new Error('车手不存在');
  return d;
}
function requireCondition(ok,message) {
  if(!ok)throw new Error(message);
}
function mutable(s) {
  requireCondition(!s.race||s.race.finished,'比赛进行中：请先完成比赛');
  requireCondition(!s.season.gameOver,'本次生涯已结束，可读取存档或重新开局');
}
function rosterMutable(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend||s.season.offseason,'比赛周末已登记阵容，请在周末结算后签约');
}
function ties(a,b) {
  const n=Math.max(a.results?.length||0,b.results?.length||0,30);
  for(let p=1; p<=n; p++) {
    const ca=(a.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    const cb=(b.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    if(ca!==cb)return cb-ca;
  }
  return (a.previousRank||99)-(b.previousRank||99)||String(a.id).localeCompare(String(b.id));
}
function teamStandings(s) {
  return s.teams.slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
function driverStandings(s) {
  return s.drivers.filter(d=>d.teamId||d.points||d.results.length).slice().sort((a,b)=>b.points-a.points||ties(a,b));
}

return {clamp, copy, uid, news, teamOf, driverOf, requireCondition, mutable, rosterMutable, ties, teamStandings, driverStandings};
}());

// ===== 文件: js/core/driverCodes.js =====
modules['js/core/driverCodes.js'] = (function () {
// Official broadcast codes where available; custom drivers receive unique editable codes.
const { requireCondition, driverOf } = modules['js/core/helpers.js'];
const DRIVER_CODES={verstappen:'VER',perez:'PER',leclerc:'LEC',sainz:'SAI',hamilton:'HAM',russell:'RUS',norris:'NOR',ricciardo:'RIC',alonso:'ALO',ocon:'OCO',gasly:'GAS',tsunoda:'TSU',vettel:'VET',stroll:'STR',albon:'ALB',latifi:'LAT',bottas:'BOT',zhou:'ZHO',magnussen:'MAG',schumacher:'MSC',piastri:'PIA',devries:'DEV',sargeant:'SAR',hulkenberg:'HUL',lawson:'LAW',antonelli:'ANT',doohan:'DOO',hadjar:'HAD',bearman:'BEA',bortoleto:'BOR',colapinto:'COL',drugovich:'DRU',pourchaire:'POU',iwasa:'IWA',vandoorne:'VAN',fittipaldi:'FIT'};
function assignDriverCodes(s){
  const used=new Set();
  for(const d of s.drivers){
    let code=d.code||DRIVER_CODES[d.id]||d.name.split(' ').at(-1).replace(/[^a-z]/gi,'').slice(0,3).toUpperCase().padEnd(3,'X');
    if(!/^[A-Z]{3}$/.test(code))code='DRV';
    if(used.has(code)){const base=code.slice(0,2);let i=0;while(i<26&&used.has(base+String.fromCharCode(65+i)))i++;if(i<26)code=base+String.fromCharCode(65+i);else{let n=0;do{code=String.fromCharCode(65+Math.floor(n/676)%26,65+Math.floor(n/26)%26,65+n%26);n++;}while(used.has(code));}}
    d.code=code;used.add(code);
  }
}
function setDriverCode(s,id,value){
  const d=driverOf(s,id),code=String(value).trim().toUpperCase();
  requireCondition(d?.teamId===s.player.teamId,'只能修改本队车手缩写');
  requireCondition(/^[A-Z]{3}$/.test(code),'缩写必须是三个英文字母');
  requireCondition(!s.drivers.some(x=>x.id!==id&&x.code===code),'该缩写已被其他车手使用');
  d.code=code;return '车手缩写已更新';
}

return {DRIVER_CODES, assignDriverCodes, setDriverCode};
}());

// ===== 文件: js/data/tracks.js =====
modules['js/data/tracks.js'] = (function () {
// ===== 文件: js/data/tracks.js =====
// 长度/圈数取通常完整赛程；基准圈速、气象与策略系数是游戏化参数。
const raw = [ ['bahrain','巴林','巴林','Sakhir',5.412,57,15,92,1.3,.35,22,80,420,3,31,.06,.25,'traction','重刹与后轮牵引，夜间赛温度逐渐下降。'], ['saudi','沙特阿拉伯','沙特阿拉伯','Jeddah',6.174,50,27,91,0.8,.4,23,80,450,3,30,.05,.65,'fast','高速街道，墙边容错小，安全车概率较高。'], ['australia','澳大利亚','澳大利亚','Melbourne',5.278,58,14,81,1,.4,22,80,430,4,28,.25,.55,'fast','高速变向和路肩，轮胎温度需要管理。'], ['imola','艾米利亚-罗马涅','意大利','Imola',4.909,63,19,78,1,.78,27,80,550,1,28,.3,.45,'downforce','狭窄而难超车，进站损失大，强调排位。'], ['miami','迈阿密','美国','Miami',5.412,57,19,90,1.1,.48,21,80,410,3,38,.2,.4,'traction','炎热路面与低速组合弯，冷却和牵引关键。'], ['spain','西班牙','西班牙','Barcelona',4.657,66,14,79,1.5,.55,23,80,450,2,36,.15,.25,'downforce','高速长弯持续压迫轮胎，气动效率与耐久并重。'], ['monaco','摩纳哥','摩纳哥','Monte Carlo',3.337,78,19,75,.6,.98,20,60,310,1,27,.2,.75,'street','几乎无法超车，设定、排位与进站窗口决定比赛。'], ['azerbaijan','阿塞拜疆','阿塞拜疆','Baku',6.003,51,20,104,.75,.3,22,80,440,2,29,.1,.65,'low','超长直道与古城窄弯，低阻和制动同样重要。'], ['canada','加拿大','加拿大','Montreal',4.361,70,14,75,1,.38,19,80,360,3,26,.32,.6,'traction','重刹、路肩和墙边出口，制动系统压力大。'], ['britain','英国','英国','Silverstone',5.891,52,18,89,1.4,.45,23,80,460,2,26,.4,.35,'downforce','高速弯链与侧向载荷，风雨变化常影响策略。'], ['austria','奥地利','奥地利','Spielberg',4.318,71,10,68,1.1,.28,20,80,400,3,30,.32,.4,'fast','短圈、海拔与严格赛道限制，交通密集。'], ['france','法国','法国','Le Castellet',5.842,53,15,95,1.25,.48,24,80,460,2,39,.08,.2,'downforce','长直道和高速弯相连，前胎温度不容忽视。'], ['hungary','匈牙利','匈牙利','Budapest',4.381,70,14,82,1.2,.85,21,80,410,2,37,.25,.25,'downforce','连续中低速弯，高下压力；脏空气损失明显。'], ['belgium','比利时','比利时','Spa-Francorchamps',7.004,44,19,108,1.2,.3,23,80,470,2,23,.5,.5,'fast','单圈最长，气候多变，高速与低阻需要折中。'], ['netherlands','荷兰','荷兰','Zandvoort',4.259,72,14,75,1.3,.85,21,60,340,2,27,.35,.5,'downforce','倾斜弯与狭窄赛道，前轮负荷高。'], ['italy','意大利','意大利','Monza',5.793,53,11,83,.8,.22,24,80,470,2,31,.2,.35,'low','低下压力与长直道，DRS 和刹车效率突出。'], ['singapore','新加坡','新加坡','Singapore',4.94,62,19,97,1.15,.8,28,60,410,3,34,.4,.8,'street','闷热夜赛，慢弯频繁，安全车可能改写局面。'], ['japan','日本','日本','Suzuka',5.807,53,18,91,1.4,.65,23,80,460,2,27,.45,.4,'downforce','高速 S 弯，前轴响应、节奏与轮胎管理关键。'], ['usa','美国','美国','Austin',5.513,56,20,98,1.35,.4,22,80,420,2,33,.25,.4,'downforce','颠簸和连续变向，综合性能考验。'], ['mexico','墨西哥','墨西哥','Mexico City',4.304,71,17,79,.85,.45,22,80,430,3,32,.18,.45,'traction','高海拔冷却困难，低速抓地与动力部署重要。'], ['brazil','圣保罗','巴西','São Paulo',4.309,71,15,74,1.15,.25,21,80,410,2,29,.45,.6,'traction','短圈、起伏和常见阵雨，安全车窗口价值高。'], ['abudhabi','阿布扎比','阿联酋','Yas Island',5.281,58,16,89,.9,.4,22,80,420,2,30,.04,.25,'traction','黄昏到夜间，长直道与中低速弯相连。'], ['qatar','卡塔尔','卡塔尔','Lusail',5.419,57,16,85,1.5,.55,25,80,500,1,35,.06,.25,'downforce','高速长弯和高胎压负荷，轮胎过热风险大。'], ['vegas','拉斯维加斯','美国','Las Vegas',6.201,50,17,96,.65,.25,22,80,430,2,16,.08,.65,'low','低温夜赛与超长直道，暖胎困难。'], ['china','中国','中国','Shanghai',5.451,56,16,94,1.25,.38,23,80,460,2,25,.35,.35,'traction','大半径弯加超长后直道，左前胎和牵引力关键。'] ];
const TRACKS = Object.fromEntries(raw.map(([id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes])=>[id,{
  id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes
}]));
const SCHEDULES = {
  2022:'bahrain:03-20 saudi:03-27 australia:04-10 imola:04-24 miami:05-08 spain:05-22 monaco:05-29 azerbaijan:06-12 canada:06-19 britain:07-03 austria:07-10 france:07-24 hungary:07-31 belgium:08-28 netherlands:09-04 italy:09-11 singapore:10-02 japan:10-09 usa:10-23 mexico:10-30 brazil:11-13 abudhabi:11-20', 2023:'bahrain:03-05 saudi:03-19 australia:04-02 azerbaijan:04-30 miami:05-07 monaco:05-28 spain:06-04 canada:06-18 austria:07-02 britain:07-09 hungary:07-23 belgium:07-30 netherlands:08-27 italy:09-03 singapore:09-17 japan:09-24 qatar:10-08 usa:10-22 mexico:10-29 brazil:11-05 vegas:11-18 abudhabi:11-26', 2024:'bahrain:03-02 saudi:03-09 australia:03-24 japan:04-07 china:04-21 miami:05-05 imola:05-19 monaco:05-26 canada:06-09 spain:06-23 austria:06-30 britain:07-07 hungary:07-21 belgium:07-28 netherlands:08-25 italy:09-01 azerbaijan:09-15 singapore:09-22 usa:10-20 mexico:10-27 brazil:11-03 vegas:11-23 qatar:12-01 abudhabi:12-08', 2025:'australia:03-16 china:03-23 japan:04-06 bahrain:04-13 saudi:04-20 miami:05-04 imola:05-18 monaco:05-25 spain:06-01 canada:06-15 austria:06-29 britain:07-06 belgium:07-27 hungary:08-03 netherlands:08-31 italy:09-07 azerbaijan:09-21 singapore:10-05 usa:10-19 mexico:10-26 brazil:11-09 vegas:11-22 qatar:11-30 abudhabi:12-07'
};
const SPRINTS = {
  2022:['imola','austria','brazil'],2023:['azerbaijan','austria','belgium','qatar','usa','brazil'],2024:['china','miami','austria','usa','brazil','qatar'],2025:['china','miami','belgium','usa','brazil','qatar']
};
function trackForYear(id,year) {
  const t={
    ...TRACKS[id]
  };
  if(id==='spain'&&year===2022) {
    t.length=4.675;
    t.corners=16;
    t.baseTime=82;
  }
  if(id==='singapore'&&year===2022) {
    t.length=5.063;
    t.laps=61;
    t.corners=23;
    t.baseTime=103;
    t.drs=3;
  }
  if(id==='singapore'&&year>=2024)t.drs=4;
  if(id==='australia'&&year===2022)t.drs=3;
  return t;
}

return {TRACKS, SCHEDULES, SPRINTS, trackForYear};
}());

// ===== 文件: js/core/rules.js =====
modules['js/core/rules.js'] = (function () {
// ===== 文件: js/core/rules.js =====
const {
  news, clamp
} = modules['js/core/helpers.js'];
const RACE_POINTS=[25,18,15,12,10,8,6,4,2,1];
const SPRINT_POINTS=[8,7,6,5,4,3,2,1];
function seasonRules(year) {
  return {
    fastestLap:year<=2024,cap:year===2022?140:135,sprintFormat:year===2022?'2022':year===2023?'2023':'2024',major:year===2026,monacoStops:year>=2025?2:0
  };
}
function sessionsFor(year,sprint) {
  if(!sprint)return ['FP1','FP2','FP3','Q','RACE'];
  if(year===2022)return ['FP1','Q','FP2','SPRINT','RACE'];
  if(year===2023)return ['FP1','Q','SQ','SPRINT','RACE'];
  return ['FP1','SQ','SPRINT','Q','RACE'];
}
function eliminationSize(count) {
  return Math.max(1,Math.floor((count-10)/2));
}
function penalty(s,car,seconds,reason) {
  car.penalty+=seconds;
  const record={
    lap:s.race.lap,driver:car.driverId,seconds,reason
  };
  s.race.penalties.push(record);
  s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：${reason}${seconds>0?'，罚时 '+seconds+' 秒':''}`,type:'penalty'
  });
}
function trackLimits(s,car) {
  car.warnings++;
  if(car.warnings===3)s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：赛道限制黑白旗（三次警告）`,type:'warning'
  });
  if(car.warnings>=4)penalty(s,car,car.warnings===4?5:10,'多次超出赛道限制');
}
function checkBudget(s,t) {
  const f=s.finance[t.id];
  const excess=f.capUsed-f.capLimit;
  const severe=excess>f.capLimit*.1;
  if(excess<=0||f.audited&&(!severe||f.disqualified))return;
  f.audited=true;
  const hard=s.settings.difficulty==='hard';
  const fine=Math.max(1,excess*(hard?1.8:1.2));
  f.cash-=fine;
  f.ledger.unshift({
    day:s.calendar.day,label:'预算帽调查罚款',amount:-fine,cap:false
  });
  t.wind.limit*=0.85;
  t.cfd.limit*=0.85;
  t.confidence=clamp(t.confidence-12);
  if(severe) {
    t.points=0;
    f.disqualified=true;
    for(const r of t.results)r.points=0;
    for(const d of s.drivers){for(const r of d.results)if(r.teamId===t.id)r.points=0;d.points=d.results.reduce((sum,r)=>sum+r.points,0);}
    for(const race of s.history.races)if(!race.year||race.year===s.season.year)for(const r of race.rows)if(r.teamId===t.id)r.points=0;
    for(const e of s.calendar.events)if(e.result)for(const r of e.result.rows)if(r.teamId===t.id)r.points=0;
    if(s.race?.result)for(const r of s.race.result.rows)if(r.teamId===t.id)r.points=0;
  }
  news(s,`${t.name} 预算帽超支 $${excess.toFixed(2)}m，罚款 $${fine.toFixed(2)}m、测试额度削减 15%${f.disqualified?'，并取消本季积分资格':''}`,'warning');
}
function pitLanePenalty(s,car,reason){
  const t=s.teams.find(t=>t.id===car.teamId);
  if(!t.pitLaneNext)t.pitLaneNext=[false,false];
  t.pitLaneNext[car.slot]=true;
  s.race.penalties.push({lap:s.race.lap,driver:car.driverId,seconds:0,reason:reason+'，下场正赛维修区起步'});
  s.race.events.unshift({lap:s.race.lap,text:car.name+'：'+reason+'，下场正赛维修区起步',type:'penalty'});
}

return {RACE_POINTS, SPRINT_POINTS, seasonRules, sessionsFor, eliminationSize, penalty, trackLimits, checkBudget, pitLanePenalty};
}());

// ===== 文件: js/data/sponsors.js =====
modules['js/data/sponsors.js'] = (function () {
// ===== 文件: js/data/sponsors.js =====
// 赞助商均为虚构品牌；金额单位：百万美元。
const SPONSORS = [ {
  id:'apex',name:'APEX 科技',kind:'主赞助',min:75,base:15,goal:'podium',bonus:2
}, {
  id:'orbit',name:'ORBIT 云计算',kind:'主赞助',min:55,base:11,goal:'points',bonus:0.7
}, {
  id:'nova',name:'NOVA 能源',kind:'主赞助',min:0,base:8,goal:'finish',bonus:0.15
}, {
  id:'vector',name:'VECTOR 工程',kind:'技术伙伴',min:0,base:3,goal:'q3',bonus:0.5
}, {
  id:'pulse',name:'PULSE 通讯',kind:'技术伙伴',min:55,base:4,goal:'points',bonus:0.5
}, {
  id:'zenith',name:'ZENITH 精密',kind:'技术伙伴',min:70,base:5,goal:'win',bonus:3
}, {
  id:'arc',name:'ARC 出行',kind:'技术伙伴',min:0,base:2.5,goal:'finish',bonus:0.12
} ];
const SPONSOR_GOALS = {
  podium:'正赛登上领奖台',points:'正赛获得积分',finish:'正赛至少一车完赛',q3:'进入 Q3',win:'赢得正赛'
};

return {SPONSORS, SPONSOR_GOALS};
}());

// ===== 文件: js/core/finance.js =====
modules['js/core/finance.js'] = (function () {
// ===== 文件: js/core/finance.js =====
const {
  SUPPLIERS
} = modules['js/data/teams.js'];
const {
  SPONSORS
} = modules['js/data/sponsors.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  clamp, news, teamOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  checkBudget
} = modules['js/core/rules.js'];
function initFinance(s,t,cash) {
  s.finance[t.id]={
    cash,capUsed:0,capLimit:s.season.rules.cap*DIFFICULTIES[s.settings.difficulty].cap,ledger:[],sponsors:[],audited:false,disqualified:false,rescue:false
  };
}
function spend(s,t,amount,label,cap=true,forced=false) {
  const f=s.finance[t.id];
  requireCondition(Number.isFinite(amount)&&amount>=0,'支出金额无效');
  requireCondition(forced||f.cash>=amount,'现金不足');
  f.cash-=amount;
  if(cap)f.capUsed+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount:-amount,cap
  });
  f.ledger.length=Math.min(f.ledger.length,160);
  return amount;
}
function income(s,t,amount,label) {
  const f=s.finance[t.id];
  f.cash+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount,cap:false
  });
  f.ledger.length=Math.min(f.ledger.length,160);
}
function signSponsor(s,id,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),f=s.finance[t.id],sp=SPONSORS.find(x=>x.id===id);
  requireCondition(sp,'赞助商不存在');
  requireCondition(t.reputation>=sp.min,'声望尚未达到签约要求');
  requireCondition(!f.sponsors.some(x=>x.id===id),'已签约该赞助商');
  requireCondition(f.sponsors.filter(x=>x.kind===sp.kind).length<(sp.kind==='主赞助'?1:3),'该类型赞助席位已满');
  const boost=1+t.facilities.marketing.level*.03+(s.staff.some(x=>x.teamId===t.id&&x.trait==='money')?.08:0);
  const contract={
    ...sp,annual:sp.base*boost,paid:0
  };
  f.sponsors.push(contract);
  if(t.id===s.player.teamId||s.calendar.day>0)news(s,`${t.name} 与 ${sp.name} 签约，年收入 $${contract.annual.toFixed(2)}m`);
}
function dailyFinance(s,days) {
  for(const t of s.teams) {
    const payroll=s.drivers.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.contract.salary,0)+s.staff.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.salary,0);
    spend(s,t,(payroll+12+t.facilities.factory.level*1.2+(t.type==='customer'?(SUPPLIERS[t.supplier]?.price||12):9))*days/365,'薪资与工厂运营',true,true);
    for(const sp of s.finance[t.id].sponsors) {
      const amount=sp.annual*days/365;
      sp.paid+=amount;
      income(s,t,amount,sp.name+' 分期赞助');
    }
  }
}
function raceIncome(s,result) {
  for(const t of s.teams) {
    const own=result.rows.filter(r=>r.teamId===t.id);
    for(const row of own.filter(x=>x.points>0)) {
      const driver=s.drivers.find(d=>d.id===row.driverId);
      spend(s,t,driver.contract.bonus,'车手积分绩效奖金',true,true);
    }
    income(s,t,.3+t.reputation*.006+s.drivers.filter(d=>d.teamId===t.id&&d.star).length*.15,'周边与赛事分成');
    for(const sp of s.finance[t.id].sponsors) {
      let ok=false;
      if(sp.goal==='podium')ok=own.some(r=>r.position<=3&&r.classified);
      if(sp.goal==='points')ok=own.some(r=>r.points>0);
      if(sp.goal==='finish')ok=own.some(r=>!r.retired);
      if(sp.goal==='q3')ok=s.calendar.weekend.q3.some(id=>t.drivers.includes(id));
      if(sp.goal==='win')ok=own.some(r=>r.position===1&&r.classified);
      if(ok)income(s,t,sp.bonus,sp.name+' 达标奖金');
    }
    checkBudget(s,t);
    if(s.finance[t.id].cash<0&&t.id===s.player.teamId) {
      s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
      news(s,s.season.gameOver,'danger');
    }
  }
}
function emergency(s) {
  mutable(s);
  const t=teamOf(s),f=s.finance[t.id];
  requireCondition(!f.rescue,'本季董事会援助已使用');
  requireCondition(f.cash<20,'仅现金低于 $20m 时可申请');
  f.rescue=true;
  t.confidence=clamp(t.confidence-15);
  t.reputation=clamp(t.reputation-5);
  income(s,t,15,'董事会紧急注资');
  news(s,'董事会注资 $15m，信心 -15、声望 -5','warning');
}

return {initFinance, spend, income, signSponsor, dailyFinance, raceIncome, emergency};
}());

// ===== 文件: js/data/staff-data.js =====
modules['js/data/staff-data.js'] = (function () {
// ===== 文件: js/data/staff-data.js =====
const ROLES = {
  principal:'车队领队',technical:'技术总监',aero:'空气动力主管',performance:'性能主管',reliability:'可靠性主管',engineer:'比赛工程师',analyst:'性能工程师',strategy:'策略主管',mechanics:'维修区机械师',sporting:'运动总监',academy:'青训主管',marketing:'市场赞助主管'
};
const TRAITS = {
  pit:{
    name:'进站大师',description:'停站时间减少 0.15 秒'
  },aggressive:{
    name:'激进研发',description:'研发速度 +10%，失败风险 +5%'
  },tyre:{
    name:'轮胎低语者',description:'轮胎磨损 -5%'
  },money:{
    name:'摇钱树',description:'赞助收入 +8%'
  },calm:{
    name:'沉稳',description:'车手失误概率 -10%'
  },mentor:{
    name:'育成专家',description:'青训成长 +20%'
  },precise:{
    name:'数据专家',description:'练习采集误差 -15%'
  }
};
// 虚构员工，避免对真实工程师合同与能力作伪精确推断。
const names=['林远','Elias Weber','Sofia Rossi','陈翊','Amelia Clarke','Hugo Martin','Marco Bellini','Anna Fischer','Lucas Moreau','松田 凛','James Reed','Eva Laurent','Noah Silva','周宁','Luca Bianchi','Mia Evans','Daniel König','Oliver Walsh','Elena Costa','Leo Park','高桥 悠','Isabel Santos','Max Keller','许知行'];
const STAFF_POOL = names.map((name,i)=>({
  id:'market-'+i,name,role:Object.keys(ROLES)[i%12],ability:65+(i*7)%31,trait:Object.keys(TRAITS)[i%7],salary:0.45+(i*7%31)*0.045,loyalty:55+i%30,morale:75,years:2
}));

return {ROLES, TRAITS, STAFF_POOL};
}());

// ===== 文件: js/core/staff.js =====
modules['js/core/staff.js'] = (function () {
// ===== 文件: js/core/staff.js =====
const {
  ROLES, TRAITS, STAFF_POOL
} = modules['js/data/staff-data.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  uid, clamp, news, teamOf, requireCondition, rosterMutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
function staffAbility(s,teamId,role) {
  const group=s.staff.filter(x=>x.teamId===teamId&&x.role===role);
  return group.length?group.reduce((a,x)=>a+x.ability*(.8+x.morale*.002),0)/group.length:45;
}
function seedStaff(s,t) {
  for(const [i,role]of Object.keys(ROLES).entries())s.staff.push({
    id:uid(s,'staff'),name:STAFF_POOL[(i+t.logo)%STAFF_POOL.length].name,role,teamId:t.id,ability:clamp(t.performance+between(s,-10,2),50,95),trait:Object.keys(TRAITS)[i%7],salary:.45+(t.performance-60)*.035,years:2,morale:78,loyalty:between(s,55,90)
  });
}
function hireStaff(s,id,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),candidate=s.staff.find(x=>x.id===id);
  requireCondition(candidate&&candidate.teamId!==t.id,'员工不可签约');
  requireCondition(Number.isFinite(salary)&&salary>=.1&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const occupied=s.staff.filter(x=>x.teamId===t.id&&x.role===candidate.role).length;
  requireCondition(occupied<2,'同一岗位最多两位员工，请先解约');
  const willing=clamp(.35+(salary/candidate.salary-1)*.55+(t.reputation-candidate.ability)*.012, .08,.98);
  if(!chance(s,willing)) {
    news(s,`${candidate.name} 拒绝了报价；提高薪资或提升车队声望后可再次谈判`,'warning');
    return '谈判未达成';
  }
  const fee=candidate.teamId?candidate.salary*candidate.years*.6:0;
  spend(s,t,fee,'员工签约违约金',true);
  if(candidate.teamId)income(s,teamOf(s,candidate.teamId),fee,'员工转会补偿');
  Object.assign(candidate,{
    teamId:t.id,salary,years,morale:85,loyalty:65
  });
  news(s,`${candidate.name} 加盟 ${t.name}，担任${ROLES[candidate.role]}`);
  return '签约成功';
}
function renewStaff(s,id,salary,years) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  requireCondition(Number.isFinite(salary)&&salary>=e.salary*.95&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价需至少为原薪资的 95%，年限 1—5 年');
  e.salary=salary;
  e.years=years;
  e.morale=clamp(e.morale+7);
  e.loyalty=clamp(e.loyalty+10);
  return '员工已续约';
}
function fireStaff(s,id) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  spend(s,teamOf(s),e.salary*e.years*.5,'员工解约补偿',true);
  e.teamId=null;
  e.morale=55;
  return '员工合同已解除';
}
function staffEvents(s) {
  for(const e of s.staff.filter(x=>x.teamId)) {
    e.morale=clamp(e.morale+between(s,-2,2));
    if(e.loyalty<65&&chance(s,.003)) {
      const buyer=choose(s,s.teams.filter(t=>t.id!==e.teamId));
      if(s.finance[buyer.id].cash>e.salary*3) {
        const old=teamOf(s,e.teamId);
        spend(s,buyer,e.salary,'员工挖角补偿',true);
        income(s,old,e.salary,'员工离职补偿');
        e.teamId=buyer.id;
        e.salary*=1.2;
        e.loyalty=80;
        news(s,`${e.name} 接受 ${buyer.name} 报价，离开 ${old.name}`,'warning');
      }
    }
  }
}

return {staffAbility, seedStaff, hireStaff, renewStaff, fireStaff, staffEvents};
}());

// ===== 文件: js/core/rnd.js =====
modules['js/core/rnd.js'] = (function () {
// ===== 文件: js/core/rnd.js =====
const {
  PARTS, FACILITIES
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  chance
} = modules['js/core/rng.js'];
const {
  uid, clamp, news, teamOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
function projectQuote(s,t,part,kind='development',copies=2) {
  const p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  const level=Math.max(...s.parts[t.id].cars.map(c=>c[part].level),...t.projects.filter(x=>x.part===part).map(x=>x.level),1)+1;
  const aero=p.department==='aero';
  const feedback=t.drivers.reduce((a,id)=>a+s.drivers.find(d=>d.id===id).attributes.feedback,0)/200;
  const aggressive=s.staff.some(x=>x.teamId===t.id&&x.trait==='aggressive');
  const efficiency=(.65+(staffAbility(s,t.id,'technical')*.55+staffAbility(s,t.id,'aero')*.25+staffAbility(s,t.id,'performance')*.2)/180)*(1+t.departments[p.department].level*.07)*(aero?1+(t.facilities.wind.level+t.facilities.cfd.level)*.025:1)*(1+feedback*.12)*(aggressive?1.1:1);
  return {
    level,cost:p.cost*(1+level*.12)*(kind==='research'?1.1:1),days:Math.ceil(p.days*(1+level*.05)/efficiency),gain:2.2/(1+level*.08),wind:aero?18+level*2:0,cfd:aero?24+level*2:0,risk:clamp(.04+level*.008+(aggressive?.05:0)-(staffAbility(s,t.id,'reliability')-60)*.001,.015,.25),manufacturing:p.cost*.22*copies
  };
}
function startProject(s,part,kind='development',copies=2,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  requireCondition(['development','research'].includes(kind)&&[1,2].includes(copies),'研发参数无效');
  requireCondition(!(t.type==='customer'&&p.department==='power'),'客户车队不能自主改进动力单元，请依靠供应商');
  requireCondition(!(s.season.year>=2026&&part==='mguh'),'新规赛季不再允许 MGU-H 研发');
  requireCondition(kind!=='research'||s.calendar.round>=Math.floor(s.calendar.events.length*.55),'下赛季研究在赛季过半后开放');
  requireCondition(t.projects.filter(p=>p.status==='researching').length<2+Math.floor(t.facilities.cfd.level/3),'研发槽位已满');
  requireCondition(!t.projects.some(x=>x.part===part&&x.kind===kind&&x.status==='researching'),'相同项目已在进行');
  const q=projectQuote(s,t,part,kind,copies);
  requireCondition(t.wind.used+q.wind<=t.wind.limit&&t.cfd.used+q.cfd<=t.cfd.limit,'风洞或 CFD 额度不足');
  spend(s,t,q.cost+q.manufacturing,`${p.name} ${kind==='research'?'下季研究':'研发与制造预付'}`,true);
  t.wind.used+=q.wind;
  t.cfd.used+=q.cfd;
  const item={
    id:uid(s,'project'),part,kind,copies,...q,remaining:q.days,progress:0,status:'researching',boosted:false,safer:false
  };
  t.projects.push(item);
  news(s,`${t.name} 启动${p.name}${kind==='research'?'下季研究':'升级'}，预计 ${q.days} 天`);
  return '研发项目已立项';
}
function changeProject(s,id,operation) {
  mutable(s);
  const t=teamOf(s),p=t.projects.find(x=>x.id===id&&x.status==='researching');
  requireCondition(p,'项目不在研发阶段');
  if(operation==='cancel') {
    p.status='cancelled';
    income(s,t,p.manufacturing,'取消项目退还制造预付');
    return '项目已叫停，研发成本不退，制造预付已退回';
  }
  if(operation==='boost') {
    requireCondition(!p.boosted,'已追加过投入');
    spend(s,t,p.cost*.3,'研发追加投入',true);
    p.remaining*=.7;
    p.risk=clamp(p.risk+.025,0,1);
    p.boosted=true;
    return '工期缩短 30%，失败风险上升';
  }
  requireCondition(operation==='safe'&&!p.safer,'已执行风险审查或操作无效');
  spend(s,t,p.cost*.15,'研发风险审查',true);
  p.risk*=.45;
  p.remaining*=1.15;
  p.safer=true;
  return '失败风险降低，剩余工期增加 15%';
}
function upgradeFacility(s,id) {
  mutable(s);
  const t=teamOf(s),f=t.facilities[id],def=FACILITIES[id];
  requireCondition(f&&def,'设施不存在');
  requireCondition(!f.building&&f.level<6,'设施已在建或达到 6 级');
  spend(s,t,def.cost*(1+f.level*.6),def.name+' 建设投资',false);
  f.building={
    remaining:def.days+f.level*5,total:def.days+f.level*5
  };
  return '设施建设启动（不计入预算帽）';
}
function upgradeDepartment(s,id) {
  mutable(s);
  const t=teamOf(s),d=t.departments[id];
  requireCondition(d&&d.level<6,'部门已达上限或不存在');
  spend(s,t,2+d.level,'部门扩编',true);
  d.level++;
  d.people+=8;
  return '部门等级与人数已提升';
}
function advanceRND(s,days) {
  for(let day=0; day<days; day++)advanceOneRND(s,1);
}
function advanceOneRND(s,days) {
  for(const t of s.teams) {
    for(const f of Object.values(t.facilities)) {
      if(f.building) {
        f.building.remaining-=days;
        if(f.building.remaining<=0) {
          f.level++;
          f.building=null;
          news(s,`${t.name} 的设施升级至 ${f.level} 级`);
        }
      }
    }
    const speed=t.id===s.player.teamId?1:DIFFICULTIES[s.settings.difficulty].ai;
    for(const p of t.projects.filter(x=>x.status==='researching')) {
      p.remaining-=days*speed;
      p.progress=clamp(100*(1-p.remaining/p.days));
      if(p.remaining>0)continue;
      if(chance(s,p.risk)) {
        p.status='failed';
        income(s,t,p.manufacturing,'失败项目退还制造预付');
        news(s,`${t.name} 的${PARTS.find(x=>x.id===p.part).name}研发失败`,'warning');
        continue;
      }
      p.status='complete';
      if(p.kind==='research') {
        const dimension=PARTS.find(x=>x.id===p.part).dimension;
        t.research[dimension]=(t.research[dimension]||0)+p.gain;
        news(s,`${t.name} 下赛季研究完成，技术储备增加`);
      }
      else{
        for(let i=0; i<p.copies; i++)s.parts[t.id].production.push({
          id:uid(s,'unit'),part:p.part,level:p.level,gain:p.gain,risk:p.part==='cooling'?0:p.risk*3,remaining:Math.ceil(5/(1+t.facilities.factory.level*.18+t.departments.manufacturing.level*.08))
        });
        news(s,`${t.name} 研发完成，${p.copies} 套部件进入制造队列`);
      }
    }
    const q=s.parts[t.id].production,capacity=factoryCapacity(t);
    let budget=days*capacity;
    for(const item of q) {
      if(budget<=0)break;
      const use=Math.min(item.remaining,budget);
      item.remaining-=use;
      budget-=use;
    }
    for(const item of q.filter(x=>x.remaining<=0)) {
      s.parts[t.id].stock.push(item);
      news(s,`${t.name} 新规格零件生产完成，可分配装车`);
    }
    s.parts[t.id].production=q.filter(x=>x.remaining>0);
  }
}
function factoryCapacity(t) {
  return 1+Math.floor(t.facilities.factory.level/2)+Math.floor(t.departments.manufacturing.level/3);
}
function projectCapacity(t) {
  return 2+Math.floor(t.facilities.cfd.level/3);
}
function researchUnlocked(s) {
  return s.calendar.round>=Math.floor(s.calendar.events.length*.55);
}
function facilityCost(t,id) {
  return FACILITIES[id].cost*(1+t.facilities[id].level*.6);
}
function departmentCost(t,id) {
  return 2+t.departments[id].level;
}
function overrunTesting(s) {
  mutable(s);
  const t=teamOf(s);
  requireCondition(!t.wind.overrun,'本季超额试验已被处罚，不能再次申请');
  spend(s,t,5,'空气动力超额试验罚款',false);
  t.wind.limit+=45;
  t.cfd.limit+=60;
  t.wind.overrun=true;
  t.confidence=clamp(t.confidence-10);
  news(s,`${t.name} 违规增加风洞 / CFD 测试，被罚 $5m，董事会信心 -10`,'warning');
  return '违规试验额度已增加，同时已执行罚款与董事会处罚';
}

return {projectQuote, startProject, changeProject, upgradeFacility, upgradeDepartment, advanceRND, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost, overrunTesting};
}());

// ===== 文件: js/data/drivers-data.js =====
modules['js/data/drivers-data.js'] = (function () {
// ===== 文件: js/data/drivers-data.js =====
// 所有能力、薪资、潜力均为非官方游戏化平衡值；年龄按赛季年减出生年。
const ATTRS = {
  pace:'总体速度',qualifying:'单圈速度',racePace:'正赛节奏',racecraft:'超车',defending:'防守',tyres:'轮胎管理',wet:'湿地能力',starts:'起步',consistency:'稳定性',feedback:'研发反馈',fitness:'体能',aggression:'攻击性',experience:'经验',potential:'潜力'
};
const rows = [ ['verstappen','Max Verstappen',1,'荷兰',1997,95,98,94,18], ['perez','Sergio Pérez',11,'墨西哥',1990,86,88,87,9], ['leclerc','Charles Leclerc',16,'摩纳哥',1997,92,97,94,13], ['sainz','Carlos Sainz',55,'西班牙',1994,89,91,91,10], ['hamilton','Lewis Hamilton',44,'英国',1985,93,94,94,20], ['russell','George Russell',63,'英国',1998,90,94,94,11], ['norris','Lando Norris',4,'英国',1999,91,94,96,12], ['ricciardo','Daniel Ricciardo',3,'澳大利亚',1989,83,86,86,7], ['alonso','Fernando Alonso',14,'西班牙',1981,91,91,92,14], ['ocon','Esteban Ocon',31,'法国',1996,84,86,88,6], ['gasly','Pierre Gasly',10,'法国',1996,85,88,89,7], ['tsunoda','Yuki Tsunoda',22,'日本',2000,81,86,88,3], ['vettel','Sebastian Vettel',5,'德国',1987,86,87,87,12], ['stroll','Lance Stroll',18,'加拿大',1998,78,79,81,4], ['albon','Alexander Albon',23,'泰国',1996,84,89,89,5], ['latifi','Nicholas Latifi',6,'加拿大',1995,69,72,73,1.5], ['bottas','Valtteri Bottas',77,'芬兰',1989,85,90,87,8], ['zhou','Zhou Guanyu',24,'中国',1999,76,79,83,2], ['magnussen','Kevin Magnussen',20,'丹麦',1992,81,85,83,4], ['schumacher','Mick Schumacher',47,'德国',1999,74,77,84,2], ['piastri','Oscar Piastri',81,'澳大利亚',2001,85,89,97,6], ['devries','Nyck de Vries',21,'荷兰',1995,72,75,80,1.5], ['sargeant','Logan Sargeant',2,'美国',2000,71,74,80,1], ['hulkenberg','Nico Hülkenberg',27,'德国',1987,84,90,86,6], ['lawson','Liam Lawson',30,'新西兰',2002,77,81,89,2], ['antonelli','Kimi Antonelli',12,'意大利',2006,78,83,97,3], ['doohan','Jack Doohan',7,'澳大利亚',2003,73,77,87,1.5], ['hadjar','Isack Hadjar',6,'法国',2004,77,82,93,2], ['bearman','Oliver Bearman',87,'英国',2005,77,82,94,2], ['bortoleto','Gabriel Bortoleto',5,'巴西',2004,76,80,94,2], ['colapinto','Franco Colapinto',43,'阿根廷',2003,76,80,89,2], ['drugovich','Felipe Drugovich',34,'巴西',2000,75,78,87,1.5], ['pourchaire','Théo Pourchaire',98,'法国',2003,74,78,90,1.3], ['iwasa','Ayumu Iwasa',40,'日本',2001,73,77,88,1.2], ['vandoorne','Stoffel Vandoorne',42,'比利时',1992,77,80,81,2], ['fittipaldi','Pietro Fittipaldi',51,'巴西',1996,69,72,77,1] ];
const DRIVER_DATA = Object.fromEntries(rows.map(([id,name,number,nationality,birth,pace,qualifying,potential,salary],i)=>[id,{
  id,name,number,nationality,birth,salary,attributes:{
    pace,qualifying,racePace:pace+(i%3)-1,racecraft:Math.min(98,pace+2),defending:pace,tyres:Math.min(97,pace+3),wet:Math.max(60,pace+(i%5)-2),starts:pace-1,consistency:Math.min(98,pace+2),feedback:Math.min(97,pace+2),fitness:88-i%8,aggression:72+i%23,experience:Math.min(99,Math.max(10,(2025-birth-17)*4)),potential
  }
}]));
// 赛季初相对实力调整，避免把成熟期能力倒灌进新秀赛季。
const YEAR_ADJUSTMENTS = {
  2022:{
    piastri:-9,norris:-3,tsunoda:-5,albon:-2,hamilton:1
  },2023:{
    piastri:-5,norris:-1,alonso:1,tsunoda:-2,devries:0
  },2024:{
    piastri:2,norris:2,ricciardo:-2,perez:-3
  },2025:{
    piastri:7,norris:3,hamilton:-3,perez:-3,tsunoda:2,albon:2,gasly:1
  }
};
const RESERVES = {
  2022:['hulkenberg','piastri','vandoorne','fittipaldi'],2023:['ricciardo','lawson','drugovich','schumacher','pourchaire'],2024:['lawson','bearman','doohan','colapinto','drugovich','pourchaire'],2025:['perez','bottas','zhou','ricciardo','drugovich','colapinto','iwasa']
};

return {ATTRS, DRIVER_DATA, YEAR_ADJUSTMENTS, RESERVES};
}());

// ===== 文件: js/core/drivers.js =====
modules['js/core/drivers.js'] = (function () {
const { assignDriverCodes, DRIVER_CODES } = modules['js/core/driverCodes.js'];
// ===== 文件: js/core/drivers.js =====
const {
  DRIVER_DATA, YEAR_ADJUSTMENTS
} = modules['js/data/drivers-data.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  uid, clamp, copy, teamOf, driverOf, news, requireCondition, rosterMutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
function makeDriver(id,year) {
  const source=DRIVER_DATA[id];
  requireCondition(source,'车手数据不存在');
  const d=copy(source),delta=YEAR_ADJUSTMENTS[year]?.[id]||0;
  for(const k of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[k]=clamp(d.attributes[k]+delta,60,98);
  d.code=DRIVER_CODES[id];
  d.age=year-d.birth;
  d.attributes.experience=clamp((d.age-17)*4,10,99);
  Object.assign(d,{
    teamId:null,morale:80,fatigue:0,points:0,results:[],wins:0,fastest:0,star:d.attributes.pace>=90,contract:{
      salary:d.salary,years:2,bonus:.1,buyout:.65
    },plan:'balanced',academy:false,retired:false
  });
  return d;
}
function createCustomDriver(s,name,age,pace,number) {
  requireCondition(name.trim().length>=1&&name.length<=32,'车手名字需为 1—32 个字符');
  requireCondition(Number.isInteger(age)&&age>=18&&age<=45&&Number.isFinite(pace)&&pace>=60&&pace<=80,'自建车手年龄需 18—45，初始能力 60—80');
  const d=makeDriver('drugovich',s.season.year);
  d.id=uid(s,'custom-driver');
  d.name=name.trim();delete d.code;
  d.age=age;
  d.birth=s.season.year-age;
  d.number=number;
  d.nationality='自定义';
  for(const k of Object.keys(d.attributes))d.attributes[k]=pace;
  d.attributes.fitness=90;
  d.attributes.experience=clamp((age-17)*4,10,99);
  d.attributes.potential=Math.max(pace,age<25?92:84);
  d.contract.salary=1.3;
  d.star=false;
  s.drivers.push(d);assignDriverCodes(s);
  return d;
}
function freeReplacement(s,teamId,exclude) {
  return s.drivers.filter(d=>!d.teamId&&!d.academy&&!d.retired&&d.id!==exclude).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
}
function transferDriver(s,d,t,slot,salary,years) {
  const oldId=d.teamId;
  if(oldId) {
    const old=teamOf(s,oldId),seat=old.drivers.indexOf(d.id),replacement=freeReplacement(s,old.id,d.id);
    requireCondition(replacement,'对方车队无可用替补，转会暂时无法完成');
    old.drivers[seat]=replacement.id;
    replacement.teamId=old.id;
  }
  const outgoing=s.drivers.find(x=>x.id===t.drivers[slot]);
  if(outgoing)outgoing.teamId=null;
  t.drivers[slot]=d.id;
  d.teamId=t.id;
  d.academy=false;
  d.contract={
    salary,years,bonus:.1,buyout:.65
  };
  d.morale=85;
}
function signDriver(s,id,slot,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId!==t.id&&!d.retired,'该车手不可签约');
  requireCondition(!d.academy||d.academy===t.id,'只能提拔本队青训');
  requireCondition([0,1].includes(slot)&&Number.isFinite(salary)&&salary>=.1&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const outgoing=driverOf(s,t.drivers[slot]);
  const release=outgoing.contract.salary*outgoing.contract.years*.3;
  const fee=d.teamId?d.contract.salary*d.contract.years*d.contract.buyout:0;
  requireCondition(s.finance[t.id].cash>=release+fee,'现金不足以支付转会和解约补偿');
  const desire=.5+(salary/Math.max(.5,d.contract.salary)-1)*.4+(t.reputation-d.attributes.pace)*.012+t.facilities.marketing.level*.02;
  if(!chance(s,clamp(desire,.08,.98))) {
    news(s,`${d.name} 拒绝 ${t.name} 的报价，薪水与竞争力尚不足`,'warning');
    return '谈判未达成';
  }
  const old=d.teamId;
  spend(s,t,fee+release,'车手转会与席位解约',true);
  if(old)income(s,teamOf(s,old),fee,'车手转会补偿');
  transferDriver(s,d,t,slot,salary,years);
  news(s,`${d.name} 签约 ${t.name}，合同 ${years} 年`);
  return '签约成功';
}
function renewDriver(s,id,salary,years) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId,'只能续约本队车手');
  requireCondition(Number.isFinite(salary)&&salary>=d.contract.salary*.95&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价无效（最低原薪资 95%，年限 1—5 年）');
  d.contract.salary=salary;
  d.contract.years=years;
  d.morale=clamp(d.morale+8);
  return '车手续约成功';
}
function releaseDriver(s,id) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId===t.id,'只能解约本队车手');
  const reserve=freeReplacement(s,t.id,id);
  requireCondition(reserve,'没有可用替补，请先招募青训或签入车手');
  spend(s,t,d.contract.salary*d.contract.years*.5,'车手解约补偿',true);
  const slot=t.drivers.indexOf(id);
  t.drivers[slot]=reserve.id;
  reserve.teamId=t.id;
  d.teamId=null;
  return `合同解除，${reserve.name} 临时接替席位`;
}
function trainDriver(s,id,plan) {
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId||d.academy===s.player.teamId,'只能安排本队训练');
  requireCondition(['balanced','pace','tyres','wet','rest'].includes(plan),'训练项目无效');
  d.plan=plan;
  return '发展计划已更新';
}
function recruitYouth(s) {
  rosterMutable(s);
  const t=teamOf(s);
  requireCondition(s.drivers.filter(d=>d.academy===t.id).length<4,'青训最多 4 人');
  spend(s,t,1,'招募青训车手',true);
  const names=['Ren Sato','Alex Morgan','Gabriel Costa','陈星河','Luca Moretti','Émile Laurent'];
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'youth');
  d.name=choose(s,names)+' '+s.nextId;delete d.code;
  d.age=18;
  d.birth=s.season.year-18;
  d.academy=t.id;
  d.background=chance(s,.5)?'F2':'F3';
  for(const k of Object.keys(d.attributes))d.attributes[k]=between(s,61,76);
  d.attributes.potential=between(s,86,97);
  d.contract.salary=.3;
  s.drivers.push(d);assignDriverCodes(s);
  news(s,`${d.name} 从 ${d.background} 加入青训`);
  return '新青训车手已报到';
}
function sellYouth(s,id) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.academy===s.player.teamId,'不是本队青训车手');
  income(s,teamOf(s),Math.max(.5,(d.attributes.pace-55)*.2),'青训车手培养转让');
  d.academy=false;
  return '青训资产已出售，车手进入自由市场';
}
function developDrivers(s,days) {
  for(const d of s.drivers) {
    if(d.retired)continue;
    d.fatigue=clamp(d.fatigue-days*(d.plan==='rest'?2:1)*(.5+d.attributes.fitness*.005));
    const team=d.teamId||d.academy;
    if(!team)continue;
    const t=teamOf(s,team),academy=staffAbility(s,t.id,'academy');
    const young=d.age<27;
    const growth=young?Math.max(0,d.attributes.potential-d.attributes.pace)*days/18000*(1+academy/100)*(d.academy?1.5:1)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='mentor')?1.2:1):d.age>30?-(d.age-29)*days/24000:0;
    for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency','feedback'])d.attributes[key]=clamp(d.attributes[key]+growth,50,99);
    if(d.plan!=='balanced'&&d.plan!=='rest') {
      const cost=days*.008;
      if(s.finance[t.id].cash>cost) {
        spend(s,t,cost,'车手专项训练',true);
        const key=d.plan==='pace'?'qualifying':d.plan;
        d.attributes[key]=clamp(d.attributes[key]+days*(1+t.facilities.sim.level*.1)*.018,0,d.attributes.potential);
      }
    }
  }
}
function seedAIYouth(s,t){
  if(s.drivers.some(d=>d.academy===t.id&&!d.retired))return;
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'ai-youth');delete d.code;d.name=choose(s,['Matteo Riva','Evan Brooks','Haru Mori','Rafael Lima','林逸'])+' '+t.abbr;
  d.age=18;d.birth=s.season.year-18;d.academy=t.id;d.background='F2 / F3 虚构新秀';d.contract.salary=.4;
  for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[key]=between(s,68,77);
  d.attributes.potential=between(s,88,97);s.drivers.push(d);assignDriverCodes(s);
}

return {makeDriver, createCustomDriver, freeReplacement, transferDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth, developDrivers, seedAIYouth};
}());

// ===== 文件: js/core/ai.js =====
modules['js/core/ai.js'] = (function () {
// ===== 文件: js/core/ai.js =====
const {
  PARTS, partQuota
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  startProject
} = modules['js/core/rnd.js'];
const {
  chance, choose, between
} = modules['js/core/rng.js'];
const {
  transferDriver, freeReplacement, seedAIYouth
} = modules['js/core/drivers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  news
} = modules['js/core/helpers.js'];
function aiManagement(s) {
  for(const t of s.teams) {
    if(t.id===s.player.teamId)continue;
    seedAIYouth(s,t);
    const f=s.finance[t.id],spending=t.personality==='吝啬'?22:t.personality==='激进'?8:t.personality==='技术优先'?12:18;
    if(f.cash>spending&&t.projects.filter(p=>p.status==='researching').length<2) {
      const options=PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')&&!t.projects.some(x=>x.part===p.id&&x.status==='researching'));
      if(options.length) {
        const focused=options.filter(p=>t.personality==='技术优先'?p.department==='aero':t.personality==='稳健'?p.department==='reliability':false);
        const part=choose(s,focused.length?focused:options);
        try{
          startProject(s,part.id,s.calendar.round>s.calendar.events.length*.7&&chance(s,.5)?'research':'development',2,t.id);
        }
        catch(e) {
          if(!(e instanceof Error))throw e;
        }
      }
    }
    const store=s.parts[t.id];
    for(let i=store.stock.length-1; i>=0; i--) {
      const spec=store.stock[i];
      const slot=store.cars.findIndex(c=>c[spec.part].level<spec.level);
      if(slot>=0) {
        const c=store.cars[slot][spec.part];
        c.level=spec.level;
        c.gain=spec.gain;
        c.risk=spec.risk;
        store.stock.splice(i,1);
      }
    }
    for(const c of store.cars)for(const p of PARTS)if(c[p.id].wear>67&&f.cash>p.cost*.3) {
      spend(s,t,p.cost*.23,'AI 更换磨损部件',true);
      c[p.id].wear=0;
      c[p.id].used++;
      if(c[p.id].used>partQuota(p,s.season.year))t.gridPenalties[store.cars.indexOf(c)]+=10;
    }
  }
}
function aiRaceDecision(s,car,track) {
  const r=s.race,difficulty=DIFFICULTIES[s.settings.difficulty];
  const error=chance(s,s.settings.difficulty==='easy'?.2:s.settings.difficulty==='hard'?.015:.07);
  const remain=r.totalLaps-r.lap;
  const wet=r.wetness;
  const weatherTyre=wet>.7?'W':wet>.23?'I':null;
  const wrong=weatherTyre?car.compound!==weatherTyre:['I','W'].includes(car.compound);
  let pit=wrong&&!error&&remain>2;
  let target=weatherTyre||'H';
  const threshold=error?94:73+(difficulty.ai-1)*-10;
  if(car.tyreWear>threshold&&remain>4) {
    pit=true;
    if(!weatherTyre)target=remain<16?'S':remain<27?'M':'H';
  }
  if(!r.sprint&&!weatherTyre&&car.usedDry.length<2&&remain<=Math.max(5,Math.floor(r.totalLaps*.18))) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&car.stops<2&&remain<8) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(r.control!=='GREEN'&&!error&&car.tyreAge>10&&remain>10) {
    pit=true;
    target=weatherTyre||'H';
  }
  if(pit) {
    const stock=s.calendar.weekend.tyres[car.driverId];
    if(stock[target]<=0) {
      const alternatives=weatherTyre?['I','W']:['H','M','S'];
      target=alternatives.find(k=>stock[k]>0)||null;
    }
    if(target)car.pitRequest=target;
  }
  if(car.tyreWear>85)car.mode='tyres';
  else if(remain<7&&car.fuel>remain*r.fuelPerLap*1.1)car.mode='attack';
  else car.mode=car.fuel<remain*r.fuelPerLap*.94?'fuel':'normal';
  const team=s.teams.find(t=>t.id===car.teamId);
  if(team.personality==='激进'&&car.tyreWear<55&&remain<15)car.mode='attack';
  if(team.personality==='稳健'&&car.tyreWear>65)car.mode='tyres';
  car.engine=car.tyreWear>95?'save':'normal';
}
function aiTransfers(s) {
  for(const t of s.teams.filter(t=>t.id!==s.player.teamId)) {
    for(let slot=0; slot<2; slot++) {
      const d=s.drivers.find(d=>d.id===t.drivers[slot]);
      if(d.contract.years>0&&!d.retired)continue;
      const free=s.drivers.filter(x=>!x.teamId&&!x.academy&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace);
      const rival=s.drivers.filter(x=>x.teamId&&x.teamId!==t.id&&!x.retired&&x.contract.years<=1&&x.attributes.pace< t.reputation+6).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const youth=s.drivers.filter(x=>x.academy===t.id&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const candidate=youth&&youth.attributes.pace>=74&&chance(s,.25)?youth:rival&&chance(s,.3)?rival:free[0];
      if(candidate&&candidate.attributes.pace>d.attributes.pace+1&&s.finance[t.id].cash>15) {
        const old=candidate.teamId,fee=old?candidate.contract.salary*.65:0;
        spend(s,t,fee,'AI 转会补偿',true);
        if(old)income(s,s.teams.find(x=>x.id===old),fee,'AI 转会收入');
        transferDriver(s,candidate,t,slot,candidate.contract.salary*1.12,2);
        news(s,`${t.name} 在转会窗签下 ${candidate.name}`);
      }
      else if(d.retired) {
        const reserve=freeReplacement(s,t.id,d.id);
        if(reserve)transferDriver(s,reserve,t,slot,reserve.contract.salary,2);
      }
      else{
        d.contract.years=2;
        d.contract.salary*=between(s,1.02,1.1);
      }
    }
  }
}

return {aiManagement, aiRaceDecision, aiTransfers};
}());

// ===== 文件: js/core/calendar.js =====
modules['js/core/calendar.js'] = (function () {
// ===== 文件: js/core/calendar.js =====
const {
  SCHEDULES, SPRINTS, trackForYear
} = modules['js/data/tracks.js'];
const {
  sessionsFor
} = modules['js/core/rules.js'];
const {
  advanceRND
} = modules['js/core/rnd.js'];
const {
  dailyFinance
} = modules['js/core/finance.js'];
const {
  developDrivers
} = modules['js/core/drivers.js'];
const {
  aiManagement
} = modules['js/core/ai.js'];
const {
  staffEvents
} = modules['js/core/staff.js'];
const {
  between, chance
} = modules['js/core/rng.js'];
const {
  requireCondition, news, mutable, teamOf
} = modules['js/core/helpers.js'];
function makeCalendar(year) {
  const reference=Math.min(year,2025);
  return SCHEDULES[reference].split(' ').map((item,i)=> {
    const [track,date]=item.split(':'); return {
      round:i+1,track,date:`${year}-${date}`,sprint:SPRINTS[reference].includes(track),completed:false,result:null
    };
  });
}
function currentEvent(s) {
  return s.calendar.events[s.calendar.round];
}
function currentTrack(s) {
  const e=currentEvent(s);
  return e?trackForYear(e.track,Math.min(s.season.year,2025)):null;
}
function advanceDays(s,days) {
  requireCondition(Number.isInteger(days)&&days>0&&days<=180,'推进天数无效');
  s.calendar.day+=days;
  const dt=new Date(s.calendar.date+'T12:00:00Z');
  dt.setUTCDate(dt.getUTCDate()+days);
  s.calendar.date=dt.toISOString().slice(0,10);
  dailyFinance(s,days);
  developDrivers(s,days);
  advanceRND(s,days);
  const f=s.finance[s.player.teamId];
  if(f.cash<0&&!s.season.gameOver) {
    s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
    news(s,s.season.gameOver,'danger');
  }
}
function waitDays(s,days=7) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'请先完成当前周末或转会窗');
  const e=currentEvent(s);
  const left=Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000);
  requireCondition(left>2,'距离比赛不足三天，请进入比赛周末');
  advanceDays(s,Math.min(days,left-2));
  aiManagement(s);
  return '工厂与训练已推进';
}
function enterWeekend(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'当前阶段不能创建比赛周末');
  const e=currentEvent(s);
  requireCondition(e,'本赛季赛历已结束');
  const delta=Math.max(0,Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000)-2);
  if(delta)advanceDays(s,delta);
  aiManagement(s);
  staffEvents(s);
  const w={
    sessions:sessionsFor(s.season.year,e.sprint),index:0,setups:{
    },ideal:{
    },confidence:{
    },grids:{
    },qualifying:null,practice:[],q3:[],strategy:{
    },tyres:{
    },weekendWet:false,weatherStart:chance(s,currentTrack(s).rain)?between(s,.2,.8):0
  };
  for(const t of s.teams) {
    w.setups[t.id]=[[50,50,50,50],[50,50,50,50]];
    w.ideal[t.id]=[0,1].map(()=>[between(s,25,75),between(s,25,75),between(s,25,75),between(s,25,75)]);
    w.confidence[t.id]=[0,1].map(()=>Array.from({
      length:4
    },()=>({
      low:0,high:100,estimate:50
    })));
    for(const [slot,id]of t.drivers.entries()) {
      w.tyres[id]={
        S:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?6:8,M:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?4:3,H:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?3:2,I:4,W:3
      };
      w.strategy[id]={
        start:w.weatherStart>.65?'W':w.weatherStart>.2?'I':'M',pitLap:Math.round(currentTrack(s).laps*.45),secondLap:0,next:'H',backup:'B',rain:'I',auto:false
      };
      const worn=Object.values(s.parts[t.id].cars[slot]).some(x=>x.wear>75);
      if(t.id===s.player.teamId&&worn)news(s,`${s.drivers.find(d=>d.id===id).name} 的部件磨损偏高，本站存在可靠性风险`,'warning');
    }
  }
  s.calendar.weekend=w;
  s.race=null;
  news(s,`抵达${currentTrack(s).name}，${e.sprint?'冲刺':'标准'}周末开始`);
  return '比赛周末已开启';
}
function changeSetup(s,slot,values) {
  const w=s.calendar.weekend;
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'设定仅能在练习阶段调整');
  requireCondition([0,1].includes(slot)&&Array.isArray(values)&&values.length===4&&values.every(x=>Number.isFinite(x)&&x>=0&&x<=100),'设定参数无效');
  w.setups[s.player.teamId][slot]=values;
  return '赛车设定已更新';
}
function setStrategy(s,id,plan) {
  const w=s.calendar.weekend;
  requireCondition(w&&!s.race?.running,'比赛开始后请使用实时指令');
  requireCondition(teamOf(s).drivers.includes(id),'不是本队车手');
  requireCondition(['S','M','H','I','W'].includes(plan.start)&&['S','M','H','I','W'].includes(plan.next),'轮胎配方无效');
  requireCondition(Number.isInteger(plan.pitLap)&&plan.pitLap>=1&&plan.pitLap<=currentTrack(s).laps,'进站圈数无效');
  requireCondition(Number.isInteger(plan.secondLap)&&plan.secondLap>=0&&plan.secondLap<=currentTrack(s).laps,'第二次进站圈无效');
  requireCondition(['A','B','C'].includes(plan.backup)&&['I','W'].includes(plan.rain),'备选策略无效');
  w.strategy[id]={
    ...plan,auto:!!plan.auto
  };
  return '策略计划已保存';
}

return {makeCalendar, currentEvent, currentTrack, advanceDays, waitDays, enterWeekend, changeSetup, setStrategy};
}());

// ===== 文件: js/core/car.js =====
modules['js/core/car.js'] = (function () {
// ===== 文件: js/core/car.js =====
const {
  PARTS, COMPOUNDS, MODES, ENGINES, partQuota
} = modules['js/data/parts.js'];
const {
  SUPPLIERS
} = modules['js/data/teams.js'];
const {
  clamp, teamOf, driverOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  spend
} = modules['js/core/finance.js'];
const {
  between
} = modules['js/core/rng.js'];
function initParts(s,t) {
  s.parts[t.id]={
    cars:[0,1].map(()=>Object.fromEntries(PARTS.map(p=>[p.id,{
      level:1,gain:0,wear:0,used:1,risk:0
    }]))),stock:[],production:[]
  };
}
function performance(s,t,slot=0) {
  const p=t.performance,pu=SUPPLIERS[t.supplier]||{
    power:p,reliability:75
  };
  const v={
    downforce:p,aero:p-1,grip:p+1,suspension:p-2,brakes:p, power:t.custom&&t.type==='factory'?p-2:pu.power,ers:p-1,reliability:t.custom?76:89,tyres:p-1,weight:p
  };
  for(const part of PARTS) {
    const item=s.parts[t.id].cars[slot][part.id];
    v[part.dimension]+=item.gain;
    v.reliability-=item.risk;
  }
  if(t.type==='customer')v.power=pu.power+(s.season.year>=2026?2:0);
  for(const [key,gain]of Object.entries(t.carry||{
  }))if(Object.hasOwn(v,key))v[key]+=gain;
  for(const key of Object.keys(v))v[key]=clamp(v[key],30,99);
  return v;
}
const WEIGHTS = {
  downforce:{
    downforce:.34,aero:.13,grip:.12,suspension:.08,brakes:.08,power:.09,ers:.05,tyres:.07,weight:.04
  },low:{
    downforce:.08,aero:.32,grip:.08,suspension:.04,brakes:.1,power:.21,ers:.09,tyres:.03,weight:.05
  },street:{
    downforce:.15,aero:.04,grip:.29,suspension:.15,brakes:.17,power:.05,ers:.04,tyres:.06,weight:.05
  },fast:{
    downforce:.22,aero:.24,grip:.1,suspension:.07,brakes:.05,power:.16,ers:.07,tyres:.05,weight:.04
  },traction:{
    downforce:.15,aero:.12,grip:.21,suspension:.09,brakes:.12,power:.15,ers:.06,tyres:.06,weight:.04
  }
};
function carScore(s,t,slot,track) {
  const v=performance(s,t,slot),w={
    ...WEIGHTS[track.type]
  };
  if(s.season.year>=2026) {
    w.ers+=.13;
    w.power+=.05;
    w.downforce*=.7;
  }
  const sum=Object.values(w).reduce((a,x)=>a+x,0);
  return Object.entries(w).reduce((n,[k,a])=>n+v[k]*a,0)/sum;
} // 圈速基线：评分每差 1 分约 0.075 秒，顶底车差 25–35 分对应 1.9–2.6 秒。
// 车手有效评分每分 0.026 秒；常见队友差 4–20 分对应 0.1–0.52 秒。
function theoreticalLap(s,t,d,slot,track,qualifying=false) {
  const a=d.attributes;
  const skill=qualifying?a.qualifying*.8+a.pace*.2:a.racePace*.55+a.tyres*.18+a.consistency*.12+a.pace*.15;
  return track.baseTime+(95-carScore(s,t,slot,track))*.075+(95-skill)*.026+(d.fatigue||0)*.002+(75-d.morale)*.0015;
}
function setupPenalty(setup,ideal) {
  return setup.reduce((sum,v,i)=>sum+Math.max(0,Math.abs(v-ideal[i])-5),0)*.008;
}
function tyreState(car,track,driver,weather,mode='normal',trait=false) {
  const c=COMPOUNDS[car.compound],m=MODES[mode],wet=['I','W'].includes(car.compound);
  const life=c.life/track.wear*(.78+driver.attributes.tyres*.003);
  const fraction=car.tyreWear/100;
  const gripLoss=c.deg*car.tyreAge+Math.pow(Math.max(0,fraction-.65),2)*24;
  const temp=track.temp+(wet?30:60)+m.wear*7-weather*20+(car.dirty?5:0);
  const tempLoss=Math.max(c.min-temp,0)*.024+Math.max(temp-c.max,0)*.032;
  const mismatch=car.compound==='I'?Math.max(0,.22-weather)*22+Math.max(0,weather-.7)*12:car.compound==='W'?Math.max(0,.65-weather)*22:weather*weather*24;
  return {
    loss:c.pace+gripLoss+tempLoss+mismatch,temperature:temp,wear:100/life*m.wear*(trait?.95:1)*(wet&&weather<.15?2.5:1)
  };
}
function lapTime(s,car,track) {
  const t=teamOf(s,car.teamId),d=driverOf(s,car.driverId),mode=MODES[car.mode],engine=ENGINES[car.engine];
  const tyres=tyreState(car,track,d,s.race.wetness,car.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  car.tyreTemperature=tyres.temperature;
  car.tyreWear=clamp(car.tyreWear+tyres.wear,0,130);
  const setup=s.calendar.weekend.setups[t.id][car.slot];
  const ideal=s.calendar.weekend.ideal[t.id][car.slot];
  // 燃油质量影响 0.03 s/kg，即每 10 kg 慢 0.3 秒；单圈噪声限定 ±0.15 秒。
  const time=theoreticalLap(s,t,d,car.slot,track)+setupPenalty(setup,ideal)+car.fuel*.03+tyres.loss+mode.pace+engine.pace+(car.dirty?.22:0)-(car.drs?.4:0)+s.race.wetness*(7+(100-d.attributes.wet)*.07)+between(s,-.15,.15);
  car.fuel-=s.race.fuelPerLap*mode.fuel*engine.fuel;
  return Math.max(40,time);
}
function replacePart(s,slot,id) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'更换部件请在进入比赛周末之前进行');
  const t=teamOf(s),part=PARTS.find(p=>p.id===id);
  requireCondition(part&&[0,1].includes(slot),'部件或赛车无效');
  spend(s,t,part.cost*.23,'更换 '+part.name,true);
  const item=s.parts[t.id].cars[slot][id];
  item.wear=0;
  item.used++;
  if(item.used>partQuota(part,s.season.year)) {
    t.gridPenalties[slot]+=10;
  }
  return '已换新'+(item.used>partQuota(part,s.season.year)?'，下站罚退 10 位':'');
}
function fitPart(s,stockId,slot) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'周末开始后禁止装新规格，请先完成本周末');
  const t=teamOf(s),p=s.parts[t.id],i=p.stock.findIndex(x=>x.id===stockId);
  requireCondition(i>=0&&[0,1].includes(slot),'库存不存在');
  const spec=p.stock[i],item=p.cars[slot][spec.part];
  requireCondition(spec.level>item.level,'该赛车已安装同级或更高规格');
  item.level=spec.level;
  item.gain=spec.gain;
  item.risk=spec.risk;
  p.stock.splice(i,1);
  return '规格已装车，性能立即生效';
}
function replacementCost(part) {
  return part.cost*.23;
}
// 供界面展示的纯数据预测；不会消耗 RNG，也不会改动真实轮胎库存。
function tyreChartData(s,track){
  if(!track)return {labels:[],series:[]};
  const t=teamOf(s),d=driverOf(s,t.drivers[0]);
  const labels=Array.from({length:46},(_,i)=>String(i));
  const series=['S','M','H'].map(compound=>{
    const values=[],c={compound,tyreAge:0,tyreWear:0,dirty:false};
    for(let lap=0;lap<=45;lap++){
      const state=tyreState(c,track,d,0,'normal',false);
      values.push(Math.min(125,c.tyreWear));
      c.tyreWear+=state.wear;c.tyreAge++;
    }
    return {values,color:COMPOUNDS[compound].color};
  });
  return {labels,series,type:'line'};
}

return {initParts, performance, WEIGHTS, carScore, theoreticalLap, setupPenalty, tyreState, lapTime, replacePart, fitPart, replacementCost, tyreChartData};
}());

// ===== 文件: js/core/race.js =====
modules['js/core/race.js'] = (function () {
// ===== 文件: js/core/race.js =====
const {
  COMPOUNDS, MODES, ENGINES, PARTS
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  currentTrack
} = modules['js/core/calendar.js'];
const {
  theoreticalLap, setupPenalty, lapTime, performance
} = modules['js/core/car.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
const {
  aiRaceDecision
} = modules['js/core/ai.js'];
const {
  raceIncome
} = modules['js/core/finance.js'];
const {
  RACE_POINTS, SPRINT_POINTS, eliminationSize, penalty, trackLimits, pitLanePenalty
} = modules['js/core/rules.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  clamp, copy, teamOf, driverOf, news, requireCondition
} = modules['js/core/helpers.js'];
function event(s,text,type='info') {
  const r=s.race;
  r.sequence++;
  r.events.unshift({
    lap:r.lap,text,type,...(r.realtime?{at:r.time}:{})
  });
  if(r.events.length>300)r.events.pop();
}
function practice(s) {
  const w=s.calendar.weekend,track=currentTrack(s);
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'当前不是练习阶段');
  const session=w.sessions[w.index],rows=[];
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()) {
    const d=driverOf(s,id),conf=w.confidence[t.id][slot],skill=staffAbility(s,t.id,'engineer')*.75+staffAbility(s,t.id,'analyst')*.25;
    for(let i=0; i<4; i++) {
      const prior=conf[i],half=Math.max(3,(prior.high-prior.low)*.27/(1+t.facilities.sim.level*.05+(skill-45)*.003));
      const noise=between(s,-half*.55,half*.55)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='precise')?.85:1);
      const estimate=clamp(w.ideal[t.id][slot][i]+noise,0,100);
      prior.estimate=estimate;
      prior.low=clamp(estimate-half);
      prior.high=clamp(estimate+half);
      if(t.id!==s.player.teamId)w.setups[t.id][slot][i]=estimate;
    }
    const time=theoreticalLap(s,t,d,slot,track)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+between(s,-.15,.15);
    d.fatigue=clamp(d.fatigue+1);
    for(const p of Object.values(s.parts[t.id].cars[slot]))p.wear=clamp(p.wear+.5);
    rows.push({
      id,name:d.name,time,feedback:Math.round((d.attributes.feedback+skill)/2)
    });
  }
  rows.sort((a,b)=>a.time-b.time);
  w.practice.push({
    session,rows,wearEstimate:[Math.round(19/track.wear),Math.round(29/track.wear),Math.round(40/track.wear)],fuel:1.65*track.length/5.4
  });
  w.index++;
  news(s,`${session} 完成：设定置信区间收敛，已取得轮胎与燃油数据`);
  return '练习完成，可参照置信区间调整下一节设定';
}
function qualifying(s,mode='push',all=false) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='Q'||kind==='SQ','当前不是排位阶段');
  requireCondition(['push','safe','save'].includes(mode),'排位指令无效');
  if(!w.qualifying||w.qualifying.kind!==kind||w.qualifying.done)w.qualifying={
    kind,stage:0,active:s.teams.flatMap(t=>t.drivers),eliminated:[],stages:[],done:false
  };
  const q=w.qualifying;
  do{
    q.stage++;
    const rows=q.active.map(id=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id); const selected=t.id===s.player.teamId?mode:'push'; const compound=kind==='SQ'&&q.stage<3?'M':selected==='save'?'M':'S'; const stock=w.tyres[id]; let tyre=compound; if(stock[tyre]<=0)tyre=stock.S>0?'S':stock.M>0?'M':'H'; stock[tyre]=Math.max(0,stock[tyre]-1); const push=selected==='push'?-.12:selected==='safe'?.2:.55; const error=chance(s,(100-d.attributes.consistency)*.0015*(selected==='push'?1.6:.6)); const time=theoreticalLap(s,t,d,slot,track,true)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+COMPOUNDS[tyre].pace+push+between(s,-.15,.15)+(error?between(s,.3,1.4):0); return {
        id,name:d.name,teamId:t.id,time,stage:q.stage,compound:tyre
      };
    }).sort((a,b)=>a.time-b.time);
    q.stages.push(rows);
    if(q.stage<3) {
      const count=eliminationSize(s.teams.length*2),eliminated=rows.slice(-count);
      q.eliminated=eliminated.concat(q.eliminated);
      q.active=rows.slice(0,-count).map(x=>x.id);
    }
    else{
      q.done=true;
      w.grids[kind]=rows.concat(q.eliminated).map(x=>x.id);
      if(kind==='Q')w.q3=rows.map(x=>x.id);
      w.index++;
      news(s,`${kind==='Q'?'正赛':'冲刺'}排位结束，${rows[0].name} 获杆位`);
    }
  }
  while(all&&!q.done);
  return q.done?'排位结束':`第 ${q.stage} 段完成，可调整下一段指令`;
}
function useTyre(s,car,compound) {
  const stock=s.calendar.weekend.tyres[car.driverId];
  if(!COMPOUNDS[compound]||stock[compound]<=0)return false;
  stock[compound]--;
  car.compound=compound;
  car.tyreAge=0;
  car.tyreWear=0;
  if(['S','M','H'].includes(compound)&&!car.usedDry.includes(compound))car.usedDry.push(compound);
  return true;
}
function startRace(s) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='RACE'||kind==='SPRINT','当前不是比赛阶段');
  requireCondition(!s.race||s.race.finished,'比赛已开始');
  const sprint=kind==='SPRINT',totalLaps=sprint?Math.ceil(100/track.length):track.laps;
  let grid=copy(sprint?(w.grids.SQ||w.grids.Q):(s.season.year===2022&&w.grids.SPRINT?w.grids.SPRINT:w.grids.Q));
  requireCondition(Array.isArray(grid)&&grid.length===s.teams.length*2,'请先完成排位赛');
  const pitDrivers=new Set(!sprint?s.teams.flatMap(t=>t.drivers.filter((id,slot)=>t.pitLaneNext?.[slot])):[]);
  if(!sprint) {
    grid=grid.map((id,i)=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId); return {
        id,index:i+t.gridPenalties[t.drivers.indexOf(id)]+(pitDrivers.has(id)?999:0)
      };
    }).sort((a,b)=>a.index-b.index).map(x=>x.id);
    for(const t of s.teams)t.gridPenalties=[0,0];
  }
  const initial=w.weatherStart??(chance(s,track.rain)?between(s,.2,.8):0);
  const forecast=Array.from({
    length:Math.ceil(totalLaps/5)+1
  },(_,i)=>({
    lap:i*5+1,rain:chance(s,track.rain)?between(s,.2,.9):0,confidence:clamp(staffAbility(s,s.player.teamId,'strategy'),40,98)
  }));
  s.race={
    kind,sprint,totalLaps,lap:0,running:true,finished:false,control:'GREEN',controlLeft:0,red:false,sequence:0,wetness:initial,rain:initial,forecast,weatherWet:initial>.1,events:[],penalties:[],cars:[],fastest:{
      time:9999,driverId:null
    },fuelPerLap:track.length*.31,positions:[],segments:[],result:null
  };
  const r=s.race;
  for(const [position,id]of grid.entries()) {
    const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id),strategy=w.strategy[id];
    const car={
      driverId:id,name:d.name,teamId:t.id,slot,grid:position+1,position:position+1,time:position*.22+(pitDrivers.has(id)?15:0),lastLap:0,best:9999,lap:0,compound:'M',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:Math.min(110,totalLaps*r.fuelPerLap*1.04),mode:'normal',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,driveThrough:false,pitThisLap:false,plan:copy(strategy),planUsed:[],sectors:[]
    };
    let tyre=t.id===s.player.teamId&&!strategy.auto&&!sprint?strategy.start:initial>.65?'W':initial>.2?'I':sprint?'M':strategy.start;
    if(w.tyres[id][tyre]<=0)tyre=Object.keys(COMPOUNDS).find(k=>w.tyres[id][k]>0)||'H';
    useTyre(s,car,tyre);
    r.cars.push(car);
  }
  if(!sprint)for(const t of s.teams)t.pitLaneNext=[false,false];
  event(s,`${sprint?'冲刺赛':'正赛'}开始，${r.cars.length} 台赛车就位`);
  return '绿灯亮起';
}
function raceCommand(s,id,command,value) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前无进行中的比赛');
  const c=r.cars.find(c=>c.driverId===id&&c.teamId===s.player.teamId);
  requireCondition(c&&!c.retired,'该赛车已退赛或不是本队赛车');
  if(command==='mode') {
    requireCondition(MODES[value],'驾驶指令无效');
    c.mode=value;
  }
  else if(command==='engine') {
    requireCondition(ENGINES[value],'引擎模式无效');
    c.engine=value;
  }
  else if(command==='pit') {
    requireCondition(COMPOUNDS[value]&&s.calendar.weekend.tyres[id][value]>0,'该配方没有新胎可用');
    c.pitRequest=value;
    event(s,`${c.name}：收到进站指令，本圈末换 ${value} 胎`,'radio');
  }
  else if(command==='cancelPit') {
    c.pitRequest=null;
  }
  else throw new Error('指令不存在');
  return '车手已确认指令';
}
function resumeRed(s) {
  requireCondition(s.race?.red,'当前没有红旗');
  s.race.red=false;
  s.race.control='SC';
  s.race.controlLeft=2;
  event(s,'红旗解除，安全车带领重新发车','warning');
  return '比赛恢复';
}
function pit(s,car,track) {
  const target=car.pitRequest;
  if(!target)return;
  car.pitRequest=null;
  const previousCompound=car.compound;
  if(!useTyre(s,car,target)) {
    event(s,`${car.name}：请求配方已用尽，取消进站`,'warning');
    return;
  }
  const ability=staffAbility(s,car.teamId,'mechanics');
  let stop=clamp(4.7-ability*.025+between(s,-.18,.18),2,4.5);
  if(s.staff.some(x=>x.teamId===car.teamId&&x.trait==='pit'))stop=Math.max(2,stop-.15);
  if(chance(s,.006+(100-ability)*.0003)) {
    stop+=between(s,7,14);
    event(s,`${car.name}：螺栓卡住，停站 ${stop.toFixed(1)} 秒`,'warning');
  }
  const loss=track.pitLoss*(s.race.control==='GREEN'?1:.58)+stop;
  car.time+=loss;
  car.stops++;
  car.pitThisLap=true;
  car.pitLog.push({
    lap:s.race.realtime?car.lap:s.race.lap,compound:target,stop,loss,...(s.race.realtime?{at:s.race.time}:{}),from:previousCompound
  });
  event(s,`${car.name} 进站：${target} 胎，停站 ${stop.toFixed(2)} 秒`,'pit');
  if(chance(s,.003)) {
    penalty(s,car,0,'维修区超速，罚穿越维修区');
    car.driveThrough=true;
  }
}
function retire(s,c,reason) {
  if(c.retired)return;
  c.retired=true;
  c.reason=reason;
  event(s,`${c.name} 退赛：${reason}`,'danger');
}
function reliability(s,c,track) {
  const t=teamOf(s,c.teamId),v=performance(s,t,c.slot),engine=ENGINES[c.engine];
  for(const def of PARTS) {
    if(def.id==='mguh'&&s.season.year>=2026)continue;
    const p=s.parts[t.id].cars[c.slot][def.id];
    p.wear=clamp(p.wear+(def.department==='power'?.17:.08)*track.wear*(def.department==='power'?engine.wear:1));
    // 每个部件整站基础故障约 0.5%—4%，按本站圈数摊分。
    const perRace=clamp(.005+Math.max(0,p.wear-30)*.0004+(100-v.reliability)*.00012+Math.max(0,track.temp-30)*.0002+(c.dirty?.002:0),.005,.04);
    if(chance(s,perRace*engine.wear/s.race.totalLaps)) {
      retire(s,c,def.name+' 故障');
      return;
    }
  }
}
function controlEvents(s,track) {
  const r=s.race;
  if(r.controlLeft>0) {
    r.controlLeft--;
    if(r.controlLeft===0) {
      r.control='GREEN';
      event(s,'赛道恢复绿旗，DRS 将重新启用');
    }
  }
  if(r.lap%5===1) {
    const cell=r.forecast[Math.floor((r.lap-1)/5)];
    r.rain=cell?.rain||0;
    if(r.rain>.25&&r.wetness<.2)event(s,'雨带抵达赛道，注意轮胎交叉点','weather');
  }
  r.wetness=clamp(r.wetness+(r.rain-r.wetness)*.35,0,1);
  if(r.wetness>.15)r.weatherWet=true;
  if(r.control==='GREEN'&&chance(s,track.sc/r.totalLaps)) {
    r.control=chance(s,.58)?'SC':'VSC';
    r.controlLeft=3;
    event(s,r.control==='SC'?'安全车出动，维修区保持开放':'虚拟安全车启动','warning');
  }
  if(r.control==='GREEN'&&chance(s,.045/r.totalLaps)) {
    r.control='RED';
    r.red=true;
    event(s,'红旗：赛道需清理，比赛暂停','danger');
  }
}
function tick(s,count=1,untilEvent=false) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前没有比赛');
  requireCondition(Number.isInteger(count)&&count>0&&count<=1000,'推进圈数无效');
  const track=currentTrack(s),sequence=r.sequence;
  for(let iteration=0; iteration<count&&!r.finished; iteration++) {
    if(r.red)break;
    r.lap++;
    controlEvents(s,track);
    if(r.red) {
      r.lap--;
      break;
    }
    const previous=r.cars.filter(c=>!c.retired).slice().sort((a,b)=>a.time-b.time);
    const previousTimes=Object.fromEntries(previous.map(c=>[c.driverId,c.time]));
    for(const [index,c]of previous.entries()) {
      c.pitThisLap=false;
      const ahead=previous[index-1],oldGap=ahead?previousTimes[c.driverId]-previousTimes[ahead.driverId]:999;
      c.dirty=oldGap<1.5&&r.control==='GREEN';
      c.drs=!!ahead&&oldGap<1&&r.lap>2&&r.wetness<.18&&r.control==='GREEN'&&!c.drsBroken;
      const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
      if(t.id!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
      else{
        const planned=[c.plan.pitLap,c.plan.secondLap];
        for(let i=0; i<planned.length; i++)if(planned[i]===r.lap&&!c.planUsed.includes(i)) {
          c.pitRequest=c.plan.next;
          c.planUsed.push(i);
        }
        if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-r.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
        if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
      }
      const oldWear=c.tyreWear,oldFuel=c.fuel;
      let time=lapTime(s,c,track);
      c.tyreAge++;
      if(r.lap===1) {
        time+=(95-d.attributes.starts)*.024+between(s,-.3,.3);
        if(chance(s,.0015)) {
          time+=between(s,3,8);
          event(s,`${c.name} 起步拥挤中发生轻微接触`,'warning');
        }
      }
      if(r.control!=='GREEN') {
        time=track.baseTime*1.38+(time-track.baseTime)*.2;
        c.tyreTemperature-=25;
        c.tyreWear=oldWear+(c.tyreWear-oldWear)*.45;
        c.fuel=oldFuel-(oldFuel-c.fuel)*.65;
      }
      const calm=s.staff.some(x=>x.teamId===t.id&&x.trait==='calm')?.9:1;
      const human=t.id===s.player.teamId?DIFFICULTIES[s.settings.difficulty].mistake:1;
      const error=(100-d.attributes.consistency)*.000045*MODES[c.mode].risk*(1+r.wetness*3)*calm*human*(1.15-d.attributes.experience*.002);
      if(chance(s,error)) {
        time+=between(s,1,5);
        event(s,`${c.name} 锁死轮胎，损失时间`,'warning');
      }
      if(chance(s,.0015*MODES[c.mode].risk*(1.15-staffAbility(s,t.id,'sporting')*.002)))trackLimits(s,c);
      if(chance(s,.015/r.totalLaps)) {
        c.drsBroken=true;
        event(s,`${c.name}：DRS 失效`,'radio');
      }
      if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
      if(c.fuel<=0)retire(s,c,'燃油耗尽');
      reliability(s,c,track);
      if(c.retired)continue;
      if(c.driveThrough) {
        time+=track.pitLoss;
        c.driveThrough=false;
        event(s,`${c.name} 完成穿越维修区罚则`,'penalty');
      }
      c.lastLap=time;
      c.time+=time;
      c.lap=r.lap;
      c.sectors=[time*.32,time*.36,time*.32];
      c.best=Math.min(c.best,time);
      if(time<r.fastest.time&&r.control==='GREEN') {
        r.fastest={
          time,driverId:c.driverId
        };
      }
      pit(s,c,track);
      // 不能仅按自由空气圈速穿过对手：必须通过超车对抗，否则被限制在前车之后。
      if(ahead&&!ahead.retired&&c.time<ahead.time&&!ahead.pitThisLap&&!c.pitThisLap) {
        const rival=driverOf(s,ahead.driverId);
        const overtaking=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
        if(r.control!=='GREEN'||!chance(s,overtaking)) {
          c.time=ahead.time+between(s,.15,.45);
        }
        else{
          if(chance(s,.003*MODES[c.mode].risk*(1+r.wetness)*(.6+d.attributes.aggression*.008))) {
            retire(s,c,'争夺位置时发生碰撞');
            if(chance(s,.4))retire(s,ahead,'被卷入碰撞');
            if(chance(s,.35))penalty(s,c,10,'造成碰撞');
            if(chance(s,.08))pitLanePenalty(s,c,'危险驾驶');
          }
          else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${c.name} 超过 ${ahead.name}`,'overtake');
        }
      }
    }
    const active=r.cars.filter(c=>!c.retired).sort((a,b)=>a.time-b.time);
    if(r.control==='SC'&&active.length) {
      const lead=active[0].time;
      for(let i=1; i<active.length; i++)active[i].time=lead+Math.max(i*.8,(active[i].time-lead)*.65);
    }
    r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.retired?b.lap-a.lap:a.time-b.time));
    r.cars.forEach((c,i)=>c.position=i+1);
    r.positions.push({
      lap:r.lap,positions:r.cars.map(c=>({
        id:c.driverId,position:c.position
      }))
    });
    if(r.lap%10===0)r.segments.push({
      lap:r.lap,leader:r.cars[0].driverId,time:r.cars[0].time
    });
    if(r.lap>=r.totalLaps||!active.length)finishRace(s);
    if(untilEvent&&r.sequence!==sequence)break;
  }
  return r.finished?'比赛结束':r.red?'红旗暂停':`推进至第 ${r.lap} 圈`;
}
function simulateToEnd(s) {
  let guard=0;
  while(s.race&&!s.race.finished&&guard++<10) {
    if(s.race.red)resumeRed(s);
    tick(s,1000);
  }
  requireCondition(s.race.finished,'比赛未能完成');
  return '比赛已模拟完毕';
}
function finishRace(s) {
  const r=s.race,w=s.calendar.weekend,track=currentTrack(s);
  if(r.finished)return;
  for(const c of r.cars) {
    if(!r.sprint&&!(r.realtime?c.usedWet:r.weatherWet)&&!c.retired&&c.usedDry.length<2) {
      c.disqualified=true;
      event(s,`${c.name} 未使用两种干胎，取消本站资格`,'penalty');
    }
    if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&c.stops<2&&!c.retired) {
      c.disqualified=true;
      event(s,`${c.name} 未满足摩纳哥两停规则，取消资格`,'penalty');
    }
    c.time+=c.penalty;
  }
  r.cars.sort((a,b)=>Number(!!a.disqualified)-Number(!!b.disqualified)||b.lap-a.lap||a.time-b.time);
  const points=r.sprint?SPRINT_POINTS:RACE_POINTS;
  const fullDistance=r.cars[0]?.lap||r.totalLaps;
  const rows=r.cars.map((c,i)=> {
    const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId); const classified=!c.disqualified&&c.lap>=Math.floor(fullDistance*.9)&&c.lap>0; let awarded=classified?(points[i]||0):0; if(!r.sprint&&s.season.rules.fastestLap&&i<10&&classified&&r.fastest.driverId===d.id)awarded++; if(s.finance[t.id].disqualified)awarded=0; const row={
      driverId:d.id,name:d.name,teamId:t.id,position:i+1,time:c.time,lap:c.lap,grid:c.grid,points:awarded,classified,retired:c.retired,disqualified:!!c.disqualified,reason:c.reason,best:c.best,stops:c.stops,penalty:c.penalty,tyres:c.compound,kind:r.kind,round:s.calendar.round+1
    }; d.points+=awarded; t.points+=awarded; d.results.push(copy(row)); t.results.push(copy(row)); d.morale=clamp(d.morale+(awarded>0?3:-1)); d.fatigue=clamp(d.fatigue+(r.sprint?3:8)*(1+(100-d.attributes.fitness)*.01)); if(i===0&&classified&&!r.sprint) {
      d.wins++; t.wins++;
    }
    if(!r.sprint&&r.fastest.driverId===d.id)d.fastest++; return row;
  });
  r.result={
    year:s.season.year,kind:r.kind,round:s.calendar.round+1,track:track.name,rows,fastest:copy(r.fastest),penalties:copy(r.penalties),segments:copy(r.segments),events:copy(r.events)
  };
  r.finished=true;
  r.running=false;
  w.grids[r.kind]=r.cars.map(c=>c.driverId);
  w.index++;
  s.history.races.push(copy(r.result));
  if(!r.sprint) {
    s.calendar.events[s.calendar.round].result=copy(r.result);
    raceIncome(s,r.result);
    const t=teamOf(s),own=rows.filter(x=>x.teamId===t.id),successful=own.some(x=>x.points>0);
    t.confidence=clamp(t.confidence+(successful?3:-1.8)/DIFFICULTIES[s.settings.difficulty].tolerance);
    t.objectives.finish+=own.filter(x=>!x.retired&&!x.disqualified).length;
    t.objectives.points+=own.reduce((a,x)=>a+x.points,0);
    t.objectives.podiums+=own.filter(x=>x.position<=3&&x.classified).length;
    if(t.confidence<=0&&!s.season.gameOver)s.season.gameOver='董事会信心归零，你被解除车队经理职务。';
  }
  news(s,`${track.name}${r.sprint?'冲刺赛':'正赛'}：${rows[0]?.name||'无'} 获胜`);
}

return {event, practice, qualifying, useTyre, startRace, raceCommand, resumeRed, pit, retire, reliability, controlEvents, tick, simulateToEnd, finishRace};
}());

// ===== 文件: js/data/track-layouts.js =====
modules['js/data/track-layouts.js'] = (function () {
// Geographic centre lines, adapted from bacinger/f1-circuits (MIT). See THIRD_PARTY_NOTICES.md.
const TRACK_LAYOUTS = {"australia":[[344.55,524.79],[311.76,492.42],[263.21,442.9],[260.4,440.04],[259.21,436.12],[259.4,434.4],[260.21,432.81],[261.85,428.81],[264.6,423.95],[266.3,417.75],[267.27,410.11],[267.46,404.52],[265.76,393.62],[263.63,388.07],[260.31,382.27],[256.41,377.61],[247.77,369.0],[237.51,359.61],[223.07,345.65],[205.47,326.87],[198.41,319.31],[179.64,295.76],[170.33,283.3],[160.69,268.16],[142.15,235.7],[137.57,226.6],[134.8,219.78],[135.15,215.98],[136.73,213.29],[140.64,211.33],[153.72,209.04],[178.48,203.98],[181.35,202.84],[183.16,201.65],[184.38,199.94],[186.19,194.59],[186.54,188.95],[184.87,140.62],[184.29,122.9],[184.71,121.39],[189.96,115.26],[194.76,111.63],[231.58,85.05],[239.74,80.36],[277.75,64.84],[292.1,59.66],[305.09,51.82],[314.95,45.82],[319.37,45.04],[322.88,45.0],[326.14,46.92],[330.43,51.98],[335.62,56.55],[342.71,61.58],[351.74,64.96],[363.44,66.39],[374.02,66.88],[382.98,68.23],[392.97,71.7],[401.81,75.91],[411.54,83.13],[418.12,89.01],[424.66,97.54],[430.79,108.16],[434.24,118.98],[436.4,127.35],[437.49,134.37],[446.39,182.99],[446.46,189.08],[445.49,196.38],[443.1,203.86],[440.3,210.23],[435.3,217.33],[430.69,222.96],[425.63,229.82],[423.08,234.8],[420.86,240.44],[419.18,246.85],[409.09,300.37],[408.32,306.9],[407.9,314.66],[407.9,321.76],[408.51,334.66],[409.99,344.67],[412.73,356.14],[416.12,367.24],[420.5,376.8],[425.08,385.66],[432.69,397.58],[437.78,405.09],[447.97,415.91],[481.66,445.88],[486.98,450.0],[491.98,452.74],[495.65,454.49],[502.78,456.65],[509.61,457.23],[517.93,456.9],[525.44,456.86],[532.73,456.57],[538.92,456.78],[544.21,458.08],[549.49,460.66],[553.1,462.7],[559.52,468.41],[596.76,500.13],[610.62,511.73],[617.39,519.85],[622.42,525.69],[627.9,534.39],[633.44,547.29],[638.99,563.46],[653.69,614.33],[662.49,646.66],[664.17,655.64],[665.1,660.17],[665.2,662.95],[662.88,664.18],[655.98,666.83],[622.84,680.22],[588.7,693.82],[586.05,694.55],[581.8,695.0],[576.61,694.63],[571.25,692.43],[565.84,688.79],[562.65,685.85],[559.58,681.08],[539.34,643.72],[527.09,623.88],[525.44,621.23],[523.73,619.67],[522.03,619.02],[519.09,618.9],[517.03,620.08],[495.04,644.99],[491.98,648.05],[488.69,649.97],[484.56,651.6],[480.89,652.46],[477.6,652.42],[473.67,651.64],[468.22,649.72],[464.19,646.87],[462.61,645.31],[344.55,524.79]],"bahrain":[[194.83,353.12],[199.92,170.68],[204.73,51.2],[207.0,45.84],[211.76,45.0],[216.9,46.38],[220.74,49.21],[245.4,74.19],[252.11,76.72],[259.46,76.18],[302.35,62.27],[312.63,61.13],[321.93,61.73],[603.28,116.21],[612.9,119.03],[618.04,124.39],[619.28,131.25],[618.31,137.75],[615.12,145.1],[609.06,152.5],[602.03,158.46],[592.4,165.86],[558.49,191.08],[531.24,219.43],[524.53,225.99],[519.12,235.32],[506.95,262.89],[502.79,268.85],[496.35,273.06],[489.97,276.49],[479.75,277.64],[448.97,272.52],[440.64,272.82],[432.04,274.51],[424.96,278.18],[416.36,286.12],[353.89,365.28],[347.84,370.69],[339.18,372.08],[333.77,367.86],[331.83,359.32],[332.15,346.31],[347.19,256.63],[355.84,200.47],[357.14,189.4],[355.52,179.17],[353.3,171.52],[348.81,163.88],[323.17,141.73],[319.66,140.04],[315.82,141.12],[313.6,145.1],[304.3,214.38],[301.76,260.6],[297.27,343.73],[294.08,430.58],[290.83,509.73],[292.13,522.73],[297.27,530.44],[305.27,534.65],[316.47,536.94],[327.99,536.1],[342.37,533.27],[357.14,526.16],[369.58,517.38],[381.75,504.92],[389.16,492.7],[402.89,456.95],[410.57,441.9],[417.93,433.11],[427.56,425.16],[439.08,418.06],[455.08,414.09],[472.66,413.79],[485.16,416.68],[501.81,424.62],[545.68,446.41],[554.65,452.97],[562.33,460.62],[566.17,467.72],[570.93,475.66],[570.93,482.77],[567.09,490.11],[559.41,497.51],[548.87,505.46],[216.57,691.57],[210.52,694.7],[200.89,695.0],[196.72,691.03],[182.01,659.79],[180.72,647.33],[181.04,623.79],[185.2,494.69],[194.83,353.12]],"china":[[247.42,595.41],[198.48,607.69],[189.56,608.51],[178.82,608.51],[169.25,605.45],[162.69,602.67],[154.03,597.13],[147.78,591.52],[142.99,585.15],[139.41,577.65],[136.44,570.1],[136.13,562.07],[136.44,552.87],[137.65,545.91],[139.71,539.24],[143.59,533.4],[148.99,528.38],[160.93,523.13],[171.97,523.13],[180.59,526.43],[184.16,530.33],[186.58,534.52],[186.84,540.36],[185.07,548.68],[181.49,561.19],[180.59,566.5],[182.7,571.81],[187.74,577.36],[196.41,580.66],[205.94,578.72],[211.03,575.41],[214.3,569.86],[217.28,564.26],[220.25,556.76],[222.07,548.44],[222.67,538.94],[221.16,530.92],[216.37,522.01],[213.09,516.46],[203.27,504.48],[177.01,476.39],[156.75,449.96],[140.02,431.9],[119.15,408.24],[112.6,397.09],[109.57,389.06],[88.1,325.92],[81.25,306.98],[75.3,288.33],[75.0,283.61],[77.67,279.72],[83.06,277.47],[92.29,279.19],[101.86,285.56],[109.88,292.23],[117.94,300.84],[129.28,312.53],[139.11,326.98],[156.45,357.31],[179.68,398.21],[187.14,409.6],[194.6,418.51],[202.96,426.59],[212.79,431.9],[223.27,435.8],[234.01,437.98],[246.51,437.98],[257.55,435.8],[268.28,431.9],[279.02,425.17],[289.2,416.85],[297.21,407.41],[305.88,388.76],[319.29,360.38],[324.98,351.77],[330.93,345.92],[338.39,341.5],[349.42,336.72],[359.86,335.89],[368.83,336.72],[376.89,339.79],[384.05,344.51],[389.09,348.7],[393.57,353.71],[415.65,396.55],[421.04,402.4],[427.59,404.34],[433.84,403.22],[439.54,400.98],[461.61,371.77],[464.59,365.93],[464.59,360.68],[462.77,355.37],[408.79,263.61],[375.08,209.08],[338.08,147.89],[333.04,146.24],[327.95,147.59],[323.17,151.78],[317.52,158.16],[312.13,164.83],[307.09,168.19],[300.79,170.14],[294.24,169.02],[287.69,163.17],[279.92,154.56],[276.04,147.59],[273.67,141.22],[272.46,131.72],[273.07,123.11],[274.58,114.79],[277.25,107.0],[284.41,97.56],[291.26,92.24],[300.79,88.05],[310.97,85.87],[319.03,85.05],[328.86,85.58],[341.66,88.64],[350.03,92.24],[358.7,96.97],[370.59,108.12],[381.08,122.87],[494.42,296.42],[565.13,403.22],[601.82,458.87],[634.03,509.2],[676.67,572.87],[722.33,639.67],[725.0,645.51],[724.7,651.06],[720.82,654.95],[714.57,654.42],[701.72,648.29],[694.26,642.98],[685.94,636.9],[598.55,517.52],[594.67,515.34],[587.51,514.75],[477.99,540.65],[247.42,595.41]],"spain":[[552.8,335.27],[484.03,444.47],[446.01,505.69],[406.47,568.14],[365.09,634.65],[350.96,657.1],[346.44,662.15],[342.39,665.71],[338.9,667.31],[332.64,668.11],[326.93,667.74],[322.69,666.64],[318.6,664.42],[304.33,655.32],[299.82,653.29],[291.72,651.5],[285.18,651.5],[275.84,653.53],[270.54,656.86],[230.96,686.45],[225.43,689.22],[219.73,691.31],[212.08,693.89],[204.86,695.0],[198.55,695.0],[191.69,694.63],[184.05,693.65],[176.64,691.25],[167.71,686.82],[163.11,683.43],[158.87,679.74],[155.05,676.3],[144.93,663.01],[139.96,652.73],[136.37,641.29],[135.45,633.23],[134.52,623.63],[134.75,613.48],[136.27,602.71],[140.55,585.61],[145.25,571.83],[150.31,561.0],[155.74,552.45],[224.51,443.06],[228.66,439.18],[234.41,435.8],[245.13,433.15],[251.95,433.95],[257.47,435.62],[263.82,439.18],[271.0,444.97],[275.61,450.2],[281.13,461.27],[283.11,469.64],[283.66,482.62],[283.2,490.37],[281.27,499.11],[277.54,507.66],[270.63,520.89],[220.69,598.96],[219.31,604.25],[219.22,608.87],[220.46,614.4],[222.76,618.22],[225.29,621.42],[229.25,624.19],[234.18,625.91],[238.05,626.59],[244.35,625.35],[247.25,624.19],[322.33,590.22],[332.73,583.76],[343.08,575.83],[353.49,565.98],[360.85,557.06],[390.73,510.18],[393.95,503.17],[395.33,498.31],[394.09,490.62],[390.26,483.73],[384.37,478.25],[370.75,470.19],[363.34,464.16],[359.24,459.55],[355.19,453.64],[352.93,449.64],[334.15,404.85],[312.84,354.4],[311.14,345.73],[311.14,336.87],[312.01,330.04],[313.4,323.46],[317.58,315.83],[320.81,310.66],[327.71,303.09],[334.57,297.74],[573.46,175.18],[581.84,170.45],[586.21,165.77],[588.33,161.28],[588.88,155.87],[587.18,149.84],[584.37,145.04],[580.32,141.1],[574.43,136.61],[564.9,132.43],[559.01,131.01],[550.86,129.9],[543.87,129.6],[536.82,130.03],[529.14,131.99],[518.46,137.16],[511.14,141.41],[500.92,150.39],[490.79,157.65],[483.8,160.79],[472.98,161.59],[466.54,160.17],[458.85,156.24],[452.68,151.07],[448.86,145.04],[445.78,138.27],[444.81,130.83],[444.53,127.32],[446.65,117.48],[450.43,110.46],[456.32,104.74],[513.26,57.86],[518.87,53.12],[525.96,48.94],[532.4,46.66],[541.38,45.25],[550.22,45.0],[558.32,46.66],[564.95,49.49],[578.39,58.04],[593.39,67.7],[606.37,76.68],[614.75,81.55],[643.06,99.51],[649.87,104.31],[654.2,108.86],[658.11,114.15],[661.29,120.24],[663.91,128.36],[665.38,135.93],[665.48,146.82],[663.91,156.6],[656.04,172.17],[552.8,335.27]],"monaco":[[475.21,172.0],[474.13,165.32],[475.63,159.3],[479.5,151.06],[483.15,145.26],[494.52,130.85],[552.32,52.35],[556.34,46.71],[562.3,45.0],[569.54,47.08],[574.58,51.24],[578.23,57.77],[578.98,65.13],[579.15,71.22],[579.74,76.19],[582.74,82.13],[586.23,86.66],[592.72,95.8],[597.12,103.9],[598.84,108.8],[601.04,111.69],[604.53,112.66],[608.55,111.47],[611.56,108.35],[612.47,103.9],[610.48,100.11],[605.39,96.39],[590.31,77.23],[588.16,72.63],[588.11,68.17],[589.29,64.76],[590.9,61.56],[597.98,57.92],[608.93,55.1],[614.88,52.87],[621.0,50.42],[629.48,47.45],[638.71,46.78],[643.59,49.23],[645.42,56.81],[643.7,101.07],[636.88,146.6],[629.8,175.56],[621.91,196.21],[608.39,219.83],[592.83,239.81],[570.29,264.39],[538.04,284.15],[518.83,293.58],[481.81,310.88],[456.91,319.5],[420.15,328.19],[396.49,331.9],[383.93,334.28],[381.78,337.92],[381.62,341.11],[380.87,344.82],[379.26,348.46],[373.95,350.32],[366.44,351.58],[358.12,346.83],[353.56,346.53],[287.34,355.22],[254.45,359.97],[224.18,364.73],[215.81,365.99],[210.23,366.95],[206.2,371.11],[199.87,383.59],[194.51,395.7],[190.21,407.8],[188.34,416.42],[186.35,431.42],[186.19,457.12],[186.46,463.5],[188.34,467.89],[192.09,472.12],[200.41,478.21],[205.99,483.33],[208.4,488.83],[209.37,496.78],[218.82,551.44],[221.23,561.02],[221.98,564.06],[221.77,568.15],[219.35,571.42],[214.04,575.13],[208.73,577.73],[207.49,581.44],[208.51,589.24],[214.58,606.99],[220.1,620.36],[225.74,630.91],[235.4,644.72],[247.52,656.97],[256.43,662.1],[266.41,666.78],[271.4,669.01],[273.92,671.83],[276.82,680.52],[275.43,685.12],[270.92,687.8],[250.9,693.07],[239.74,694.85],[232.39,695.0],[225.84,694.03],[221.71,690.92],[219.19,688.32],[219.08,682.23],[218.12,677.32],[216.19,671.31],[204.92,657.42],[196.65,644.13],[190.21,634.17],[183.4,615.31],[168.32,562.8],[164.19,545.87],[161.29,527.75],[157.53,501.31],[154.58,466.92],[154.58,444.49],[155.55,427.34],[157.43,409.51],[160.75,397.11],[164.51,385.97],[166.34,379.14],[167.25,373.12],[166.82,363.98],[166.66,358.34],[168.48,355.0],[173.15,352.77],[184.53,350.02],[194.67,349.58],[208.57,347.87],[227.94,345.42],[245.11,342.37],[288.79,329.52],[313.2,322.84],[335.58,319.2],[350.93,317.94],[362.89,313.63],[397.5,297.22],[412.69,290.98],[434.85,286.0],[453.37,283.4],[471.02,280.43],[480.95,276.94],[493.02,269.37],[503.48,258.45],[509.39,249.24],[512.02,239.58],[511.59,229.48],[509.87,219.98],[506.11,209.51],[501.12,199.55],[493.29,193.46],[485.78,186.41],[482.13,183.21],[478.75,179.8],[475.21,172.0]],"canada":[[471.31,515.66],[479.3,552.81],[485.24,580.18],[488.55,600.43],[488.99,617.13],[483.84,661.93],[484.79,667.29],[488.39,670.64],[501.68,676.52],[504.32,678.48],[505.59,682.37],[505.11,686.29],[503.24,690.21],[499.64,693.23],[495.1,695.0],[489.15,695.0],[482.6,693.57],[466.95,689.16],[456.3,685.57],[446.16,680.07],[436.46,673.66],[414.07,654.46],[400.78,642.02],[398.27,638.14],[397.66,634.93],[397.82,631.73],[400.15,624.6],[400.94,620.19],[400.46,616.61],[398.9,613.59],[373.4,582.48],[368.88,578.6],[360.27,572.53],[355.11,568.27],[349.48,560.8],[346.34,552.81],[344.15,544.62],[343.38,538.06],[343.54,489.53],[343.54,485.46],[341.82,482.25],[338.68,479.77],[333.2,478.52],[325.86,480.29],[321.63,480.82],[316.48,479.39],[312.09,476.56],[308.97,473.54],[306.14,469.81],[304.43,466.42],[302.07,459.67],[300.04,451.33],[297.71,441.0],[297.4,432.29],[294.41,395.15],[294.73,375.05],[295.2,358.88],[296.6,341.12],[298.48,327.09],[300.36,316.04],[313.49,263.1],[315.68,258.27],[318.83,256.35],[322.11,255.63],[326.94,255.26],[330.69,254.01],[334.31,251.9],[338.23,247.79],[341.19,243.0],[343.85,236.44],[356.83,183.65],[361.98,155.03],[363.7,134.93],[364.49,114.31],[364.34,107.56],[363.54,100.47],[354.0,53.52],[353.69,50.69],[354.0,48.21],[356.2,45.72],[360.42,45.0],[363.09,45.9],[364.97,48.02],[365.58,49.79],[366.69,60.27],[368.25,76.3],[368.88,81.61],[370.92,87.5],[377.79,101.52],[383.89,113.97],[414.71,193.6],[418.3,203.9],[463.97,422.53],[465.84,431.58],[465.39,434.59],[463.36,436.93],[459.74,438.33],[457.41,440.66],[456.46,443.3],[456.62,446.7],[464.92,484.56],[471.31,515.66]],"france":[[415.89,398.63],[491.43,456.23],[529.95,486.01],[532.37,486.84],[534.63,486.67],[536.44,485.69],[537.48,484.19],[537.94,482.24],[538.55,461.99],[539.13,457.73],[540.05,455.43],[541.7,452.95],[544.27,449.8],[547.88,446.7],[552.08,444.39],[556.6,443.07],[561.25,442.75],[566.54,443.07],[571.35,444.71],[575.11,447.01],[578.26,449.98],[584.29,456.58],[590.16,461.99],[596.93,467.09],[604.15,471.2],[611.22,474.35],[618.74,476.48],[626.12,478.12],[634.56,478.78],[643.43,478.78],[650.5,477.8],[657.44,476.13],[664.36,473.82],[671.27,471.03],[677.15,467.75],[680.91,465.44],[684.22,463.8],[687.37,462.83],[690.55,462.65],[693.85,463.31],[697.01,465.13],[699.73,467.57],[701.53,470.05],[702.57,472.53],[703.49,475.5],[704.07,479.58],[704.07,484.71],[703.18,488.49],[701.84,492.12],[699.88,495.89],[698.07,498.54],[683.61,517.46],[678.8,524.2],[674.15,531.6],[669.47,540.33],[667.36,545.42],[666.47,548.53],[666.01,551.5],[666.47,554.47],[667.51,557.12],[669.01,559.74],[671.58,562.88],[674.88,565.67],[679.41,568.78],[684.06,571.08],[688.74,572.41],[692.94,572.9],[697.16,572.72],[701.53,571.75],[705.6,570.28],[709.64,568.46],[712.67,566.47],[715.36,564.34],[717.63,561.73],[720.04,558.76],[722.0,554.95],[723.5,551.85],[724.39,548.39],[724.85,544.93],[725.0,541.79],[724.69,472.85],[724.69,468.06],[724.39,464.47],[723.8,461.15],[722.3,456.58],[720.63,451.79],[718.69,448.16],[716.13,444.39],[712.82,440.59],[709.06,436.64],[704.99,433.36],[701.38,430.88],[697.92,429.07],[694.59,427.6],[667.51,417.06],[635.3,404.88],[604.3,393.35],[567.43,379.71],[534.63,367.21],[530.56,365.39],[526.8,363.26],[499.26,344.34],[494.28,340.88],[491.89,338.23],[484.06,326.22],[481.95,324.27],[478.95,322.45],[475.92,321.96],[473.69,321.96],[471.27,323.12],[469.31,324.58],[458.79,334.46],[456.52,336.1],[453.95,336.59],[451.26,336.1],[421.31,324.93],[326.64,289.53],[288.4,275.04],[174.19,232.42],[147.54,222.4],[144.85,221.07],[142.58,219.26],[141.39,217.62],[140.02,215.66],[138.52,213.18],[137.47,210.7],[131.45,196.39],[129.79,193.6],[128.14,190.46],[125.57,187.18],[123.18,183.54],[120.77,180.93],[116.09,176.63],[111.59,173.04],[107.52,170.56],[102.84,168.57],[98.65,167.42],[95.93,167.1],[92.93,167.59],[89.9,168.57],[87.51,170.07],[85.09,172.2],[83.75,173.84],[82.83,176.0],[75.76,196.88],[75.0,199.67],[75.0,201.0],[75.61,202.82],[76.96,204.14],[79.07,204.77],[83.14,204.63],[97.27,202.33],[101.34,202.33],[105.41,202.82],[108.87,204.28],[111.28,206.27],[113.39,208.58],[114.59,210.7],[115.78,213.5],[116.24,215.8],[116.39,217.79],[116.09,220.41],[114.74,228.47],[114.74,230.46],[115.2,232.59],[116.09,234.58],[117.89,236.22],[120.61,238.53],[136.86,248.23],[150.11,255.63],[162.14,260.73],[172.69,265.16],[178.1,267.99],[183.98,271.1],[190.28,275.39],[198.57,280.98],[209.56,289.85],[218.28,296.27],[223.69,301.72],[231.07,309.43],[234.25,311.73],[238.59,314.21],[254.87,323.26],[259.82,325.25],[263.74,325.56],[267.35,325.07],[270.96,323.78],[274.27,321.61],[276.53,319.31],[278.95,316.03],[281.03,313.41],[283.75,311.25],[286.45,310.27],[289.47,309.78],[293.39,309.78],[297.46,310.09],[301.07,311.25],[303.3,312.75],[319.58,325.25],[341.09,341.86],[365.47,359.81],[388.94,378.06],[415.89,398.63]],"austria":[[508.23,532.39],[463.46,544.28],[352.54,574.48],[344.9,575.05],[339.8,570.44],[331.21,553.81],[304.04,517.09],[274.56,475.18],[251.39,438.18],[230.26,401.69],[195.68,326.3],[186.15,306.21],[171.53,282.54],[149.02,255.0],[111.66,217.48],[77.08,182.9],[75.0,178.28],[75.24,173.37],[79.2,170.95],[88.25,169.33],[116.56,166.04],[144.87,164.95],[174.11,165.24],[201.95,167.95],[234.22,173.14],[332.82,192.19],[377.83,198.14],[475.06,202.24],[482.98,204.95],[487.84,210.38],[489.68,216.38],[489.21,222.68],[486.67,228.62],[476.94,242.53],[469.26,251.77],[455.1,264.3],[439.58,272.73],[420.76,278.96],[400.33,282.25],[379.01,280.87],[296.16,267.53],[285.03,268.92],[275.97,272.15],[268.09,277.63],[261.11,284.97],[256.72,293.68],[254.37,303.21],[253.94,311.92],[255.31,321.45],[257.86,328.49],[298.01,398.69],[304.75,406.08],[315.41,412.83],[327.72,415.61],[339.56,414.51],[352.07,409.31],[359.75,403.08],[367.64,393.26],[375.05,383.74],[382.96,375.6],[392.45,369.08],[403.59,362.5],[419.15,356.78],[435.38,353.26],[563.94,350.55],[662.82,348.12],[673.25,348.35],[683.44,351.93],[691.83,358.17],[698.54,366.59],[703.63,377.74],[723.82,445.8],[725.0,452.03],[723.82,456.65],[721.51,460.23],[713.63,466.47],[703.2,472.7],[689.71,479.51],[674.42,486.04],[656.31,492.04],[508.23,532.39]],"britain":[[436.94,51.15],[507.64,45.0],[520.2,45.76],[529.86,48.96],[536.16,53.13],[543.67,61.86],[548.41,71.8],[552.25,84.32],[557.63,105.56],[563.15,126.42],[566.36,149.48],[567.74,163.97],[569.58,199.12],[570.35,229.13],[571.57,240.85],[576.03,251.8],[584.45,267.1],[587.99,275.83],[587.84,282.4],[586.29,290.11],[574.34,321.72],[573.57,334.45],[575.4,343.55],[579.71,351.31],[591.52,367.79],[594.26,375.37],[594.57,384.31],[592.58,392.44],[585.38,401.38],[576.18,407.95],[563.59,415.28],[553.8,421.06],[546.88,427.8],[538.93,441.12],[523.28,470.49],[437.25,628.83],[409.04,672.75],[401.06,683.49],[394.64,689.23],[387.13,693.02],[379.3,695.0],[372.1,694.41],[364.12,692.6],[357.39,689.65],[351.4,684.89],[346.32,677.3],[344.8,674.35],[337.13,657.66],[328.55,642.74],[319.36,630.43],[313.06,622.89],[306.02,615.14],[293.58,602.41],[265.84,569.24],[263.06,567.47],[259.23,567.05],[255.42,568.86],[243.77,579.4],[239.78,580.79],[235.79,580.37],[232.42,578.98],[227.65,574.42],[222.6,569.24],[216.31,560.9],[211.72,551.96],[208.48,542.81],[205.74,532.49],[205.43,528.32],[206.2,524.14],[208.48,520.18],[214.0,511.42],[298.66,401.0],[317.67,376.55],[321.64,371.96],[328.55,367.41],[336.82,365.43],[343.58,365.22],[352.93,366.02],[378.99,369.98],[387.59,370.99],[396.48,371.37],[406.61,369.98],[415.8,367.62],[424.07,363.03],[478.05,320.12],[481.58,317.76],[485.88,315.57],[490.31,315.15],[493.67,316.37],[496.76,319.15],[498.6,322.31],[507.79,354.51],[510.56,359.06],[514.37,361.84],[518.83,362.06],[523.75,359.86],[526.81,355.9],[528.8,351.73],[532.64,341.19],[535.69,332.26],[538.0,323.49],[539.22,314.98],[539.99,306.0],[539.37,296.69],[537.53,292.52],[532.79,287.16],[357.83,127.44],[353.09,124.44],[346.48,121.07],[338.37,119.89],[329.93,120.86],[321.35,125.03],[318.27,128.83],[316.12,134.39],[312.6,163.38],[310.6,169.33],[306.33,174.13],[299.88,177.29],[292.83,178.3],[285.01,176.28],[279.49,172.53],[276.12,168.15],[273.5,163.01],[273.04,157.44],[274.13,151.46],[278.4,141.72],[300.94,97.05],[308.17,88.49],[315.21,81.33],[325.34,72.6],[333.6,66.83],[344.04,62.45],[353.09,59.5],[372.26,57.1],[436.94,51.15]],"hungary":[[256.06,534.69],[149.01,449.08],[117.36,424.34],[114.51,419.57],[112.82,414.8],[113.3,409.44],[115.43,405.26],[118.53,402.46],[122.59,400.49],[128.54,399.6],[137.35,399.6],[161.88,400.2],[178.29,403.0],[193.29,407.47],[209.01,413.67],[220.91,420.41],[229.92,426.61],[317.3,495.76],[323.7,499.1],[329.89,500.53],[336.08,500.53],[341.11,498.8],[346.58,496.83],[350.84,493.5],[354.42,489.56],[356.79,485.92],[358.92,480.86],[359.65,473.82],[359.41,469.89],[357.52,464.52],[355.87,459.22],[330.85,416.77],[328.24,408.9],[327.76,402.7],[329.21,397.39],[331.1,390.66],[333.47,384.46],[361.09,329.37],[410.11,230.17],[418.92,214.43],[429.17,200.66],[442.0,185.75],[444.62,181.58],[446.55,177.35],[446.99,172.58],[445.58,167.21],[423.22,82.92],[422.74,76.48],[423.42,70.28],[425.11,64.08],[427.73,58.18],[432.47,53.41],[438.18,49.17],[444.13,46.13],[450.09,45.0],[457.48,45.24],[464.6,46.97],[473.21,50.6],[482.94,56.8],[489.86,61.57],[497.94,67.48],[506.5,74.21],[517.24,85.42],[562.92,134.9],[565.05,139.67],[565.78,143.37],[565.54,147.3],[563.16,150.64],[559.34,154.28],[556.25,157.38],[555.08,160.18],[555.32,165.25],[556.49,170.85],[573.14,233.57],[576.72,241.97],[579.33,245.37],[581.94,248.41],[585.52,251.27],[589.82,252.64],[597.91,254.31],[632.41,259.38],[639.57,262.18],[644.07,265.28],[647.89,268.38],[651.23,273.75],[652.4,278.52],[653.84,284.12],[653.84,290.32],[652.64,297.06],[644.07,357.45],[643.83,368.18],[644.55,374.92],[646.44,381.89],[649.1,388.69],[682.88,442.64],[686.22,450.75],[686.94,456.41],[687.18,461.72],[686.46,467.32],[685.25,472.99],[682.88,478.06],[679.06,483.06],[620.99,548.28],[569.36,608.14],[551.74,627.81],[547.44,630.32],[543.42,630.91],[539.6,630.32],[536.26,628.35],[532.92,625.31],[497.7,585.37],[491.99,579.76],[465.08,557.82],[460.34,555.32],[455.59,553.35],[449.84,552.52],[444.86,553.05],[438.18,556.15],[434.16,560.62],[431.31,565.45],[429.62,569.63],[429.17,575.29],[429.86,580.89],[432.23,586.2],[435.33,590.43],[488.41,633.18],[498.18,642.12],[501.03,646.95],[503.17,653.69],[504.13,661.56],[503.41,668.83],[501.03,675.03],[498.18,680.93],[493.68,686.0],[486.28,690.77],[478.68,693.87],[470.35,695.0],[461.55,693.87],[453.66,690.77],[446.31,685.7],[256.06,534.69]],"belgium":[[320.47,113.93],[284.72,51.45],[284.34,48.65],[285.93,46.16],[289.23,45.0],[292.92,46.02],[304.68,51.94],[333.25,65.65],[346.98,74.1],[361.28,84.69],[374.09,95.42],[384.26,106.5],[438.86,171.61],[442.7,175.25],[449.29,179.35],[461.06,186.96],[466.22,192.08],[470.57,199.02],[473.36,205.33],[475.22,212.42],[476.8,225.5],[477.72,230.12],[479.3,234.4],[482.34,240.01],[509.32,283.17],[526.49,310.59],[531.25,320.83],[534.29,328.43],[537.86,340.67],[559.41,415.88],[592.46,530.07],[600.12,557.52],[600.52,561.98],[599.72,566.92],[597.08,570.88],[593.24,574.21],[588.35,576.84],[585.45,579.65],[583.46,582.94],[581.88,587.92],[582.14,592.87],[588.75,622.46],[588.62,627.58],[587.57,632.21],[584.0,637.32],[579.75,640.8],[504.43,692.86],[499.67,694.86],[494.91,695.0],[489.89,693.53],[485.78,690.55],[482.88,686.27],[481.69,681.96],[481.42,677.33],[482.88,673.02],[485.51,668.56],[489.35,665.44],[522.27,645.11],[525.84,641.46],[527.81,637.82],[528.61,633.54],[528.21,628.24],[514.59,588.24],[510.37,571.9],[500.72,521.48],[495.96,492.56],[494.91,487.61],[492.52,482.32],[489.35,478.01],[484.6,473.38],[479.3,469.91],[473.5,467.59],[467.4,466.61],[447.7,465.28],[440.18,466.12],[433.3,468.08],[426.31,471.06],[420.61,474.89],[414.0,480.99],[409.78,487.09],[405.16,495.85],[386.51,542.48],[369.85,583.96],[366.28,590.41],[362.06,594.87],[356.25,598.16],[350.42,599.81],[345.02,599.98],[339.59,598.83],[334.97,596.69],[327.29,591.71],[322.26,589.57],[316.19,588.59],[310.11,589.26],[304.55,591.04],[299.79,594.37],[296.76,598.16],[293.05,603.28],[262.52,651.21],[259.48,654.01],[255.78,656.01],[251.29,656.99],[246.26,656.68],[241.91,654.68],[221.27,639.64],[209.12,630.73],[206.09,626.77],[202.92,621.97],[201.06,617.34],[199.74,611.87],[199.48,606.26],[200.39,599.49],[202.51,593.71],[205.28,586.28],[209.39,575.02],[216.52,562.29],[224.33,551.21],[236.21,537.86],[256.04,518.5],[267.68,509.42],[277.6,503.64],[328.63,477.02],[336.02,472.4],[343.03,466.93],[349.51,460.83],[355.04,454.2],[360.2,447.26],[367.08,434.57],[372.64,422.33],[385.33,394.07],[387.56,387.93],[388.9,381.34],[389.15,373.07],[387.83,365.63],[380.3,346.28],[372.11,324.96],[362.19,298.35],[359.67,288.47],[357.3,276.72],[355.85,265.82],[354.91,256.56],[352.01,213.75],[352.54,210.94],[354.26,208.95],[356.9,208.28],[361.39,208.95],[366.03,208.95],[369.2,208.28],[371.3,205.97],[371.84,203.34],[370.52,199.87],[354.26,173.25],[320.47,113.93]],"italy":[[223.96,457.84],[234.89,329.31],[239.86,275.43],[240.39,273.23],[241.93,271.96],[243.84,271.66],[246.2,271.96],[248.41,272.13],[250.46,271.96],[251.86,270.86],[252.96,269.3],[253.24,267.9],[253.24,266.33],[245.5,236.94],[244.4,228.94],[243.98,221.71],[244.54,213.85],[247.43,175.53],[248.55,169.26],[249.93,163.43],[252.0,157.17],[254.75,150.4],[257.92,143.8],[262.6,136.41],[267.43,130.31],[273.93,123.38],[280.97,117.24],[288.82,111.61],[297.24,106.75],[306.74,102.02],[316.28,98.72],[326.76,95.75],[338.63,93.69],[350.77,92.59],[398.08,88.52],[456.01,85.05],[459.46,84.75],[461.26,83.79],[462.77,82.22],[464.68,75.46],[465.52,73.59],[466.9,72.32],[469.25,71.56],[477.11,70.13],[485.66,68.26],[497.8,64.33],[552.01,46.1],[556.69,45.0],[561.12,45.0],[565.39,45.8],[568.42,47.03],[571.33,48.77],[574.08,50.66],[577.53,54.43],[579.46,57.4],[580.84,61.03],[581.54,65.09],[583.87,90.85],[588.29,134.84],[588.15,138.77],[587.46,141.3],[586.36,143.5],[584.57,145.07],[581.26,147.27],[545.81,166.43],[516.98,182.59],[499.04,192.49],[490.34,197.52],[480.55,204.42],[473.52,209.78],[467.46,215.11],[435.99,242.14],[413.67,262.4],[366.48,303.85],[338.07,328.85],[334.2,332.78],[332.68,335.28],[332.4,337.78],[332.4,340.78],[333.38,347.37],[333.66,350.97],[333.66,356.17],[333.24,359.0],[332.12,362.6],[330.47,366.83],[327.72,371.1],[323.99,375.5],[319.73,379.1],[316.28,381.76],[314.48,383.83],[313.11,386.63],[311.85,391.83],[308.96,415.55],[305.93,440.84],[282.48,667.64],[281.5,675.81],[280.55,679.6],[278.61,683.5],[275.98,686.67],[272.95,689.5],[268.69,692.3],[264.0,694.03],[258.62,695.0],[254.05,694.67],[249.79,693.73],[244.82,691.83],[240.0,689.63],[236.41,687.14],[232.12,683.84],[227.3,678.64],[223.99,673.94],[221.1,668.91],[218.6,662.94],[216.27,656.35],[214.48,649.58],[213.64,643.78],[212.68,634.99],[212.54,626.19],[212.4,617.86],[211.99,601.36],[211.71,586.9],[211.99,571.2],[213.78,550.64],[220.54,485.6],[223.96,457.84]],"singapore":[[710.8,319.68],[723.74,418.5],[725.0,431.29],[723.74,437.61],[720.25,443.12],[704.23,467.59],[701.35,471.58],[698.32,473.04],[694.48,473.5],[685.68,473.04],[645.1,470.82],[582.54,464.15],[574.6,462.08],[569.6,459.04],[565.66,454.75],[562.37,446.15],[561.92,437.66],[562.17,432.61],[560.55,429.98],[551.81,429.37],[542.77,429.17],[496.63,426.54],[366.7,419.61],[350.98,417.74],[339.96,414.76],[328.64,409.15],[282.55,368.66],[262.84,351.83],[259.56,349.2],[254.86,348.44],[249.0,349.5],[244.6,352.43],[241.72,355.26],[233.38,380.64],[228.98,399.65],[217.97,457.17],[195.28,572.93],[194.01,575.36],[192.35,577.48],[189.21,579.75],[185.47,580.61],[180.87,580.51],[178.75,579.65],[173.45,572.93],[168.14,565.4],[164.2,556.86],[159.95,552.66],[139.94,536.64],[129.98,527.44],[123.77,521.42],[119.93,516.01],[116.04,502.82],[116.59,496.65],[117.7,491.95],[120.43,486.49],[119.02,483.05],[113.96,481.33],[104.66,478.15],[96.68,473.04],[86.88,466.17],[79.3,459.5],[76.57,453.89],[75.3,446.0],[75.0,439.08],[82.68,425.98],[113.66,370.53],[153.53,298.9],[160.61,285.96],[167.23,279.85],[169.96,277.62],[179.05,275.8],[187.09,280.76],[197.25,287.83],[239.04,331.66],[242.78,333.58],[245.86,332.82],[248.74,327.36],[265.22,295.11],[287.25,257.81],[291.3,251.79],[295.19,250.38],[302.21,253.51],[306.25,255.88],[423.5,323.72],[442.65,331.05],[455.94,333.53],[621.3,343.28],[627.72,342.02],[636.06,338.13],[642.93,333.28],[647.33,325.24],[648.44,317.61],[647.17,299.46],[642.42,274.79],[628.07,234.96],[624.18,226.47],[621.55,219.44],[620.14,210.85],[620.14,199.83],[622.56,175.31],[626.76,165.65],[632.52,159.84],[637.37,159.39],[641.77,160.55],[646.62,166.16],[649.25,169.6],[651.77,173.09],[656.32,176.93],[666.78,182.08],[675.58,184.51],[686.59,183.45],[692.25,185.72],[695.13,189.77],[696.8,196.24],[701.25,250.63],[710.8,319.68]],"japan":[[630.07,381.83],[670.17,430.1],[717.08,487.58],[721.37,493.66],[723.76,500.0],[725.0,505.71],[724.91,511.31],[724.21,515.62],[718.74,532.53],[716.14,536.96],[712.36,540.31],[709.18,542.12],[703.47,543.52],[698.27,543.33],[692.55,541.41],[687.23,537.21],[681.82,529.03],[654.15,486.55],[648.91,482.09],[644.41,480.65],[637.6,479.47],[623.3,479.36],[616.1,477.3],[611.02,473.73],[607.18,469.05],[605.37,464.48],[598.93,440.01],[596.23,433.75],[591.94,428.37],[586.95,424.72],[580.66,421.77],[574.22,420.55],[557.59,420.3],[549.9,418.82],[544.64,416.32],[539.2,412.12],[535.21,406.26],[532.76,400.29],[531.64,394.65],[531.7,389.27],[532.73,384.7],[540.89,362.37],[542.13,357.84],[542.34,351.87],[541.47,347.93],[539.32,342.22],[536.11,337.35],[529.98,333.01],[522.51,328.95],[513.65,324.49],[505.84,321.36],[500.04,319.74],[491.87,318.38],[482.62,318.23],[475.33,318.52],[469.25,320.15],[464.32,322.25],[456.64,325.52],[448.57,330.06],[439.28,337.65],[432.03,345.35],[401.51,382.34],[399.94,384.48],[395.07,385.62],[350.5,389.64],[347.62,389.27],[344.57,387.21],[343.33,383.71],[342.78,380.76],[336.01,352.9],[326.97,300.58],[325.24,290.96],[324.82,286.1],[325.3,281.09],[326.27,275.89],[328.33,270.51],[330.66,265.17],[337.85,248.66],[338.61,246.12],[338.07,243.8],[336.71,241.66],[334.38,240.08],[331.69,239.23],[329.08,239.41],[326.12,241.4],[323.67,244.94],[313.18,263.07],[304.65,276.74],[299.09,284.85],[294.49,290.19],[290.53,293.58],[283.72,298.96],[276.56,302.79],[269.06,305.04],[255.99,306.95],[243.62,307.47],[234.31,306.77],[223.21,304.34],[211.05,300.91],[197.45,295.83],[188.86,291.85],[181.33,287.31],[174.37,282.12],[167.02,275.52],[159.43,267.12],[154.41,259.79],[149.91,251.76],[138.78,222.13],[132.82,209.16],[129.8,203.96],[125.68,200.13],[120.3,197.7],[113.86,196.48],[106.15,196.67],[99.01,197.7],[92.03,199.25],[85.22,202.05],[79.66,206.29],[76.3,211.67],[75.0,216.94],[75.39,223.57],[76.91,228.51],[79.11,233.48],[82.89,237.64],[90.36,244.64],[99.71,252.42],[108.84,260.42],[120.42,269.18],[133.67,278.21],[147.22,286.69],[162.37,293.91],[175.91,300.84],[189.83,306.14],[212.42,313.95],[237.27,323.65],[267.36,334.18],[297.21,343.62],[317.87,350.77],[344.57,360.97],[350.68,362.52],[356.76,362.7],[363.2,361.49],[369.46,359.76],[380.74,355.41],[391.11,350.21],[399.82,344.83],[408.83,337.83],[425.67,322.06],[448.75,300.54],[455.16,295.24],[459.73,292.03],[463.9,289.27],[466.86,287.5],[468.47,287.35],[470.58,288.24],[475.78,292.88],[479.53,296.01],[482.59,296.89],[485.46,296.34],[488.85,294.09],[494.41,289.05],[500.67,284.55],[507.66,281.6],[516.19,280.87],[524.14,281.31],[532.55,283.04],[540.95,286.32],[548.09,289.75],[557.04,295.83],[565.09,303.31],[573.34,312.52],[630.07,381.83]],"usa":[[205.38,487.93],[264.07,534.71],[280.28,546.06],[292.83,553.54],[297.48,555.75],[299.29,556.3],[301.31,555.95],[303.12,554.84],[304.36,552.98],[304.97,551.28],[304.77,549.22],[292.01,512.53],[286.33,495.56],[285.34,490.34],[285.13,485.87],[285.34,480.65],[286.33,475.79],[288.14,469.66],[290.98,464.44],[294.03,459.77],[298.27,454.91],[302.92,451.54],[309.21,447.63],[343.41,426.39],[357.4,417.61],[360.41,414.65],[363.05,411.09],[365.27,408.12],[367.12,404.01],[368.52,400.49],[372.18,390.25],[374.61,386.89],[377.65,382.97],[381.69,380.36],[384.93,378.66],[393.01,375.5],[399.3,372.33],[402.92,369.53],[405.18,366.76],[407.2,363.0],[407.99,358.53],[409.22,350.9],[409.83,346.03],[411.03,340.66],[412.67,336.74],[414.69,332.98],[417.32,329.27],[420.16,325.91],[424.4,322.19],[429.26,318.63],[434.53,315.66],[440.17,313.25],[445.06,312.1],[449.1,311.95],[452.35,312.1],[457.61,313.61],[491.2,329.07],[494.45,330.37],[497.87,330.37],[500.5,329.27],[507.2,325.15],[515.07,318.83],[520.75,313.05],[526.43,305.42],[530.67,300.4],[534.53,297.39],[538.77,295.53],[542.02,294.78],[546.67,294.78],[551.94,296.29],[555.98,298.5],[559.23,301.7],[561.04,303.92],[562.85,306.73],[564.49,309.89],[566.92,312.5],[569.76,313.61],[572.56,313.61],[633.1,300.2],[636.97,298.9],[639.39,297.59],[641.21,295.89],[676.64,252.86],[707.8,215.18],[719.73,199.91],[724.62,190.97],[725.0,188.72],[724.42,186.66],[722.98,185.56],[721.17,184.25],[719.15,183.7],[716.93,183.85],[713.88,184.61],[649.11,205.33],[603.96,217.98],[554.16,230.08],[494.65,242.03],[457.41,248.2],[422.97,253.22],[321.56,264.41],[310.24,266.47],[308.8,267.38],[308.19,269.24],[308.39,270.74],[309.83,272.79],[316.5,280.23],[339.58,311.95],[349.71,328.36],[350.32,330.77],[349.71,334.29],[348.27,336.74],[345.64,338.6],[343.41,339.15],[339.17,339.71],[320.36,338.2],[318.51,337.3],[316.91,335.79],[315.3,333.93],[313.86,331.32],[310.03,320.88],[308.39,316.77],[305.76,313.05],[293.41,300.4],[291.6,298.9],[289.38,297.95],[287.15,297.59],[275.01,296.48],[272.58,296.64],[271.15,297.59],[269.74,299.25],[269.13,301.51],[269.95,304.12],[293.41,344.57],[302.92,362.45],[303.74,367.31],[303.53,372.14],[302.75,376.05],[301.72,379.97],[299.09,387.24],[295.43,395.27],[293.0,398.43],[288.96,401.4],[284.31,403.65],[265.09,412.39],[261.23,413.34],[257.4,413.54],[250.32,412.99],[243.61,412.04],[237.15,409.98],[230.07,407.17],[223.78,403.46],[219.54,400.29],[216.7,395.47],[194.64,364.5],[177.43,342.87],[175.21,340.66],[172.58,339.51],[169.12,338.8],[166.08,338.96],[161.84,340.1],[156.78,341.76],[152.53,343.42],[81.46,374.59],[77.43,377.36],[75.82,379.97],[75.0,382.77],[75.82,384.83],[77.43,386.69],[79.45,388.55],[116.69,418.56],[205.38,487.93]],"mexico":[[193.71,144.6],[354.99,166.99],[407.3,173.85],[462.4,178.81],[488.96,182.12],[557.48,191.79],[676.89,209.53],[701.51,214.49],[705.72,216.14],[707.94,218.04],[709.07,221.1],[709.36,223.91],[704.87,253.47],[705.44,256.07],[706.85,258.43],[719.42,265.24],[723.06,267.14],[725.0,270.2],[725.0,273.05],[722.5,291.49],[718.57,308.03],[712.43,324.06],[705.44,338.49],[650.62,431.52],[584.89,534.73],[580.68,541.8],[580.11,546.05],[580.97,549.61],[582.95,552.22],[602.51,564.24],[604.45,566.15],[604.73,569.2],[603.36,571.81],[600.01,574.86],[563.34,602.52],[559.7,604.17],[556.63,604.62],[553.84,603.67],[547.13,599.41],[546.0,596.61],[546.0,590.95],[562.77,460.08],[562.54,456.07],[560.83,452.32],[558.33,449.21],[554.41,446.4],[534.84,434.33],[527.85,427.97],[523.64,423.71],[519.44,415.69],[514.95,403.87],[510.51,396.8],[505.45,391.84],[499.87,388.29],[492.31,384.98],[431.87,375.76],[425.16,373.66],[421.01,370.1],[419.02,367.75],[417.37,364.44],[409.52,340.14],[407.02,335.38],[403.1,330.92],[393.31,325.01],[348.56,300.91],[335.66,295.5],[316.95,290.99],[167.01,269.25],[163.93,268.09],[162.28,266.19],[160.86,263.13],[160.58,259.13],[158.08,220.6],[155.0,193.95],[153.87,190.89],[151.65,188.73],[148.58,187.33],[144.65,187.78],[140.45,191.59],[135.11,199.61],[132.04,201.96],[128.4,203.36],[124.24,203.16],[119.47,201.01],[113.89,198.4],[108.55,196.75],[83.13,193.95],[78.92,192.54],[76.94,190.89],[75.28,187.78],[75.0,184.73],[76.65,177.41],[80.29,167.74],[85.07,159.68],[92.06,150.01],[100.19,143.39],[110.54,138.18],[120.03,135.63],[129.25,135.38],[142.67,137.03],[193.71,144.6]],"brazil":[[234.54,511.57],[270.91,652.31],[274.76,667.14],[278.61,675.69],[287.32,688.66],[291.81,692.31],[298.25,694.93],[304.62,695.0],[311.63,693.55],[315.3,691.62],[326.66,681.14],[337.71,668.86],[342.07,665.62],[347.75,663.62],[353.5,663.28],[361.83,665.97],[379.51,676.8],[393.53,682.59],[403.95,685.28],[413.48,686.52],[422.19,687.0],[435.01,685.48],[444.8,683.35],[456.86,679.0],[468.16,672.45],[479.34,663.69],[488.37,654.18],[495.5,644.04],[500.81,634.52],[505.23,623.84],[522.53,566.67],[529.85,537.98],[542.35,489.3],[557.63,427.1],[584.47,325.18],[594.13,288.42],[600.95,262.63],[604.11,250.63],[605.31,243.05],[604.55,235.95],[602.78,231.12],[598.93,225.39],[591.98,220.57],[583.9,217.19],[572.22,214.78],[537.3,207.88],[523.66,206.36],[515.2,206.98],[504.85,208.43],[495.06,211.33],[486.41,216.43],[478.2,221.26],[469.99,228.02],[462.1,236.77],[451.3,250.5],[415.82,298.42],[394.98,327.94],[377.24,353.17],[357.79,378.69],[347.56,392.89],[339.67,403.58],[334.17,409.65],[328.05,413.44],[319.34,416.55],[309.74,417.79],[295.34,417.44],[285.74,415.86],[278.1,413.44],[271.29,410.34],[259.6,404.0],[253.79,398.82],[249.94,393.72],[246.22,386.34],[243.38,376.34],[239.84,361.59],[236.94,348.07],[233.02,323.25],[232.26,312.97],[232.45,302.56],[234.92,294.63],[238.89,290.63],[241.67,289.18],[245.14,288.01],[249.88,287.46],[254.87,288.7],[260.11,290.77],[274.25,301.52],[279.94,304.9],[284.36,306.77],[289.09,307.73],[293.45,308.08],[298.25,307.45],[304.81,305.04],[312.58,298.63],[316.94,292.15],[319.27,285.04],[319.65,278.98],[318.7,271.94],[316.05,266.42],[309.99,257.53],[304.5,252.01],[285.11,233.05],[275.14,221.6],[268.25,211.4],[263.27,197.74],[259.41,180.78],[257.65,170.5],[256.7,161.26],[257.33,153.68],[260.3,148.51],[262.76,145.4],[266.74,144.09],[270.02,143.27],[274.25,143.96],[279.18,145.95],[302.86,172.92],[323.31,195.54],[326.85,198.43],[334.49,203.74],[341.5,206.84],[347.31,208.57],[354.44,209.74],[361.07,210.5],[368.71,210.57],[380.71,208.84],[389.87,205.88],[399.59,200.29],[409.44,192.29],[414.93,185.05],[420.81,176.92],[436.53,152.16],[453.89,123.06],[473.53,91.27],[474.79,87.55],[475.11,83.13],[473.91,78.79],[471.63,74.1],[467.28,70.03],[456.99,64.65],[442.02,59.21],[411.65,47.76],[405.71,46.17],[398.14,45.0],[382.86,46.65],[369.47,48.93],[340.17,55.21],[330.45,58.52],[311.13,66.58],[301.59,70.79],[278.86,83.06],[269.83,89.2],[262.13,96.1],[254.3,103.34],[247.92,110.86],[242.24,119.68],[237.06,130.92],[232.89,142.92],[226.33,167.4],[219.19,198.23],[214.46,227.26],[206.31,258.22],[201.07,281.53],[196.52,297.66],[195.01,309.39],[194.69,325.32],[195.58,344.21],[197.66,358.35],[201.2,374.83],[207.32,398.55],[225.19,473.71],[234.54,511.57]],"abudhabi":[[396.22,409.15],[486.62,396.9],[491.4,395.3],[494.99,391.57],[497.47,386.41],[497.93,381.29],[496.59,375.92],[482.12,314.4],[479.63,307.69],[476.23,302.73],[470.58,297.99],[465.85,295.64],[440.22,287.67],[431.7,283.35],[425.36,279.03],[419.63,273.61],[415.32,268.53],[412.11,264.3],[408.21,254.98],[406.8,247.89],[406.68,240.17],[408.25,231.02],[411.15,221.41],[417.53,196.95],[419.78,178.82],[420.01,165.94],[418.87,154.77],[411.8,97.37],[407.1,61.2],[406.19,57.0],[405.31,53.6],[402.6,50.12],[397.98,46.3],[395.19,45.34],[391.98,45.0],[388.92,45.5],[385.64,46.8],[383.19,49.28],[381.71,51.59],[379.83,55.45],[374.22,72.15],[368.87,96.32],[323.65,231.15],[306.01,283.35],[296.23,312.47],[288.89,335.05],[281.26,363.08],[265.1,414.69],[249.71,461.18],[247.91,465.72],[247.45,469.12],[247.91,471.09],[249.63,473.06],[253.53,473.19],[267.93,471.47],[271.1,471.47],[273.66,474.53],[281.83,505.58],[283.51,511.41],[288.67,524.3],[293.36,533.53],[303.48,548.26],[315.02,561.68],[329.53,574.15],[391.06,622.7],[405.08,634.07],[416.12,641.96],[430.86,651.48],[443.5,658.79],[463.94,668.65],[482.61,677.04],[510.38,690.17],[522.26,694.96],[528.94,695.0],[536.01,693.57],[542.46,689.84],[545.9,686.52],[548.19,683.25],[550.48,678.42],[551.78,673.72],[552.55,669.36],[551.93,662.14],[550.48,656.9],[548.42,651.82],[545.4,647.29],[541.13,643.18],[535.82,639.61],[530.2,637.13],[522.03,635.96],[457.25,630.76],[449.27,629.71],[445.83,628.95],[442.2,627.65],[407.41,605.91],[403.9,603.27],[401.53,600.25],[399.01,593.79],[390.91,555.89],[391.44,552.91],[393.32,550.9],[396.14,550.1],[425.02,545.78],[428.42,544.35],[430.59,543.22],[432.88,540.87],[435.18,536.55],[435.71,531.22],[435.79,504.99],[433.69,500.5],[431.09,497.82],[427.16,496.31],[421.77,495.13],[417.07,494.5],[410.81,494.29],[404.62,494.75],[344.35,504.03],[339.16,504.41],[332.55,504.15],[326.1,503.02],[321.66,501.55],[318.72,498.87],[315.67,495.59],[299.13,465.55],[290.58,451.74],[288.78,447.67],[287.52,442.26],[287.1,437.64],[287.02,432.1],[287.94,428.33],[290.16,425.6],[292.91,424.22],[299.21,423.08],[396.22,409.15]],"imola":[[487.35,241.28],[475.83,241.12],[403.92,225.67],[378.26,222.96],[363.3,222.8],[288.27,229.52],[251.42,238.25],[246.84,241.28],[244.65,243.99],[244.0,246.5],[241.3,258.26],[239.31,261.99],[234.72,265.17],[200.82,282.43],[195.76,288.09],[141.06,423.69],[140.41,427.31],[140.5,431.71],[146.29,452.78],[146.29,456.12],[144.4,460.2],[142.3,463.0],[77.53,518.41],[75.67,521.6],[75.0,525.37],[75.82,529.42],[78.2,534.25],[81.3,536.89],[84.81,537.95],[90.21,537.87],[194.64,524.31],[206.53,523.49],[224.1,524.47],[236.83,526.32],[254.18,529.62],[271.97,532.88],[281.19,534.69],[287.01,533.51],[291.42,531.31],[297.13,525.76],[302.86,515.39],[311.66,493.42],[313.71,483.79],[314.36,472.86],[312.65,461.74],[299.91,401.44],[300.08,397.67],[301.88,393.35],[309.3,381.67],[319.0,366.58],[321.84,365.13],[325.61,364.73],[328.22,365.87],[342.58,371.65],[347.0,372.24],[497.59,371.26],[499.53,372.08],[501.41,376.56],[502.81,380.49],[504.44,381.48],[507.62,381.56],[567.75,356.79],[575.34,352.55],[600.39,335.25],[614.72,322.21],[628.61,308.25],[662.51,275.0],[669.37,270.13],[676.82,266.47],[721.18,246.78],[724.52,243.52],[725.0,238.37],[724.1,234.28],[710.72,205.98],[707.6,203.31],[704.17,202.25],[699.36,202.05],[695.51,203.03],[635.89,225.67],[614.72,233.85],[603.2,238.01],[593.16,240.29],[586.39,241.51],[487.35,241.28]],"netherlands":[[154.39,346.12],[227.25,170.0],[254.94,105.36],[261.21,98.22],[269.7,94.21],[278.96,93.02],[287.54,94.8],[295.62,100.3],[301.24,107.22],[304.24,115.85],[304.47,125.44],[296.43,144.11],[273.33,200.34],[265.88,226.52],[262.89,253.82],[264.48,279.41],[262.07,289.82],[256.4,296.81],[245.05,306.03],[232.84,310.87],[199.11,324.03],[190.44,330.58],[188.08,340.25],[187.76,348.95],[191.25,357.8],[197.79,364.12],[205.96,367.47],[218.49,367.17],[280.27,347.46],[308.96,342.11],[333.7,341.29],[355.58,342.93],[376.28,346.42],[391.03,350.96],[415.18,356.09],[437.47,358.03],[453.27,354.75],[472.29,349.77],[495.17,338.24],[522.04,320.69],[540.25,312.06],[556.45,307.37],[577.83,304.99],[594.67,305.37],[664.9,309.68],[681.1,313.4],[696.13,320.91],[706.8,330.06],[713.65,339.8],[720.32,350.96],[723.87,363.83],[725.0,377.44],[723.73,390.75],[719.83,404.29],[711.38,419.02],[679.11,463.05],[667.21,482.61],[640.25,540.85],[627.31,545.38],[611.33,547.24],[596.03,546.5],[578.01,543.45],[559.31,537.05],[539.29,527.46],[519.45,513.33],[507.2,499.72],[504.97,491.39],[506.93,482.61],[514.55,471.6],[525.45,464.61],[541.47,458.73],[568.84,454.42],[595.22,447.8],[619.28,438.58],[632.58,429.21],[637.62,417.97],[638.3,405.7],[633.98,393.5],[622.86,382.42],[612.88,378.93],[560.99,372.6],[508.74,372.75],[453.22,379.45],[406.29,391.27],[377.23,400.42],[345.19,412.32],[314.55,425.34],[289.58,440.14],[280.41,444.08],[273.87,442.82],[267.74,434.34],[261.21,421.99],[252.22,416.41],[240.69,415.97],[229.43,421.25],[223.44,429.35],[220.67,438.06],[223.44,455.76],[248.59,602.58],[249.13,612.4],[246.36,622.44],[241.91,630.92],[237.6,636.35],[226.93,643.56],[215.54,646.17],[167.24,646.98],[157.39,646.46],[143.05,644.23],[128.2,639.4],[115.99,633.82],[99.74,621.03],[89.16,606.89],[81.95,594.77],[76.68,578.41],[75.0,564.05],[76.5,540.62],[80.95,523.96],[150.63,354.9],[154.39,346.12]],"saudi":[[433.46,545.5],[400.24,448.41],[398.34,446.76],[396.71,446.55],[389.12,449.02],[387.07,448.52],[385.24,447.6],[383.82,445.68],[383.04,443.0],[384.38,435.49],[389.97,418.03],[390.56,415.49],[390.68,410.45],[388.48,396.64],[381.04,353.05],[380.4,344.2],[378.84,341.29],[371.13,338.24],[367.49,335.96],[364.64,333.49],[360.76,327.32],[358.68,321.15],[358.34,313.64],[359.39,307.81],[361.03,304.43],[366.35,296.34],[368.27,291.93],[369.18,287.34],[368.62,280.33],[365.86,268.48],[362.51,263.23],[360.39,261.45],[355.29,257.9],[352.73,255.99],[350.82,253.86],[349.41,248.48],[349.82,225.71],[350.6,220.75],[355.51,214.45],[359.39,211.75],[368.54,208.49],[371.18,207.07],[374.35,201.98],[376.06,191.9],[377.62,183.89],[381.16,172.47],[383.8,165.38],[385.7,153.62],[386.33,145.66],[385.99,136.71],[384.8,101.4],[382.11,55.76],[381.06,52.82],[378.43,49.12],[375.06,46.81],[369.88,45.0],[364.69,45.81],[361.25,47.6],[357.73,49.99],[354.83,55.48],[353.39,63.01],[353.73,69.78],[355.07,75.25],[362.86,88.87],[367.03,95.3],[370.49,104.68],[371.84,110.59],[372.81,118.86],[372.54,125.26],[371.76,132.72],[369.18,140.54],[366.17,147.19],[362.07,155.14],[358.73,162.78],[357.27,171.16],[357.36,176.88],[357.36,181.29],[355.78,184.63],[353.39,187.49],[349.63,189.61],[341.53,192.0],[335.82,196.83],[333.15,201.19],[332.18,204.89],[330.86,212.27],[330.52,220.7],[330.52,226.42],[331.06,232.83],[332.08,239.66],[334.91,248.19],[342.23,263.92],[347.19,275.97],[349.77,286.21],[350.9,295.34],[350.53,304.14],[350.02,309.52],[350.12,321.07],[350.78,324.36],[351.53,329.66],[354.66,339.16],[357.46,345.18],[361.27,351.61],[367.47,361.48],[371.64,368.96],[374.79,376.92],[378.08,388.92],[379.13,397.79],[379.65,407.77],[379.38,416.9],[378.33,425.23],[376.38,436.33],[375.18,440.19],[374.08,443.71],[374.33,446.89],[375.23,450.12],[377.65,453.66],[380.26,456.0],[386.43,461.04],[389.48,464.79],[392.31,469.97],[396.44,488.98],[396.49,493.89],[394.63,499.56],[390.63,507.07],[377.43,532.87],[374.23,540.83],[371.67,550.05],[370.71,556.56],[370.32,562.44],[371.47,575.91],[374.91,589.3],[377.16,597.46],[379.43,605.31],[382.38,615.05],[386.92,625.4],[393.58,637.63],[398.29,644.33],[404.2,652.05],[412.47,661.58],[423.18,671.11],[433.24,677.88],[454.28,692.58],[460.08,695.0],[463.94,693.92],[467.33,691.77],[469.48,688.04],[469.29,684.1],[463.77,659.5],[453.2,608.67],[447.71,589.19],[442.61,573.1],[433.46,545.5]],"miami":[[395.78,312.89],[484.59,368.34],[486.1,372.43],[485.45,376.23],[482.81,381.29],[463.9,395.34],[458.01,401.7],[456.07,413.15],[458.01,425.28],[456.15,440.25],[451.61,449.83],[434.47,463.55],[414.95,470.29],[402.27,473.13],[383.58,473.56],[368.9,470.91],[351.72,463.21],[264.56,410.94],[252.05,403.38],[245.65,402.27],[238.29,401.7],[230.93,402.66],[221.58,405.6],[213.71,410.02],[205.66,416.52],[197.26,422.11],[186.27,423.93],[176.36,423.02],[165.71,417.87],[155.71,408.92],[146.63,399.92],[136.41,394.86],[125.9,392.74],[113.21,394.96],[101.57,398.62],[91.79,403.24],[84.56,409.93],[77.68,420.71],[75.0,432.17],[75.3,441.74],[77.42,448.19],[80.93,452.62],[88.07,456.52],[96.68,456.52],[107.33,454.16],[119.23,454.21],[143.77,459.41],[188.69,468.51],[235.13,467.16],[306.02,464.22],[325.63,470.43],[349.86,479.1],[369.38,485.98],[395.61,494.31],[422.87,498.88],[450.27,499.22],[479.05,494.5],[505.32,485.26],[565.35,463.36],[600.18,450.07],[616.98,442.61],[659.91,419.8],[683.02,405.02],[687.65,398.76],[686.14,393.56],[681.94,389.52],[671.33,383.12],[663.93,377.58],[659.91,369.49],[659.04,361.07],[661.42,350.82],[667.14,345.09],[673.84,342.39],[693.71,343.6],[703.62,342.25],[707.99,339.41],[714.66,332.91],[725.0,314.43],[724.31,310.39],[719.29,308.36],[714.74,304.99],[714.57,298.11],[722.79,271.59],[722.14,267.06],[718.42,264.03],[697.73,262.15],[398.98,251.57],[160.78,240.78],[153.81,242.61],[152.34,248.1],[154.72,254.93],[162.99,262.25],[175.84,272.02],[189.64,279.44],[200.9,282.28],[210.81,281.46],[222.93,277.08],[251.19,263.79],[267.03,259.56],[286.5,257.87],[305.72,260.57],[323.85,268.12],[395.78,312.89]],"qatar":[[221.33,438.43],[153.21,313.71],[126.48,265.3],[124.71,256.25],[125.86,246.85],[129.26,239.56],[134.61,234.22],[142.82,229.38],[152.23,227.91],[161.11,229.53],[229.11,270.79],[235.6,272.6],[244.17,272.89],[254.03,270.0],[261.98,262.56],[266.53,254.44],[267.63,246.22],[266.09,186.94],[267.06,178.87],[269.49,171.92],[272.76,165.26],[277.44,159.78],[374.42,52.29],[379.77,47.94],[388.03,45.64],[395.98,45.0],[404.06,47.1],[410.38,50.82],[439.19,78.33],[442.41,84.16],[443.87,92.13],[443.56,99.09],[441.62,105.89],[437.42,112.01],[374.42,181.22],[371.68,186.26],[371.5,191.74],[372.96,196.59],[376.05,200.16],[380.6,203.05],[386.88,203.88],[391.25,202.61],[396.95,200.01],[507.01,155.96],[514.21,155.18],[523.09,156.45],[530.55,159.83],[536.39,165.7],[539.96,173.14],[541.38,180.48],[541.25,186.94],[539.13,193.11],[534.62,200.26],[530.86,203.78],[522.29,210.78],[512.75,221.74],[504.8,232.76],[498.17,244.5],[492.82,258.26],[489.78,267.65],[486.51,284.15],[483.77,291.2],[479.08,297.17],[474.05,300.94],[467.29,303.97],[404.73,319.19],[399.25,322.42],[395.05,326.14],[392.62,332.31],[391.65,338.28],[392.75,347.29],[399.56,356.2],[411.22,367.99],[429.2,381.7],[447.98,392.37],[467.07,399.17],[486.15,403.23],[504.8,404.85],[525.16,402.89],[618.65,392.52],[627.22,394.33],[637.12,399.02],[644.72,404.85],[651.83,414.54],[673.52,454.87],[675.29,461.82],[675.29,468.14],[674.32,474.74],[669.81,483.16],[636.15,537.49],[631.9,541.55],[625.63,544.44],[619.14,546.4],[610.39,546.06],[502.9,524.37],[495.25,524.37],[487.65,526.63],[481.2,531.03],[476.65,536.66],[401.81,682.23],[395.8,689.18],[389.0,693.38],[379.15,695.0],[371.68,694.17],[364.39,691.08],[356.97,684.62],[221.33,438.43]],"azerbaijan":[[672.97,252.43],[720.55,232.04],[723.07,230.03],[724.68,227.08],[725.0,224.23],[724.2,220.11],[711.71,193.25],[698.18,163.4],[684.71,132.73],[682.48,131.26],[679.64,130.76],[634.13,148.98],[578.45,170.53],[502.5,204.68],[437.02,234.67],[431.4,237.87],[430.27,244.76],[454.6,304.23],[454.36,308.16],[437.75,315.76],[404.9,329.79],[382.59,343.22],[369.91,351.24],[364.45,357.96],[364.58,365.06],[367.88,373.53],[366.75,377.47],[362.55,381.66],[319.84,414.18],[289.86,437.25],[277.27,446.53],[273.09,449.8],[269.15,449.94],[265.91,446.01],[249.54,399.1],[246.94,391.75],[244.21,390.73],[240.14,392.1],[234.83,389.15],[230.52,387.11],[222.54,387.56],[217.74,386.93],[215.41,385.03],[214.21,380.29],[211.2,370.97],[208.04,366.4],[203.44,366.85],[184.55,373.64],[167.56,380.53],[129.92,398.25],[102.3,414.89],[95.44,420.09],[91.4,428.07],[84.06,453.04],[75.4,483.39],[75.0,489.12],[78.7,551.88],[78.32,557.83],[79.85,560.99],[143.34,594.36],[154.49,599.6],[166.89,605.79],[175.39,609.24],[179.83,608.22],[183.93,601.99],[192.24,586.8],[201.13,570.03],[209.49,554.06],[211.77,551.01],[257.77,509.13],[264.36,503.01],[268.3,493.76],[273.36,462.29],[275.02,455.43],[278.69,450.09],[286.54,444.25],[349.28,395.76],[360.8,387.39],[367.8,383.45],[388.32,373.96],[432.79,355.04],[475.63,336.26],[517.96,318.19],[550.73,304.12],[624.61,272.65],[672.97,252.43]],"vegas":[[562.25,622.07],[580.52,601.52],[584.4,597.2],[587.17,592.51],[588.1,586.94],[585.74,581.92],[581.9,578.71],[574.98,576.09],[568.39,575.02],[562.04,575.39],[556.11,577.16],[543.11,584.98],[531.09,596.9],[526.47,599.97],[516.36,602.22],[510.91,602.11],[501.04,598.78],[495.58,595.76],[490.52,591.44],[482.11,580.07],[478.71,570.44],[476.38,285.08],[478.14,280.76],[481.57,278.58],[540.42,279.69],[558.07,279.58],[567.29,277.44],[571.01,274.23],[581.42,264.08],[586.1,257.47],[589.68,250.35],[592.27,244.11],[593.82,235.99],[594.89,226.32],[594.6,220.64],[591.38,218.61],[582.85,217.65],[579.87,215.77],[577.3,211.82],[576.29,205.65],[576.77,201.15],[585.03,186.87],[586.46,183.07],[589.91,176.5],[588.66,169.6],[581.95,165.17],[569.49,163.77],[476.17,161.4],[441.71,156.38],[430.32,150.89],[417.74,137.93],[406.95,116.34],[390.43,77.51],[379.82,66.33],[368.81,58.77],[357.63,54.63],[340.13,48.99],[320.28,45.0],[317.56,45.66],[314.97,47.66],[312.94,54.45],[310.89,59.1],[290.28,99.36],[277.46,123.32],[270.79,135.46],[263.93,147.16],[252.09,167.71],[239.93,195.36],[233.49,216.25],[226.42,240.27],[221.68,257.47],[218.13,274.6],[215.3,291.94],[212.29,317.37],[211.55,332.21],[210.77,349.89],[211.1,397.75],[211.28,425.1],[211.37,445.84],[207.4,554.24],[206.21,609.86],[206.18,637.61],[205.11,671.05],[206.98,673.74],[209.55,674.63],[215.69,674.52],[220.22,676.25],[230.42,686.47],[239.33,691.57],[251.2,693.89],[302.87,695.0],[370.45,694.19],[426.06,694.52],[453.22,694.15],[475.46,691.05],[498.71,686.62],[504.77,683.85],[509.66,680.79],[513.56,677.1],[562.25,622.07]]};

return {TRACK_LAYOUTS};
}());

// ===== 文件: js/core/trackGeometry.js =====
modules['js/core/trackGeometry.js'] = (function () {
const { TRACK_LAYOUTS } = modules['js/data/track-layouts.js'];
const cache=new Map();
const SECTOR_ENDS=[.32,.68,1];
function geometry(id){
  if(cache.has(id))return cache.get(id);
  const points=TRACK_LAYOUTS[id],lengths=[0];
  for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
  const total=lengths.at(-1),fractions=lengths.map(v=>v/total),value={points,fractions,profiles:[],sectorWeights:[]};cache.set(id,value);
  // Equal-distance samples estimate bend intensity, rather than using the density
  // of GeoJSON vertices. The resulting travel-time profile is deterministic.
  for(let sector=0;sector<3;sector++){
    const start=SECTOR_ENDS[sector-1]||0,width=SECTOR_ENDS[sector]-start,cumulative=[0];
    for(let i=0;i<120;i++){
      const f=start+width*(i+.5)/120,a=trackPoint(id,f-.006),b=trackPoint(id,f),c=trackPoint(id,f+.006);
      const ux=b[0]-a[0],uy=b[1]-a[1],vx=c[0]-b[0],vy=c[1]-b[1];
      const angle=Math.acos(Math.max(-1,Math.min(1,(ux*vx+uy*vy)/(Math.hypot(ux,uy)*Math.hypot(vx,vy)||1))));
      const cost=1+Math.min(2,angle*4);cumulative.push(cumulative.at(-1)+cost);
    }
    const sum=cumulative.at(-1);value.profiles.push(cumulative.map(n=>n/sum));value.sectorWeights.push(sum/120*width);
  }
  const sum=value.sectorWeights.reduce((a,b)=>a+b,0);value.sectorWeights=value.sectorWeights.map(n=>n/sum);return value;
}
function trackPoint(id,progress){
  const g=geometry(id),p=((progress%1)+1)%1;let low=0,high=g.fractions.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(g.fractions[mid]<=p)low=mid;else high=mid;}
  const f=(p-g.fractions[low])/(g.fractions[high]-g.fractions[low]||1),a=g.points[low],b=g.points[high];return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
}
function sectorMotion(id,sector,f){
  const profile=geometry(id).profiles[sector];let low=0,high=profile.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(profile[mid]<=f)low=mid;else high=mid;}
  const duration=profile[high]-profile[low]||1,inside=Math.max(0,Math.min(1,(f-profile[low])/duration));
  return {distance:(low+inside)/(profile.length-1),rate:1/(duration*(profile.length-1))};
}

return {SECTOR_ENDS, geometry, trackPoint, sectorMotion};
}());

// ===== 文件: js/core/realtime.js =====
modules['js/core/realtime.js'] = (function () {
// Continuous, serializable discrete-event simulation. All event times are seconds.
const { currentTrack } = modules['js/core/calendar.js'];
const { theoreticalLap, setupPenalty, tyreState } = modules['js/core/car.js'];
const { MODES, ENGINES, COMPOUNDS } = modules['js/data/parts.js'];
const { teamOf, driverOf, clamp, copy, requireCondition, news } = modules['js/core/helpers.js'];
const { between, chance } = modules['js/core/rng.js'];
const { eliminationSize, trackLimits } = modules['js/core/rules.js'];
const { aiRaceDecision } = modules['js/core/ai.js'];
const { startRace, finishRace, event, useTyre, pit, retire, reliability, controlEvents, resumeRed } = modules['js/core/race.js'];
const { SECTOR_ENDS, geometry, sectorMotion } = modules['js/core/trackGeometry.js'];
const NEVER=1e12,EPS=1e-7;
const PHASE_NAMES={GARAGE:'车库',OUT:'出场圈',FLY:'飞行圈',ABORT:'已放弃',IN:'回场圈',RACE:'比赛中',GRID:'等待出发',PIT:'维修区',FINISHED:'已冲线',ELIMINATED:'已淘汰'};
function initCar(c,time=0){
  Object.assign(c,{phase:'RACE',progress:0,sector:0,segmentStart:time,segmentEnd:time,segmentDuration:0,lapStart:time,
    sectorStart:time,currentLap:0,speed:0,sectors:[],sectorSpeeds:[],sectorTones:[],bestSectors:[9999,9999,9999],lastSectors:[],lastSectorSpeeds:[],lastSectorTones:[],lapValid:true,finished:false,usedWet:['I','W'].includes(c.compound),crossings:[],nextRelease:NEVER,pitUntil:0,totalDistance:c.lap||0});
}
function startSegment(s,c){
  const r=s.race,track=currentTrack(s),t=teamOf(s,c.teamId),d=driverOf(s,c.driverId),fraction=SECTOR_ENDS[c.sector]-(SECTOR_ENDS[c.sector-1]||0);
  const tyres=tyreState(c,track,d,r.wetness,c.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  const base=theoreticalLap(s,t,d,c.slot,track,!!r.qualifying)+setupPenalty(s.calendar.weekend.setups[t.id][c.slot],s.calendar.weekend.ideal[t.id][c.slot])+c.fuel*.03+tyres.loss+MODES[c.mode].pace+ENGINES[c.engine].pace+r.wetness*(7+(100-d.attributes.wet)*.07);
  let duration=Math.max(12,base*geometry(track.id).sectorWeights[c.sector]+between(s,-.06,.06));
  if(r.qualifying&&c.phase!=='FLY')duration*=c.phase==='OUT'?1.25:1.3;
  if(r.qualifying&&c.phase==='FLY'&&c.consecutive)duration*=.998;
  const ahead=r.cars.filter(x=>x!==c&&!x.retired&&!x.finished&&x.phase==='RACE'&&x.totalDistance>c.totalDistance).sort((a,b)=>a.totalDistance-b.totalDistance)[0];
  c.drs=!!ahead&&!r.qualifying&&r.control==='GREEN'&&c.lap>=(s.season.year>=2024?1:2)&&r.wetness<.18&&!c.drsBroken&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1;
  c.dirty=!!ahead&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1.5;
  if(c.drs)duration-=.4*fraction;if(c.dirty)duration+=.22*fraction;
  if(r.control==='SC')duration*=1.45;else if(r.control==='VSC')duration*=1.35;
  if(ahead&&ahead.lap===c.lap&&ahead.sector===c.sector&&ahead.segmentEnd>r.time&&ahead.segmentEnd>r.time+duration){
    const rival=driverOf(s,ahead.driverId),prob=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
    if(r.control!=='GREEN'||!chance(s,prob))duration=ahead.segmentEnd-r.time+.25;
    else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${d.code} 获得超车机会，正在进攻 ${rival.code}`,'overtake');
  }
  if(c.phase==='FLY'&&chance(s,(100-d.attributes.consistency)*.00025*(c.mode==='push'?1.8:1))){
    duration+=between(s,.3,1.1);if(chance(s,.35)){c.lapValid=false;event(s,`${d.code} 超出赛道边界，本圈成绩删除`,'warning');}
  }
  c.segmentStart=r.time;c.sectorStart=r.time;c.segmentDuration=duration;c.segmentEnd=r.time+duration;
  c.segmentWear=tyres.wear*fraction*(r.control==='GREEN'?1:.45)*(r.qualifying&&c.phase!=='FLY'?.6:1);
  c.segmentFuel=r.fuelPerLap*fraction*MODES[c.mode].fuel*ENGINES[c.engine].fuel*(r.control==='GREEN'?1:.65)*(r.qualifying&&c.phase!=='FLY'?.65:1);
  c.tyreTemperature=tyres.temperature-(r.control==='GREEN'?0:20);
}
function refreshPositions(s){
  const r=s.race,track=currentTrack(s);
  for(const c of r.cars){
    if(['RACE','OUT','FLY','IN','ABORT'].includes(c.phase)&&!c.retired&&!c.finished){
      const f=clamp((r.time-c.segmentStart)/(c.segmentDuration||1),0,1),start=SECTOR_ENDS[c.sector-1]||0,width=SECTOR_ENDS[c.sector]-start;
      const motion=sectorMotion(track.id,c.sector,f);c.progress=start+width*motion.distance;c.speed=track.length*width/c.segmentDuration*3600*motion.rate;
      c.currentLap=Math.max(0,r.time-c.lapStart);c.totalDistance=c.lap+c.progress;
    }else{c.speed=0;if(c.phase==='PIT')c.currentLap=r.time-c.lapStart;}
  }
  if(r.qualifying)r.cars.sort((a,b)=>Number(a.phase==='ELIMINATED')-Number(b.phase==='ELIMINATED')||a.stageBest-b.stageBest||a.bestAt-b.bestAt||a.grid-b.grid);
  else r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.finished&&b.finished?b.lap-a.lap||a.time-b.time:b.totalDistance-a.totalDistance)||a.grid-b.grid);
  r.cars.forEach((c,i)=>{c.position=i+1;});
}
function startRealtimeRace(s){startRace(s);s.settings.speed=1;attachRealtimeRace(s);return '绿灯亮起 · 1× 对应真实时间';}
function attachRealtimeRace(s){
  const r=s.race;if(!r||r.realtime||r.finished)return;
  r.realtime=true;r.qualifying=false;r.time=r.lap?Math.min(...r.cars.filter(c=>!c.retired).map(c=>c.time),r.lap*currentTrack(s).baseTime):0;r.chequered=false;r.bestSectors=[9999,9999,9999];r.timeLimit=(r.sprint?1:2)*3600;
  for(const c of r.cars){const delay=r.lap?Math.max(0,c.time-r.time):(c.grid-1)*.15+(c.time>10?15:0);initCar(c,r.time);if(r.lap>0&&r.weatherWet)c.usedWet=true;if(c.retired){c.segmentEnd=NEVER;continue;}c.phase=delay?'GRID':'RACE';c.nextRelease=delay?r.time+delay:NEVER;c.segmentEnd=NEVER;if(!delay){prepareRaceLap(s,c);startSegment(s,c);}}
  refreshPositions(s);
}
function prepareRaceLap(s,c){
  const r=s.race,track=currentTrack(s);c.pitThisLap=false;
  if(c.teamId!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
  else{
    [c.plan.pitLap,c.plan.secondLap].forEach((lap,i)=>{if(Number.isInteger(lap)&&lap>0&&lap===c.lap&&!c.planUsed.includes(i)){c.pitRequest=c.plan.next;c.planUsed.push(i);}});
    if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-c.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
    if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
  }
}
function completeSector(s,c){
  const r=s.race,track=currentTrack(s),sector=c.sector,dt=r.time-c.sectorStart,width=SECTOR_ENDS[sector]-(SECTOR_ENDS[sector-1]||0);
  c.tyreWear=clamp(c.tyreWear+c.segmentWear,0,130);c.fuel=Math.max(0,c.fuel-c.segmentFuel);
  c.sectors[sector]=dt;c.sectorSpeeds[sector]=track.length*width/dt*3600;
  const timing=!r.qualifying||c.phase==='FLY';
  c.sectorTones[sector]=!timing||!c.lapValid?'neutral':dt<r.bestSectors[sector]-EPS?'fastest':dt<c.bestSectors[sector]-EPS?'success':'warning';

  if(sector<2){c.sector++;startSegment(s,c);return;}
  c.progress=0;c.lap++;c.totalDistance=c.lap;c.tyreAge++;c.lastLap=r.time-c.lapStart;
  if(!c.lapValid)c.sectorTones=['neutral','neutral','neutral'];
  c.lastSectors=copy(c.sectors);c.lastSectorSpeeds=copy(c.sectorSpeeds);c.lastSectorTones=copy(c.sectorTones);
  if(timing&&c.lapValid&&r.control==='GREEN'){
    for(let i=0;i<3;i++){r.bestSectors[i]=Math.min(r.bestSectors[i],c.sectors[i]);c.bestSectors[i]=Math.min(c.bestSectors[i],c.sectors[i]);}
    c.best=Math.min(c.best,c.lastLap);
    if(c.lastLap<r.fastest.time)r.fastest={time:c.lastLap,driverId:c.driverId};
  }
  if(r.qualifying){qualCrossing(s,c);if(r.q.status==='RUNNING'&&oldFlying(c)&&chance(s,.0008))suspendQualifying(s);return;}
  c.time=r.time;c.crossings.push(r.time);if(c.crossings.length>100)c.crossings.shift();
  if(c.lap>r.lap){
    r.lap=c.lap;
    r.positions.push({lap:r.lap,positions:r.cars.map(x=>({id:x.driverId,position:x.position}))});
    if(r.lap%10===0)r.segments.push({lap:r.lap,leader:c.driverId,time:r.time});
    if(c.lap>=r.totalLaps||(r.limitFinishLap&&c.lap>=r.limitFinishLap)){r.chequered=true;event(s,'方格旗：领先车手完成比赛，其余车手在下一次过线结束','info');}
    if(!r.chequered){const old=r.control;controlEvents(s,track);if(old!==r.control)rescaleControl(s,old,r.control);}
  }
  if(r.chequered){c.finished=true;c.phase='FINISHED';c.segmentEnd=NEVER;return;}
  if(chance(s,(100-driverOf(s,c.driverId).attributes.consistency)*.000045*MODES[c.mode].risk)){c.penalty+=0;event(s,`${c.name} 锁死轮胎，下一段损失时间`,'warning');c.pendingDelay=between(s,1,3);}
  if(chance(s,.0015*MODES[c.mode].risk))trackLimits(s,c);
  if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
  if(chance(s,.015/r.totalLaps)){c.drsBroken=true;event(s,`${c.name} 的 DRS 发生故障`,'radio');}
  if(c.fuel<=0)retire(s,c,'燃油耗尽');
  reliability(s,c,track);if(c.retired){c.segmentEnd=NEVER;return;}
  prepareRaceLap(s,c);
  if(c.driveThrough&&r.control==='GREEN'){c.driveThrough=false;c.lapStart=r.time;c.phase='PIT';c.pitUntil=r.time+track.pitLoss;c.segmentEnd=NEVER;c.sectors=[];c.sectorTones=[];event(s,`${c.name} 执行穿越维修区罚则`,'penalty');return;}
  if(c.pitRequest){
    c.lapStart=r.time;const before=c.time;pit(s,c,track);const delay=c.time-before;c.time=before;
    if(delay>0){c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.phase='PIT';c.pitUntil=r.time+delay;c.segmentEnd=NEVER;c.usedWet=c.usedWet||['I','W'].includes(c.compound);return;}
  }
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
  if(c.pendingDelay){c.segmentDuration+=c.pendingDelay;c.segmentEnd+=c.pendingDelay;c.pendingDelay=0;}
}
function oldFlying(c){return c.phase==='FLY';}
function suspendQualifying(s){
  const r=s.race;requireCondition(r?.qualifying&&!r.finished,'当前不是排位赛');r.red=true;r.control='RED';
  for(const c of r.cars)if(!['ELIMINATED','GARAGE'].includes(c.phase)){c.phase='GARAGE';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.lapValid=false;c.progress=0;c.speed=0;}
  event(s,'排位红旗：倒计时冻结，进行中的圈作废；赛车返回车库等待恢复','danger');
}
function stageDuration(r){return (r.kind==='SQ'?[12,10,8]:[18,15,12])[r.q.stage-1]*60;}
function startQualifying(s){
  const w=s.calendar.weekend,kind=w?.sessions[w.index];requireCondition(kind==='Q'||kind==='SQ','当前不是排位赛');requireCondition(!s.race||s.race.finished,'请先完成当前场次');
  const ids=s.teams.flatMap(t=>t.drivers),practiceOrder=w.practice.at(-1)?.rows.map(x=>x.id)||ids,q={kind,stage:1,active:ids,eliminated:[],stages:[],done:false,status:'RUNNING'};
  w.qualifying=q;
  const wet=w.weatherStart||0;
  s.race={realtime:true,qualifying:true,q,kind,sprint:false,totalLaps:0,lap:0,time:0,running:true,finished:false,red:false,control:'GREEN',controlLeft:0,sequence:0,events:[],penalties:[],cars:[],fastest:{time:9999,driverId:null},bestSectors:[9999,9999,9999],wetness:wet,rain:wet,fuelPerLap:currentTrack(s).length*.31,positions:[],segments:[],forecast:[],result:null};
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()){
    const c={driverId:id,name:driverOf(s,id).name,teamId:t.id,slot,grid:practiceOrder.indexOf(id)+1,position:practiceOrder.indexOf(id)+1,time:0,lastLap:0,best:9999,lap:0,compound:'S',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:0,mode:'push',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,plan:{},planUsed:[],stageBest:9999,bestAt:NEVER,afterLap:'IN',autoQual:false};
    initCar(c);c.phase='GARAGE';s.race.cars.push(c);
  }
  s.settings.speed=1;beginQualStage(s);event(s,`${kind}1 开始，出场圈不计成绩，计时归零后仅允许完成已经开始的飞行圈`);
  return '排位开始 · 请下达出场指令';
}
function beginQualStage(s){
  const r=s.race,q=r.q;q.status='RUNNING';q.deadline=r.time+stageDuration(r);q.remaining=stageDuration(r);r.fastest={time:9999,driverId:null};r.bestSectors=[9999,9999,9999];
  for(const c of r.cars){
    c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.stageBest=9999;c.bestAt=NEVER;c.bestSectors=[9999,9999,9999];c.sectors=[];c.sectorSpeeds=[];c.lastSectors=[];c.lastSectorTones=[];c.sectorTones=[];c.currentLap=0;c.progress=0;c.sector=0;c.segmentEnd=NEVER;c.nextRelease=NEVER;c.stageTyre=null;c.hasSet=false;c.attempted=false;c.flyAttempted=false;
    if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,55);
  }
  refreshPositions(s);
}
function allowedQualTyres(s,c){
  const r=s.race;if(r.wetness>.15)return ['S','M','H','I','W'];
  if(r.kind==='Q'&&s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id))return [['H','M','S'][r.q.stage-1]];
  return r.kind==='SQ'?[r.q.stage<3?'M':'S']:['S','M','H'];
}
function sendQual(s,c,compound,fresh=true){
  const r=s.race;requireCondition(r.q.status==='RUNNING'&&r.time<r.q.deadline,'本段已结束，禁止出场');requireCondition(c.phase==='GARAGE','车手尚未回到车库');
  requireCondition(allowedQualTyres(s,c).includes(compound),'本段只允许配方：'+allowedQualTyres(s,c).join(' / '));
  const regulated=r.kind==='SQ'&&r.wetness<=.15;
  if(regulated&&c.stageTyre){requireCondition(compound===c.stageTyre,'同一段冲刺排位仅可使用一套指定轮胎');fresh=false;}
  if(!fresh)requireCondition(c.hasSet&&c.compound===compound,'没有可复用的这套轮胎，请选择新胎');
  if(fresh){requireCondition(useTyre(s,c,compound),'该配方没有新胎可用');c.hasSet=true;c.stageTyre=compound;}
  c.fuel=r.fuelPerLap*7;c.phase='OUT';c.sector=0;c.progress=0;c.lapStart=r.time;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.afterLap='IN';c.outChoice='FLY';c.lapValid=true;c.nextRelease=NEVER;c.consecutive=false;c.attempted=true;
  event(s,`${driverOf(s,c.driverId).code} 离开车库 · ${compound} 胎出场圈`,'pit');startSegment(s,c);
}
function qualCommand(s,id,command,value){
  const r=s.race,c=r?.cars.find(x=>x.driverId===id&&x.teamId===s.player.teamId);
  requireCondition(r?.qualifying&&!r.finished&&c&&!c.retired,'当前车手不能接收排位指令');
  if(command==='send')sendQual(s,c,value?.compound||allowedQualTyres(s,c)[0],value?.fresh!==false);
  else if(command==='auto'){
    c.autoQual=!c.autoQual;if(!c.autoQual)c.nextRelease=NEVER;if(c.autoQual&&c.phase==='GARAGE'&&r.q.status==='RUNNING')c.nextRelease=r.time+1;
  }
  else if(command==='fly'){requireCondition(c.phase==='OUT','仅在出场圈选择开始飞行圈');c.outChoice='FLY';}
  else if(command==='return'){
    requireCondition(['OUT','FLY','ABORT'].includes(c.phase),'当前阶段无法选择回站');
    if(c.phase==='OUT')c.outChoice='PIT';else c.afterLap='IN';
  }
  else if(command==='abort'){
    requireCondition(c.phase==='FLY','当前没有飞行圈');c.phase='ABORT';c.lapValid=false;c.afterLap='PIT';event(s,`${driverOf(s,id).code} 放弃本次飞行圈，圈末回 Pit`,'radio');
  }
  else if(command==='repeat'){requireCondition(c.phase==='FLY','当前没有飞行圈');c.afterLap='FLY';c.mode='push';}
  else throw new Error('排位指令无效');
  return '排位指令已确认';
}
function garage(s,c){
  const r=s.race;c.phase='GARAGE';c.progress=0;c.speed=0;c.segmentEnd=NEVER;c.currentLap=0;c.nextRelease=NEVER;
  if((c.teamId!==s.player.teamId||c.autoQual)&&r.time+currentTrack(s).baseTime*2.4<r.q.deadline)c.nextRelease=r.time+between(s,15,45);
}
function qualCrossing(s,c){
  const r=s.race,q=r.q,old=c.phase;
  if(old==='FLY'&&c.lapValid){
    if(c.lastLap<c.stageBest-EPS){c.stageBest=c.lastLap;c.bestAt=r.time;}
    event(s,`${driverOf(s,c.driverId).code} · ${c.lastLap.toFixed(3)} 秒${c.lastLap===r.fastest.time?' · 全场最快':''}`,c.lastLap===r.fastest.time?'fastest':'info');
  }
  if(old==='IN'||old==='ABORT'||(old==='OUT'&&c.outChoice==='PIT')){garage(s,c);return;}
  const canFly=r.time<q.deadline-EPS;
  if((old==='OUT'||(old==='FLY'&&c.afterLap==='FLY'))&&canFly&&c.fuel>r.fuelPerLap*2){
    c.phase='FLY';c.flyAttempted=true;c.consecutive=old==='FLY';c.afterLap=c.teamId!==s.player.teamId||c.autoQual?'FLY':'IN';
  }else c.phase='IN';
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
}
function endQualStage(s){
  const r=s.race,q=r.q,w=s.calendar.weekend;
  const rows=r.cars.filter(c=>q.active.includes(c.driverId)).sort((a,b)=>a.stageBest-b.stageBest||a.bestAt-b.bestAt||Number(b.flyAttempted)-Number(a.flyAttempted)||Number(b.attempted)-Number(a.attempted)||(a.qualRank||a.grid)-(b.qualRank||b.grid)).map(c=>({id:c.driverId,name:c.name,teamId:c.teamId,time:c.stageBest,stage:q.stage,compound:c.compound,noTime:c.stageBest>=9999,sectors:copy(c.bestSectors),achievedAt:c.bestAt}));
  q.stages.push(rows);
  // 107% is shown as a steward-review flag rather than inventing discretionary permission.
  if(q.stage===1&&r.wetness<=.15&&rows[0]?.time<9999)w.review107=rows.filter(x=>x.time>rows[0].time*1.07).map(x=>x.id);
  if(q.stage<3){
    rows.forEach((row,i)=>{const car=r.cars.find(c=>c.driverId===row.id);car.qualRank=i+1;});
    const n=eliminationSize(s.teams.length*2);q.eliminated=rows.slice(-n).concat(q.eliminated);q.active=rows.slice(0,-n).map(x=>x.id);q.status='BREAK';q.breakEnd=r.time+(r.kind==='Q'&&q.stage===2?480:420);q.remaining=q.breakEnd-r.time;
    for(const c of r.cars){c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.progress=0;c.speed=0;}
    event(s,`${r.kind}${q.stage} 结束，${n} 台赛车淘汰；进入节间休息`,'info');
  }else{
    q.done=true;q.status='DONE';r.finished=true;r.running=false;w.grids[r.kind]=rows.concat(q.eliminated).map(x=>x.id);if(r.kind==='Q')w.q3=rows.map(x=>x.id);w.index++;
    for(const c of r.cars){c.phase='GARAGE';c.segmentEnd=NEVER;}
    news(s,`${r.kind} 排位结束：${rows[0]?.name||'无'} 获杆位`);
  }
}
function skipQualBreak(s){requireCondition(s.race?.qualifying&&s.race.q.status==='BREAK','当前没有节间休息');advanceRealtime(s,s.race.q.breakEnd-s.race.time,true);return '节间休息已快进';}
function rescaleControl(s,old,next){
  const rate=x=>x==='SC'?1.45:x==='VSC'?1.35:1,ratio=rate(next)/rate(old);
  for(const c of s.race.cars)if(c.segmentEnd<NEVER&&c.segmentEnd>s.race.time){c.segmentStart=s.race.time-(s.race.time-c.segmentStart)*ratio;c.segmentEnd=s.race.time+(c.segmentEnd-s.race.time)*ratio;c.segmentDuration*=ratio;}
}
function resumeRealtime(s){
  const r=s.race;if(r.qualifying){requireCondition(r.red,'当前没有红旗');r.red=false;r.control='GREEN';for(const c of r.cars)if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,25);return '排位恢复';}
  const old=r.control;resumeRed(s);rescaleControl(s,old,r.control);return '比赛恢复';
}
function advanceRealtime(s,seconds,force=false){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');requireCondition(Number.isFinite(seconds)&&seconds>=0&&seconds<=40000,'时间步长无效');
  if(r.finished||r.red||(!r.running&&!force))return '';
  const target=r.time+seconds;let guard=0;
  while(!r.finished&&!r.red&&r.time<target-EPS&&guard++<100000){
    let next=target;if(!r.qualifying&&r.time<r.timeLimit-EPS)next=Math.min(next,r.timeLimit);
    if(r.qualifying){const q=r.q;if(q.status==='BREAK')next=Math.min(next,q.breakEnd);else if(r.time<q.deadline-EPS)next=Math.min(next,q.deadline);}
    for(const c of r.cars){if(c.retired||c.finished)continue;next=Math.min(next,c.segmentEnd,c.nextRelease,c.phase==='PIT'?c.pitUntil:NEVER);}
    r.time=next;refreshPositions(s);
    if(!r.qualifying&&!r.limitFinishLap&&r.time>=r.timeLimit-EPS){r.limitFinishLap=r.lap+2;event(s,'比赛时限已到，领先者将在下一圈结束时收到方格旗','warning');}
    // Stable ID order makes results independent of rendering cadence and sorted tower order.
    for(const c of r.cars.slice().sort((a,b)=>a.driverId.localeCompare(b.driverId))){
      if(c.retired||c.finished)continue;
      if(c.nextRelease<=r.time+EPS){
        c.nextRelease=NEVER;
        if(r.qualifying){if(r.q.status==='RUNNING'&&r.time<r.q.deadline-EPS&&c.phase==='GARAGE'){
          const preferred=r.wetness>.65?'W':r.wetness>.2?'I':r.kind==='SQ'&&r.q.stage<3?'M':'S',stock=s.calendar.weekend.tyres[c.driverId];
          const type=allowedQualTyres(s,c).find(k=>k===preferred&&(stock[k]>0||c.stageTyre===k))||allowedQualTyres(s,c).find(k=>stock[k]>0||c.stageTyre===k);
          if(type)sendQual(s,c,type,stock[type]>0);
        }}else{c.phase='RACE';c.lapStart=r.time;prepareRaceLap(s,c);startSegment(s,c);}
      }
      if(c.phase==='PIT'&&c.pitUntil<=r.time+EPS){c.phase='RACE';c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];startSegment(s,c);c.sectorStart=c.lapStart;}
      if(c.segmentEnd<=r.time+EPS&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase))completeSector(s,c);
    }
    if(r.qualifying){
      s.calendar.weekend.qualifying=r.q;const q=r.q;if(q.status==='BREAK'&&q.breakEnd<=r.time+EPS){q.stage++;beginQualStage(s);event(s,`${r.kind}${q.stage} 开始`);}
      else if(q.status==='RUNNING'&&r.time>=q.deadline-EPS&&!r.cars.some(c=>c.phase==='FLY'&&!c.retired))endQualStage(s);
      q.remaining=Math.max(0,(q.status==='BREAK'?q.breakEnd:q.deadline)-r.time);
    }else if(r.cars.every(c=>c.finished||c.retired))finishRace(s);
    refreshPositions(s);
  }
  requireCondition(guard<100000,'模拟事件上限已达到');return r.finished?'场次结束':r.red?'红旗暂停':'';
}
function fastForwardLap(s){
  const r=s.race;requireCondition(r?.realtime&&!r.finished,'当前没有实时场次');
  requireCondition(!r.red,'当前红旗暂停，请先恢复场次');
  const leader=r.qualifying?r.cars.find(c=>c.teamId===s.player.teamId&&['FLY','OUT','IN','ABORT'].includes(c.phase))||r.cars.find(c=>['FLY','OUT','IN','ABORT'].includes(c.phase)):r.cars.find(c=>!c.retired&&!c.finished);
  if(!leader){advanceRealtime(s,Math.min(90,r.qualifying?r.q.remaining:90),true);return '已推进比赛时间';}
  const lap=leader.lap;let guard=0;
  while(!r.finished&&!r.red&&!leader.retired&&leader.lap===lap&&guard++<1000){
    const seconds=Math.max(.001,Math.min(leader.phase==='PIT'?leader.pitUntil-r.time:leader.phase==='GRID'?leader.nextRelease-r.time:leader.segmentEnd-r.time,60));advanceRealtime(s,seconds,true);
  }
  return '已快进至本圈结束';
}
function finishRealtime(s){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');
  if(r.qualifying)for(const c of r.cars)if(c.teamId===s.player.teamId){c.autoQual=true;if(c.phase==='GARAGE')c.nextRelease=r.time+1;}
  let guard=0;while(!r.finished&&guard++<1000){if(r.red)resumeRealtime(s);advanceRealtime(s,60,true);}
  requireCondition(r.finished,'自动模拟未能结束');return '场次已模拟完毕';
}

return {PHASE_NAMES, initCar, refreshPositions, startRealtimeRace, attachRealtimeRace, suspendQualifying, startQualifying, allowedQualTyres, qualCommand, skipQualBreak, resumeRealtime, advanceRealtime, fastForwardLap, finishRealtime};
}());

// ===== 文件: js/core/season.js =====
modules['js/core/season.js'] = (function () {
// ===== 文件: js/core/season.js =====
const {
  currentEvent, advanceDays, makeCalendar
} = modules['js/core/calendar.js'];
const {
  income
} = modules['js/core/finance.js'];
const {
  checkBudget, seasonRules
} = modules['js/core/rules.js'];
const {
  aiTransfers
} = modules['js/core/ai.js'];
const {
  initParts
} = modules['js/core/car.js'];
const {
  PARTS
} = modules['js/data/parts.js'];
const {
  clamp, copy, teamOf, teamStandings, driverStandings, news, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  chance, between
} = modules['js/core/rng.js'];
function closeWeekend(s) {
  mutable(s);
  const w=s.calendar.weekend;
  requireCondition(w&&w.index>=w.sessions.length,'比赛周末尚未结束');
  currentEvent(s).completed=true;
  s.calendar.round++;
  s.calendar.weekend=null;
  s.race=null;
  advanceDays(s,3);
  if(s.calendar.round>=s.calendar.events.length)settleSeason(s);
  return s.season.offseason?'赛季结算完成，转会窗已开启':'本站已结算，可安排工厂事务与下一站';
}
function settleSeason(s) {
  requireCondition(!s.season.offseason,'赛季已结算');
  const standings=teamStandings(s),drivers=driverStandings(s);
  s.history.seasons.push({
    year:s.season.year,teams:standings.map(t=>({
      id:t.id,name:t.name,points:t.points,rank:standings.indexOf(t)+1
    })),drivers:drivers.map(d=>({
      id:d.id,name:d.name,points:d.points
    })),playerRank:standings.findIndex(t=>t.id===s.player.teamId)+1
  });
  for(const [i,t]of standings.entries()) {
    income(s,t,Math.max(22,78-i*5.5),'赛季制造商奖金');
    checkBudget(s,t);
    t.previousRank=i+1;
    t.reputation=clamp(t.reputation+(i<4?3:i>=8?-2:0),25,99);
    const target=t.objectives.target;
    const met=i+1<=target||t.objectives.points>0&&t.custom;
    t.confidence=clamp(t.confidence+(met?10:-18));
    for(const id of t.drivers) {
      const d=s.drivers.find(x=>x.id===id);
      d.contract.years=Math.max(0,d.contract.years-1);
    }
    for(const e of s.staff.filter(x=>x.teamId===t.id))e.years=Math.max(0,e.years-1);
  }
  for(const d of s.drivers) {
    d.age++;
    if(d.age>=39&&chance(s,.2+(d.age-39)*.08)) {
      d.retired=true;
      news(s,`${d.name} 宣布赛季结束后退役`);
    }
  }
  aiTransfers(s);
  s.season.offseason=true;
  s.season.nextRules=s.season.year+1===2026?'2026 技术重置：气动收益保留 35%，电能部署权重上升、MGU-H 退出。提前研究以 150% 系数转化。后续赛历沿用 2025，属于架空生涯。':'渐进规则调整：旧规格增益保留 75%，下季研究转化为基础性能。';
  news(s,'赛季结束：奖金到账，转会窗开启。'+s.season.nextRules);
  const p=teamOf(s);
  if(p.confidence<=0&&!s.season.gameOver)s.season.gameOver='连续未达董事会目标，本次经理生涯结束。';
}
function nextSeason(s) {
  mutable(s);
  requireCondition(s.season.offseason,'请先完成当前赛季');
  const player=teamOf(s);
  for(const id of player.drivers) {
    const d=s.drivers.find(x=>x.id===id);
    requireCondition(!d.retired&&d.contract.years>0,'请在转会窗为两位主力续约或签入替代车手');
  }
  requireCondition(s.staff.some(x=>x.teamId===player.id&&x.role==='principal'&&x.years>0),'请为车队领队续约或聘用新领队');
  const year=s.season.year+1,major=year===2026;
  s.season={
    year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
  };
  const events=makeCalendar(year);
  s.calendar={
    events,round:0,weekend:null,day:0,date:`${year}-02-01`
  };
  for(const t of s.teams) {
    const carry={
      ...t.carry
    };
    for(const part of PARTS) {
      const avg=s.parts[t.id].cars.reduce((sum,c)=>sum+c[part.id].gain,0)/2;
      carry[part.dimension]=(carry[part.dimension]||0)+avg;
    }
    for(const key of Object.keys(carry))carry[key]*=major?.35:.75;
    for(const [key,gain]of Object.entries(t.research))carry[key]=(carry[key]||0)+gain*(major?1.5:1);
    t.carry=carry;
    t.research={
    };
    t.projects=[];
    t.points=0;
    t.wins=0;
    t.results=[];
    t.gridPenalties=[0,0];t.pitLaneNext=[false,false];
    t.wind={
      limit:Math.round(180+(t.previousRank-1)*14),used:0
    };
    t.cfd={
      limit:Math.round(240+(t.previousRank-1)*18),used:0
    };
    t.objectives={
      target:t.custom?Math.max(5,t.previousRank-1):Math.max(1,t.previousRank-1),points:0,finish:0,podiums:0
    };
    const f=s.finance[t.id];
    f.capUsed=0;
    f.capLimit=s.season.rules.cap*(s.settings.difficulty==='easy'?1.06:s.settings.difficulty==='hard'?.98:1);
    f.audited=false;
    f.disqualified=false;
    f.rescue=false;
    for(const sp of f.sponsors)sp.paid=0;
    initParts(s,t);
    for(const e of s.staff.filter(x=>x.teamId===t.id&&t.id!==s.player.teamId&&x.years===0))e.years=2;
  }
  for(const d of s.drivers) {
    d.points=0;
    d.results=[];
    d.wins=0;
    d.fastest=0;
    d.fatigue=0;
  }
  s.race=null;
  news(s,`${year} 赛季正式开启${year>2025?'（架空生涯，沿用 2025 赛道与冲刺站点）':''}`);
  return '新赛季已开启';
}

return {closeWeekend, settleSeason, nextSeason};
}());

// ===== 文件: js/core/state.js =====
modules['js/core/state.js'] = (function () {
const { assignDriverCodes, setDriverCode } = modules['js/core/driverCodes.js'];
const { startRealtimeRace, startQualifying, advanceRealtime, qualCommand, skipQualBreak, fastForwardLap, finishRealtime, resumeRealtime } = modules['js/core/realtime.js'];
// ===== 文件: js/core/state.js =====
const {
  seasonTeams
} = modules['js/data/teams.js'];
const {
  DRIVER_DATA, RESERVES
} = modules['js/data/drivers-data.js'];
const {
  STAFF_POOL
} = modules['js/data/staff-data.js'];
const {
  DEPARTMENTS, FACILITIES
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  seedFrom, choose
} = modules['js/core/rng.js'];
const {
  copy, uid, clamp, teamOf, news, requireCondition
} = modules['js/core/helpers.js'];
const {
  seasonRules
} = modules['js/core/rules.js'];
const {
  makeCalendar, enterWeekend, changeSetup, setStrategy, waitDays
} = modules['js/core/calendar.js'];
const {
  initParts, replacePart, fitPart
} = modules['js/core/car.js'];
const {
  initFinance, signSponsor, spend, emergency
} = modules['js/core/finance.js'];
const {
  seedStaff, hireStaff, renewStaff, fireStaff
} = modules['js/core/staff.js'];
const {
  makeDriver, createCustomDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth
} = modules['js/core/drivers.js'];
const {
  startProject, changeProject, upgradeFacility, upgradeDepartment, overrunTesting
} = modules['js/core/rnd.js'];
const {
  practice, qualifying, startRace, raceCommand, tick, resumeRed, simulateToEnd
} = modules['js/core/race.js'];
const {
  closeWeekend, nextSeason
} = modules['js/core/season.js'];
let state=null;
function getState() {
  return state;
}
function setState(value) {
  state=value;
}
function enrichTeam(s,t) {
  Object.assign(t,{
    points:0,wins:0,results:[],confidence:t.custom?65:80,projects:[],research:{
    },carry:{
    },gridPenalties:[0,0],personality:choose(s,['激进','稳健','吝啬','技术优先']),facilities:Object.fromEntries(Object.keys(FACILITIES).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/9),1,5),building:null
    }])),departments:Object.fromEntries(Object.keys(DEPARTMENTS).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/10),1,4),people:t.custom?12:40,supervisor:k==='aero'?'空气动力主管':'部门主管'
    }])),wind:{
      limit:180+(t.previousRank-1)*14,used:0
    },cfd:{
      limit:240+(t.previousRank-1)*18,used:0
    },objectives:{
      target:t.custom?9:Math.max(1,Math.ceil((100-t.performance)/4)),points:0,finish:0,podiums:0
    }
  });
  initParts(s,t);
  initFinance(s,t,t.cash);
  seedStaff(s,t);
  for(const id of t.drivers) {
    const d=s.drivers.find(d=>d.id===id);
    d.teamId=t.id;
  }
}
function createGame(options={
}) {
  const year=Number(options.year||2025);
  requireCondition([2022,2023,2024,2025].includes(year),'请选择内置赛季');
  const difficulty=options.difficulty||'standard';
  requireCondition(DIFFICULTIES[difficulty],'难度无效');
  const seed=String(options.seed||'APEX-2025');
  requireCondition(seed.length<=100,'种子过长');
  const teams=seasonTeams(year,Number(options.alternate??-1));
  const ids=new Set(teams.flatMap(t=>t.drivers).concat(RESERVES[year]));
  const s={
    schemaVersion:3,rng:seedFrom(seed),nextId:0,teams,drivers:Array.from(ids).map(id=>makeDriver(id,year)),staff:[],parts:{
    },finance:{
    },calendar:{
      events:makeCalendar(year),round:0,weekend:null,day:0,date:`${year}-02-01`
    },race:null,season:{
      year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
    },player:{
      teamId:options.custom?'custom':options.teamId||teams[0].id
    },settings:{
      difficulty,seed,speed:1,autosave:true
    },news:[],history:{
      races:[],seasons:[]
    }
  };
  if(options.custom) {
    const name=String(options.name||'Aurora Racing').trim(),abbr=String(options.abbr||'AUR').toUpperCase();
    requireCondition(name.length>0&&name.length<=32&&/^[A-Z]{3}$/.test(abbr),'车队名称 1—32 字，缩写为三个英文字母');
    const color=options.color||'#68e8b5',secondary=options.secondary||'#eff8ff';
    requireCondition(/^#[0-9a-f]{6}$/i.test(color)&&/^#[0-9a-f]{6}$/i.test(secondary),'颜色无效');
    const type=options.type||'customer',supplier=options.supplier||'Mercedes';
    requireCondition(['customer','factory'].includes(type)&&['Mercedes','Ferrari','HondaRBPT','Renault'].includes(supplier),'制造商或供应商无效');
    const names=options.driverNames||['Ren Aoki','Alex Morgan'];
    const age=Number(options.age||21),pace=Number(options.pace||74);
    const selected=options.driverIds||['custom','custom'];
    const customDrivers=names.map((n,i)=> {
      if(selected[i]&&selected[i]!=='custom') {
        const d=s.drivers.find(x=>x.id===selected[i]); requireCondition(d&&!teams.some(t=>t.drivers.includes(d.id)),'所选车手已被占用'); return d;
      }
      return createCustomDriver(s,n,age,pace,i?91:90);
    });
    requireCondition(customDrivers[0].id!==customDrivers[1].id,'两个席位不能使用同一车手');
    teams.push({
      id:'custom',custom:true,name,fullName:name,abbr,color,secondary,hq:'玩家自建总部',type,supplier,drivers:customDrivers.map(d=>d.id),performance:type==='factory'?60:58,cash:type==='factory'?48:55,reputation:38,logo:clamp(Math.floor(Number(options.logo)||0),0,23),previousRank:11
    });
  }
  requireCondition(teams.some(t=>t.id===s.player.teamId),'车队不存在');
  for(const t of teams)enrichTeam(s,t);
  for(const e of STAFF_POOL)s.staff.push({
    ...copy(e),teamId:null
  });
  for(const t of teams) {
    signSponsor(s,t.reputation>=75?'apex':t.reputation>=55?'orbit':'nova',t.id);
    signSponsor(s,'vector',t.id);
  }
  if(options.custom)spend(s,teamOf(s),12,'入场担保金（游戏化）',false);
  news(s,`${year} 赛季开始。你已接管 ${teamOf(s).name}，所有能力与财务数值均为非官方游戏化设计。`);
  assignDriverCodes(s);
  return s;
} // UI 的全部游戏变更只经过此 action 入口；失败时由调用方保留旧状态。
function reduce(s,action,p={
}) {
  requireCondition(s,'请先创建或加载游戏');
  requireCondition(!s.season.gameOver||['autosave','speed','pause'].includes(action),'生涯已结束，请读取存档或新建生涯');
  switch(action) {
    case'enterWeekend':return enterWeekend(s);
    case'wait':return waitDays(s,Number(p.days)||7);
    case'setup':return changeSetup(s,Number(p.slot),p.values);
    case'strategy':return setStrategy(s,p.id,p.plan);
    case'practice':return practice(s);
    case'qualifying':startQualifying(s);return p.all?finishRealtime(s):'排位开始';
    case'startQualifying':return startQualifying(s);
    case'advanceRealtime':return advanceRealtime(s,Number(p.seconds));
    case'qualCommand':return qualCommand(s,p.id,p.command,p.value);
    case'skipQualBreak':return skipQualBreak(s);
    case'mapLabels':s.settings.mapLabels=s.settings.mapLabels==='team'?'all':'team';return '地图标注已切换';
    case'timingGap':requireCondition(['leader','interval'].includes(p.value),'时间差模式无效');s.settings.timingGap=p.value;return '时间差模式已切换';
    case'focusDriver':requireCondition(s.race?.cars.some(c=>c.driverId===p.id),'当前场次没有该车手');s.settings.focusDriver=p.id;return '已切换遥测车手';
    case'driverCode':return setDriverCode(s,p.id,p.value);
    case'startRace':return startRealtimeRace(s);
    case'tick':return s.race?.realtime?fastForwardLap(s):tick(s,p.count||1,!!p.untilEvent);
    case'finishRace':return s.race?.realtime?finishRealtime(s):simulateToEnd(s);
    case'resume':return s.race?.realtime?resumeRealtime(s):resumeRed(s);
    case'command':return raceCommand(s,p.id,p.command,p.value);
    case'closeWeekend':return closeWeekend(s);
    case'project':return startProject(s,p.part,p.kind,Number(p.copies)||2);
    case'projectChange':return changeProject(s,p.id,p.operation);
    case'overrun':return overrunTesting(s);
    case'facility':return upgradeFacility(s,p.id);
    case'department':return upgradeDepartment(s,p.id);
    case'replace':return replacePart(s,Number(p.slot),p.id);
    case'fit':return fitPart(s,p.id,Number(p.slot));
    case'hireStaff':return hireStaff(s,p.id,Number(p.salary),Number(p.years));
    case'renewStaff':return renewStaff(s,p.id,Number(p.salary),Number(p.years));
    case'fireStaff':return fireStaff(s,p.id);
    case'signDriver':return signDriver(s,p.id,Number(p.slot),Number(p.salary),Number(p.years));
    case'renewDriver':return renewDriver(s,p.id,Number(p.salary),Number(p.years));
    case'releaseDriver':return releaseDriver(s,p.id);
    case'train':return trainDriver(s,p.id,p.plan);
    case'youth':return recruitYouth(s);
    case'sellYouth':return sellYouth(s,p.id);
    case'sponsor':signSponsor(s,p.id);
    return'赞助合同已签署';
    case'rescue':return emergency(s);
    case'nextSeason':return nextSeason(s);
    case'pause':requireCondition(s.race&&!s.race.finished,'当前没有进行中的比赛');
    s.race.running=!s.race.running;
    return s.race.running?'比赛继续':'比赛已暂停';
    case'speed':requireCondition([1,2,4,8,10,16,32,64].includes(Number(p.value)),'速度无效');
    s.settings.speed=Number(p.value);
    return'比赛速度已调整';
    case'autosave':s.settings.autosave=!!p.value;
    return'自动存档设置已更新';
    default:throw new Error('未知操作');
  }
}
function dispatch(action,p={
}) {
  // Time updates have validated numeric inputs and no user-supplied transaction.
  if(action==='advanceRealtime')return reduce(state,action,p);
  const before=copy(state);
  try{
    const message=reduce(state,action,p);
    return message;
  }
  catch(e) {
    state=before;
    throw e;
  }
}

return {getState, setState, createGame, reduce, dispatch};
}());

// ===== 文件: js/core/save.js =====
modules['js/core/save.js'] = (function () {
const { assignDriverCodes } = modules['js/core/driverCodes.js'];
const { attachRealtimeRace } = modules['js/core/realtime.js'];
// ===== 文件: js/core/save.js =====
const {
  copy, requireCondition
} = modules['js/core/helpers.js'];
const {
  PARTS
} = modules['js/data/parts.js'];
const {
  TRACKS
} = modules['js/data/tracks.js'];
const PREFIX='apex-manager-v2-';
const SLOT_NAMES={
  auto:'自动存档',1:'手动槽位 1',2:'手动槽位 2',3:'手动槽位 3'
};
function migrate(raw) {
  let s=copy(raw);
  requireCondition(s&&typeof s==='object'&&!Array.isArray(s),'存档必须是对象');
  if(s.schemaVersion===1) {
    s.schemaVersion=2;
    s.history=s.history||{
      races:[],seasons:[]
    };
    s.settings.autosave=true;
    for(const t of s.teams||[])t.carry=t.carry||{
    };
  }
  if(s.schemaVersion===2){s.schemaVersion=3;assignDriverCodes(s);if(s.race&&!s.race.finished)attachRealtimeRace(s);}
  requireCondition(s.schemaVersion===3,'存档版本不受支持（本版本为 3）');
  // Repair the 2.0.0 disabled-second-stop request in saves made before lap one.
  if(s.race?.realtime&&!s.race.qualifying&&!s.race.finished&&Array.isArray(s.race.cars))for(const c of s.race.cars){
    if(c.lap===0&&c.plan?.secondLap===0&&Array.isArray(c.planUsed)&&c.planUsed.includes(1)){
      c.planUsed=c.planUsed.filter(i=>i!==1);
      const manual=Array.isArray(s.race.events)&&s.race.events.some(e=>e.type==='radio'&&e.text?.startsWith(c.name+'：收到进站指令'));
      if(!manual&&c.pitRequest===c.plan.next)c.pitRequest=null;
    }
  }
  return s;
}
function validate(raw) {
  const s=migrate(raw);
  requireCondition(Array.isArray(s.teams)&&s.teams.length>=10&&s.teams.length<=11,'车队数据损坏');
  requireCondition(Array.isArray(s.drivers)&&s.drivers.length>=20&&s.drivers.length<=500,'车手数据损坏');
  requireCondition(Array.isArray(s.staff)&&s.staff.length<=1000,'员工数据损坏');
  requireCondition(Number.isInteger(s.rng)&&s.rng>=0&&s.rng<=4294967295,'随机状态损坏');
  requireCondition(Number.isInteger(s.nextId)&&s.nextId>=0,'对象编号损坏');
  requireCondition(s.player&&s.settings&&s.season&&s.calendar&&s.history&&Array.isArray(s.news),'存档缺少必要字段');
  requireCondition(['easy','standard','hard'].includes(s.settings.difficulty),'难度数据损坏');
  requireCondition(Number.isInteger(s.season.year)&&s.season.year>=2022&&s.season.year<=2200&&s.season.rules,'赛季数据损坏');
  requireCondition(s.teams.some(t=>t.id===s.player.teamId),'玩家车队不存在');
  requireCondition(Array.isArray(s.calendar.events)&&s.calendar.events.length>=22&&s.calendar.events.length<=24&&s.calendar.events.every(e=>TRACKS[e.track]),'赛历损坏');
  requireCondition(Number.isInteger(s.calendar.round)&&s.calendar.round>=0&&s.calendar.round<=s.calendar.events.length&&/^\d{4}-\d{2}-\d{2}$/.test(s.calendar.date),'赛历进度损坏');
  requireCondition(new Set(s.teams.map(t=>t.id)).size===s.teams.length&&new Set(s.drivers.map(d=>d.id)).size===s.drivers.length,'对象编号重复');
  const active=[];
  for(const t of s.teams) {
    const f=s.finance?.[t.id],p=s.parts?.[t.id];
    requireCondition(f&&Number.isFinite(f.cash)&&Number.isFinite(f.capUsed)&&Number.isFinite(f.capLimit)&&f.capLimit>0&&Array.isArray(f.ledger)&&Array.isArray(f.sponsors),'财务数据损坏');
    requireCondition(t.departments&&t.facilities&&t.wind&&t.cfd&&Array.isArray(t.projects)&&Array.isArray(t.results)&&t.objectives&&Array.isArray(t.gridPenalties),'车队管理数据损坏');
    requireCondition(t.drivers?.length===2,'车手阵容损坏');
    for(const id of t.drivers) {
      requireCondition(s.drivers.some(d=>d.id===id&&d.teamId===t.id),'车手归属冲突');
      active.push(id);
    }
    requireCondition(p&&p.cars?.length===2&&Array.isArray(p.stock)&&Array.isArray(p.production),'部件数据损坏');
    for(const car of p.cars)for(const def of PARTS)requireCondition(car[def.id]&&Number.isFinite(car[def.id].wear)&&Number.isFinite(car[def.id].gain),'部件规格损坏');
  }
  requireCondition(new Set(active).size===active.length,'车手重复占位');
  for(const d of s.drivers)requireCondition(typeof d.name==='string'&&d.name.length<=100&&d.attributes&&Object.keys(d.attributes).length>=14&&Object.values(d.attributes).every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&d.contract&&Number.isFinite(d.contract.salary)&&Array.isArray(d.results),'车手属性损坏');
  if(s.calendar.weekend) {
    const w=s.calendar.weekend;
    requireCondition(Array.isArray(w.sessions)&&Number.isInteger(w.index)&&w.index>=0&&w.index<=w.sessions.length&&w.setups&&w.ideal&&w.strategy&&w.confidence&&w.tyres&&w.grids,'周末数据损坏');
    for(const t of s.teams)requireCondition(w.setups[t.id]?.length===2&&w.ideal[t.id]?.length===2&&t.drivers.every(id=>w.tyres[id]&&w.strategy[id]),'周末赛车数据损坏');
  }
  if(s.race)requireCondition(s.calendar.weekend&&Array.isArray(s.race.cars)&&s.race.cars.length===active.length&&s.race.cars.every(c=>active.includes(c.driverId))&&Number.isFinite(s.race.lap)&&s.race.lap<=s.race.totalLaps&&Array.isArray(s.race.events)&&Array.isArray(s.race.penalties),'比赛数据损坏');
  if(s.race?.realtime){
    const r=s.race;requireCondition(Number.isFinite(r.time)&&r.time>=0&&r.cars.every(c=>Number.isFinite(c.segmentEnd)&&Number.isFinite(c.segmentDuration)&&Number.isFinite(c.progress)&&c.progress>=0&&c.progress<=1&&Number.isInteger(c.sector)&&c.sector>=0&&c.sector<=2),'实时计时数据损坏');
    requireCondition(r.cars.every(c=>['GRID','RACE','PIT','GARAGE','OUT','FLY','IN','ABORT','ELIMINATED','FINISHED'].includes(c.phase)&&['segmentStart','segmentEnd','segmentDuration','sectorStart','lapStart','currentLap','speed','progress','totalDistance','nextRelease','pitUntil'].every(k=>Number.isFinite(c[k]))&&c.segmentDuration>=0),'实时赛车状态损坏');
    if(r.qualifying){requireCondition(r.q&&[1,2,3].includes(r.q.stage)&&['RUNNING','BREAK','DONE'].includes(r.q.status),'排位阶段损坏');s.calendar.weekend.qualifying=r.q;}
  }
  requireCondition(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code))&&new Set(s.drivers.map(d=>d.code)).size===s.drivers.length,'车手缩写数据损坏');
  let nodes=0;
  const walk=(x,depth)=> {
    requireCondition(depth<45&&++nodes<1200000,'存档结构超出安全限制');
    if(typeof x==='number')requireCondition(Number.isFinite(x),'存档包含无效数值');
    if(typeof x==='string')requireCondition(x.length<10000,'存档文本异常');
    if(x&&typeof x==='object')for(const [k,v]of Object.entries(x)) {
      requireCondition(!['__proto__','constructor','prototype'].includes(k),'存档包含无效字段');
      walk(v,depth+1);
    }
  };
  walk(s,0);
  return s;
}
function exportText(s) {
  return JSON.stringify({
    format:'APEX_MANAGER',schemaVersion:3,state:s
  },null,2);
}
function importText(text) {
  requireCondition(typeof text==='string'&&text.length<=12*1024*1024,'存档为空或超过 12 MB');
  let data;
  try{
    data=JSON.parse(text);
  }
  catch(e) {
    throw new Error('JSON 无法解析，请检查是否复制完整');
  }
  return validate(data?.format==='APEX_MANAGER'?data.state:data);
}
function storage() {
  try{
    return globalThis.localStorage;
  }
  catch(e) {
    throw new Error('浏览器禁用本地存储，请使用 JSON 导出备份');
  }
}
function saveSlot(s,slot='auto') {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'存档槽位无效');
  try{
    storage().setItem(PREFIX+slot,JSON.stringify({
      format:'APEX_MANAGER',savedAt:new Date().toISOString(),state:s
    }));
    return new Date().toLocaleTimeString('zh-CN',{
      hour12:false
    });
  }
  catch(e) {
    throw new Error('保存失败：存储空间不足或浏览器限制，请导出 JSON 备份');
  }
}
function loadSlot(slot='auto') {
  const text=storage().getItem(PREFIX+slot);
  requireCondition(text,'该槽位暂无存档');
  return importText(text);
}
function slotInfo(slot) {
  try{
    const text=storage().getItem(PREFIX+slot);
    if(!text)return null;
    const d=JSON.parse(text);
    return {
      savedAt:d.savedAt,year:d.state?.season?.year,team:d.state?.teams?.find(t=>t.id===d.state?.player?.teamId)?.name||'未知车队'
    };
  }
  catch(e) {
    return {
      broken:true
    };
  }
}
function deleteSlot(slot) {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'槽位无效');
  storage().removeItem(PREFIX+slot);
}

return {SLOT_NAMES, migrate, validate, exportText, importText, saveSlot, loadSlot, slotInfo, deleteSlot};
}());

// ===== 文件: js/data/logos.js =====
modules['js/data/logos.js'] = (function () {
// ===== 文件: js/data/logos.js =====
const shapes = [ '<circle cx="32" cy="32" r="25"/><path d="M20 42 32 18 44 42Z" fill="var(--secondary)"/>', '<path d="M10 9H54V35L32 57 10 35Z"/><path d="m21 33 11-17 11 17-11 13Z" fill="var(--secondary)"/>', '<path d="m32 4 28 28-28 28L4 32Z"/><circle cx="32" cy="32" r="11" fill="var(--secondary)"/>', '<path d="m32 3 9 18 20 3-15 15 4 21-18-10-18 10 4-21L3 24l20-3Z"/>', '<path d="M4 23h24L45 9l15 23-15 23-17-14H4l16-9Z"/>', '<path d="M3 15 27 26V13h10v13L61 15 47 40 32 54 17 40Z"/>', '<path d="M10 11h44v42H10Z"/><path d="m17 43 15-26 15 26H35l-3-7-4 7Z" fill="var(--secondary)"/>', '<path d="m32 4 25 14v28L32 60 7 46V18Z"/><path d="m19 24 13 19 13-19Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="27"/><path d="M15 27h34v10H15Z" fill="var(--secondary)"/>', '<path d="M7 6h24L18 31h24L27 58H4l13-23H7Z M37 6h21L45 29H25Z"/>', '<path d="M32 4 60 54H4Z"/><path d="m32 22 10 22H22Z" fill="var(--secondary)"/>', '<path d="M7 13h50L47 50H17Z"/><path d="M18 23h28l-5 17H23Z" fill="var(--secondary)"/>', '<path d="M7 32 26 8h12l19 24-19 24H26Z"/><path d="M27 18h10v28H27Z" fill="var(--secondary)"/>', '<path d="M10 7h44v10H20v10h27v10H20v20H10Z"/>', '<path d="M5 16h54L48 29H34v27H20V29H5Z"/>', '<path d="m32 3 8 20 21 9-21 8-8 21-8-21-21-8 21-9Z"/>', '<path d="M7 7h18v50H7Zm32 0h18v50H39Z"/><path d="M25 25h14v14H25Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="25"/><path d="M19 18h26L29 46H17l12-18H19Z" fill="var(--secondary)"/>', '<path d="M4 45 19 15h13L20 45ZM29 45l15-30h16L45 45Z"/>', '<path d="M8 6h48L32 58Z"/><path d="m21 17 11 24 11-24Z" fill="var(--secondary)"/>', '<path d="m32 4 24 24-24 32L8 28Z"/><path d="m19 28 13-12 13 12Z" fill="var(--secondary)"/>', '<path d="M5 12h20v40H5Zm29 0h25L47 32l12 20H34L22 32Z"/>', '<path d="M8 8h48v48H8Z"/><circle cx="32" cy="32" r="16" fill="var(--secondary)"/><circle cx="32" cy="32" r="8"/>', '<path d="M6 28 27 7v17h31v13H27v20L6 36Z"/>' ];
const LOGOS = shapes;
function logo(index=0,color='#67e8c0',secondary='#0b0e13') {
  const valid=/^#[0-9a-f]{6}$/i;
  return `<svg viewBox="0 0 64 64" role="img" aria-label="几何队徽" style="fill:${valid.test(color)?color:'#67e8c0'};--secondary:${valid.test(secondary)?secondary:'#0b0e13'}">${shapes[Math.abs(Number(index)||0)%shapes.length]}</svg>`;
}

return {LOGOS, logo};
}());

// ===== 文件: js/ui/uiKit.js =====
modules['js/ui/uiKit.js'] = (function () {
// ===== 文件: js/ui/uiKit.js =====
const {
  logo
} = modules['js/data/logos.js'];
const h=value=>String(value??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}
[c]));
const money=n=>'$'+Number(n||0).toFixed(2)+'m';
const number=n=>Number(n||0).toFixed(1);
function time(n) {
  if(!Number.isFinite(n)||n>=9000)return '—';
  const ms=Math.round(n*1000),m=Math.floor(ms/60000);
  return `${m}:${((ms-m*60000)/1000).toFixed(3).padStart(6,'0')}`;
}
function icon(id) {
  return VISUAL_ICONS[id]?`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${VISUAL_ICONS[id]}</svg>`:`<svg class="icon" aria-hidden="true"><use href="#i-${h(id)}"></use></svg>`;
}
function badge(text,type='',symbol='') {
  const glyph=symbol||TONE_ICONS[type]||'';
  return `<span class="badge ${h(type)}">${glyph?icon(glyph):''}${h(text)}</span>`;
}
function button(label,action,payload={
},options={
}) {
  return `<button type="button" class="btn ${h(options.class||'')}" data-action="${h(action)}" data-payload="${h(JSON.stringify(payload))}" ${options.disabled?'disabled':''} ${options.reason?`title="${h(options.reason)}"`:''} ${options.confirm?`data-confirm="${h(options.confirm)}"`:''}>${h(label)}</button>${options.disabled&&options.reason?`<small class="disabled-reason">${h(options.reason)}</small>`:''}`;
}
function link(label,route,cls='') {
  return `<a class="btn ${h(cls)}" href="#${h(route)}">${h(label)}</a>`;
}
function header(eyebrow,title,subtitle='',actions='') {
  return `<div class="page-heading"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1>${subtitle?`<p class="muted">${h(subtitle)}</p>`:''}</div><div class="actions">${actions}</div></div>`;
}
function panel(title,body,extra='',cls='') {
  const visual=visualCategory(title);
  return `<section class="panel ${h(cls)}"><div class="panel-heading"><h2><span class="section-icon tone-${visual.tone}">${icon(visual.symbol)}</span>${h(title)}</h2>${extra}</div>${body}</section>`;
}
function progress(value,max=100,label='',options={}) {
  const pct=Math.max(0,Math.min(100,Number(value)/Math.max(.001,Number(max))*100));
  const kind=options.kind||(/疲劳/.test(label)?'wear':/预算帽|已使用/.test(label)?'cap':/士气|信心/.test(label)?'confidence':'');
  const tone=kind?severity(kind==='cap'?pct:Number(value),kind):'accent';
  return `<div class="progress-block tone-${tone}">${label?`<div class="progress-label"><span>${h(label)}</span><strong>${pct.toFixed(0)}%</strong></div>`:''}<div class="progress" role="progressbar" aria-valuenow="${pct.toFixed(0)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;
}
function stat(label,value,note='',cls='') {
  const visual=visualCategory(label);
  return `<div class="stat ${h(cls)}"><div class="stat-heading"><span class="label">${h(label)}</span><span class="stat-symbol tone-${cls==='danger'?'danger':visual.tone}">${icon(visual.symbol)}</span></div><strong>${h(value)}</strong><small>${h(note)}</small></div>`;
}
function teamBadge(t) {
  return `<span class="team-badge">${logo(t.logo,t.color,t.secondary)}<span>${h(t.name)}</span></span>`;
}
function tyre(c) {
  return `<span class="tyre tyre-${h(c)}" data-compound="${h(c)}" title="${h(TYRE_LABELS[c]||c)} ${h(c)}" aria-label="${h(TYRE_LABELS[c]||c)} ${h(c)}">${h(c)}</span>`;
}
function empty(text) {
  return `<div class="empty">${icon('flag')}<p>${h(text)}</p></div>`;
}
function table(headers,rows,id='',cls='',rowClasses=[]) {
  return `<div class="table-scroll"><table ${id?`id="${h(id)}"`:''} class="${h(cls)}"><thead><tr>${headers.map((x,i)=>`<th><button class="sort" data-sort="${i}" aria-label="按${h(x)}排序">${h(x)} <span>↕</span></button></th>`).join('')}</tr></thead><tbody>${rows.map((row,i)=>`<tr${rowClasses[i]?` class="${h(rowClasses[i])}"`:""}>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function field(label,control,note='') {
  return `<label class="field"><span>${h(label)}</span>${control}${note?`<small>${h(note)}</small>`:''}</label>`;
}
function select(name,items,value,attrs='') {
  return `<select name="${h(name)}" ${attrs}>${items.map(x=>{const [key,label,disabled]=Array.isArray(x)?x:[x,x,false];return `<option value="${h(key)}" ${String(key)===String(value)?'selected':''} ${disabled?'disabled':''}>${h(label)}</option>`;}).join('')}</select>`;
}
function carArt(color='#68e8b5') {
  return `<svg class="car-art" viewBox="0 0 600 200" aria-label="赛车俯视示意图" role="img"><defs><linearGradient id="car-shade" x2="0" y2="1"><stop stop-color="${h(color)}"/><stop offset="1" stop-color="#183b35"/></linearGradient></defs><g fill="#121b27" stroke="#526171" stroke-width="2"><rect x="128" y="22" width="66" height="43" rx="10"/><rect x="128" y="135" width="66" height="43" rx="10"/><rect x="402" y="18" width="72" height="48" rx="11"/><rect x="402" y="134" width="72" height="48" rx="11"/></g><g stroke="${h(color)}" fill="none" opacity=".6"><path d="m165 63 85 22m-85 52 85-22m189-50-83 25m83 45-83-25"/></g><g fill="url(#car-shade)" stroke="${h(color)}"><path d="M90 92 220 84 258 60 370 55 422 78 490 82v36l-68 4-52 23-112-5-38-24L90 108Z"/><rect x="76" y="40" width="22" height="120" rx="5"/><rect x="486" y="33" width="24" height="134" rx="4"/><path d="M211 88h78v24h-78Z"/></g><ellipse cx="315" cy="100" rx="35" ry="23" fill="#0b0e13" stroke="#c1f9e8" stroke-width="4"/><ellipse cx="322" cy="100" rx="10" ry="14" fill="#e9eef5"/><path d="M354 83h48m-48 34h48" stroke="#d3fff0" opacity=".5"/><text x="375" y="105" fill="#e6fff7" font-family="system-ui" font-size="15" font-weight="800">F1</text></svg>`;
}
let toastTimer;
function toast(text,type='info') {
  const el=document.querySelector('#toast');
  el.textContent=text;
  el.className='toast visible '+type;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('visible'),4500);
}
function openDialog(title,content,onSubmit=null) {
  const d=document.querySelector('#modal');
  document.querySelector('#modal-title').textContent=title;
  document.querySelector('#modal-body').innerHTML=content;
  const form=d.querySelector('form');
  if(form&&onSubmit)form.addEventListener('submit',e=> {
    e.preventDefault(); onSubmit(new FormData(form));
  });
  d.showModal();
  const first=d.querySelector('input, select, button');
  first?.focus();
  return d;
}
function confirmDialog(message,callback) {
  openDialog('确认操作',`<p class="dialog-copy">${h(message)}</p><div class="actions"><button class="btn" data-close>取消</button><button class="btn primary" id="confirm-yes">确认执行</button></div>`);
  document.querySelector('#confirm-yes').onclick=()=> {
    document.querySelector('#modal').close();
    callback();
  };
} // 所有图表均由原生 Canvas 绘制，尺寸根据 devicePixelRatio 匹配设备像素。
function drawChart(canvas,{
  labels=[],values=[],series=[],colors=[],type='bar',color='#68e8b5'
}={
}) {
  const rect=canvas.getBoundingClientRect(),w=Math.max(240,rect.width),height=canvas.dataset.height?Number(canvas.dataset.height):220,dpr=window.devicePixelRatio||1;
  canvas.width=w*dpr;
  canvas.height=height*dpr;
  canvas.style.height=height+'px';
  const ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,height);
  ctx.font='11px system-ui';
  ctx.lineWidth=1;
  ctx.strokeStyle='#283141';
  ctx.fillStyle='#8d9aaf';
  if(type==='radar') {
    const cx=w/2,cy=height/2,r=Math.min(w*.28,height*.34),n=labels.length;
    for(let ring=1; ring<=4; ring++) {
      ctx.beginPath();
      for(let i=0; i<n; i++) {
        const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*ring/4,y=cy+Math.sin(a)*r*ring/4;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    for(let i=0; i<n; i++) {
      const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*(values[i]||0)/100,y=cy+Math.sin(a)*r*(values[i]||0)/100;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle=color+'30';
    ctx.fill();
    ctx.strokeStyle=color;
    ctx.stroke();
    ctx.fillStyle='#a9b6c8';
    ctx.textAlign='center';
    labels.forEach((l,i)=> {
      const a=i/n*Math.PI*2-Math.PI/2; ctx.fillText(l,cx+Math.cos(a)*(r+30),cy+Math.sin(a)*(r+23)+4);
    });
    return;
  }
  const left=36,bottom=height-30,top=14,right=w-12,max=Math.max(1,...values,...series.flatMap(s=>s.values));
  for(let i=0; i<=4; i++) {
    const y=bottom-(bottom-top)*i/4;
    ctx.beginPath();
    ctx.moveTo(left,y);
    ctx.lineTo(right,y);
    ctx.stroke();
    ctx.fillText((max*i/4).toFixed(0),2,y+4);
  }
  if(type==='line') {
    const lines=series.length?series:[{
      values,color
    }];
    for(const line of lines) {
      ctx.beginPath();
      line.values.forEach((v,i)=> {
        const x=left+i/Math.max(1,line.values.length-1)*(right-left),y=bottom-v/max*(bottom-top); i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.strokeStyle=line.color||color;
      ctx.lineWidth=2;
      ctx.stroke();
    }
  }
  else values.forEach((v,i)=> {
    const width=(right-left)/Math.max(1,values.length),barHeight=v/max*(bottom-top); ctx.fillStyle=colors[i]||color; ctx.fillRect(left+i*width+5,bottom-barHeight,Math.max(2,width-10),barHeight);
  });
  ctx.fillStyle='#8d9aaf';
  ctx.textAlign='center';
  labels.forEach((l,i)=> {
    if(labels.length<16||i%Math.ceil(labels.length/8)===0)ctx.fillText(l,left+(type==='line'?i/Math.max(1,labels.length-1)*(right-left):(i+.5)/Math.max(1,labels.length)*(right-left)),height-9);
  });
}
// 图标均为项目内手绘 SVG；语义色不随车队主色变化。
const VISUAL_ICONS = {
  tyre:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m6 6 2 2m8 8 2 2M6 18l2-2m8-8 2-2"/>',
  stopwatch:'<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m7-1 2 2m-9 3v5l3 2"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  fuel:'<path d="M4 21V4h10v17M2 21h14M6 7h6v5H6m8-5 4 4v7a2 2 0 0 0 4 0v-7l-3-3m0 0v4h3"/>',
  thermometer:'<path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Zm3-7v10"/><circle cx="12" cy="18" r="1"/>',
  rain:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 2 9M7 17l-1 3m6-3-1 3m6-3-1 3"/>',
  pit:'<path d="M3 21V8l9-6 9 6v13M7 21V11h10v10M9 15h6m-6 3h6"/>',
  warning:'<path d="M12 3 2 21h20ZM12 9v5m0 3v1"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  cross:'<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m-8 0 8-8"/>',
  up:'<path d="M12 21V3m-7 7 7-7 7 7"/>',
  down:'<path d="M12 3v18m-7-7 7 7 7-7"/>',
  coins:'<ellipse cx="10" cy="6" rx="7" ry="3"/><path d="M3 6v5c0 4 14 4 14 0V6M3 11v5c0 4 14 4 14 0m3-5v7c0 2-4 3-7 3"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  chart:'<path d="M3 3v18h18M7 16v-4m5 4V7m5 9v-7"/>',
  radio:'<path d="M4 8h16v13H4Zm3-5 12-2M8 12h8M7 17h2m6 0h2"/>',
  wrench:'<path d="M15 3a6 6 0 0 0-7 7l-6 7 5 5 7-7a6 6 0 0 0 7-7l-5 4-4-4Z"/>',
  wind:'<path d="M2 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',
  heart:'<path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8Z"/>',
  battery:'<path d="M3 6h17v12H3Zm17 4h2v4h-2M7 9v6m-3-3h6m4 0h3"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/>',
  star:'<path d="m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/>',
  play:'<path d="m7 3 14 9-14 9Z"/>',
  pause:'<path d="M6 3h4v18H6Zm8 0h4v18h-4Z"/>',
  forward:'<path d="m3 4 9 8-9 8Zm9 0 9 8-9 8Z"/>'
};
const TYRE_CODES = ['S','M','H','I','W'];
const TYRE_LABELS = {S:'软胎',M:'中性胎',H:'硬胎',I:'半雨胎',W:'全雨胎'};
const TONE_ICONS = {success:'check',warning:'warning',danger:'cross',info:'radio',fastest:'stopwatch',pit:'pit'};
function tyreTag(code,showName=true) {
  return `<span class="compound-tag" data-compound="${h(code)}">${tyre(code)}${showName?`<span>${h(TYRE_LABELS[code]||code)}</span>`:''}</span>`;
}
function tyreLegend(codes=TYRE_CODES) {
  return `<div class="tyre-legend" aria-label="轮胎配方颜色图例">${codes.map(code=>tyreTag(code)).join('')}</div>`;
}
function tyreInventory(stock) {
  return `<div class="tyre-inventory" aria-label="新胎库存">${TYRE_CODES.map(code=>`<span class="tyre-stock ${stock[code]>0?'':'depleted'}" data-compound="${code}" title="${TYRE_LABELS[code]}：${Number(stock[code]||0)} 套">${tyre(code)}<span><strong>${Number(stock[code]||0)}</strong><small>${stock[code]>0?'套新胎':'已用尽'}</small></span></span>`).join('')}</div>`;
}
function tyreField(label,name,value,{codes=TYRE_CODES,compact=false}={}) {
  return `<fieldset class="tyre-field ${compact?'compact':''}"><legend>${h(label)}</legend><div class="tyre-options">${codes.map(code=>`<label class="tyre-choice" data-compound="${code}"><input type="radio" name="${h(name)}" value="${code}" ${code===value?'checked':''} aria-label="${h(label+'：'+TYRE_LABELS[code]+' '+code)}" required><span class="tyre-choice-body">${tyre(code)}<span>${TYRE_LABELS[code]}</span>${icon('check')}</span></label>`).join('')}</div></fieldset>`;
}
function severity(value,kind='wear') {
  if(!Number.isFinite(Number(value)))return 'neutral';
  if(kind==='rating')return value>=85?'success':value>=70?'info':value>=55?'warning':'danger';
  if(kind==='confidence')return value<30?'danger':value<55?'warning':'success';
  if(kind==='cap')return value>=100?'danger':value>=85?'warning':'info';
  return value>=85?'danger':value>=65?'warning':'success';
}
function metric(text,tone='neutral',symbol='') {
  return `<span class="metric tone-${h(tone)}">${symbol?icon(symbol):''}<span>${h(text)}</span></span>`;
}
function wearMeter(value) {
  const tone=severity(value);
  return `<div class="wear-meter tone-${tone}">${progress(value,100,'',{kind:'wear'})}<strong>${number(value)}%</strong>${value>=65?icon('warning'):''}</div>`;
}
function lapDisplay(value,{fastest=false,personal=false,label=false}={}) {
  const valid=Number.isFinite(value)&&value>0&&value<9000;
  const tone=valid&&fastest?'fastest':valid&&personal?'success':'neutral';
  return `<span class="lap-value tone-${tone}" ${valid&&fastest?'title="本场全场最快圈"':valid&&personal?'title="个人最佳单圈"':''}>${valid&&fastest?icon('stopwatch'):''}<span>${valid?time(value):'—'}</span>${label&&valid&&fastest?'<small>全场最快</small>':''}</span>`;
}
function rankBadge(position) {
  return `<span class="rank-badge rank-${Number(position)}">${position<=3?icon('trophy'):''}<span>P${Number(position)}</span></span>`;
}
function positionChange(grid,position) {
  const change=Number(grid)-Number(position);
  return Number.isFinite(change)&&change?metric((change>0?'+':'')+change,change>0?'success':'danger',change>0?'up':'down'):metric('持平','neutral');
}
function raceStatus(car) {
  if(car.retired)return badge(car.reason||'已退赛','danger');
  if(car.pitRequest)return `<span class="badge pit">${icon('pit')}进站 ${tyre(car.pitRequest)}</span>`;
  if(car.drs)return badge('DRS 开启','info','bolt');
  if(car.dirty)return badge('脏空气','warning','wind');
  return badge('正常','subtle','check');
}
function flagState(race) {
  const code=race.red?'RED':race.control;
  const names={GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'};
  return `<span class="flag-state flag-${h(code)}" data-race="control" data-control="${h(code)}">${icon('flag')}<span>${h(names[code]||code)}</span></span>`;
}
function eventItem(event) {
  const types={weather:['rain','info','天气'],pit:['pit','pit','进站'],overtake:['up','success','超车'],radio:['radio','info','无线电'],danger:['cross','danger','事故 / 故障'],penalty:['warning','danger','处罚'],warning:['warning','warning','提醒'],info:['flag','neutral','赛况'],fastest:['stopwatch','fastest','最快圈']};
  const [symbol,tone,label]=types[event.type]||types.info;
  return `<div class="event-item tone-${tone}"><span class="event-symbol">${icon(symbol)}</span><div><div class="event-meta"><b>${event.at!==undefined?Math.floor(event.at/60)+':'+String(Math.floor(event.at%60)).padStart(2,'0'):'L'+h(event.lap)}</b><span>${label}</span></div><p>${h(event.text)}</p></div></div>`;
}
function fastestSummary(s,record,attrs='') {
  const driver=s.drivers.find(d=>d.id===record?.driverId);
  return `<div class="fastest-summary" ${attrs}>${icon('stopwatch')}<div><small>全场最快圈</small><strong>${record?.time<9000?time(record.time):'—'}</strong></div><span>${h(driver?.name||'等待有效圈速')}</span></div>`;
}
function visualCategory(label) {
  const rules=[[/轮胎|配方/,'tyre','cyan'],[/最快|圈速/,'stopwatch','fastest'],[/预算帽|合规/,'shield','info'],[/现金|收支|财务|流水|赞助/,'coins','success'],[/信心|士气|目标/,'heart','warning'],[/研发|技术|项目/,'flask','cyan'],[/工厂|设施|制造|部件|车辆/,'wrench','info'],[/天气|气象|雨/,'rain','info'],[/人员|员工|阵容|车手|青训/,'users','info'],[/积分|冠军|荣誉|档案/,'trophy','warning'],[/通讯|新闻|无线电/,'radio','info'],[/比赛|赛历|下一站/,'flag','cyan'],[/存档|备份/,'save','info']];
  const rule=rules.find(([pattern])=>pattern.test(label));
  return rule?{symbol:rule[1],tone:rule[2]}:{symbol:'chart',tone:'neutral'};
}

return {h, money, number, time, icon, badge, button, link, header, panel, progress, stat, teamBadge, tyre, empty, table, field, select, carArt, toast, openDialog, confirmDialog, drawChart, TYRE_CODES, tyreTag, tyreLegend, tyreInventory, tyreField, severity, metric, wearMeter, lapDisplay, rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary};
}());

// ===== 文件: js/ui/dashboard.js =====
modules['js/ui/dashboard.js'] = (function () {
// ===== 文件: js/ui/dashboard.js =====
const {
  teamOf, driverOf, teamStandings
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  h, header, panel, stat, money, badge, progress, link, button, carArt, number
} = modules['js/ui/uiKit.js'];
function dashboard(s) {
  const t=teamOf(s),f=s.finance[t.id],event=currentEvent(s),track=currentTrack(s),rank=teamStandings(s).findIndex(x=>x.id===t.id)+1,w=s.calendar.weekend;
  const active=t.projects.filter(p=>p.status==='researching');
  const objectives=t.objectives;
  return `${header('指挥中心 / '+s.season.year,'车队控制中心','从工厂到终点线，每一次决策都算数。',link(w?'进入比赛周末':'准备下一站','calendar','primary'))}
 <section class="hero"><div class="hero-copy"><p class="eyebrow">${h(t.abbr)} / ${h(t.type==='factory'?'厂商车队':'客户车队')}</p><h2>${h(t.name)}</h2><p>${h(t.hq)}</p><div class="hero-badges">${badge('制造商第 '+rank+' 名','accent')}${badge(t.points+' 积分')}${badge('声望 '+number(t.reputation))}</div></div><div class="hero-visual"><div class="telemetry-grid"></div>${carArt(t.color)}<span class="visual-label">本季赛车 · 规格 ${Math.max(...Object.values(s.parts[t.id].cars[0]).map(x=>x.level))}</span></div></section>
 <div class="stats-grid">${stat('可用现金',money(f.cash),'现金流决定车队生存')}${stat('预算帽余额',money(f.capLimit-f.capUsed),'支出与现金独立核算',f.capUsed>f.capLimit?'danger':'')}${stat('董事会信心',number(t.confidence)+' / 100',t.confidence<30?'董事会要求立即改善':'管理层持续评估赛季表现')}${stat('研发运行中',active.length+' 项',s.parts[t.id].stock.length+' 件新规格待装车')}</div>
 <div class="grid-2"><div>${panel('下一站',event?`<div class="next-race"><span class="round-mark">${String(event.round).padStart(2,'0')}</span><div><p class="eyebrow">${h(event.date)} ${event.sprint?' · 冲刺周末':''}</p><h3>${h(track.name)}大奖赛</h3><p class="muted">${h(track.city)} · ${track.length} km · ${track.laps} 圈</p></div></div><p class="muted">${h(track.notes)}</p><div class="actions">${badge(w?SESSION_NAMES[w.sessions[w.index]]||'等待结算':'赛前工厂阶段','accent')}${link('赛历与策略','calendar')}</div>`:`<p>本赛季已经结束。${h(s.season.nextRules)}</p>${link('前往转会窗','drivers','primary')}`)}
 ${panel('赛季目标',`<div class="objective"><span>制造商前 ${objectives.target}</span>${badge('当前 P'+rank,rank<=objectives.target?'success':'')}</div>${progress(objectives.points, t.custom?1:Math.max(10,150-rank*10),'赛季积分 '+objectives.points)}${progress(objectives.finish,s.calendar.events.length*2,'双车完赛记录 '+objectives.finish)}<p class="muted">${t.custom?'首季优先完成全年运营，争取首个积分。':'持续获得积分、控制现金与预算帽，保持董事会信任。'}</p>`)}
 ${panel('待办提醒',`<ul class="todo"><li>${active.length<2?'研发有空槽，技术中心可以启动新项目。':'研发部门正在执行项目。'}</li><li>${s.parts[t.id].stock.length?'有新规格部件可装车。':'当前没有等待装车的新规格。'}</li><li>${t.drivers.some(id=>driverOf(s,id).contract.years<=1)?'主力车手合同将到期，请安排续约。':'主力车手合同稳定。'}</li><li>${f.cash<20?'现金低于 $20m，可向董事会申请一次紧急注资。':'现金流维持正常。'}</li></ul>`)}</div>
 <div>${panel('性能轮廓',`<canvas data-chart="performance" data-type="radar" data-height="245" aria-label="赛车性能雷达图"></canvas><p class="chart-note">0—100 · 当前一号车装车性能 · 非官方评分</p>`)}${panel('主力阵容',t.drivers.map((id,i)=>{const d=driverOf(s,id);return `<article class="driver-mini"><span class="driver-number">${h(d.number)}</span><div><h3>${h(d.name)}</h3><p class="muted">${h(d.nationality)} · ${d.age} 岁 · 合同 ${d.contract.years} 年</p></div><strong>${number(d.attributes.pace)}</strong><div class="full">${progress(d.morale,100,'士气')}</div></article>`;}).join(''))}${panel('预算帽使用',`<div class="split"><strong>${money(f.capUsed)}</strong><span class="muted">/ ${money(f.capLimit)}</span></div>${progress(f.capUsed,f.capLimit)}<p class="muted">研发、制造、薪资、运营计入；设施与担保金不计入。</p>`)}</div></div>
 ${panel('车队通讯',`<div class="news-list">${s.news.slice(0,8).map(n=>`<div class="news-item"><span class="news-dot ${h(n.type)}"></span><time>${h(n.date)}</time><p>${h(n.text)}</p></div>`).join('')}</div>`,badge('最近 '+Math.min(8,s.news.length)+' 条'))}`;
}

return {dashboard};
}());

// ===== 文件: js/ui/carView.js =====
modules['js/ui/carView.js'] = (function () {
// ===== 文件: js/ui/carView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  performance, replacementCost
} = modules['js/core/car.js'];
const {
  DIMENSIONS, PARTS, partQuota
} = modules['js/data/parts.js'];
const {
  h, header, panel, number, progress, badge, table, money, button, empty, tyreLegend, wearMeter, icon, metric, severity
} = modules['js/ui/uiKit.js'];
function carView(s) {
  const t=teamOf(s),p=s.parts[t.id],blocked=!!s.calendar.weekend;
  return `${header('赛车工程','车辆与部件','磨损不会随新规格重置；部件配额按赛季累计。')}
 <div class="grid-2">${[0,1].map(slot=>{const v=performance(s,t,slot);return panel((slot+1)+' 号车 · '+s.drivers.find(d=>d.id===t.drivers[slot]).name,Object.entries(DIMENSIONS).map(([key,label])=>`<div class="attribute-row"><span>${icon({downforce:'wind',aero:'wind',grip:'tyre',suspension:'wrench',brakes:'shield',power:'bolt',ers:'battery',reliability:'shield',tyres:'tyre',weight:'layers'}[key])}${h(label)}</span>${progress(v[key])}<strong class="tone-${severity(v[key],'rating')}">${number(v[key])}</strong></div>`).join(''));}).join('')}</div>
 ${panel('轮胎磨损预测 · S / M / H',`${tyreLegend(['S','M','H'])}<canvas data-chart="tyres" data-height="220" aria-label="三种干胎的磨损预测曲线"></canvas><p class="muted">横轴：圈数；纵轴：磨损百分比。红 S / 黄 M / 白 H；正常驾驶、干地、当前赛道预测，不影响真实轮胎库存。</p>`)}${[0,1].map(slot=>panel((slot+1)+' 号车部件',table(['部件','规格','磨损','使用 / 配额','更换成本','操作'],PARTS.map(part=>{const item=p.cars[slot][part.id],quota=partQuota(part,s.season.year);return [h(part.name)+(s.season.year>=2026&&part.id==='mguh'?badge('已停用'):''),badge('V'+item.level),wearMeter(item.wear),item.used>quota?badge(item.used+' / '+quota+' · 超额','danger'):item.used===quota?badge(item.used+' / '+quota+' · 已满','warning'):item.used+' / '+(quota===99?'不限':quota),money(replacementCost(part)),button('更换', 'replace',{slot,id:part.id},{disabled:blocked,reason:blocked?'比赛周末内不可更换':'',confirm:`支付更换费用并启用新部件；超配额将使下站罚退 10 位。确认？`})];}),'car-parts-'+slot))).join('')}
 ${panel('升级库存与分配',p.stock.length?table(['部件','规格','性能增益','分配'],p.stock.map(item=>[h(PARTS.find(x=>x.id===item.part).name),badge('V'+item.level),metric('+'+number(item.gain),'success','up'),[0,1].map(slot=>button('装到 '+(slot+1)+' 号车','fit',{id:item.id,slot},{disabled:blocked||p.cars[slot][item.part].level>=item.level,reason:blocked?'请在周末之外装车':p.cars[slot][item.part].level>=item.level?'已装同级或更高规格':''})).join(' ')])):empty('完成研发与制造后，新规格将在这里出现。'))}
 ${panel('制造队列',p.production.length?table(['部件','规格','剩余产能日'],p.production.map(x=>[h(PARTS.find(p=>p.id===x.part).name),'V'+x.level,x.remaining.toFixed(1)+' 天'])):empty('没有生产中的部件。'))}`;
}

return {carView};
}());

// ===== 文件: js/ui/rndView.js =====
modules['js/ui/rndView.js'] = (function () {
// ===== 文件: js/ui/rndView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  projectQuote, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost
} = modules['js/core/rnd.js'];
const {
  PARTS, FACILITIES, DEPARTMENTS
} = modules['js/data/parts.js'];
const {
  h, header, panel, stat, money, number, badge, progress, button, field, select, empty
} = modules['js/ui/uiKit.js'];
function rndView(s) {
  const t=teamOf(s),researchOpen=researchUnlocked(s);
  return `${header('技术中心','把想法变成圈速','研发 → 验证 → 制造 → 单车装配。只生产一套时，升级只能先用于一台车。')}
 <div class="stats-grid">${stat('风洞额度',t.wind.used+' / '+t.wind.limit,'按上赛季排名分配')}${stat('CFD 额度',t.cfd.used+' / '+t.cfd.limit,'研发立项时扣除')}${stat('制造能力',factoryCapacity(t)+' 产能日 / 天','零件按队列依次生产')}${stat('下季研究',researchOpen?'已开放':'尚未开放','赛季进度达到 55% 后开放')}</div>
 <div class="actions test-overrun">${button('违规增加试验额度','overrun',{}, {disabled:!!t.wind.overrun,reason:t.wind.overrun?'本季已被处罚':'',confirm:'违规增加风洞 45 / CFD 60 额度，立即罚款 $5m（不计入预算帽），董事会信心 -10。确认承担处罚？'})}</div><div class="grid-2">${panel('研发项目库',`<form data-form="project" class="form-grid">${field('目标部件',select('part',PARTS.map(p=>[p.id,p.name+(t.type==='customer'&&p.department==='power'?' · 客户不可研制':''),t.type==='customer'&&p.department==='power'||s.season.year>=2026&&p.id==='mguh']),'floor'))}${field('项目方向',select('kind',[['development','本季升级'],['research','下赛季前期研究',!researchOpen]],'development'))}${field('生产套数',select('copies',[[2,'两套 · 双车装配'],[1,'一套 · 单车优先']],2))}<div class="field"><span>立项说明</span><p class="muted">同时运行 ${projectCapacity(t)} 项。费用包含制造预付，失败退还制造部分。</p></div><button class="btn primary" type="submit">核对报价并立项</button></form><div class="project-library">${PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')).map(p=>{const q=projectQuote(s,t,p.id);return `<div class="project-row"><div><strong>${h(p.name)}</strong><small>${h(DEPARTMENTS[p.department])} · V${q.level}</small></div><span>${money(q.cost+q.manufacturing)}</span><span>${q.days} 天</span><span>+${number(q.gain)}</span></div>`;}).join('')}</div>`)}
 ${panel('进行中的项目',t.projects.length?t.projects.slice().reverse().slice(0,16).map(p=>`<article class="project-card"><div class="split"><h3>${h(PARTS.find(x=>x.id===p.part).name)} · V${p.level}</h3>${badge({researching:'研发中',complete:'完成',failed:'失败',cancelled:'已叫停'}[p.status],p.status==='complete'?'success':'')}</div><p class="muted">${p.kind==='research'?'下季研究':'本季升级'} · ${p.copies} 套 · 失败风险 ${number(p.risk*100)}%</p>${progress(p.progress)}<p>剩余 ${Math.max(0,p.remaining).toFixed(1)} 天</p>${p.status==='researching'?`<div class="actions">${button('追加投入','projectChange',{id:p.id,operation:'boost'},{disabled:p.boosted,confirm:'花费原研发费用的 30%，缩短剩余工期 30%，增加失败风险。确认？'})}${button('风险审查','projectChange',{id:p.id,operation:'safe'},{disabled:p.safer,confirm:'花费原研发费用的 15%，降低风险并延长剩余工期。确认？'})}${button('叫停','projectChange',{id:p.id,operation:'cancel'},{class:'danger',confirm:'终止该项目，只退回制造预付，研发支出不退。确认？'})}</div>`:''}</article>`).join(''):empty('选择一个部件，启动第一项研发。'))}</div>
 ${panel('工厂设施',`<div class="facility-grid">${Object.entries(FACILITIES).map(([id,def])=>{const f=t.facilities[id];return `<article class="facility"><div class="split"><h3>${h(def.name)}</h3>${badge('Lv.'+f.level)}</div><p class="muted">${h(def.effect)}</p><p>${money(facilityCost(t,id))} · 不计入预算帽</p>${f.building?`${progress(f.building.total-f.building.remaining,f.building.total)}<p>建造剩余 ${f.building.remaining} 天</p>`:button(f.level>=6?'已满级':'升级设施','facility',{id},{disabled:f.level>=6,confirm:`升级 ${def.name}，支出 ${money(facilityCost(t,id))}，不计入预算帽。确认？`})}</article>`;}).join('')}</div>`)}
 ${panel('研发部门',`<div class="facility-grid">${Object.entries(DEPARTMENTS).map(([id,label])=>{const d=t.departments[id];return `<article class="facility"><h3>${h(id==='power'&&t.type==='customer'?'引擎供应商支持':label)}</h3><p>等级 ${d.level} · ${d.people} 人 · ${h(d.supervisor)}</p>${button('扩编 '+money(departmentCost(t,id)),'department',{id},{disabled:d.level>=6,confirm:'部门扩编计入预算帽。确认支出？'})}</article>`;}).join('')}</div>`)}`;
}

return {rndView};
}());

// ===== 文件: js/ui/staffView.js =====
modules['js/ui/staffView.js'] = (function () {
// ===== 文件: js/ui/staffView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  ROLES, TRAITS
} = modules['js/data/staff-data.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
const {
  h, header, panel, table, money, number, badge, progress, button
} = modules['js/ui/uiKit.js'];
function contract(e,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(e.id)}">${kind==='hireStaff'?'谈判签约':'续约'}</button>`;
}
function staffView(s) {
  const t=teamOf(s),own=s.staff.filter(e=>e.teamId===t.id),market=s.staff.filter(e=>e.teamId!==t.id);
  return `${header('组织与合同','人员管理','所有员工均为虚构人物；岗位能力与特质实际参与研发、设定、进站及成长计算。')}
 <div class="stats-grid">${[['technical','研发主管'],['engineer','比赛工程'],['mechanics','维修区'],['academy','青训']].map(([role,label])=>`<div class="stat"><span class="label">${label}</span><strong>${number(staffAbility(s,t.id,role))}</strong><small>缺编时以 45 能力应急运作</small></div>`).join('')}</div>
 ${panel('现任员工',table(['姓名 / 岗位','能力 / 士气','特质','年薪','合同','忠诚','操作'],own.map(e=>[`<strong>${h(e.name)}</strong><small>${h(ROLES[e.role])}</small>`,`<strong>${number(e.ability)}</strong><small>士气 ${number(e.morale)}</small>`,`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span><small>${h(TRAITS[e.trait].description)}</small>`,money(e.salary),e.years+' 年',number(e.loyalty),contract(e,'renewStaff')+' '+button('解约','fireStaff',{id:e.id},{class:'small danger',confirm:`解约 ${e.name}，支付剩余薪资 50% 的补偿。缺编会降低对应效率。确认？`})]),'own-staff'))}
 ${panel('员工市场与挖角',`<div class="filter-row"><input type="search" data-filter="staff-market" aria-label="搜索员工" placeholder="搜索姓名、岗位、特质或所在车队"><span class="muted">有合同员工需支付 60% 剩余薪资作为违约金</span></div>${table(['姓名','岗位','能力','特质','现任车队','年薪','操作'],market.map(e=>[h(e.name),h(ROLES[e.role]),number(e.ability),`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span>`,h(s.teams.find(t=>t.id===e.teamId)?.name||'自由员工'),money(e.salary),contract(e,'hireStaff')]),'staff-market')}`)}`;
}

return {staffView};
}());

// ===== 文件: js/ui/driversView.js =====
modules['js/ui/driversView.js'] = (function () {
// ===== 文件: js/ui/driversView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  ATTRS
} = modules['js/data/drivers-data.js'];
const {
  h, header, panel, number, money, badge, progress, button, table, select, field, empty
} = modules['js/ui/uiKit.js'];
function contract(d,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(d.id)}">${kind==='signDriver'?'接洽 / 签约':'续约谈判'}</button>`;
}
function card(s,d) {
  return `<article class="driver-card"><div class="driver-top"><span class="driver-number">${h(d.number)}</span><div><p class="eyebrow">${h(d.nationality)} · ${d.age} 岁 ${d.academy?'· 青训':''}</p><h2>${h(d.name)} <small class="tone-info">${h(d.code)}</small></h2></div><span class="rating">${number(d.attributes.pace)}</span></div><form data-form="driverCode" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('三字母缩写',`<input name="value" value="${h(d.code)}" pattern="[A-Za-z]{3}" minlength="3" maxlength="3" required aria-label="车手三字母缩写">`)}<button class="btn small" type="submit">保存缩写</button></form><div class="driver-attributes">${Object.entries(ATTRS).map(([key,label])=>`<div><span>${h(label)}</span><strong>${number(d.attributes[key])}</strong></div>`).join('')}</div><div class="stats-grid compact"><div><small>年薪</small><strong>${money(d.contract.salary)}</strong></div><div><small>剩余合同</small><strong>${d.contract.years} 年</strong></div><div><small>本季积分</small><strong>${d.points}</strong></div></div>${progress(d.morale,100,'士气')}${progress(d.fatigue,100,'疲劳')}<form data-form="train" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('发展计划',select('plan',[['balanced','均衡发展'],['pace','单圈专项'],['tyres','轮胎管理'],['wet','湿地训练'],['rest','恢复体能']],d.plan))}<button class="btn small" type="submit">应用计划</button></form><p class="muted">专项训练 $0.008m/天，计入预算帽。绩效奖金 ${money(d.contract.bonus)}，转会条款 ${(d.contract.buyout*100).toFixed(0)}%。</p><div class="actions">${d.academy?contract(d,'signDriver')+button('出售青训','sellYouth',{id:d.id},{confirm:'出售培养权并让车手进入自由市场，确认？'}):contract(d,'renewDriver')+button('解约','releaseDriver',{id:d.id},{class:'small danger',confirm:'支付剩余合同薪资 50% 解约，由最佳自由替补接替席位。确认？'})}${d.retired?badge('已宣布退役','danger'):''}</div></article>`;
}
function driversView(s) {
  const t=teamOf(s),own=t.drivers.map(id=>s.drivers.find(d=>d.id===id)),youth=s.drivers.filter(d=>d.academy===t.id),market=s.drivers.filter(d=>d.teamId!==t.id&&!d.academy&&!d.retired);
  return `${header('阵容与转会','车手阵容',s.season.offseason?'转会窗已开启：进入下一赛季之前，请确保两位主力拥有有效合同。':'年轻车手通过比赛与训练成长，30 岁后逐步老化。')}
 <div class="grid-2">${own.map(d=>card(s,d)).join('')}</div>
 ${panel('青训学院',youth.length?`<div class="grid-2">${youth.map(d=>card(s,d)).join('')}</div>`:empty('从 F2 / F3 招募年轻车手，发展后提拔或出售。'),button('招募青训 · $1.00m','youth',{}, {disabled:youth.length>=4,reason:youth.length>=4?'青训名额已满':'',confirm:'花费 $1m 招募年轻车手，计入预算帽。确认？'}))}
 ${panel('车手市场',`<div class="filter-row"><input type="search" data-filter="driver-market" placeholder="搜索姓名、国籍或现任车队" aria-label="搜索车手"><span class="muted">有合同车手可挖角；薪资、声望与赛车竞争力影响意愿。</span></div>${table(['车手','国籍 / 年龄','速度','潜力','现任车队','年薪 / 合同','操作'],market.map(d=>[h(d.name),h(d.nationality)+' · '+d.age,number(d.attributes.pace),number(d.attributes.potential),h(s.teams.find(t=>t.id===d.teamId)?.name||'自由车手'),money(d.contract.salary)+' / '+d.contract.years+' 年',contract(d,'signDriver')]),'driver-market')}`)}`;
}

return {driversView};
}());

// ===== 文件: js/ui/financeView.js =====
modules['js/ui/financeView.js'] = (function () {
// ===== 文件: js/ui/financeView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  SPONSORS, SPONSOR_GOALS
} = modules['js/data/sponsors.js'];
const {
  h, header, panel, money, stat, progress, badge, button, table, empty, icon, metric
} = modules['js/ui/uiKit.js'];
function financeView(s) {
  const t=teamOf(s),f=s.finance[t.id];
  return `${header('财务办公室','现金流与预算帽','现金是银行账户；预算帽是合规累计支出。设施建设、罚款和担保金不计入预算帽。')}
 <div class="stats-grid">${stat('银行现金',money(f.cash),'现金小于零会终止本次生涯',f.cash<15?'danger':'')}${stat('计入预算帽',money(f.capUsed),'年度累计支出')}${stat('预算帽上限',money(f.capLimit),'含难度调整 · 非官方平衡值')}${stat('合规状态',f.disqualified?'取消积分资格':f.audited?'已受调查':'正常',f.audited?'风洞 / CFD 额度已削减':'超支将在正赛后接受调查')}</div>
 <div class="grid-2">${panel('预算帽监测',`${progress(f.capUsed,f.capLimit,'已使用')}<p>剩余额度 <strong>${money(f.capLimit-f.capUsed)}</strong></p><p class="muted">研发、生产、更换、人员与车手薪资、运营（含引擎供应 / 自研维护）、专项培养和违约金计入；资金收入不会恢复预算帽额度。</p>${button('申请 $15m 紧急注资','rescue',{}, {disabled:f.rescue||f.cash>=20,reason:f.rescue?'本季已使用援助':f.cash>=20?'现金低于 $20m 时可申请':'',confirm:'获得 $15m 紧急注资，董事会信心 -15，声望 -5。确认？'})}`)}${panel('最近现金收支',`<div class="finance-legend"><span class="tone-success">${icon('up')}收入</span><span class="tone-danger">${icon('down')}支出</span></div><canvas data-chart="finance" data-height="200" aria-label="现金收支图"></canvas>`)}</div>
 ${panel('已签赞助',f.sponsors.length?`<div class="facility-grid">${f.sponsors.map(sp=>`<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><strong class="large-number">${money(sp.annual)} / 年</strong><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}</p><p>本年已付 ${money(sp.paid)}</p></article>`).join('')}</div>`:empty('没有赞助合同。'))}
 ${panel('赞助洽谈',`<div class="facility-grid">${SPONSORS.filter(sp=>!f.sponsors.some(x=>x.id===sp.id)).map(sp=>{const full=f.sponsors.filter(x=>x.kind===sp.kind).length>=(sp.kind==='主赞助'?1:3);return `<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><p>基础年收入 ${money(sp.base)}</p><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}<br>声望要求 ${sp.min}，营销与员工特质提高实际报价。</p>${button('签署赞助','sponsor',{id:sp.id},{disabled:t.reputation<sp.min||full,reason:full?'该类赞助席位已满':t.reputation<sp.min?'声望不足':'',confirm:'签署本年度赞助合同，收入按日分期发放。确认？'})}</article>`;}).join('')}</div>`)}
 ${panel('财务流水',table(['模拟日','交易说明','金额','计入预算帽'],f.ledger.slice(0,100).map(item=>[item.day,h(item.label),`<strong class="metric ${item.amount>=0?'positive':'negative'}">${icon(item.amount>=0?'up':'down')}${item.amount>=0?'+':''}${money(item.amount)}</strong>`,badge(item.cap?'计入':'不计入',item.cap?'info':'subtle',item.cap?'shield':'')]),'finance-ledger'))}`;
}

return {financeView};
}());

// ===== 文件: js/ui/calendarView.js =====
modules['js/ui/calendarView.js'] = (function () {
// ===== 文件: js/ui/calendarView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  trackForYear
} = modules['js/data/tracks.js'];
const {
  SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  h, header, panel, badge, button, field, select, link, table, number, empty, tyreField, tyreInventory, tyreLegend, icon
} = modules['js/ui/uiKit.js'];
function calendarView(s) {
  const t=teamOf(s),event=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  let body='';
  if(s.season.offseason) {
    body=panel('转会窗与技术规则',`<p>${h(s.season.nextRules)}</p><p>请续约车手与领队，或签入替代人选。现金及研发技术储备延续，部件配额和预算帽在新赛季重置。</p><div class="actions">${link('车手转会','drivers')}${link('员工合同','staff')}${button('进入下一赛季','nextSeason',{}, {class:'primary',confirm:'确认阵容后进入下一赛季。未交付的本季项目将取消，不退回费用。确认？'})}</div>`);
  }
  else if(event) {
    body=panel('R'+String(event.round).padStart(2,'0')+' · '+track.name,`<div class="stats-grid compact"><div><small>比赛日期</small><strong>${h(event.date)}</strong></div><div><small>距离</small><strong>${track.length} km × ${track.laps} 圈</strong></div><div><small>维修区</small><strong>${track.pitSpeed} km/h · ${track.pitLength}m</strong></div><div><small>进站通行损失</small><strong>${track.pitLoss} 秒 + 停站</strong></div></div><p class="muted">${w?'发车路面积水预估 '+number((w.weatherStart||0)*100)+'% · ':''}${h(track.notes)} · DRS ${track.drs} 区 · 轮胎磨耗 ×${track.wear} · 降雨倾向 ${number(track.rain*100)}%</p>${w?`<div class="session-strip">${w.sessions.map((x,i)=>`<span class="${i<w.index?'done':i===w.index?'current':''}">${i<w.index?'✓ ':''}${h(SESSION_NAMES[x])}</span>`).join('')}</div><div class="actions">${w.index>=w.sessions.length?button('完成本站结算','closeWeekend',{}, {class:'primary'}):link('进入比赛指挥','race','primary')}</div>`:`<div class="actions">${button('进入比赛周末','enterWeekend',{}, {class:'primary'})}${button('推进工厂 7 天','wait',{days:7})}</div><p class="muted">进入周末会自动推进至赛前两天，并结算工厂、训练、薪资和赞助。期间阵容与新部件登记将锁定。</p>`}`);
    if(w) {
      const current=w.sessions[w.index];
      if(current?.startsWith('FP'))body+=panel('练习与设定采集',`<div class="grid-2">${t.drivers.map((id,slot)=>`<form data-form="setup" class="setup-form"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><input type="hidden" name="slot" value="${slot}">${['前翼角度','尾翼角度','悬挂软硬','胎压 / 能量倾向'].map((label,i)=>{const c=w.confidence[t.id][slot][i];return field(label,`<div class="range-row"><input type="range" name="v${i}" min="0" max="100" value="${w.setups[t.id][slot][i]}" aria-label="${h(label)}"><output>${Math.round(w.setups[t.id][slot][i])}</output></div>`,`采集置信区间 ${number(c.low)}—${number(c.high)}，非精确最优值`);}).join('')}<button type="submit" class="btn">保存设定</button></form>`).join('')}</div><div class="actions">${button('执行 '+SESSION_NAMES[current],'practice',{}, {class:'primary'})}</div>`);
      body+=panel('策略工作台',`${tyreLegend()}<div class="grid-2">${t.drivers.map(id=>{const p=w.strategy[id];return `<form data-form="strategy" class="setup-form"><input type="hidden" name="id" value="${h(id)}"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><div class="form-grid">${tyreField('起步轮胎','start',p.start)}${field('计划首停',`<input name="pitLap" type="number" min="1" max="${track.laps}" value="${p.pitLap}" required>`)}${field('第二次进站（0 为取消）',`<input name="secondLap" type="number" min="0" max="${track.laps}" value="${p.secondLap}" required>`)}${tyreField('进站新胎','next',p.next)}${field('备选方案',select('backup',[['A','A · 严格执行窗口'],['B','B · 安全车低价停站'],['C','C · 自动应对降雨']],p.backup))}${tyreField('雨胎预案','rain',p.rain,{codes:['I','W']})}</div><label class="check"><input type="checkbox" name="auto" ${p.auto?'checked':''}>工程师自动管理比赛策略</label><p class="muted">${s.season.year>=2025&&track.id==='monaco'?'摩纳哥要求至少两次停站。':'干燥正赛必须使用至少两种干胎；雨战豁免。'}</p><div class="inventory-heading">${icon('tyre')}新胎库存</div>${tyreInventory(w.tyres[id])}<button type="submit" class="btn">保存策略</button></form>`;}).join('')}</div>`);
    }
  }
  return `${header('赛历与准备','比赛周末',s.season.year>2025?'架空生涯使用 2025 赛历，技术规则在 2026 进入游戏化新规模型。':'按历史实际举行的赛历：2022 / 2023 共 22 站，2024 / 2025 共 24 站。')}${body}${panel('完整赛历',table(['站次','大奖赛','城市','日期','赛制','状态 / 冠军'],s.calendar.events.map((e,i)=>{const tr=trackForYear(e.track,Math.min(s.season.year,2025));return [String(i+1).padStart(2,'0'),h(tr.name),h(tr.city),h(e.date),badge(e.sprint?'冲刺':'标准',e.sprint?'accent':''),e.completed?'✓ '+h(e.result?.rows[0]?.name||'完成'):badge(i===s.calendar.round?'下一站':'待举行',i===s.calendar.round?'accent':'')];}),'season-calendar'))}`;
}

return {calendarView};
}());

// ===== 文件: js/ui/liveData.js =====
modules['js/ui/liveData.js'] = (function () {
// Pure display calculations. These never advance the simulation or consume RNG.
function timingGap(s,c,baseTime){
  const r=s.race;
  if(c.retired)return 'OUT';
  if(r.qualifying)return c.stageBest>=9999?'NO TIME':r.fastest.time===c.stageBest?'LEADER':'+'+(c.stageBest-r.fastest.time).toFixed(3);
  const active=r.cars.filter(x=>!x.retired).slice().sort((a,b)=>a.position-b.position),index=active.findIndex(x=>x.driverId===c.driverId);
  if(index<=0)return s.settings.timingGap==='interval'?'INTERVAL':'LEADER';
  const reference=s.settings.timingGap==='interval'?active[index-1]:active[0];
  const distance=Math.max(0,reference.totalDistance-c.totalDistance),laps=Math.floor(distance+1e-8);
  return laps>0?'+'+laps+' LAP':'+'+(distance*baseTime).toFixed(3);
}
const intersects=(a,b,gap=5)=>a.x<b.x+b.width+gap&&a.x+a.width+gap>b.x&&a.y<b.y+b.height+gap&&a.y+a.height+gap>b.y;
function layoutMapLabels(markers,previous={},reserved=[]){
  const width=76,height=36,placed=reserved.slice(),result=[];
  for(const marker of markers){
    const {id,x,y}=marker,candidates=[];
    if(previous[id])candidates.push(previous[id]);
    for(let ring=0;ring<8;ring++){
      const dx=14+ring*42,dy=12+ring*40;
      candidates.push([dx,-height/2],[-width-dx,-height/2],[-width/2,-height-dy],[-width/2,dy],
        [dx,-height-dy],[-width-dx,-height-dy],[dx,dy],[-width-dx,dy]);
    }
    // A bounded grid guarantees a place even when the whole field shares one point.
    for(let yy=10;yy<=740-height-10;yy+=height+8)for(let xx=10;xx<=800-width-10;xx+=width+8)candidates.push([xx-x,yy-y]);
    let best=null;
    for(const [dx,dy]of candidates){
      const box={x:Math.max(8,Math.min(800-width-8,x+dx)),y:Math.max(8,Math.min(740-height-8,y+dy)),width,height};
      if(placed.some(p=>intersects(box,p)))continue;
      if(markers.some(p=>p.x>=box.x-9&&p.x<=box.x+width+9&&p.y>=box.y-9&&p.y<=box.y+height+9))continue;
      best=box;break;
    }
    if(!best)best={x:8,y:8,width,height};
    placed.push(best);result.push({id,...best,dx:best.x-x,dy:best.y-y});
  }
  return result;
}

return {timingGap, layoutMapLabels};
}());

// ===== 文件: js/ui/liveView.js =====
modules['js/ui/liveView.js'] = (function () {
const { timingGap, layoutMapLabels } = modules['js/ui/liveData.js'];
const { teamOf, driverOf } = modules['js/core/helpers.js'];
const { currentTrack } = modules['js/core/calendar.js'];
const { PHASE_NAMES, allowedQualTyres } = modules['js/core/realtime.js'];
const { geometry, trackPoint, SECTOR_ENDS } = modules['js/core/trackGeometry.js'];
const { MODES, ENGINES } = modules['js/data/parts.js'];
const { SESSION_NAMES } = modules['js/data/i18n.js'];
const { h, header, panel, badge, button, icon, time, number, tyre, tyreInventory, tyreField, select, lapDisplay, flagState, fastestSummary, eventItem, wearMeter, table } = modules['js/ui/uiKit.js'];
function clock(seconds,countdown=true){const n=Math.max(0,countdown?Math.ceil(seconds):Math.floor(seconds));return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
function phase(c){return c.retired?'退赛':PHASE_NAMES[c.phase]||c.phase;}
function phaseTone(c){return c.retired?'danger':c.phase==='FLY'?'success':c.phase==='OUT'?'info':['PIT','IN','ABORT'].includes(c.phase)?'warning':'neutral';}
function focused(s){return s.race.cars.find(c=>c.driverId===(s.settings.focusDriver||teamOf(s).drivers[0]))||s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0])||s.race.cars[0];}
function sectorTone(c,i){return c.phase==='ABORT'?'neutral':c.sectorTones[i]||c.lastSectorTones?.[i]||'neutral';}
function sectorValue(c,i){return c.sectors[i]||c.lastSectors[i]||0;}
function sectorSpeed(c,i){return c.sectorSpeeds[i]||c.lastSectorSpeeds[i]||0;}
function timingCells(s,c){
  const r=s.race,d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  const code=`<div class="tower-driver"><span class="tower-position" aria-label="第 ${c.position} 名">${c.position}</span><button class="driver-code" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}" title="${h(d.name)}" aria-label="聚焦 ${h(d.code+' '+d.name)}">${h(d.code)}</button></div>`;
  if(!r.qualifying)return {driver:code,gap:`<span class="tower-gap ${c.retired?'tone-danger':''}">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
  return {driver:code+`<small class="phase-label tone-${phaseTone(c)}">${h(phase(c))}</small>`,best:lapDisplay(c.stageBest,{fastest:r.fastest.driverId===c.driverId}),gap:`<span class="tower-gap">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
}
function timingRow(s,c){return `<tr data-car="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(timingCells(s,c)).map(([k,v])=>`<td data-cell="${k}">${v}</td>`).join('')}</tr>`;}
function gapControls(s){return `<div class="gap-controls" role="group" aria-label="时间差显示模式">${['leader','interval'].map(value=>`<button class="btn small ${((s.settings.timingGap||'leader')===value)?'selected':''}" data-action="timingGap" data-payload="${h(JSON.stringify({value}))}" aria-pressed="${(s.settings.timingGap||'leader')===value}" title="${value==='leader'?'相对第一名的差距':'相对前一名的差距'}">${value.toUpperCase()}</button>`).join('')}</div>`;}
function weatherSummary(s){
  const r=s.race,track=currentTrack(s),rain=r.rain||0;
  const name=rain>.65?'大雨':rain>.2?'降雨':rain>.05?'小雨':r.wetness>.15?'雨停 · 路面湿滑':'晴朗 / 干燥';
  return `<div class="live-weather" aria-label="实时天气"><div class="weather-current">${icon(rain>.05?'rain':'thermometer')}<strong>${name}</strong></div><div class="weather-facts"><span>路面积水 <b>${number(r.wetness*100)}%</b></span><span>路温 <b>${track.temp}°C</b></span></div></div>`;
}
function controlBanner(s){
  const r=s.race,code=r.red?'RED':r.chequered?'CHEQUERED':r.control==='YELLOW'||r.yellow?'YELLOW':r.control;
  const labels={GREEN:['TRACK CLEAR','赛道开放'],YELLOW:['YELLOW FLAG','黄旗 · 注意减速，禁止超车'],SC:['SAFETY CAR','安全车出动 · 禁止超车'],VSC:['VIRTUAL SAFETY CAR','虚拟安全车 · 减速行驶'],RED:['RED FLAG','红旗暂停 · 等待恢复'],CHEQUERED:['CHEQUERED FLAG','方格旗 · 等待其余车手冲线']};
  const [title,description]=labels[code]||labels.GREEN;
  return `<div class="tower-control control-${h(code)}" role="status" aria-live="polite"><span class="control-symbol">${icon('flag')}</span><div><strong>${title}</strong><span>${description}</span></div></div>`;
}
function trackSvg(s){
  const track=currentTrack(s),g=geometry(track.id),start=trackPoint(track.id,0),end=trackPoint(track.id,.98),out=trackPoint(track.id,.02);
  return `<svg id="track-map" viewBox="0 0 800 740" aria-label="${h(track.name)}赛道实时位置，点击三字母缩写查看车手" role="group"><defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#91a7bb" stroke-opacity=".035"/></pattern></defs><rect width="800" height="740" fill="url(#map-grid)"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-shadow"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-line"/>
    <path class="pit-lane" d="M${end.join(',')} Q${start[0]+40},${start[1]+40} ${out.join(',')}"/><text x="${start[0]+27}" y="${start[1]+48}" class="map-small">PIT</text><g transform="translate(${start.join(',')})"><rect x="-7" y="-9" width="14" height="18" fill="#e8eef6"/><path d="M-7-9H0V0H7V9H0V0H-7Z" fill="#121a25"/><text x="12" y="-13" class="map-small">START / FINISH</text></g>
    ${[.32,.68].map((f,i)=>{const p=trackPoint(track.id,f);return `<g transform="translate(${p.join(',')})"><circle r="7" fill="${i?'#67b9ff':'#d1a0ff'}"/><text x="12" y="-12" class="sector-label">S${i+1} / S${i+2}</text></g>`;}).join('')}
    ${s.race.cars.map(c=>{const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);return `<a data-dot="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" tabindex="0" role="button" aria-label="${h(d.code+' '+d.name)}"><title>${h(d.name+' · '+t.name)}</title><circle class="dot-hit" r="18" fill="transparent"/><circle class="dot-halo" r="16"/><circle class="driver-dot" r="8" fill="${c.slot?'#101925':t.color}" stroke="${t.color}" stroke-width="${c.slot?4:2}"/><line class="dot-connector" stroke="${t.color}"/><g class="dot-label-wrap"><rect class="dot-label-bg" width="76" height="36" rx="5"/><text class="dot-label" x="38" y="18" text-anchor="middle" dominant-baseline="central" fill="${t.color}">${h(d.code)}</text></g></a>`;}).join('')}</svg>`;
}
function telemetry(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  return `<div class="map-telemetry" id="map-telemetry" data-focused-driver="${h(c.driverId)}" style="--team:${t.color}"><div class="telemetry-title"><strong data-focus="code">${h(d.code)}</strong><div><b data-focus="name">${h(d.name)}</b><small><span data-focus="team">${h(t.name)}</span> · <span data-focus="phase">${phase(c)}</span></small></div><span data-focus="tyre">${tyre(c.compound)}</span></div><div class="live-numbers"><div><small>当前圈计时</small><b data-focus="lap">${time(c.currentLap)}</b></div><div><small>模拟实时速度</small><b><span data-focus="speed">${number(c.speed)}</span><em> km/h</em></b></div></div><div class="sector-grid">${[0,1,2].map(i=>`<div data-sector="${i}" class="sector-box tone-${sectorTone(c,i)}"><small>S${i+1}<span data-sector-current="${i}"></span></small><b data-sector-time="${i}">${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</b><span><strong data-sector-speed="${i}">${number(sectorSpeed(c,i))}</strong> km/h 均速</span></div>`).join('')}</div><div class="telemetry-foot"><span>上圈 <b data-focus="last">${time(c.lastLap)}</b></span><span>最佳 <b data-focus="best">${time(c.best)}</b></span><span>已完成 <b data-focus="completed">${c.lap}</b> 圈</span></div></div>`;
}
function command(s,c){
  const r=s.race,d=driverOf(s,c.driverId),q=r.qualifying,id=c.driverId;
  return `<article class="live-command" data-command-car="${h(id)}"><div class="split"><h3><span class="driver-chip">${h(d.code)}</span> ${h(d.name)}</h3><span data-live="phase">${badge(phase(c),phaseTone(c))}</span></div><div class="car-health"><span>${icon('fuel')}<b data-live="fuel">${number(c.fuel)}</b> kg</span><span>${icon('thermometer')}<b data-live="temp">${number(c.tyreTemperature)}</b>°C</span></div><div data-live="wear">${wearMeter(c.tyreWear)}</div>
    ${q?`<form data-form="qualSend"><input name="id" value="${h(id)}" type="hidden">${tyreField('出场配方','compound',allowedQualTyres(s,c)[0],{compact:true})}<div class="inline-form">${select('fresh',[['new','使用新胎'],['reuse','复用本段轮胎']],'new','aria-label="选择新胎或复用轮胎"')}<button class="btn primary" type="submit" data-q-send>驶出车库</button></div></form><div class="qual-commands">${button('出场圈后 → 飞行圈','qualCommand',{id,command:'fly'},{class:'small'})}${button('出场圈后 → 回 Pit','qualCommand',{id,command:'return'},{class:'small'})}${button('放弃飞行圈 → 回 Pit','qualCommand',{id,command:'abort'},{class:'small danger'})}${button('完成后 → 回场圈','qualCommand',{id,command:'return'},{class:'small'})}${button('完成后 → 再推一圈','qualCommand',{id,command:'repeat'},{class:'small'})}${button('自动出场：'+(c.autoQual?'开':'关'),'qualCommand',{id,command:'auto'},{class:'small'})}</div><p class="command-intent" data-live="intent"></p>`:
    `<label class="field"><span>驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(id)}"`)}</label><label class="field"><span>引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(id)}"`)}</label><form data-form="pit"><input name="id" value="${h(id)}" type="hidden">${tyreField('下一次过线进站','value','H',{compact:true})}<div class="actions"><button class="btn primary small" type="submit">${icon('pit')}确认进站</button>${button('取消','command',{id,command:'cancelPit'},{class:'small'})}</div></form><p class="command-intent" data-live="intent"></p>`}
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[id])}</div></article>`;
}
function liveView(s){
  const r=s.race,track=currentTrack(s),q=r.qualifying,c=focused(s);
  return `${header('LIVE TIMING / 比赛指挥',track.name+' · '+SESSION_NAMES[r.kind],q?'出场圈 → 飞行圈 → 回场圈。倒计时结束后，只能完成已开始的飞行圈。':'连续比赛时钟 · 车手独立计时 · 默认 1× 为现实时间',`<span class="live-indicator">LIVE</span>`)}
    <div class="live-toolbar"><div class="session-clock"><small>${q?r.kind+r.q.stage+' · '+(r.q.status==='BREAK'?'节间休息':'剩余时间'):'已用时间'}</small><strong data-live-clock>${clock(q?r.q.remaining:r.time,q)}</strong></div><div class="live-lap"><strong data-live-lap>${q?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps)}</strong><small>${q?(r.kind==='SQ'?'12 / 10 / 8 MIN':'18 / 15 / 12 MIN'):' / '+r.totalLaps}</small></div>${flagState(r)}<div id="toolbar-weather">${weatherSummary(s)}</div><div class="speed-controls">${[1,2,4,8,16,32,64].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('快进一圈','tick',{}, {class:'small'})}${q?button('跳过节间休息','skipQualBreak',{}, {class:'small',disabled:r.q.status!=='BREAK'}):''}${button('自动完成','finishRace',{}, {class:'small',confirm:'按当前策略自动完成本场次；排位期间由 AI 安排本队出场。确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div class="broadcast-grid"><section class="panel live-tower"><div id="tower-race-control">${controlBanner(s)}</div><div class="panel-heading"><h2>${icon('stopwatch')}实时排名</h2>${q?'<span class="muted">排位成绩</span>':gapControls(s)}</div><div class="table-scroll"><table class="broadcast-timing ${q?'qualifying-timing':'race-timing'}"><colgroup>${q?'<col style="width:32%"><col style="width:30%"><col style="width:24%"><col style="width:14%">':'<col style="width:41%"><col style="width:43%"><col style="width:16%">'}</colgroup><thead><tr>${q?'<th>车手</th><th>最佳圈</th><th>差距</th><th>轮胎</th>':`<th>车手</th><th data-gap-heading>${s.settings.timingGap==='interval'?'INTERVAL':'LEADER'}</th><th>轮胎</th>`}</tr></thead><tbody id="timing-body">${r.cars.map(x=>timingRow(s,x)).join('')}</tbody></table></div><p class="tower-note">${q?'点击车手查看遥测':'时间差 / 秒 · 点击任意一行聚焦车手'}</p></section>
    <section class="panel track-panel"><div class="map-heading"><div><p class="eyebrow">CIRCUIT TRACKER</p><h2>${h(track.city)}</h2></div><span>${track.length.toFixed(3)} KM · ${track.corners} TURNS</span></div>${trackSvg(s)}<div class="map-caption"><span>● 实心 / 空心：同队两台赛车</span><span>计时线示意 ${button('标注：'+(s.settings.mapLabels==='team'?'本队':'全场'),'mapLabels',{}, {class:'small map-label-toggle'})}</span></div>${telemetry(s,c)}</section>
    <aside class="live-commands"><h2>${icon('radio')}车队无线电</h2>${r.cars.filter(x=>x.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(x=>command(s,x)).join('')}</aside></div>
    <div class="grid-2">${panel('赛事消息',`<div id="race-events" class="race-events">${r.events.slice(0,10).map(eventItem).join('')}</div>`)}${panel(q?'排位规则与状态':'比赛策略',q?`<p>${s.teams.length*2} 台赛车，前两段各淘汰 ${s.teams.length===11?6:5} 台，最后 10 台争夺杆位。无有效圈显示 NO TIME。</p><p>${r.kind==='SQ'?'干地 SQ1 / SQ2 每段只允许一套新中性胎，SQ3 一套软胎。':'成绩相同时，先做出该成绩者排名靠前。Q1 / Q2 之间休息 7 分钟，Q2 / Q3 之间休息 8 分钟。'}</p><p class="muted">${r.kind==='SQ'?'冲刺排位各段之间休息 7 分钟。':'107% 超时将标记为待裁判审查，游戏默认允许发车。'}飞行圈默认完成后回场；可提前选择连续推进。${r.q.status==='BREAK'?'本段已结束，可等待倒计时或跳过休息。':''}</p><details><summary>已完成各段成绩</summary>${r.q.stages.map((rows,i)=>`<h3>${r.kind}${i+1}</h3>${table(['名次','车手','时间'],rows.map((x,j)=>[j+1,h(driverOf(s,x.id).code),time(x.time)]))}`).join('')||'暂无'}</details>`:`<p>正赛干地须实际使用两种干胎；使用过雨胎可豁免。${track.id==='monaco'&&s.season.year>=2025?'摩纳哥至少两次停站。':''}</p><p class="muted">绿色旗帜下可使用 DRS；雨地、安全车与虚拟安全车期间禁用。出站损失计入连续比赛时间。离开此页面、切换到后台或打开对话框时暂停推进。</p>`)}</div>${raceDetails(s)}`;
}
const setText=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
const setHtml=(el,value)=>{if(el&&el._liveHTML!==value){el.innerHTML=value;el._liveHTML=value;}};
function patchLive(s){
  const r=s.race,track=currentTrack(s),body=document.querySelector('#timing-body');if(!body)return;
  // Throttle only race/sprint gap text by real elapsed time, independent of simulation speed.
  // A new table or a LEADER / INTERVAL switch receives a fresh reading immediately.
  const now=globalThis.performance.now(),gapMode=s.settings.timingGap||'leader';
  const refreshGaps=r.qualifying||body._gapMode!==gapMode||now-(body._gapUpdatedAt??-Infinity)>=500;
  if(refreshGaps){body._gapUpdatedAt=now;body._gapMode=gapMode;}
  setHtml(document.querySelector('#toolbar-weather'),weatherSummary(s));setHtml(document.querySelector('#tower-race-control'),controlBanner(s));
  setText(document.querySelector('[data-live-clock]'),clock(r.qualifying?r.q.remaining:r.time,r.qualifying));
  setText(document.querySelector('[data-live-lap]'),r.qualifying?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps));
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag){flag.className='flag-state flag-'+code;setHtml(flag,`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);}
  const cells=new Map([...body.children].map(el=>[el.dataset.car,el])),markers=[];
  setText(document.querySelector('[data-gap-heading]'),s.settings.timingGap==='interval'?'INTERVAL':'LEADER');
  for(const btn of document.querySelectorAll('.gap-controls button')){const selected=JSON.parse(btn.dataset.payload).value===(s.settings.timingGap||'leader');btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected));}
  for(const c of r.cars){
    const row=cells.get(c.driverId);for(const [k,v]of Object.entries(timingCells(s,c))){
      if(k==='gap'&&!refreshGaps)continue;
      setHtml(row?.querySelector(`[data-cell="${k}"]`),v);
    }
    if(row){row.classList.toggle('retired-row',c.retired);row.classList.toggle('focused-row',c.driverId===focused(s).driverId);const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);}
    const dot=document.querySelector(`[data-dot="${c.driverId}"]`);if(dot){
      const hidden=['GARAGE','ELIMINATED','GRID'].includes(c.phase)||c.retired;
      dot.style.display=hidden?'none':'';
      const p=trackPoint(track.id,c.progress);if(c.phase==='PIT'){p[0]+=25;p[1]+=25;}
      dot.setAttribute('transform',`translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`);
      const showLabel=!hidden&&(s.settings.mapLabels!=='team'||c.teamId===s.player.teamId||c.driverId===focused(s).driverId);
      dot.classList.toggle('hide-label',!showLabel);if(showLabel)markers.push({id:c.driverId,x:p[0],y:p[1]});
      dot.setAttribute('aria-pressed',String(c.driverId===focused(s).driverId));
      dot.classList.toggle('selected-dot',c.driverId===focused(s).driverId);dot.classList.toggle('slow-dot',['OUT','IN','ABORT','PIT'].includes(c.phase));
      setText(dot.querySelector('.dot-label'),driverOf(s,c.driverId).code);
    }
    const ctrl=document.querySelector(`[data-command-car="${c.driverId}"]`);if(ctrl){
      setText(ctrl.querySelector('[data-live="fuel"]'),number(c.fuel));setText(ctrl.querySelector('[data-live="temp"]'),number(c.tyreTemperature));setHtml(ctrl.querySelector('[data-live="phase"]'),badge(phase(c),phaseTone(c)));setHtml(ctrl.querySelector('[data-live="wear"]'),wearMeter(c.tyreWear));setHtml(ctrl.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      const inactive=c.retired||c.finished||c.phase==='ELIMINATED';
      for(const el of ctrl.querySelectorAll('select,input,button'))el.disabled=inactive;
      if(r.qualifying){
        const garage=c.phase==='GARAGE'&&r.q.status==='RUNNING'&&r.q.remaining>0;
        for(const el of ctrl.querySelectorAll('form input,form select,form button'))el.disabled=!garage;
        for(const input of ctrl.querySelectorAll('input[name="compound"]'))input.disabled=!garage||!allowedQualTyres(s,c).includes(input.value);
        for(const btn of ctrl.querySelectorAll('[data-action="qualCommand"]')){
          const p=JSON.parse(btn.dataset.payload);btn.disabled=inactive||(p.command==='fly'?c.phase!=='OUT':p.command==='abort'||p.command==='repeat'?c.phase!=='FLY':p.command==='return'?!['FLY','OUT'].includes(c.phase):false);
          if(p.command==='auto')setText(btn,'自动出场：'+(c.autoQual?'开':'关'));
        }
        setText(ctrl.querySelector('[data-live="intent"]'),c.phase==='OUT'?'圈末计划：'+(c.outChoice==='PIT'?'返回 Pit':'开始飞行圈'):c.phase==='FLY'?'完成后：'+(c.afterLap==='FLY'?'再推一个飞行圈':'进入回场圈'):c.phase==='ABORT'?'本圈无效，圈末返回 Pit':c.phase==='IN'?'完成回场圈后返回车库':c.phase==='GARAGE'?'等待出场指令':'本段已淘汰');
      }else setText(ctrl.querySelector('[data-live="intent"]'),c.pitRequest?'已预约：本圈末进站换 '+c.pitRequest+' 胎':c.phase==='PIT'?'正在维修区，出站后恢复比赛':'按当前策略行驶 · 停站 '+c.stops+' 次');
    }
  }
  const svg=document.querySelector('#track-map');
  if(svg){const previous=svg._labelOffsets||{};const priority=markers.sort((a,b)=>Number(b.id===focused(s).driverId)-Number(a.id===focused(s).driverId)||a.id.localeCompare(b.id));
    const offsets={};for(const label of layoutMapLabels(priority,previous)){const dot=svg.querySelector(`[data-dot="${label.id}"]`);dot.querySelector('.dot-label-wrap').setAttribute('transform',`translate(${label.dx} ${label.dy})`);const line=dot.querySelector('.dot-connector');line.setAttribute('x2',label.dx+38);line.setAttribute('y2',label.dy+18);offsets[label.id]=[label.dx,label.dy];}svg._labelOffsets=offsets;
  }
  const c=focused(s),d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),focus=document.querySelector('#map-telemetry');if(focus){
    focus.dataset.focusedDriver=c.driverId;focus.style.setProperty('--team',t.color);
    for(const [key,value]of Object.entries({code:d.code,name:d.name,team:t.name}))setText(focus.querySelector(`[data-focus="${key}"]`),value);
    for(const [k,v]of Object.entries({phase:phase(c),lap:time(c.currentLap),speed:number(c.speed),last:time(c.lastLap),best:time(r.qualifying?c.stageBest:c.best),completed:c.lap}))setText(focus.querySelector(`[data-focus="${k}"]`),v);
    setHtml(focus.querySelector('[data-focus="tyre"]'),tyre(c.compound));
    for(let i=0;i<3;i++){
      const box=focus.querySelector(`[data-sector="${i}"]`);box.className='sector-box tone-'+(sectorTone(c,i));const active=c.sector===i&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase);
      setText(focus.querySelector(`[data-sector-current="${i}"]`),active?'进行中':'');setText(focus.querySelector(`[data-sector-time="${i}"]`),active?time(Math.max(0,r.time-c.sectorStart)):sectorValue(c,i)>0?time(sectorValue(c,i)):'—');setText(focus.querySelector(`[data-sector-speed="${i}"]`),number(sectorSpeed(c,i)));
    }
  }
  patchDetails(s);
  setHtml(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));setHtml(document.querySelector('#race-events'),r.events.slice(0,10).map(eventItem).join(''));setText(document.querySelector('[data-live-wet]'),number(r.wetness*100)+'%');
}

function detailCells(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),best=s.race.qualifying?c.stageBest:c.best;
  return {
    driver:`<button class="detail-driver" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}"><b>${h(d.code)}</b><span>${h(d.name)}</span></button>`,
    current:c.phase==='GARAGE'||c.phase==='ELIMINATED'?'—':time(c.currentLap),
    last:c.lastLap>0?lapDisplay(c.lastLap,{fastest:c.lastLap===s.race.fastest.time}):'—',
    best:lapDisplay(best,{fastest:s.race.fastest.driverId===c.driverId}),
    sectors:`<div class="detail-sectors">${[0,1,2].map(i=>`<span class="tone-${sectorTone(c,i)}"><small>S${i+1}</small>${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</span>`).join('')}</div>`,
    age:`${c.tyreAge} 圈`,wear:wearMeter(c.tyreWear),fuel:number(c.fuel)+' kg',stops:c.stops,status:badge(phase(c),phaseTone(c))
  };
}
function pitHistory(s){
  const records=s.race.cars.flatMap(c=>(c.pitLog||[]).map((entry,i)=>({...entry,id:c.driverId,sequence:i+1}))).sort((a,b)=>(b.at??b.lap)-(a.at??a.lap)||a.id.localeCompare(b.id));
  if(!records.length)return '<p class="empty-pit-log">尚无进站换胎记录。</p>';
  return `<div class="table-scroll"><table class="pit-history-table"><thead><tr><th>比赛时间</th><th>车手</th><th>圈数</th><th>换胎</th><th>停站用时</th><th>总损失</th></tr></thead><tbody>${records.map(entry=>`<tr class="${s.race.cars.find(c=>c.driverId===entry.id)?.teamId===s.player.teamId?'player-row':''}"><td>${entry.at===undefined?'—':clock(entry.at,false)}</td><td><b>${h(driverOf(s,entry.id).code)}</b><small>${h(driverOf(s,entry.id).name)} · 第 ${entry.sequence} 停</small></td><td>L${entry.lap}</td><td><span class="pit-tyre-change">${entry.from?tyre(entry.from)+'<span>→</span>':''}${tyre(entry.compound)}</span></td><td>${Number(entry.stop).toFixed(2)} s</td><td>+${Number(entry.loss).toFixed(2)} s</td></tr>`).join('')}</tbody></table></div>`;
}
function raceDetails(s){
  return `<section class="panel live-race-details" id="race-details"><div class="panel-heading"><h2>${icon('chart')}圈速与进站数据</h2><span class="muted">全部车手 · 实时更新</span></div><div id="live-fastest">${fastestSummary(s,s.race.fastest)}</div><div class="table-scroll"><table class="race-detail-table"><thead><tr>${['车手','当前圈计时','上一圈','最佳圈','Sector 计时','胎龄','磨损','燃油','停站','状态'].map(label=>`<th>${label}</th>`).join('')}</tr></thead><tbody id="detail-timing-body">${s.race.cars.map(c=>`<tr data-detail-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(detailCells(s,c)).map(([key,value])=>`<td data-detail-cell="${key}">${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div><h3 class="pit-history-heading">${icon('pit')}进站换胎记录</h3><div id="pit-history">${pitHistory(s)}</div></section>`;
}
function patchDetails(s){
  const body=document.querySelector('#detail-timing-body');if(!body)return;
  const rows=new Map([...body.children].map(row=>[row.dataset.detailCar,row]));
  for(const c of s.race.cars){const row=rows.get(c.driverId);if(!row)continue;
    for(const [key,value]of Object.entries(detailCells(s,c)))setHtml(row.querySelector(`[data-detail-cell="${key}"]`),value);
    row.classList.toggle('focused-row',c.driverId===focused(s).driverId);
    const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);
  }
  setHtml(document.querySelector('#pit-history'),pitHistory(s));
}

return {clock, liveView, patchLive, raceDetails};
}());

// ===== 文件: js/ui/raceView.js =====
modules['js/ui/raceView.js'] = (function () {
const { liveView, patchLive, raceDetails } = modules['js/ui/liveView.js'];
// ===== 文件: js/ui/raceView.js =====
const { teamOf } = modules['js/core/helpers.js'];
const { currentTrack } = modules['js/core/calendar.js'];
const { SESSION_NAMES } = modules['js/data/i18n.js'];
const { MODES, ENGINES, COMPOUNDS } = modules['js/data/parts.js'];
const {
  h, header, panel, badge, button, link, table, time, number, icon, select, empty,
  tyre, tyreField, tyreInventory, tyreLegend, lapDisplay, wearMeter, severity,
  rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary
} = modules['js/ui/uiKit.js'];

function timingLegend() {
  return `<div class="timing-legend"><span class="tone-fastest">${icon('stopwatch')}全场最快</span><span class="tone-success">${icon('check')}个人最快</span><span class="tone-warning">${icon('warning')}需要关注</span><span class="tone-danger">${icon('cross')}故障 / 处罚</span></div>`;
}
function resultTable(s,result) {
  const leader=result.rows.find(r=>r.classified);
  return table(['名次','车手','车队','位次变化','差距 / 状态','最快圈','进站','罚时','积分'],result.rows.map(r=>[
    rankBadge(r.position),h(s.drivers.find(d=>d.id===r.driverId)?.code||'')+' · '+h(r.name),h(s.teams.find(t=>t.id===r.teamId)?.name||r.teamId),
    positionChange(r.grid,r.position),
    r.disqualified?badge('DSQ · 取消资格','danger'):r.retired?badge('退赛 · '+r.reason,'danger'):r.position===1?time(r.time):r.lap<(leader?.lap||0)?'+'+((leader?.lap||0)-r.lap)+' LAP':'+'+number(r.time-(leader?.time||0))+'s',
    lapDisplay(r.best,{fastest:result.fastest?.driverId===r.driverId}),
    `<span class="pit-count">${icon('pit')}${r.stops}</span>`,
    r.penalty?badge('+'+r.penalty+'s','danger','warning'):'—',
    `<strong class="points-value ${r.points>0?'tone-success':''}">${r.points}</strong>`
  ]),'race-result','',result.rows.map(row=>row.teamId===s.player.teamId?'player-row':''));
}
function sessionControls(s) {
  const w=s.calendar.weekend,current=w.sessions[w.index];
  if(!current)return `<div class="notice">${icon('check')}周末全部场次已完成。${button('完成本站结算','closeWeekend',{}, {class:'primary'})}</div>`;
  if(current.startsWith('FP'))return panel(SESSION_NAMES[current],`<p>练习将采集设定置信区间、轮胎寿命和燃油数据。可先在赛历页面调整两台赛车的设定。</p><div class="actions">${link('调校赛车','calendar')}${button('模拟本节练习','practice',{}, {class:'primary'})}</div>`);
  if(current==='Q'||current==='SQ') {
    const q=w.qualifying;
    return panel(SESSION_NAMES[current],`<p>${s.teams.length*2} 台赛车参加。排位赛使用实时倒计时与赛道地图，请分别安排两台赛车出场。</p><p>${current==='SQ'?'SQ1 / SQ2 / SQ3 为 12 / 10 / 8 分钟。':'Q1 / Q2 / Q3 为 18 / 15 / 12 分钟。'}前两段各淘汰 ${s.teams.length===11?6:5} 台赛车。</p><div class="actions">${button('进入实时'+SESSION_NAMES[current],'startQualifying',{}, {class:'primary'})}</div>`);

  }
  return panel(SESSION_NAMES[current]+' · 发车准备',`<p>发车路面积水预估 ${number((w.weatherStart||0)*100)}%。策略工作台可配置两台赛车的起步轮胎、进站窗口和安全车预案。默认由你指挥。</p>${tyreLegend()}<div class="actions">${link('检查策略','calendar')}${button('开始'+SESSION_NAMES[current],'startRace',{}, {class:'primary'})}</div>`);
}
function temperatureTone(car) {
  const compound=COMPOUNDS[car.compound];
  if(!compound)return 'neutral';
  return car.tyreTemperature<compound.min?'info':car.tyreTemperature>compound.max?'warning':'success';
}
function liveRow(s,c) {
  const leader=s.race.cars.find(x=>!x.retired)||s.race.cars[0],fastest=s.race.fastest?.driverId===c.driverId;
  return `<tr data-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''} ${c.retired?'retired-row':''}">
    <td data-cell="position">${rankBadge(c.position)}</td>
    <td><span class="team-line" style="--row-color:${h(s.teams.find(t=>t.id===c.teamId).color)}"></span><strong>${h(c.name)}</strong><small>${h(s.teams.find(t=>t.id===c.teamId).abbr)}</small></td>
    <td data-cell="gap">${c.retired?badge('退赛','danger'):c.position===1?'领先':'+'+number(c.time-leader.time)}</td>
    <td data-cell="last">${lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===s.race.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best})}</td>
    <td data-cell="best">${lapDisplay(c.best,{fastest})}</td>
    <td data-cell="tyre"><span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span></td>
    <td data-cell="wear">${wearMeter(c.tyreWear)}</td>
    <td data-cell="stops"><span class="pit-count">${icon('pit')}${c.stops}</span></td>
    <td data-cell="status">${raceStatus(c)}</td>
  </tr>`;
}
function carControl(s,c) {
  return `<article class="command-card ${c.retired?'retired-car':''}" data-command-car="${h(c.driverId)}">
    <div class="split"><div><p class="eyebrow">${c.slot+1} 号车 · P<span data-live="position">${c.position}</span></p><h3>${h(c.name)}</h3></div><span class="tyre tyre-${h(c.compound)}" data-live="compound" title="${h(COMPOUNDS[c.compound].name)}">${c.compound}</span></div>
    <div class="telemetry-cells">
      <div><small>${icon('tyre')}轮胎磨损</small><strong data-live="wear" class="tone-${severity(c.tyreWear)}">${number(c.tyreWear)}%</strong></div>
      <div><small>${icon('thermometer')}轮胎温度</small><strong data-live="temp" class="tone-${temperatureTone(c)}">${number(c.tyreTemperature)}°C</strong></div>
      <div><small>${icon('fuel')}燃油</small><strong data-live="fuel">${number(c.fuel)} kg</strong></div>
      <div><small>${icon('stopwatch')}最佳单圈</small><strong data-live="best">${lapDisplay(c.best,{fastest:s.race.fastest?.driverId===c.driverId})}</strong></div>
    </div>
    <label class="field"><span>${icon('car')}驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(c.driverId)}"`)}</label>
    <label class="field"><span>${icon('bolt')}引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(c.driverId)}"`)}</label>
    <form data-form="pit" class="pit-form"><input type="hidden" name="id" value="${h(c.driverId)}">${tyreField('进站轮胎','value','H',{compact:true})}<button type="submit" class="btn primary">${icon('pit')}进站换胎</button></form>
    <div class="actions">${button('取消进站','command',{id:c.driverId,command:'cancelPit'},{class:'small'})}</div>
    <p class="radio-advice" data-live="advice">${c.retired?'已退赛':c.tyreWear>65?'轮胎退化明显，建议准备进站':'轮胎状态正常，注意天气与窗口。'}</p>
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[c.driverId])}</div>
  </article>`;
}
function renderRaceView(s) {
  const w=s.calendar.weekend,track=currentTrack(s),r=s.race;
  if(r?.realtime&&!r.finished)return liveView(s);
  if(!w)return `${header('比赛指挥','维修墙待命','先进入比赛周末，再执行练习、排位与比赛。')}${panel('下一站准备',`${empty(s.season.offseason?'当前处于转会窗。':'本站赛车尚未登记。')}${link('前往赛历','calendar','primary')}`)}`;
  if(!r||r.finished)return `${header('比赛指挥',track.name+' · '+(SESSION_NAMES[w.sessions[w.index]]||'周末结束'),'按对应年份的周末流程推进。')}${sessionControls(s)}${r?.qualifying&&r.finished?panel('排位赛各段成绩',r.q.stages.map((rows,i)=>`<details ${i===2?'open':''}><summary>${r.kind}${i+1}</summary>${table(['名次','车手','配方','成绩'],rows.map((x,j)=>[rankBadge(j+1),h(s.drivers.find(d=>d.id===x.id)?.code)+' · '+h(x.name),tyre(x.compound),lapDisplay(x.time,{fastest:j===0})]),'','',rows.map(x=>s.drivers.find(d=>d.id===x.id)?.teamId===s.player.teamId?'player-row':''))}</details>`).join('')):''}${r?.result?panel((r.sprint?'冲刺赛':'正赛')+'赛后报告',`${fastestSummary(s,r.fastest)}${timingLegend()}${resultTable(s,r.result)}<p class="muted">${s.season.rules.fastestLap?'正赛前十中的全场最快圈可获 1 分。':'本赛季最快圈不加分。'}</p><details><summary>罚则与事件记录</summary>${r.events.map(eventItem).join('')}</details><details><summary>分段成绩与位置轨迹</summary>${table(['圈数','领跑车手','累计时间'],r.segments.map(x=>[x.lap,h(s.drivers.find(d=>d.id===x.leader)?.name),time(x.time)]))}<canvas data-chart="positions" aria-label="本队位置变化图"></canvas></details>`):''}`;
  return `${header('比赛指挥 / 实时计时',track.name+' · '+SESSION_NAMES[r.kind],track.city+' · '+r.totalLaps+' 圈',`<span class="live-indicator">实时模拟</span>`)}
    <div class="race-toolbar"><div class="lap-count"><span data-race="lap">${r.lap}</span><small> / ${r.totalLaps} 圈</small></div>${flagState(r)}<div class="speed-controls">${[1,2,4,10].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('下一圈','tick',{count:1},{class:'small'})}${button('下一事件','tick',{count:1000,untilEvent:true},{class:'small'})}${button('模拟到底','finishRace',{}, {class:'small',confirm:'自动执行当前指令和策略直到终点，确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div id="live-fastest">${fastestSummary(s,r.fastest)}</div>${timingLegend()}
    <div class="race-layout"><section class="panel tower"><div class="panel-heading"><h2>${icon('stopwatch')}实时计时塔</h2><span class="muted">差距相对领先者 / 秒</span></div><div class="table-scroll"><table class="timing-table"><thead><tr><th>位置</th><th>车手 / 车队</th><th>领先差距</th><th>上一圈</th><th>最佳圈</th><th>配方 / 胎龄</th><th>磨损</th><th>停站</th><th>状态</th></tr></thead><tbody id="timing-body">${r.cars.map(c=>liveRow(s,c)).join('')}</tbody></table></div></section><aside class="command-column">${r.cars.filter(c=>c.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(c=>carControl(s,c)).join('')}</aside></div>
    <div class="grid-2">${panel('气象与雨带预报',`<div class="weather-overview"><strong data-race="weather">${icon('rain')}路面积水 ${number(r.wetness*100)}%</strong><span>${icon('thermometer')}${track.temp}°C 基准路温</span></div><div class="weather-radar">${r.forecast.map(cell=>`<div title="第 ${cell.lap} 圈，预报降雨强度 ${number(cell.rain*100)}%，可信度 ${number(cell.confidence)}%"><i style="height:${Math.max(6,cell.rain*75)}px"></i><small>L${cell.lap}</small></div>`).join('')}</div><p class="muted">阴影柱表示预报雨带强度；路面湿度滞后于降雨。DRS 在湿地与安全车期间禁用。</p>`)}${panel('车队无线电与事件',`<div class="race-events" id="race-events">${r.events.slice(0,12).map(eventItem).join('')}</div>`)}</div>`;
}
// 只替换改变的单元格内容与现有行顺序；不会重建行或驾驶 / 换胎控件。
function patchRace(s) {
  if(s.race?.realtime){patchLive(s);return;}
  const r=s.race,body=document.querySelector('#timing-body');
  if(!r||r.finished||!body)return;
  const text=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
  const html=(el,value)=>{if(el&&el._visualHtml!==value){el.innerHTML=value;el._visualHtml=value;}};
  text(document.querySelector('[data-race="lap"]'),r.lap);
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag&&flag.dataset.control!==code)html(flag.parentElement.querySelector('[data-race="control"]'),`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);
  if(flag){flag.className='flag-state flag-'+code;flag.dataset.control=code;}
  html(document.querySelector('[data-race="weather"]'),`${icon('rain')}路面积水 ${number(r.wetness*100)}%`);
  html(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));
  const leader=r.cars.find(c=>!c.retired)||r.cars[0],rows=new Map(Array.from(body.children).map(el=>[el.dataset.car,el]));
  const controls=new Map(Array.from(document.querySelectorAll('[data-command-car]')).map(el=>[el.dataset.commandCar,el]));
  for(const c of r.cars) {
    const row=rows.get(c.driverId);if(!row)continue;
    const values={
      position:rankBadge(c.position),gap:c.retired?badge('退赛','danger'):h(c.position===1?'领先':'+'+number(c.time-leader.time)),
      last:lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===r.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best}),
      best:lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}),
      tyre:`<span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span>`,
      wear:wearMeter(c.tyreWear),stops:`<span class="pit-count">${icon('pit')}${c.stops}</span>`,status:raceStatus(c)
    };
    for(const [key,value]of Object.entries(values))html(row.querySelector(`[data-cell="${key}"]`),value);
    row.classList.toggle('retired-row',c.retired);body.appendChild(row);
    const command=controls.get(c.driverId);
    if(command) {
      const fields={position:c.position,compound:c.compound,wear:number(c.tyreWear)+'%',temp:number(c.tyreTemperature)+'°C',fuel:number(c.fuel)+' kg',advice:c.retired?'已退赛':c.tyreWear>65?'轮胎衰退明显，建议准备进站':r.wetness>.2?'雨带已经抵达，建议检查配方':'轮胎状态正常，注意窗口。'};
      for(const [key,value]of Object.entries(fields))text(command.querySelector(`[data-live="${key}"]`),value);
      const compound=command.querySelector('[data-live="compound"]');compound.className='tyre tyre-'+c.compound;compound.title=COMPOUNDS[c.compound].name;
      command.querySelector('[data-live="wear"]').className='tone-'+severity(c.tyreWear);
      command.querySelector('[data-live="temp"]').className='tone-'+temperatureTone(c);
      html(command.querySelector('[data-live="best"]'),lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}));
      html(command.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      command.classList.toggle('retired-car',c.retired);
      for(const input of command.querySelectorAll('select,button,input[type="radio"]'))input.disabled=c.retired;
    }
  }
  const events=document.querySelector('#race-events');if(events)html(events,r.events.slice(0,12).map(eventItem).join(''));
  const resume=document.querySelector('[data-action="resume"]');if(resume)resume.disabled=!r.red;
}
function reportHtml(s,index) {
  const result=s.history.races[index];
  return result?`<p>${h(result.track)} · 第 ${result.round} 站 · ${result.kind==='SPRINT'?'冲刺':'正赛'}</p>${fastestSummary(s,result.fastest)}${resultTable(s,result)}<details><summary>罚则记录</summary>${result.penalties.map(p=>`<p>${badge('L'+p.lap,'warning','warning')} ${h(p.reason)} ${p.seconds?badge('+'+p.seconds+'s','danger'):''}</p>`).join('')||'<p>无罚则</p>'}</details>`:empty('该报告不存在。');
}

function raceView(s){
  const content=renderRaceView(s);
  return s.calendar.weekend&&s.race?.realtime&&s.race.finished?content+raceDetails(s):content;
}

return {patchRace, reportHtml, raceView};
}());

// ===== 文件: js/ui/standingsView.js =====
modules['js/ui/standingsView.js'] = (function () {
// ===== 文件: js/ui/standingsView.js =====
const {
  teamOf, teamStandings, driverStandings
} = modules['js/core/helpers.js'];
const {
  h, header, panel, table, badge, progress, time, empty, lapDisplay, rankBadge, icon
} = modules['js/ui/uiKit.js'];
function standingsView(s) {
  const teams=teamStandings(s),drivers=driverStandings(s),current=s.history.races.filter(r=>r.kind==='RACE'&&s.calendar.events.some(e=>e.result?.rows[0]?.driverId===r.rows[0]?.driverId&&e.result?.track===r.track));
  return `${header('锦标赛档案',s.season.year+' 赛季积分榜','同分按正赛最高名次次数逐级比较；同样成绩时按既有种子顺序排列。')}
 ${progress(s.calendar.round,s.calendar.events.length,'赛季进度 '+s.calendar.round+' / '+s.calendar.events.length)}
 <div class="grid-2">${panel('制造商积分',table(['名次','车队','积分','正赛冠军'],teams.map((t,i)=>[rankBadge(i+1)+(t.id===s.player.teamId?' '+badge('本队','info'):''),`<span class="team-line" style="--row-color:${h(t.color)}"></span>${h(t.name)}`,'<strong>'+t.points+'</strong>',t.wins]),'constructors','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}${panel('车手积分',table(['名次','车手','车队','积分','冠军','最快圈'],drivers.map((d,i)=>[rankBadge(i+1),h(d.name),h(s.teams.find(t=>t.id===d.teamId)?.abbr||'自由车手'),'<strong>'+d.points+'</strong>',d.wins,`<span class="metric tone-fastest">${icon('stopwatch')}${d.fastest}</span>`]),'drivers-standings','',drivers.map(d=>d.teamId===s.player.teamId?'player-row':'')))}</div>
 ${panel('车队积分走势',`<canvas data-chart="points" data-type="line" data-height="220" aria-label="本队积分走势"></canvas>`)}
 ${panel('每站积分明细',table(['车队',...s.calendar.events.map((e,i)=>'R'+(i+1))],teams.map(t=>[h(t.name),...s.calendar.events.map((e,i)=>t.results.filter(r=>r.round===i+1).reduce((a,r)=>a+r.points,0)||'—')]),'round-points','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}
 ${panel('分站档案',s.history.races.length?table(['站次','赛道','场次','冠军','最快圈','报告'],s.history.races.map((r,i)=>[r.round,h(r.track),r.kind==='SPRINT'?'冲刺':'正赛',h(r.rows[0]?.name||'无'),lapDisplay(r.fastest.time,{fastest:true}),`<button class="btn small" data-report="${i}">查看成绩</button>`]),'race-archive'):empty('比赛结束后，这里将保存分站冠军、最快圈与完整报告。'))}
 ${panel('荣誉室与历年记录',s.history.seasons.length?table(['赛季','制造商冠军','车手冠军','本队名次'],s.history.seasons.map(x=>[x.year,h(x.teams[0]?.name),h(x.drivers[0]?.name),'P'+x.playerRank])):empty('完成首个赛季后，年度排名与冠军将进入荣誉室。'))}`;
}

return {standingsView};
}());

// ===== 文件: js/ui/saveView.js =====
modules['js/ui/saveView.js'] = (function () {
// ===== 文件: js/ui/saveView.js =====
const {
  SLOT_NAMES, slotInfo
} = modules['js/core/save.js'];
const {
  h, header, panel, badge, field
} = modules['js/ui/uiKit.js'];
function saveView(s) {
  return `${header('生涯档案','存档与备份','三个手动槽位与独立自动存档。JSON 备份可跨浏览器、跨设备导入。')}
 ${panel('本地存档槽',`<div class="facility-grid">${Object.entries(SLOT_NAMES).map(([slot,label])=>{const info=slotInfo(slot);return `<article class="facility"><div class="split"><h3>${h(label)}</h3>${badge(info?.broken?'损坏':info?'可读取':'空')}</div><p>${info&&!info.broken?h(info.team)+' · '+info.year+' 赛季':'尚无有效数据'}</p><p class="muted">${info?.savedAt?h(new Date(info.savedAt).toLocaleString('zh-CN')):'—'}</p><div class="actions">${slot==='auto'?'':`<button class="btn" data-save="${slot}">写入此槽</button>`}<button class="btn" data-load="${slot}" ${info?'':'disabled'}>读取</button><button class="btn danger small" data-delete-save="${slot}" ${info?'':'disabled'}>删除</button></div></article>`;}).join('')}</div><label class="check"><input type="checkbox" data-autosave ${s.settings.autosave?'checked':''}>关键操作后自动保存（比赛中每 5 秒保存一次）</label>`)}
 <div class="grid-2">${panel('导出 JSON',`<p class="muted">下载完整存档，或复制文本框内容。导出包括随机状态与比赛中的全部指令。</p><div class="actions"><button class="btn primary" data-export>下载 JSON 文件</button><button class="btn" data-export-text>显示 JSON 文本</button></div><label class="field"><span>导出文本</span><textarea id="export-text" rows="10" readonly aria-label="导出存档 JSON"></textarea></label><button class="btn small" data-copy>复制到剪贴板</button>`)}${panel('导入 JSON',`<form data-form="import"><label class="field"><span>选择备份文件</span><input id="import-file" type="file" accept=".json,application/json"></label><label class="field"><span>或粘贴完整 JSON</span><textarea name="json" id="import-text" rows="10" required aria-label="导入存档 JSON"></textarea></label><button class="btn primary" type="submit">验证并导入</button><p class="muted">损坏或版本不兼容的存档会被拒绝，当前生涯保持不变。</p></form>`)}</div>
 ${panel('新生涯',`<p class="muted">重新选择赛季或创建第 11 支车队。建议先保存到手动槽或导出 JSON。</p><button class="btn danger" data-new-game>新建游戏</button>`)}`;
}

return {saveView};
}());

// ===== 文件: js/ui/setupWizard.js =====
modules['js/ui/setupWizard.js'] = (function () {
// ===== 文件: js/ui/setupWizard.js =====
const {
  seasonTeams, ALTERNATIVE_LINEUPS, SUPPLIERS
} = modules['js/data/teams.js'];
const {
  DRIVER_DATA, RESERVES
} = modules['js/data/drivers-data.js'];
const {
  LOGOS, logo
} = modules['js/data/logos.js'];
const {
  h, badge, field, select, money, carArt
} = modules['js/ui/uiKit.js'];
function setupWizard(draft={
},hasSave=false) {
  const year=Number(draft.year||2025),teams=seasonTeams(year,Number(draft.alternate??-1)),selected=teams.find(t=>t.id===draft.teamId)||teams[0],custom=draft.mode==='custom';
  const free=RESERVES[year].filter(id=>!teams.some(t=>t.drivers.includes(id)));
  return `<div class="wizard-shell"><aside class="wizard-cover"><a class="wordmark" href="#setup"><span class="brand-slashes">▰▰</span> 维修墙<span>车队经理</span></a><div class="cover-title"><p class="eyebrow">你的车队。你的决定。</p><h1>从维修墙，<br>指挥整个赛季。</h1><p>赛车研发、车手转会、进站窗口。<br>把每一个决策，变成赛道上的优势。</p></div><div class="cover-car">${carArt(selected.color)}</div><div class="cover-bottom"><span>2022 — 2025</span><span>离线可玩 · 本地存档</span></div><span class="cover-number" aria-hidden="true">${year}</span></aside>
 <main id="main-content" class="wizard-main"><div class="wizard-top"><div><p class="eyebrow">新经理生涯</p><h2>建立你的赛季</h2></div>${hasSave?'<button class="btn" data-load="auto">继续自动存档</button>':''}</div><form id="setup-form" data-form="newGame"><section class="wizard-section"><div class="step-heading"><span>01</span><h3>选择时代</h3><small>历史赛历与真实开季阵容</small></div><div class="form-grid">${field('赛季',select('year',[2022,2023,2024,2025],year,'data-wizard-change'))}${field('阵容快照',select('alternate',[[-1,'默认开季阵容'],...ALTERNATIVE_LINEUPS[year].map((a,i)=>[i,a.label])],draft.alternate??-1,'data-wizard-change'))}</div><p class="muted">${year<=2023?'22 站完整赛历':'24 站完整赛历'} · ${year<=2024?'前十最快圈加 1 分':'最快圈不再加分'} · ${year===2022?'冲刺结果决定正赛发车顺序':year===2023?'周五正赛排位，周六独立冲刺':'周五冲刺排位，周六冲刺后进行正赛排位'}</p></section>
 <section class="wizard-section"><div class="step-heading"><span>02</span><h3>选择挑战</h3></div><div class="mode-grid"><label class="mode-card ${custom?'':'active'}"><input type="radio" name="mode" value="existing" ${custom?'':'checked'} data-wizard-change><strong>接管现有车队</strong><span>继承阵容、员工与工厂，完成董事会目标。</span></label><label class="mode-card ${custom?'active':''}"><input type="radio" name="mode" value="custom" ${custom?'checked':''} data-wizard-change><strong>第 11 支车队</strong><span>从零起步，打造属于你的赛车品牌。</span></label></div>
 ${custom?`<div class="form-grid customization">${field('车队名称',`<input name="name" maxlength="32" required value="${h(draft.name||'Aurora Racing')}">`)}${field('三字母缩写',`<input name="abbr" maxlength="3" pattern="[A-Za-z]{3}" required value="${h(draft.abbr||'AUR')}">`)}${field('主色',`<input type="color" name="color" value="${h(draft.color||'#68e8b5')}">`)}${field('副色',`<input type="color" name="secondary" value="${h(draft.secondary||'#eff8ff')}">`)}${field('制造商类型',select('type',[['customer','客户车队 · 购买动力单元'],['factory','厂商车队 · 自研动力单元']],draft.type||'customer'))}${field('引擎供应商',select('supplier',['Mercedes','Ferrari','HondaRBPT','Renault'].map(k=>[k,SUPPLIERS[k].name+' · 年采购 '+money(SUPPLIERS[k].price)]),draft.supplier||'Mercedes'))}</div><p class="field-label">选择队徽 · 24 款原创几何标志</p><div class="logo-picker">${LOGOS.map((_,i)=>`<label class="logo-option"><input type="radio" name="logo" value="${i}" ${Number(draft.logo||0)===i?'checked':''} aria-label="几何队徽 ${i+1}">${logo(i,draft.color||'#68e8b5',draft.secondary||'#eff8ff')}</label>`).join('')}</div><div class="form-grid">${[0,1].map(i=>`<div class="setup-driver">${field((i+1)+' 号车手来源',select('driverId'+i,[['custom','自建车手'],...free.map(id=>[id,DRIVER_DATA[id].name])],draft['driverId'+i]||'custom'))}${field('自建车手姓名',`<input name="driverName${i}" maxlength="32" value="${h(draft['driverName'+i]||(i?'Alex Morgan':'Ren Aoki'))}">`)}</div>`).join('')}${field('自建车手初始年龄',`<input name="age" type="number" min="18" max="45" value="${h(draft.age||21)}" required>`)}${field('自建车手初始能力',`<input name="pace" type="number" min="60" max="80" value="${h(draft.pace||74)}" required>`,'60—80；年轻车手后续有更多成长空间')}</div><p class="notice">新车队须支付 $12m 入场担保金；客户初始现金 $55m，厂商 $48m（均未扣担保金）。初始工厂和声望低于现有车队。</p>`:`<input type="hidden" name="teamId" value="${h(selected.id)}"><div class="team-picker">${teams.map(t=>`<button type="button" class="team-option ${selected.id===t.id?'active':''}" data-choose-team="${h(t.id)}" style="--team:${h(t.color)}">${logo(t.logo,t.color)}<span><strong>${h(t.name)}</strong><small>${t.drivers.map(id=>h(DRIVER_DATA[id].name.split(' ').at(-1))).join(' / ')}</small></span><span class="team-rating">${t.performance}</span></button>`).join('')}</div><div class="selected-team"><strong>${h(selected.fullName)}</strong><p>${h(selected.hq)} · ${h(SUPPLIERS[selected.supplier].name)} · ${selected.type==='factory'?'厂商':'客户'}</p><span>起始现金 ${money(selected.cash)} ${badge('声望 '+selected.reputation)}</span></div>`}</section>
 <section class="wizard-section"><div class="step-heading"><span>03</span><h3>设定生涯</h3></div><div class="form-grid">${field('难度',select('difficulty',[['easy','简单 · 更多宽容'],['standard','标准 · 完整经营挑战'],['hard','硬核 · 更强 AI 与严格董事会']],draft.difficulty||'standard'))}${field('随机种子',`<input name="seed" maxlength="100" value="${h(draft.seed||'APEX-2025')}" required>`,'相同种子与相同决策，可复现模拟结果')}</div><div class="actions"><button type="button" class="btn small" data-generate-seed>随机生成新种子</button></div><p class="muted">非官方同人模拟。车手能力、车队性能与所有经营金额为游戏化平衡值。仅在浏览器本地保存，无账号、无网络请求。</p><button class="btn primary start-career" type="submit">开始经理生涯 <span>→</span></button></section></form></main></div>`;
}

return {setupWizard};
}());

// ===== 文件: js/main.js =====
modules['js/main.js'] = (function () {
const { generateSeed } = modules['js/core/rng.js'];
// ===== 文件: js/main.js =====
const {
  NAV, SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  seasonTeams
} = modules['js/data/teams.js'];
const {
  DIMENSIONS, COMPOUNDS
} = modules['js/data/parts.js'];
const {
  getState, setState, createGame, dispatch
} = modules['js/core/state.js'];
const {
  teamOf, copy
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  performance, tyreChartData
} = modules['js/core/car.js'];
const {
  projectQuote
} = modules['js/core/rnd.js'];
const {
  saveSlot, loadSlot, slotInfo, deleteSlot, exportText, importText
} = modules['js/core/save.js'];
const {
  dashboard
} = modules['js/ui/dashboard.js'];
const {
  carView
} = modules['js/ui/carView.js'];
const {
  rndView
} = modules['js/ui/rndView.js'];
const {
  staffView
} = modules['js/ui/staffView.js'];
const {
  driversView
} = modules['js/ui/driversView.js'];
const {
  financeView
} = modules['js/ui/financeView.js'];
const {
  calendarView
} = modules['js/ui/calendarView.js'];
const {
  raceView, patchRace, reportHtml
} = modules['js/ui/raceView.js'];
const {
  standingsView
} = modules['js/ui/standingsView.js'];
const {
  saveView
} = modules['js/ui/saveView.js'];
const {
  setupWizard
} = modules['js/ui/setupWizard.js'];
const {
  h, icon, teamBadge, money, progress, toast, openDialog, confirmDialog, field, select, drawChart
} = modules['js/ui/uiKit.js'];
const views={
  dashboard,car:carView,rnd:rndView,staff:staffView,drivers:driversView,finance:financeView,calendar:calendarView,race:raceView,standings:standingsView,save:saveView
};
let draft={
  year:2025,teamId:'mclaren',mode:'existing',seed:generateSeed()
};
let wizard=true;
let saveStatus='尚未保存';
let lastAutosave=0;
let frame=0;
let liveFrame=false;
const root=document.querySelector('#app');
function route() {
  const key=location.hash.slice(1);
  return views[key]?key:'dashboard';
}
function autosave(force=false) {
  const s=getState();
  if(!s?.settings.autosave)return;
  if(!force&&Date.now()-lastAutosave<5000)return;
  try{
    saveStatus='已保存 '+saveSlot(s);
    lastAutosave=Date.now();
  }
  catch(error) {
    saveStatus='自动保存失败，请导出备份';
    toast(error.message,'error');
  }
  const el=document.querySelector('#save-status');
  if(el)el.textContent=saveStatus;
}
function charts() {
  const s=getState();
  if(!s)return;
  const t=teamOf(s);
  for(const canvas of root.querySelectorAll('canvas[data-chart]')) {
    const kind=canvas.dataset.chart;
    if(kind==='tyres'){drawChart(canvas,tyreChartData(s,currentTrack(s)));}
    else if(kind==='performance') {
      const v=performance(s,t);
      drawChart(canvas,{
        type:'radar',labels:['下压力','气动效率','机械抓地','动力','轮胎管理','可靠性'],values:[v.downforce,v.aero,v.grip,v.power,v.tyres,v.reliability],color:t.color
      });
    }
    else if(kind==='finance') {
      const list=s.finance[t.id].ledger.slice(0,12).reverse();
      drawChart(canvas,{
        labels:list.map(x=>'日'+x.day),values:list.map(x=>Math.abs(x.amount)),colors:list.map(x=>x.amount>=0?'#78e3b0':'#ff8794'),color:t.color
      });
    }
    else if(kind==='points') {
      let total=0;
      const values=s.calendar.events.map((e,i)=> {
        total+=t.results.filter(x=>x.round===i+1).reduce((a,x)=>a+x.points,0); return total;
      });
      drawChart(canvas,{
        type:'line',labels:values.map((_,i)=>'R'+(i+1)),values,color:t.color
      });
    }
    else if(kind==='positions'&&s.race) {
      const records=s.race.positions;
      drawChart(canvas,{
        type:'line',labels:records.map(x=>'L'+x.lap),series:t.drivers.map((id,i)=>({
          color:i?t.secondary:t.color,values:records.map(x=>x.positions.find(p=>p.id===id)?.position||s.teams.length*2)
        }))
      });
    }
  }
}
function shell(s,content) {
  const t=teamOf(s),f=s.finance[t.id],e=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  document.documentElement.style.setProperty('--accent',t.color);
  return `<div class="app-shell"><aside class="sidebar"><a class="wordmark" href="#dashboard"><span class="brand-slashes">▰▰</span><b class="brand-name">维修墙</b><span>车队经理</span></a><p class="nav-group-label">赛季运营</p><nav aria-label="主导航">${NAV.map(([key,label,id])=>`<a class="nav-link ${route()===key?'active':''}" href="#${key}" title="${h(label)}" ${route()===key?'aria-current="page"':''}>${icon(id)}<span>${h(label)}</span></a>`).join('')}</nav><div class="sidebar-footer"><strong>${s.season.year} · ${s.teams.length} 支车队</strong><p>本地模拟 / 零外部依赖</p><p>非官方 F1 同人项目</p></div></aside><div class="workspace"><header class="topbar">${teamBadge(t)}<div class="top-metrics"><div><small>当前日期</small><strong>${h(s.calendar.date)}</strong></div><div class="top-next"><small>${s.season.offseason?'赛季阶段':'下一站 / R'+(e?.round||'—')}</small><strong>${h(track?.name||'转会窗')}</strong></div><div class="top-money"><small>可用现金</small><strong>${money(f.cash)}</strong></div><div class="top-cap"><small>预算帽 ${money(f.capUsed)} / ${money(f.capLimit)}</small>${progress(f.capUsed,f.capLimit)}</div><span id="save-status" class="save-status" role="status">${h(saveStatus)}</span></div></header><main id="main-content" class="main-content">${s.season.gameOver?`<section class="game-over"><h2>经理生涯结束</h2><p>${h(s.season.gameOver)}</p><a class="btn" href="#save">读取存档或新建生涯</a></section>`:''}${content}</main></div></div>`;
}
function render() {
  frame=0;
  const s=getState();
  try{
    if(wizard||!s) {
      root.innerHTML=setupWizard(draft,!!slotInfo('auto'));
      document.documentElement.style.setProperty('--accent','#68e8b5');
      return;
    }
    root.innerHTML=shell(s,views[route()](s));
    requestAnimationFrame(()=>{charts();const latest=getState();if(route()==='race'&&latest?.race?.realtime&&!latest.race.finished)patchRace(latest);});
  }
  catch(error) {
    toast('界面渲染失败：'+error.message,'error');
    root.innerHTML=`<main class="boot-message"><h1>无法显示当前页面</h1><p>${h(error.message)}</p><a class="btn" href="#save">前往存档</a><button class="btn" data-new-game>重新开始</button></main>`;
  }
}
function scheduleRender(live=false) {
  if(frame) {
    if(!live)liveFrame=false;
    return;
  }
  liveFrame=live;
  frame=requestAnimationFrame(()=> {
    frame=0; const s=getState(); if(liveFrame&&!wizard&&route()==='race'&&s?.race&&!s.race.finished&&document.querySelector('#timing-body')) {
      liveFrame=false; patchRace(s); return;
    }
    liveFrame=false; render();
  });
}
function perform(action,payload={
},quiet=false) {
  try{
    const prev=getState()?.race;const signature=prev?`${prev.q?.stage}/${prev.q?.status}`:'';
    const message=dispatch(action,payload);const active=getState()?.race;const changed=active&&signature!==`${active.q?.stage}/${active.q?.status}`;
    if(!changed&&['tick','command','advanceRealtime','qualCommand','focusDriver','timingGap'].includes(action)&&getState().race&&!getState().race.finished) {
      if(action==='command'||action==='qualCommand')toast(message);
      if(action==='focusDriver'||action==='timingGap')patchRace(getState());
      scheduleRender(true);
    }
    else{
      scheduleRender();
      if(!quiet)toast(message);
    }
    autosave(!quiet);
  }
  catch(error) {
    toast(error.message,'error');
    if(!quiet)scheduleRender();
  }
}
function captureDraft() {
  const form=document.querySelector('#setup-form');
  if(form)draft={
    ...draft,...Object.fromEntries(new FormData(form))
  };
}
function load(slot) {
  const work=()=> {
    try{
      const state=loadSlot(slot);
      setState(state);
      wizard=false;
      saveStatus='已读取 '+slot;
      location.hash='dashboard';
      render();
      toast('存档读取成功');
    }
    catch(error) {
      toast(error.message,'error');
    }
  };
  if(getState()&&!wizard)confirmDialog('读取此存档将替换当前进度，请确保已备份。确认读取？',work);
  else work();
}
function download(filename,text) {
  const url=URL.createObjectURL(new Blob([text],{
    type:'application/json'
  })),a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function contractDialog(kind,id) {
  const s=getState(),isStaff=kind.includes('Staff'),entity=(isStaff?s.staff:s.drivers).find(x=>x.id===id);
  if(!entity)return;
  const salary=isStaff?entity.salary:entity.contract.salary;
  const signing=kind==='signDriver'||kind==='hireStaff';
  openDialog((signing?'接洽签约 · ':'续约 · ')+entity.name,`<form><p class="muted">合同将立即生效。比赛周末已登记时，请先完成周末再签约。${signing?'对方可能拒绝报价；挖角及替换已有席位需要违约金。':''}</p>${field('年薪（百万美元）',`<input name="salary" type="number" min="0.1" max="${isStaff?20:100}" step="0.01" value="${(salary*1.15).toFixed(2)}" required>`)}${field('合同年限',select('years',[1,2,3,4,5],2))}${kind==='signDriver'?field('替换席位',select('slot',[[0,'1 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[0]).name],[1,'2 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[1]).name]],0)):''}<p class="notice">确认即提出合同并按结果支付解约 / 挖角费用；薪资在日常运营中计入预算帽。</p><div class="actions"><button class="btn" type="button" data-close>取消</button><button type="submit" class="btn primary">确认合同报价</button></div></form>`,data=> {
    document.querySelector('#modal').close(); perform(kind,{
      id,...Object.fromEntries(data)
    });
  });
}
root.addEventListener('click',event=> {
  const el=event.target.closest('button,a,[data-action]'); if(!el)return; if(el.hasAttribute('data-generate-seed')){captureDraft();draft.seed=generateSeed();render();return;}
  if(el.dataset.chooseTeam) {
    captureDraft(); draft.teamId=el.dataset.chooseTeam; render(); return;
  }
  if(el.dataset.action) {
    const action=el.dataset.action; let payload; try{
      payload=JSON.parse(el.dataset.payload||'{}');
    }
    catch(error) {
      toast('操作参数无效','error'); return;
    }
    if(el.dataset.confirm)confirmDialog(el.dataset.confirm,()=>perform(action,payload)); else perform(action,payload); return;
  }
  if(el.dataset.contract) {
    contractDialog(el.dataset.contract,el.dataset.id); return;
  }
  if(el.dataset.report!==undefined) {
    openDialog('比赛档案',reportHtml(getState(),Number(el.dataset.report))); return;
  }
  if(el.dataset.save) {
    confirmDialog('将当前进度写入此槽位，覆盖原有存档。确认？',()=> {
      try{
        saveStatus='手动保存 '+saveSlot(getState(),el.dataset.save); render(); toast('手动存档成功');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.dataset.load) {
    load(el.dataset.load); return;
  }
  if(el.dataset.deleteSave) {
    confirmDialog('永久删除这个本地存档槽位，确认？',()=> {
      try{
        deleteSlot(el.dataset.deleteSave); render(); toast('存档已删除');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.hasAttribute('data-new-game')) {
    confirmDialog('进入新生涯向导，当前进度请先手动保存或导出备份。确认？',()=> {
      wizard=true; location.hash='setup'; render();
    }); return;
  }
  if(el.hasAttribute('data-export')) {
    download('pitwall-'+getState().season.year+'-'+getState().calendar.round+'.json',exportText(getState())); toast('存档已导出'); return;
  }
  if(el.hasAttribute('data-export-text')) {
    document.querySelector('#export-text').value=exportText(getState()); toast('JSON 文本已生成'); return;
  }
  if(el.hasAttribute('data-copy')) {
    const area=document.querySelector('#export-text'); if(!area.value)area.value=exportText(getState()); if(navigator.clipboard&&location.protocol!=='file:') {
      navigator.clipboard.writeText(area.value).then(()=>toast('已复制存档')).catch(()=> {
        area.select(); toast('请按 Ctrl+C 复制选中文本');
      });
    }
    else{
      area.select(); toast('请按 Ctrl+C 复制选中文本');
    }
    return;
  }
  if(el.dataset.sort!==undefined) {
    const table=el.closest('table'),body=table.tBodies[0],index=Number(el.dataset.sort),direction=el.dataset.direction==='asc'?-1:1; el.dataset.direction=direction===1?'asc':'desc'; const rows=Array.from(body.rows); rows.sort((a,b)=> {
      const x=a.cells[index].textContent.trim(),y=b.cells[index].textContent.trim(),nx=Number(x.replace(/[^\d.\-]/g,'')),ny=Number(y.replace(/[^\d.\-]/g,'')); return direction*(x.match(/\d/)&&y.match(/\d/)&&Number.isFinite(nx)&&Number.isFinite(ny)?nx-ny:x.localeCompare(y,'zh-CN'));
    }); for(const row of rows)body.append(row);
  }
});
root.addEventListener('change',event=> {
  const el=event.target; if(wizard&&el.type==='color'){captureDraft();render();}
  else if(el.hasAttribute('data-wizard-change')) {
    const previousYear=Number(draft.year); captureDraft(); if(Number(draft.year)!==previousYear) {
      draft.alternate=-1; draft.teamId=seasonTeams(Number(draft.year))[0].id;
    }
    render();
  }
  else if(el.dataset.liveCommand) {
    perform('command',{
      id:el.dataset.driver,command:el.dataset.liveCommand,value:el.value
    });
  }
  else if(el.hasAttribute('data-autosave')) {
    perform('autosave',{
      value:el.checked
    });
  }
  else if(el.id==='import-file') {
    const file=el.files[0]; if(!file)return; if(file.size>12*1024*1024) {
      toast('存档超过 12 MB 限制','error'); return;
    }
    file.text().then(text=> {
      document.querySelector('#import-text').value=text; toast('文件已读取，请点击验证并导入');
    }).catch(()=>toast('无法读取文件','error'));
  }
});
root.addEventListener('keydown',event=>{const el=event.target.closest('a[role="button"][data-action]');if(el&&['Enter',' '].includes(event.key)){event.preventDefault();perform(el.dataset.action,JSON.parse(el.dataset.payload||'{}'));}});
root.addEventListener('input',event=> {
  const el=event.target; if(el.type==='range'&&el.nextElementSibling?.tagName==='OUTPUT')el.nextElementSibling.value=el.value; if(el.dataset.filter) {
    const term=el.value.trim().toLocaleLowerCase(); const table=document.getElementById(el.dataset.filter); if(table)for(const row of table.tBodies[0].rows)row.hidden=!row.textContent.toLocaleLowerCase().includes(term);
  }
});
root.addEventListener('submit',event=> {
  const form=event.target; if(!form.dataset.form)return; event.preventDefault(); const p=Object.fromEntries(new FormData(form)),kind=form.dataset.form; try{
    if(kind==='newGame') {
      const state=createGame({
        ...p,custom:p.mode==='custom',driverNames:[p.driverName0||'Ren Aoki',p.driverName1||'Alex Morgan'],driverIds:[p.driverId0||'custom',p.driverId1||'custom']
      }); setState(state); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('欢迎来到维修墙，先检查目标与工厂，再进入比赛周末。');
    }
    else if(kind==='setup') {
      perform('setup',{
        slot:Number(p.slot),values:[0,1,2,3].map(i=>Number(p['v'+i]))
      });
    }
    else if(kind==='strategy') {
      perform('strategy',{
        id:p.id,plan:{
          start:p.start,pitLap:Number(p.pitLap),secondLap:Number(p.secondLap),next:p.next,backup:p.backup,rain:p.rain,auto:form.querySelector('[name="auto"]').checked
        }
      });
    }
    else if(kind==='project') {
      const q=projectQuote(getState(),teamOf(getState()),p.part,p.kind,Number(p.copies)); confirmDialog(`项目总预付 ${money(q.cost+q.manufacturing)}，工期 ${q.days} 天，风洞 ${q.wind} / CFD ${q.cfd}，失败风险 ${(q.risk*100).toFixed(1)}%。确认立项？`,()=>perform('project',p));
    }
    else if(kind==='qualSend'){perform('qualCommand',{id:p.id,command:'send',value:{compound:p.compound,fresh:p.fresh!=='reuse'}});}
    else if(kind==='driverCode'){perform('driverCode',{id:p.id,value:p.value});}
    else if(kind==='train') {
      perform('train',p);
    }
    else if(kind==='pit') {
      perform('command',{
        id:p.id,command:'pit',value:p.value
      });
    }
    else if(kind==='import') {
      const imported=importText(p.json); confirmDialog('存档结构验证通过。导入将替换当前进度，确认？',()=> {
        setState(imported); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('存档导入成功');
      });
    }
  }
  catch(error) {
    toast(error.message,'error');
  }
});
document.addEventListener('click',event=>{const skip=event.target.closest('a[href="#main-content"]');if(skip){event.preventDefault();const main=document.querySelector('#main-content');if(main){main.setAttribute('tabindex','-1');main.focus();main.scrollIntoView();}}});
document.addEventListener('click',event=> {
  if(event.target.closest('[data-close]'))document.querySelector('#modal').close();
});
root.addEventListener('toggle',event=> {
  if(event.target.tagName==='DETAILS'&&event.target.open)requestAnimationFrame(charts);
},true);
window.addEventListener('hashchange',()=> {
  if(!wizard&&!getState())wizard=true; render(); window.scrollTo(0,0);
});
let resizeFrame=0;
window.addEventListener('resize',()=> {
  cancelAnimationFrame(resizeFrame); resizeFrame=requestAnimationFrame(charts);
});
window.addEventListener('beforeunload',()=> {
  if(!wizard)autosave(true);
});
let lastTick=performanceNow();
function performanceNow() {
  return globalThis.performance.now();
}
document.addEventListener('visibilitychange',()=>{lastTick=performanceNow();});
setInterval(()=> {
  const s=getState(),now=performanceNow(); if(wizard||document.hidden||document.querySelector('dialog[open]')||!s?.race||s.race.finished||!s.race.running||s.race.red||s.season.gameOver||route()!=='race') {
    lastTick=now; return;
  }
  const elapsed=Math.max(0,(now-lastTick)/1000);lastTick=now;
  if(s.race.realtime)perform('advanceRealtime',{seconds:Math.min(elapsed*s.settings.speed,40000)},true);
  else if(elapsed>=1.2/s.settings.speed)perform('tick',{count:1},true);
},60);
try{
  const saved=slotInfo('auto');
  if(saved&&!saved.broken) {
    setState(loadSlot('auto'));
    wizard=false;
    saveStatus='已恢复自动存档';
  }
}
catch(error) {
  toast('自动存档无法读取，可新建生涯或导入备份：'+error.message,'error');
}
render();

return {};
}());
}());
```

## offline.html

```html
<!-- ===== 文件: offline.html ===== -->
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0b0e13">
  <meta name="description" content="纯静态 F1 车队经营模拟：研发、转会、策略、实时比赛与多年生涯。支持离线与 GitHub Pages。">
  <title>维修墙 · F1 车队经理</title>
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./css/base.css">
  <link rel="stylesheet" href="./css/layout.css">
  <link rel="stylesheet" href="./css/race.css">
  <link rel="stylesheet" href="./css/visuals.css">
<link rel="stylesheet" href="./css/live.css">
  <script src="./js/offline.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">跳到主要内容</a>
  <svg class="svg-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="i-grid" viewBox="0 0 24 24"><path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"/></symbol>
    <symbol id="i-car" viewBox="0 0 24 24"><path d="m5 7 2-4h10l2 4 2 3v8H3v-8zm-2 3h18M6 14h2m8 0h2M6 18v3m12-3v3"/></symbol>
    <symbol id="i-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v7L4 20h16l-6-10V3M8 14h8"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m0-17a4 4 0 0 1 0 8m3 3a6 6 0 0 1 3 6"/></symbol>
    <symbol id="i-helmet" viewBox="0 0 24 24"><path d="M3 14a9 9 0 1 1 18 0v5H3Zm0 0h18M13 7l-2 7m-5 5v2h12v-2"/></symbol>
    <symbol id="i-wallet" viewBox="0 0 24 24"><path d="M3 6V3h16v3M3 6h18v15H3Zm12 5h6v6h-6Z"/><circle cx="17" cy="14" r=".6"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M3 5h18v16H3Zm4-3v6m10-6v6M3 10h18M7 14h3m4 0h3m-10 4h3"/></symbol>
    <symbol id="i-flag" viewBox="0 0 24 24"><path d="M4 22V3h15l-3 5 3 5H4m5-10v10m5-10v10M4 8h14"/></symbol>
    <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M7 3h10v7a5 5 0 0 1-10 0Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-5 0h10"/></symbol>
    <symbol id="i-save" viewBox="0 0 24 24"><path d="M3 3h15l3 3v15H3Zm4 0v7h10V3M7 21v-7h10v7"/></symbol>
  </svg>
  <div id="app"><main class="boot-message" id="main-content"><h1>维修墙 · F1 车队经理</h1><p>正在启动赛季控制中心…</p></main></div>
  <noscript><p class="notice">本游戏需要启用 JavaScript。所有数据与模拟都在本地运行。</p></noscript>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
  <dialog id="modal" aria-labelledby="modal-title"><header class="modal-heading"><h2 id="modal-title"></h2><button class="icon-btn" data-close aria-label="关闭对话框">×</button></header><div id="modal-body"></div></dialog>
</body>
</html>
```

## favicon.svg

```xml
<!-- ===== 文件: favicon.svg ===== -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b0e13"/><path d="M8 19h34L29 32H8Zm0 19h22l-13 13H8ZM46 19h12L26 51H14Z" fill="#68e8b5"/></svg>
```

## package.json

```json
// ===== 文件: package.json =====
{
  "name": "pitwall-f1-manager",
  "version": "2.2.1",
  "private": true,
  "type": "module",
  "description": "纯静态、零依赖 F1 车队经营模拟",
  "scripts": {
    "test": "node tests/engine.test.js && node tests/realtime.test.js && node tests/live-display.test.js && python3 tests/static.test.py"
  }
}
```

## .nojekyll

```text
// ===== 文件: .nojekyll =====
```

## README.md

````md
<!-- ===== 文件: README.md ===== -->
# 维修墙 · F1 车队经理

一个可以离线游玩的中文 F1 车队经营模拟游戏。纯静态、零构建、零第三方依赖，上传 GitHub 即可开启 Pages。

支持 2022、2023、2024、2025 历史开局；接管当季十支真实车队，或以第十一支车队加入。开始游戏之后，成绩、研发、合同与转会由模拟决定，不复刻历史赛果。

## 立即运行

1. **完整解压**压缩包。
2. 双击根目录的 `index.html`。
3. 选择赛季、车队或自建车队、难度与种子，开始生涯。

不需要安装 Node.js，不需要执行 npm，也不需要下载图片、字体或其他资源。

`index.html` 在 `file://` 下会加载随包附带的 `js/offline.js`，避开浏览器对本地 ES Module 导入的限制。HTTP 下则加载分层模块源码。如果浏览器禁用本地文件的脚本或存储，可直接打开同目录 `offline.html`，或使用下方的本地 HTTP 方式。

可选的本地 HTTP 运行：在项目根目录执行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。`offline.html` 也可通过 HTTP 检查经典脚本版本。

建议使用近期版本的 Chrome、Edge、Firefox 或 Safari。使用系统字体，数字使用等宽数字布局。没有音频，不需要音频权限。

## GitHub Pages 部署

1. 新建一个 GitHub 仓库，例如 `f1-team-manager`。
2. 把**本文件所在目录内的全部文件**上传至仓库根目录，确保根目录直接有 `index.html`。
3. 包含 `.nojekyll`；在某些文件管理器中它是隐藏文件，上传时请留意。
4. 进入 **Settings → Pages**。
5. **Source** 选择 **Deploy from a branch**。
6. **Branch** 选择 **main**，目录选择 **/ (root)**，点击 Save。
7. 等待 GitHub 完成部署，再使用 Pages 面板显示的网址访问。

`.nojekyll` 禁用 Jekyll 处理。本项目的资源路径全部相对，不需要配置仓库名、域名或 base URL，支持 `/<仓库名>/` 子路径。

没有服务器、API Key、数据库、账号系统、统计脚本或外部 CDN。游戏源文件加载后，模拟与存档都在本地完成。

## 排名与显示

- 实时排名第一列在三字母缩写左侧显示名次；正赛 / 冲刺仍为车手、时间差、轮胎三列。
- 正赛 / 冲刺赛时间差每 0.5 秒刷新一次（现实时间，不受倍速影响），切换 LEADER / INTERVAL 时立即刷新。
- 时间差按秒保留三位小数，例如 `+1.237`。LEADER 对比领跑者，INTERVAL 对比前车；榜首显示当前模式名称，退赛显示 OUT，套圈显示圈数。
- 本队车手以浅绿色行背景和左侧色条高亮，覆盖赛时 / 赛后排名、底部详细数据与进站记录、积分榜；切换排序不会丢失高亮。当前聚焦车手另有右侧浅色标记。
- 字体保留原版系统字体，不需要安装或下载字体。

## 核心玩法

### 赛前运营

- 总览查看董事会目标、现金、预算帽、声望、车手士气、下一站与近期新闻。
- 在车辆页面检查两台赛车的 14 种部件。更换磨损件会消耗现金并计入预算帽；超出年度动力部件 / 变速箱配额，下站罚退。
- 研发分本季升级与下季研究。研发占用风洞 / CFD，完成后进入制造队列；每套零件只能装到一辆赛车。两辆赛车都想用新规格，必须生产两套。
- 研发可以追加投入、风险审查或叫停。失败和叫停退还制造预付，已花掉的研发费用不退。
- 下季研究在赛历完成约 55% 后开放。完成的研究直接进入技术储备，无需装车。
- 可以升级五类工厂设施、扩编六个研发部门。设施不计入预算帽，部门扩编计入。
- 可选择一次违规增加试验额度，同时承担罚款与董事会处罚。
- 人员与车手页面支持市场筛选、合同谈判、续约、解约、挖角与青训。竞争力不足时对方可能拒绝；现有席位替换需支付补偿。
- 签约、解约与装车应在进入周末之前进行；周末登记阵容后锁定这些操作，直到该站结算。
- 可以推进工厂 7 天，也可以直接进入周末，自动推进到赛前两天。薪资、运营、引擎供应 / 自研维护、赞助分期和培养均按推进时间结算。

### 比赛周末

赛历页面显示当季实际举行的赛程与冲刺站点。

| 赛制 | 游戏中的流程 |
| --- | --- |
| 标准周末 | FP1 → FP2 → FP3 → Q → 正赛 |
| 2022 冲刺周末 | FP1 → Q → FP2 → 冲刺 → 正赛；冲刺结果决定正赛网格 |
| 2023 冲刺周末 | FP1 → Q → SQ → 冲刺 → 正赛；Q 决定正赛网格 |
| 2024 / 2025 冲刺周末 | FP1 → SQ → 冲刺 → Q → 正赛 |

练习收集两台车各自的设定置信区间，不直接显示隐藏的最佳值。可以在下一节练习之前调整前翼、尾翼、悬挂和胎压 / 能量倾向。练习产生少量疲劳与部件磨损。

排位赛进入中央赛道地图，使用连续倒计时。普通 Q1 / Q2 / Q3 为 18 / 15 / 12 分钟，节间休息 7 / 8 分钟；冲刺 SQ1 / SQ2 / SQ3 为 12 / 10 / 8 分钟，节间各休息 7 分钟。20 车前两段各淘汰 5 台；22 车各淘汰 6 台，最后保留 10 台。每段成绩独立，成绩相同时先做出该成绩者优先。

两位车手分别操作：

1. 在车库选择配方和新胎 / 复用本段轮胎，点击“驶出车库”。
2. 出场圈默认圈末开始飞行圈，也可以选择直接回 Pit；出场圈不计成绩。
3. 飞行圈默认完成后进入回场圈。可选择“放弃飞行圈 → 回 Pit”，或“完成后 → 再推一圈”。连续推进不会瞬移、加油或另换一套胎。
4. 完成回场圈后返回车库，可重新出场。也可以单独启用一位车手的自动出场。
5. 倒计时归零后禁止开始新的飞行圈，但可以完成归零前已经开始的飞行圈。
6. 节间休息可等待真实倒计时，也可点击“跳过节间休息”。

干地冲刺排位 SQ1 / SQ2 每段最多一套新中性胎，SQ3 最多一套软胎；同段再次出场复用该套轮胎。2023 匈牙利 / 意大利 ATA 普通排位指定 H / M / S。比赛周末库存按常规、冲刺、ATA 分配；练习轮胎归还和完整胎号管理仍作简化。

没有成绩显示 NO TIME。Q1 的 107% 超时会保留审查名单，游戏默认准予发车；没有模拟完整裁判听证。红旗冻结倒计时、取消进行中圈并召回车库，恢复后可重新出场。

进入比赛前，检查起步轮胎、首停圈、可选第二停、换胎配方与雨胎预案。默认策略在发车天气预估出现后选择合适起步配方，你仍可修改。

- 计划 A：严格执行进站窗口。
- 计划 B：适合时在安全车 / VSC 期间提前进站。
- 计划 C：额外自动应对降雨。
- 勾选“工程师自动管理比赛策略”，会让该车走与 AI 相同的天气 / 轮胎决策路径。

**干燥正赛必须实际使用至少两种干胎**；该车实际用过半雨胎或全雨胎后豁免。2025 起摩纳哥采用至少两停的游戏内判定。违反者将被取消本站资格。冲刺不要求两种干胎。

### 比赛指挥

- 默认 **1× = 1 秒现实时间推进 1 秒比赛时间**。可选 2× / 4× / 8× / 16× / 32× / 64×，支持暂停、快进一圈、自动完成。
- 练习仍为快速数据采集；排位、冲刺排位、冲刺赛和正赛全部使用连续时钟。
- 中央显示内置的 25 条真实赛道轮廓。赛车按车队颜色绘制，同队实心 / 空心区分，三字母缩写标识；点击地图或计时塔缩写切换遥测。
- 放大时间差、车手缩写、当前圈计时与车速等关键数据。正赛 / 冲刺排名只显示车手、时间差、轮胎三列，默认 LEADER 相对领先者，可切换 INTERVAL 相对前一名，退赛车显示 OUT。
- 天气、路面积水与路温直接显示在倍速控制栏；实时排名上方用赛事横幅突出黄旗、SC、VSC、红旗等状态。
- 显示当前圈计时、上圈、最佳圈、即时模拟车速，以及 S1 / S2 / S3 独立计时和平均速度。全场最快紫色、个人最佳绿色、较慢黄色；无效圈灰色。
- 地图位置随模拟时间连续计算，弯道降低速度、直道提高速度。每辆车独立过计时线，圈速不是预先一次结算后播放动画。
- 赛车设置与指令影响下一赛段，轮胎磨损、油耗和事件按赛段 / 过线事件更新。进站损失真正占用时间，不会立即跳到换胎后的圈末。
- “快进一圈”使用同一引擎推进到领跑者本圈结束；排位优先推进本队在外车手。即使暂停也可手动快进，之后保持暂停。
- “自动完成”执行当前比赛策略；排位时自动安排本队出场。普通正赛仍需正确安排轮胎与进站。
- 领先者完成距离后出示方格旗，其他赛车在下一次过线结束，套圈车无需补跑完整距离；保留真实完成圈数进行结算。
- 红旗需要点击恢复；自动完成会自动恢复。切换页面、浏览器后台或打开对话框时自动暂停推进，不积攒后台时间。
- 赛道中心线是地理轮廓；三段计时线、维修区支线与速度曲线是游戏近似，规则实现边界见 `DATA.md`。
- 页面最下方集中显示所有车手的当前圈、上一圈、最快圈、Sector、胎龄、磨损、燃油与停站次数，并保留按时间排列的进站换胎记录（圈数、配方变化、停站用时、总损失）。赛后仍可查看。
- 地图标签自动避让；点击排名任意行、地图标签或底部车手名，会同步更新聚焦车手姓名、车队颜色、遥测与选中标记。
- “第二次进站 = 0”表示关闭二停，不会在发车时预约进站；旧版尚未执行的第 0 圈误请求在载入时修复，并保留手动进站指令。
- 车手缩写可在“车手”页修改，必须为唯一的三个英文字母。

赛后生成分类、积分、最快圈、进站和处罚信息、每十圈领跑分段记录与本队位置曲线。成绩存入分站档案。点击“完成本站结算”后，才可装车、签约和准备下一站。

### 财务与目标

金额单位统一为 **百万美元（m）**。

- **现金**：收入、薪资、研发、工厂投资、奖金、罚款等均影响现金。现金低于零会结束本次生涯。
- **预算帽**：研发、制造、部件、人员 / 车手薪资、运营、专项培养、违约金计入；设施、入场担保金与罚款不计入。这里采用为玩法简化的分类，**不等同于真实 FIA 财务规则**。
- 预算帽超支在赛后 / 季末调查，产生罚款与测试额度削减；严重超支取消积分资格。
- 低于 $20m 现金时每季可申请一次 $15m 紧急援助，但会失去董事会信任与声望。
- 赞助按日分期支付，领奖台、积分、Q3、冠军等触发额外奖金。明星车手增加赛事与周边收入。
- 董事会信心受成绩、财务和季末目标影响；归零会结束本次生涯。

自建车队的初期目标是维持全年运营、进入制造商前九、争取首分；低等级工厂、有限现金与低声望会让开局更具挑战。

### 多年生涯

完成赛历后，进入赛季结算与转会窗。冠军与本队排名进入荣誉室，制造商奖金入账，年龄与合同年限更新，AI 会续约、招揽对手或提拔青训，部分老将会退役。

进入下一季之前，确保两位主力与领队有有效合同。现金与技术储备保留；积分、部件配额、预算帽与赛历重置。

**2026 及后续为架空生涯**：沿用 2025 赛道 / 冲刺站点，2026 只实现游戏化技术重置、电能权重变化与 MGU-H 停用。没有声称内置完整真实 2026 阵容、赛历或全部主动气动 / 超车新规。

## 存档

- 独立自动存档 + 三个手动槽。
- 关键操作后自动保存；实时比赛中间隔约 5 秒保存。
- 顶栏显示保存状态。可以在存档页关闭自动保存。
- JSON 文件导入导出、文本导入导出、复制按钮；浏览器不支持剪贴板 API 时，选中文本后按 Ctrl+C。
- 数据损坏、版本不兼容、车手归属冲突等会明确报错，不替换当前进度。
- schemaVersion 为 3；兼容本项目定义的 v1 / v2 结构迁移，不兼容其他游戏或任意形状的 JSON。
- 同一存档、相同操作顺序会得到相同的模拟结果。倍速只改变每次推进的比赛秒数；相同比赛时刻与指令顺序不会因刷新频率而改变随机序列。旧版逐圈比赛存档载入后转换为连续场次，保留圈数、胎耗与既有差距，恢复点的赛段位置采用近似转换。
- 本地文件、localhost、GitHub Pages 的存储域不同。切换运行方式时请用 JSON 搬运存档。
- 无痕窗口、禁用存储、浏览器清理数据和存储配额可能影响本地存档。多年生涯建议定期导出 JSON。

## 源码结构

| 路径 | 职责 |
| --- | --- |
| `index.html` / `offline.html` | 常规入口 / 强制经典脚本入口，内联 SVG 图标 |
| `css/base.css` | 深色变量、通用组件、表单、可访问性 |
| `css/layout.css` | 导航、页面、向导、卡片、表格、弹窗、响应式 |
| `css/race.css` | 计时塔、指令、轮胎、气象与无线电 |
| `js/data/teams.js` | 四季阵容、身份、供应商、历史排名、可选中期阵容 |
| `js/data/drivers-data.js` | 真实车手身份、属性、赛季调整与替补池 |
| `js/data/tracks.js` | 25 条赛道、四季赛历、冲刺站点、赛道年份变体 |
| `js/data/parts.js` | 14 部件、10 性能维度、设施、部门、轮胎、驾驶指令 |
| `js/data/staff-data.js` / `sponsors.js` | 虚构员工 / 赞助商与特质条款 |
| `js/data/logos.js` / `i18n.js` | 24 款几何队徽 / 中文导航和文案 |
| `js/core/state.js` | 单一状态、开局、action 路由、失败回滚 |
| `js/core/rng.js` / `helpers.js` | Mulberry32、种子、通用校验、排名与新闻 |
| `js/core/calendar.js` | 日历、时间推进、周末初始化、设定与策略 |
| `js/core/car.js` | 装车评分、圈速、设定、轮胎、油量、更换与装配 |
| `js/core/rnd.js` | 项目、测试额度、失败、日推进、制造、设施、部门 |
| `js/core/staff.js` / `drivers.js` | 合同、挖角、特质、成长、老化、青训 |
| `js/core/finance.js` / `rules.js` | 双池、收支、赞助、规则与处罚 |
| `js/core/race.js` | 练习、分段排位、逐圈正赛、事件、积分与报告 |
| `js/core/ai.js` / `season.js` | AI 研发 / 装车 / 策略 / 转会、赛季结算与新规 |
| `js/core/save.js` | 结构验证、v1 / v2 → v3、实时场次恢复、存档槽、JSON 导入导出 |
| `js/core/realtime.js` | 连续事件引擎、排位状态机、独立车手计时、进站与方格旗 |
| `js/core/trackGeometry.js` / `js/data/track-layouts.js` | 真实地理轮廓、弯道速度分布、地图位置计算 |
| `js/core/driverCodes.js` | 三字母缩写生成、去重与修改 |
| `js/ui/liveView.js` / `css/live.css` | 中央地图、计时塔、车手遥测与排位控制 |
| `js/ui/*.js` | 页面渲染、格式化、原生 Canvas 与局部比赛补丁 |
| `js/main.js` / `boot.js` | DOM 事件、导航、计时、交互与启动选择 |
| `js/offline.js` | 随包提供的经典脚本，无需运行时构建 |
| `tests/engine.test.js` | 零依赖 Node 引擎回归测试 |
| `tools/build_offline.py` | 修改模块源码后重建离线脚本的可选开发工具 |
| `DATA.md` / `SELF_CHECK.md` | 来源、数值模型、简化边界 / 实际验证清单 |
| `SOURCE_CODE.md` | 按要求顺序排列、逐文件代码块的完整源码阅读版 |

状态顶层为 `schemaVersion / rng / nextId / teams / drivers / staff / parts / finance / calendar / race / season / player / settings / news / history`。状态不包含函数、DOM、定时器或循环引用。

核心引擎不操作 DOM；UI 调用 action 修改状态。赛事随机性、合同接受概率、研发失败与 AI 选择统一使用保存在状态中的 Mulberry32 随机状态。

## 修改与扩展

新增历史赛季至少需要：

1. `teams.js` 增加 `LINEUPS`、`PERFORMANCE`、`PREVIOUS_RANKS` 及可选阵容。
2. `drivers-data.js` 增加涉及的真实车手、替补池与赛季调整。
3. `tracks.js` 增加对应 `SCHEDULES`、`SPRINTS` 和新增赛道数据。
4. 若规则有变，更新 `seasonRules()` / `sessionsFor()`。
5. 在向导和 `createGame()` 的允许年份列表添加新年份。

增加同一规则下的新赛季是数据编辑；新的赛历与规则本身不能从两个阵容文件中自动推导。

修改任意模块后，运行一次：

```bash
python tools/build_offline.py
```

这是**开发时可选操作**，不是用户运行或部署的构建步骤。提交更新后的 `js/offline.js`，保证双击与 HTTP 两条路径一致。`offline.html` 使用同一份经典脚本。

执行回归测试（仅开发者需要 Node.js 18+）：

```bash
node tests/engine.test.js
node tests/realtime.test.js
node tests/live-display.test.js
```

无需 npm install。测试覆盖 40 个真实车队开局、四季两模式、冲刺、排位、研发、合同、存档、跨季与 500 圈模拟，实际结果见 `SELF_CHECK.md`。

## 已知简化

这是一款连续时间的经营策略模拟，不是 3D 驾驶游戏。主要排位和比赛流程已接入实时引擎，**并非完整 FIA 规则验证器**：裁判裁量、107% 准入听证、实际计时线坐标、历史全部赛道布局、SC 解套圈、红旗停车 / 换胎特例和缩短比赛积分仍有简化。2026 以后仍为架空生涯。详见 `DATA.md`。

## 后续适合迭代的三个方向

1. 使用逐站真实计时线与维修区坐标，扩充安全车解套圈和完整裁判流程。
2. 更长期的董事会承诺、竞争报价及完整转会谈判回合。
3. 扩充真实 2026 数据与完整新规，并继续校准各赛道数值。

## 许可

原创程序代码使用 **GPL-3.0-or-later**，全文见 `LICENSE`。车队与车手名称用于非官方模拟和身份识别；本项目与 Formula 1、FIA、任何车队或车手无隶属或授权关系。游戏没有使用真实队徽、照片、官方字体或音视频；所有几何队徽与赛车示意图均为项目内绘制。

赛道中心线改编自 MIT 许可的 bacinger/f1-circuits，作者署名和许可全文见 `THIRD_PARTY_NOTICES.md`。
````

## DATA.md

````md
<!-- ===== 文件: DATA.md ===== -->
# 数据来源与游戏化平衡值

## 数据类别

**非官方数据，为玩法平衡而设计**：所有车手能力、潜力、薪资、合同、员工能力、赞助金额、车队性能、现金、成本帽游戏上限、厂商研发能力、风洞额度、研发效果、故障概率、天气与赛道策略系数。不得将这些数值描述为官方遥测或官方财务数据。

身份字段、历史阵容、赛历站点、典型长度 / 圈数和运动规则方向依据公开资料。车手年龄采用“赛季年 − 出生年”，不会逐日计算生日。号码使用当季主力常用号码；自建车手用 90 / 91，不实现号码申请制度。

默认阵容是赛季签约开季阵容，不逐站复刻临时病假或事故替补。例如 2022 Aston Martin 默认 Vettel / Stroll，而不是首两站临时替补阵容。

## 官方资料入口

以下网址只供阅读出处；**游戏不会请求这些地址**。

- [F1 2022 车手与车队成绩档案](https://www.formula1.com/en/results/2022/drivers)
- [F1 2023 赛历与取消标记](https://www.formula1.com/en/racing/2023)
- [F1 2024 赛历](https://www.formula1.com/en/racing/2024)
- [F1 2025 赛历](https://www.formula1.com/en/racing/2025)
- [F1 2025 开季车手阵容](https://www.formula1.com/en/latest/article/2025-f1-grid-all-the-driver-and-team-line-ups-confirmed-so-far.7yijhWBNHjqKwHTRFEMZUa)
- [F1 2025 车号](https://www.formula1.com/en/latest/article/all-the-2025-f1-driver-numbers-confirmed-in-full.MQatOGQ4HR0i8kg4lPkP4)
- [F1 2023 冲刺流程](https://www.formula1.com/en/latest/article/explained-everything-you-need-to-know-about-the-2023-f1-sprint-format.583WHWKbWVVBemPKi6pJxH)
- [FIA 2023 冲刺流程调整](https://www.fia.com/news/formula-1-commission-meeting-250423)
- [F1 2024 冲刺流程](https://www.formula1.com/en/latest/article/2024-f1-sprint-rules-format-explained.5pQvaAY52nnX9vZYAYgf3O)
- [F1 / FIA 2025 冲刺站点](https://www.formula1.com/en/latest/article/fia-and-formula-1-announce-2025-sprint-calendar.3fjONI6I9cAyThBj73oQRX)
- [F1 2025 取消最快圈加分](https://www.formula1.com/en/latest/article/from-fastest-lap-to-increased-rookie-running-7-rule-changes-you-need-to-know.pgdSMDnDyv1aJUgtcKPp6)
- [FIA 2025 运动规则，2024-07-31 版本](https://www.fia.com/sites/default/files/fia_2025_formula_1_sporting_regulations_-_issue_1_-_2024-07-31.pdf)（22 车排位淘汰人数参考；这份早期版本不是最终 2025 规则全集）
- [F1 Tsunoda / Lawson 2025 换席](https://www.formula1.com/en/latest/article/breaking-tsunoda-to-replace-lawson-at-red-bull-from-japanese-gp-as-new.49qawI5Q4YYPhhMJpHqUiO)

赛道数值是手工整理的典型完整赛程。它不等于历史每一场比赛实际跑完的距离；红旗、天气导致的历史缩短场次不会在开局时预先复刻。

## 四季数据范围

| 年份 | 车队 | 正赛车手 | 站数 | 冲刺站数 | 最快圈积分 |
| --- | --- | --- | --- | --- | --- |
| 2022 | 10 | 20 | 22 | 3 | 正赛前十中的全场最快圈 1 分 |
| 2023 | 10 | 20 | 22 | 6 | 同上 |
| 2024 | 10 | 20 | 24 | 6 | 同上 |
| 2025 | 10 | 20 | 24 | 6 | 不加分 |

25 条赛道取四季并集：包含 2022 法国站，以及后续赛季的中国、卡塔尔、拉斯维加斯。2023 不加入已取消的中国 / 伊莫拉站。2022 不加入已取消的俄罗斯站。西班牙 / 新加坡的赛道变体按年份处理。

中期阵容快照包括：2023 新加坡 Lawson 替补；2024 美国站 Colapinto / Lawson；2025 日本站 Tsunoda / Lawson 互换和伊莫拉站另含 Colapinto。这些是可选快照，选用后从第一站开始模拟；**不会自动在历史日期执行换人**。没有穷举所有短期替补，例如 2024 的全部临时 Bearman 代班。

队徽是 24 款原创几何图案，不是十支车队的官方商标图形。工作人员和赞助商品牌均为虚构；真实人员的合同与薪资不作推断。

## 圈速模型

代码：`js/core/car.js` 与 `js/core/realtime.js`。

1. 各车有 10 个 0—100 评分。“重量”实际表示轻量化得分，越大越好，不是公斤数。
2. 按五种赛道类型加权，得到 `carScore`。例如高下压力赛道下压力权重 .34；低阻赛道气动 .32、动力 .21。
3. 理论单圈：

```text
赛道基准秒数
+ (95 − 赛车加权得分) × 0.075 秒
+ (95 − 车手有效能力) × 0.026 秒
+ 疲劳惩罚 + 士气惩罚
```

正赛车手有效能力：正赛节奏 55%、轮胎管理 18%、稳定性 12%、总体速度 15%。排位：单圈速度 80%、总体速度 20%。

典型顶级与末位车 25—35 分差对应约 1.9—2.6 秒的赛车差距。队友 4—20 分差对应约 0.1—0.52 秒。具体赛道、年份和属性上限会影响实际差距；这些是校准目标，不是每一对车手必然满足的硬界限。

正赛再叠加：

- 设定偏差：每个维度偏离隐藏最优值超过 5 点的部分，每点损失 .008 秒。
- 燃油：每公斤 .03 秒，即每 10kg .3 秒。
- 轮胎：配方差异 + 线性胎龄损失 + 65% 磨损之后的二次退化 + 温度与天气不匹配惩罚。
- 驾驶 / 引擎指令影响速度、磨损、油耗和风险。
- 脏空气等效增加 .22 秒、轮胎温度上升；DRS 减少 .4 秒。
- 湿地惩罚随积水与车手湿地能力变化。
- 实时引擎每段基础随机噪声为 ±.06 秒，三个赛段合计最多约 ±.18 秒；失误、进站与中和比赛另计。旧版兼容引擎仍保留每圈 ±.15 秒的噪声定义。

## 轮胎、进站与可靠性

正常中等磨耗赛道，标称软 / 中 / 硬寿命为 19 / 29 / 40 圈，再按赛道、车手轮胎管理、指令、员工特质调整。寿命用于换算磨损速度，不意味着到达该圈数就必定爆胎。

停站时间以机械师能力映射到 2.0—4.5 秒，加约 ±.18 秒波动；进站大师减少 .15 秒但不低于 2 秒。慢停站另加 7—14 秒。维修区通行损失按赛道叠加；SC / VSC 时通行损失系数 .58。

每个部件每站故障概率基线 .5%，随磨损、可靠性、温度、脏空气上升，并截断至 4%；摊分到逐圈判定。高功率增加动力部件磨损与故障风险。各部件逐项独立判定，因此整车故障率不是单个部件的 .5%—4%。

冷却和下压力等采用等效圈速 / 风险模型，没有完整流体动力学计算。安全车与 VSC 减少油耗与胎耗、降低胎温；连续引擎分别以约 1.45 / 1.35 的时间系数减速。安全车收拢队列与解套圈尚非完整实车流程。正赛红旗暂停后通过安全车重启；排位红旗冻结倒计时并使正在进行的圈无效。

## 实时赛道、Sector 与排位规则

- 25 条赛道中心线来自 [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits)，已投影并内置在 `js/data/track-layouts.js`；无需运行时请求。MIT 作者署名与许可全文见 `THIRD_PARTY_NOTICES.md`。
- 数据是上游当前地理轮廓，**不保证重现每个历史年份的所有改线**。2022 西班牙 / 新加坡仍使用对应年份长度、圈数与圈速参数，但地图轮廓为现有数据版本。
- 计时线在赛道距离 32% / 68% 处分段，**不是官方计时环线坐标**。维修区支线为示意，进站损失按赛道参数真正占用连续时间；地图以维修区停留表示这一过程，不复刻维修区每米行驶。
- 每段时长根据地理轮廓的弯曲程度分配。等距离采样生成确定的行驶时间曲线，弯道慢、直道快，再按赛车与车手模型缩放。该曲线为策略游戏模型，不是官方 GPS 遥测或完整车辆动力学。
- Sector 平均速度 = 本段模拟距离 ÷ 本车实际用时 × 3600；当前车速由行驶曲线的距离 / 时间导数计算。上圈时间是实际两次过线之差。维修区损失计入下一圈 S1 和单圈时间。
- 普通排位 18 / 15 / 12 分钟；冲刺排位 12 / 10 / 8 分钟。各段独立计时、淘汰；普通节间 7 / 8 分钟，冲刺节间各 7 分钟。先做出相同时间者优先；无圈速按是否开始飞行圈、是否出场及前一节排名排序。
- 实现出场圈、有效飞行圈、放弃圈、回场圈、连续飞行圈、回库复用本段轮胎；归零后禁止开始新飞行圈，已开始的有效飞行圈可以完成。
- 干地 SQ1 / SQ2 每段一套新 M，SQ3 一套 S；2023 匈牙利 / 意大利 ATA 为普通 Q1 H、Q2 M、Q3 S。湿地状态放开配方；未模拟真实“宣布湿地后余下整节”的所有例外。
- 常规初始干胎 S8 / M3 / H2，冲刺 S6 / M4 / H2，ATA S4 / M4 / H3；雨胎采用 I4 / W3 的游戏库存。练习归还、Q3 保留胎与全周末胎号追踪未完整模拟，因此这不是完整 FIA 轮胎规则复刻。
- 107% 超时保留待审查名单，游戏默认准予发车。裁判听证、完整 parc fermé、阻挡调查、发车违规与所有罚退网格细则尚不等同于正式赛事。
- 对照资料：[FIA 2025 运动规则 Issue 5，2025-04-30](https://www.fia.com/system/files/documents/fia_2025_formula_1_sporting_regulations_-_issue_5_-_2025-04-30.pdf)，重点为 30、39、42、59、62 条；[2023 ATA 意大利站说明](https://www.formula1.com/en/latest/article/need-to-know-the-most-important-facts-stats-and-trivia-ahead-of-the-2023-italian.5s6y4U1AkqQLpX6q4hz6U9)。

## 显示语义

轮胎颜色：S 红、M 黄、H 白、I 绿、W 蓝。圈速 / 赛段：紫色表示全场最快，绿色表示个人提升，黄色表示未提升，灰色表示无效或非计时圈。维修区蓝色、一般提醒琥珀色、故障 / 处罚红色；图标与文字同时保留，避免只靠颜色识别。三字母缩写与全名一同存档，可在车手页修改。

## 经营模型与简化

- 2022 基础预算帽 $140m，2023 起 $135m，另有难度系数。没有真实通胀、赛程增量和全部例外。
- 本项目按附件要求将车手 / 员工薪资纳入游戏预算帽，**真实 FIA 成本帽存在重要薪资排除项目，不能据此了解真实合规口径**。
- 厂商可自主研发动力，客户依赖供应商。Red Bull 被归入厂商运营类型，这是战略玩法抽象；不表示其每一历史赛季完全独立制造所有动力部件。
- 引擎采购成本按供应商报价纳入日常运营，厂商按统一维护费结算。分供应商性能取舍为非官方平衡值。
- ATR 风洞 / CFD 按上季排名分配全年抽象额度，不模拟真实每个 ATR 周期与全部分钟 / 算力单位。
- 非动力外观部件不限制年度使用数；动力 / 变速箱数量有限。超额统一每次罚退 10 位，不复刻首次 / 后续各部件的全部细分罚退规则。
- 赛道限制三次警告，第四次 5 秒、后续 10 秒；碰撞可罚 10 秒；维修区超速使用穿越罚则。不模拟申诉、驾驶证超级积分、排位阻挡调查；游戏内严重危险驾驶可罚下场正赛维修区起步，但不复刻全部真实裁定。
- 不模拟轮胎胎号、整套 parc fermé 例外、组件封印、维修区开放 / 关闭的全部特例与红旗免费换胎规则。
- 实时引擎以连续秒数推进，按各车赛段过线、出场、进站结束和倒计时边界处理事件。正赛实时差距以距离差和基准圈速估计，可用 LEADER / INTERVAL 分别选择领先者或前一名作为参照，单位为秒；最终名次使用实际完成圈数与过线时刻。已实现套圈车在领跑者方格旗后的下一次过线结束，尚无完整 SC 解套圈程序。
- 争夺同一赛段出口的反超需要通过超车 / 防守能力、DRS 与赛道难度判定。持续贴身缠斗、阻挡、碰撞裁定和安全车队列仍为策略游戏近似。实时赛段时长按赛道曲率分配，再叠加赛车、车手、轮胎与事件，不再按固定比例拆分整圈时间。
- 实现正赛 2 小时 / 冲刺 1 小时的计时终点：时限经过后，领先者于下一圈末结束。未实现红旗总时限、提前永久终止、缩短积分梯度与全部重启程序。排位天气采用周末起始湿度，不逐分钟演化雨带。
- 合同是“报价 → 按薪水 / 声望计算接受概率 → 即时转会”，包含违约补偿；尚未实现多轮讨价还价、承诺条款的独立任务树。
- AI 使用同结构研发、库存、装配、合同与比赛赛车。难度改变研发速度和错误概率；四类人格影响投资、项目偏好及比赛风险。
- 员工岗位保留完整组织结构，关键数值影响集中在技术总监、工程师、策略、机械师、青训、营销及特质；没有给每个岗位建立独立管理子游戏。

## 新规与生涯边界

2026 为游戏化过渡，不是可选择的第五个历史开局：旧技术增益保留 35%（常规过渡保留 75%），下季研究按 150% 转化，电能部署 / 功率权重上升，停止 MGU-H 研发与故障判定。

2026 以后沿用 2025 赛历和冲刺站点，阵容由游戏内转会发展。没有使用真实 2026 历史阵容，也没有实现真实 2026 超车模式、主动气动与供应商调整的完整规则。真正扩展一个历史赛季仍须补齐身份、赛历、赛道与规则数据。

## 可复现性与隐私

模拟随机数只来自 `rng.js`；种子和 RNG 当前状态均保存。日期推进是游戏日期。导出 / 存档时间戳是元数据，不参与模拟。浏览器定时器按实际经过秒数乘以倍速推进连续时间。离开比赛页面、进入后台或弹窗期间不积攒追赶时间。相同种子、相同比赛时刻执行相同指令时，大时间步与多个小时间步产生相同事件与 RNG 状态；已加入排位 / 正赛分步一致性测试。

游戏不发起外部 API 请求，不采集个人信息。存档保存于当前浏览器运行域的 localStorage；JSON 文件由用户主动下载或导入。

## 2.1.0 显示与进站修正

三列排名的实时差距仍按距离差与赛道基准圈速估计；切换参照不会改变比赛状态或随机序列。地图标签使用确定的避让布局。底部进站记录取真实模拟停站事件，按该车实际完成圈数记录，并显示旧胎 → 新胎与时间损失。

首停 / 二停窗口仅在正整数圈数匹配时触发，0 表示禁用。自动策略与 B / C 预案仍可根据既有设定调整停站；未启用这些行为时按玩家窗口执行。
````

## SELF_CHECK.md

```md
<!-- ===== 文件: SELF_CHECK.md ===== -->
# 实现与验证自检

验证日期：2026-10-22。以下区分实现、自动测试与浏览器检查；没有把未执行的本机测试标记为实测通过。

## 附件要求的逐项自检

| 结果 | 检查项 | 实现位置 / 验证方法 |
| --- | --- | --- |
| ✓ / △ | 打开 index.html 无白屏，进入向导 | `js/boot.js` 启动分支、`js/main.js` 初始化、`ui/setupWizard.js`。HTTP 模块入口、HTTP 经典脚本入口均已用浏览器检查，未发现应用脚本报错。**本机 file:// 双击未在当前云浏览器实机验证**；已提供经典脚本回退。 |
| ✓ | 十支真实车队与自建两种开局完整跑通 | `core/state.js:createGame`；自动测试分别完成四季 × 十队的 40 个首周末，并覆盖四季 × 两模式。浏览器实际检查 McLaren 与 Lele Racing 两条路径。 |
| ✓ | 自建队徽、名称、车手姓名 | `ui/setupWizard.js`、`data/logos.js`、`core/drivers.js:createCustomDriver`；浏览器选第 24 款队徽、自定义两个名字成功。 |
| ✓ | 至少四季阵容、赛历、规则一致 | `data/teams.js`、`drivers-data.js`、`tracks.js`；`core/rules.js:seasonRules / sessionsFor`。自动检查四季与冲刺站点流程。 |
| ✓ | 研发立项、额度、完工、制造、单车装配 | `core/rnd.js:startProject / advanceRND`、`car.js:fitPart`；自动检查一套底板只改变指定赛车性能，另一车不变。 |
| ✓ | 现金与预算帽分离且超支有后果 | `core/finance.js`、`rules.js:checkBudget`、`ui/financeView.js`；自动检查罚款、额度削减、轻度升级重度处罚和积分档案同步。 |
| ✓ | 员工 / 车手签约、续约、解约及真实数值影响 | `core/staff.js`、`drivers.js`；研发主管、工程师、机械师、青训、营销与员工特质接入引擎。自动检查合同操作；谈判存在拒绝概率。 |
| ✓ | 完整比赛周末，含雨地、SC、红旗、处罚与进站 | `core/realtime.js` 连续引擎 + `core/race.js` 的共享练习 / 规则 / 结算；新增实时回归覆盖四季冲刺周末。旧引擎回归继续覆盖 SC / 雨地 / 赛道限制。浏览器完成新版 22 车排位与正赛。 |
| ✓ | 真实时间、倍速、快进一圈、自动完成与积分更新 | `ui/liveView.js`、`js/main.js` 实际秒数、`core/realtime.js` 事件推进；自动验证分步一致性、独立过线与积分守恒。浏览器验证默认 1×、暂停、快进一圈、64× 正赛与自动排位。 |
| ✓ | 季末结算、转会窗、下一赛季与新规 | `core/season.js:settleSeason / nextSeason`、`ai.js:aiTransfers`；自动完整推进 2025 赛历并开启 2026，检查预算帽 / 积分 / 部件配额重置。2026 为明确标注的架空规则扩展。 |
| ✓ | 手动 / 自动存档、JSON 文本和文件导入导出 | `core/save.js`、`ui/saveView.js`、`js/main.js`；自动检查四槽、实时排位 / 正赛中途保存再继续逐字段一致、v2 迁移。前版浏览器已完成手动槽写入与 JSON 文本往返，新版经典入口再次恢复相同进度。文件下载通过原生 Blob / 下载链接实现，文件选择使用原生 File API。 |
| ✓ | 刷新恢复存档，无白屏 | `js/main.js` 启动恢复；浏览器实际刷新比赛中的暂停存档，恢复圈数、轮胎、指令，再继续比赛。 |
| ✓ | 无外部 API / CDN，支持仓库子路径 | `tests/static.test.py` 检查运行时引用相对、资源存在、无 fetch / XHR / WebSocket 与 Math.random；浏览器实际打开 `/subpath-check/index.html#car` 并显示车辆 / 轮胎曲线。未实际推送 GitHub 或创建托管站点。 |

## 实时赛道版内容

| 结果 | 内容 | 验证 |
| --- | --- | --- |
| ✓ | S / M / H / I / W 红黄白绿蓝，最快圈紫色，指标图标与语义颜色 | `css/visuals.css`、`ui/uiKit.js`；浏览器查看轮胎控件、计时塔、最快圈 |
| ✓ | 三字母缩写、真实车手代码、自建去重与可编辑 | `core/driverCodes.js`；自动检查唯一性、中文名、冲突拒绝 |
| ✓ | 中央真实赛道轮廓与各车连续移动 | 25 条地理数据，`core/trackGeometry.js`；自动检查路径及位置，浏览器查看动态地图 |
| ✓ | 各车独立计圈与 S1 / S2 / S3 时间、均速 | 自动检查圈时等于三段实际时间和，弯道时间分配与位置随时间变化 |
| ✓ | 完整出场 / 飞行 / 放弃 / 回场 / 再推一圈指令 | 自动状态机测试，浏览器实际操作出场、放弃回 Pit、再出场与连续推进 |
| ✓ | Q / SQ 倒计时、节间休息、淘汰与指定轮胎 | 18/15/12、12/10/8、7/8 分钟、22 车淘汰六人、SQ 一套胎与 ATA 测试 |
| ✓ | 归零边界、红旗、暂停、快进 | 自动检查归零前已开始飞行圈允许完成、归零后出场圈无计时成绩、红旗冻结与恢复 |
| ✓ | 实际进站时间与套圈车结束比赛 | 自动检查 Pit 停留、真实圈时、领跑者方格旗后下一次过线结束 |

## 2.1.0 修复与验证

- 新增 `tests/live-display.test.js`，7 项检查：第 26 圈首停且关闭二停、LEADER / INTERVAL / OUT、22 台车密集地图标签避让、三列结构与详细区位置、聚焦 ID 与旗帜、旧存档误请求修复、设置保存与纯显示不消耗 RNG。
- 浏览器实测：普通排位点击 VER、地图点击 LEC、正赛点击 RUS，姓名、车队颜色与遥测同步更新；19 个同时显示的地图标签包围框没有相交。
- 浏览器实测：正赛排名三列、INTERVAL 切换、顶栏天气、底部详细区位于页面最后；第一圈本队停站次数为 0。
- 浏览器实测：手动预约进站后取消，指令确实清除；再次预约并过线后，底部正确显示 L2、M → H、停站 2.24 秒及总损失 24.24 秒。
- 本次桌面布局检查无应用来源脚本错误。手机和用户本机 Win10 浏览器未逐一实测；保留响应式断点与明确的字母宽度。

## 2.2.0 排名显示验证

- 浏览器实测普通字体仍为 Consolas / Liberation Mono / Menlo 系统等宽字体，无附加字体资源。
- 冲刺排位显示排名数字；本队两名车手的背景高亮与其他车手区分，排名与缩写包围框不相交。
- 冲刺赛实测 LEADER / INTERVAL 切换、榜首模式名称、其余车手三位小数；所有行的名次、缩写和时间差无相交。
- 积分榜两名本队车手、制造商本队和分站积分明细高亮；按积分重新排序后仍正确绑定车手。
- 增加本队高亮在多处排名中绑定所属车队的自动回归，并补充排名数字与毫秒格式检查。
- 经典脚本入口 offline.html 实测恢复 INTERVAL 模式，榜首显示 INTERVAL，本队两行高亮与原版等宽字体保持正确。

## 2.2.1 时间差刷新验证

- 定向回归：500ms 内保持时间差，达到 500ms 才更新；64× 仍按现实时间节流；模式切换立即更新；OUT 按刷新节奏显示，排位赛保持原更新频率。
- 浏览器检查冲刺赛正常推进后暂停，切换 LEADER / INTERVAL 即时显示正确榜首与三位小数差距。
- 新增检查只控制排名时间差 DOM 的更新，不修改模拟计时、赛道位置或保存数据。

## 自动回归结果

- `node tests/engine.test.js`：原有 19 项经营 / 兼容引擎测试通过。
- `node tests/realtime.test.js`：新增 25 项实时引擎测试通过。
- 新版 action 入口全程完成 2025：24 个周末、30 场比赛，每六站序列化 / 恢复一次并完成季末。
- `node tests/live-display.test.js`：9 项显示 / 进站修复检查通过。
- 回归测试与静态资源检查均通过；完整输出保存于 `tests/last-run.txt`，结构化结果保存于 `tests/last-run.json`。
- 其中包含 40 个真实车队开局、四季两模式完整周末与全部年度冲刺流程。
- 实际测试输出：`tests/last-run.txt`；结构化结果：`tests/last-run.json`。
- 500 圈性能采用**十场各 50 圈**，断言每场确实完成 50 圈，避免全部退赛提前结束造成虚假基准。最终耗时见日志，低于 1 秒目标。该基准验证保留的旧版兼容引擎，**不作为新实时引擎或界面帧率的基准**。该数字不含 DOM 渲染、JSON 序列化或存储，且取决于测试机器。
- `python tests/static.test.py`：运行时资源路径、文件存在性、无外部 API、随机来源、核心无 DOM 检查通过。

## 浏览器实测覆盖

- HTTP 模块入口正常显示向导，接管 McLaren 后进入仪表盘。
- 新版 FP1 / FP2 / FP3 → 实时 Q1—Q3 → 正赛全程至赛后报告；22 台赛车。
- 新版出场、放弃飞行圈回 Pit、再次出场、连续飞行圈、暂停、快进一圈、64× 正赛。驾驶模式与手动进站前版已浏览器检查，新版额外通过引擎验证。
- 研发、人员、车手、车辆、财务、积分档案等页面均可正常渲染。
- 经典脚本 `offline.html` 加载成功；前版完成手动槽写入、JSON 导入，新版检查恢复存档与实时排位入口。
- 自建第十一队：Lele Racing / LLE、两位自建车手、第 24 个队徽和扣担保金后的 $43m 现金。
- 子路径 `/subpath-check/` 入口及轮胎曲线加载成功。
- 检查到的浏览器扩展自身元数据错误不来自本应用；应用来源的错误日志为空。

## 如实列出的边界

- 当前云浏览器没有直接打开交付文件在用户电脑上的 file:// 路径，因此不能把“用户本机双击运行”标为实机通过。
- 未在实际 GitHub Pages 托管环境部署；验证了相同的静态子路径加载方式，用户按 README 手动开启即可。
- 手机和所有浏览器组合未逐一实测；CSS 已包含窄屏侧栏和表格横向滚动，桌面浏览器已检查。
- 未把每个罕见随机事故都在浏览器里手动触发；常规周末与特定状态事件通过引擎回归验证。
- 所有数值与规则简化详见 `DATA.md`。没有声称拥有全套真实 FIA 裁判 / 财务规则、完整 2026 新规或复杂多轮合同任务系统。
```

## CHANGELOG.md

```md
<!-- ===== 文件: CHANGELOG.md ===== -->
# 2.2.1 · 时间差刷新频率

- 正赛 / 冲刺赛 LEADER、INTERVAL 时间差改为每 0.5 秒刷新一次，按现实时间计，不随倍速加快。
- 切换 LEADER / INTERVAL 立即显示新模式读数；排位赛、比赛模拟、赛道位置与其他遥测继续按原频率更新。

# 2.2.0 · 排名辨识优化

- 排位赛、冲刺与正赛的车手缩写左侧加入实时排名数字，仍保留原有列数。
- LEADER / INTERVAL 的秒数差距显示三位小数；INTERVAL 模式下榜首显示 INTERVAL，LEADER 模式下显示 LEADER。退赛 OUT 与套圈提示保留。
- 调整排名列宽与独立的数字 / 缩写间距，防止三位小数和两位数排名挤压文字。
- 本队车手采用浅绿色背景与左侧色条，覆盖实时排名、详细数据、进站历史、赛后报告、排位分段与积分榜；表格排序后高亮继续跟随对应行。
- 聚焦车手使用右侧浅色条，兼容本队高亮。
- 按用户最终要求保留原版字体，不附带或加载其他字体。

# 2.1.0 · 赛事显示与进站修复

- 修复“二停 = 0”被误判为第 0 圈停站，造成首圈自动换胎。计划首停按该车实际完成圈数执行；修复旧存档中尚未执行的误请求，保留手动指令。
- 正赛 / 冲刺排名精简为车手缩写、时间差、轮胎三列；默认 LEADER，可切换 INTERVAL，退赛显示 OUT。
- 地图车手标签自动避让，放大关键数据并为字母、时间差保留完整宽度。
- 修复聚焦车手身份与遥测不同步；点击排行榜、地图及底部车手名都能立即更新姓名、车队颜色与数据。
- 页面底部集中显示全场圈速与轮胎 / 燃油数据、逐次进站换胎历史，赛后继续保留。
- 倍速栏显示当前天气、路面积水和路温；排名顶部增加赛事状态横幅。
- 修复“取消进站”按钮触发表单提交；新增 7 项进站、时间差、标签避让和显示回归测试。

# 2.0.0 · 实时赛道版

- 新增中央赛道地图，内置 25 条地理轮廓，车队颜色、实心 / 空心标记与三字母缩写。
- 排位、冲刺排位、冲刺赛、正赛按连续秒数推进。默认 1× 为现实时间，支持至 64×、暂停、快进一圈。
- 独立车手圈时、Sector 时间 / 平均速度、即时模拟车速，点击车手切换遥测。
- 排位加入出场圈、飞行圈、放弃圈、回场圈、连续飞行圈、回库复用轮胎、单车自动出场、红旗与计时归零边界。
- 加入普通 / 冲刺各段时间与节间休息、指定胎、20 / 22 台赛车淘汰、无成绩排序和 ATA 配方。
- 进站实际占用比赛时间，领跑者方格旗后其余车手在下一次过线结束。
- 增强全站图标和信息颜色：真实轮胎配方颜色，紫色最快圈、绿色个人提升、琥珀提醒、红色故障与处罚。
- 存档升级至 v3，保留原有四槽与 v1 / v2 导入。新增 25 项连续时间与规则边界测试。

实际计时线、完整裁判裁量、SC 解套圈、全部轮胎归还与历史地图改线仍有简化，详见 DATA.md。
```

## THIRD_PARTY_NOTICES.md

```md
<!-- ===== 文件: THIRD_PARTY_NOTICES.md ===== -->
# Third-party notices

Track centre lines: https://github.com/bacinger/f1-circuits

Adapted and projected to SVG coordinates. The upstream geometry is a current approximate centre line, not a survey of historical layouts, timing loops, or pit lanes.

## MIT License

Copyright (c) 2019-2025 Tomislav Bacinger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## LICENSE

```text
// ===== 文件: LICENSE =====
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.
```

## tests/engine.test.js

```js
// ===== 文件: tests/engine.test.js =====
import assert from 'node:assert/strict';
import { performance as clock } from 'node:perf_hooks';
import { createGame, reduce, setState, getState, dispatch } from '../js/core/state.js';
import { practice, qualifying, startRace, simulateToEnd, tick, resumeRed, raceCommand } from '../js/core/race.js';
import { enterWeekend, currentTrack, advanceDays } from '../js/core/calendar.js';
import { closeWeekend, nextSeason } from '../js/core/season.js';
import { startProject, advanceRND } from '../js/core/rnd.js';
import { fitPart, performance, theoreticalLap } from '../js/core/car.js';
import { teamOf, copy } from '../js/core/helpers.js';
import { checkBudget, seasonRules, trackLimits } from '../js/core/rules.js';
import { signDriver, renewDriver, releaseDriver } from '../js/core/drivers.js';
import { hireStaff, renewStaff, fireStaff } from '../js/core/staff.js';
import { importText, exportText, saveSlot, loadSlot } from '../js/core/save.js';
import { random } from '../js/core/rng.js';
import { LINEUPS } from '../js/data/teams.js';
const results=[];
function test(name,fn){try{fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',message:e.stack});console.error('FAIL',name,e);process.exitCode=1;}}
function game(year=2025,custom=false,seed='test'){return createGame({year,custom,teamId:'mclaren',seed,difficulty:'easy',driverNames:['测试车手甲','测试车手乙']});}
function session(s){const w=s.calendar.weekend,k=w.sessions[w.index];if(k?.startsWith('FP'))practice(s);else if(k==='Q'||k==='SQ')qualifying(s,'push',true);else if(k==='RACE'||k==='SPRINT'){for(const id of teamOf(s).drivers)w.strategy[id].auto=true;startRace(s);simulateToEnd(s);}else throw new Error('未知场次 '+k);}
function weekend(s){enterWeekend(s);while(s.calendar.weekend.index<s.calendar.weekend.sessions.length)session(s);closeWeekend(s);}

test('四个赛季真实开季阵容与 22/24 站赛历',()=>{for(const year of [2022,2023,2024,2025]){const s=game(year);assert.equal(s.teams.length,10);assert.equal(s.calendar.events.length,year<=2023?22:24);for(const t of s.teams)assert.deepEqual(t.drivers,LINEUPS[year][t.id]);assert.equal(new Set(s.teams.flatMap(t=>t.drivers)).size,20);assert.equal(s.season.rules.fastestLap,year<=2024);}});
test('40 个历史车队开局分别完成首个周末',()=>{
 for(const year of [2022,2023,2024,2025])for(const teamId of Object.keys(LINEUPS[year])){
  const s=createGame({year,teamId,difficulty:'easy',seed:'entry-'+year+'-'+teamId});
  weekend(s);assert.equal(s.calendar.round,1);assert.equal(s.player.teamId,teamId);
 }
});
test('自建第十一队：厂商、客户及自定义车手',()=>{for(const type of ['factory','customer']){const s=createGame({year:2024,custom:true,type,name:'测试 Racing',abbr:'TES',logo:23,driverNames:['甲','乙'],seed:'new'});assert.equal(s.teams.length,11);assert.equal(s.finance.custom.cash,type==='factory'?36:43);assert.equal(teamOf(s).logo,23);assert.equal(s.drivers.find(d=>d.id===teamOf(s).drivers[0]).name,'甲');assert.equal(teamOf(s).facilities.factory.level,1);}});
test('种子重现，存档保持 RNG 状态',()=>{const a=game(),b=game();assert.deepEqual(a,b);for(let i=0;i<100;i++)assert.equal(random(a),random(b));const clone=importText(exportText(a));assert.equal(random(a),random(clone));});
test('损坏 JSON 与非法字段安全拒绝',()=>{assert.throws(()=>importText('{bad'));const s=game();s.drivers[0].attributes.pace=999;assert.throws(()=>importText(exportText(s)));assert.throws(()=>importText('{"schemaVersion":100}'));});
test('三个手动槽位和自动存档，无浏览器依赖',()=>{const store=new Map();globalThis.localStorage={setItem:(k,v)=>store.set(k,v),getItem:k=>store.get(k)||null,removeItem:k=>store.delete(k)};for(const slot of ['auto','1','2','3']){const s=game();saveSlot(s,slot);assert.deepEqual(loadSlot(slot),s);}});
test('研发 → 制造 → 单套装车，只影响指定赛车',()=>{const s=game(2024),t=teamOf(s);t.wind.limit=10000;t.cfd.limit=10000;let attempts=0;while(!s.parts[t.id].stock.length&&attempts++<10){startProject(s,'floor','development',1);advanceRND(s,80);}assert.ok(s.parts[t.id].stock.length);const spec=s.parts[t.id].stock[0],before=performance(s,t,0).downforce,other=performance(s,t,1).downforce;fitPart(s,spec.id,0);assert.ok(performance(s,t,0).downforce>before);assert.equal(performance(s,t,1).downforce,other);assert.ok(t.wind.used>0);});
test('客户车队引擎限制、风洞额度与现金拦截',()=>{const s=game(),t=teamOf(s);assert.throws(()=>startProject(s,'ice'));t.wind.limit=0;assert.throws(()=>startProject(s,'floor'));s.finance[t.id].cash=0;assert.throws(()=>startProject(s,'brakes'));});
test('原子 action：失败不会修改当前状态',()=>{setState(game());const old=copy(getState());assert.throws(()=>dispatch('project',{part:'ice'}));assert.deepEqual(getState(),old);});
test('四季两条开局：完整练习、排位、正赛与结算',()=>{for(const year of [2022,2023,2024,2025])for(const custom of [false,true]){const s=game(year,custom,'weekend-'+year);weekend(s);assert.equal(s.calendar.round,1);assert.equal(s.history.races.filter(r=>r.kind==='RACE').length,1);const result=s.history.races.at(-1);assert.equal(result.rows.length,custom?22:20);assert.equal(result.rows.reduce((a,r)=>a+r.points,0),s.teams.reduce((a,t)=>a+t.points,0));assert.ok(result.rows.every(r=>Number.isFinite(r.time)));assert.equal(s.calendar.events[0].completed,true);}});
test('22 车排位 Q1/Q2 各淘汰六车',()=>{const s=game(2025,true);enterWeekend(s);while(s.calendar.weekend.sessions[s.calendar.weekend.index].startsWith('FP'))practice(s);qualifying(s);assert.equal(s.calendar.weekend.qualifying.active.length,16);qualifying(s);assert.equal(s.calendar.weekend.qualifying.active.length,10);qualifying(s);assert.equal(s.calendar.weekend.grids.Q.length,22);});
test('各年份冲刺周末流程与正赛发车网格',()=>{for(const year of [2022,2023,2024,2025]){const s=game(year,true,'sprint-'+year);s.calendar.round=s.calendar.events.findIndex(e=>e.sprint);enterWeekend(s);const sessions=s.calendar.weekend.sessions;assert.deepEqual(sessions,year===2022?['FP1','Q','FP2','SPRINT','RACE']:year===2023?['FP1','Q','SQ','SPRINT','RACE']:['FP1','SQ','SPRINT','Q','RACE']);while(s.calendar.weekend.index<sessions.length)session(s);assert.equal(s.history.races.length,2);assert.equal(s.history.races[0].kind,'SPRINT');assert.equal(s.history.races[1].kind,'RACE');}});
test('赛事中存档：相同指令重放逐字段一致',()=>{const a=game(2024);enterWeekend(a);while(!['RACE','SPRINT'].includes(a.calendar.weekend.sessions[a.calendar.weekend.index]))session(a);startRace(a);tick(a,5);if(a.race.red)resumeRed(a);const b=importText(exportText(a));simulateToEnd(a);simulateToEnd(b);assert.deepEqual(a,b);});
test('预算帽调查与现金独立，重度超支取消积分',()=>{const s=game(),t=teamOf(s),f=s.finance[t.id];const cash=f.cash;f.capUsed=f.capLimit+20;t.points=5;checkBudget(s,t);assert.ok(f.cash<cash);assert.equal(f.disqualified,true);assert.equal(t.points,0);assert.ok(t.wind.limit<250);});
test('车手签入、续约、解约与员工合同',()=>{const s=game(),t=teamOf(s);s.finance[t.id].cash=1000;const free=s.drivers.find(d=>!d.teamId);let i=0;while(free.teamId!==t.id&&i++<30)signDriver(s,free.id,0,free.contract.salary*2,3);assert.equal(free.teamId,t.id);renewDriver(s,free.id,free.contract.salary,4);assert.equal(free.contract.years,4);releaseDriver(s,free.id);assert.equal(free.teamId,null);const existing=s.staff.find(e=>e.teamId===t.id);renewStaff(s,existing.id,existing.salary,4);assert.equal(existing.years,4);fireStaff(s,existing.id);assert.equal(existing.teamId,null);let tries=0;while(existing.teamId!==t.id&&tries++<30)hireStaff(s,existing.id,existing.salary*2,2);assert.equal(existing.teamId,t.id);});
test('完整 2025 → 2026 赛季结算、转会窗与新规',()=>{const s=game(2025,false,'season');s.finance.mclaren.cash=2000;teamOf(s).confidence=100;while(!s.season.offseason){weekend(s);if(s.season.gameOver)throw new Error(s.season.gameOver);}assert.equal(s.history.seasons.length,1);assert.equal(s.history.seasons[0].year,2025);const t=teamOf(s);for(const id of t.drivers){const d=s.drivers.find(x=>x.id===id);d.contract.years=3;d.retired=false;}s.staff.find(e=>e.teamId===t.id&&e.role==='principal').years=3;nextSeason(s);assert.equal(s.season.year,2026);assert.equal(s.season.rules.major,true);assert.equal(s.calendar.round,0);assert.equal(s.finance[t.id].capUsed,0);assert.ok(s.teams.every(t=>t.points===0));assert.ok(s.drivers.every(d=>d.points===0));assert.equal(s.parts[t.id].cars[0].ice.used,1);});
test('SC、雨地、红旗恢复、进站、赛道限制与 DRS 距离',()=>{
 const s=game(2024,false,'event-check');enterWeekend(s);
 while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index]))session(s);
 startRace(s);const r=s.race,c=r.cars.find(c=>c.teamId===s.player.teamId);
 r.control='SC';r.controlLeft=3;r.wetness=.8;for(const cell of r.forecast)cell.rain=.8;
 raceCommand(s,c.driverId,'pit','H');tick(s,1);
 assert.equal(c.stops,1);assert.equal(c.compound,'H');assert.equal(r.weatherWet,true);
 for(let i=0;i<4;i++)trackLimits(s,c);assert.equal(c.penalty,5);
 r.red=true;r.control='RED';resumeRed(s);assert.equal(r.control,'SC');assert.equal(r.red,false);
 r.control='GREEN';r.controlLeft=0;r.wetness=0;r.rain=0;r.lap=3;
 for(const cell of r.forecast)cell.rain=0;
 const active=r.cars.filter(c=>!c.retired);active.forEach((car,i)=>{car.time=i*3;car.pitRequest=null;car.plan.auto=false;car.plan.pitLap=40;car.plan.secondLap=0;});
 tick(s,1);assert.equal(active[1].drs,false,'相隔三秒不应开启 DRS');
});
test('预算帽升级处罚保持积分明细与总积分一致',()=>{
 const s=game(2025,false,'audit');weekend(s);const t=teamOf(s),f=s.finance[t.id];
 f.capUsed=f.capLimit+1;checkBudget(s,t);assert.equal(f.audited,true);assert.equal(f.disqualified,false);
 f.capUsed=f.capLimit+30;checkBudget(s,t);assert.equal(f.disqualified,true);
 assert.equal(t.results.reduce((a,r)=>a+r.points,0),0);
 assert.equal(s.history.races.flatMap(r=>r.rows).filter(r=>r.teamId===t.id).reduce((a,r)=>a+r.points,0),0);
});
test('500 圈模拟性能：十场 50 圈总计少于 1000 ms（不含 DOM 与存档）',()=>{
 const states=[];
 for(let i=0;i<10;i++){
  const s=game(2024,true,'speed-'+i);enterWeekend(s);
  while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index]))session(s);
  startRace(s);s.race.totalLaps=50;s.race.fuelPerLap=1.5;
  for(const c of s.race.cars){c.fuel=100;c.plan.auto=true;}
  states.push(s);
 }
 const start=clock.now();
 for(const s of states){simulateToEnd(s);assert.equal(s.race.lap,50);}
 const elapsed=clock.now()-start;
 assert.ok(elapsed<1000,'耗时 '+elapsed.toFixed(2)+'ms');
 results.push({name:'500圈实测',milliseconds:elapsed,totalLaps:500});
 console.log('  benchmark:',elapsed.toFixed(2),'ms / 500 laps');
});
console.log(JSON.stringify({tests:results},null,2));
```

## tests/last-run.json

```json
// ===== 文件: tests/last-run.json =====
{
  "date": "2026-10-22",
  "tests": [
    {
      "name": "四个赛季真实开季阵容与 22/24 站赛历",
      "status": "PASS"
    },
    {
      "name": "40 个历史车队开局分别完成首个周末",
      "status": "PASS"
    },
    {
      "name": "自建第十一队：厂商、客户及自定义车手",
      "status": "PASS"
    },
    {
      "name": "种子重现，存档保持 RNG 状态",
      "status": "PASS"
    },
    {
      "name": "损坏 JSON 与非法字段安全拒绝",
      "status": "PASS"
    },
    {
      "name": "三个手动槽位和自动存档，无浏览器依赖",
      "status": "PASS"
    },
    {
      "name": "研发 → 制造 → 单套装车，只影响指定赛车",
      "status": "PASS"
    },
    {
      "name": "客户车队引擎限制、风洞额度与现金拦截",
      "status": "PASS"
    },
    {
      "name": "原子 action：失败不会修改当前状态",
      "status": "PASS"
    },
    {
      "name": "四季两条开局：完整练习、排位、正赛与结算",
      "status": "PASS"
    },
    {
      "name": "22 车排位 Q1/Q2 各淘汰六车",
      "status": "PASS"
    },
    {
      "name": "各年份冲刺周末流程与正赛发车网格",
      "status": "PASS"
    },
    {
      "name": "赛事中存档：相同指令重放逐字段一致",
      "status": "PASS"
    },
    {
      "name": "预算帽调查与现金独立，重度超支取消积分",
      "status": "PASS"
    },
    {
      "name": "车手签入、续约、解约与员工合同",
      "status": "PASS"
    },
    {
      "name": "完整 2025 → 2026 赛季结算、转会窗与新规",
      "status": "PASS"
    },
    {
      "name": "SC、雨地、红旗恢复、进站、赛道限制与 DRS 距离",
      "status": "PASS"
    },
    {
      "name": "预算帽升级处罚保持积分明细与总积分一致",
      "status": "PASS"
    },
    {
      "name": "500圈实测",
      "milliseconds": 109.51736700000015,
      "totalLaps": 500
    },
    {
      "name": "500 圈模拟性能：十场 50 圈总计少于 1000 ms（不含 DOM 与存档）",
      "status": "PASS"
    },
    {
      "name": "连续秒数：1 秒推进 1 秒，不提前结算整圈，赛车独立移动",
      "status": "PASS"
    },
    {
      "name": "真实赛道轮廓 25 条：闭合路径，位置查询有限且随进度变化",
      "status": "PASS"
    },
    {
      "name": "三字母缩写唯一，支持自建中文名与修改，拒绝冲突",
      "status": "PASS"
    },
    {
      "name": "排位：出场圈不计成绩 → 飞行圈有效 → 默认回场圈 → 车库",
      "status": "PASS"
    },
    {
      "name": "出场圈可直接回 Pit；中途放弃飞行圈不会记录圈速",
      "status": "PASS"
    },
    {
      "name": "连续飞行圈不瞬移、不补油、不消耗另一套胎，可再切回回场圈",
      "status": "PASS"
    },
    {
      "name": "倒计时归零：已开始的飞行圈可完成，禁止新的飞行圈与车库出场",
      "status": "PASS"
    },
    {
      "name": "出场圈在归零后过线，不得获得飞行圈成绩",
      "status": "PASS"
    },
    {
      "name": "22 车晋级、各段计时重置与 7/8 分钟节间休息",
      "status": "PASS"
    },
    {
      "name": "冲刺排位 12/10/8 分钟、指定胎与每段一套限制",
      "status": "PASS"
    },
    {
      "name": "2023 匈牙利 / 意大利 ATA 排位 H / M / S",
      "status": "PASS"
    },
    {
      "name": "同一时间与指令：大步推进与逐秒推进事件 / RNG / 圈速相同",
      "status": "PASS"
    },
    {
      "name": "实时场次中途保存加载，排位与正赛后续逐字段一致",
      "status": "PASS"
    },
    {
      "name": "暂停不推进时钟，手动快进一圈可用且保持暂停",
      "status": "PASS"
    },
    {
      "name": "进站损失实际占用比赛时间，坑位期间赛车停止，圈速包含该损失",
      "status": "PASS"
    },
    {
      "name": "方格旗按各车下一次过线结算，套圈车不补跑完整距离",
      "status": "PASS"
    },
    {
      "name": "四季实时冲刺 / 排位 / 正赛可完整结算，积分守恒",
      "status": "PASS"
    },
    {
      "name": "正赛跨不同时间步长推进：RNG、事件与位置逐字段一致",
      "status": "PASS"
    },
    {
      "name": "红旗冻结排位倒计时与无效进行中圈，恢复后可复用轮胎出场",
      "status": "PASS"
    },
    {
      "name": "比赛时限结束，领先者在下一圈末冲线而非立即结束",
      "status": "PASS"
    },
    {
      "name": "自动出场关闭后取消尚未执行的出场计划",
      "status": "PASS"
    },
    {
      "name": "旧版逐圈比赛存档升级，保留圈数、轮胎磨损与可恢复的实时场次",
      "status": "PASS"
    },
    {
      "name": "实时存档拒绝非法赛段索引和负时钟",
      "status": "PASS"
    },
    {
      "name": "新场次默认 1×，保留暂停操作与既有设置的其他内容",
      "status": "PASS"
    },
    {
      "name": "新版 action 全程推进 2025：24 站、30 场比赛、中途存档恢复与季末",
      "status": "PASS"
    },
    {
      "name": "首停第26圈、二停关闭：两台赛车第一圈和第25圈均不提前进站，第26圈才执行",
      "status": "PASS"
    },
    {
      "name": "LEADER / INTERVAL 使用不同参照，领先车随模式显示 LEADER / INTERVAL，退赛车为 OUT，套圈差距正常",
      "status": "PASS"
    },
    {
      "name": "22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内",
      "status": "PASS"
    },
    {
      "name": "正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后",
      "status": "PASS"
    },
    {
      "name": "聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态",
      "status": "PASS"
    },
    {
      "name": "修复旧存档中的第0圈二停误请求，同时保留手动进站指令",
      "status": "PASS"
    },
    {
      "name": "排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG",
      "status": "PASS"
    },
    {
      "name": "本队高亮绑定车手所属车队，覆盖实时排名、详细表、积分榜与车队分站明细",
      "status": "PASS"
    },
    {
      "name": "时间差按现实时间每500ms刷新，模式切换立即刷新，排位不节流",
      "status": "PASS"
    }
  ]
}
```

## tests/last-run.txt

```text
// ===== 文件: tests/last-run.txt =====
Verified 2026-10-22

$ node tests/engine.test.js
PASS 四个赛季真实开季阵容与 22/24 站赛历
PASS 40 个历史车队开局分别完成首个周末
PASS 自建第十一队：厂商、客户及自定义车手
PASS 种子重现，存档保持 RNG 状态
PASS 损坏 JSON 与非法字段安全拒绝
PASS 三个手动槽位和自动存档，无浏览器依赖
PASS 研发 → 制造 → 单套装车，只影响指定赛车
PASS 客户车队引擎限制、风洞额度与现金拦截
PASS 原子 action：失败不会修改当前状态
PASS 四季两条开局：完整练习、排位、正赛与结算
PASS 22 车排位 Q1/Q2 各淘汰六车
PASS 各年份冲刺周末流程与正赛发车网格
PASS 赛事中存档：相同指令重放逐字段一致
PASS 预算帽调查与现金独立，重度超支取消积分
PASS 车手签入、续约、解约与员工合同
PASS 完整 2025 → 2026 赛季结算、转会窗与新规
PASS SC、雨地、红旗恢复、进站、赛道限制与 DRS 距离
PASS 预算帽升级处罚保持积分明细与总积分一致
  benchmark: 109.52 ms / 500 laps
PASS 500 圈模拟性能：十场 50 圈总计少于 1000 ms（不含 DOM 与存档）
{
  "tests": [
    {
      "name": "四个赛季真实开季阵容与 22/24 站赛历",
      "status": "PASS"
    },
    {
      "name": "40 个历史车队开局分别完成首个周末",
      "status": "PASS"
    },
    {
      "name": "自建第十一队：厂商、客户及自定义车手",
      "status": "PASS"
    },
    {
      "name": "种子重现，存档保持 RNG 状态",
      "status": "PASS"
    },
    {
      "name": "损坏 JSON 与非法字段安全拒绝",
      "status": "PASS"
    },
    {
      "name": "三个手动槽位和自动存档，无浏览器依赖",
      "status": "PASS"
    },
    {
      "name": "研发 → 制造 → 单套装车，只影响指定赛车",
      "status": "PASS"
    },
    {
      "name": "客户车队引擎限制、风洞额度与现金拦截",
      "status": "PASS"
    },
    {
      "name": "原子 action：失败不会修改当前状态",
      "status": "PASS"
    },
    {
      "name": "四季两条开局：完整练习、排位、正赛与结算",
      "status": "PASS"
    },
    {
      "name": "22 车排位 Q1/Q2 各淘汰六车",
      "status": "PASS"
    },
    {
      "name": "各年份冲刺周末流程与正赛发车网格",
      "status": "PASS"
    },
    {
      "name": "赛事中存档：相同指令重放逐字段一致",
      "status": "PASS"
    },
    {
      "name": "预算帽调查与现金独立，重度超支取消积分",
      "status": "PASS"
    },
    {
      "name": "车手签入、续约、解约与员工合同",
      "status": "PASS"
    },
    {
      "name": "完整 2025 → 2026 赛季结算、转会窗与新规",
      "status": "PASS"
    },
    {
      "name": "SC、雨地、红旗恢复、进站、赛道限制与 DRS 距离",
      "status": "PASS"
    },
    {
      "name": "预算帽升级处罚保持积分明细与总积分一致",
      "status": "PASS"
    },
    {
      "name": "500圈实测",
      "milliseconds": 109.51736700000015,
      "totalLaps": 500
    },
    {
      "name": "500 圈模拟性能：十场 50 圈总计少于 1000 ms（不含 DOM 与存档）",
      "status": "PASS"
    }
  ]
}

$ node tests/realtime.test.js
PASS 连续秒数：1 秒推进 1 秒，不提前结算整圈，赛车独立移动
PASS 真实赛道轮廓 25 条：闭合路径，位置查询有限且随进度变化
PASS 三字母缩写唯一，支持自建中文名与修改，拒绝冲突
PASS 排位：出场圈不计成绩 → 飞行圈有效 → 默认回场圈 → 车库
PASS 出场圈可直接回 Pit；中途放弃飞行圈不会记录圈速
PASS 连续飞行圈不瞬移、不补油、不消耗另一套胎，可再切回回场圈
PASS 倒计时归零：已开始的飞行圈可完成，禁止新的飞行圈与车库出场
PASS 出场圈在归零后过线，不得获得飞行圈成绩
PASS 22 车晋级、各段计时重置与 7/8 分钟节间休息
PASS 冲刺排位 12/10/8 分钟、指定胎与每段一套限制
PASS 2023 匈牙利 / 意大利 ATA 排位 H / M / S
PASS 同一时间与指令：大步推进与逐秒推进事件 / RNG / 圈速相同
PASS 实时场次中途保存加载，排位与正赛后续逐字段一致
PASS 暂停不推进时钟，手动快进一圈可用且保持暂停
PASS 进站损失实际占用比赛时间，坑位期间赛车停止，圈速包含该损失
PASS 方格旗按各车下一次过线结算，套圈车不补跑完整距离
PASS 四季实时冲刺 / 排位 / 正赛可完整结算，积分守恒
PASS 正赛跨不同时间步长推进：RNG、事件与位置逐字段一致
PASS 红旗冻结排位倒计时与无效进行中圈，恢复后可复用轮胎出场
PASS 比赛时限结束，领先者在下一圈末冲线而非立即结束
PASS 自动出场关闭后取消尚未执行的出场计划
PASS 旧版逐圈比赛存档升级，保留圈数、轮胎磨损与可恢复的实时场次
PASS 实时存档拒绝非法赛段索引和负时钟
PASS 新场次默认 1×，保留暂停操作与既有设置的其他内容
PASS 新版 action 全程推进 2025：24 站、30 场比赛、中途存档恢复与季末
{
  "tests": [
    {
      "name": "连续秒数：1 秒推进 1 秒，不提前结算整圈，赛车独立移动",
      "status": "PASS"
    },
    {
      "name": "真实赛道轮廓 25 条：闭合路径，位置查询有限且随进度变化",
      "status": "PASS"
    },
    {
      "name": "三字母缩写唯一，支持自建中文名与修改，拒绝冲突",
      "status": "PASS"
    },
    {
      "name": "排位：出场圈不计成绩 → 飞行圈有效 → 默认回场圈 → 车库",
      "status": "PASS"
    },
    {
      "name": "出场圈可直接回 Pit；中途放弃飞行圈不会记录圈速",
      "status": "PASS"
    },
    {
      "name": "连续飞行圈不瞬移、不补油、不消耗另一套胎，可再切回回场圈",
      "status": "PASS"
    },
    {
      "name": "倒计时归零：已开始的飞行圈可完成，禁止新的飞行圈与车库出场",
      "status": "PASS"
    },
    {
      "name": "出场圈在归零后过线，不得获得飞行圈成绩",
      "status": "PASS"
    },
    {
      "name": "22 车晋级、各段计时重置与 7/8 分钟节间休息",
      "status": "PASS"
    },
    {
      "name": "冲刺排位 12/10/8 分钟、指定胎与每段一套限制",
      "status": "PASS"
    },
    {
      "name": "2023 匈牙利 / 意大利 ATA 排位 H / M / S",
      "status": "PASS"
    },
    {
      "name": "同一时间与指令：大步推进与逐秒推进事件 / RNG / 圈速相同",
      "status": "PASS"
    },
    {
      "name": "实时场次中途保存加载，排位与正赛后续逐字段一致",
      "status": "PASS"
    },
    {
      "name": "暂停不推进时钟，手动快进一圈可用且保持暂停",
      "status": "PASS"
    },
    {
      "name": "进站损失实际占用比赛时间，坑位期间赛车停止，圈速包含该损失",
      "status": "PASS"
    },
    {
      "name": "方格旗按各车下一次过线结算，套圈车不补跑完整距离",
      "status": "PASS"
    },
    {
      "name": "四季实时冲刺 / 排位 / 正赛可完整结算，积分守恒",
      "status": "PASS"
    },
    {
      "name": "正赛跨不同时间步长推进：RNG、事件与位置逐字段一致",
      "status": "PASS"
    },
    {
      "name": "红旗冻结排位倒计时与无效进行中圈，恢复后可复用轮胎出场",
      "status": "PASS"
    },
    {
      "name": "比赛时限结束，领先者在下一圈末冲线而非立即结束",
      "status": "PASS"
    },
    {
      "name": "自动出场关闭后取消尚未执行的出场计划",
      "status": "PASS"
    },
    {
      "name": "旧版逐圈比赛存档升级，保留圈数、轮胎磨损与可恢复的实时场次",
      "status": "PASS"
    },
    {
      "name": "实时存档拒绝非法赛段索引和负时钟",
      "status": "PASS"
    },
    {
      "name": "新场次默认 1×，保留暂停操作与既有设置的其他内容",
      "status": "PASS"
    },
    {
      "name": "新版 action 全程推进 2025：24 站、30 场比赛、中途存档恢复与季末",
      "status": "PASS"
    }
  ]
}

$ node tests/live-display.test.js
PASS 首停第26圈、二停关闭：两台赛车第一圈和第25圈均不提前进站，第26圈才执行
PASS LEADER / INTERVAL 使用不同参照，领先车随模式显示 LEADER / INTERVAL，退赛车为 OUT，套圈差距正常
PASS 22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内
PASS 正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后
PASS 聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态
PASS 修复旧存档中的第0圈二停误请求，同时保留手动进站指令
PASS 排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG
PASS 本队高亮绑定车手所属车队，覆盖实时排名、详细表、积分榜与车队分站明细
{
  "tests": [
    {
      "name": "首停第26圈、二停关闭：两台赛车第一圈和第25圈均不提前进站，第26圈才执行",
      "status": "PASS"
    },
    {
      "name": "LEADER / INTERVAL 使用不同参照，领先车随模式显示 LEADER / INTERVAL，退赛车为 OUT，套圈差距正常",
      "status": "PASS"
    },
    {
      "name": "22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内",
      "status": "PASS"
    },
    {
      "name": "正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后",
      "status": "PASS"
    },
    {
      "name": "聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态",
      "status": "PASS"
    },
    {
      "name": "修复旧存档中的第0圈二停误请求，同时保留手动进站指令",
      "status": "PASS"
    },
    {
      "name": "排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG",
      "status": "PASS"
    },
    {
      "name": "本队高亮绑定车手所属车队，覆盖实时排名、详细表、积分榜与车队分站明细",
      "status": "PASS"
    }
  ]
}

$ python3 tests/static.test.py
PASS 所有引用相对、资源齐全、无外部 API、无 Math.random、核心无 DOM

2.2.1 定向回归（2026-10-22）
node tests/live-display.test.js：9 项全部通过，包含新检查：时间差按现实时间每500ms刷新，模式切换立即刷新，排位不节流
$ node --check js/ui/liveView.js

$ node --check js/offline.js

$ python3 tests/static.test.py
PASS 所有引用相对、资源齐全、无外部 API、无 Math.random、核心无 DOM
```

## tests/live-display.test.js

```js
// ===== 文件: tests/live-display.test.js =====
import assert from 'node:assert/strict';
import { createGame, reduce } from '../js/core/state.js';
import { currentTrack } from '../js/core/calendar.js';
import { qualifying, practice } from '../js/core/race.js';
import { startRealtimeRace, advanceRealtime, fastForwardLap, resumeRealtime } from '../js/core/realtime.js';
import { timingGap, layoutMapLabels } from '../js/ui/liveData.js';
import { standingsView } from '../js/ui/standingsView.js';
import { liveView, patchLive } from '../js/ui/liveView.js';
import { importText, exportText } from '../js/core/save.js';
import { teamOf } from '../js/core/helpers.js';
const tests=[];
function test(name,fn){try{fn();tests.push({name,status:'PASS'});console.log('PASS',name);}catch(e){tests.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.stack);process.exitCode=1;}}
function race(){const s=createGame({year:2025,seed:'pit-window-fix'});reduce(s,'enterWeekend');while(s.calendar.weekend.sessions[s.calendar.weekend.index].startsWith('FP'))practice(s);qualifying(s,'push',true);for(const id of teamOf(s).drivers)Object.assign(s.calendar.weekend.strategy[id],{start:'M',pitLap:26,secondLap:0,next:'H',backup:'A',auto:false});s.calendar.weekend.weatherStart=0;startRealtimeRace(s);for(const cell of s.race.forecast)cell.rain=0;return s;}
function untilOwnLap(s,c,lap){let guard=0;while(c.lap<lap&&!c.retired&&!s.race.finished&&guard++<2000){if(s.race.red)resumeRealtime(s);advanceRealtime(s,1,true);}assert.ok(!c.retired,'test driver retired');assert.ok(guard<2000);}
test('首停第26圈、二停关闭：两台赛车第一圈和第25圈均不提前进站，第26圈才执行',()=>{
 const s=race(),cars=teamOf(s).drivers.map(id=>s.race.cars.find(c=>c.driverId===id));
 for(const c of cars){assert.equal(c.pitRequest,null);assert.deepEqual(c.planUsed,[]);}
 const slow=cars.sort((a,b)=>b.grid-a.grid)[0];untilOwnLap(s,slow,1);for(const c of cars){assert.equal(c.stops,0);assert.equal(c.pitRequest,null);}
 // Preserve the scheduled lap while neutralising unrelated tyre and failure risks.
 let guard=0;while(cars.some(c=>c.lap<26)&&guard++<4000){for(const c of cars){c.tyreWear=0;c.tyreAge=0;for(const p of Object.values(s.parts[c.teamId].cars[c.slot]))p.wear=0;}if(s.race.red)resumeRealtime(s);advanceRealtime(s,1,true);for(const c of cars)if(c.lap<26)assert.equal(c.stops,0);}
 for(const c of cars){assert.equal(c.retired,false);assert.equal(c.stops,1);assert.equal(c.pitLog[0].lap,26);assert.equal(c.pitLog[0].from,'M');assert.equal(c.pitLog[0].compound,'H');assert.ok(c.pitLog[0].at>0);assert.deepEqual(c.planUsed,[0]);}
});
test('LEADER / INTERVAL 使用不同参照，领先车随模式显示 LEADER / INTERVAL，退赛车为 OUT，套圈差距正常',()=>{
 const s=race(),[a,b,c]=s.race.cars;s.race.cars=[a,b,c];[a,b,c].forEach((x,i)=>{x.position=i+1;x.totalDistance=5-i*.1;});const base=currentTrack(s).baseTime;
 assert.equal(timingGap(s,a,base),'LEADER');const leader=timingGap(s,c,base);reduce(s,'timingGap',{value:'interval'});const interval=timingGap(s,c,base);assert.equal(timingGap(s,a,base),'INTERVAL');assert.equal(leader,'+'+(.2*base).toFixed(3));assert.equal(interval,'+'+(.1*base).toFixed(3));c.totalDistance=b.totalDistance-.000001;assert.match(timingGap(s,c,base),/^\+\d+\.\d{3}$/);c.retired=true;assert.equal(timingGap(s,c,base),'OUT');c.retired=false;c.totalDistance=3.4;assert.equal(timingGap(s,c,base),'+1 LAP');assert.throws(()=>reduce(s,'timingGap',{value:'bad'}));
});
test('22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内',()=>{
 for(const [x,y]of [[400,370],[8,8],[792,732]]){const markers=Array.from({length:22},(_,i)=>({id:'driver'+i,x,y}));const labels=layoutMapLabels(markers);assert.equal(labels.length,22);for(let i=0;i<labels.length;i++){const a=labels[i];assert.ok(a.x>=0&&a.y>=0&&a.x+a.width<=800&&a.y+a.height<=740);for(const b of labels.slice(i+1))assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,'overlapping labels');}}
});
test('正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后',()=>{
 const s=race(),markup=liveView(s),tower=markup.slice(markup.indexOf('<table class="broadcast-timing'),markup.indexOf('</table>'));
 assert.equal((tower.match(/class="tower-position"/g)||[]).length,s.race.cars.length);for(const c of s.race.cars)assert.ok(tower.includes('aria-label="第 '+c.position+' 名">'+c.position+'</span>'));assert.equal((tower.match(/<th[ >]/g)||[]).length,3);assert.equal((tower.match(/<td /g)||[]).length,s.race.cars.length*3);assert.ok(!tower.includes('data-cell="best"'));assert.ok(markup.indexOf('id="toolbar-weather"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="tower-race-control"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="race-details"')>markup.indexOf('id="race-events"'));assert.ok(markup.includes('id="pit-history"'));assert.ok(markup.includes('data-detail-cell="current"'));assert.ok(markup.includes('data-detail-cell="best"'));
});
test('聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态',()=>{
 const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'focusDriver',{id});s.race.cars.reverse();const markup=liveView(s);assert.ok(markup.includes('data-focused-driver="'+id+'"'));assert.throws(()=>reduce(s,'focusDriver',{id:'missing'}));s.race.control='SC';assert.ok(liveView(s).includes('SAFETY CAR'));s.race.red=true;assert.ok(liveView(s).includes('RED FLAG'));
});
test('修复旧存档中的第0圈二停误请求，同时保留手动进站指令',()=>{for(const manual of [false,true]){const s=race(),c=s.race.cars.find(c=>c.teamId===s.player.teamId);c.planUsed=[1];c.pitRequest=c.plan.next;if(manual)s.race.events.push({lap:0,type:'radio',text:c.name+'：收到进站指令，本圈末换 H 胎'});const loaded=importText(exportText(s)),car=loaded.race.cars.find(x=>x.driverId===c.driverId);assert.deepEqual(car.planUsed,[]);assert.equal(car.pitRequest,manual?'H':null);}});
test('排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG',()=>{const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'timingGap',{value:'interval'});reduce(s,'focusDriver',{id});const before=s.rng;liveView(s);assert.equal(s.rng,before);const saved=importText(exportText(s));assert.equal(saved.settings.timingGap,'interval');assert.equal(saved.settings.focusDriver,id);});
test('本队高亮绑定车手所属车队，覆盖实时排名、详细表、积分榜与车队分站明细',()=>{
 const s=race(),own=teamOf(s).drivers,markup=liveView(s);
 for(const id of own){assert.ok(markup.includes('data-car="'+id+'" data-action="focusDriver"'));assert.ok(markup.includes('data-detail-car="'+id+'" class="player-row"'));}
 const tower=markup.slice(markup.indexOf('id="timing-body"'),markup.indexOf('</tbody>'));assert.equal((tower.match(/class="player-row"/g)||[]).length,2);
 const standings=standingsView(s);for(const [id,count]of [['constructors',1],['drivers-standings',2],['round-points',1]]){const section=standings.slice(standings.indexOf('id="'+id+'"'));assert.equal((section.slice(0,section.indexOf('</table>')).match(/class="player-row"/g)||[]).length,count);}
 const original=s.race.cars[0];s.race.cars.reverse();assert.ok(liveView(s).includes('aria-label="第 '+original.position+' 名">'+original.position+'</span>'));
});
test('时间差按现实时间每500ms刷新，模式切换立即刷新，排位不节流',()=>{
 const s=race(),cells=new Map(),rows=s.race.cars.map(c=>{
  const values=Object.fromEntries(['driver','gap','tyre'].map(key=>[key,{innerHTML:''}]));cells.set(c.driverId,values);
  return {dataset:{car:c.driverId},classList:{toggle(){}},querySelector(selector){return values[selector.match(/data-cell="(.*?)"/)[1]];}};
 });
 const body={children:rows},priorDocument=Object.getOwnPropertyDescriptor(globalThis,'document'),priorPerformance=Object.getOwnPropertyDescriptor(globalThis,'performance');let now=0;
 try{
  Object.defineProperty(globalThis,'document',{configurable:true,value:{querySelector:selector=>selector==='#timing-body'?body:null,querySelectorAll:()=>[]}});
  Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>now}});
  const c=s.race.cars[1],gap=cells.get(c.driverId).gap;patchLive(s);const initial=gap.innerHTML;c.totalDistance-=.001;
  for(now=60;now<500;now+=60)patchLive(s);assert.equal(gap.innerHTML,initial);
  now=500;patchLive(s);assert.notEqual(gap.innerHTML,initial);const sampled=gap.innerHTML;
  s.settings.speed=64;s.race.time+=64;c.totalDistance-=.001;now=999;patchLive(s);assert.equal(gap.innerHTML,sampled);
  now=1000;patchLive(s);assert.notEqual(gap.innerHTML,sampled);
  s.settings.timingGap='interval';now=1001;patchLive(s);assert.ok(cells.get(s.race.cars[0].driverId).gap.innerHTML.includes('INTERVAL'));
  c.retired=true;now=1501;patchLive(s);assert.ok(gap.innerHTML.includes('OUT'));
  s.race.qualifying=true;s.race.q={stage:1,status:'RUNNING',remaining:100};s.race.kind='Q';c.retired=false;c.stageBest=90;s.race.fastest.time=89;now=1502;patchLive(s);const qualifying=gap.innerHTML;
  c.stageBest=89.5;now=1503;patchLive(s);assert.notEqual(gap.innerHTML,qualifying);
 }finally{
  if(priorDocument)Object.defineProperty(globalThis,'document',priorDocument);else delete globalThis.document;
  Object.defineProperty(globalThis,'performance',priorPerformance);
 }
});
console.log(JSON.stringify({tests},null,2));
```

## tests/realtime.test.js

```js
// ===== 文件: tests/realtime.test.js =====
import assert from 'node:assert/strict';
import { createGame, reduce } from '../js/core/state.js';
import { enterWeekend } from '../js/core/calendar.js';
import { practice, qualifying, startRace, tick } from '../js/core/race.js';
import { startQualifying, startRealtimeRace, advanceRealtime, fastForwardLap, finishRealtime, qualCommand, skipQualBreak, allowedQualTyres, suspendQualifying, resumeRealtime } from '../js/core/realtime.js';
import { exportText, importText } from '../js/core/save.js';
import { teamOf, copy } from '../js/core/helpers.js';
import { geometry, trackPoint } from '../js/core/trackGeometry.js';
import { TRACKS } from '../js/data/tracks.js';
import { assignDriverCodes, setDriverCode } from '../js/core/driverCodes.js';
const results=[];
function test(name,fn){try{fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.stack);process.exitCode=1;}}
function setup({year=2025,custom=false,sprint=false,track=null,seed='live-test'}={}){
 const s=createGame({year,custom,teamId:'mclaren',seed});
 if(track)s.calendar.round=s.calendar.events.findIndex(e=>e.track===track);
 else if(sprint)s.calendar.round=s.calendar.events.findIndex(e=>e.sprint);
 if(track){const date=new Date(s.calendar.events[s.calendar.round].date+'T00:00:00Z');date.setUTCDate(date.getUTCDate()-3);s.calendar.date=date.toISOString().slice(0,10);}
 enterWeekend(s);while(s.calendar.weekend.sessions[s.calendar.weekend.index]?.startsWith('FP'))practice(s);
 return s;
}
function qgame(opts){const s=setup(opts);startQualifying(s);return s;}
function own(s){return s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0]);}
function rgame(opts){const s=setup(opts);while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index])){const k=s.calendar.weekend.sessions[s.calendar.weekend.index];if(k.startsWith('FP'))practice(s);else qualifying(s,'push',true);}startRealtimeRace(s);return s;}
function send(s,c=own(s),compound='S'){qualCommand(s,c.driverId,'send',{compound});return c;}
function cross(s,c){const old=c.lap;let guard=0;while(c.lap===old&&!s.race.finished&&guard++<30){const until=c.phase==='GRID'?c.nextRelease:c.phase==='PIT'?c.pitUntil:c.segmentEnd;advanceRealtime(s,Math.max(.001,until-s.race.time),true);}assert.ok(guard<30);}
function quietAI(s){for(const c of s.race.cars)c.nextRelease=1e12;}

test('连续秒数：1 秒推进 1 秒，不提前结算整圈，赛车独立移动',()=>{
 const s=rgame();const fuel=own(s).fuel;advanceRealtime(s,1);assert.equal(s.race.time,1);assert.equal(s.race.lap,0);assert.ok(s.race.cars[0].progress>0);assert.equal(s.race.cars[0].lastLap,0);assert.equal(own(s).fuel,fuel);advanceRealtime(s,35);assert.ok(s.race.cars.some(c=>c.sectors.length===1));assert.equal(s.race.lap,0);
});
test('真实赛道轮廓 25 条：闭合路径，位置查询有限且随进度变化',()=>{for(const id of Object.keys(TRACKS)){const g=geometry(id);assert.ok(g.points.length>20);assert.deepEqual(trackPoint(id,0),trackPoint(id,1));assert.ok(trackPoint(id,.5).every(Number.isFinite));assert.notDeepEqual(trackPoint(id,.1),trackPoint(id,.5));}});
test('三字母缩写唯一，支持自建中文名与修改，拒绝冲突',()=>{const s=createGame({custom:true,driverNames:['甲','乙']});assert.equal(new Set(s.drivers.map(d=>d.code)).size,s.drivers.length);const d=teamOf(s).drivers[0];setDriverCode(s,d,'LEE');assert.equal(s.drivers.find(x=>x.id===d).code,'LEE');assert.throws(()=>setDriverCode(s,d,'VER'));assert.throws(()=>setDriverCode(s,d,'A1'));assignDriverCodes(s);assert.ok(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code)));});
test('排位：出场圈不计成绩 → 飞行圈有效 → 默认回场圈 → 车库',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);assert.equal(c.phase,'FLY');assert.equal(c.stageBest,9999);const flyStart=s.race.time;cross(s,c);assert.equal(c.phase,'IN');assert.ok(c.stageBest<9999);assert.ok(Math.abs(c.stageBest-(s.race.time-flyStart))<1e-8);assert.ok(Math.abs(c.lastSectors.reduce((a,b)=>a+b,0)-c.lastLap)<1e-7);assert.ok(c.lastSectorSpeeds.every(v=>v>0));const best=c.stageBest;cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,best);
});
test('出场圈可直接回 Pit；中途放弃飞行圈不会记录圈速',()=>{
 const s=qgame(),c=send(s);quietAI(s);qualCommand(s,c.driverId,'return');cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);send(s,c);cross(s,c);assert.equal(c.phase,'FLY');advanceRealtime(s,10);qualCommand(s,c.driverId,'abort');assert.equal(c.phase,'ABORT');cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);assert.equal(s.race.fastest.time,9999);
});
test('连续飞行圈不瞬移、不补油、不消耗另一套胎，可再切回回场圈',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);const stock=s.calendar.weekend.tyres[c.driverId].S,fuel=c.fuel;qualCommand(s,c.driverId,'repeat');cross(s,c);assert.equal(c.phase,'FLY');assert.equal(c.consecutive,true);assert.equal(s.calendar.weekend.tyres[c.driverId].S,stock);assert.ok(c.fuel<fuel);qualCommand(s,c.driverId,'return');cross(s,c);assert.equal(c.phase,'IN');
});
test('倒计时归零：已开始的飞行圈可完成，禁止新的飞行圈与车库出场',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);qualCommand(s,c.driverId,'repeat');s.race.q.deadline=s.race.time+1;advanceRealtime(s,2);assert.equal(s.race.q.remaining,0);assert.equal(s.race.q.status,'RUNNING');assert.equal(c.phase,'FLY');cross(s,c);assert.ok(c.stageBest<9999);assert.equal(s.race.q.status,'BREAK');assert.throws(()=>qualCommand(s,c.driverId,'send',{compound:'S'}));
});
test('出场圈在归零后过线，不得获得飞行圈成绩',()=>{
 const s=qgame(),c=send(s);quietAI(s);s.race.q.deadline=s.race.time+1;advanceRealtime(s,2);assert.equal(s.race.q.status,'BREAK');assert.equal(c.stageBest,9999);assert.equal(s.race.fastest.time,9999);
});
test('22 车晋级、各段计时重置与 7/8 分钟节间休息',()=>{
 const s=qgame({custom:true});quietAI(s);assert.equal(s.race.q.remaining,1080);advanceRealtime(s,1080);assert.equal(s.race.q.active.length,16);assert.equal(s.race.q.remaining,420);skipQualBreak(s);assert.equal(s.race.q.stage,2);assert.equal(s.race.q.remaining,900);quietAI(s);advanceRealtime(s,900);assert.equal(s.race.q.active.length,10);assert.equal(s.race.q.remaining,480);skipQualBreak(s);assert.equal(s.race.q.remaining,720);quietAI(s);advanceRealtime(s,720);assert.equal(s.race.finished,true);assert.equal(s.calendar.weekend.grids.Q.length,22);assert.equal(s.race.q.stages.length,3);
});
test('冲刺排位 12/10/8 分钟、指定胎与每段一套限制',()=>{
 const s=qgame({sprint:true}),c=own(s);s.race.wetness=0;quietAI(s);assert.equal(s.race.kind,'SQ');assert.equal(s.race.q.remaining,720);assert.deepEqual(allowedQualTyres(s,c),['M']);assert.throws(()=>send(s,c,'S'));send(s,c,'M');const stock=s.calendar.weekend.tyres[c.driverId].M;qualCommand(s,c.driverId,'return');cross(s,c);send(s,c,'M');assert.equal(s.calendar.weekend.tyres[c.driverId].M,stock);qualCommand(s,c.driverId,'return');cross(s,c);advanceRealtime(s,s.race.q.deadline-s.race.time);skipQualBreak(s);assert.equal(s.race.q.remaining,600);quietAI(s);advanceRealtime(s,600);skipQualBreak(s);assert.equal(s.race.q.remaining,480);assert.deepEqual(allowedQualTyres(s,c),['S']);
});
test('2023 匈牙利 / 意大利 ATA 排位 H / M / S',()=>{for(const track of ['hungary','italy']){const s=qgame({year:2023,track});s.race.wetness=0;assert.deepEqual(allowedQualTyres(s,own(s)),['H']);}});
test('同一时间与指令：大步推进与逐秒推进事件 / RNG / 圈速相同',()=>{
 const a=qgame(),b=copy(a);send(a);send(b);advanceRealtime(a,400);for(let i=0;i<400;i++)advanceRealtime(b,1);assert.equal(a.rng,b.rng);assert.deepEqual(a.race.events,b.race.events);assert.deepEqual(a.race.cars.map(c=>[c.driverId,c.stageBest,c.progress,c.phase]),b.race.cars.map(c=>[c.driverId,c.stageBest,c.progress,c.phase]));
});
test('实时场次中途保存加载，排位与正赛后续逐字段一致',()=>{
 for(const init of [qgame,rgame]){const a=init();if(a.race.qualifying)send(a);advanceRealtime(a,55);const b=importText(exportText(a));finishRealtime(a);finishRealtime(b);assert.deepEqual(a,b);}
});
test('暂停不推进时钟，手动快进一圈可用且保持暂停',()=>{const s=rgame();s.race.running=false;advanceRealtime(s,30);assert.equal(s.race.time,0);fastForwardLap(s);assert.equal(s.race.lap,1);assert.equal(s.race.running,false);});
test('进站损失实际占用比赛时间，坑位期间赛车停止，圈速包含该损失',()=>{
 const s=rgame(),c=own(s);c.plan.auto=false;c.plan.pitLap=1;c.plan.secondLap=0;cross(s,c);assert.equal(c.phase,'PIT');assert.equal(c.stops,1);const time=s.race.time,delay=c.pitUntil-time;assert.ok(delay>15);advanceRealtime(s,delay/2,true);assert.equal(c.phase,'PIT');assert.equal(c.speed,0);advanceRealtime(s,c.pitUntil-s.race.time,true);assert.equal(c.phase,'RACE');cross(s,c);assert.ok(c.lastLap>80+delay*.8);assert.ok(c.usedDry.includes('H'));
});
test('方格旗按各车下一次过线结算，套圈车不补跑完整距离',()=>{
 const s=rgame(),slow=s.race.cars.at(-1);s.race.totalLaps=5;advanceRealtime(s,10);for(const c of s.race.cars){c.fuel=100;c.plan.auto=true;}slow.segmentEnd+=200;slow.segmentDuration+=200;finishRealtime(s);assert.equal(s.race.finished,true);const row=s.race.result.rows.find(c=>c.driverId===slow.driverId);assert.ok(row.lap<5);assert.ok(s.race.result.rows.every(c=>c.lap<=5));assert.equal(s.race.result.rows.length,20);
});
test('四季实时冲刺 / 排位 / 正赛可完整结算，积分守恒',()=>{
 for(const year of [2022,2023,2024,2025]){const s=setup({year,sprint:true,custom:true});while(s.calendar.weekend.index<s.calendar.weekend.sessions.length){const k=s.calendar.weekend.sessions[s.calendar.weekend.index];if(k.startsWith('FP'))practice(s);else{if(k==='Q'||k==='SQ')startQualifying(s);else{for(const id of teamOf(s).drivers)s.calendar.weekend.strategy[id].auto=true;startRealtimeRace(s);}finishRealtime(s);}}assert.equal(s.history.races.length,2);assert.ok(s.race.result.rows.every(r=>Number.isFinite(r.time)));assert.equal(s.teams.reduce((n,t)=>n+t.points,0),s.history.races.flatMap(r=>r.rows).reduce((n,r)=>n+r.points,0));}
});
test('正赛跨不同时间步长推进：RNG、事件与位置逐字段一致',()=>{const a=rgame(),b=copy(a);advanceRealtime(a,1000);for(let i=0;i<1000;i++)advanceRealtime(b,1);assert.deepEqual(a,b);});
test('红旗冻结排位倒计时与无效进行中圈，恢复后可复用轮胎出场',()=>{const s=qgame(),c=send(s);quietAI(s);cross(s,c);const remaining=s.race.q.remaining;suspendQualifying(s);advanceRealtime(s,200);assert.equal(s.race.q.remaining,remaining);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);resumeRealtime(s);qualCommand(s,c.driverId,'send',{compound:'S',fresh:false});assert.equal(c.phase,'OUT');});
test('比赛时限结束，领先者在下一圈末冲线而非立即结束',()=>{const s=rgame();s.race.timeLimit=1;s.race.totalLaps=10;advanceRealtime(s,1);assert.equal(s.race.chequered,false);assert.equal(s.race.limitFinishLap,2);fastForwardLap(s);assert.equal(s.race.lap,1);assert.equal(s.race.chequered,false);finishRealtime(s);assert.equal(s.race.result.rows[0].lap,2);});
test('自动出场关闭后取消尚未执行的出场计划',()=>{const s=qgame(),c=own(s);quietAI(s);qualCommand(s,c.driverId,'auto');qualCommand(s,c.driverId,'auto');advanceRealtime(s,10);assert.equal(c.phase,'GARAGE');assert.equal(c.autoQual,false);});
test('旧版逐圈比赛存档升级，保留圈数、轮胎磨损与可恢复的实时场次',()=>{const s=setup();while(s.calendar.weekend.sessions[s.calendar.weekend.index]!=='RACE')qualifying(s,'push',true);startRace(s);tick(s,4);s.schemaVersion=2;const lap=s.race.lap,wear=s.race.cars[0].tyreWear,id=s.race.cars[0].driverId;const migrated=importText(exportText(s));assert.equal(migrated.schemaVersion,3);assert.equal(migrated.race.realtime,true);assert.equal(migrated.race.lap,lap);assert.equal(migrated.race.cars.find(c=>c.driverId===id).tyreWear,wear);finishRealtime(migrated);assert.equal(migrated.race.finished,true);});
test('实时存档拒绝非法赛段索引和负时钟',()=>{const s=rgame();s.race.cars[0].sector=99;assert.throws(()=>importText(exportText(s)));s.race.cars[0].sector=0;s.race.time=-1;assert.throws(()=>importText(exportText(s)));});
test('新场次默认 1×，保留暂停操作与既有设置的其他内容',()=>{const s=setup();s.settings.speed=64;startQualifying(s);assert.equal(s.settings.speed,1);finishRealtime(s);s.settings.speed=32;startRealtimeRace(s);assert.equal(s.settings.speed,1);});
test('新版 action 全程推进 2025：24 站、30 场比赛、中途存档恢复与季末',()=>{
 let s=createGame({year:2025,seed:'full-live-season',custom:true});s.finance.custom.cash=5000;teamOf(s).confidence=100;let weekends=0;
 while(!s.season.offseason){reduce(s,'enterWeekend');const w=s.calendar.weekend;for(const id of teamOf(s).drivers)w.strategy[id].auto=true;
  while(w.index<w.sessions.length){const k=w.sessions[w.index];if(k.startsWith('FP'))reduce(s,'practice');else{reduce(s,k==='Q'||k==='SQ'?'startQualifying':'startRace');reduce(s,'finishRace');assert.equal(s.race.finished,true);}}
  reduce(s,'closeWeekend');weekends++;assert.equal(s.season.gameOver,null);if(weekends%6===0)s=importText(exportText(s));
 }
 assert.equal(weekends,24);assert.equal(s.history.races.length,30);assert.equal(s.history.seasons.length,1);
});
console.log(JSON.stringify({tests:results},null,2));
```

## tests/static.test.py

```python
# ===== 文件: tests/static.test.py =====
"""资源、路径、依赖与分层检查；只使用 Python 标准库。"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
files = list(ROOT.rglob('*'))
assert (ROOT / '.nojekyll').is_file()
for file in files:
    if not file.is_file() or file.suffix not in ('.js', '.css', '.html'):
        continue
    text = file.read_text(encoding='utf-8')
    assert not re.search(r'\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(', text), file
    assert 'Math.random(' not in text, file
    if file.suffix == '.html':
        for ref in re.findall(r'(?:src|href)="([^"]+)"', text):
            if ref.startswith('#'):
                continue
            assert ref.startswith('./'), (file, ref)
            assert (file.parent / ref).exists(), (file, ref)
    if file.suffix == '.js' and file.name != 'offline.js' and file.is_relative_to(ROOT / 'js'):
        for ref in re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', text):
            assert ref.startswith('./') or ref.startswith('../'), (file, ref)
            assert (file.parent / ref).resolve().is_file(), (file, ref)
    if file.parent.name == 'core':
        assert not re.search(r'\b(?:document|querySelector|innerHTML|HTMLElement)\b', text), file
print('PASS 所有引用相对、资源齐全、无外部 API、无 Math.random、核心无 DOM')
```

## tools/build_offline.py

```python
# ===== 文件: tools/build_offline.py =====
"""仅供开发者改源码后更新离线脚本；玩家无需执行，也不依赖第三方包。"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
seen = set()
ordered = []
pattern = re.compile(r"^import\s+\{([^}]+)\}\s+from\s+['\"]([^'\"]+)['\"];?", re.M)


def visit(path):
    path = path.resolve()
    if path in seen:
        return
    seen.add(path)
    source = path.read_text(encoding="utf-8")
    for match in pattern.finditer(source):
        visit(path.parent / match.group(2))
    ordered.append(path)


visit(ROOT / 'js/main.js')
output = ["// 由 tools/build_offline.py 从分层 ES Module 源码生成；无运行时依赖。\n(function () {\n'use strict';\nconst modules = {};\n"]
for path in ordered:
    key = path.relative_to(ROOT).as_posix()
    source = path.read_text(encoding='utf-8')
    names = re.findall(r'^export\s+(?:async\s+)?(?:function|const|let|class)\s+(\w+)', source, re.M)

    def replace(match):
        dependency = (path.parent / match.group(2)).resolve().relative_to(ROOT).as_posix()
        spec = re.sub(r'\s+as\s+', ': ', match.group(1))
        return 'const {' + spec + '} = modules[' + repr(dependency) + '];'

    source = pattern.sub(replace, source)
    source = re.sub(r'^export\s+', '', source, flags=re.M)
    output.append('\n// ===== 文件: ' + key + ' =====\n')
    output.append('modules[' + repr(key) + '] = (function () {\n' + source + '\nreturn {' + ', '.join(names) + '};\n}());\n')
output.append('}());\n')
(ROOT / 'js/offline.js').write_text(''.join(output), encoding='utf-8')
print('离线脚本已更新：', len(ordered), '个模块')
```
