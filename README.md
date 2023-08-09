# Development Challenge for Ensolvers - Trainee/Jr. Software Engineer Position
This repository contains the work I completed for a development challenge posed by Ensolvers. I was given a 2-day timeframe to accomplish as much of this project as possible within the specified duration.

The aim of this README is to share the set guidelines I was given and, subsequently, describe the implementation and decisions made.

# Implementation Exercise

## 1. Requirements / Intro

You need to implement a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

### Phase 1: Note Creation

### Phase 2: Tag Application and Filtering

**IMPORTANT CONSIDERATIONS**:

- **Phase 1** is mandatory to pass this exercise, while **Phase 2** will provide extra points if done.
- Content must be persisted in a relational database using an ORM. In-memory storage or mocks are not allowed.

## 2. Deliverables

To pass this exercise, in addition to the implementation, you must:

- Upload the code to a private GitHub repository provided by Ensolvers HR staff and use git properly. Both the frontend and the backend should be pushed to that repository, in folders named `backend` and `frontend` respectively.

- Include a bash/zsh script allowing to run the app. Ideally, the app should start in a Linux/macOS environment just by running one command. This command should set up everything that is required to run the app, such as setting up a DB schema, pre-creating any config file, etc.

- Include a `README.md` file describing all the runtimes, engines, tools, etc. required to run the app, with their specific versions (e.g., MySQL 5.7, Spring Boot 2.1, React 16.10).

## 3. Technologies

There is no restriction about the technology to be used, if the implementation satisfies the following:

- Structure the app as a **Single Page web Application**, i.e. frontend and backend are different apps. That is the general case when you use React, Angular, Vue.js or any other similar UI framework. Please consider that rendering a web page on the server-side (by using JSP, EJS, Smarty, Blade, etc.) but using a bit of JS to, for instance, fetch some data, is not a pure SPA. You need to implement an isolated app, in a separate folder, with its custom `package.json` and dependencies.

- The backend app exposes a **REST API** that is the way in which the frontend app communicates with the backend.

- The backend app is separated into layers (e.g., Controllers, Services, DAOs/Repositories, etc.). It is important to mention that Laravel (PHP) and Django (Python) **DO NOT SUPPORT** that layer separation by default when building apps, so if you submit a backend done directly with those technologies without any further adjustment in the architecture, it might probably need to be improved or the exercise will be rejected directly. On the other hand, Spring Boot (Java) and Nestjs (Node.js) are two technologies that enforce and/or ease the use of this layer separation. For more information, you can check the definition of the Service Layer pattern and an example in Spring Boot.

## 4. User Stories and mockups

## Phase 1

### User Stories

- **As a user**, I want to be able to create, edit and delete notes.
- **As a user**, I want to archive/unarchive notes.
- **As a user**, I want to list both my active notes.
- **As a user**, I want to list both my archived notes.

### Mockups for Active and Archived Notes

_NOTE_: These mockups are for reference purposes only. Different variants of user interface can be accepted if they match the desired functionality as described in the user stories.
![Mockups de Notas Activas y Archivadas](./mockups/active_and_archived_notes.png)

### Expected look and feel of the create/edit functionality
![Funcionalidad de Crear y Editar](./mockups/create_edit_functionality.png)

### Confirmation dialog for the delete note
![Diálogo de Confirmación para Borrar Nota](./mockups/confirmation_dialog_for_the_delete_note.png)

## Phase 2

### User Stories

- **As a user**, I want to be able to add/remove categories to notes.
- **As a user**, I want to be able to filter notes by category.

### Mockups 
![Categoría de Notas](./mockups/notes_category.png)

---
## Results

These are the screenshots showcasing the final result of my implementation:

### Active and Archived Notes
![Active and Archived Notes](./mockups/results/active_and_archived_notes.png)

### Confirmation Dialog for Deleting a Note
![Confirmation Dialog for Deleting a Note](./mockups/results/confirmation_dialog_for_the_delete_note.png)

### Create Note
![Create Note](./mockups/results/create_note.png)

### Edit Note
![Edit Note](./mockups/results/edit_note.png)

---

# Note App

Note App is a simple note-taking application that allows users to create, edit, archive, and delete notes. It also offers filtering by category and sorting by date.

## Technologies Used

### Backend

- Node.js v18.17.0
- Express.js v4.18.2
- MongoDB v5.7.0
- Mongoose v7.4.1
- cors v2.8.5

### Frontend

- React v18.2.0
- React Bootstrap v2.8.0
- Axios v1.4.0
- React Router Dom v6.14.2
- React Modal v3.16.1
- FontAwesome v6.4.0

## Requirements

- Node.js (v18.17.0 or higher)
- MongoDB (v5.7.0 or higher)

## Installation

1. Clone the repository.
2. Navigate to the backend folder and run:

```bash
npm install
```

3. Navigate to the frontend folder and run:

```bash
npm install
```

## Configuration

To use the application with the existing database:

1. Make sure you have a valid connection to a MongoDB or MongoDB Atlas instance.
2. Replace the connection URL in the backend's `.env` file with your own URL.

## Execution

To run the application, you can use the provided `run_app.sh` script. It requires the MongoDB URL as the first parameter enclosed in quotes. For the purpose of this exercise, you can use the provided URL.

Navigate to the root folder of the project and run the following command:

```bash
./run_app.sh "mongodb+srv://ensolvers:ensolvers2023@notes.9xqw6xn.mongodb.net/?retryWrites=true&w=majority"
```

This will start both the backend and frontend servers.

### Backend

To start the backend server, navigate to the backend folder and run:

```bash
npm start
```

This will start the server on `localhost` at port `3001`.

### Frontend

To start the frontend application, navigate to the frontend folder and run:

```bash
npm start
```

This will start the React application on `localhost` at port `3000`.

## Usage

Once the application is up and running, you can access it through your browser at `localhost:3000`. From there, you can create, edit, archive, and delete notes, as well as filter them by category and sort them according to your preferences.

## Contribution

If you want to contribute to the project or report issues, feel free to do so via issues or by sending a pull request. We welcome your suggestions and improvements.

## License

This project is under the ISC License.

## Author

This project was created by Agustin Torres.


