import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as adminController from '../controllers/admin';

export default async function adminRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  //if only admin is authenticated you will get access to routes.
  server.addHook('preHandler', server.authenticateAdmin);

  // createPartner
  server.post('/flights', adminController.createFlight);
  server.get('/flights', adminController.getFlights);
  server.get('/flights/:flightId', adminController.getFlightById);
  server.put('/flights/:flightId', adminController.updateFlight);
  server.delete('/flights/:flightId', adminController.cancelFlight);
}
