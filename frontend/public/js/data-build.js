/* ---------------- lookup helpers ----------------
   Brand/model/price *generation* now happens on the backend (see
   backend/src/data/build.js) — the frontend only needs to look things up in
   whatever DB.brands / DB.prices the API returned. */
function findModel(brands, modelId) {
  for (const b of brands) for (const s of b.series) for (const m of s.models) if (m.id === modelId) return { brand: b, series: s, model: m };
  return null;
}
function findBrand(brands, id) { return brands.find(b => b.id === id); }
function getPrice(prices, brandId, modelId, serviceId) {
  return prices.find(p => p.brandId === brandId && p.modelId === modelId && p.serviceId === serviceId);
}
