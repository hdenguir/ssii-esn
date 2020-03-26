const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const createToken = (res, payload) => {
  const token = jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: 360000,
  });

  res.cookie('jwt', token, { expire: new Date() + 9999 });
  return token;
};

const router = express.Router();

/* 
/ @route GET api/auth
/ @desc : Get User Auth
/ @access Public
*/
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

/* 
/ @route  POST api/users
/ @desc   Authenticate user & Get token
/ @access Public
*/
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      // 1. See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }],
        });
      }

      // 2. Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials !!!' }] });
      }

      // 3. Return token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = createToken(res, payload);
      //req.user = user;
      return res.json({ token: token });
    } catch (err) {
      return res.status(400).json({
        errors: [{ msg: err.message }],
      });
    }
  },
);

router.post('/social-login', (req, res) => {
  try {
    // try signup by finding user with req.email
    let user = User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user) {
        // create a new user and login
        user = new User(req.body);
        req.user = user;
        user.save();

        // generate a token with user id and secret
        const payload = {
          user: {
            id: user.id,
          },
        };
        const token = createToken(res, payload);
        return res.json({ token });

        // return response with user and token to frontend client
      } else {
        // update existing user with new social info and login
        req.profile = user;
        user = Object.assign(user, req.body);
        user.updated = Date.now();
        user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };
        const token = createToken(res, payload);
        return res.json({ token });
      }
    });
  } catch (err) {
    return res.status(403).json({ errors: [{ msg: error.message }] });
  }
});

module.exports = router;
