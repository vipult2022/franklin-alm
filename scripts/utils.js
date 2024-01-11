/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * by-vipult
 */

/**
 * Gets placeholders object
 * @param {string} prefix
 */
async function fetchData(fileName = 'default', objParam = {}) {
  const param = `?${new URLSearchParams(objParam).toString()}`;
  try {
    const response = await fetch(`/data/${fileName}.json${param}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error({ error });
  }

  return '';
}

async function fetchAlmData(url, type = 'GET', objParam = {}, data = {}) {
  const param = `?${new URLSearchParams(objParam).toString()}`;

  if (type === 'GET') {
    // Default options are marked with *
    const response = await fetch(`${url}${param}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        // 'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
        Authorization: 'Bearer 1e30c8adbe68eb30843f0c70c07f1c93',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json();
  }
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match 'Content-Type' header
  });
  return response.json();
}

export {
  fetchData,
  fetchAlmData,
};
