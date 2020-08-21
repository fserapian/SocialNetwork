const express = require('express');
const router = express.Router();
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

      res.status(201).json({
        success: true,
        data: user,
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
