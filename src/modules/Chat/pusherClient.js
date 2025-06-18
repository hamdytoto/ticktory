import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
});

// eslint-disable-next-line no-undef
Pusher.logToConsole = process.env.NODE_ENV === "development";
export default pusher;
