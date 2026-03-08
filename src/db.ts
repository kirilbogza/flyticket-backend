import { Pool } from 'pg';

let pool: Pool | null = null;

export async function connectDB(): Promise<Pool> {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is not set');

  pool = new Pool({ connectionString: databaseUrl });

  await pool.query('SELECT 1');
  console.log('Connected to db!');

  return pool;
}

export function getPool(): Pool {
  if (!pool) throw new Error('Database is not connected, call connectDB');
  return pool;
}
