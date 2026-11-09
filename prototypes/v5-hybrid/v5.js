// Прототип 5: общая логика главной и каталога (шапка, меню, корзина, карточки).
(function () {
  const { rub, kg } = Cart;
  const cart = Cart.createCart("proto-v5");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page; // home | catalog
  const NAME = "Ворыпаевское подворье";
  const ICON_LOGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`;
  const ICON_WA = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.2 1.2z"/></svg>`;

  // ---------- палитра ----------
  document.documentElement.dataset.palette = "a";

  // ---------- каркас: шапка, меню, корзина, нижняя панель ----------
  const catLink = (c) => `catalog.html#c-${c.id}`;
  document.body.insertAdjacentHTML("afterbegin", `
  <header class="hdr"><div class="wrap">
    <a class="logo" href="index.html"><span class="mk">${ICON_LOGO}</span><span><b>${NAME}</b><small>фермерское мясо · <span class="hl">халяль</span></small></span></a>
    <nav class="nav">
      <div class="dd" id="dd"><button type="button">Каталог</button>
        <div class="mega">${CATEGORIES.map((c) => `<a href="${catLink(c)}"><b>${c.title}</b><small>${c.hint}</small></a>`).join("")}<a class="all" href="catalog.html">Весь каталог →</a></div>
      </div>
      <a href="index.html#farm">О ферме</a>
      <a class="hl" href="index.html#halal">Халяль</a>
      <a href="index.html#how">Как заказать</a>
      <a href="index.html#contacts">Контакты</a>
    </nav>
    <a class="hcall" href="tel:+79629517400">+7 (962) 951-74-00</a>
    <button class="hcart" data-open-cart>Корзина <span class="n" data-count>0</span></button>
    <button class="burger" data-open-nav aria-label="Меню"><i></i></button>
  </div></header>
  <div class="mnav" id="mnav">
    <div class="top"><a class="logo" href="index.html"><span class="mk">${ICON_LOGO}</span><span><b>${NAME}</b></span></a><button class="x" data-close-nav>×</button></div>
    <h4>Каталог</h4>
    ${CATEGORIES.map((c) => `<a class="cat" href="${catLink(c)}" data-close-nav><span>${c.title}<small>${c.hint}</small></span><span>→</span></a>`).join("")}
    <h4>О нас</h4>
    <a class="pl" href="index.html#farm" data-close-nav>О ферме</a>
    <a class="pl" href="index.html#halal" data-close-nav><span class="hl">Халяль</span> и своя бойня</a>
    <a class="pl" href="index.html#how" data-close-nav>Как заказать</a>
    <a class="pl" href="index.html#contacts" data-close-nav>Самовывоз и контакты</a>
    <a class="pl" href="tel:+79629517400">Позвонить: +7 (962) 951-74-00</a>
  </div>`);

  document.body.insertAdjacentHTML("beforeend", `
  <nav class="mbar">
    <a href="tel:+79629517400"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>Звонок</a>
    <a href="index.html" class="${page === "home" ? "on" : ""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>Главная</a>
    <a href="catalog.html" class="${page === "catalog" ? "on" : ""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>Каталог</a>
    <button class="mc" data-open-cart><span>Корзина<small data-count-text>пусто</small></span><span data-total>0 ₽</span></button>
  </nav>
  <div class="ovl" id="ovl"></div>
  <aside class="drawer" id="drawer" aria-label="Корзина">
    <div class="grip"></div>
    <div class="dh"><h3>Корзина</h3><button class="x" data-close-cart>×</button></div>
    <div class="ds" data-cart-list></div>
    <div class="df" data-cart-foot></div>
  </aside>
  <div class="modal" id="schema"><div class="box">
    <div class="bh"><h3>Как мы разрубим тушу</h3><button class="x" data-close-schema>×</button></div>
    <p>Разделаем тушу на части, как вам удобно. Пожелания напишите в комментарии к заказу.</p>
    <svg class="chart" viewBox="0 0 600 340">
      <path class="body" d="M120 98 L92 70 L60 66 L34 86 L30 118 L52 140 L92 142 L122 130 Z"/><path class="body" d="M62 70 L50 46 L74 60 Z"/><circle cx="62" cy="96" r="4" fill="currentColor"/><path class="body" d="M520 92 L548 80 L540 108 Z"/>
      <path class="part" d="M118 96 L190 72 L198 186 L132 170 Z"/><text x="160" y="135">Шея</text>
      <path class="part" d="M190 72 L300 62 L300 162 L198 186 Z"/><text x="248" y="128">Лопатка</text>
      <path class="part" d="M300 62 L420 64 L420 148 L300 162 Z"/><text x="360" y="112">Корейка</text>
      <path class="part" d="M198 186 L300 162 L420 148 L420 214 L300 230 L212 226 Z"/><text x="320" y="200">Грудинка, рёбра</text>
      <path class="part" d="M420 64 L498 74 Q540 110 526 172 L502 238 L420 214 Z"/><text x="470" y="150">Окорок</text>
      <path class="part" d="M214 226 L250 228 L246 312 L222 312 Z"/><path class="part" d="M462 228 L500 236 L494 312 L470 312 Z"/><text x="236" y="332">Голяшка</text>
    </svg>
  </div></div>
  <div class="toast" id="toast"></div>`);

  // ---------- карточка товара ----------
  // Фото товаров (временные, со второго первоисточника). ill: true — на исходном сайте подписано как иллюстративное.
  const IMG = {
    "lamb-whole": { src: "lamb.jpg" }, "lamb-half": { src: "lamb.jpg" }, "lamb-quarter": { src: "lamb.jpg" },
    "beef-front": { src: "meat.jpg" }, "beef-back": { src: "veal.jpg", ill: true }, "beef-part": { src: "beef.jpg", ill: true },
    "live-ram": { src: "sheep.jpg" }, "live-ewe": { src: "sheep.jpg", pos: "70% 60%" },
    "set-plov": { src: "lamb.jpg", pos: "20% 50%" }, "set-kebab": { src: "lamb.jpg", pos: "35% 40%" },
  };
  const photo = (p) => { const i = IMG[p.id]; return i ? `<img src="../assets/${i.src}" alt="${p.title}" loading="lazy" style="object-position:${i.pos || "50% 50%"}">${i.ill ? `<span class="ill">иллюстративное фото</span>` : ""}` : "фото скоро"; };
  const optSel = {};
  const keyOf = (p) => p.id + (p.options ? ":" + (optSel[p.id] || p.options[0]) : "");
  function card(p) {
    const key = keyOf(p);
    const inCart = cart.items.find((i) => i.key === key);
    return `<article class="pc">
      <div class="ph">${p.badge ? `<span class="badge">${p.badge}</span>` : ""}<span class="hal">халяль</span>${photo(p)}</div>
      <div class="b">
        <div class="pr">${rub(p.pricePerKg)} <small>/ кг</small></div>
        <h3>${p.title}</h3>
        <p>${p.short}</p>
        ${p.options ? `<div class="opts">${p.options.map((o) => `<button data-opt="${p.id}|${o}" class="${(optSel[p.id] || p.options[0]) === o ? "on" : ""}">${o}</button>`).join("")}</div>` : ""}
        ${p.id === "lamb-whole" ? `<button class="schema" data-open-schema>Как разрубим тушу</button>` : ""}
        <div class="apx">≈ ${p.approxKg} кг · ≈ ${rub(p.pricePerKg * p.approxKg)} за ${p.unit}</div>
        ${inCart ? `<div class="stp"><button data-dec="${p.id}" aria-label="Меньше">−</button><span>${inCart.qty} <small>${p.unit}</small></span><button data-inc="${p.id}" aria-label="Больше">+</button></div>`
                 : `<button class="add" data-add="${p.id}">В корзину</button>`}
      </div></article>`;
  }
  const renderers = [];
  function onRender(fn) { renderers.push(fn); fn(); }
  const rerender = () => renderers.forEach((fn) => fn());

  // ---------- корзина ----------
  const form = { delivery: "Самовывоз из Ворыпаево", name: "", date: "" };
  function cartList() {
    if (!cart.items.length) return `<div class="cempty"><b>В корзине пусто</b>Выберите мясо в каталоге<br><br><a class="btn acc" href="catalog.html">Перейти в каталог</a></div>`;
    return cart.items.map((i) => `<div class="ci">
        <div class="t">${i.title}${i.note ? " · " + i.note : ""}</div><div class="s">≈ ${rub(cart.lineTotal(i))}</div>
        <small>${rub(i.pricePerKg)}/кг · ≈ ${kg(i.approxKg * i.qty)}</small><span></span>
        <div class="mini"><button data-q="${i.key}|-1">−</button><span>${i.qty}</span><button data-q="${i.key}|1">+</button></div>
        <button class="rm" data-rm="${i.key}">убрать</button></div>`).join("") + `
      <div class="cform">
        <div class="seg"><button data-dl="Самовывоз из Ворыпаево" class="${form.delivery.startsWith("Само") ? "on" : ""}">Самовывоз</button><button data-dl="Доставка (обсудить)" class="${form.delivery.startsWith("Дост") ? "on" : ""}">Доставка</button></div>
        <label>Ваше имя<input data-f="name" value="${form.name}" placeholder="Как к вам обращаться" autocomplete="given-name"></label>
        <label>Когда удобно забрать<input data-f="date" type="date" value="${form.date}"></label>
      </div>`;
  }
  function cartFoot() {
    if (!cart.items.length) return "";
    return `<div class="ctot"><span>Итого примерно</span><b>≈ ${rub(cart.total)}</b></div>
      <div class="cnote">Точную сумму назовём после взвешивания. Оплата при получении.</div>
      <button class="wa" data-send>${ICON_WA} Отправить заказ в WhatsApp</button>`;
  }
  function renderCart() {
    $$("[data-cart-list]").forEach((el) => (el.innerHTML = cartList()));
    $$("[data-cart-foot]").forEach((el) => { el.innerHTML = cartFoot(); el.style.display = cart.items.length ? "" : "none"; });
    $$("[data-count]").forEach((el) => (el.textContent = cart.count));
    $$("[data-count-text]").forEach((el) => (el.textContent = cart.count ? `${cart.count} поз. · ≈ ${kg(cart.totalKg)}` : "пусто"));
    $$("[data-total]").forEach((el) => (el.textContent = cart.count ? "≈ " + rub(cart.total) : "0 ₽"));
  }
  cart.subscribe(() => { renderCart(); rerender(); });

  const drawer = $("#drawer"), ovl = $("#ovl");
  const lock = (on) => document.body.classList.toggle("lock", on);
  const openCart = () => { drawer.classList.add("open"); ovl.classList.add("open"); lock(true); };
  const closeAll = () => { drawer.classList.remove("open"); ovl.classList.remove("open"); $("#mnav").classList.remove("open"); $("#schema").classList.remove("open"); lock(false); };
  let tt;
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 1500); };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a"); if (!t) { if (e.target === ovl || e.target.id === "schema") closeAll(); return; }
    const d = t.dataset;
    if (d.openCart !== undefined) return openCart();
    if (d.closeCart !== undefined || d.closeNav !== undefined || d.closeSchema !== undefined) closeAll();
    if (d.openNav !== undefined) { $("#mnav").classList.add("open"); lock(true); }
    if (d.openSchema !== undefined) { $("#schema").classList.add("open"); lock(true); }
    if (d.opt) { const [id, o] = d.opt.split("|"); optSel[id] = o; rerender(); }
    const prod = (id) => PRODUCTS.find((x) => x.id === id);
    if (d.add) { const p = prod(d.add); cart.add({ key: keyOf(p), title: p.title, note: p.options ? optSel[p.id] || p.options[0] : null, pricePerKg: p.pricePerKg, approxKg: p.approxKg, unit: p.unit }); toast("✓ Добавлено в корзину"); }
    if (d.inc) { const it = cart.items.find((i) => i.key === keyOf(prod(d.inc))); cart.setQty(it.key, it.qty + 1); }
    if (d.dec) { const it = cart.items.find((i) => i.key === keyOf(prod(d.dec))); cart.setQty(it.key, it.qty - 1); }
    if (d.q) { const [k, n] = d.q.split("|"); const it = cart.items.find((i) => i.key === k); cart.setQty(k, it.qty + Number(n)); }
    if (d.rm) cart.remove(d.rm);
    if (d.dl) { form.delivery = d.dl; renderCart(); }
    if (d.send !== undefined) window.open(cart.whatsappUrl(form), "_blank");
  });
  document.addEventListener("input", (e) => { const f = e.target.dataset.f; if (f) form[f] = e.target.value; });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeAll());

  const dd = $("#dd");
  dd.querySelector("button").addEventListener("click", (e) => { e.stopPropagation(); dd.classList.toggle("open"); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#dd button")) dd.classList.remove("open"); });

  window.V5 = { cart, card, onRender, $, $$, rub, kg };
})();
