import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as adminController from '../controllers/admin';

export default async function adminRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.addHook('preHandler', server.authenticateAdmin);
  server.post('/flights', adminController.createFlight);
  server.put('/flights/:flightId', adminController.updateFlight);
  server.delete('/flights/:flightId', adminController.cancelFlight);
}
