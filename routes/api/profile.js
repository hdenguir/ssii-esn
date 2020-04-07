const fs = require('fs');
const md5 = require('md5');
const express = require('express');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();
/* 
/ @route  GET api/profile/me
/ @desc   Get current user profile
/ @access Private
*/
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res
        .status(500)
        .json({ errors: [{ msg: 'There is no profile for this user' }] });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
  res.send('Profile Route');
});

/* 
/ @route  POST api/profile/photo
/ @desc   update profile photo
/ @access Private
*/
router.post('/photo/edit', auth, async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ errors: [{ msg: 'No photo uploaded' }] });
  } else {
    const photo = req.files.photo;

    const pathname = `${__dirname}/../../client/public/uploads/`;
    const filename = `${pathname}${photo.name}`;
    // Save image
    photo.mv(filename, async err => {
      if (err)
        return res.status(400).json({ errors: [{ msg: 'No photo uploaded' }] });

      // New name
      const img_name = md5(Date.now()) + '.' + photo.name.split('.').pop();

      // Delete existing photo
      let currentProfile = await Profile.findOne({ user: req.user.id });
      if (currentProfile.photo) {
        fs.unlink(pathname + currentProfile.photo, err => {
          if (err) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Existing photo not deleted' }] });
          }
        });
      }

      // rename photo
      fs.rename(filename, `${pathname}${img_name}`, function(err) {
        if (err)
          return res
            .status(400)
            .json({ errors: [{ msg: 'Error rename image' }] });
      });

      // Update photo
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { photo: img_name } },
        { new: true },
      );
      return res.json(profile);
    });
  }
});

/* 
/ @route  POST api/profile
/ @desc   Create or update user profile
/ @access Private
*/
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const profileFields = {};

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Create Profile
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(',').map(skill => skill.trim());

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update existing Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );

        return res.json(profile);
      }

      // create New Profile
      profile = new Profile(profileFields);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      return res.status(400).json({
        errors: [{ msg: err.message }],
      });
    }
  },
);

/* 
/ @route  GET api/profile
/ @desc   Get All Profiles
/ @access Public
*/
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.status(200).json({
      results: profiles.length,
      profiles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

/* 
/ @route  GET api/profile/user/user_id
/ @desc   Get Profile By User ID
/ @access Public
*/
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({
        errors: [{ msg: 'There is no profile for this user' }],
      });

    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    if (err.kind == 'ObjectId')
      return res.status(400).json({
        errors: [{ msg: 'Profile not found' }],
      });

    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

/* 
/ @route  DELETE api/profile
/ @desc   Delete profile, user & posts
/ @access Private
*/
router.delete('/', auth, async (req, res) => {
  try {
    // 1. Remove users posts
    await Post.deleteMany({ user: req.user.id });

    // 2. Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // 3. Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From Date is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // 1. Check Errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // 2. Build new Experience Object
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExeprience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    // 3. Get profile & Update Experience
    try {
      let profile = req.user
        ? await Profile.findOne({ user: req.user.id })
        : null;
      if (!profile)
        return res
          .status(400)
          .send({ msg: 'There is no profile for this user' });

      profile.experience.unshift(newExeprience);
      await profile.save();
      return res.status(200).json(profile);
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        errors: [{ msg: err.message }],
      });
    }
  },
);

// @route  DELETE api/profile/experience/0
// @desc   Delete one experience
// @access Private
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    let profile = req.user
      ? await Profile.findOne({ user: req.user.id })
      : null;
    if (!profile)
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no profile for this user' }] });

    // Get remove Index
    const experienceProfile = profile.experience;
    const expIndex = experienceProfile
      .map(exp => exp.id)
      .indexOf(req.params.id);

    // Delete experience by index
    if (expIndex == -1)
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no profile for this user' }] });

    experienceProfile.splice(expIndex, 1);
    profile.save();

    res.status(204).json(profile);
  } catch (err) {
    console.log(err.message);

    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From Date is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // 1. Check Errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // 2. Build new Education Object
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    // 3. Get profile & Update Education
    try {
      let profile = req.user
        ? await Profile.findOne({ user: req.user.id })
        : null;
      if (!profile)
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });

      profile.education.unshift(newEducation);
      await profile.save();
      return res.status(200).json(profile);
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        errors: [{ msg: err.message }],
      });
    }
  },
);

// @route  DELETE api/profile/education/id
// @desc   Delete one education
// @access Private
router.delete('/education/:id', auth, async (req, res) => {
  try {
    let profile = req.user
      ? await Profile.findOne({ user: req.user.id })
      : null;
    if (!profile)
      return res.status(400).send({ msg: 'There is no profile for this user' });

    // Get remove Index
    const educationProfile = profile.education;
    const eduIndex = educationProfile.map(edu => edu.id).indexOf(req.params.id);

    // Delete education by index
    if (eduIndex == -1)
      return res.status(400).send({ msg: 'There is no education for this ID' });

    educationProfile.splice(eduIndex, 1);
    profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);

    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

// @route  DELETE api/profile/github/:username
// @desc   Get user repos from Github
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'GithubClientID',
      )}&client_secret=${config.get('GithubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);

    return res.status(400).json({
      errors: [{ msg: err.message }],
    });
  }
});

module.exports = router;
