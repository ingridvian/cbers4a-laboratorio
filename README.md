# Laboratório CBERS-4A — cinco classes (Ingrid)

Versão atualizada a partir da pasta `SITE_INGRID_5_CLASSES.zip`, alinhada à estrutura do repositório de referência `Carine-data-analyst/cbers4a-laboratorio` em 10/11/2026.

## Estrutura do site

- `index.html`, `styles.css`: interface com Biblioteca de códigos, Banco de amostras, Banco de testes e experimentos, Acervo de pesquisa — acesso restrito, Recados e anotações.
- `dados.js`: identidade do laboratório, cinco classes de referência e cadastros dos notebooks e experimentos.
- `app.js`: renderização do site; consulta `amostras/catalogo.json` para classe, contagem e link direto da pasta.
- `acessos.js`, `acessos.css`: cartão do acervo restrito no Google Drive.
- `amostras/catalogo.json`: arquivo publicado com o resultado da extração; inicialmente vazio até a geração do catálogo real.
- `testes/catalogo.json`: reservado para eventual uso futuro; os experimentos visíveis são cadastrados em `dados.js`.
- `.nojekyll`: compatibilidade com GitHub Pages.

## Antes de publicar

1. Criar ou identificar o repositório **do laboratório de cinco classes**. Publicar os arquivos na **raiz**, preservando a subpasta `amostras/`.
2. No arquivo `dados.js`, preencher `repositorio.usuario` e `repositorio.nome` com o usuário e repositório corretos. Isso também habilita os recados do professor quando o repositório for público e tiver Issues ativado.
3. Preencher cada `codigos[].url` com o **Colab específico deste laboratório**. Todos estão intencionalmente vazios, para não usar links de outro projeto.
4. Em `acessos.js`, preencher `PASTA_DRIVE` com o link da pasta do **acervo deste laboratório**, respeitando as permissões do Drive.
5. Após executar a extração em Colab e gerar `catalogo_publicacao/catalogo.json`, substituir `amostras/catalogo.json` pelo arquivo gerado. O site reconhecerá as classes, quantidades e links reais das pastas automaticamente, sem alterar `app.js`.
6. Adicionar experimentos em `dados.js`, no array `experimentos`, somente após obter resultados reais. Campos sugeridos: `titulo`, `status`, `descricao`, `metricas`, `observacoes`, `link`.
7. Em GitHub: Settings → Pages → Deploy from a branch → `main` / `(root)`. Conferir que a funcionalidade Issues está habilitada se quiser usar Recados.

## Cinco classes e contagens

Os nomes presentes em `dados.js` foram mantidos com base nas labels citadas no projeto:

- Vegetação arbórea — 250
- Outros — 172
- Superficie_Impermeavel — 135
- Solo_Exposto — 55
- Vegetação rasteira — 39

**Essas são contagens históricas de referência (651 polígonos), não uma verificação de uma nova extração.** Como `amostras/catalogo.json` ainda tem `classes: []`, o site mostrará esses valores provisórios de `dados.js`. Assim que você publicar o JSON criado a partir da extração atual, as classes e quantidades passarão a ser as efetivamente contadas. Se quiser evitar exibir valores históricos antes disso, altere `poligonos` para `null` em `dados.js`.

## O que não está automatizado

A geração do JSON ocorre no Colab; a publicação no GitHub é **manual**. O site público não pode enumerar o conteúdo de uma pasta privada do Drive sem autenticação. Os IDs/links de pastas publicados no JSON não removem as restrições de acesso do Drive.

## Segurança e preservação

Não incluir tokens, credenciais, GeoTIFFs privados ou links de outro laboratório. Conservar separadamente as versões originais das extrações. O site não modifica polígonos nem arquivos de pesquisa. Não copie o `dados.js` ou o `amostras/catalogo.json` do laboratório de duas classes para este repositório.
