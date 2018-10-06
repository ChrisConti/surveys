const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //attach auto by passport to kill the cookie
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    //req incoming, res response
    res.send(req.user);
  });
};
