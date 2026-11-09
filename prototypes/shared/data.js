// Общие данные для всех прототипов.
// ВНИМАНИЕ: цены частей и наборов — примерные, для макета. Уточнить у фермы.

window.FARM = {
  phone: "+7 (962) 951-74-00",
  whatsapp: "79629517400",
  address: "Московская обл., г.о. Подольск, д. Ворыпаево",
  coords: [55.4796061, 37.6631334],
  mapUrl: "https://yandex.ru/maps/?pt=37.6631334,55.4796061&z=15&l=map",
};

window.CATEGORIES = [
  { id: "lamb", title: "Баранина", hint: "Тушей и частями" },
  { id: "beef", title: "Говядина", hint: "Четверти и части" },
  { id: "live", title: "Живой скот", hint: "Бараны и овцы" },
  { id: "sets", title: "Наборы", hint: "На плов и шашлык" },
];

// approxKg — ориентировочный вес одной единицы; итог считается «примерно».
window.PRODUCTS = [
  { id: "lamb-whole", cat: "lamb", title: "Баранья туша целиком", short: "Молодой баран, вес туши 18–25 кг. Разрубим по вашему желанию.", pricePerKg: 800, approxKg: 20, unit: "туша", badge: "Хит" },
  { id: "lamb-half", cat: "lamb", title: "Половина туши", short: "Передняя и задняя часть, около 10 кг.", pricePerKg: 800, approxKg: 10, unit: "половина" },
  { id: "lamb-quarter", cat: "lamb", title: "Четверть туши", short: "Передняя (лопатка, рёбра) или задняя (окорок), около 5 кг.", pricePerKg: 820, approxKg: 5, unit: "четверть", options: ["Передняя", "Задняя"] },
  { id: "beef-front", cat: "beef", title: "Говядина, передняя четверть", short: "Лопатка, шея, грудинка, рёбра. Около 45 кг.", pricePerKg: 650, approxKg: 45, unit: "четверть" },
  { id: "beef-back", cat: "beef", title: "Говядина, задняя четверть", short: "Тазобедренная часть, толстый и тонкий край. Около 50 кг.", pricePerKg: 750, approxKg: 50, unit: "четверть" },
  { id: "beef-part", cat: "beef", title: "Говядина частями от 5 кг", short: "Соберём нужные части под ваш заказ.", pricePerKg: 700, approxKg: 5, unit: "5 кг" },
  { id: "live-ram", cat: "live", title: "Баран живым весом", short: "Живой вес 40–60 кг. Самовывоз с фермы.", pricePerKg: 400, approxKg: 45, unit: "голова", badge: "К празднику" },
  { id: "live-ewe", cat: "live", title: "Овца живым весом", short: "Живой вес 35–50 кг. Наличие уточняйте.", pricePerKg: 400, approxKg: 40, unit: "голова" },
  { id: "set-plov", cat: "sets", title: "Набор «На плов»", short: "Лопатка и рёбра, порублено. 3 кг.", pricePerKg: 850, approxKg: 3, unit: "набор" },
  { id: "set-kebab", cat: "sets", title: "Набор «На шашлык»", short: "Окорок и корейка, нарезано кусками. 3 кг.", pricePerKg: 900, approxKg: 3, unit: "набор" },
];

// Для прототипа «Разделка»: части туши (цены — примерные).
window.CUTS = {
  lamb: [
    { id: "neck", title: "Шея", pricePerKg: 700, use: "Шурпа, тушение, плов", approxKg: 1.5 },
    { id: "shoulder", title: "Лопатка", pricePerKg: 850, use: "Плов, запекание целиком", approxKg: 2.5 },
    { id: "rack", title: "Корейка", pricePerKg: 1100, use: "Каре на гриле, шашлык", approxKg: 2 },
    { id: "breast", title: "Грудинка и рёбра", pricePerKg: 750, use: "Рёбра на углях, суп", approxKg: 2 },
    { id: "leg", title: "Окорок", pricePerKg: 950, use: "Шашлык, запечённая нога", approxKg: 3 },
    { id: "shank", title: "Голяшка", pricePerKg: 700, use: "Томление, суп", approxKg: 1 },
  ],
  beef: [
    { id: "neck", title: "Шея", pricePerKg: 600, use: "Фарш, тушение, бульон", approxKg: 3 },
    { id: "shoulder", title: "Лопатка", pricePerKg: 680, use: "Гуляш, тушение", approxKg: 4 },
    { id: "rack", title: "Толстый край", pricePerKg: 950, use: "Стейки рибай", approxKg: 3 },
    { id: "loin", title: "Тонкий край", pricePerKg: 1000, use: "Стейки стриплойн", approxKg: 3 },
    { id: "breast", title: "Грудинка", pricePerKg: 600, use: "Бульон, копчение", approxKg: 3 },
    { id: "leg", title: "Задняя часть", pricePerKg: 780, use: "Запекание, бифштексы", approxKg: 5 },
    { id: "shank", title: "Голяшка", pricePerKg: 550, use: "Холодец, оссобуко", approxKg: 2 },
  ],
};
