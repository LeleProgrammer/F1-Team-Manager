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
