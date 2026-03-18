import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getPartnerByApiKey, getPartnerById } from './caches/apiKeys';

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
    secret: secretKey!,
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
    
    // 1. Try Bearer token (OAuth2)
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const decoded = await request.jwtVerify() as any;
        if (decoded.scope !== 'partner') {
          return reply.status(403).send({ error: 'Forbidden: Invalid scope' });
        }
        
        // use cache
        const partner = getPartnerById(decoded.sub);
        
        if (!partner) {
          return reply.status(401).send({ error: 'Invalid token' });
        }
        request.partner = partner;
        return;
      } catch (err) {
        return reply.status(401).send({ error: 'Invalid token' });
      }
    }

    // 2. Fallback
    const apiKey = request.headers['x-api-key'];
    if (!apiKey || typeof apiKey !== 'string') {
      return reply.status(401).send({ error: 'Authentication required' });
    }

    const partner = getPartnerByApiKey(apiKey);
    if (!partner) {
      return reply.status(401).send({ error: 'Invalid API key' });
    }
    request.partner = partner;
  }
);

}

export default fastifyPlugin(auth);
