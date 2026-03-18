import { getPool } from '../db';
import { Partner } from '../types/partner';

export async function createPartner(data: { name: string; api_key: string }): Promise<Partner> {
  const pool = getPool();
  const result = await pool.query(
    'INSERT INTO partners (name, api_key) VALUES ($1, $2) RETURNING *',
    [data.name, data.api_key]
  );
  return result.rows[0];
}

export async function getAllPartners(): Promise<Partner[]> {
  const pool = getPool();
  const result = await pool.query('SELECT id, name, api_key FROM partners ORDER BY id');
  return result.rows;
}

export async function getPartnerById(id: number): Promise<Partner | null> {
  const pool = getPool();
  const result = await pool.query('SELECT id, name, api_key FROM partners WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function updatePartner(id: number, name?: string, api_key?: string): Promise<Partner | null> {
  const pool = getPool();
  const fields = [];
  const values = [];
  let idx = 1;
  if (name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(name);
  }
  if (api_key !== undefined) {
    fields.push(`api_key = $${idx++}`);
    values.push(api_key);
  }
  if (fields.length === 0) return getPartnerById(id);
  values.push(id);
  const query = `UPDATE partners SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function deletePartner(id: number): Promise<boolean> {
  const pool = getPool();
  const result = await pool.query('DELETE FROM partners WHERE id = $1 RETURNING id', [id]);
  return result.rowCount !== null && result.rowCount > 0;
}
