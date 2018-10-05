const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 300 * 24 * 60 * 60 * 1000, //expiration 30 days
    keys: [keys.cookieKey] //encrypt
  })
);
app.use(passport.initialize());
app.use(passport.session()); //tell passport he has to use cookie

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
