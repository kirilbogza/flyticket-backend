import { FastifyRequest, FastifyReply } from 'fastify';

export async function createFlight(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'createFlight placeholder' });
}

export async function updateFlight(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'updateFlight placeholder' });
}

export async function cancelFlight(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'cancelFlight placeholder' });
}
