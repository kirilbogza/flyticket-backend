import { FastifyInstance } from 'fastify';
import { token } from '../controllers/oauth';

export default async function oauthRoutes(server: FastifyInstance) {
  server.post('/oauth/token', token);
}
