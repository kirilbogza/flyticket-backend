import * as partnerRepository from '../repository/partnerRepository';
import * as flightRepository from '../repository/flightRepository';
import * as bookingRepository from '../repository/bookingRepository';
import { CreateBookingInput, FlightSearchParams } from '../types/booking';import { addPartnerToCache } from '../caches/apiKeys';

export async function createPartner(data: { name: string; api_key: string }) {
  if (!data.name || !data.api_key) {
    throw new Error('Name and API-key are required');
  }
  const partner = await partnerRepository.createPartner(data);
  addPartnerToCache(partner);
  return partner;
}

export async function searchFlights(params: FlightSearchParams) {
  return await flightRepository.searchFlights(params);
}

export async function createBooking(input: CreateBookingInput, partnerId: number) {
  const flight = await flightRepository.getFlightById(input.flight_id);
  if (!flight || flight.status !== 'active') {
    throw new Error('Flight not found OR not active');
  }

  const bookings = await bookingRepository.getBookingsByFlightId(input.flight_id);
  const bookedSeats = bookings.reduce((sum, b) => sum + b.seats, 0);
  const seatsLeft = flight.capacity - bookedSeats;

  if (seatsLeft < input.seats) {
    throw new Error(`Only ${seatsLeft} seats available, cannot book ${input.seats}`);
  }

  const totalPrice = flight.base_price * input.seats;
  return await bookingRepository.createBooking(input, partnerId, totalPrice);
}
