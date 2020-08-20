const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(501).json({
    msg: 'Not Implemented',
  });
});

module.exports = router;
