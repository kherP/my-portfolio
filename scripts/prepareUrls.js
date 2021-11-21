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

Object.keys(data.files).map((key) => {
  fileEndpoints[key.split(".")[0]] = data.files[key].raw_url;
});

try {
  writeFileSync(pkg.config.endpointsIndexPath, `export const endpoints = ${JSON.stringify(fileEndpoints)}`);
  //file written successfully
} catch (err) {
  console.error(err)
}
// console.log(fileEndpoints)
