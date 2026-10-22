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
