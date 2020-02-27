const express = require('express');
const searchController = require('../controllers/items');

const router = express.Router();
router.get('/:q', searchController.getSearch);

module.exports = router;
