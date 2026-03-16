import * as partnerRepository from '../repository/partnerRepository';
import { addPartnerToCache } from '../caches/apyKeys';

export async function createPartner(data: { name: string; api_key: string }) {
  if (!data.name || !data.api_key) {
    throw new Error('Name and API key are required');
  }
  const partner = await partnerRepository.createPartner(data);
  addPartnerToCache(partner);
  return partner;
}
