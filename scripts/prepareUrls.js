#!/usr/bin/env node
import fetch from 'node-fetch';
import { writeFileSync } from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const headers = {
  "Accept": "application/vnd.github.v3+json",
  "Authorization": 'Basic ' + '#{token}#',
};

const res = await fetch(pkg.config.rootUrl, { headers });
const data = await res.json();

const fileEndpoints = {};
const dynamicRoutes = [];

Object.keys(data.files).map((key) => {
  const route = key.split(".")[0];
  fileEndpoints[route] = data.files[key].raw_url;
  if (pkg.config.staticRoutes.indexOf(route) === -1) {
    dynamicRoutes.push(`${pkg.config.dynamicRoutePrefix}${route}`);
  }
});

try {
  writeFileSync(pkg.config.endpointsIndexPath, `export const endpoints = ${JSON.stringify(fileEndpoints)};`);
  writeFileSync(pkg.config.dynamicEndpointsIndexPath, `exports.endpoints = ${JSON.stringify(dynamicRoutes)};`);
  //file written successfully
} catch (err) {
  console.error(err)
}
