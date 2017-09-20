function SQL(parts, ...values) {
  return {
      text: parts.reduce((prev, curr, i) => prev+"$"+i+curr),
      values
  };
}

export function addToken(hash) {
  return SQL`INSERT INTO t_token (hash) VALUES (${hash});`;
}

export function deleteToken(hash) {
  return SQL`DELETE FROM t_token where hash=${hash};`
}

export function getToken(hash) {
  return SQL`SELECT * FROM t_token WHERE hash=${hash};`
}

export function getAllLocales() {
  return SQL`SELECT * FROM t_locale`;
}

export function getLocale(key) {
  return SQL`SELECT * FROM t_locale WHERE key=${key}`;
}

export function addLocale(key, value) {
  return SQL`INSERT INTO t_locale (key, value) VALUES (${key}, ${value});`;
}

export function updateLocale(key, value) {
  return SQL`UPDATE t_locale SET value=${value} WHERE key=${key};`;
}

export function getAllToggles() {
  return SQL`SELECT * FROM t_toggle`;
}

export function getToggle(key) {
  return SQL`SELECT * FROM t_toggle WHERE key=${key}`;
}

export function addToggle(key, value) {
  return SQL`INSERT INTO t_toggle (key, value) VALUES (${key}, ${value});`;
}

export function updateToggle(key, value) {
  return SQL`UPDATE t_toggle SET value=${value} WHERE key=${key};`;
}

export function getAllImages() {
  return SQL`SELECT * FROM t_image`;
}

export function getImage(key) {
  return SQL`SELECT * FROM t_image WHERE key=${key}`;
}

export function addImage(key, value) {
  return SQL`INSERT INTO t_image (key, value) VALUES (${key}, ${value});`;
}

export function updateImage(key, value) {
  return SQL`UPDATE t_image SET value=${value} WHERE key=${key};`;
}

export function getAllHtmls() {
  return SQL`SELECT * FROM t_html`;
}

export function getHtml(key) {
  return SQL`SELECT * FROM t_html WHERE key=${key}`;
}

export function addHtml(key, value) {
  return SQL`INSERT INTO t_html (key, value) VALUES (${key}, ${value});`;
}

export function updateHtml(key, value) {
  return SQL`UPDATE t_html SET value=${value} WHERE key=${key};`;
}

