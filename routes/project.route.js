const express = require('express');
const router = express.Router();

// Require the controllers
const project_controller = require('../controllers/project.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', project_controller.test);
router.get('/:id', project_controller.project_details);
router.post('/create', project_controller.project_create);
router.put('/:id/update', project_controller.project_update);
router.delete('/:id/delete', project_controller.project_delete);

module.exports = router;
