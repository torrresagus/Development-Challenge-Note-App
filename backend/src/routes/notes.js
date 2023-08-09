
// backend/api/routes/notes.js
const express = require('express');
const router = express();
const notesController = require('../controllers/notesController');

router.get('/notes', notesController.getNotes);
router.get('/notes/categories', notesController.getCategories);
router.get('/notes/:id', notesController.getNoteById);
router.post('/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);
router.post('/notes/:id/archive', notesController.archiveNote);
router.post('/notes/:id/unarchive', notesController.unArchiveNote);
router.use(express.static('../client/'))

module.exports = router;
