// backend/api/controllers/notesController.js

const Notes = require('../models/Note');

const Note = {
    getNotes: async (req, res) => {
        const { archived, sortOrder = 'asc', sortBy = 'createdAt', category } = req.query;
        try {
            let notes;
            if (archived === 'true') {
                notes = category
                    ? await Notes.find({ archived: true, categories: category }).sort({ [sortBy]: sortOrder })
                    : await Notes.find({ archived: true }).sort({ [sortBy]: sortOrder });
            } else if (archived === 'false') {
                notes = category
                    ? await Notes.find({ archived: false, categories: category }).sort({ [sortBy]: sortOrder })
                    : await Notes.find({ archived: false }).sort({ [sortBy]: sortOrder });
            } else {
                notes = category
                    ? await Notes.find({ categories: category }).sort({ [sortBy]: sortOrder })
                    : await Notes.find().sort({ [sortBy]: sortOrder });
            }
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error getting notes' });
        }
    },
    getNoteById: async (req, res) => {
        const { id } = req.params;
        try {
            const note = await Notes.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error getting note' });
        }
    },
    createNote: async (req, res) => {
        const { title, content, categories } = req.body;
        try {
            const newNote = await Notes.create({ title, content, categories, archived: false });
            res.status(201).json(newNote);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating note' });
        }
    },
    updateNote: async (req, res) => {
        const { id } = req.params;
        const { title, content, categories } = req.body;
        try {
            const note = await Notes.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            note.title = title;
            note.content = content;
            note.categories = categories;
            await note.save();
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating note' });
        }
    },
    archiveNote: async (req, res) => {
        const { id } = req.params;
        try {
            const note = await Notes.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            note.archived = true;
            await note.save();
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to archive note' });
        }
    },
    unArchiveNote : async (req, res) => {
        const { id } = req.params;
        try {
            const note = await Notes.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            note.archived = false;
            await note.save();
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to unarchive note' });
        }
    },
    deleteNote: async (req, res) => {
        const { id } = req.params;
        try {
            const note = await Notes.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            await note.deleteOne();
            res.json({ message: 'Note deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting note' });
        }
    },
    getArchivedNotes: async (req, res) => {
        const { sortOrder = 'asc', sortBy = 'createdAt' } = req.query;
        try {
            const notes = await Notes.find({ archived: true }).sort({ [sortBy]: sortOrder });
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error getting archived notes' });
        }
    },
    getCategories : async (req, res) => {
        try {
            const notes = await Notes.find();
            let categories = [];
            for (let note of notes) {
                if(note.categories.length > 0) {
                    categories = [...categories, ...note.categories];
                }
            }
            categories = [...new Set(categories)];
            res.json(categories);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}

module.exports = Note;
