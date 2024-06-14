# File Keeper

File Keeper is a web application that allows users to securely upload, manage, and download files. It provides functionalities such as user authentication, file upload, file listing, file deletion, and file download.

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- Middleware: Multer for file upload, JWT for authentication
- Styling: Tailwind CSS

## Features

- User registration and login
- File upload 
- File listing for each user
- File deletion
- Secure file download with JWT token authentication

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd FileKeeper
   
### Install backend dependencies
```bash
cd server
yarn
```
### Install frontend dependencies
```bash
cd client
yarn
```
2.Create a .env file in the server directory and define the following variables:

  ```plaintext
   PORT=4000
   MONGO_URL=<your-mongodb-connection-string>
   JWT_KEY=<your-jwt-secret-key>
   PASSWORD_KEY=<your-password-encryption-key>
```


### Start the backend server
```bash
cd server
yarn start
```
### Start the frontend server
```bash
cd client
yarn dev
```
## Usage
- Register a new user account or log in with an existing account.
- Upload files using the upload functionality.
- View the list of uploaded files.
- Delete files as needed.
- Download files by clicking the download button.
