const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Dummy database (in-memory) with some Indian destinations
let destinations = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "Iconic white marble mausoleum",
    bestTimeToVisit: "October to March",
    attractions: ["Taj Mahal", "Agra Fort"],
  },
  {
    id: 2,
    name: "Jaipur",
    location: "Rajasthan",
    description: "The Pink City known for its rich culture and heritage",
    bestTimeToVisit: "November to February",
    attractions: ["City Palace", "Hawa Mahal", "Amber Fort"],
  },
  {
    id: 3,
    name: "Goa",
    location: "Goa",
    description: "Famous for its beaches, nightlife, and Portuguese heritage",
    bestTimeToVisit: "November to February",
    attractions: [
      "Calangute Beach",
      "Basilica of Bom Jesus",
      "Dudhsagar Falls",
    ],
  },
];
let nextDestinationId = 4;

// Middleware
app.use(bodyParser.json());

// Routes

// Get all destinations
app.get("/destinations", (req, res) => {
  res.json(destinations);
});

// Get a destination by ID
app.get("/destinations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const destination = destinations.find((dest) => dest.id === id);

  if (!destination) {
    return res.status(404).json({ error: "Destination not found" });
  }

  res.json(destination);
});

// Create a new destination
app.post("/destinations", (req, res) => {
  const newDestination = req.body;
  newDestination.id = nextDestinationId++;
  destinations.push(newDestination);
  res.status(201).json(newDestination);
});

// Update a destination by ID
app.put("/destinations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDestination = req.body;
  const index = destinations.findIndex((dest) => dest.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Destination not found" });
  }

  destinations[index] = { ...destinations[index], ...updatedDestination };
  res.json(destinations[index]);
});

// Delete a destination by ID
app.delete("/destinations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = destinations.findIndex((dest) => dest.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Destination not found" });
  }

  destinations.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
