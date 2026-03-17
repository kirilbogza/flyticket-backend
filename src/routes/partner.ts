import { FastifyInstance } from "fastify";
import * as partnerController from "../controllers/partner";

export default async function partnerRoutes(server: FastifyInstance) {
  server.addHook("preHandler", server.authenticatePartner);
  
  server.get("/flights", partnerController.searchFlights);
  server.post("/bookings", partnerController.createBooking);
}
