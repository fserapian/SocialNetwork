const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');

/**
 * @desc    Register user
 * @route   POST /api/users/register
 * @access  public
 *
 * @param {Object} req
 * @param {Object} res
 */
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'Password must contain 6 or mor characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: { msg: 'User already exists' } });
      }

      user = new User({
        name,
        email,
        password,
      });

      await user.save();

      const token = user.getSignedJwtToken();

      res.status(201).json({
        success: true,
        token,
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
 * @desc  Get logged in user
 * @route GET /api/v1/auth/me
 * @access private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return req.status(404).json({
        success: false,
        msg: 'Cannot find user',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: 'Server Error',
    });
  }
});

module.exports = router;
