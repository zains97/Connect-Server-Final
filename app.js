//Imports
const mongoose = require("mongoose");
const express = require("express");
const request = require("request");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const postRoutes = require("./routes/postRoutes");
const friendsRoutes = require("./routes/friendsRoutes");

const app = express(); //Initialising the server
dotenv.config();

app.use(bodyParser.json());
app.use(express.json(), cors());
const PORT = process.env.PORT || 4050;

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Could not connect to mongodb:", e.codeName);
  });

let db = mongoose.connection;

app.get("/", (req, res) => res.send("Hello World! From Connect!"));
app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/friends", friendsRoutes);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
