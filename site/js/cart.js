// Корзина: хранится в браузере посетителя, заказ отправляется в WhatsApp одним сообщением.
(function () {
  const rub = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
  const kg = (n) => (Math.round(n * 10) / 10).toLocaleString("ru-RU") + " кг";
  const KEY = "vorypaevo-cart-v1";

  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { items = []; }
  if (!Array.isArray(items)) items = [];
  const subs = new Set();
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
    subs.forEach((fn) => fn(api));
  };

  // Сумма строки: число или null, если цена/вес станут известны только после взвешивания.
  const lineTotal = (i) => (i.pricePerKg && i.approxKg ? i.qty * i.approxKg * i.pricePerKg : null);

  const api = {
    get items() { return items; },
    add(line, qty = 1) {
      const found = items.find((i) => i.key === line.key);
      if (found) found.qty += qty; else items.push({ ...line, qty });
      save();
    },
    setQty(key, qty) {
      items = qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i));
      save();
    },
    remove(key) { items = items.filter((i) => i.key !== key); save(); },
    clear() { items = []; save(); },
    get count() { return items.reduce((s, i) => s + i.qty, 0); },
    get total() { return items.reduce((s, i) => s + (lineTotal(i) || 0), 0); },
    get hasUnknown() { return items.some((i) => lineTotal(i) === null); },
    get hasFrom() { return items.some((i) => i.priceFrom || i.weightFrom); },
    lineTotal,
    subscribe(fn) { subs.add(fn); fn(api); return () => subs.delete(fn); },

    whatsappUrl({ name = "", delivery = "Самовывоз", date = "", comment = "" } = {}) {
      const lines = items.map((i, n) => {
        const t = lineTotal(i);
        const price = i.pricePerKg ? `${i.priceFrom ? "от " : ""}${rub(i.pricePerKg)}/кг` : "цена по договорённости";
        return `${n + 1}. ${i.title}${i.note ? " (" + i.note + ")" : ""} — ${i.qty} × ${i.unit}, ${price}${t ? `, ${i.priceFrom || i.weightFrom ? "от " : "~"}${rub(t)}` : ""}`;
      });
      const sum = api.total
        ? `Примерная сумма: ${api.hasFrom ? "от " : ""}${rub(api.total)}${api.hasUnknown ? " + позиции, которые посчитаем после взвешивания" : ""}`
        : "Сумму посчитаем после взвешивания";
      const text = [
        "Здравствуйте! Хочу сделать заказ с сайта:", "",
        ...lines, "",
        sum,
        `Получение: ${delivery}`,
        date ? `Желаемая дата: ${date}` : null,
        name ? `Имя: ${name}` : null,
        comment ? `Комментарий: ${comment}` : null,
      ].filter((l) => l !== null).join("\n");
      return `https://wa.me/${window.FARM.whatsapp}?text=${encodeURIComponent(text)}`;
    },
  };

  window.Cart = { cart: api, rub, kg };
})();
