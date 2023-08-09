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