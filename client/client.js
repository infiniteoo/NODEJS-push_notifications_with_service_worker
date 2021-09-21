const { sendNotification } = require("web-push");

const publicVapidKey =
  "BNaOyh6nI4OldzueJvhsG54y7VGjTBaDIE-ZDJK4ioVvl3BMP114CXe_Jex-cX-Y7eeVMOGln1F-2kujdCBy6cI";

// check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// register service worker, register push, send push
async function send() {
  console.log("registering service worker...");

  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });

  console.log("service worker registered!");
}
