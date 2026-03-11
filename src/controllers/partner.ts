import { FastifyRequest, FastifyReply } from 'fastify';

export async function searchFlights(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'searchFlights placeholder' });
}

export async function createBooking(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ message: 'createBooking placeholder' });
}
