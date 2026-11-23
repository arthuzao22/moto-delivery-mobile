// Gera assets/sons/oferta.wav: o alerta próprio da oferta (documento 01 §5), sintetizado aqui para
// não depender de áudio de terceiros. Três notas agudas subindo, duas vezes, com timbre metálico:
// entre 1 e 3 kHz o alto-falante do celular soa mais alto e o som atravessa barulho de rua.
// Rode com: node scripts/gerar-som-da-oferta.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const TAXA = 44_100;
const AMPLITUDE = 0.95;
const NOTAS_HZ = [1318.5, 1568.0, 2093.0]; // mi, sol e dó agudos
const NOTA_S = 0.13;
const PAUSA_ENTRE_NOTAS_S = 0.03;
const PAUSA_ENTRE_GRUPOS_S = 0.18;
const GRUPOS = 2;
const HARMONICOS = [
  [1, 1],
  [2, 0.35],
  [3, 0.5],
  [5, 0.2],
];

function nota(frequencia) {
  const total = Math.round(NOTA_S * TAXA);
  const ataque = Math.round(0.004 * TAXA);
  return Array.from({ length: total }, (_, i) => {
    const t = i / TAXA;
    const envelope = Math.min(1, i / ataque) * Math.exp(-t * 9);
    const onda = HARMONICOS.reduce(
      (soma, [n, peso]) => soma + peso * Math.sin(2 * Math.PI * frequencia * n * t),
      0,
    );
    return onda * envelope;
  });
}

const silencio = (segundos) => new Array(Math.round(segundos * TAXA)).fill(0);

const amostras = [];
for (let grupo = 0; grupo < GRUPOS; grupo += 1) {
  for (const frequencia of NOTAS_HZ) amostras.push(...nota(frequencia), ...silencio(PAUSA_ENTRE_NOTAS_S));
  amostras.push(...silencio(PAUSA_ENTRE_GRUPOS_S));
}

const pico = Math.max(...amostras.map(Math.abs));
const pcm = Buffer.alloc(amostras.length * 2);
amostras.forEach((valor, i) => pcm.writeInt16LE(Math.round((valor / pico) * AMPLITUDE * 32_767), i * 2));

const cabecalho = Buffer.alloc(44);
cabecalho.write('RIFF', 0);
cabecalho.writeUInt32LE(36 + pcm.length, 4);
cabecalho.write('WAVE', 8);
cabecalho.write('fmt ', 12);
cabecalho.writeUInt32LE(16, 16);
cabecalho.writeUInt16LE(1, 20); // PCM
cabecalho.writeUInt16LE(1, 22); // mono
cabecalho.writeUInt32LE(TAXA, 24);
cabecalho.writeUInt32LE(TAXA * 2, 28);
cabecalho.writeUInt16LE(2, 32);
cabecalho.writeUInt16LE(16, 34);
cabecalho.write('data', 36);
cabecalho.writeUInt32LE(pcm.length, 40);

mkdirSync('assets/sons', { recursive: true });
writeFileSync('assets/sons/oferta.wav', Buffer.concat([cabecalho, pcm]));
console.log(
  `assets/sons/oferta.wav: ${(amostras.length / TAXA).toFixed(2)} s, ${amostras.length * 2 + 44} bytes`,
);
