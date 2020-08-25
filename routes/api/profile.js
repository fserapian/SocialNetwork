const express = require('express');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

/**
 * @desc    Get logged in user profile
 * @route   GET /api/profile/me
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'No profile found for this user',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Create or update user profile
 * @route   POST /api/profile
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Stauts is required').not().isEmpty(),
      body('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      instagram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          success: true,
          data: profile,
        });
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();

      res.status(201).json({
        success: true,
        data: profile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
);

/**
 * @desc    Get all profiles
 * @route   GET /api/profile
 * @access  public
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Get profile by user id
 * @route   GET /api/profile/user/:userId
 * @access  public
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: `Cannot find profile of user id ${req.params.userId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: `Cannot find profile of user id ${req.params.userId}`,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Delete profile, user and posts
 * @route   DELETE /api/profile
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.delete('/', auth, async (req, res) => {
  // TODO: delete posts associated with the user.

  try {
    // Delete profile
    const profile = await Profile.findOneAndDelete({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: `Profile not found`,
      });
    }

    // Delete user
    const user = await User.findOneAndDelete({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Add profile experience
 * @route   PUT /api/profile/experience
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
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

      await profile.save();

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
);

/**
 * @desc    Delete profile experience
 * @route   DELETE /api/profile/experience/:expId
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Experience index to remove
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.expId);

    profile.experience.splice(removeIndex, 1);

    profile.save();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Add profile education
 * @route   PUT /api/profile/education
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.put(
  '/education',
  [
    auth,
    [
      body('school', 'School is required').not().isEmpty(),
      body('degree', 'Degree is required').not().isEmpty(),
      body('fieldofstudy', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
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

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
);

module.exports = router;
