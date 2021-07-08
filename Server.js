const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const path = require("path");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", require("./routes/productsRoute"));

app.use("/api/orders", require("./routes/ordersRoute"));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running"));
