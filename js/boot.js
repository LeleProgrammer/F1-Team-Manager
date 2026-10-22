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
