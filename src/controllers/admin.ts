import { FastifyRequest, FastifyReply } from 'fastify';
import * as flightService from '../services/flightService';
import { CreateFlightInput, UpdateFlightInput } from '../types/flight';

export async function createFlight(
  request: FastifyRequest<{ Body: CreateFlightInput }>,
  reply: FastifyReply
) {
  try {
    const flight = await flightService.createFlight(request.body);
    reply.status(201).send(flight);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}

export async function getFlights(request: FastifyRequest, reply: FastifyReply) {
  try {
    const flights = await flightService.getAllFlights();
    reply.send(flights);
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
}

export async function getFlightById(
  request: FastifyRequest<{ Params: { flightId: string } }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.flightId);
    const flight = await flightService.getFlightById(id);
    if (!flight) {
      return reply.status(404).send({ error: 'Flight not found' });
    }
    reply.send(flight);
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
}

export async function updateFlight(
  request: FastifyRequest<{ Params: { flightId: string }; Body: UpdateFlightInput }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.flightId);
    const flight = await flightService.updateFlight(id, request.body);
    reply.send(flight);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}

export async function cancelFlight(
  request: FastifyRequest<{ Params: { flightId: string } }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.flightId);
    const flight = await flightService.cancelFlight(id);
    reply.send(flight);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}
