// A web application framework for Node.js.
const express = require('express');
// A middleware for handling multipart/form-data, used for file uploads.
const multer = require("multer");
// Middleware for enabling Cross-Origin Resource Sharing.
const cors = require("cors");
// A built-in Node.js module for working with file and directory paths.
const path = require("path");
const fs = require("fs/promises"); // Use fs.promises for async file operations


// An instance of the Express application.
const app = express();
// The port on which the server will listen.
const port = 9000;

// Enables CORS for all routes.
app.use(cors());

// Multer Configuration where:
/*
  Configure multer for image uploads
  multer.diskStorage: Configures disk storage for uploaded files.
  destination: Sets the directory where files will be stored (uploads/).
  filename: Generates a unique filename for each uploaded file.
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST Endpoint for Handling Pet Upload
// .post -> defines a POST endpoint for handling pet uploads.
// upload.single -> specifies that the server expects a single file named "image" in the form data.
app.post("/api/upload", upload.single("image"), (req, res) => {
  // req. body -> contains the pet information sent in the request body (name, breed, age).
  res.json({ imageUrl: req.file ? req.file.path : null });
});
// const { name, breed, age } = req.body;
// // req.file -> represents the uploaded file.
// // req.file.path -> path to the stored file. This is used as the image URL.
// const imageUrl = req.file ? req.file.path : null;

// In a real application, save the pet information and image URL to a database or file.

// Serve Uploaded Images:
// express.static -> serves static files from the "uploads" directory.
// path.join(__dirname, "uploads") -> constructs the absolute path to the "uploads" directory
app.use(express.static(path.join(__dirname, "uploads")));

// Endpoint for fetching pet data
const petsData = require("./data/pets.json");
app.get("/api/pets", (req, res) => {
  console.log("Request received for /api/pets");
  res.json(petsData);
});

//Usar el objeto de la aplicacion (app) y metodo listen para pasar un puerto donde estará escuchando el servidor. Se pasa un callback para que se imprima un mensaje de que el servidor esta corriendo
// app.listen(port, ...) -> starts the server and listens on the specified port
app.listen(port, () => {
  console.log("Server running on ", "http://localhost:" + port)
});