/* eslint-disable no-undef */
importScripts(
	"https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

firebase.initializeApp({
	apiKey: "AIzaSyAViOuuNWrKKciUyxN4MsBXIOeiovVbWr8",
	authDomain: "graduatoin-project.firebaseapp.com",
	projectId: "graduatoin-project",
	storageBucket: "graduatoin-project.firebasestorage.app",
	messagingSenderId: "481892702421",
	appId: "1:481892702421:web:f911cc0081cd62818dea5c",
	measurementId: "G-25L6RZNZCJ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	const channel = new BroadcastChannel("firebase-messaging-sw");
	channel.postMessage(payload);
    showNotification(payload);
	self.clients
		.matchAll({
			type: "window",
			includeUncontrolled: true,
		})
		.then((clients) => {
			if (clients.length === 0) {
				showNotification(payload);
			}
		});
});

function showNotification(payload) {
	const notificationTitle = payload.notification.title;
	const body = payload.notification.body;
	const data = payload.data;

	data.url = "https://ticktory.vercel.app";

	return self.registration.showNotification();
}

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const urlToOpen = event.notification.data.url;

	event.waitUntil(
		self.clients
			.matchAll({
				type: "window",
				includeUncontrolled: true,
			})
			.then((clientList) => {
				if (clientList.length === 0) {
					return self.clients.openWindow(urlToOpen);
				}

				const matchingClient = clientList.find(
					(client) => client.url === urlToOpen
				);

				if (matchingClient) {
					return matchingClient.focus();
				} else {
					if (clientList[0].navigate) {
						return clientList[0]
							.navigate(urlToOpen)
							.then((client) => client.focus());
					}
					return self.clients.openWindow(urlToOpen);
				}
			})
	);
});
