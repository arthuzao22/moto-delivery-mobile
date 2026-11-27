'use strict';
// Ponte CommonJS: ver a descrição no package.json. Sem lógica própria, só reexporta a função.
const modulo = require('decode-uri-component-esm');

module.exports = typeof modulo === 'function' ? modulo : modulo.default;
