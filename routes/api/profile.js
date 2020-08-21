const express = require('express');
const auth = require('../../middleware/auth');
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

module.exports = router;
