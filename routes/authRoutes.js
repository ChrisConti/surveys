const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); //attach auto by passport to kill the cookie
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    //req incoming, res response
    res.send(req.user);
  });
};
