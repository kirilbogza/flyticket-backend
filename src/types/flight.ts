export interface Flight {
  id: number;
  flight_code: string;
  departure: Date;
  arrival: Date;
  from_city: string;
  to_city: string;
  capacity: number;
  base_price: number;
  status: "active" | "cancelled";
  created_at: Date;
  updated_at: Date;
}

export interface CreateFlightInput {
  flight_code: string;
  departure: string;
  arrival: string;
  from_city: string;
  to_city: string;
  capacity: number;
  base_price: number;
}

export interface UpdateFlightInput {
  departure?: string;
  arrival?: string;
  from_city?: string;
  to_city?: string;
  capacity?: number;
  base_price?: number;
  status?: "active" | "cancelled";
}
