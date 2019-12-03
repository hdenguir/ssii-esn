const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

/* 
/ @route GET api/users
/ @desc : Test Route Users
/ @access Public
*/
router.get("/", (req, res) => res.send("Users Route"));

/* 
/ @route POST api/users
/ @desc : Register
/ @access Public
*/
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // 1. See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "User already exists" }]
        });
      }
      // 2. get User Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // 3. Encrypt passward
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
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
