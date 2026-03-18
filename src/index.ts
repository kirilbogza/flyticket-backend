import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import auth from './auth';               
import adminRoutes from './routes/admin';
import partnerRoutes from './routes/partner';
import publicRoutes from './routes/public';
import { connectDB, getPool } from './db';
import { fetchApiKeys } from './caches/apiKeys';
import oauthRoutes from './routes/oauth';

//dotenv.config() Dont need it anymore! Detailed info on bug in git:

const server: FastifyInstance = fastify({ logger: true });
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function start() {
  try {
    await connectDB();
    await fetchApiKeys();
    const pool = getPool();

    // decorate with pg pool
    server.decorate('pg', pool);

    server.addHook('onClose', async () => {
      await pool.end();
    });

    await server.register(cors, {});
    await server.register(helmet, {});
    await server.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute'
    });

    await server.register(auth);

    await server.register(publicRoutes);   //health check 🟢
    await server.register(adminRoutes, { prefix: '/admin' });
    await server.register(partnerRoutes, { prefix: '/partner' });
    await server.register(oauthRoutes);

    await server.listen({ host: '0.0.0.0', port });
    console.log(`listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
