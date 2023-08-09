// models/Note.js

const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL)

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    archived: {
        type: Boolean,
        required: true
    },
    categories: {
        type: Array,
        required: false
    }}, {timestamps: true}
);

const Notes = mongoose.model('Note', NotesSchema)

module.exports = Notes; 