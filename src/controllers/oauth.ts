import { FastifyRequest, FastifyReply } from 'fastify';
import { getPool } from '../db';

interface OAuthTokenBody {
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export async function token(
  request: FastifyRequest<{ Body: OAuthTokenBody }>,
  reply: FastifyReply
) {
  const { grant_type, client_id, client_secret } = request.body;

  if (grant_type !== 'client_credentials') {
    return reply.status(400).send({ error: 'unsupported_grant_type' });
  }

  const pool = getPool();
  
  const result = await pool.query(
    'SELECT id, name FROM partners WHERE api_key = $1',
    [client_secret]
  );

  if (result.rows.length === 0) {
    return reply.status(401).send({ error: 'invalid_client' });
  }

  const partner = result.rows[0];
  
  const accessToken = await reply.jwtSign({
    sub: partner.id,
    iss: 'flight-api',
    client_id: client_id,
    scope: 'partner'
  }, { expiresIn: '1h' });

  reply.send({
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600
  });
}
