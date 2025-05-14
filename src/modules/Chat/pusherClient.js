import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
	cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
	forceTLS: true,
});

Pusher.logToConsole = true;
export default pusher;
