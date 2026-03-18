import { FastifyRequest, FastifyReply } from 'fastify';
import * as flightService from '../services/flightService';
import { CreateFlightInput, UpdateFlightInput } from '../types/flight';
import * as partnerService from '../services/partnerService';
import * as adminService from '../services/adminService';

export async function createPartner(
  request: FastifyRequest<{ Body: { name: string; api_key: string } }>,
  reply: FastifyReply
) {
  try {
    const partner = await partnerService.createPartner(request.body);
    reply.status(201).send(partner);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}

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

export async function registerAdmin(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  try {
    const admin = await adminService.registerAdmin(request.body.email, request.body.password);
    reply.status(201).send({ id: admin.id, email: admin.email });
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}

export async function loginAdmin(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  try {
    const admin = await adminService.loginAdmin(request.body.email, request.body.password);
    
    const token = await reply.jwtSign({
      id: admin.id,
      email: admin.email,
      role: 'admin',
      type: 'access'
    }, { expiresIn: '1d' });

    reply.send({
      access_token: token,
      admin: { id: admin.id, email: admin.email }
    });
  } catch (err: any) {
    reply.status(401).send({ error: err.message });
  }
}

export async function getPartners(request: FastifyRequest, reply: FastifyReply) {
  try {
    const partners = await partnerService.getAllPartners();
    reply.send(partners);
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
}

export async function getPartnerById(
  request: FastifyRequest<{ Params: { partnerId: string } }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.partnerId);
    const partner = await partnerService.getPartnerById(id);
    reply.send(partner);
  } catch (err: any) {
    reply.status(404).send({ error: err.message });
  }
}

export async function updatePartner(
  request: FastifyRequest<{ Params: { partnerId: string }; Body: { name?: string; api_key?: string } }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.partnerId);
    const partner = await partnerService.updatePartner(id, request.body);
    reply.send(partner);
  } catch (err: any) {
    reply.status(400).send({ error: err.message });
  }
}

export async function deletePartner(
  request: FastifyRequest<{ Params: { partnerId: string } }>,
  reply: FastifyReply
) {
  try {
    const id = parseInt(request.params.partnerId);
    const result = await partnerService.deletePartner(id);
    reply.send(result);
  } catch (err: any) {
    reply.status(404).send({ error: err.message });
  }
}
