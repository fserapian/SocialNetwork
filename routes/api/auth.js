const express = require('express');
const router = express.Router();
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    console.log(req.body);
    res.status(501).json({
      msg: 'Not Implemented',
    });
  }
);

module.exports = router;
