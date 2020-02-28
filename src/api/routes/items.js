const express = require('express');
const searchController = require('../controllers/items');

const router = express.Router();
router.get('/:id', searchController.getItem);
router.get('/', searchController.getSearch);

module.exports = router;
