import { AdminTokenPayload } from '../auth';

declare module 'fastify' {
  interface FastifyRequest {
    user?: AdminTokenPayload;
    partner?: { id: number; name: string };
  }
}