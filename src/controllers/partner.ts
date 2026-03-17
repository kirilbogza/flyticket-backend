import { FastifyRequest, FastifyReply } from 'fastify';
import * as partnerService from '../services/partnerService';
import { FlightSearchParams, CreateBookingInput } from '../types/booking';

export async function searchFlights(
  request: FastifyRequest<{ Querystring: FlightSearchParams }>,
  reply: FastifyReply
) {
  try {
    const { date, from, to } = request.query;
    if (!date || !from || !to) {
      return reply.status(400).send({ error: 'Missing either: date, from or to.' });
    }
    const flights = await partnerService.searchFlights({ date, from, to });
    reply.send(flights);
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
}

export async function createBooking(
  request: FastifyRequest<{ Body: CreateBookingInput }>,
  reply: FastifyReply
) {
  try {
    const partner = request.partner;
    if (!partner) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    const booking = await partnerService.createBooking(request.body, partner.id);
    reply.status(201).send(booking);
  } catch (err: any) {
    const status = err.message.includes('Only') || err.message.includes('not found') ? 400 : 500;
    reply.status(status).send({ error: err.message });
  }
}
