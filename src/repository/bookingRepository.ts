import { getPool } from '../db';
import { Booking, CreateBookingInput } from '../types/booking';
import { randomUUID } from 'crypto';

export async function createBooking(
  data: CreateBookingInput,
  partnerId: number,
  totalPrice: number
): Promise<Booking> {
  const pool = getPool();
  const bookingRef = `BK-${randomUUID().slice(0, 8)}`;
  const result = await pool.query(
    `INSERT INTO bookings 
     (booking_reference, flight_id, partner_id, passenger_name, passenger_email, seats, total_price)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      bookingRef,
      data.flight_id,
      partnerId,
      data.passenger_name,
      data.passenger_email || null,
      data.seats,
      totalPrice
    ]
  );
  return result.rows[0];
}

export async function getBookingsByFlightId(flightId: number): Promise<Booking[]> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM bookings WHERE flight_id = $1 AND status = $2',
    [flightId, 'confirmed']
  );
  return result.rows;
}
