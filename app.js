const express = require("express");
const path = require("path");
const app = express();

// set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

