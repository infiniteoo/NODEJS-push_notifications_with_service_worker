const { sendNotification } = require("web-push");

const publicVapidKey =
  "BNaOyh6nI4OldzueJvhsG54y7VGjTBaDIE-ZDJK4ioVvl3BMP114CXe_Jex-cX-Y7eeVMOGln1F-2kujdCBy6cI";

// check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// register service worker, register push, send push
async function send() {
  // register service worker
  console.log("registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("service worker registered!");

  // register push
  console.log("registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("push registered!");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
