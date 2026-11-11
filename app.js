/* Portfólio CBERS-4A — banco de amostras carregado de amostras/catalogo.json */
(() => {
  'use strict';
  const d = window.PORTFOLIO_DADOS;
  if (!d) { console.error('Verifique dados.js'); return; }
  const $ = id => document.getElementById(id);
  const text = (el, value) => { if (el) el.textContent = String(value ?? ''); };
  const make = (tag, css = '', value) => {
    const el = document.createElement(tag);
    if (css) el.className = css;
    if (value !== undefined) el.textContent = String(value);
    return el;
  };
  const safeLink = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; }
    catch { return null; }
  };
  const buttonLink = (label, url, css = 'btn') => {
    const dest = safeLink(url);
    if (!dest) return make('span', 'hint', 'Link ainda não cadastrado');
    const el = make('a', css, label);
    el.href = dest; el.target = '_blank'; el.rel = 'noopener noreferrer';
    return el;
  };
  const card = (title, badge, description) => {
    const el = make('article', 'card');
    el.append(make('span', 'badge', badge || 'Registrado'), make('h3', '', title), make('p', '', description || ''));
    return el;
  };
  function renderCodes() {
    const root = $('lista-codigos'); if (!root) return;
    root.replaceChildren();
    for (const x of d.codigos || []) {
      const c = card(x.titulo, x.categoria, x.descricao);
      c.append(buttonLink('Abrir no Colab ↗', x.url)); root.append(c);
    }
    if (!root.children.length) root.append(make('div', 'empty', 'Nenhum notebook cadastrado.'));
  }
  async function renderSamples() {
    const root = $('lista-amostras'); if (!root) return;
    root.replaceChildren(make('div', 'empty', 'Carregando banco de amostras...'));
    let classes = d.classes || [];
    let catalogo = null;
    try {
      const response = await fetch('amostras/catalogo.json?v=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const result = await response.json();
      if (!Array.isArray(result.classes) || !result.classes.length) throw new Error('Catálogo não publicado');
      for (const x of result.classes) {
        if (!x || typeof x.nome !== 'string' || !x.nome.trim() || !Number.isInteger(x.poligonos) || x.poligonos < 0)
          throw new Error('Classe inválida no catálogo');
        if (x.link && !safeLink(x.link)) throw new Error('Link inválido no catálogo');
      }
      const total = result.classes.reduce((a, x) => a + x.poligonos, 0);
      if (result.total_amostras !== undefined && total !== result.total_amostras) throw new Error('Contagens inconsistentes');
      classes = result.classes; catalogo = result;
    } catch (e) { console.warn('Usando cadastro provisório de dados.js:', e.message); }
    text($('stat-classes'), classes.length);
    const counted = classes.every(x => Number.isInteger(x.poligonos));
    const total = counted ? classes.reduce((a,x) => a + x.poligonos, 0) : null;
    text($('stat-amostras'), total === null ? '—' : total);
    if (catalogo) {
      text($('amostras-descricao'), `Banco de amostras da Area1. Extração: ${catalogo.extracao || 'não informada'}. ${total} polígonos, ${classes.length} classes. GeoTIFFs no Google Drive com acesso controlado.`);
    } else text($('amostras-descricao'), d.descricaoAmostras || 'Dados provisórios até a publicação do catálogo.');
    root.replaceChildren();
    for (const x of classes) {
      const name = x.nome.toLowerCase();
      const icon = x.icone || (name.includes('arbórea') || name.includes('arborea') ? '🌳' : name.includes('rasteira') ? '🌿' : '◉');
      const c = make('article', 'card');
      const count = make('p'); count.append(make('strong', '', Number.isInteger(x.poligonos) ? `${x.poligonos} polígonos` : 'Quantidade a contabilizar'));
      c.append(make('div', 'class-icon', icon), make('h3', '', x.nome), make('p', '', x.descricao || 'Amostras individuais da Area1.'), count);
      c.append(x.link ? buttonLink('Ver amostras da classe ↗', x.link, 'btn outline') : make('span', 'hint', 'Pasta ainda não vinculada.'));
      root.append(c);
    }
    if (!classes.length) root.append(make('div', 'empty', 'Nenhuma classe cadastrada.'));
  }
  function renderExperiments() {
    const root = $('lista-experimentos'); if (!root) return;
    root.replaceChildren();
    for (const x of d.experimentos || []) {
      const c = card(x.titulo, x.status || 'Registrado', x.descricao);
      const pills = make('div', 'pillrow');
      (x.metricas || []).forEach(m => pills.append(make('span', 'pill', m)));
      c.append(pills);
      if (x.observacoes) c.append(make('p', '', x.observacoes));
      if (x.link) c.append(buttonLink('Ver resultados ↗', x.link, 'btn outline'));
      root.append(c);
    }
    if (!root.children.length) root.append(make('div', 'empty', 'Nenhum experimento cadastrado. Os resultados serão adicionados após os testes.'));
  }
  function repository() {
    const r = d.repositorio || {};
    const owner = String(r.usuario || '').trim(), repo = String(r.nome || '').trim();
    if (!owner || !repo || owner.includes('SEU_USUARIO')) return null;
    return { owner, repo, url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}` };
  }
  async function diary() {
    const root = $('lista-diario'), newLink = $('novo-recado'), r = repository();
    if (!root || !newLink) return;
    if (!r) {
      root.replaceChildren(make('div', 'empty', 'Configure o usuário e o nome do repositório em dados.js para ativar os recados.'));
      newLink.removeAttribute('href'); newLink.setAttribute('aria-disabled', 'true');
      const a = $('link-repo'); if (a) a.removeAttribute('href');
      return;
    }
    newLink.href = `${r.url}/issues/new?title=${encodeURIComponent('[Diário] Orientação do professor')}&body=${encodeURIComponent('Data da orientação:\n\nRecado / orientação:\n\nPróximas atividades:\n')}`;
    const repoLink = $('link-repo'); if (repoLink) repoLink.href = r.url;
    try {
      const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(r.owner)}/${encodeURIComponent(r.repo)}/issues?state=all&per_page=100&sort=created&direction=desc`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const all = await response.json();
      const items = all.filter(x => !x.pull_request && /^\[Diário\]/i.test(x.title || '')).slice(0, 20);
      root.replaceChildren();
      for (const x of items) {
        const c = make('article', 'diary-card');
        const date = new Date(x.created_at);
        c.append(make('div', 'date', Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('pt-BR').format(date)), make('h3', '', x.title.replace(/^\[Diário\]\s*/i, '')), make('small', '', `Registrado por @${x.user?.login || 'usuário'} · ${x.state === 'closed' ? 'Concluído' : 'Em aberto'}`), make('p', '', x.body || 'Sem texto adicional.'), buttonLink('Abrir registro e comentários ↗', x.html_url, 'btn outline'));
        root.append(c);
      }
      if (!items.length) root.append(make('div', 'empty', 'Nenhum recado publicado ainda.'));
    } catch (e) { console.warn('Erro ao consultar recados:', e); root.replaceChildren(make('div', 'empty', 'Não foi possível carregar os recados do GitHub.')); }
  }
  function init() {
    document.documentElement.style.setProperty('--accent', d.tema.acento);
    document.documentElement.style.setProperty('--accent-soft', d.tema.suave);
    document.documentElement.style.setProperty('--hero', d.tema.escuro);
    document.documentElement.style.setProperty('--hero2', d.tema.degrade);
    document.title = d.nome + ' | CBERS-4A';
    text($('marca'), d.nome); text($('titulo'), d.titulo); text($('subtitulo'), d.subtitulo);
    text($('autoria'), d.autora + ' · ' + d.tipo); text($('rodape'), d.nome + ' · ' + d.autora);
    text($('stat-codigos'), (d.codigos || []).length); text($('stat-exps'), (d.experimentos || []).length);
    text($('stat-classes'), (d.classes || []).length);
    renderCodes(); renderSamples(); renderExperiments(); diary();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
