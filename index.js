const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); //req.body parse the req because its not automatique
app.use(
  cookieSession({
    maxAge: 300 * 24 * 60 * 60 * 1000, //expiration 30 days
    keys: [keys.cookieKey] //encrypt
  })
);
app.use(passport.initialize());
app.use(passport.session()); //tell passport he has to use cookie

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //if we dont know any route try to look into client/build
  app.use(express.static("client/build"));
  //if not find anything
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
