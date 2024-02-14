# File Keeper

File Keeper is a web application that allows users to securely upload, manage, and download files. It provides functionalities such as user authentication, file upload, file listing, file deletion, and file download with a 6-digit code verification.

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- Middleware: Multer for file upload, JWT for authentication
- Styling: Tailwind CSS

## Features

- User registration and login
- File upload with unique 6-digit code generation
- File listing for each user
- File deletion
- Secure file download with code verification

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd FileKeeper
   
# Install backend dependencies
```bash
cd server
yarn
yarn start
```
# Install frontend dependencies
```bash
cd client
yarn
yarn dev
```

PORT=5000
MONGO_URL=<your-mongodb-connection-string>
JWT_KEY=<your-jwt-secret-key>
PASSWORD_KEY=<your-password-encryption-key>

# Start the backend server
cd server
npm start

# Start the frontend server
cd ../client
npm start

Usage
Register a new user account or log in with an existing account.
Upload files using the upload functionality.
View the list of uploaded files.
Delete files as needed.
Download files by clicking the download button and entering the correct 6-digit code.
