/* Acervo de pesquisa — Google Drive. Link não concede acesso sem permissão. */
(() => {
  'use strict';
  // Preencha o link real da pasta de pesquisa, SEM reutilizar a pasta de outro laboratório.
  const PASTA_DRIVE = '';
  function validDrive(value) {
    try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'drive.google.com' ? u.href : null; }
    catch { return null; }
  }
  function render() {
    const root = document.getElementById('lista-acessos'); if (!root) return;
    root.replaceChildren();
    const c = document.createElement('article'); c.className = 'card acesso-card';
    const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = 'Google Drive · Acesso controlado';
    const title = document.createElement('h3'); title.textContent = 'Acervo completo da pesquisa — CBERS-4A';
    const p = document.createElement('p'); p.textContent = 'Imagens, anotações CVAT, Shapefiles, GeoTIFFs, códigos e resultados preservados no Drive com acesso autorizado.';
    c.append(badge, title, p);
    const url = validDrive(PASTA_DRIVE);
    if (url) {
      const a = document.createElement('a'); a.className = 'btn outline'; a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'Solicitar ou acessar a pasta ↗'; c.append(a);
    } else {
      const hint = document.createElement('span'); hint.className = 'hint'; hint.textContent = 'Link do acervo ainda não cadastrado.'; c.append(hint);
    }
    root.append(c);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
