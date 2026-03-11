import * as flightRepository from '../repository/flightRepository';
import { CreateFlightInput, UpdateFlightInput } from '../types/flight';

export async function createFlight(data: CreateFlightInput) {
  if (new Date(data.departure) >= new Date(data.arrival)) {
    throw new Error('Departure must be before arrival!');
  }
  if (data.capacity <= 0) {
    throw new Error('Amount must be positive!');
  }
  if (data.base_price <= 0) {
    throw new Error('Price must be positive!');
  }

  return await flightRepository.createFlight(data);
}

export async function getFlightById(id: number) {
  return await flightRepository.getFlightById(id);
}

export async function getAllFlights() {
  return await flightRepository.getAllFlights();
}

export async function updateFlight(id: number, data: UpdateFlightInput) {
  const existing = await flightRepository.getFlightById(id);
  if (!existing) throw new Error('Flight not found...');

  if (data.departure && data.arrival && new Date(data.departure) >= new Date(data.arrival)) {
    throw new Error('Departure must be before arrival!');
  }

  return await flightRepository.updateFlight(id, data);
}

export async function cancelFlight(id: number) {
  const existing = await flightRepository.getFlightById(id);
  if (!existing) throw new Error('Flight not found...');
  return await flightRepository.cancelFlight(id);
}
