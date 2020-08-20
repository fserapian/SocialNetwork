const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Posts route');
});

module.exports = router;
