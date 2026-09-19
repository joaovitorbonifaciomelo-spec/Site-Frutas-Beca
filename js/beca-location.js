/* =====================================================================
   FRUTAS BECA — localização oficial (fonte única de verdade)
   Usado pela homepage (js/site.js) e pelo hub /links.
   Google Maps Place ID confirmado da Frutas Beca — não use busca genérica
   pelo endereço (leva à CEASA, não à Beca).
   ===================================================================== */
window.BECA_LOCATION = {
  name: 'Frutas Beca',
  place: 'CEASA Goiás',
  street: 'Rodovia BR-153, Km 5,5',
  complement: 'GP4 — Boxes 05 e 06',
  city: 'Goiânia',
  state: 'GO',
  hours: 'Seg a Sáb, 7h às 18h',
  googlePlaceId: 'ChIJf5huAZ3yXpMRE8wybFZGO4I',
  // Ficha da Frutas Beca (Maps URLs API, sem chave; abre o app quando disponível)
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Frutas+Beca&query_place_id=ChIJf5huAZ3yXpMRE8wybFZGO4I',
  // Rota até a Frutas Beca a partir da posição do usuário
  googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Frutas+Beca&destination_place_id=ChIJf5huAZ3yXpMRE8wybFZGO4I',
  // Mapa real incorporado (sem chave). O embed por Place ID não resolve sem chave;
  // a busca "nome + CEASA" resolve para a ficha da Frutas Beca (marcador dentro da CEASA, BR-153).
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Frutas+Beca+CEASA+Goi%C3%A2nia&z=16&hl=pt-BR&output=embed'
};
// Endereço completo em uma linha (copiar endereço / vCard)
window.BECA_LOCATION.address =
  window.BECA_LOCATION.name + ' — ' + window.BECA_LOCATION.place + ', ' +
  window.BECA_LOCATION.street + ', ' + window.BECA_LOCATION.complement + ', ' +
  window.BECA_LOCATION.city + ' - ' + window.BECA_LOCATION.state;

/* Crédito de desenvolvimento no rodapé. Quando houver URL/logo oficial da Bonifácio,
   basta preencher aqui — o footer se atualiza sozinho (js/site.js). */
window.BECA_SITE = window.BECA_SITE || {};
window.BECA_SITE.developerCredit = {
  name: 'Bonifácio Marketing Digital',
  url: null,    // ex.: 'https://instagram.com/bonifacio...' — null = texto sem link
  logo: null    // ex.: 'assets/bonifacio.svg' — null = só texto
};
