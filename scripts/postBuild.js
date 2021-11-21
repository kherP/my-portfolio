import { writeFileSync } from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

writeFileSync(`${pkg.config.outputFolder}/.nojekyll`, ``);
