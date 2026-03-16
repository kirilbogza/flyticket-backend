import { getPool } from '../db';
import { Partner } from '../types/partner';

const partnersByApiKey: Record<string, { id: number; name: string }> = {};

export async function fetchApiKeys() {
  const pool = getPool();
  const result = await pool.query('SELECT id, name, api_key FROM partners');
  for (const row of result.rows) {
    partnersByApiKey[row.api_key] = { id: row.id, name: row.name };
  }
}

export function getPartnerByApiKey(key: string): { id: number; name: string } | null {
  return partnersByApiKey[key] || null;
}

export function addPartnerToCache(partner: { id: number; name: string; api_key: string }) {
  partnersByApiKey[partner.api_key] = { id: partner.id, name: partner.name };
}
