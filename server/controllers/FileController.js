const File = require("../models/File");

const router = require("express").Router();

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
    const { filename, path, mimetype, originalname, encoding, size } = req.file;

    // Generate a unique 6-digit code for the file
    const code = await generateUniqueCode();

    // Create a new File data
    const newFile = new File({
      user: req.body.userId,
      filename,
      path,
      mimetype,
      originalname,
      encoding,
      size,
      code,
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

module.exports = {
  addFile,
};
