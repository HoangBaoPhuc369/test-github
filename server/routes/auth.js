const router = require("express").Router();
const passport = require("passport");

const { BASE_URL } = require("../config");

router.get("/auth/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${BASE_URL}/login/success`,
    failureRedirect: "auth/fail",
  })
);

router.get("/auth/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect(`${BASE_URL}/login`);
});

module.exports = router;
