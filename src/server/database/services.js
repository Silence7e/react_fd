import * as sql from './sql';

async function excuteSql(pool, sql) {
  return new Promise(function(resolve, reject) {
      pool.query(sql, function(error, result){
          if (error) {
              reject(error);
          }
          else {
              resolve(result);
          }
      })
  });
}

export async function addToken(pool, hash) {
  try {
      return await excuteSql(pool, sql.addToken(hash));
  } catch(error){
      console.log(error);
      throw error;
  }
}

export async function deleteToken(pool, hash) {
  try {
      return await excuteSql(pool, sql.deleteToken(hash));
  } catch(error){
      console.log(error);
  }
}

export async function getToken(pool, hash) {
  try {
      return await excuteSql(pool, sql.getToken(hash));
  } catch(error){
      console.log(error);
  }
}

export async function getAllLocales(pool) {
  try {
      return await excuteSql(pool, sql.getAllLocales());
  } catch(error){
      console.log(error);
  }
}

async function setLocale(pool, key, value) {
  try {
      const locale = await excuteSql(pool, sql.getLocale(key));
      if (locale && locale.rows.length > 0) {
          await excuteSql(pool, sql.updateLocale(key, value));
      }
      else {
          await excuteSql(pool, sql.addLocale(key, value));
      }
  } catch(error){
      console.log(error);
  }
}

async function setLocales(pool, locales) {
  try {
      for (let [key, value] of Object.entries(locales)) {
          await setLocale(pool, key, value);
      }
  } catch(error){
      console.log(error);
  }
}

export async function getAllToggles(pool) {
  try {
      return await excuteSql(pool, sql.getAllToggles());
  } catch(error){
      console.log(error);
  }
}

async function setToggle(pool, key, value) {
  try {
      const locale = await excuteSql(pool, sql.getToggle(key));
      if (locale && locale.rows.length > 0) {
          await excuteSql(pool, sql.updateToggle(key, value));
      }
      else {
          await excuteSql(pool, sql.addToggle(key, value));
      }
  } catch(error){
      console.log(error);
  }
}

async function setToggles(pool, locales) {
  try {
      for (let [key, value] of Object.entries(locales)) {
          await setToggle(pool, key, value);
      }
  } catch(error){
      console.log(error);
  }
}

export async function getAllImages(pool) {
  try {
      return await excuteSql(pool, sql.getAllImages());
  } catch(error){
      console.log(error);
  }
}

async function setImage(pool, key, value) {
  try {
      const locale = await excuteSql(pool, sql.getImage(key));
      if (locale && locale.rows.length > 0) {
          await excuteSql(pool, sql.updateImage(key, value));
      }
      else {
          await excuteSql(pool, sql.addImage(key, value));
      }
  } catch(error){
      console.log(error);
  }
}

async function setImages(pool, locales) {
  try {
      for (let [key, value] of Object.entries(locales)) {
          await setImage(pool, key, value);
      }
  } catch(error){
      console.log(error);
  }
}

export async function getAllHtmls(pool) {
  try {
      return await excuteSql(pool, sql.getAllHtmls());
  } catch(error){
      console.log(error);
  }
}

async function setHtml(pool, key, value) {
  try {
      const locale = await excuteSql(pool, sql.getHtml(key));
      if (locale && locale.rows.length > 0) {
          await excuteSql(pool, sql.updateHtml(key, value));
      }
      else {
          await excuteSql(pool, sql.addHtml(key, value));
      }
  } catch(error){
      console.log(error);
  }
}

async function setHtmls(pool, locales) {
  try {
      for (let [key, value] of Object.entries(locales)) {
          await setHtml(pool, key, value);
      }
  } catch(error){
      console.log(error);
  }
}

export default {
  addToken,
  deleteToken,
  getToken,
  getAllLocales,
  setLocale,
  setLocales,
  getAllToggles,
  setToggle,
  setToggles,
  getAllImages,
  setImage,
  setImages,
  getAllHtmls,
  setHtml,
  setHtmls
}
