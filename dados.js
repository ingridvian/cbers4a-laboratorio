/* Edite os dados abaixo. Mantenha window.PORTFOLIO_DADOS. */
window.PORTFOLIO_DADOS = {
  "nome": "Laboratório CBERS-4A | Ingrid",
  "titulo": "Classificação da cobertura do solo com imagens CBERS-4A",
  "subtitulo": "Portfólio de pesquisa: biblioteca de códigos, banco de amostras em cinco classes, experimentos com MobileNetV2 e recados de orientação.",
  "autora": "Ingrid",
  "tipo": "Classificação multiclasse · 5 classes",
  "descricaoAmostras": "Banco de amostras da Area1 em cinco classes. Distribuição de referência: 651 polígonos; a publicação de um novo catálogo de extração atualizará as contagens.",
  "tema": {
    "acento": "#175ea4",
    "suave": "#e6f0fb",
    "escuro": "#101f3b",
    "degrade": "#1c4677"
  },
  "repositorio": {
    "usuario": "SEU_USUARIO_GITHUB",
    "nome": "cbers4a-ingrid"
  },
  "classes": [
    {"nome":"Vegetação arbórea","icone":"🌳","descricao":"Copas de árvores e vegetação de porte arbóreo.","poligonos":250,"link":""},
    {"nome":"Outros","icone":"◫","descricao":"Outras coberturas do solo conforme a classificação do CVAT.","poligonos":172,"link":""},
    {"nome":"Superficie_Impermeavel","icone":"▤","descricao":"Vias, calçadas e outras superfícies impermeáveis.","poligonos":135,"link":""},
    {"nome":"Solo_Exposto","icone":"◩","descricao":"Solo exposto sem cobertura vegetal ou pavimentação.","poligonos":55,"link":""},
    {"nome":"Vegetação rasteira","icone":"🌿","descricao":"Gramados e cobertura vegetal de baixo porte.","poligonos":39,"link":""}
  ],
  "codigos": [
    {"titulo":"Caracterização da Area1 e geração de patches","categoria":"Pré-processamento","descricao":"Análise do GeoTIFF original, bandas, resolução, NoData e patches.","url":""},
    {"titulo":"Visualização da Area1 em falsa-cor NIR para o CVAT","categoria":"Pré-processamento","descricao":"Composição NIR–Vermelho–Verde e exportação para anotação no CVAT sem alterar a grade de pixels.","url":""},
    {"titulo":"Conversão de XML para Shapefile e extração individual dos polígonos em GeoTIFF","categoria":"Amostragem / CVAT","descricao":"Conversão das anotações com identificação automática de classes e extração dos GeoTIFFs individuais.","url":""},
    {"titulo":"Treinamento MobileNetV2 — contorno sem contexto","categoria":"MobileNetV2 / treinamento","descricao":"Treinamento com amostras individuais, sem contexto espacial adicional, classes e quantidades identificadas automaticamente.","url":""},
    {"titulo":"Treinamento MobileNetV2 — contorno com contexto buffer","categoria":"MobileNetV2 / treinamento","descricao":"Treinamento com contexto buffer de 20%, classes e quantidades identificadas automaticamente.","url":""}
  ],
  "experimentos": []
};
