import express from "express";
import dotenv from "dotenv";
import color from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./Config/db.js";
import route from "./Routes/Routes.js";
import http from "http";
import { Server } from "socket.io";
import User from "./Models/UserSchema.js";

const PORT = process.env.PORT || 5000;
dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, { cors: "*" }); // Initialize Socket.IO server

app.use(express.json());
app.use(cors());
app.use("/api", route);

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME} API is working on ${process.env.ENV}.....`);
});

// Socket.IO connection handling
// Create a map to store sockets by restaurant ID
const restaurantSockets = new Map();

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A client connected");

  // Listen for the "join restaurant" event from clients
  socket.on("join restaurant", (restaurantId) => {
    console.log(`Socket ${socket.id} joined restaurant ${restaurantId.body}`);
    // Store the socket in the map with the restaurant ID as the key
    restaurantSockets.set(restaurantId.body, socket);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
    // Remove the socket from the map when a client disconnects
    restaurantSockets.forEach((value, key) => {
      if (value === socket) {
        restaurantSockets.delete(key);
      }
    });
  });

  // Listen for "data to restaurant" event from clients
  socket.on("data to restaurant", (dd) => {
    console.log(dd, "dd");
    // return
    let { restaurantId, data } = dd;
    console.log(`Data received for restaurant ${restaurantId}:`, data);

    // Find the socket associated with the specified restaurant ID
    const restaurantSocket = restaurantSockets.get(restaurantId);

    if (restaurantSocket) {
      // Emit the data to the restaurant frontend
      restaurantSocket.emit("data from server", data);
    } else {
      console.log(`Restaurant ${restaurantId} not found`);
    }
  });
});

server.listen(PORT, () => {
  console.log(
    `Server has started on http://localhost:${PORT}`.white.bgYellow.bold
  );
});
