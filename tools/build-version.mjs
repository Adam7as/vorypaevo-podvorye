// Запускается Vercel при каждой публикации (см. buildCommand в vercel.json в корне репозитория).
// Записывает в site/js/version.js номер коммита, дату и автора — они показываются в подвале сайта.
// Vercel сам передаёт эти данные в переменных VERCEL_GIT_*. Локально их нет — файл не меняется.
import { writeFileSync } from "node:fs";

const e = process.env;
const sha = e.VERCEL_GIT_COMMIT_SHA;
if (!sha) {
  console.log("VERCEL_GIT_COMMIT_SHA не задан — номер версии не записан.");
  process.exit(0);
}

const date = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", dateStyle: "short", timeStyle: "short" }).format(new Date());
const repo = e.VERCEL_GIT_REPO_OWNER && e.VERCEL_GIT_REPO_SLUG ? `https://github.com/${e.VERCEL_GIT_REPO_OWNER}/${e.VERCEL_GIT_REPO_SLUG}` : null;
const version = {
  sha: sha.slice(0, 7),
  url: repo ? `${repo}/commit/${sha}` : "#",
  date,
  author: e.VERCEL_GIT_COMMIT_AUTHOR_NAME || e.VERCEL_GIT_COMMIT_AUTHOR_LOGIN || "—",
};

writeFileSync(new URL("../site/js/version.js", import.meta.url), `window.SITE_VERSION = ${JSON.stringify(version)};\n`);
console.log("Версия сайта:", version);
