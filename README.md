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

- Install Docker to your local machine or setup a postgreSQL database yourself

- Create following tables:

```markdown
Admin
Partner
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

```bash
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