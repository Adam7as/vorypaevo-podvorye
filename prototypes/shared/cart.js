// Простая корзина для прототипов: хранение в localStorage + оформление в WhatsApp.
(function () {
  const rub = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
  const kg = (n) => (Math.round(n * 10) / 10).toLocaleString("ru-RU") + " кг";

  function createCart(key) {
    let items = [];
    try { items = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { items = []; }
    const subs = new Set();
    const save = () => {
      try { localStorage.setItem(key, JSON.stringify(items)); } catch (e) {}
      subs.forEach((fn) => fn(api));
    };

    const api = {
      get items() { return items; },
      // line: { key, title, pricePerKg, approxKg, unit, note? }
      add(line, qty = 1) {
        const found = items.find((i) => i.key === line.key);
        if (found) found.qty += qty; else items.push({ ...line, qty });
        save();
      },
      setQty(lineKey, qty) {
        items = qty <= 0 ? items.filter((i) => i.key !== lineKey) : items.map((i) => (i.key === lineKey ? { ...i, qty } : i));
        save();
      },
      remove(lineKey) { items = items.filter((i) => i.key !== lineKey); save(); },
      clear() { items = []; save(); },
      get count() { return items.reduce((s, i) => s + i.qty, 0); },
      get totalKg() { return items.reduce((s, i) => s + i.qty * i.approxKg, 0); },
      get total() { return items.reduce((s, i) => s + i.qty * i.approxKg * i.pricePerKg, 0); },
      lineTotal: (i) => i.qty * i.approxKg * i.pricePerKg,
      subscribe(fn) { subs.add(fn); fn(api); return () => subs.delete(fn); },

      whatsappUrl({ name = "", delivery = "Самовывоз", date = "", comment = "" } = {}) {
        const lines = items.map((i, n) =>
          `${n + 1}. ${i.title}${i.note ? " (" + i.note + ")" : ""} — ${i.qty} × ${i.unit}, ~${kg(i.qty * i.approxKg)}, ~${rub(api.lineTotal(i))}`
        );
        const text = [
          "Здравствуйте! Хочу сделать заказ с сайта:",
          "",
          ...lines,
          "",
          `Примерная сумма: ${rub(api.total)} (точная — после взвешивания)`,
          `Получение: ${delivery}`,
          date ? `Желаемая дата: ${date}` : null,
          name ? `Имя: ${name}` : null,
          comment ? `Комментарий: ${comment}` : null,
        ].filter((l) => l !== null).join("\n");
        return `https://wa.me/${window.FARM.whatsapp}?text=${encodeURIComponent(text)}`;
      },
    };
    return api;
  }

  window.Cart = { createCart, rub, kg };
})();
