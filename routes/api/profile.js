const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/auth');
const Profile = require('../../modules/Profile');
const User = require('../../modules/User');
const { body, validationResult } = require('express-validator');

// route get api/profile/me
// get current users profile private via jsonwebtoken
router.get('/me', authToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error');
  }
});

// post api/profile and will create or update user profile
router.post(
  '/',
  [
    authToken,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
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
    //take the field inputs out of the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // build profile object
    // we need to check to see if the values are filled before we set the profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    // build social object
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (facebook) profileFields.facebook = facebook;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (linkedin) profileFields.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // Create new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
    console.log(profileFields.skills);
  }
);

// get all profiles
//api/profile
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});
// get user profile id
//api/profile/user/user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    res.send(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    res.status(500).json('Server Error');
  }
});

// api/profile
//delete profile
//private will need webtoken
router.delete('/', authToken, async (req, res) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'Successfully removed' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

// route put api/profile/experience
// add profile experience
//web token needed
router.put(
  '/experience',
  authToken,
  [
    body('title', 'Title is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      console.log(profile.experience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// delete request
// api/profile/experience
// delete experience from profile

router.delete('/experience/:exp_id', authToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get the removed index
    const indexDelete = profile.experience
      .map((item) => item._id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(indexDelete, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
});

router.put(
  '/education',
  [
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty(),
  ],
  authToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500), json('Server Error');
    }
  }
);
module.exports = router;
