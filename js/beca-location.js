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
  googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Frutas+Beca&destination_place_id=ChIJf5huAZ3yXpMRE8wybFZGO4I'
};
// Endereço completo em uma linha (copiar endereço / vCard)
window.BECA_LOCATION.address =
  window.BECA_LOCATION.name + ' — ' + window.BECA_LOCATION.place + ', ' +
  window.BECA_LOCATION.street + ', ' + window.BECA_LOCATION.complement + ', ' +
  window.BECA_LOCATION.city + ' - ' + window.BECA_LOCATION.state;
