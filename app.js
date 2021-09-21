require("dotenv").config();
const express = require("express");
const webpush = require("web-push");
const path = require("path");
const app = express();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto: troydorman@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

// create post subscribe route
app.post("/subscribe", (req, res) => {});

app.listen(port, () => console.log(`Server started on port ${port}`));
