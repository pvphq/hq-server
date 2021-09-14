const router = require("express").Router();
const passport = require("passport");

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/auth/login/failed",
    successRedirect: `${process.env.CLIENT_HOME_PAGE_URL}/`,
  }),
  function (req, res, next) {
    console.log(req.user);
  }
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.json({
      success: false,
      message: "user has not successfully authenticated",
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME_PAGE_URL);
});

module.exports = router;
