import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import * as adminController from '../controllers/admin';

export default async function adminRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Public routes (no auth)
  server.post('/register', adminController.registerAdmin);
  server.post('/login', adminController.loginAdmin);
  
  //if only admin is authenticated you will get access to routes.
  server.addHook('preHandler', server.authenticateAdmin);

  server.post('/partners', adminController.createPartner); 
  server.post('/flights', adminController.createFlight);
  server.get('/flights', adminController.getFlights);
  server.get('/flights/:flightId', adminController.getFlightById);
  server.put('/flights/:flightId', adminController.updateFlight);
  server.delete('/flights/:flightId', adminController.cancelFlight);

  server.get('/partners', adminController.getPartners);
  server.get('/partners/:partnerId', adminController.getPartnerById);
  server.put('/partners/:partnerId', adminController.updatePartner);
  server.delete('/partners/:partnerId', adminController.deletePartner);
}
