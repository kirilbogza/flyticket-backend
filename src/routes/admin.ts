import { FastifyInstance } from 'fastify';
import * as adminController from '../controllers/admin';

export default async function adminRoutes(server: FastifyInstance) {
  // Public routes (no auth)
  server.route({
    method: 'POST',
    url: '/register',
    handler: adminController.registerAdmin
  });

  server.route({
    method: 'POST',
    url: '/login',
    handler: adminController.loginAdmin
  });

  server.route({
    method: 'POST',
    url: '/refresh',
    handler: adminController.refreshToken
  });

  // Protected routes (with preHandler)
  const protectedHandler = { preHandler: [server.authenticateAdmin] };

  server.route({
    method: 'POST',
    url: '/partners',
    ...protectedHandler,
    handler: adminController.createPartner
  });

  server.route({
    method: 'GET',
    url: '/partners',
    ...protectedHandler,
    handler: adminController.getPartners
  });

  server.route({
    method: 'GET',
    url: '/partners/:partnerId',
    ...protectedHandler,
    handler: adminController.getPartnerById
  });

  server.route({
    method: 'PUT',
    url: '/partners/:partnerId',
    ...protectedHandler,
    handler: adminController.updatePartner
  });

  server.route({
    method: 'DELETE',
    url: '/partners/:partnerId',
    ...protectedHandler,
    handler: adminController.deletePartner
  });

  server.route({
    method: 'POST',
    url: '/flights',
    ...protectedHandler,
    handler: adminController.createFlight
  });

  server.route({
    method: 'GET',
    url: '/flights',
    ...protectedHandler,
    handler: adminController.getFlights
  });

  server.route({
    method: 'GET',
    url: '/flights/:flightId',
    ...protectedHandler,
    handler: adminController.getFlightById
  });

  server.route({
    method: 'PUT',
    url: '/flights/:flightId',
    ...protectedHandler,
    handler: adminController.updateFlight
  });

  server.route({
    method: 'DELETE',
    url: '/flights/:flightId',
    ...protectedHandler,
    handler: adminController.cancelFlight
  });
}
