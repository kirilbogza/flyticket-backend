// .d stand for = TypeScript declaration file = types only, to make it clear that no runtime logic is involved etc.
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool;
  }
}