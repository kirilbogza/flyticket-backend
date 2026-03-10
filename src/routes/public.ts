import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function publicRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get('/health', async (request, reply) => {
    reply.send({ status: 'ok', timestamp: new Date().toISOString() });
  });
}