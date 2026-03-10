import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticateAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    authenticatePartner(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

export interface AdminTokenPayload {
  id: number;
  email: string;
  role: 'admin';
  type: 'access' | 'refresh';
}

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) throw new Error('JWT_SECRET_KEY must be set');

async function auth(server: FastifyInstance) {
  await server.register(fastifyJwt, {
    secret: secretKey,
    sign: { expiresIn: '1d' }
  });

  server.decorate(
    'authenticateAdmin',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const decoded = await request.jwtVerify<AdminTokenPayload>();
        if (decoded.role !== 'admin' || decoded.type !== 'access') {
          return reply.status(403).send({ error: 'Forbidden: Admin access required' });
        }
        request.user = decoded;
      } catch (err) {
        reply.status(401).send({ error: 'Unauthorized: Invalid or missing token' });
      }
    }
  );

  server.decorate(
    'authenticatePartner',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const apiKey = request.headers['x-api-key'];
      if (!apiKey || typeof apiKey !== 'string') {
        return reply.status(401).send({ error: 'API key required' });
      }

      try {
        const result = await server.pg.query(
          'SELECT id, name FROM partners WHERE api_key = $1',
          [apiKey]
        );
        if (result.rows.length === 0) {
          return reply.status(403).send({ error: 'Invalid API key' });
        }
        request.partner = result.rows[0];
      } catch (err) {
        server.log.error(err);
        reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );
}

export default fastifyPlugin(auth);
