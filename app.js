require("dotenv").config();
const express = require("express");
const webpush = require("web-push");
const path = require("path");
const app = express();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

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
app.post("/subscribe", (req, res) => {
  // get push subscription object
  const subscription = req.body;

  // send 201 status - resource created
  res.status(201).json({});

  // create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
