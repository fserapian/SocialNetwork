const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');

/**
 * @desc    Add post
 * @route   POST /api/posts
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.post(
  '/',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      await post.save();

      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
);

module.exports = router;
