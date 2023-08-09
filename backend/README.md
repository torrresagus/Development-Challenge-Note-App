# APP NOTE API

This is the API for APP NOTE, a simple note-taking app where you can create, update, archive, unarchive, and delete notes. The API uses Express.js and connects to a MongoDB database using Mongoose.

## Requirements

* Node.js
* MongoDB
* NPM

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the required dependencies using NPM:

```bash
npm install
```

## Usage

To start the server, use the command:
```bash
npm start
```

This will start the server on `localhost` at port `3001`.

## Endpoints

* `GET /notes`: Fetches all notes. To fetch only archived or unarchived notes, use the `archived` query parameter with values `true` or `false`. You can also sort by any field using the `sortOrder` (values can be 'asc' or 'desc') and `sortBy` (the field to sort by) query parameters. To filter by category, use the `category` query parameter.
* `GET /notes/categories`: Fetches all unique categories from the notes.
* `GET /notes/:id`: Fetches a note with the given ID.
* `POST /notes`: Creates a new note. The request body should be a JSON object containing `title` and `content`, and `categories`.
* `PUT /notes/:id`: Updates the note with the given ID. The request body should be a JSON object containing the updated `title` and `content`, and `categories`.
* `DELETE /notes/:id`: Deletes the note with the given ID.
* `POST /notes/:id/archive`: Archives the note with the given ID.
* `POST /notes/:id/unarchive`: Unarchives the note with the given ID.

## Response

All endpoints return a JSON object. In case of an error, the object will contain an `error` key, containing a message about what went wrong.

## Data Schema

The notes are stored in the database with the following schema:

* `title`: A string containing the title of the note. It is required.
* `content`: A string containing the content of the note. It is required.
* `archived`: A boolean indicating whether the note is archived or not. It is required.
* `categories`: An array of strings, each representing a category. It is optional.
* `createdAt`: A timestamp indicating when the note was created. It is automatically generated.
* `updatedAt`: A timestamp indicating when the note was last updated. It is automatically updated.

## License

ISC License

## Author

This project was created by [Agustin Torres].

Please feel free to report any issues or suggest improvements.