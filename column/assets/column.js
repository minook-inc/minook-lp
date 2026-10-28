// 記入用の表をタブ区切りでコピーする
document.querySelectorAll('.tpl .copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const rows = [...btn.closest('.tpl').querySelectorAll('tr')];
    const tsv = rows.map((tr) => [...tr.children].map((c) => c.innerText.trim()).join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(tsv);
      btn.textContent = 'コピーしました';
    } catch {
      btn.textContent = 'コピーできませんでした';
    }
    setTimeout(() => { btn.textContent = 'コピー'; }, 2000);
  });
});

// 目次の現在位置を表示する（D3）
(() => {
  const links = [...document.querySelectorAll('.toc-side a')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const heads = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.classList.remove('on'));
      byId.get(e.target.id)?.classList.add('on');
    }
  }, { rootMargin: '-88px 0px -70% 0px' });
  heads.forEach((h) => io.observe(h));
})();
