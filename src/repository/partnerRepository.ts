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
  const result = await pool.query('SELECT id, name, api_key FROM partners');
  return result.rows;
}
