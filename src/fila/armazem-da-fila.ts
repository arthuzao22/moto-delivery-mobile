import * as SQLite from 'expo-sqlite';
import type { AcaoNaFila } from './regras';

/**
 * A fila de ações de campo no SQLite (documento 04 §6: ordem garantida e reenvio parcial).
 * Sobrevive ao app fechado e ao celular reiniciado.
 */
let banco: SQLite.SQLiteDatabase | null = null;

async function abrir(): Promise<SQLite.SQLiteDatabase> {
  if (banco !== null) return banco;
  const aberto = await SQLite.openDatabaseAsync('fila-de-acoes.db');
  await aberto.execAsync(`
    CREATE TABLE IF NOT EXISTS acoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chave TEXT NOT NULL UNIQUE,
      caminho TEXT NOT NULL,
      corpo TEXT NOT NULL,
      grupo TEXT NOT NULL,
      descricao TEXT NOT NULL
    );
  `);
  banco = aberto;
  return aberto;
}

export type NovaAcao = Omit<AcaoNaFila, 'id'>;

export async function guardar(acao: NovaAcao): Promise<number> {
  const db = await abrir();
  const resultado = await db.runAsync(
    'INSERT INTO acoes (chave, caminho, corpo, grupo, descricao) VALUES (?, ?, ?, ?, ?)',
    [acao.chave, acao.caminho, acao.corpo, acao.grupo, acao.descricao],
  );
  return resultado.lastInsertRowId;
}

/** As ações na ordem em que foram tocadas. */
export async function pendentes(): Promise<AcaoNaFila[]> {
  const db = await abrir();
  return db.getAllAsync<AcaoNaFila>(
    'SELECT id, chave, caminho, corpo, grupo, descricao FROM acoes ORDER BY id',
  );
}

export async function remover(ids: readonly number[]): Promise<void> {
  if (ids.length === 0) return;
  const db = await abrir();
  await db.runAsync(`DELETE FROM acoes WHERE id IN (${ids.map(() => '?').join(', ')})`, [...ids]);
}

/** Ao sair da conta: as ações pendentes são do motoboy que saiu e a API já não as aceitaria. */
export async function esvaziar(): Promise<void> {
  const db = await abrir();
  await db.runAsync('DELETE FROM acoes', []);
}
