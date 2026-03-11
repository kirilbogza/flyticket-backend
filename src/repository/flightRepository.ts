import { getPool } from "../db";
import { Flight, CreateFlightInput, UpdateFlightInput } from "../types/flight";

export async function createFlight(data: CreateFlightInput): Promise<Flight> {
  const pool = getPool();
  const {
    flight_code,
    departure,
    arrival,
    from_city,
    to_city,
    capacity,
    base_price,
  } = data;

  const result = await pool.query(
    `INSERT INTO flights (flight_code, departure, arrival, from_city, to_city, capacity, base_price)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [flight_code, departure, arrival, from_city, to_city, capacity, base_price],
  );
  return result.rows[0];
}

export async function getFlightById(id: number): Promise<Flight | null> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM flights WHERE id = $1", [id]);
  return result.rows[0] || null;
}

export async function getAllFlights(): Promise<Flight[]> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM flights ORDER BY departure");
  return result.rows;
}

export async function updateFlight(
  id: number,
  data: UpdateFlightInput,
): Promise<Flight | null> {
  const pool = getPool();
  const fields = [];
  const values = [];
  let idx = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }
  }
  if (fields.length === 0) return getFlightById(id);

  values.push(id);
  const query = `UPDATE flights SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function cancelFlight(id: number): Promise<Flight | null> {
  return updateFlight(id, { status: "cancelled" });
}
