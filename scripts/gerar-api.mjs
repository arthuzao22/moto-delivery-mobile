// Gera src/api/schema.d.ts a partir do contrato da API.
//
// O contrato traz alguns schemas com `$defs` locais (Zod 4 exporta valores JSON
// recursivos assim) e `$ref: "#/$defs/..."` relativo ao schema, não ao documento.
// O openapi-typescript resolve `$ref` a partir da raiz, então movemos cada `$defs`
// para `components.schemas` e reescrevemos as referências. O contrato não é alterado.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';

const origem = resolve(process.argv[2] ?? '../moto-delivery-api/contrato/openapi.json');
const destino = resolve('src/api/schema.d.ts');

function reescreverRefs(no, mapa) {
  if (Array.isArray(no)) {
    no.forEach((item) => reescreverRefs(item, mapa));
    return;
  }
  if (!no || typeof no !== 'object') return;
  if (typeof no.$ref === 'string' && mapa.has(no.$ref)) no.$ref = mapa.get(no.$ref);
  Object.values(no).forEach((valor) => reescreverRefs(valor, mapa));
}

function icarDefs(documento) {
  const schemas = ((documento.components ??= {}).schemas ??= {});
  let sequencia = 0;
  const visitar = (no) => {
    if (Array.isArray(no)) return no.forEach(visitar);
    if (!no || typeof no !== 'object') return;
    if (no.$defs && typeof no.$defs === 'object') {
      const mapa = new Map();
      for (const nome of Object.keys(no.$defs)) {
        const novoNome = `Def${sequencia++}_${nome.replace(/[^A-Za-z0-9]/g, '')}`;
        mapa.set(`#/$defs/${nome}`, `#/components/schemas/${novoNome}`);
        schemas[novoNome] = no.$defs[nome];
      }
      delete no.$defs;
      reescreverRefs(no, mapa);
      for (const [antigo, novo] of mapa)
        reescreverRefs(schemas[novo.split('/').pop()], new Map([[antigo, novo]]));
    }
    Object.values(no).forEach(visitar);
  };
  visitar(documento.paths);
}

const documento = JSON.parse(await readFile(origem, 'utf8'));
icarDefs(documento);
const ast = await openapiTS(documento);
const cabecalho =
  '// GERADO por `npm run gerar:api` a partir de moto-delivery-api/contrato/openapi.json. Não edite.\n';
await writeFile(destino, cabecalho + astToString(ast));
console.log(`schema.d.ts gerado em ${destino}`);
