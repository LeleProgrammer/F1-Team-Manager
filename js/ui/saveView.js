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
