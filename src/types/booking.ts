export interface Booking {
  id: number;
  booking_reference: string;
  flight_id: number;
  partner_id: number;
  passenger_name: string;
  passenger_email?: string;
  seats: number;
  total_price: number;
  status: 'confirmed' | 'cancelled';
  created_at: Date;
}

export interface CreateBookingInput {
  flight_id: number;
  passenger_name: string;
  passenger_email?: string;
  seats: number;
}

export interface FlightSearchParams {
  date: string;
  from: string;
  to: string;
}
