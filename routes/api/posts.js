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

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Get single post by id
 * @route   GET /api/posts/:id
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        error: `No post found for the id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        error: `No post found from the id ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Delete post by id
 * @route   DELETE /api/posts/:id
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: `No post found for the id ${req.params.id}`,
      });
    }

    // Check user
    if (req.user.id !== post.user.toString()) {
      return res.status(401).json({
        success: false,
        error: 'User cannot delete this post',
      });
    }

    await post.remove();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        error: `No post found from the id ${req.params.id}`,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

/**
 * @desc    Like a post
 * @route   PUT /api/posts/like/:id
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 * @param {String} id
 */
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Post is already liked',
      });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.status(200).json({
      success: true,
      data: post.likes,
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
 * @desc    Unlike a post
 * @route   PUT /api/posts/unlike/:id
 * @access  private
 *
 * @param {Object} req
 * @param {Object} res
 * @param {String} id
 */
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Post is not liked',
      });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      data: post.likes,
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
