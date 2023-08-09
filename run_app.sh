#!/bin/bash

# Function to install dependencies and start the backend server
start_backend() {
  echo "Starting backend..."
  cd backend || exit
  echo "DATABASE_URL=$1" > .env
  npm install
  npm start &
  cd ..
}

# Function to install dependencies and start the frontend server
start_frontend() {
  echo "Starting frontend..."
  cd frontend || exit
  npm install
  npm start &
}

# Main function to run the app
run_app() {
  start_backend $1
  start_frontend
}

# Call the main function to run the app
run_app $1