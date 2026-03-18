import * as adminRepository from '../repository/adminRepository';
import bcrypt from 'bcrypt';

export async function registerAdmin(email: string, password: string) {
  const existing = await adminRepository.findAdminByEmail(email);
  if (existing) {
    throw new Error('Admin already exists');
  }
  return await adminRepository.createAdmin(email, password);
}

export async function loginAdmin(email: string, password: string) {
  const admin = await adminRepository.findAdminByEmail(email);
  if (!admin) {
    throw new Error('Invalid email or password');
  }
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    throw new Error('Invalid email or password');
  }
  return admin;
}
