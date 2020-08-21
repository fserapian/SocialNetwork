const express = require('express');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');

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

module.exports = router;
