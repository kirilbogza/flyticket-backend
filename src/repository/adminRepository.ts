import { getPool } from '../db';
import bcrypt from 'bcrypt';

export interface Admin {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
}

export async function findAdminByEmail(email: string): Promise<Admin | null> {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export async function createAdmin(email: string, password: string): Promise<Admin> {
  const pool = getPool();
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);
  const result = await pool.query(
    'INSERT INTO admins (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
    [email, password_hash, 'admin']
  );
  return result.rows[0];
}
