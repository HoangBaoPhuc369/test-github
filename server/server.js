const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("./auth/passport.js");
const cookieSession = require("cookie-session");

const {
  PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  BASE_URL,
} = require("./config");

const app = express();

app.use(
  cookieSession({ name: "session", keys: ["phuc"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: BASE_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

//routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/children"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/chat"));

//database
mongoose
  .connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}`, {
    auth: {
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
    dbName: DATABASE_NAME,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
