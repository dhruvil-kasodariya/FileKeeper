const File = require("../models/File");
const path =require("path")
const fs = require('fs');

const router = require("express").Router();
const { unlink } = require("node:fs/promises");

// Function to generate a unique 6-digit code
const generateUniqueCode = async () => {
  let code;
  let exists = true;

  // Generate and check uniqueness until a unique code is found
  while (exists) {
    // Generate a random 6-digit numeric code
    code = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999

    // Check if the code already exists in the database
    exists = await File.exists({ code });
  }

  return code;
};

//  to add a file
const addFile = async (req, res) => {
  try {
console.log("here")


const file2Base64 = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const base64Data = data.toString('base64');
                resolve(base64Data);
            }
        });
    });
};
    const { filename, path, mimetype, originalname, encoding, size } = req.file;
    const base64 =await file2Base64(req.file)
    // Generate a unique 6-digit code for the file
    // const code = await generateUniqueCode();

    // Create a new File data
    const newFile = new File({
      user: req.body.userId,
      filename,
      path,
      mimetype,
      originalname,
      encoding,
      size,
      base64
      // code,
    });

    // Save the file information to the database
    const fileResponse = await newFile.save();

    // Respond with the saved file information
    return res.status(201).json(fileResponse);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get files by userId
const getUserFiles = async (req, res) => {
  try {
    // Extract the userId parameter from the request parameters
    const { userId } = req.params;

    // Query the database to find files belonging to the specified user
    const filesList = await File.find({ user: userId });

    // Send a JSON response with the list of files
    return res.status(200).json(filesList);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserFile = async (req, res) => {
  try {
    // Extract the fileId parameter from the request parameters
    const { fileId } = req.params;

    // Find the file by its ID
    const getFile = await File.findById({ _id: fileId });

    // Check if the file exists
    if (!getFile) {

      // If the file does not exist, send a 404 Not Found response
      return res.status(404).json({ error: "File Not Found" });
    }

    // Delete the file from the database
    await File.findByIdAndDelete({ _id: fileId });

    // Delete the file from the file system
    try {
      await unlink(getFile.path); // Use unlink to delete the file from the file system
     // console.log(`Successfully deleted file ${getFile.path}`);
    } catch (error) {
      // Handle errors that occur during file deletion from the file system
      console.error("Error deleting file:", error.message);
    }

    // Send a success response indicating the file was deleted
    res.status(200).send({ message: "File Deleted" });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const downloadFile =async (req, res) => {
  res.status(200).download(req.body.path)
}

module.exports = {
  addFile,
  getUserFiles,
  deleteUserFile,
  downloadFile
};
