const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();
/* 
/ @route GET api/auth
/ @desc : Get User Auth
/ @access Public
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

/* 
/ @route  POST api/users
/ @desc   Authenticate user & Get token
/ @access Public
*/
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      // 1. See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      // 2. Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials !!!" }] });
      }
      // 4. Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          return res.json({ token: token });
        }
      );

      //res.send("User Created ");
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Server error");
    }
  }
);

module.exports = router;
