import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DateFactory from "../../../utility/factories/DateFactory";
// import { generateNotificationUrl } from "../../notification/helpers/notificationHelper";
import { toast } from "react-toastify";

const useFirebaseLogic = () => {
	const vapidKey =
		"BGKSEhkJbvAMHWZ7GX2OF2xHWg3b7swL93l9C2l_TYY3lf_uRyj0BVeFJ7NfHFVu2tRv3Ah6AHeFp8y_JzxaA5s";
	const firebaseConfig = {
		apiKey: "AIzaSyAViOuuNWrKKciUyxN4MsBXIOeiovVbWr8",
		authDomain: "graduatoin-project.firebaseapp.com",
		projectId: "graduatoin-project",
		storageBucket: "graduatoin-project.firebasestorage.app",
		messagingSenderId: "481892702421",
		appId: "1:481892702421:web:f911cc0081cd62818dea5c",
		measurementId: "G-25L6RZNZCJ",
	};

	const [fcmToken, setFcmToken] = useState("");
	const [notification, setNotification] = useState({});
	// const dispatch = useDispatch();
	const notifications = [];
	// const unreadNotifications = 0;

	const app = initializeApp(firebaseConfig);
	const messaging = getMessaging(app);

	const requestNotificationPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				const token = await getToken(messaging, { vapidKey });
				setFcmToken(token);
			} else {
				toast.error(
					"You should allow notifications to receive messages"    
				);
			}
		} catch (error) {
			toast.error(`Error occurred while getting FCM token ${error}`);
		}
	};

	const buildNotificationObject = (notification) => {
		return {
			switch: undefined,
			id: notification.data.id,
			title: notification.notification.title,
			body: notification.notification.body,
			// created_at: DateFactory.createInstance().currentIsoDate(),
            created_at: new Date(),
			seen: false,
			data: notification.data,
			url:""
		};
	};

	const getUniqueNotifications = (notificationId) => {
		return notifications.filter((item) => item.id !== notificationId);
	};

	const syncNotificationsState = (
		notification,
		allNotificationsMeta,
		updateAllNotificationsPaginationObject
	) => {
		const allNotifications = [
			buildNotificationObject(notification),
			...getUniqueNotifications(notification.data.id),
		];

		// dispatch(setAllNotificationsAction(allNotifications));
		// dispatch(setUnreadNotificationsCountAction(unreadNotifications + 1));
		updateAllNotificationsPaginationObject(
			allNotifications.length,
			allNotificationsMeta.total + 1
		);
	};

	const onMessageListener = (callback) => {
		onMessage(messaging, callback);
	};

	const handleFcmNotifications = () => {
		const channel = new BroadcastChannel("firebase-messaging-sw");
		channel.onmessage = (event) => {
			setNotification({ ...event.data });
		};
	};

	return {
		fcmToken,
		notificationObject: notification,
		setNotificationObject: setNotification,
		onMessageListener,
		requestNotificationPermission,
		handleFcmNotifications,
		getUniqueNotifications,
		syncNotificationsState,
	};
};

export default useFirebaseLogic;
