## Flyticket Backend

### What this project is about?

Flight provider backend API is an examination project that i developed for backend course. In this app:

- Admins can create flights with timestamps, cities, and seat counts.

- Third-party providers can query tickets by date and cities, receiving exact departure and arrival times with pricing.

***

### Installation Instructions:

1. Clone the repo to your local machine
2. Open in a compiler of your choice, ex: VSCode
3. In terminal run:

```bash
npm install
```

***

### Usage Instructions: 

#### Using Docker

1. Install Docker and Docker Compose
1. Create .env-file (see .env.example)
1. Run with Docker Compose:

```bash
docker-compose up --build
```

The app will be available at http://localhost:3000

***

#### Manual Setup (no Docker)

- Install Docker to your local machine or setup a postgreSQL database yourself

- Interact with the database, ex: Datagrip to create following tables with code below:

```sql
-- Admins
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Flights
CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    flight_code VARCHAR(50) UNIQUE NOT NULL,
    departure TIMESTAMP NOT NULL,
    arrival TIMESTAMP NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    flight_id INT REFERENCES flights(id),
    partner_id INT REFERENCES partners(id),
    passenger_name VARCHAR(255) NOT NULL,
    passenger_email VARCHAR(255),
    seats INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    idempotency_key VARCHAR(255) UNIQUE,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Price history (if you still want it)
CREATE TABLE IF NOT EXISTS price_history (
    id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(id),
    price DECIMAL(10,2) NOT NULL,
    changed_at TIMESTAMP DEFAULT NOW()
);
```

- Run the database

- Create enviroment file (.env) in projects root directory, populate as shown in .env.example.

- In terminal run:

```bash
npm run dev
```

***

#### To test the endpoints:

- Use curl in terminal or install Postman to your local machine

Requests overview:

- Adress example - http://localhost:3000/admin/flights

#### Create - POST 

- Request-body example:

```javascript
{
  "flight_code": "SK123",
  "departure": "2025-06-01T08:00:00Z",
  "arrival": "2025-06-01T11:30:00Z",
  "from_city": "Stockholm",
  "to_city": "London",
  "capacity": 150,
  "base_price": 199.99
}
```

#### Get all flights

- Use GET

#### Get a specific flight 

- Use Get on http://localhost:3000/admin/flights/your_id

#### Update

- Use PUT on http://localhost:3000/admin/flights/your_id

- Send JSON-object with field you want to change

### Delete - DELETE

- Soft deletes flights - changes status to "cancelled"

- Use DELETE on http://localhost:3000/admin/flights/your_id

### End
